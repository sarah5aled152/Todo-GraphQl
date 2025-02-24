import { User } from '../../../DB/models/user-model.js';
import { generateToken } from '../../utils/auth.js'

export const userResolvers = {
  me: async (_, args, context) => {
    if (!context.userId) throw new Error('Not authenticated');
    return await User.findById(context.userId);
  },

  signup: async (_, args) => {
    const user = await User.create(args);
    const token = generateToken(user._id);
    return { token, user };
  },

  login: async (_, args) => {
    const user = await User.findOne({ email: args.email });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await user.comparePassword(args.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken(user._id);
    return { token, user };
  },
};