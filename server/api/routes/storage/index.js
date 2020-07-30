const { Router } = require('express')
const multer = require('multer');

const jwt = require('../../middlewares/jwt');

const upload = require('./upload');

const uploader = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => {
      const match = file.originalname.match(/\.\w+$/);
      let name = (+new Date()).toString();

      if (match !== null) {
        name += match[0];
      }
      cb(null, name);
    },
  }),
});

const router = Router();

router.use(jwt());

router.post('/upload', uploader.single('file'), upload.post);

module.exports = () => router;