import { Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './Pages/Main/Main';

export default function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/main" element={<Main />} />

      </Routes>
    </div>
  );
}