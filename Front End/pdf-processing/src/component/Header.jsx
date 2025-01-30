import React, { useState } from 'react'
import Logo from './Logo';
import { CgAdd } from "react-icons/cg";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const Header = () => {

  const [fileName, setFileName] = useState('');
  const [isUpload, setIsUpload] = useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUpload(true);
    } else {
      setFileName('');
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
            ><AddCircleOutlineIcon />
              <span > Upload PDF</span>
            </label>
          </>

        </div>



      </div>
    </>
  )
}

export default Header