import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductForm from './components/ProductForm';
import ProductUpdate from './components/ProductUpdate';
import StudentInfo from './components/StudentInfo';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ProductForm />} />
          <Route path="/update/:id" element={<ProductUpdate />} />
          <Route path="/info" element={<StudentInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;