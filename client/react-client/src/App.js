import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './Pages/Main/Main';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <div className="App">
       <AnimatePresence mode='wait'></AnimatePresence>
          <Routes>
        
            <Route exact path="/" element={<Main />} />
            <Route exact path="/main" element={<Main />} />

          

          </Routes>
      <AnimatePresence />
    </div>
  );
}