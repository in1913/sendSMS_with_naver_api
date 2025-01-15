import React, {useState, useEffect} from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { showToastMessage } = useToast();
    

    const navigate = useNavigate();
    const handleLogin = async () => {
        const response = await axios.post('http://localhost:3001/user/login', 
        { email, password });
        
        if(response.data.status === 'success'){
            // Home으로 이동
            localStorage.setItem('token', response.data.token);
            navigate('/');
            showToastMessage('로그인되었습니다.', 'success');
            
        }else if(response.data.status === 'notfound'){
            // 존재하지 않는 이메일
            showToastMessage('존재하지 않는 이메일입니다.', 'fail');
        }else if(response.data.status === 'fail'){
            // 비밀번호 불일치
            showToastMessage('비밀번호가 일치하지 않습니다.', 'fail');
        }else{
            // 서버 에러
            showToastMessage('서버 에러가 발생했습니다.', 'fail');
        }
    }
    
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    },[navigate]);

    return (
        <Container className='mt-5 p-5'>
            <Row>
                
                <Col lg={6} md={12} sm={12} className='p-5 d-flex justify-content-center align-items-center'>      
                    <div>
                        <h2>Send SMS </h2>    
                        <h4 style={{color: '#05D686'}} className='ms-5'>
                            with Naver API
                        </h4>
                    </div>
                </Col>
                <Col lg={6} md={12} sm={12}>
                    <div>
                        <h5>Login to your account</h5>
                        <Form.Group className="my-4" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) =>  setEmail(e.target.value)} />
                            
                        </Form.Group>
                        <Form.Group className="mb-5" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        
                        <Button className='bg-naver w-100 mb-2' type="button" onClick={handleLogin}>
                            Login
                        </Button>
                        <Button variant="secondary mb-2" className='text-white w-100' type="submit">
                            Login with Authentik
                        </Button>
                    </div>
                </Col>

            </Row>
            
        </Container>
    );
};

export default Login;