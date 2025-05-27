import os
import sqlite3
import webvtt
import re

# DB 연결 및 테이블 생성
conn = sqlite3.connect('subtitles.db')
cur = conn.cursor()

cur.execute('''
CREATE TABLE IF NOT EXISTS subtitles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id TEXT,
    video_title TEXT,
    start_time REAL,
    text TEXT
)
''')

# 자막 폴더 경로
CAPTION_DIR = 'captions'

# 파일 반복
for file in os.listdir(CAPTION_DIR):
    if file.endswith('.en.vtt'):
        print(f"Processing {file}")
        filepath = os.path.join(CAPTION_DIR, file)

        # 영상 ID 추출
        match = re.search(r'\[([^\]]{11,})\]', file)
        if not match:
            print(f"⚠️ VIDEO_ID not found in filename: {file}")
            continue
        video_id = match.group(1)
        video_title = file.replace('.en.vtt', '').replace(f'[{video_id}]', '').strip()

        for caption in webvtt.read(filepath):
            start_sec = (
                int(caption.start[:2]) * 3600 +
                int(caption.start[3:5]) * 60 +
                float(caption.start[6:].replace(',', '.'))
            )
            text = caption.text.replace('\n', ' ').strip()
            cur.execute('INSERT INTO subtitles (video_id, video_title, start_time, text) VALUES (?, ?, ?, ?)',
                        (video_id, video_title, start_sec, text))

conn.commit()
conn.close()
print("✅ All subtitles saved to subtitles.db")
