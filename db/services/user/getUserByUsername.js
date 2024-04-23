const User = require("../../models/user");

module.exports = async (username) => {
    return await User.findOne({ username: username }).exec();
};
