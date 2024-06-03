const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const datePrefix = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        cb(null, `${datePrefix}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
