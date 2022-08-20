import Modal from 'react-modal/lib/components/Modal';


<Modal isOpen={modalIsOpen} onRequestClose={closeModal}
style={{
  content: {
    display: 'flex',
    top: '20em',
    left: '20em',
    right: '20em',
    bottom: '20em',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  }
}}>
  <div style={{display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3em'}}>
      <button><img src={`images/wQueen.png`} style={{width: '6.25em', height: '6.25em'}} onClick={closeModal} /></button>
      <button><img src={`images/wRook.png`} style={{width: '6.25em', height: '6.25em'}} onClick={closeModal} /></button>
      <button><img src={`images/wBishop.png`} style={{width: '6.25em', height: '6.25em'}} onClick={closeModal} /></button>
      <button><img src={`images/wKnight.png`} style={{width: '6.25em', height: '6.25em'}} onClick={closeModal} /></button>
  </div>
</Modal>





function PromotionModal() {
    return (
        <Modal>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img src={`images/wQueen.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />
                <img src={`images/wRook.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />
                <img src={`images/wBishop.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />
                <img src={`images/wKnight.png`} style={{width: '60%', height: '60%', pointerEvents: 'none'}} />
            </div>
        </Modal>
    )
}

export default PromotionModal