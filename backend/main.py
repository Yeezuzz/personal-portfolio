from fastapi import FastAPI
app = FastAPI()

@app.get("/test")
def main():
    return {"message": "Hello World"}
