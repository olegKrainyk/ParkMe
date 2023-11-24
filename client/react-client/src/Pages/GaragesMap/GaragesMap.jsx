import "./GaragesMap.css";
import { motion } from "framer-motion";
import {useState} from "react";





function GaragesMap() {
  const [openStates, setOpenStates] = useState(Array(4).fill(false));
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

  const handleButtonClick = (index) => {
    setOpenStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  const buttonLabels = ["Parking Garage 3", "Parking Garage 4", "Parking Garage 5", "Parking Garage 6"];

  return (
    <div className="garages-map">
      {buttonLabels.map((label, index) => ( 
        <motion.div
          key={index}
          transition={{ layout: { type: "spring" } }}
          layout
          onClick={() => handleButtonClick(index)}
          className={`garage-button ${openStates[index] ? "open" : ""}`}
          style={{ borderRadius: "0.5rem", boxShadow: "0px 10px 30px rgba(0,0,0, 0.5)" }}
          initial="offscreen"
          animate="onscreen"
          variants={cardVariants}
        >
          <motion.h2 layout="position">{label}</motion.h2>
          {openStates[index] && (
            <motion.div>
              <p>We have 10 Parking Spots on the 6th floor</p>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}


export default GaragesMap;