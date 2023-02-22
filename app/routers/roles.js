const express = require('express');
const { rolesController } = require('../controllers');
const router = express.Router();

router.get('/roles', rolesController.getAll);
router.post('/role', rolesController.addRole);
router.get('/role/:id', rolesController.getRole);
router.patch('/role/:id', rolesController.updateRole);
router.delete('/role/:id', rolesController.deleteRole);


module.exports = router;