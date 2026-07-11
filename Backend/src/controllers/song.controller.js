const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");

async function uploadSong(req, res) {
    try {

        const song = req.files?.song?.[0];
        const poster = req.files?.poster?.[0];

        const { title, mood } = req.body;

        if (!song) {
            return res.status(400).json({
                message: "Song file is required"
            });
        }

        if (!poster) {
            return res.status(400).json({
                message: "Poster image is required"
            });
        }

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!mood) {
            return res.status(400).json({
                message: "Mood is required"
            });
        }

        const [songFile, posterFile] = await Promise.all([

            storageService.uploadFile({
                buffer: song.buffer,
                filename: `${Date.now()}-${title}.mp3`,
                folder: "moodtunes/songs"
            }),

            storageService.uploadFile({
                buffer: poster.buffer,
                filename: `${Date.now()}-${title}.jpg`,
                folder: "moodtunes/posters"
            })

        ]);

        const createdSong = await songModel.create({
            title,
            mood,
            url: songFile.url,
            posterUrl: posterFile.url
        });

        return res.status(201).json({
            message: "Song uploaded successfully",
            song: createdSong
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: err.message
        });

    }
}

async function getSong(req, res) {

    const { mood } = req.query;

    const song = await songModel.findOne({ mood });

    return res.status(200).json({
        song
    });

}

module.exports = {
    uploadSong,
    getSong
};