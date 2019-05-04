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
   id: Scalars['ID'];
   users?: Maybe<Array<Maybe<User>>>;
   messages?: Maybe<Array<Maybe<Message>>>;
   timestamp?: Maybe<Scalars['Float']>;
};

export type Message = {
   id: Scalars['ID'];
   content?: Maybe<Scalars['String']>;
   user?: Maybe<User>;
   conversation?: Maybe<Conversation>;
   timestamp?: Maybe<Scalars['Float']>;
};

export type Mutation = {
   addUser?: Maybe<User>;
   addMessage?: Maybe<Message>;
   addUserToConversation?: Maybe<User>;
   createConversation?: Maybe<Conversation>;
};

export type MutationAddUserArgs = {
   name: Scalars['String'];
   password: Scalars['String'];
};

export type MutationAddMessageArgs = {
   content: Scalars['String'];
   userId: Scalars['ID'];
   conversationId: Scalars['ID'];
};

export type MutationAddUserToConversationArgs = {
   userId: Scalars['ID'];
   conversationId: Scalars['ID'];
};

export type MutationCreateConversationArgs = {
   userIds: Array<Scalars['ID']>;
};

export type Query = {
   conversation?: Maybe<Conversation>;
   conversationsByUser?: Maybe<Array<Maybe<Conversation>>>;
   conversationsByUsers?: Maybe<Array<Maybe<Conversation>>>;
   conversations?: Maybe<Array<Maybe<Conversation>>>;
   user?: Maybe<User>;
   users?: Maybe<Array<Maybe<User>>>;
   connectUser?: Maybe<User>;
   messages?: Maybe<Array<Maybe<Message>>>;
};

export type QueryConversationArgs = {
   id: Scalars['ID'];
};

export type QueryConversationsByUserArgs = {
   userId: Scalars['ID'];
};

export type QueryConversationsByUsersArgs = {
   userIds: Array<Scalars['ID']>;
};

export type QueryUserArgs = {
   id: Scalars['ID'];
};

export type QueryConnectUserArgs = {
   name: Scalars['String'];
   password: Scalars['String'];
};

export type Subscription = {
   messageAdded?: Maybe<Message>;
   userConnected?: Maybe<User>;
   newConversation?: Maybe<Conversation>;
};

export type User = {
   id: Scalars['ID'];
   name?: Maybe<Scalars['String']>;
   picture_url?: Maybe<Scalars['String']>;
   conversations?: Maybe<Array<Maybe<Conversation>>>;
   password?: Maybe<Scalars['String']>;
};
export type AddUserMutationVariables = {
   name: Scalars['String'];
   password: Scalars['String'];
};

export type AddUserMutation = { __typename?: 'Mutation' } & {
   addUser: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'> & {
      conversations: Maybe<Array<Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
         'id' | 'timestamp'> & {
         users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>>;
      }>>>;
   }>;
};

export type AddMessageMutationVariables = {
   content: Scalars['String'];
   userId: Scalars['ID'];
   conversationId: Scalars['ID'];
};

export type AddMessageMutation = { __typename?: 'Mutation' } & {
   addMessage: Maybe<{ __typename?: 'Message' } & Pick<Message,
      'id' | 'content' | 'timestamp'> & {
      conversation: Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
         'timestamp' | 'id'>>;
      user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
   }>;
};

export type CreateConversationMutationVariables = {
   userIds: Array<Scalars['ID']>;
};

export type CreateConversationMutation = { __typename?: 'Mutation' } & {
   createConversation: Maybe<{ __typename?: 'Conversation' } & Pick<Conversation, 'id' | 'timestamp'> & {
      messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
         'content' | 'id' | 'timestamp'> & {
         user: Maybe<{ __typename?: 'User' } & Pick<User,
            'id' | 'name' | 'picture_url'>>;
      }>>>;
      users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User,
         'id' | 'name' | 'picture_url'>>>>;
   }>;
};

