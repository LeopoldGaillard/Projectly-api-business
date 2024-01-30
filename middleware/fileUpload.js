const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        callback(null, `Projectly_${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };