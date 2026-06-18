// multer take the file image and convert it to js object

const multer = require("multer");

// save file to ram temporarily not in the disk so that file will save on cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

module.exports = upload;