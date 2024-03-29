import React, { useState } from 'react';
import Webcam from 'react-webcam'; 
import '../App.css'

const WebcamCom = () => {
  // Reference to the webcam component
  const webcamRef = React.useRef(null);
  return ( 
             <Webcam audio={false} ref={webcamRef} />         
           
  );
};

export default WebcamCom;