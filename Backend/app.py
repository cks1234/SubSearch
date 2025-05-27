from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = 'subtitles.db'

@app.route('/')
def home():
    return 'Flask API is running!'

@app.route('/search')
def search_videos():
    keyword = request.args.get('keyword', '')
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        SELECT DISTINCT video_id, video_title
        FROM subtitles
        WHERE text LIKE ?
        LIMIT 50
    """, (f'%{keyword}%',))
    results = cur.fetchall()
    conn.close()

    return jsonify([
        {'video_id': row[0], 'title': row[1]} for row in results
    ])

@app.route('/subtitles')
def get_subtitles():
    video_id = request.args.get('video')
    keyword = request.args.get('keyword', '')
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        SELECT start_time, text
        FROM subtitles
        WHERE video_id = ? AND text LIKE ?
        ORDER BY start_time
    """, (video_id, f'%{keyword}%',))
    results = cur.fetchall()
    conn.close()

    return jsonify([
        {'start_time': row[0], 'text': row[1]} for row in results
    ])

if __name__ == '__main__':
    app.run(debug=True)
