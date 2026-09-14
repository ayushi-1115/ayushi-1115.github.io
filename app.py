"""
Ayushi Patel — Portfolio Backend API
Built with FastAPI (Modern Async Python Framework) with Pydantic validation, 
OpenAPI Swagger documentation, and live Haversine geofencing endpoint.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, EmailStr, Field
import math
import os
from datetime import datetime
from typing import List, Optional

# Initialize FastAPI application
app = FastAPI(
    title="Ayushi Patel Portfolio API",
    description="High-performance FastAPI backend serving portfolio project metadata, live Haversine geofence calculations, and contact message processing.",
    version="2.0.0",
    docs_url="/docs",  # Interactive Swagger UI
    redoc_url="/redoc" # ReDoc Documentation
)

# Enable CORS for frontend cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------------------------------
# Pydantic Schemas
# --------------------------------------------------------------------------
class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="John Doe")
    email: str = Field(..., example="john@example.com")
    subject: Optional[str] = Field(default="General Inquiry", max_length=150)
    message: str = Field(..., min_length=5, max_length=2000, example="Hi Ayushi, I'd like to connect regarding a Python role.")

class GeofenceRequest(BaseModel):
    lat1: float = Field(..., example=20.6079, description="Latitude of Point 1")
    lon1: float = Field(..., example=72.9342, description="Longitude of Point 1")
    lat2: float = Field(..., example=21.1702, description="Latitude of Point 2")
    lon2: float = Field(..., example=72.8311, description="Longitude of Point 2")
    radius_km: Optional[float] = Field(default=100.0, description="Geofence boundary radius in KM")

class GeofenceResponse(BaseModel):
    success: bool
    distance_km: float
    radius_km: float
    inside_geofence: bool
    status: str

# --------------------------------------------------------------------------
# Helper Functions
# --------------------------------------------------------------------------
def calculate_haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great-circle distance between two GPS coordinates using Haversine formula."""
    R = 6371.0  # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

# --------------------------------------------------------------------------
# API Endpoints
# --------------------------------------------------------------------------
@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "framework": "FastAPI",
        "developer": "Ayushi Patel",
        "swagger_docs": "/docs",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/projects", tags=["Projects"])
async def get_projects():
    """Retrieve structured list of technical projects and repository links."""
    projects = [
        {
            "id": "geohack",
            "title": "GeoHack — Real-Time Geofencing System",
            "category": "Spatial System & FastAPI Backend",
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
    return {"success": True, "count": len(projects), "data": projects}

@app.post("/api/contact", tags=["Contact"])
async def handle_contact(form: ContactFormRequest):
    """Process incoming contact form submission with Pydantic validation."""
    print(f"[FASTAPI CONTACT MESSAGE] From {form.name} ({form.email}): {form.message}")
    return {
        "success": True,
        "message": f"Thank you {form.name}! Your message has been processed successfully by Ayushi's FastAPI backend."
    }

@app.post("/api/geohack/calculate", response_model=GeofenceResponse, tags=["GeoHack Demo"])
async def run_geohack_demo(req: GeofenceRequest):
    """Calculate Haversine distance and evaluate geofence radius boundary."""
    distance = calculate_haversine(req.lat1, req.lon1, req.lat2, req.lon2)
    is_inside = distance <= req.radius_km
    return GeofenceResponse(
        success=True,
        distance_km=distance,
        radius_km=req.radius_km,
        inside_geofence=is_inside,
        status="WITHIN_BOUNDS" if is_inside else "OUT_OF_BOUNDS"
    )

@app.get("/api/resume/download", tags=["Resume"])
async def download_resume():
    """Download latest updated PDF resume."""
    resume_path = os.path.join(os.path.dirname(__file__), '..', 'project_parchment', 'Ayushi_Patel_Updated_Resume.pdf')
    if os.path.exists(resume_path):
        return FileResponse(path=resume_path, filename="Ayushi_Patel_Resume.pdf", media_type="application/pdf")
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume PDF not found.")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Launching FastAPI server with Uvicorn on http://127.0.0.1:8000 ...")
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
