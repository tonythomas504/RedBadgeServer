const router = require('express').Router()
const { Playlist } = require('../models')
const validateSession = require('../middleware/validateSession')

router.get("/", (req, res) => {
    // if (req.user.role === 'admin') {

    Playlist.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
    // } else {
    //     (req.user.role.userId === 'user'); {

    //     }
    // }
})

router.get("/:id", (req, res) => {
    Playlist.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createplaylist', (req, res) => {

    const playlist = {
        Title: req.body.Title,
        Songs: req.body.Songs,

    };
    Playlist.create(playlist)
        .then(playlist => res.status(200).json(playlist))
        .catch(err => res.status(500).json({ error: err.message || serverErrorMsg })
        )
})


router.put("/:id", (req, res) => {
    const query = req.params.id;

    Playlist.update(req.body,
        { where: { id: query } })
        .then((playlistUpdated) => {
            Playlist.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedPlaylist) => {
                    res.status(200).json({
                        rating: locatedUpdatedPlaylist,
                        message: "Playlist updated successful",
                        ratingChanged: playlistUpdated,
                    });
                });
        })

        .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Playlist.destroy({
        where: { id: req.params.id }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json(err))
})

module.exports = router
