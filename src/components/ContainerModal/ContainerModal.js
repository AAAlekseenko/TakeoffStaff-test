import React from 'react';
import Modal from "react-modal";
import './containerModal.scss'
Modal.setAppElement(document.getElementById('root'))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '25px',
        backgroundColor: '#1C1C24',
        border: '1px solid #4447E2',
        color: '#ffffff'

    }
};

const ContainerModal = (props) => {
    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='btn-close__wrapper' >
                    <button className='modal__btn_close' onClick={props.closeModal}>Закрыть</button>
                </div>
                {props.children}
            </Modal>
        </div>
    );
};

export default ContainerModal;