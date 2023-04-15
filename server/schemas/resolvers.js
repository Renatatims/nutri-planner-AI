const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User } = require("../models");
const Nutri = require("../models/Nutri");
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
    nutriPlans: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const nutriPlans = await Nutri.find({ user: context.user._id }).populate(
        "user"
      );
      return nutriPlans;
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
    saveNutriPlan: async (parent, { nutriData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);

      const defaultTitle = `Meal Plan ${
        user.nutriPlans ? user.nutriPlans.length + 1 : 1
      }`;

      const nutriPlan = new Nutri({
        meals: nutriData.meals,
        title: nutriData.title || defaultTitle,
        user: context.user._id,
      });

      const savedNutriPlan = await nutriPlan.save();

      // Validate meal plan title
      if (!savedNutriPlan.title) {
        throw new UserInputError("Meal plan title cannot be null.");
      }

      user.nutriPlans.push(savedNutriPlan);
      await user.save();

      return user;
    },

    // Update meal Plan title
    updateNutriPlanTitle: async (parent, { nutriPlanId, title }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const nutriPlan = await Nutri.findById(nutriPlanId);

      if (!nutriPlan) {
        throw new UserInputError("No NutriPlan found with that ID");
      }
      //Update the title property with the new title input and save new title
      nutriPlan.title = title;
      const updatedNutriPlan = await nutriPlan.save();

      return updatedNutriPlan;
    },

    // Delete a meal plan from user's profile
    deleteNutriPlan: async (parent, { nutriPlanId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const user = await User.findById(context.user._id);

      // Check if the user has the meal plan
      const nutriPlanIndex = user.nutriPlans.findIndex(
        (plan) => plan._id.toString() === nutriPlanId
      );
      if (nutriPlanIndex === -1) {
        throw new UserInputError(
          "You don't have this meal plan in your profile."
        );
      }

      if (nutriPlanIndex != null) {

      // Remove the meal plan from the user's nutriPlans array
      user.nutriPlans.splice(nutriPlanIndex, 1);
      await user.save();
      }

      // Delete the meal plan from Nutri model
      await Nutri.findByIdAndDelete(nutriPlanId);

      return user;
    },
  },
};

module.exports = resolvers;
