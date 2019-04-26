const gql = require("graphql-tag");
const {find, filter} = require("lodash");
const {makeExecutableSchema} = require("graphql-tools");
const User = require("../models/user");
const Message = require("../models/message");
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
  }

  type Query {
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

      });

      let userSaved = user.save();

      pubSub.publish(USER_CONNECTED, {userConnected: userSaved});

      return userSaved;
    },

  },
  Query: {
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
    messages: (user) => Message.find({userId: user.id}),
  },
  Message: {
    user: (message) => User.findById(message.userId),
  },
};

module.exports = makeExecutableSchema({
  resolvers,
  typeDefs,
});
