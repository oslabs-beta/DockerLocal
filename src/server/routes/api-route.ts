const router = require('express').Router();
const db = require('../db/postgres');
require('dotenv/config');

/**
 * @route   GET /api
 * @desc    Testing GET requests for api route
 * @access  Public
 */
router.get('/', (req, res) => {
  res.sendStatus(200);
});

/**
 * @route   GET /api
 * @desc    Testing GET requests for api route
 * @access  Public
 */
router.post('/', (req, res) => {
  res.send('Hitting api POST endpoint');
});

/**
 * @route   GET /api/projects/:user_id
 * @desc    Returns an array of projects associated with a particular user
 * @access  Public (should be private)
 */
router.get('/projects/:user_id', async (req, res, next) => {
  try {
    const id = req.params.user_id;
    const query = `
    SELECT * FROM projects
    WHERE project_owner = '${id}';`;

    const result = await db.query(query);

    return res.json({ data: result.rows });
  } catch ({ message: msg }) {
    return next({ msg });
  }
});

/**
 * @route   GET /api/tasks/:project_id
 * @desc    Returns all tasks associated with a particular project in two arrays based on status
 * @access  Public (should be private)
 */
router.get('/tasks/:project_id', async (req, res) => {
  try {
    const id = req.params.project_id;
    const inProgressQuery = `
      SELECT * FROM tasks
      WHERE project_id = '${id}'
      AND status = 'in progress';`;

    const doneQuery = `
      SELECT * FROM tasks
      WHERE project_id = '${id}'
      AND status = 'done';`;

    const inProgressResult = await db.query(inProgressQuery);
    const doneResult = await db.query(doneQuery);

    res.json({
      inProgress: inProgressResult.rows,
      done: doneResult.rows,
    });
  } catch ({ message: msg }) {
    return next({ msg });
  }
});

module.exports = router;
