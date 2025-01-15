import React, {useState} from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';

const ProjectCreate = ({onMenuClick}) => {
    const [projectName, setprojectName] = useState('');
    const [projectDesc, setprojectDesc] = useState('');
    const [useSms, setUseSms] = useState(false);
    const [usePush, setUsePush] = useState(false);
    const userInfo = useUser();
    const { showToastMessage } = useToast();
    
    const handleSubmit = async () => {  
        try{
            const response = await axios.post('http://localhost:3001/project/create', 
                {projectName, projectDesc, useSms, usePush, fk_user_id: userInfo.id} 
            )

            if(response.status === 200){
                showToastMessage('프로젝트 생성에 성공하였습니다.', 'success');
                onMenuClick(2);
            }else{
                showToastMessage('프로젝트 생성에 실패하였습니다.', 'fail');
            }

        }catch(error){
            showToastMessage('프로젝트 생성에 실패하였습니다.', 'fail');
            console.log(error.response);
            console.log(error.message);
        }
    }

    const [projectNameError, setprojectNameError] = useState('');
    const projectNameCheck = (projectName) => {
        const reg = /^[a-z0-9_-]+$/;
        if(projectName.length > 24 && reg.test(projectName)){
            setprojectNameError('최대 24자');
        }else if(projectName.length <= 24 && !reg.test(projectName) && projectName !== ''){
            setprojectNameError('영문 소문자, 숫자, 붙임표 ( - ), 밑줄 문자 ( _ )만 입력 가능');
        }else if(projectName.length > 24 && !reg.test(projectName)){
            setprojectNameError('영문 소문자, 숫자, 붙임표 ( - ), 밑줄 문자 ( _ )만 입력 가능 / 최대 24자');
        }else if(projectName === ''){
            setprojectNameError('필수 입력 항목입니다.');
        }else{
            setprojectNameError('');
        }
    }

    const [projectDescError, setprojectDescError] = useState('');
    const projectDescCheck = (projectDesc) => {
        if(projectDesc.length > 128){
            setprojectDescError('최대 128자');
        }else{
            setprojectDescError('');
        }
    }

    return (
        <div>
            <h3>프로젝트 생성</h3>
            <InputGroup className="mt-4">
                <InputGroup.Text id="projectName">프로젝트 이름<span className=' ms-1 text-danger'>*</span></InputGroup.Text>
                <Form.Control
                placeholder="프로젝트 이름"
                aria-label="projectName"
                aria-describedby="projectName"
                value={projectName}
                onChange={(e) => {
                    const value = e.target.value;
                    setprojectName(value);
                    projectNameCheck(value);
                }}
                />
            </InputGroup>
            <Form.Text className='ms-2 text-danger' style={{fontSize: "0.75rem"}}>{projectNameError}</Form.Text>
            
            <InputGroup className="mt-3">
                <InputGroup.Text id="projectDesc">프로젝트 설명</InputGroup.Text>
                <Form.Control
                placeholder="프로젝트 설명"
                aria-label="projectDesc"
                aria-describedby="projectDesc"
                value={projectDesc}
                onChange={(e) => {
                    const value = e.target.value;
                    setprojectDesc(value);
                    projectDescCheck(value);
                }}
                />
            </InputGroup>
            <Form.Text className='ms-2 text-danger' style={{fontSize: "0.75rem"}}>{projectDescError}</Form.Text>

            <Form.Switch className='mt-3'
                id="useSms"
                label="SMS"
                value={useSms}
                onChange={(e) => {
                    setUseSms(e.target.checked);
                }}
            />
            <Form.Switch // prettier-ignore
                id="usePush"
                label="Push"
                value={usePush}
                onChange={(e) => {
                    setUsePush(e.target.checked);
                }}
            />
            <span className='ms-2' style={{fontSize: "0.75rem"}}>최소 1개 이상 선택해야 합니다.</span>
            
            <div className='d-flex justify-content-end'>
                <Button className='mt-4 bg-naver' 
                disabled={!(projectNameError === '' && projectDescError === '' && projectName !== '' && (useSms || usePush))} 
                onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            
        </div>
    );
};

export default ProjectCreate;