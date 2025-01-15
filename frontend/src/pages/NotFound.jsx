import React, {useState} from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    const [second, setSecond] = useState(3);

    setTimeout(() => {
        window.location.href = '/';
    }, 2999);

    setTimeout(() => {
        setSecond(second - 1);
    }, 1000);

    return (
        <Container style={{height: '100vh'}} className='d-flex flex-column justify-content-start align-items-center'>
            <div style={{fontSize: "6rem"}}>404</div>
            <p>{second}초 후 이동합니다.</p>
        </Container>
    );
};

export default NotFound;