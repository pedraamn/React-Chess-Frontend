
import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import Chessboard from './components/Chessboard';



function App() {

  const [modalIsOpen, setModalOpen] = useState(true)

  function closeModal() {
    setModalOpen(false)
  }

  return (
    
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4em'}}>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'}}>
          <h2>Pedraam's Go Chess Engine</h2>
          <p>Hi! Welcome to my Chess Engine written completely in Go! The engine uses the Minimax algorithm with move ordering 
            and is backed by a bitboard representation. The front-end logic was written in JavaScript under the react framework. 
            Essentially the way it works is I uploaded all the Chess engine logic into an AWS Lamba function. The front-end 
            then serializes the board into a string, sends the string as a request to the AWS Lambda Gateway, the engine then 
            finds the best move from that position, and sends that move back to the front-end as a response.</p>
          <button style={{
            height: '5em',
            width: '5em',

          }}onClick={closeModal}>Play As White</button>
          <button>Play As Black (COMING SOON!)</button>
        </div>
      </Modal>
      <a href="https://github.com/pedraamn/React-Chess-Frontend" target="_blank">React Front-end Code</a>
      <Chessboard />
      <a href="https://github.com/pedraamn/Go-ChessEngine" target="_blank">Go Engine Code</a>
    </div>
  );
}

export default App
