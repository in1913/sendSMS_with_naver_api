import React from 'react';
import { PiWarningCircleBold as Warning} from "react-icons/pi";
import { Toast } from 'react-bootstrap';
import { useToast } from '../contexts/ToastContext';

const MyToast = () => {
    const { showToast, toggleShowToast, message, state } = useToast();
    
    const colors = () => {
        switch(state){
            case 'success':
                return 'bg-naver';
            case 'fail':
                return 'bg-naver-danger';
            case 'info':
                return 'bg-naver-info';
            default:
                return 'bg-warning';
    }};
    return (
        <Toast 
            delay={3000} autohide
            show={showToast} onClose={toggleShowToast} className={`position-fixed text-white ${colors()}`} style={{top: 30, right: 30}}>
            <Toast.Header className={`text-white ${colors()}`}>
                <Warning style={{fontSize: "20"}} />
                <div className='ms-1 pt-1 me-auto'>{state}</div>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    
    );
};

export default MyToast;