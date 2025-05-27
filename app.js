const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// JSON 요청 본문을 파싱하도록 설정
app.use(bodyParser.json());

// 사용자 관련 라우트 연결
app.use(userRoutes);

module.exports = app;
