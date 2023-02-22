const express = require('express');
const { tagsController } = require('../controllers');

const router = express.Router();

router.get('/tags', tagsController.getAll);
router.post('/tag', tagsController.addTag);
router.get('/tag/:id', tagsController.getTag);
router.patch('/tag/:id', tagsController.updateTag);
router.delete('/tag/:id', tagsController.deleteTag);


module.exports = router;