import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import VideoList from './components/VideoList';
import SubtitleList from './components/SubtitleList';
import './App.css';

const API = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [subtitles, setSubtitles] = useState([]);

  const handleSearch = async (kw) => {
    setKeyword(kw);
    setSelectedVideo(null);
    const res = await fetch(`${API}/search?keyword=${kw}`);
    const data = await res.json();
    setVideos(data);
  };

  const handleVideoSelect = async (video) => {
    setSelectedVideo(video);
    const res = await fetch(`${API}/subtitles?video=${video.video_id}&keyword=${keyword}`);
    const data = await res.json();
    setSubtitles(data);
  };

  return (
    <div className="container">
      <h1>MrBeast Video Search</h1>
      <p>Type a keyword to find where it's mentioned in MrBeast videos.</p>
      <SearchForm onSearch={handleSearch} />
            {selectedVideo && (
        <SubtitleList video={selectedVideo} subtitles={subtitles} />
      )}
      <VideoList videos={videos} onSelect={handleVideoSelect} selectedVideo={selectedVideo}/>
    </div>
  );
}

export default App;
