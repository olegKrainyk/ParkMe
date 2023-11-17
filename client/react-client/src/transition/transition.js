import {motion} from "framer-motion";
import './transition.css';

const transition = (OgComponent) => {
    return () => (
        <>
            <OgComponent></OgComponent>
            <motion.div className="slide" animate={{height: ['100vh','100vh','30vh'], top:['0vh', '100vh'], bottom:['100vh','0vh']}} />
        </>
    )
}

export default transition;