const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    try {
        let apiUrl, apiHost;
        if (url.includes('instagram.com')) {
            apiUrl = 'https://instagram-reels-downloader-api.p.rapidapi.com/download?url=https%3A%2F%2Fwww.instagram.com%2Freel%2FDJg8Hc_zkot%2F%3Figsh%3DMXFvaDhueHozZjQ2bQ%3D%3D'; // Replace with real endpoint
            apiHost = 'x-rapidapi-host: instagram-reels-downloader-api.p.rapidapi.com';
        } else if (url.includes('x.com') || url.includes('twitter.com')) {
            apiUrl = 'https://twitter241.p.rapidapi.com/tweet?pid=1631781099415257088'; // Replace with real endpoint
            apiHost = 'x-rapidapi-host: twitter241.p.rapidapi.com';
        } else {
            return res.status(400).json({ error: 'Unsupported URL' });
        }

        const response = await axios.get(apiUrl, {
            params: { url },
            headers: {
                'https://twitter241.p.rapidapi.com/tweet?pid=1631781099415257088': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host: twitter241.p.rapidapi.com': apiHost
            }
        });

        if (!response.data || !response.data.videoUrl) {
            return res.status(404).json({ error: 'Video not found or API did not return a video URL.' });
        }

        res.json({ videoUrl: response.data.videoUrl });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data || 'API error' });
        } else {
            res.status(500).json({ error: 'Failed to fetch video' });
        }
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 