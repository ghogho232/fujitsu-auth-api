// utils/app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../routes/userRoutes'); // ⬅️ 이거 반드시 필요!

const app = express();
app.use(bodyParser.json());

// ✅ 라우터 등록
app.use(userRoutes);

module.exports = app;