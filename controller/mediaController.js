const Media = require('../model/mediaModel');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'df1qnqmit',
  api_key: '944177449749656',
  api_secret: '8N1gnuaZd0dChIEz6klOeNZopD4',
});

// Create a new media
exports.create = async (req, res) => {
  const { recipe } = req.body;
  let imageUrl = '';

  try {
    if (req.files && req.files.image && req.files.image.length > 0) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path, {
        folder: 'Images',
        overwrite: true,
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.files.image[0].path);
    }

    const createMedia = await Media.create({
      recipe,
      image: imageUrl,
    });

    res.json({ message: 'Media created successfully', createMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create media' });
  }
};

// Get all media
exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get media' });
  }
};

// Get media by ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(media);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get media' });
  }
};

// Update media by ID
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { recipe } = req.body;

  try {
    const media = await Media.findByIdAndUpdate(
      id,
      { recipe },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json({ message: 'Media updated successfully', media });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update media' });
  }
};

// Delete media by ID
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const media = await Media.findByIdAndDelete(id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Add code to delete associated media files from Cloudinary

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
};
