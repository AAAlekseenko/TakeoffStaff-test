import React from 'react';
import Modal from "react-modal";
Modal.setAppElement(document.getElementById('root'))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
};

const ContainerModal = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='modal__btn_close'>
                    <button onClick={props.closeModal}>Закрыт</button>
                </div>
                {props.children}
            </Modal>
        </div>
    );
};

export default ContainerModal;