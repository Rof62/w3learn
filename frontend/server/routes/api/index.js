const router = require("express").Router();
const apiGestionProfile = require("./gestionProfile");
const apiProfileImage = require("./profileImage");
const apiUsers = require("./users");
const apiAdmin = require("./admin");

router.use("/gestionProfile", apiGestionProfile)
router.use("/profileImage", apiProfileImage)
router.use("/users", apiUsers)
router.use("/admin", apiAdmin)

module.exports = router;