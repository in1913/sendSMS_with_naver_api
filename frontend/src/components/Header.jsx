import React,{ useEffect, useState} from 'react';
import { MdDarkMode } from "react-icons/md";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import { useLocation } from 'react-router-dom';

const StyledIcon = styled(MdDarkMode)`
    color: ${props => props.theme.color};
`;

const Header = ({toggleTheme}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { showToastMessage } = useToast();

    
    const location = useLocation();
    const [memberBtn, setMemberBtn] = useState(<></>);
    useEffect(() => {
        if(location.pathname.includes('/Signup')){
            setMemberBtn(<Button variant='' className='text-naver text-decoration-underline border-0' onClick={() => navigate('/Login')}>Login</Button>);
        }else if(location.pathname.includes('/Login')){
            setMemberBtn(<Button variant='' className='text-naver text-decoration-underline border-0' onClick={() => navigate('/Signup')}>Signup</Button>);
        }else {
            if(!token){
                navigate('/Login');
            }else{
                setMemberBtn(<Button variant='' className='text-naver text-decoration-underline border-0' onClick={() =>
                    {
                        localStorage.removeItem('token');
                        showToastMessage('로그아웃 되었습니다.', 'info');
                        navigate('/Login') ;
                    }}>Logout</Button>);
            }
        }
    },[location.pathname, token, navigate, showToastMessage]);

        return (
    <div className=' d-flex justify-content-end align-items-center'>  
        {memberBtn} 
        <Button onClick={toggleTheme} style={{backgroundColor: "inherit"}} className='border-0'>
            <StyledIcon
                style={{fontSize: "20px", verticalAlign: "text-bottom"}} />
        </Button>
    
    </div>
    );
};

export default Header;