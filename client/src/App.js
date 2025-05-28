import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

function App() {
    const [url, setUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [error, setError] = useState('');

    const handleDownload = async () => {
        try {
            // Use relative path for API endpoint (works with proxy in development)
            const response = await axios.post('/download', { url });
            setVideoUrl(response.data.videoUrl);
            setError('');
        } catch (err) {
            setError(
                err.response?.data?.error ||
                'Invalid URL or failed to fetch video'
            );
            setVideoUrl('');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: 40 }}>
            <Typography variant="h4" gutterBottom>
                Video Downloader
            </Typography>
            <TextField
                label="Enter Instagram/X URL"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" onClick={handleDownload} style={{ marginBottom: 20 }}>
                Download
            </Button>
            {videoUrl && (
                <div>
                    <Typography variant="h6">Video Ready!</Typography>
                    <a href={videoUrl} download target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" color="success">
                            Download Video
                        </Button>
                    </a>
                </div>
            )}
            {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
}

export default App;
