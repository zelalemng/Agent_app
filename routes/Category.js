// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('./../controllers/Category');

router.get('/', getCategories);
router.post('/', createCategory);

// Add more routes as needed (update, delete)

module.exports = router;
