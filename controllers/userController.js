// controllers/userController.js - 사용자 관련 비즈니스 로직
const store = require('../models/userStore.js');
const { parseBasicAuth } = require('../utils/auth');

// 회원가입 처리
exports.signup = (req, res) => {
  const { user_id, password } = req.body;

  // 필수 값 누락 확인
  if (!user_id || !password) {
    return res.status(400).json({ message: "Account creation failed", cause: "Required user_id and password" });
  }

  // 길이 조건 확인
  if (user_id.length < 6 || user_id.length > 20 || password.length < 8 || password.length > 20) {
    return res.status(400).json({ message: "Account creation failed", cause: "Input length is incorrect" });
  }

  // 문자 패턴 검사 (ASCII 범위)
  const pattern = /^[\x21-\x7E]+$/;
  if (!pattern.test(user_id) || !pattern.test(password)) {
    return res.status(400).json({ message: "Account creation failed", cause: "Incorrect character pattern" });
  }

  // 중복 ID 확인
  if (store.isExists(user_id)) {
    return res.status(400).json({ message: "Account creation failed", cause: "Already same user_id is used" });
  }

  // 계정 생성
  store.createUser(user_id, password);
  res.status(200).json({ message: "Account successfully created", user: { user_id, nickname: user_id } });
};

// 사용자 정보 조회
exports.getUser = (req, res) => {
  const { user_id: targetId } = req.params;
  const auth = parseBasicAuth(req.headers.authorization);
  const user = store.getUser(auth?.user_id);

  if (!auth || !user || user.password !== auth.password) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const target = store.getUser(targetId);
  if (!target) {
    return res.status(404).json({ message: "No user found" });
  }

  res.status(200).json({
    message: "User details by user_id",
    user: { user_id: targetId, nickname: target.nickname, comment: target.comment }
  });
};

// 사용자 정보 수정
exports.updateUser = (req, res) => {
  const { user_id } = req.params;
  const { nickname, comment, user_id: newId, password: newPw } = req.body;
  const auth = parseBasicAuth(req.headers.authorization);
  const user = store.getUser(auth?.user_id);

  if (!auth || !user || user.password !== auth.password) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  if (auth.user_id !== user_id) {
    return res.status(403).json({ message: "No permission for update" });
  }

  if (newId !== undefined || newPw !== undefined) {
    return res.status(400).json({ message: "Update failed", cause: "Not updatable user_id and password" });
  }

  if (nickname === undefined && comment === undefined) {
    return res.status(400).json({ message: "Update failed", cause: "Required nickname or comment" });
  }

  if ((nickname && nickname.length > 30) || (comment && comment.length > 100)) {
    return res.status(400).json({ message: "Update failed", cause: "Invalid nickname or comment" });
  }

  store.updateUser(user_id, { nickname, comment });

  res.status(200).json({
    message: "User successfully updated",
    user: { nickname: store.getUser(user_id).nickname, comment: store.getUser(user_id).comment }
  });
};

// 계정 삭제 처리
exports.deleteUser = (req, res) => {
  const auth = parseBasicAuth(req.headers.authorization);
  const user = store.getUser(auth?.user_id);

  if (!auth || !user || user.password !== auth.password) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  store.deleteUser(auth.user_id);
  res.status(200).json({ message: "Account and user successfully removed" });
};