const gql = require("graphql-tag");
const {find, filter} = require("lodash");
const {makeExecutableSchema} = require("graphql-tools");
const User = require("../models/user");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const {PubSub} = require("graphql-subscriptions");
const {DateTime} = require("@okgrow/graphql-scalars");

const pubSub = new PubSub();
const MESSAGE_ADDED = "newMessage";
const USER_CONNECTED = "newUser";

const typeDefs = gql`

  scalar DateTime

  type User {
    id: ID!
    name: String
    picture_url: String
    messages: [Message]
    conversations: [Conversation]
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
  }

  type Query {
    conversation(id: ID!): Conversation
    conversations: [Conversation]
    user(id: ID!): User
    users: [User]
    message(id: ID!): Message
    messages: [Message]
  }

  type Mutation {
    addUser(name: String!): User
    addMessage(content: String!, userId: ID!): Message
  }

  type Subscription {
    messageAdded: Message
    userConnected: User
  }
`;

const resolvers = {
  DateTime,
  Mutation: {
    addMessage: (parent, args) => {


      let user = User.findById(args.userId);
      user.conversationIds.push()

      let isPresent = false;

      let conversation = Conversation.find({userId: {$in: user.conversationIds}}, (err, docs) => {
        console.log(docs)
        isPresent = !!docs;
      });

      if (!isPresent) {
        conversation = new Conversation({
          userIds: [args.userId]
        });
      } else {
        conversation.userIds.push(args.userId);
      }

      let conSaved = conversation.save();

      user.conversationIds.push(conSaved.id);
      user.save();

      let message = new Message({
        content: args.content,
        timestamp: Date.now(),
        userId: args.userId,
      });

      let messageSaved = message.save();

      pubSub.publish(MESSAGE_ADDED, {messageAdded: messageSaved});

      return messageSaved;
    },
    addUser: (parent, args) => {
      let user = new User({
        name: args.name,
        picture_url: `https://api.adorable.io/avatars/35/${args.name}.png`,
        conversationIds: []
      });

      let userSaved = user.save();

      pubSub.publish(USER_CONNECTED, {userConnected: userSaved});

      return userSaved;
    },

  },
  Query: {
    conversation: (parent, args) => Conversation.find({}),
    conversations: (parent, args) => Conversation.findById(args.id),
    message: (parent, args) => Message.findById(args.id),
    messages: () => Message.find({}),
    user: (parent, args) => User.findById(args.id),
    users: () => User.find({}),
  },
  Subscription: {
    messageAdded: {
      subscribe: () => pubSub.asyncIterator(MESSAGE_ADDED),
    },
    userConnected: {
      subscribe: () => pubSub.asyncIterator(USER_CONNECTED),
    },

  },
  User: {
    conversations: (user) => Conversation.find({userId: {$in: user.conversationIds}}),
    messages: (user) => Message.find({userId: user.id}),
  },
  Message: {
    user: (message) => User.findById(message.userId),
  },
  Conversation: {
    users: (conversation) => User.find({conversationIds: {$in: conversation.userIds}}).toArray(),
  },

};

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs,
});
