const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  //Queries
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }
      throw new AuthenticationError("Not logged in");
    },
  },
  //Mutations
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      console.log(correctPw);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // Save a meal Plan to user's profile
    async saveNutriPlan(parent, { nutriData }, { user }) {
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to save a meal plan"
        );
      }
      // Add the new nutri plan to the user's nutriPlans array
      user.nutriPlans.push(nutriData);
      // Save the updated user to the database and return it
      return await user.save();
    },
  },
};

module.exports = resolvers;