export type AddUserToConversationMutationVariables = {
   userId: Scalars['ID'];
   conversationID: Scalars['ID'];
};

export type AddUserToConversationMutation = { __typename?: 'Mutation' } & {
   addUserToConversation: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>;
};

export type ConversationsByUserQueryVariables = {
   userId: Scalars['ID'];
};

export type ConversationsByUserQuery = { __typename?: 'Query' } & {
   conversationsByUser: Maybe<Array<Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
      'id' | 'timestamp'> & {
      messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
         'content' | 'timestamp'>>>>;
      users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>>;
   }>>>;
};

export type ConversationsByUsersQueryVariables = {
   userIds: Array<Scalars['ID']>;
};

export type ConversationsByUsersQuery = { __typename?: 'Query' } & {
   conversationsByUsers: Maybe<Array<Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
      'id' | 'timestamp'> & {
      messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
         'id' | 'content' | 'timestamp'> & {
         user: Maybe<{ __typename?: 'User' } & Pick<User,
            'id' | 'picture_url' | 'name'>>;
      }>>>;
      users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User,
         'id' | 'name' | 'picture_url'>>>>;
   }>>>;
};

export type MessagesQueryVariables = {};

export type MessagesQuery = { __typename?: 'Query' } & {
   messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message, 'content' | 'timestamp'> & {
      user: Maybe<{ __typename?: 'User' } & Pick<User,
         'id' | 'name' | 'picture_url'>>;
   }>>>;
};

export type UsersQueryVariables = {};

export type UsersQuery = { __typename?: 'Query' } & {
   users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>>;
};

export type UserQueryVariables = {
   id: Scalars['ID'];
};

export type UserQuery = { __typename?: 'Query' } & {
   user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'> & {
      conversations: Maybe<Array<Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
         'id' | 'timestamp'> & {
         messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
            'id' | 'content' | 'timestamp'> & {
            user: Maybe<{ __typename?: 'User' } & Pick<User,
               'id' | 'picture_url' | 'name'>>;
         }>>>;
         users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User,
            'id' | 'name' | 'picture_url'>>>>;
      }>>>;
   }>;
};

export type ConversationQueryVariables = {
   id: Scalars['ID'];
};

export type ConversationQuery = { __typename?: 'Query' } & {
   conversation: Maybe<{ __typename?: 'Conversation' } & Pick<Conversation, 'id' | 'timestamp'> & {
      messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
         'content' | 'id' | 'timestamp'> & {
         user: Maybe<{ __typename?: 'User' } & Pick<User,
            'id' | 'name' | 'picture_url'>>;
      }>>>;
      users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User,
         'id' | 'name' | 'picture_url'>>>>;
   }>;
};

export type MessageAddedSubscriptionVariables = {};

export type MessageAddedSubscription = { __typename?: 'Subscription' } & {
   messageAdded: Maybe<{ __typename?: 'Message' } & Pick<Message,
      'id' | 'content' | 'timestamp'> & {
      user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
      conversation: Maybe<{ __typename?: 'Conversation' } & Pick<Conversation,
         'id' | 'timestamp'> & {
         users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>>>;
      }>;
   }>;
};

export type UserJoinedSubscriptionVariables = {};

export type UserJoinedSubscription = { __typename?: 'Subscription' } & {
   userConnected: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'picture_url'>>;
};

export type NewConversationSubscriptionVariables = {};

export type NewConversationSubscription = { __typename?: 'Subscription' } & {
   newConversation: Maybe<{ __typename?: 'Conversation' } & Pick<Conversation, 'id'> & {
      messages: Maybe<Array<Maybe<{ __typename?: 'Message' } & Pick<Message,
         'content' | 'id' | 'timestamp'> & {
         user: Maybe<{ __typename?: 'User' } & Pick<User,
            'id' | 'name' | 'picture_url'>>;
      }>>>;
      users: Maybe<Array<Maybe<{ __typename?: 'User' } & Pick<User,
         'id' | 'name' | 'picture_url'>>>>;
   }>;
};

