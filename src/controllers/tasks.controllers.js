const pool = require('../db')

const getAllTasks = async (req, res, next) => {

    try {

        const result = await pool.query('SELECT * FROM task')

        console.log(result);
        res.json(result.rows)

    } catch (error) {
        next(error)
    }
}

const getSingleTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

        if (!result.rows.length) return res.json({ message: "Task not found" })
        console.log(result);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { title, description } = req.body

    try {

        const result = await pool.query(
            'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );

        console.log(result);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id])

        if (!result.rows.length) return res.json({ message: "Task not found" })
        console.log(result);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description } = req.body


        const result = await pool.query(
            'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        )

        if (!result.rows.length) return res.json({ message: "Task not found" })
        console.log(result);
        res.json(result.rows[0])

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    deleteTask,
    updateTask
}