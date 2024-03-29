import { useState, useEffect } from "react";
const Spinner = () => {
  const [list] = useState([
    "$100",
    "$500",
    "$9,999",
    "$1",
    "$60",
    "$1,000",
    "$4.44",
    "$0",
    "$333"
  ]);
  const [radius] = useState(75); // PIXELS
  const [selectedUser, setSelectedUser] = useState(null);
  const [rotate, setRotate] = useState(0); // DEGREES
  const [easeOut, setEaseOut] = useState(0); // SECONDS
  const [angle, setAngle] = useState(0); // RADIANS
  const [top, setTop] = useState(null); // INDEX
  const [offset, setOffset] = useState(null); // RADIANS
  const [result, setResult] = useState(null); // INDEX
  const [spinning, setSpinning] = useState(false);
 

  useEffect(() => {
    // generate canvas wheel on load
    renderWheel();
  }, []);

  const renderWheel = () => {
    // determine number/size of sectors that need to be created
    let numOptions = list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    setAngle(arcSize);

    // get index of starting position of selector
    topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = list[i];
      renderSector(i + 1, text, angle, arcSize, getColor(), radius);
      angle += arcSize;
    }
  };



  const topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works up to 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop(topSpot - 1);
    setOffset(degreesOff);
  };

  const renderSector = (index, text, start, arc, color, radius) => {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 150;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "17px Arial";
    ctx.fillStyle = "black";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);

    ctx.restore();
  };
  let interval;
  const user = ["user1","user2","user3","user4","user5","user6"];
  const getColor = () => {
    // randomly generate rgb values for wheel sectors
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.4)`;
  };
 

  useEffect(() => {    
    if (spinning) {
      interval = setInterval(() => {
        // Randomly select a user from the users array
        const randomIndex = Math.floor(Math.random() * user.length);
        setSelectedUser(user[randomIndex]);
      }, 100); // Adjust the interval as needed
    }
    return () => clearInterval(interval);
  }, [spinning, user]);

  useEffect(()=>{
    if(!spinning){
    return () => clearInterval(interval);
    }
  },[spinning,interval,user])

  const spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    setRotate(randomSpin);
    setEaseOut(3);
    setSpinning(true);
 
    // calculate result after wheel stops spinning
    setTimeout(() => {
      setSpinning(false);
      
    }, 3000);
  };


  const resetSpin = () => {   
    setRotate(0);
    setEaseOut(0);
    setResult(null);
    setSpinning(false);    
  };

  return (
    <div className="container">  
          <div className="flex">     
          <canvas
            id="wheel"
            width="300"
            height="300"
            style={{
              WebkitTransform: `rotate(${rotate}deg)`,
              WebkitTransition: `-webkit-transform ${easeOut}s ease-out`
            }}
          />
          <div className="content-center">
          <div 
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 border-green-300 focus:ring-cyan-300 ml-3 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-24 p-5 content-center" 
          style={{ border: "8px solid #92b6db",width:"164%" }} // Add inline style for border
        >
          {selectedUser}
        </div>  </div>
        </div>
        
          {spinning ? (
            <>            
            <button type="button" id="reset" onClick={resetSpin}>
             reset
           </button>
       
            </>
           
          ) : (
            <button type="button" id="spin" onClick={spin}>
              spin
            </button>
          )}
        
    </div>

  );
};

export default Spinner;
