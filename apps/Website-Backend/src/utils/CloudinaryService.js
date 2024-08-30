import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadOnCloudinary, deleteImageFromCloudinary } from './Cloudinary.js'; // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where the uploaded files will be temporarily stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle avatar upload
app.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await uploadOnCloudinary(filePath);

        if (result) {
            res.status(200).json({
                message: 'Avatar uploaded successfully',
                url: result.url,
                public_id: result.public_id
            });
        } else {
            res.status(500).json({ message: 'Failed to upload avatar' });
        }
    } catch (error) {
        console.error('Error uploading avatar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete avatar from Cloudinary
app.delete('/delete-avatar', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        await deleteImageFromCloudinary(imageUrl);

        res.status(200).json({ message: 'Avatar deleted successfully' });
    } catch (error) {
        console.error('Error deleting avatar:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

