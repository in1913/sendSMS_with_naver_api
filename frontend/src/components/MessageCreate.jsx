import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const MessageCreate = () => {
    return (
        <div>
            <h3>메세지 만들기</h3>
            <InputGroup className="mt-4">
                <InputGroup.Text id="x-ncp-iam-access-key">x-ncp-iam-access-key</InputGroup.Text>
                <Form.Control
                placeholder="포털 또는 Sub Account에서 발급받은 Access Key ID"
                aria-label="x-ncp-iam-access-key"
                aria-describedby="x-ncp-iam-access-key"
                
                />
            </InputGroup>
        </div>
    );
};

export default MessageCreate;