const router = require('express').Router()
const sequelize = require('sequelize')
const { School } = require ('../db')

router.get('/', (req,res,next) => {
    School.findAll()
    .then(data => res.send(data))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    School.findById(req.params.id)
    .then(school => school.update(req.body))
    .then(data => res.send(data))
    .catch(next)
})

router.post('/', (req,res,next) => {
    School.create(req.body)
    .then(data => res.send(data))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    School.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.sendStatus(201))
    .catch(next)
})

module.exports = router