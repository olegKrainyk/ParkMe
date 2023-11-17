import "./GaragesMap.css";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Card({ text, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      animate="onscreen"
      variants={cardVariants}
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />
      <motion.div className="card" variants={cardVariants}>
        {text}
      </motion.div>
    </motion.div>
  );
}

const garages = [
  ["PG3", 4545, 10],
  ["PG4", 4200, 40],
  ["PG5", 4545, 20],
  ["PG6", 4545, 120],
]

export default function App() {
  return garages.map(([text, hueA, hueB]) => (
    <Card text={text} hueA={hueA} hueB={hueB} key={text} />
  ));
}
