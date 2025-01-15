import React,{useState, useEffect} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('user');
    const { showToastMessage } = useToast();
    const handleLogin = async () => {
        try{
            const response = await axios.post('http://localhost:3001/user/signup', 
                { name, email, password, position});
        
                if(response.status === 200){
                    //console.log(response.data);
                    showToastMessage('회원가입에 성공하였습니다.', 'success');
                    navigate('/');
                }
        }catch(error){
            console.log(error);
            if(error.response.data.code === 11000){
                showToastMessage('이미 존재하는 이메일입니다.', 'fail');

            }else{
                showToastMessage('회원가입에 실패하였습니다.', 'fail');
            }
            
        }
        
    }
    
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    },[navigate]);
    
    return (
        <Container>
            <Form.Group className="my-4" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={(e) =>  setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="my-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) =>  setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button className='bg-naver w-100 mb-2' type="button" onClick={handleLogin}>
                Sign Up
            </Button>
        </Container>
    );
};

export default SignUp;