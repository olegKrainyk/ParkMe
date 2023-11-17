import {motion} from 'framer-motion'
import './Main.css'
import transition from '../../transition/transition'

function Main() {
  return (
    <div className="main-page">
        <motion.div className='main-button icon' animate={{ transform: ['translateY(0px)', 'translateY(-20px)', 'translateY(0px)'] }}transition={{ease: 'easeIn' ,repeat: Infinity, duration: 1.5 }}>
            find spot
        </motion.div>
    </div>
  );
}

export default transition(Main);