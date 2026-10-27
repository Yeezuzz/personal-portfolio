from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI()
ASSETS_DIR = Path(__file__).parent.parent / "src" / "assets"

images = [
    "emote.png",
    "emote(cafe).png",
    "emote(doto).png",
    "emote(gold-ship).png",
    "emote(mambo).png",
    "emote(oguri).png",
    "emote(rice).png"
]

messages = []

app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.get("/")
def main():
    return {"message": "Hello World"}

@app.get("/emote")
def get_emote():
    return {
        "images": [f"/assets/{filename}" for filename in images]
    }

@app.post("/message")
def add_message(text: str):
    messages.append(text)
    return { "message": "Message saved" }

@app.get("/secret-flag-for-ctfs-or-somethin-idk")
def main():
    return {"message": "flag{ad$%61098ijl#23f40987f1-aoqieu}"}