const express = require('express');

const auth = require('../middleware/auth');
const adminController = require('../controller/admin'); 

const router = express.Router();

//get admin page
router.get('/admin', adminController.getAdminPage);

//get group members
router.get('/admin/members', auth.auth, adminController.getMembers);


//post admin add
router.post('/admin/add', auth.auth, adminController.addfriend);

//post admin friend admin
router.post('/admin/admin', auth.auth, adminController.addAdmin);

//post admin remove
router.post('/admin/remove', auth.auth, adminController.removeUser);



module.exports = router;