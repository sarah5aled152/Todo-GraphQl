import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { UserType, AuthPayloadType } from "./types/user.types.js";
import { TodoType } from "./types/todo.types.js";
import { userResolvers } from "./resolvers/user.resolver.js";
import { todoResolvers } from "./resolvers/todo.resolver.js";

// Define Query type
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    // User queries
    me: {
      type: UserType,
      resolve: userResolvers.me,
    },

    // Todo queries
    singleTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: todoResolvers.singleTodo,
    },
    allTodos: {
      type: new GraphQLList(TodoType),
      resolve: todoResolvers.allTodos,
    },
  },
});

// Define Mutation type
const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // User mutations
    signup: {
      type: AuthPayloadType,
      args: {
        userName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: userResolvers.signup,
    },
    login: {
      type: AuthPayloadType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: userResolvers.login,
    },

    createTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        priority: { type: GraphQLString },
        dueDate: { type: GraphQLString },
      },
      resolve: todoResolvers.createTodo,
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        priority: { type: GraphQLString },
        dueDate: { type: GraphQLString },
      },
      resolve: todoResolvers.updateTodo,
    },
    deleteTodo: {
      type: new GraphQLObjectType({
        name: "DeleteTodoResponse",
        fields: {
          message: { type: GraphQLString },
        },
      }),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: todoResolvers.deleteTodo,
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
