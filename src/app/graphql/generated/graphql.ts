export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Conversation = {
  id: Scalars["ID"];
  users?: Maybe<Array<Maybe<User>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Message = {
  id: Scalars["ID"];
  content?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
  conversation?: Maybe<Conversation>;
  timestamp?: Maybe<Scalars["Float"]>;
};

export type Mutation = {
  addUser?: Maybe<User>;
  addMessage?: Maybe<Message>;
  addUserToConversation?: Maybe<User>;
};

export type MutationAddUserArgs = {
  name: Scalars["String"];
};

export type MutationAddMessageArgs = {
  content: Scalars["String"];
  userIds: Array<Scalars["ID"]>;
  conversationId?: Maybe<Scalars["ID"]>;
};

export type MutationAddUserToConversationArgs = {
  userId: Scalars["ID"];
  conversationId: Scalars["ID"];
};

export type Query = {
  conversation?: Maybe<Conversation>;
  conversationsByUser?: Maybe<Array<Maybe<Conversation>>>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type QueryConversationArgs = {
  id: Scalars["ID"];
};

export type QueryConversationsByUserArgs = {
  userId: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type Subscription = {
  messageAdded?: Maybe<Message>;
  userConnected?: Maybe<User>;
};

export type User = {
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  picture_url?: Maybe<Scalars["String"]>;
  messages?: Maybe<Array<Maybe<Message>>>;
  conversations?: Maybe<Array<Maybe<Conversation>>>;
};
export type AddUserMutationVariables = {
  name: Scalars["String"];
};

export type AddUserMutation = { __typename?: "Mutation" } & {
  addUser: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name" | "picture_url"> & {
        conversations: Maybe<
          Array<
            Maybe<
              { __typename?: "Conversation" } & Pick<Conversation, "id"> & {
                  users: Maybe<
                    Array<
                      Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type AddMessageMutationVariables = {
  content: Scalars["String"];
  userIds: Array<Scalars["ID"]>;
  conversationIds?: Maybe<Scalars["ID"]>;
};

export type AddMessageMutation = { __typename?: "Mutation" } & {
  addMessage: Maybe<
    { __typename?: "Message" } & Pick<Message, "content" | "timestamp">
  >;
};

export type AddUserToConversationMutationVariables = {
  userId: Scalars["ID"];
  conversationID: Scalars["ID"];
};

export type AddUserToConversationMutation = { __typename?: "Mutation" } & {
  addUserToConversation: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name">
  >;
};

export type ConversationsByUserQueryVariables = {
  userId: Scalars["ID"];
};

export type ConversationsByUserQuery = { __typename?: "Query" } & {
  conversationsByUser: Maybe<
    Array<
      Maybe<
        { __typename?: "Conversation" } & Pick<Conversation, "id"> & {
            messages: Maybe<
              Array<
                Maybe<
                  { __typename?: "Message" } & Pick<
                    Message,
                    "content" | "timestamp"
                  >
                >
              >
            >;
            users: Maybe<
              Array<Maybe<{ __typename?: "User" } & Pick<User, "id" | "name">>>
            >;
          }
      >
    >
  >;
};

export type MessagesQueryVariables = {};

export type MessagesQuery = { __typename?: "Query" } & {
  messages: Maybe<
    Array<
      Maybe<
        { __typename?: "Message" } & Pick<Message, "content" | "timestamp"> & {
            user: Maybe<
              { __typename?: "User" } & Pick<
                User,
                "id" | "name" | "picture_url"
              >
            >;
          }
      >
    >
  >;
};

export type MessageAddedSubscriptionVariables = {};

export type MessageAddedSubscription = { __typename?: "Subscription" } & {
  messageAdded: Maybe<
    { __typename?: "Message" } & Pick<
      Message,
      "id" | "content" | "timestamp"
    > & {
        user: Maybe<
          { __typename?: "User" } & Pick<User, "id" | "name" | "picture_url">
        >;
        conversation: Maybe<
          { __typename?: "Conversation" } & Pick<Conversation, "id"> & {
              users: Maybe<
                Array<Maybe<{ __typename?: "User" } & Pick<User, "id">>>
              >;
            }
        >;
      }
  >;
};

export type UserJoinedSubscriptionVariables = {};

export type UserJoinedSubscription = { __typename?: "Subscription" } & {
  userConnected: Maybe<
    { __typename?: "User" } & Pick<User, "id" | "name" | "picture_url">
  >;
};

import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

export const AddUserDocument = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      id
      name
      picture_url
      conversations {
        id
        users {
          id
          name
        }
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class AddUserGQL extends Apollo.Mutation<
  AddUserMutation,
  AddUserMutationVariables
> {
  document = AddUserDocument;
}
export const AddMessageDocument = gql`
  mutation addMessage(
    $content: String!
    $userIds: [ID!]!
    $conversationIds: ID
  ) {
    addMessage(
      content: $content
      userIds: $userIds
      conversationId: $conversationIds
    ) {
      content
      timestamp
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class AddMessageGQL extends Apollo.Mutation<
  AddMessageMutation,
  AddMessageMutationVariables
> {
  document = AddMessageDocument;
}
export const AddUserToConversationDocument = gql`
  mutation addUserToConversation($userId: ID!, $conversationID: ID!) {
    addUserToConversation(userId: $userId, conversationId: $conversationID) {
      id
      name
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class AddUserToConversationGQL extends Apollo.Mutation<
  AddUserToConversationMutation,
  AddUserToConversationMutationVariables
> {
  document = AddUserToConversationDocument;
}
export const ConversationsByUserDocument = gql`
  query conversationsByUser($userId: ID!) {
    conversationsByUser(userId: $userId) {
      id
      messages {
        content
        timestamp
      }
      users {
        id
        name
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class ConversationsByUserGQL extends Apollo.Query<
  ConversationsByUserQuery,
  ConversationsByUserQueryVariables
> {
  document = ConversationsByUserDocument;
}
export const MessagesDocument = gql`
  query messages {
    messages {
      content
      timestamp
      user {
        id
        name
        picture_url
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class MessagesGQL extends Apollo.Query<
  MessagesQuery,
  MessagesQueryVariables
> {
  document = MessagesDocument;
}
export const MessageAddedDocument = gql`
  subscription messageAdded {
    messageAdded {
      id
      content
      timestamp
      user {
        id
        name
        picture_url
      }
      conversation {
        id
        users {
          id
        }
      }
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class MessageAddedGQL extends Apollo.Subscription<
  MessageAddedSubscription,
  MessageAddedSubscriptionVariables
> {
  document = MessageAddedDocument;
}
export const UserJoinedDocument = gql`
  subscription userJoined {
    userConnected {
      id
      name
      picture_url
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class UserJoinedGQL extends Apollo.Subscription<
  UserJoinedSubscription,
  UserJoinedSubscriptionVariables
> {
  document = UserJoinedDocument;
}
