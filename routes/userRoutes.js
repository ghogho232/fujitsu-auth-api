// routes/userRoutes.js - 사용자 관련 API 엔드포인트 정의
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 회원가입 (POST /signup)
router.post('/signup', userController.signup);

// 사용자 정보 조회 (GET /users/:user_id)
router.get('/users/:user_id', userController.getUser);

// 사용자 정보 수정 (PATCH /users/:user_id)
router.patch('/users/:user_id', userController.updateUser);

// 계정 삭제 (POST /close)
router.post('/close', userController.deleteUser);

module.exports = router;
