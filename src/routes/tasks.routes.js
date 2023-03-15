const { Router } = require('express');
const { getAllTasks, getSingleTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controllers')

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello World!")
})

router.get('/tasks/:id', getSingleTask)

router.get('/tasks', getAllTasks)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)

module.exports = router;