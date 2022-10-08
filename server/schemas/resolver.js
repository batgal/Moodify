const { User } = require('../models');

const resolvers = {
    Query: {
        usernameAll: async () => {
            return User.find({});
        },
        usernameOne: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const profile = await User.create({ username, email, password });
            const token = signToken(profile);

            return { token, profile };
        },
        login: async (parent, { email, password }) => {
            const profile = await User.findOne({ email });

            if (!profile) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(profile);
            return { token, profile };
        },
    }
}

module.exports = resolvers;
