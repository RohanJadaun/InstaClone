const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "insta-clone",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
          });
        }

        res.status(200).json({
          imageUrl: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};