import gql from 'graphql-tag';
import {Injectable} from '@angular/core';
import * as Apollo from 'apollo-angular';

export const AddUserDocument = gql`
   mutation addUser($name: String!, $password: String!) {
      addUser(name: $name, password: $password) {
         id
         name
         picture_url
         conversations {
            id
            timestamp
            users {
               id
               name
            }
         }
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
   mutation addMessage($content: String!, $userId: ID!, $conversationId: ID!) {
      addMessage(
         content: $content
         userId: $userId
         conversationId: $conversationId
      ) {
         id
         content
         timestamp
         conversation {
            timestamp
            id
         }
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
export class AddMessageGQL extends Apollo.Mutation<AddMessageMutation,
   AddMessageMutationVariables> {
   document = AddMessageDocument;
}

export const CreateConversationDocument = gql`
   mutation createConversation($userIds: [ID!]!) {
      createConversation(userIds: $userIds) {
         id
         timestamp
         messages {
            content
            id
            timestamp
            user {
               id
               name
               picture_url
            }
         }
         users {
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
export class CreateConversationGQL extends Apollo.Mutation<CreateConversationMutation,
   CreateConversationMutationVariables> {
   document = CreateConversationDocument;
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
   providedIn: 'root'
})
export class AddUserToConversationGQL extends Apollo.Mutation<AddUserToConversationMutation,
   AddUserToConversationMutationVariables> {
   document = AddUserToConversationDocument;
}

export const ConversationsByUserDocument = gql`
   query conversationsByUser($userId: ID!) {
      conversationsByUser(userId: $userId) {
         id
         timestamp
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
   providedIn: 'root'
})
export class ConversationsByUserGQL extends Apollo.Query<ConversationsByUserQuery,
   ConversationsByUserQueryVariables> {
   document = ConversationsByUserDocument;
}

export const ConversationsByUsersDocument = gql`
   query conversationsByUsers($userIds: [ID!]!) {
      conversationsByUsers(userIds: $userIds) {
         id
         timestamp
         messages {
            id
            content
            timestamp
            user {
               id
               picture_url
               name
            }
         }
         users {
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
export class ConversationsByUsersGQL extends Apollo.Query<ConversationsByUsersQuery,
   ConversationsByUsersQueryVariables> {
   document = ConversationsByUsersDocument;
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

export const UsersDocument = gql`
   query users {
      users {
         id
         name
      }
   }
`;

@Injectable({
   providedIn: 'root'
})
export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
   document = UsersDocument;
}

export const UserDocument = gql`
   query user($id: ID!) {
      user(id: $id) {
         id
         name
         picture_url
         conversations {
            id
            timestamp
            messages {
               id
               content
               timestamp
               user {
                  id
                  picture_url
                  name
               }
            }
            users {
               id
               name
               picture_url
            }
         }
      }
   }
`;

@Injectable({
   providedIn: 'root'
})
export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
   document = UserDocument;
}

export const ConversationDocument = gql`
   query conversation($id: ID!) {
      conversation(id: $id) {
         id
         timestamp
         messages {
            content
            id
            timestamp
            user {
               id
               name
               picture_url
            }
         }
         users {
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
export class ConversationGQL extends Apollo.Query<ConversationQuery,
   ConversationQueryVariables> {
   document = ConversationDocument;
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
            timestamp
            users {
               id
            }
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

export const NewConversationDocument = gql`
   subscription newConversation {
      newConversation {
         id
         messages {
            content
            id
            timestamp
            user {
               id
               name
               picture_url
            }
         }
         users {
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
export class NewConversationGQL extends Apollo.Subscription<NewConversationSubscription,
   NewConversationSubscriptionVariables> {
   document = NewConversationDocument;
}
