const router = require('express').Router()
const {Playlist} = require('../models')
const validateSession = require('../middleware/validateSession')

router.get("/myplaylist",  (req, res) => {
    Playlist.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.get("/:id", validateSession, (req, res) => {
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

router.post('/createplaylist', validateSession, (req, res) => {
    
    const comment = {
        Title: req.body.Title,
        Songs: req.body.Songs
    };
    Playlist.create(comment)
        .then(comment => res.status(200).json(comment)
            .catch(err => res.status(500).json({ error: err.message || serverErrorMsg })
            ))
})


router.put("/:id", (req,res)=> {
    const query = req.params.id;

    Playlist.update(req.body, 
        { where: {id: query } })
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

router.delete('/:id', (req,res) => {
    Playlist.destroy({
        where: {id: req.params.id}
    })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.json(err))
})

module.exports = router
