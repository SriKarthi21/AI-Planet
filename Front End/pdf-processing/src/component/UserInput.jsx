
import SendIcon from '@mui/icons-material/Send';
import React, { useState, useRef, useEffect } from 'react';
const UserInput = () => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
          if (inputRef.current) {
            inputRef.current.style.width = `${window.innerWidth - 50}px`; // Adjust 50px for padding/margins, etc.
          }
        };
    
        handleResize(); // Initial width set
        window.addEventListener('resize', handleResize); // Update on resize
    
        return () => {
          window.removeEventListener('resize', handleResize); // Clean up
        };
      }, []); // Empty dependency array ensures this runs only once on mount/unmount
    
      const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
    
      const handleSubmit = () => {
        // Handle sending the message here (e.g., API call)
        console.log('Sending:', inputValue);
        setInputValue(''); // Clear the input after sending (optional)
      };
    
  return (
    <div>
        <div style={{ bottom:40
            , position: 'fixed', display: 'flex',
         width: '90%' ,margin:'0 5%',
            justifyContent:'center'
        }}>
        <input
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: '20px', 
          border: '1px solid #ccc',
          borderRadius: '10px',
          outline: 'none', 
          flexGrow: 1, // Allow input to expand
          boxSizing: 'border-box', // Include padding and border in element's total width and height
        }}
        placeholder="Send a message..."
      />
      <button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '5px', 
          color: 'black',  
        }}
      >
        <SendIcon icon={SendIcon}/>
      </button>
    </div>
  
    </div>
  )
}

export default UserInput