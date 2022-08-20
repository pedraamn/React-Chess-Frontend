
import React, { useState } from 'react';
import Chessboard from './components/Chessboard';
import './App.css';
import Tile from './components/Tile';
import Modal from 'react-modal/lib/components/Modal';

function App() {
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h3>Hi Welcome to Pedraam's Go Chess Engine</h3>
        <button onClick={closeModal}>Play as White</button>
      </Modal>
      <Chessboard />
    </div>
  );
}

export default App;
