import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const MyModal = ({modalMsg, showModal, onHide, cmd}) => {
    const { isDarkMode } = useTheme();
    return (
        <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme={isDarkMode ? "dark" : "light"}
        >
        <Modal.Header>
            <div className='d-flex justify-content-between w-100 align-items-center'> 
                <h4 className='mt-2'>알림</h4>
                <Button type='button' className='btn-close bg-transparent' onClick={onHide}/>
            </div>
        </Modal.Header>
        <Modal.Body>
            <p>
            {modalMsg}
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={cmd} className='bg-naver-danger'>확인</Button>
        </Modal.Footer>
        </Modal>
    );
};

export default MyModal;