const LensItem = require("../../models/lens");

module.exports = async () => {
    return await LensItem.find().select("-__v").exec();
};
