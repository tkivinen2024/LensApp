const bcryptjs = require("bcryptjs");
module.exports = async (candidatePassword, hashedPassword) => {
    return await bcryptjs.compare(candidatePassword, hashedPassword);
};
