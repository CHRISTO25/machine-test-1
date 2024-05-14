
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/avif': 'avif',
    'text/csv': 'csv', // MIME type for CSV files
    'application/csv': 'csv', // Alternate MIME type for CSV files
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '_' + file.originalname;
        cb(null, fileName)
    }
})

const store = multer({ storage: storage });

 export default store
