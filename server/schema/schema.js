const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");

const gql = require("graphql-tag");
const {makeExecutableSchema} = require("graphql-tools");
const {PubSub} = require("graphql-subscriptions");

const pubSub = new PubSub();
const MESSAGE_ADDED = "newMessage";
const USER_CONNECTED = "newUser";
const NEW_CONVERSATION = "newConversation";

const typeDefs = gql`

  scalar DateTime

  type User {
    id: ID!
    name: String
    picture_url: String
    conversations: [Conversation]
    password: String
  }

  type Message {
    id: ID!
    content: String
    user: User
    conversation: Conversation
    timestamp: Float
  }

  type Conversation {
    id: ID!
    users: [User]
    messages: [Message]
    timestamp: Float
  }

  type Query {
    conversation(id: ID!): Conversation
    conversationsByUser(userId: ID!): [Conversation]
    conversationsByUsers(userIds: [ID!]!): [Conversation]
    conversations: [Conversation]
    user(id: ID!): User
    users: [User]
    connectUser(name: String!, password: String!): User
    messages: [Message]
  }

  type Mutation {
    addUser(name: String!, password: String!): User
    addMessage(content: String!, userId: ID!, conversationId: ID!): Message
    addUserToConversation(userId: ID!, conversationId: ID!): User
    createConversation(userIds: [ID!]!): Conversation
  }

  type Subscription {
    messageAdded: Message
    userConnected: User
    newConversation: Conversation
  }
`;

const resolvers = {
  User: {
    //messages: (user) => Message.find({userId: user.id}),
    conversations: (user) => Conversation.find({userIds: user.id})
  },
  Message: {
    user: (message) => User.findById(message.userId),
    conversation: (message) => Conversation.findById(message.conversationId)
  },
  Conversation: {
    users: (conversation) => User.find({conversationIds: conversation.id}),
    messages: (conversation) => Message.find({conversationId: conversation.id})
  },

  Query: {
    conversations: (parent, args) => Conversation.find(),
    conversation: (parent, args) => Conversation.findById(args.id),
    conversationsByUser: (parent, args) => Conversation.find({userIds: args.userId}),
    conversationsByUsers: (parent, args) => Conversation.find({userIds: {$all: args.userIds}}),
    messages: () => Message.find({}),
    user: (parent, args) => User.findById(args.id),
    users: () => User.find({}),
  },

  Mutation: {
    addMessage: async (parent, args) => {
      //Add message
      let message = new Message({
        content: args.content,
        conversationId: args.conversationId,
        timestamp: Date.now(),
        userId: args.userId,
      });

      await Conversation.updateOne({_id: args.conversationId}, {timestamp: Date.now()});

      let messageSaved = message.save();

      pubSub.publish(MESSAGE_ADDED, {messageAdded: messageSaved});

      return messageSaved;
    },
    addUser: async (parent, args) => {

      let result = await User.find({name: args.name});

      if (result && result.length > 0 && result[0].password === args.password) {
        console.log("user" + JSON.stringify(result));
        return result[0];
      } else if (result && result.length > 0 && result[0].password !== args.password) {
        console.error("not a match");
        return null
      } else {
        let user = new User({
          name: args.name,
          picture_url: `https://api.adorable.io/avatars/35/${args.name}.png`,
          conversationIds: [],
          password: args.password
        });

        let userSaved = await user.save();

        pubSub.publish(USER_CONNECTED, {userConnected: userSaved});

        return userSaved;
      }
    },
    addUserToConversation: async (parent, args) => {
      Conversation.updateOne({_id: args.conversationId}, {$push: {userIds: args.userId}});
      User.updateOne({_id: args.userId}, {$push: {conversationIds: args.conversationId}});
      return User.findById(args.userId);
    },
    createConversation: async (parent, args) => {

      let convSaved = null;

      let result = await Conversation.find({userIds: {$all: args.userIds}});

      console.log(result);

      if (result && result.length > 0) {
        console.log("conv" + JSON.stringify(result));
        return result[0];
      } else {
        let conversation = new Conversation({
          userIds: args.userIds,
          timestamp: Date.now()
        });
        convSaved = await conversation.save();

        for (let userId of args.userIds) {
          await User.updateOne({_id: userId}, {$push: {conversationIds: convSaved.id}});
        }

        pubSub.publish(NEW_CONVERSATION, {newConversation: convSaved});

        return convSaved;
      }
    }
  },

  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.asyncIterator(MESSAGE_ADDED),
    },
    userConnected: {
      subscribe: () => pubSub.asyncIterator(USER_CONNECTED),
    },
    newConversation:  {
      subscribe: () => pubSub.asyncIterator(NEW_CONVERSATION)
    }

  },

};

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs,
});
