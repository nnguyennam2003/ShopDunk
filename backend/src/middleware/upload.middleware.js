import multer from 'multer';

const storage = multer.memoryStorage(); // dùng bộ nhớ RAM
const upload = multer({ storage });

export default upload;