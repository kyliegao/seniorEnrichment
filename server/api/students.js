const router = require('express').Router()
const sequelize = require('sequelize')
const { Student, School } = require ('../db')

router.get('/', (req,res,next) => {
    Student.findAll({include: School})
    .then(data => res.send(data))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Student.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.sendStatus(201))
    .catch(next)
})

router.post('/', (req,res,next) => {
    Student.create(req.body)
    .then(data => res.send(data))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Student.findById(req.params.id)
    .then(student => student.update(req.body))
    .then(data => res.send(data))
    .catch(next)
})

module.exports = router