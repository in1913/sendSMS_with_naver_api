import React, {useState, useEffect} from 'react';
import { Col, Container, Row, } from 'react-bootstrap';
import SideNavi from '../components/SideNavi';
import NavLogo from '../assets/NavLogo';
import ProjectSelect from '../components/ProjectSelect';
import ProjectCreate from '../components/ProjectCreate';
import MessageCreate from '../components/MessageCreate';
import MessageHistory from '../components/MessageHistory';
import MessageResult from '../components/MessageResult';
import ApiHeaderSelect from '../components/ApiHeaderSelect';
import ApiHeaderCreate from '../components/ApiHeaderCreate';
import { UserProvider } from '../contexts/UserContext';
import UserWelcome from '../assets/UserWelcome';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [currComp, setCurrComp] = useState(0);
    const renderComp = () => {
        switch(currComp){
            case 0:
                return <ApiHeaderSelect onMenuClick={(comp) => setCurrComp(comp)}/>
            case 1:
                return <ApiHeaderCreate onMenuClick={(comp) => setCurrComp(comp)}/>
            case 2:
                return <ProjectSelect onMenuClick={(comp) => setCurrComp(comp)}/>
            case 3:
                return <ProjectCreate onMenuClick={(comp) => setCurrComp(comp)}/>
            case 4:
                return <MessageCreate/>
            case 5:
                return <MessageHistory/>
            case 6:
                return <MessageResult/>
                
            default:
                return <ApiHeaderSelect/>
        }
    }


    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/Login');
        }
    },[navigate]);
    
    return (
    <Container>
        <UserProvider>
        <Row className='mb-5'>
            <Col lg={6} md={12} sm={12}>
                <NavLogo/>
            </Col>
            <Col lg={6} md={12} sm={12} className='d-flex justify-content-end align-items-center'>
                <UserWelcome />
            </Col>
        </Row>
        <Row className='pb-5'>
            <Col lg={12} md={12} sm={12}>
                <Row>
                    <Col lg={3} md={3} className='mb-5'>
                        <SideNavi onMenuClick={(comp) => setCurrComp(comp)}/>
                    </Col>
                    <Col lg={9} md={9}>
                        {renderComp()}
                    </Col>
                </Row>
            </Col>
        </Row>
        </UserProvider>
    </Container>
    );
};

export default Home;