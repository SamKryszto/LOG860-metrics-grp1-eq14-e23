// tasks.js (example route handler)

const express = require('express');
const { Task } = require('./sequelize');

const router = express.Router();

// GET /tasks/:taskId
router.get('/:taskId', (req, res) => {
  const { taskId } = req.params;
  
  Task.findOne({ where: { taskId } })
    .then((task) => {
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Server error' });
    });
});

// Other route handlers for tasks...

module.exports = router;