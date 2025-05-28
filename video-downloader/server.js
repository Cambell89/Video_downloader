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
        let apiUrl, apiHost, params;
        if (url.includes('instagram.com')) {
            apiUrl = 'https://instagram-reels-downloader-api.p.rapidapi.com/download';
            apiHost = 'instagram-reels-downloader-api.p.rapidapi.com';
            params = { url };
        } else if (url.includes('x.com') || url.includes('twitter.com')) {
            apiUrl = 'https://twitter241.p.rapidapi.com/tweet';
            apiHost = 'twitter241.p.rapidapi.com';
            params = { url }; // Adjust according to the API docs if needed
        } else {
            return res.status(400).json({ error: 'Unsupported URL' });
        }

        const response = await axios.get(apiUrl, {
            params,
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': apiHost
            }
        });

        // Adjust this according to the actual API response structure
        const videoUrl = response.data.video || response.data.videoUrl || response.data.result?.video;
        if (!videoUrl) {
            return res.status(404).json({ error: 'Video not found or API did not return a video URL.' });
        }

        res.json({ videoUrl });
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