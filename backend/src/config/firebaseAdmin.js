// import fs from 'fs';
// import admin from 'firebase-admin';

// // Nếu đang chạy ở môi trường production và chưa có file thì tạo
// const keyFilePath = './src/config/serviceAccountKey.json';

// if (process.env.FIREBASE_SERVICE_ACCOUNT && !fs.existsSync(keyFilePath)) {
//     fs.writeFileSync(keyFilePath, process.env.FIREBASE_SERVICE_ACCOUNT);
// }

// // Đọc file như cũ
// const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

// export default admin;