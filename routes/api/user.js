const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    getUser
} = require('../../controllers/usersController');

const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)

    .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route('/:id')
    .get(getUser);

module.exports = router;    

