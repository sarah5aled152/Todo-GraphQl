import { TODO } from "../../../DB/models/todo-model.js";

export const todoResolvers = {
  singleTodo: async (_, args, context) => {
    if (!context.userId) throw new Error("Not authenticated");
    const todo = await TODO.findOne({ _id: args.id, user: context.userId });
    if (!todo) throw new Error("Todo not found");
    return todo;
  },

  allTodos: async (_, args, context) => {
    if (!context.userId) throw new Error("Not authenticated");
    return await TODO.find({ user: context.userId });
  },

  createTodo: async (_, args, context) => {
    if (!context.userId) throw new Error("Not authenticated");
    const todo = await TODO.create({
      ...args,
      user: context.userId,
    });
    return todo;
  },

  updateTodo: async (_, args, context) => {
    if (!context.userId) throw new Error("Not authenticated");
    const { id, ...updateData } = args;

    const todo = await TODO.findOneAndUpdate(
      { _id: id, user: context.userId },
      updateData,
      { new: true }
    );

    if (!todo) throw new Error("Todo not found");
    return todo;
  },

  deleteTodo: async (_, args, context) => {
    if (!context.userId) throw new Error("Not authenticated");

    const todo = await TODO.findOneAndDelete({
      _id: args.id,
      user: context.userId,
    });

    if (!todo) throw new Error("Todo not found");
    return { message: "Todo deleted successfully" };
  },
};
