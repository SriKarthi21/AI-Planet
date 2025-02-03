import React, { useState } from 'react'
import Logo from './Logo';
import { CgAdd } from "react-icons/cg";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const Header = () => {

  const [fileName, setFileName] = useState('');
  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0])
    if (file) {
      setFileName(file.name);
      setIsUpload(true);
      handleSubmit(event);
    } else {
      setFileName('');
    }
  };
  const handleSubmit = async (event) => {
    console.log("submit method called");
    console.log(event);
    event.preventDefault();

    if (!selectedFile) {
      setMessage('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', selectedFile, selectedFile.name); // 'pdf_file' is the key FastAPI expects

    try {
      console.log("post method called");
      const response = await fetch('http://127.0.0.1:8000/api/upload', { // Your FastAPI endpoint
        
        method: 'POST',
        body: formData, // Important: Send FormData
      });

      if (response.ok) {
        setMessage('PDF uploaded successfully!');
        // Optionally handle successful response (e.g., display a confirmation)
        const data = await response.json(); // If the server sends back JSON
        console.log(data);
      } else {
        const errorData = await response.json(); // Try to get error details from the server
        setMessage(`Upload failed: ${errorData.detail || response.statusText}`); // Display a more user-friendly error
        console.error('Server error:', errorData);
      }
    } catch (error) {
      setMessage('An error occurred during upload.');
      console.error('Client-side error:', error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex", padding: "10px 20px"
          , justifyContent: "space-between", alignItems: "center",
          boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.1)'
          ,height:"70px"
        }}>
        <div>
          <Logo />
        </div >
        <div style={{ display: 'flex', alignItems: "center" }}>
          {isUpload ? <>
            <span style={{color:"green"}} ><InsertDriveFileIcon /></span>
            <span style={{ marginRight: "20px", color: "rgb(15, 169, 88)" }}>
              {fileName}
            </span>
          </> : <></>
          }
          <input
            type="file"
            id="pdfUpload"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          < >
            <label
              htmlFor="pdfUpload"
              style={{
                padding: '10px 20px',
                border: '2px solid #ccc',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                fontWeight:"bold",
                color: '#333',
                alignItems: "center"
              }}
              
            ><button onClick={handleSubmit}> send file</button>
              <AddCircleOutlineIcon />
              <span > Upload PDF</span>
            </label>
          </>

        </div>



      </div>
    </>
  )
}

export default Header