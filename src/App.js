
import React, { useState } from 'react';
import designOverview from '../src/assets/designOverview.png'
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
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', gap: '0.1em'}}>
          <h2>Pedraam's Go Chess Engine</h2>
          <p>Hi! Welcome to my Chess Engine! The front-end is written in JavaScript(React) while all the engine logic has been written in Go.
            Rough overview of how it works is the engine logic lives inside an AWS Lambda function. So everytime a human makes a move, the front-end 
            serializes the board into a string, sends the string as a request to the AWS Lambda Gateway, the engine then 
            computes the best move from that position, and sends that move back to the front-end as a response.</p>
          <img src={designOverview} style={{height: '33%', width: '33%'}}/>
          <button style={{
            height: '5em',
            width: '15em',

          }}onClick={closeModal}>Play As White</button>
          <button style={{
            height: '5em',
            width: '15em',

          }}>Play As Black (Coming Soon!)</button>
        </div>
      </Modal>
      <a href="https://github.com/pedraamn/React-Chess-Frontend" target="_blank">React Front-end Code</a>
      <Chessboard />
      <a href="https://github.com/pedraamn/Go-Chess-Engine" target="_blank">Go Engine Code</a>
    </div>
  );
}

export default App
