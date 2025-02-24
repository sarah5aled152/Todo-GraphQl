
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
export const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    priority: { type: GraphQLString },
    dueDate: { type: GraphQLString },
    user: { type: GraphQLID },
  },
});
