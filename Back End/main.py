from typing import List
from uuid import UUID,uuid4
from models import Gender,Role,User
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from fastapi.responses import FileResponse
import os
import uuid
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
import nltk
nltk.download('punkt')
nltk.download('punkt_tab')
from nltk.tokenize import sent_tokenize


app=FastAPI()

@app.get("/")
async def root():
    return{"Hello":"karthi"}
# Configuration
UPLOAD_FOLDER="uploads"
ALLOWED_EXTENSIONS={"pdf"}

os.makedirs(UPLOAD_FOLDER,exist_ok=True)
origins = [
    "http://localhost:5173",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (POST in this case)
    allow_headers=["*"],
)


@app.post("/api/upload/test")
async def upload_pdf(str1):
    print(str1)

@app.post("/api/upload")
async def upload_pdf(pdf_file: UploadFile):
    print("Enter the method")
    try:
        print(pdf_file.filename)
        path: str
        with open(rf"C:\karthi Docs\AI Planet\Back End\uploads/{pdf_file.filename}", "wb") as f:  
            contents = pdf_file.file.read() # Read the file content
            f.write(contents)
        return {"filename": pdf_file.filename, "message": "File uploaded successfully"} # Return a success message

    except Exception as e:
        print(f"Error uploading file: {e}") # Log the error for debugging
        raise HTTPException(status_code=500, detail="There was an error uploading the file") # Return an appropriate error response

@app.post("/answer-question")
async def answerquestion(question: str):

    persist_directory = rf"C:\karthi Docs\AI Planet\Back End\db"
    embedding = OpenAIEmbeddings()

    loader = PyPDFLoader(rf"C:\karthi Docs\AI Planet\Back End\uploads\Test Doc.pdf")
    pages = loader.load()
    print(len(pages))
    print(pages[0].metadata)

    for page in pages:
        content = page.page_content
        if not content:
            return []
        sentences = sent_tokenize(content)
        print(sentences)

        vectordb = Chroma.from_documents(
            documents=pages,
            embedding=embedding,
            persist_directory=persist_directory
        )

    print(vectordb._collection.count())
    