const express = require("express");
const passport = require("passport");
// --------------------------------
// --- DB Models
// --------------------------------
const LensItem = require("../db/models/lens");
// --------------------------------
// --- DB Services
// --------------------------------
const getLenses = require("../db/services/lens/getLenses");
const addLens = require("../db/services/lens/addLens");
const deleteLensById = require("../db/services/lens/deleteLensById");

const router = express.Router();

router.get("/items", async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            msg: "All Lenses",
            items: await getLenses(),
        });
    } catch (err) {
        console.error(err);
    }
    return res.status(500).json({
        success: false,
        msg: "Error hass occurred",
    });
});

router.post(
    "/items",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        try {
            if (req.body.item) {
                const item = await addLens(
                    new LensItem({
                        name: req.body.item.name,
                        focallength: req.body.item.focallength,
                        category: req.body.item.category,
                        price: req.body.item.price,
                    })
                );
                return res.status(201).json({
                    success: true,
                    msg: "Added a new lens",
                    item: item,
                });
            }
        } catch (err) {
            console.error(err);
        }
        return res.status(400).json({
            success: false,
            msg: "Error: invalid request body",
        });
    }
);

router.delete(
    "/items/:_id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (req.params._id) {
            try {
                const deletedLens = await deleteLensById(req.params._id);
                if (deletedLens) {
                    return res.status(200).json({
                        success: true,
                        msg: "Removed a Lens",
                        item: deletedLens,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        }
        return res.status(400).json({
            success: false,
            msg: "N/A",
        });
    }
);

module.exports = router;
