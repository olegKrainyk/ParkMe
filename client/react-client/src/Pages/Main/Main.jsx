import {motion} from 'framer-motion'
import './Main.css'
import transition from '../../transition/transition'
import { Link } from 'react-router-dom'
import { useFollowPointer } from "./use-follow-pointer.ts"
import { useRef } from "react"



function Main() {

    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

  return (
    <div className="main-page">
        <motion.div className='main-button icon' ref={ref} animate={{ x, y }} transition={{
        ease: "easeInOut",
        type: 'spring',
        damping: 200,
        stiffness: 500,
        restDelta: 0.0001
      }}>
            <Link to='/garages' >find spot</Link>
        </motion.div>
    </div>
  );
}

export default transition(Main);