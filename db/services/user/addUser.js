const bcryptjs = require("bcryptjs");

module.exports = async (user) => {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt);
    user.password = hash;
    return await user.save();
};
