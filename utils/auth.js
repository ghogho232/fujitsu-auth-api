// utils/auth.js - Basic 인증 파싱 유틸리티

// Authorization 헤더에서 user_id와 password를 추출
exports.parseBasicAuth = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Basic ')) return null;
  
    // "Basic " 접두사 제거 후 Base64 디코딩
    const encoded = authHeader.slice(6);
    const decoded = Buffer.from(encoded, 'base64').toString();
  
    const [user_id, password] = decoded.split(':');
    if (!user_id || !password) return null;
  
    return { user_id, password };
  };
  