const router = require('express').Router()
const { Comments } = require('../models')
const validateSession = require('../middleware/validateSession')

router.get("/mycomments", (req, res) => {

    Comments.findAll()
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.get("/:id", (req, res) => {
    Comments.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({
            error: err
        }))
})

router.post('/createcomment', (req, res) => {

    const comment = {
        Title: req.body.Title,
        Body: req.body.Body,
    };
    Comments.create(comment)
        .then(comment => res.status(200).json(comment)
            .catch(err => res.status(500).json({ error: err.message || serverErrorMsg })
            ))
})


router.put("/:id", (req, res) => {
    const query = req.params.id;

    Comments.update(req.body,
        { where: { id: query } })
        .then((commentUpdated) => {
            Comments.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedComment) => {
                    res.status(200).json({
                        rating: locatedUpdatedComment,
                        message: "Comment updated successful",
                        ratingChanged: commentUpdated,
                    });
                });
        })

        .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    Comments.destroy({
        where: { id: req.params.id }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.json(err))
})

module.exports = router
