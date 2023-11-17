import {motion} from 'framer-motion'
import './Main.css'
import transition from '../../transition/transition'
import { Link, useLocation } from 'react-router-dom'
import { useFollowPointer } from "./use-follow-pointer.ts"
import { useRef, useState } from "react"



function Main() {

    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref);

    const location = useLocation();
    const [activePage, setActivePage] = useState(localStorage.getItem("active-page") != null ? localStorage.getItem("active-page") : '')
    localStorage.setItem("active-page", location.pathname.substring(1));

    const handleGoToGarages = () => {
        setActivePage('garages');
    }

  return (
    <div className="main-page">
        <motion.div className='main-button icon' ref={ref} animate={{ x, y }} transition={{
        ease: "easeInOut",
        type: 'spring',
        damping: 200,
        stiffness: 500,
        restDelta: 0.0001
      }}>
            <Link to='/garages' onClick={handleGoToGarages}>find spot</Link>
        </motion.div>
    </div>
  );
}

export default transition(Main);