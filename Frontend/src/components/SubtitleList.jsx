import React, { useState } from 'react';

function SubtitleList({ video, subtitles }) {
  const [startTime, setStartTime] = useState(0);

  const handleSubtitleClick = (time) => {
    setStartTime(time);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const padded = (n) => n.toString().padStart(2, '0');

    if (h > 0) {
      return `${padded(h)}:${padded(m)}:${padded(s)}`;
    } else {
      return `${padded(m)}:${padded(s)}`;
    }
  };

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{video.title}</h3>

      <iframe
        key={startTime}
        src={`https://www.youtube.com/embed/${video.video_id}?start=${Math.floor(startTime)}&autoplay=1&modestbranding=1&rel=0`}
        title="YouTube video player"
        style={{
          width: '100%',
          maxWidth: '640px',
          height: '360px',
          border: 'none',
          marginBottom: '1.5rem',
        }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        {subtitles.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSubtitleClick(s.start_time)}
            style={{
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              padding: '8px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '90%',
              maxWidth: '600px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dbeeff'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          >
            [{formatTime(s.start_time)}] {s.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SubtitleList;
