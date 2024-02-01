import './App.css';
import Create from './componants/Create';
import Read from './componants/Read';
import Update from './componants/Update';
import Navbar from './componants/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/all" element={<Read />} />
          <Route path="/:id" element={<Update />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
