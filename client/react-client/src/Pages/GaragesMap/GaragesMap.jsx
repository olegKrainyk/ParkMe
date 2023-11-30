import "./GaragesMap.css";
import { motion } from "framer-motion";
import {useState} from "react";
import axios from 'axios';





function GaragesMap() {
  const [openStates, setOpenStates] = useState(Array(1).fill(false));
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.9,
      },
    },
  };

  const handleButtonClick = async (index) => {
    try {
      setOpenStates((prevStates) =>
        prevStates.map((state, i) => (i === index ? !state : state))
      );
  
      const response = await axios.get("http://127.0.0.1:5000/");
      setResultText(response.data.total_cars);
    } catch (error) {
      console.error("Error", error);
      setResultText('Error fetching data');
    }
  };

  const [resultText, setResultText] = useState('');

  const parkingGarage3 = 155

  return (
    <div className="garages-map">
      {Array(1).fill(null).map((_, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: [null, 1.0, 1.1] }}
          transition={{ duration: 0.3}}
          layout
          onClick={() => handleButtonClick(index)}
          className={`garage-button ${openStates[index] ? "open" : ""}`}
          style={{ borderRadius: "0.5rem", boxShadow: "0px 10px 30px rgba(0,0,0, 0.5)" }}
          initial="offscreen"
          animate="onscreen"
          variants={cardVariants}
        >
          <motion.h2 layout="position">{`Parking Garage ${index + 3}`}</motion.h2>
          {openStates[index] && (
            <motion.div>
              {resultText && <p>{parkingGarage3 - resultText} parking spots available</p>}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}


export default GaragesMap;