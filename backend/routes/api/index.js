const router = require("express").Router();
const apiGestionProfile = require("./gestionProfile");
const apiProfileImage = require("./profileImage");
const apiUsers = require("./users");

router.use("/gestionProfile", apiGestionProfile)
router.use("/profileImage", apiProfileImage)
router.use("/users", apiUsers)

module.exports = router;