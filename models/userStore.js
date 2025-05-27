
const users = {}; // 메모리 기반 저장소

users["TaroYamada"] = {
  password: "PaSSw4dTY",
  nickname: "たろー",
  comment: "僕は元気です"
};

module.exports = {
  // 사용자 정보 가져오기
  getUser: (id) => users[id] || null,

  // 존재 여부 확인
  isExists: (id) => !!users[id],

  // 사용자 생성
  createUser: (id, password) => {
    users[id] = { password, nickname: id, comment: "" };
  },

  // 사용자 정보 수정
  updateUser: (id, { nickname, comment }) => {
    if (nickname !== undefined) users[id].nickname = nickname;
    if (comment !== undefined) users[id].comment = comment;
  },

  // 사용자 삭제
  deleteUser: (id) => {
    delete users[id];
  }
};
