import React from 'react';

function VideoList({ videos, onSelect }) {
  return (
    <ul>
      {videos.map((video) => (
        <li key={video.video_id}>
          <button onClick={() => onSelect(video)}>
            {video.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default VideoList;
