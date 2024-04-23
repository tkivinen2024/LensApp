const LensItem = require("../../models/lens");
module.exports = async (_id) => {
    return await LensItem.findByIdAndDelete(_id).select("-__v").exec();
};
