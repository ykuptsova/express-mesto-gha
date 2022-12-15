const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUser, getUserInfo, updateProfile, updateAvatar,
} = require('../controllers/users');

router.use(auth);
router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
