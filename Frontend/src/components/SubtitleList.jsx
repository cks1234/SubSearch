import React, { useState } from 'react';

function SubtitleList({ video, subtitles }) {
  const [startTime, setStartTime] = useState(0);

  const handleSubtitleClick = (time) => {
    setStartTime(time);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>{video.title}</h3>

      {/* Youtube embed player */}
      <iframe
        width="560"
        height="315"
        key={startTime} 
        src={`https://www.youtube.com/embed/${video.video_id}?start=${Math.floor(startTime)}&autoplay=1&modestbranding=1&rel=0`}
        title="YouTube video"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>

      <ul>
        {subtitles.map((s, idx) => (
          <li key={idx}>
            <button
              style={{ margin: '5px 0', padding: '4px 10px' }}
              onClick={() => handleSubtitleClick(s.start_time)}
            >
              [{Math.floor(s.start_time)}s] {s.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubtitleList;
