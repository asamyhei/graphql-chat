export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
};

export type Message = {
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  timestamp?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  addUser?: Maybe<User>;
  addMessage?: Maybe<Message>;
};

export type MutationAddUserArgs = {
  name: Scalars['String'];
};

export type MutationAddMessageArgs = {
  content: Scalars['String'];
  userId: Scalars['ID'];
};

export type Query = {
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  message?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryMessageArgs = {
  id: Scalars['ID'];
};

export type Subscription = {
  messageAdded?: Maybe<Message>;
  userConnected?: Maybe<User>;
};

export type User = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  picture_url?: Maybe<Scalars['String']>;
};
export type AddUserMutationVariables = {
  name: Scalars['String'];
};

export type AddUserMutation = { __typename?: 'Mutation' } & {
  addUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
};

export type AddMessageMutationVariables = {
  content: Scalars['String'];
  userId: Scalars['ID'];
};

export type AddMessageMutation = { __typename?: 'Mutation' } & {
  addMessage: Maybe<{ __typename?: 'Message' } & Pick<Message, 'content' | 'timestamp'>>;
};

export type MessagesQueryVariables = {};

export type MessagesQuery = { __typename?: 'Query' } & {
  messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message, 'content' | 'timestamp'> & {
    user: Maybe<{ __typename?: 'User' } & Pick<User,
      'id' | 'name' | 'picture_url'>>;
  }>>>;
};

export type MessageAddedSubscriptionVariables = {};

export type MessageAddedSubscription = { __typename?: 'Subscription' } & {
  messageAdded: Maybe<{ __typename?: 'Message' } & Pick<Message,
    'id' | 'content' | 'timestamp'> & {
    user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
  }>;
};

export type UserJoinedSubscriptionVariables = {};

export type UserJoinedSubscription = { __typename?: 'Subscription' } & {
  userConnected: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
};

import gql from 'graphql-tag';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

export const AddUserDocument = gql`
  mutation addUser($name: String!) {
    addUser(name: $name) {
      id
      name
      picture_url
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AddUserGQL extends Apollo.Mutation<AddUserMutation,
  AddUserMutationVariables> {
  document = AddUserDocument;
}

export const AddMessageDocument = gql`
  mutation addMessage($content: String!, $userId: ID!) {
    addMessage(content: $content, userId: $userId) {
      content
      timestamp
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AddMessageGQL extends Apollo.Mutation<AddMessageMutation,
  AddMessageMutationVariables> {
  document = AddMessageDocument;
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
  providedIn: 'root'
})
export class MessagesGQL extends Apollo.Query<MessagesQuery,
  MessagesQueryVariables> {
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
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MessageAddedGQL extends Apollo.Subscription<MessageAddedSubscription,
  MessageAddedSubscriptionVariables> {
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
  providedIn: 'root'
})
export class UserJoinedGQL extends Apollo.Subscription<UserJoinedSubscription,
  UserJoinedSubscriptionVariables> {
  document = UserJoinedDocument;
}
