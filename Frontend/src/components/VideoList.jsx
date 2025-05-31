import React from 'react';

function VideoList({ videos, onSelect, selectedVideo }) {
  const handleClick = (video) => {
    onSelect(video);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {videos.map((video) => {
        const isSelected = selectedVideo?.video_id === video.video_id;

        return (
          <div
            key={video.video_id}
            onClick={() => handleClick(video)}
            style={{
              padding: '12px',
              backgroundColor: isSelected ? '#cce4ff' : '#e8f0fe',
              border: isSelected ? '2px solid #1a73e8' : '1px solid #cdd6e3',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s, border 0.2s',
              fontWeight: isSelected ? 'bold' : 'normal'
            }}
            onMouseEnter={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = '#d2e3fc';
            }}
            onMouseLeave={(e) => {
              if (!isSelected) e.currentTarget.style.backgroundColor = '#e8f0fe';
            }}
          >
            {video.title}
          </div>
        );
      })}
    </div>
  );
}

export default VideoList;
