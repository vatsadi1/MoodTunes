const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller");
const { adminOnly } = require("../middlewares/admin.middleware");


const router = express.Router()

/**
 * POST /api/songs/
 */
router.post(
    "/",
    
    adminOnly,
    upload.fields([
        { name: "song", maxCount: 1 },
        { name: "poster", maxCount: 1 }
    ]),
    songController.uploadSong
);

router.get('/', songController.getSong)

module.exports = router