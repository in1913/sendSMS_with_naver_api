import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import {useUser} from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';

const ApiHeader = ({onMenuClick}) => {    
    const [accessKey, setAccessKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const { showToastMessage } = useToast();
    
    const userInfo = useUser();
    const handleSubmit = async () => {  
        try{
            const response = await axios.post('http://localhost:3001/api/create', {
                accessKey: accessKey,
                secretKey: secretKey,
                fk_user_id: userInfo.id
            })
            if(response.status === 200){
                onMenuClick(0);
                showToastMessage('API 헤더 입력에 성공하었습니다.', 'success');
            }else{
                showToastMessage('API 헤더 입력에 실패하였습니다.', 'success');
            }
            
        }catch(error){
            console.log(error.message);
        }
    }
    
    return (
        <div>
            <h3>API 헤더 입력</h3>
            <InputGroup className="mt-4">
                <InputGroup.Text id="x-ncp-iam-access-key">x-ncp-iam-access-key</InputGroup.Text>
                <Form.Control
                placeholder="포털 또는 Sub Account에서 발급받은 Access Key ID"
                aria-label="x-ncp-iam-access-key"
                aria-describedby="x-ncp-iam-access-key"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                />
            </InputGroup>
            <span className=' ms-2 mt-2' style={{fontSize: "0.75rem"}}>네이버 클라우드 플랫폼에서 발급받은 Access Key</span>
            <InputGroup className="mt-3">
                <InputGroup.Text id="x-ncp-apigw-signature-v2">x-ncp-apigw-signature-v2</InputGroup.Text>
                <Form.Control
                placeholder="Access Key Id와 맵핑되는 SecretKey"
                aria-label="x-ncp-apigw-signature-v2"
                aria-describedby="x-ncp-apigw-signature-v2"
                value={secretKey}
                type='password'
                onChange={(e) => setSecretKey(e.target.value)}
                />
            </InputGroup>
            <span className=' ms-2 mt-2' style={{fontSize: "0.75rem"}}>네이버 클라우드 플랫폼에서 발급받은 Access Key에 맵핑되는 Secret Key</span>
            <div className='d-flex justify-content-end'>
                <Button className='mt-4 bg-naver' onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            
        </div>
    );
};

export default ApiHeader;