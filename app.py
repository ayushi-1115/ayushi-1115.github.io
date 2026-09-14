"""
Ayushi Patel — Portfolio Backend API
Built with Python (Flask) for contact handling, live Haversine geofencing demo, and resume downloads.
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import math
import os
import datetime

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend calls

# In-memory / File storage for contact messages
MESSAGES_FILE = os.path.join(os.path.dirname(__file__), 'messages.json')

def calculate_haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance between two points 
    on the Earth using the Haversine formula (in kilometers).
    """
    R = 6371.0  # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return round(distance, 2)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "developer": "Ayushi Patel",
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = [
        {
            "id": "geohack",
            "title": "GeoHack — Real-Time Geofencing System",
            "category": "Spatial System & Backend",
            "repo": "https://github.com/ayushi-1115/geohack",
            "tech": ["Python", "FastAPI", "Haversine Algorithm", "GeoJSON"]
        },
        {
            "id": "docs-as-code",
            "title": "Docs-as-Code Automated Conversion Suite",
            "category": "Python Automation",
            "repo": "https://github.com/ayushi-1115/ayushi-1115.github.io",
            "tech": ["Python", "python-docx", "Markdown AST", "OpenAPI"]
        },
        {
            "id": "leafypop",
            "title": "LeafyPop — Microgreens E-Commerce Platform",
            "category": "Full-Stack Application",
            "demo": "https://leafypop.onrender.com",
            "repo": "https://github.com/ayushi-1115",
            "tech": ["Python", "Django", "PostgreSQL", "Cloudinary", "Render"]
        }
    ]
    return jsonify({"success": True, "data": projects})

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"success": False, "error": "Name, email, and message are required."}), 400
    
    entry = {
        "name": data.get('name'),
        "email": data.get('email'),
        "subject": data.get('subject', 'General Inquiry'),
        "message": data.get('message'),
        "timestamp": datetime.datetime.now().isoformat()
    }
    
    print(f"[NEW CONTACT MESSAGE] From {entry['name']} ({entry['email']}): {entry['message']}")
    
    return jsonify({
        "success": True, 
        "message": f"Thank you, {entry['name']}! Your message has been safely received by Ayushi's backend server."
    })

@app.route('/api/geohack/calculate', methods=['POST'])
def run_geohack_demo():
    """Live interactive Haversine distance calculator API for GeoHack demo."""
    data = request.get_json()
    try:
        lat1 = float(data.get('lat1', 0))
        lon1 = float(data.get('lon1', 0))
        lat2 = float(data.get('lat2', 0))
        lon2 = float(data.get('lon2', 0))
        radius_km = float(data.get('radius_km', 5.0))
        
        distance_km = calculate_haversine(lat1, lon1, lat2, lon2)
        inside_geofence = distance_km <= radius_km
        
        return jsonify({
            "success": True,
            "distance_km": distance_km,
            "radius_km": radius_km,
            "inside_geofence": inside_geofence,
            "status": "WITHIN_BOUNDS" if inside_geofence else "OUT_OF_BOUNDS"
        })
    except (ValueError, TypeError) as e:
        return jsonify({"success": False, "error": f"Invalid coordinate input: {str(e)}"}), 400

@app.route('/api/resume/download', methods=['GET'])
def download_resume():
    resume_path = os.path.join(os.path.dirname(__file__), '..', 'project_parchment', 'Ayushi_Patel_Updated_Resume.pdf')
    if os.path.exists(resume_path):
        return send_file(resume_path, as_attachment=True, download_name="Ayushi_Patel_Resume.pdf")
    else:
        return jsonify({"success": False, "error": "Resume file not found."}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🚀 Starting Ayushi Patel Portfolio Backend API on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=True)
