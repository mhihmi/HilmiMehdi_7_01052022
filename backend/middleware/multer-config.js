// import de Multer
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPES = { // File Ext Dictionary
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({ // multer storage setup
    destination: (req, file, callback) => { // save folder dest
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // replace space by underscore
        const normalizeName = name.replace(/[^\w]/gi, "");
        const extension = MIME_TYPES[file.mimetype]; // possible extensions
        const normalizeFile = normalizeName.replace(extension, "_");
        callback(null, normalizeFile + uuidv4() + '.' + extension); // unique file with timestamp
    }
});

// Export Multer Middleware - single() => unique file
module.exports = multer({ storage }).single('image');