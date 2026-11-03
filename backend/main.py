from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()
ASSETS_DIR = Path(__file__).parent.parent / "public" / "assets"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

images = {
    "emote.png": {"cols": 10, "rows": 19},
    "emote-cafe.png": {"cols": 10, "rows": 4},
    "emote-doto.png": {"cols": 10, "rows": 8},
    "emote-gold-ship.png": {"cols": 10, "rows": 5},
    "emote-mambo.png": {"cols": 5, "rows": 11},
    "emote-oguri.png": {"cols": 10, "rows": 5},
    "emote-rice.png": {"cols": 10, "rows": 16}
}

messages = []

app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.get("/emote")
def get_emote():
    return {
        "images": [{"name": filename, "url": f"/assets/{filename}", **dims} for filename, dims in images.items()]
    }

class Message(BaseModel):
    text: str

@app.post("/message")
def add_message(message: Message):
    new_message = {
        "text": message.text,
        "timestamp": datetime.now().isoformat()
    }

    messages.append(new_message)

    return new_message

@app.get("/messages")
def main():
    return {"messages": messages}

@app.get("/secret-flag-for-ctfs-or-somethin-idk")
def main():
    return {"message": "flag{ad$%61098ijl#23f40987f1-aoqieu}"}