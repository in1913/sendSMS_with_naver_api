import React, { useEffect,useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import ConvertDate from '../utils/ConvertDate';
const ProjectSelect = ({onMenuClick}) => {
    const {isDarkMode} = useTheme();
    const userInfo = useUser();
    const [data, setData] = useState([]);

    useEffect(() => {    
        axios.post('http://localhost:3001/project/select', {
            fk_user_id : userInfo.id
        }).then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        });
    
    },[userInfo.id]);
    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='d-inline-block'>프로젝트 조회</h3> 
                <Button className='bg-naver' onClick={() => onMenuClick(3)}>
                    프로젝트 생성
                </Button>
            </div>
            
            <Table striped bordered hover className=' mt-4' data-bs-theme={isDarkMode ? "dark" : "light"}>
                <thead className=''>
                    <tr className='text-center'>
                        <th width="5%"><Form.Check disabled/></th>
                        <th width="60%">프로젝트 이름</th>
                        <th width="5%"> SMS </th>
                        <th width="5%">Push</th>
                        <th width="20%">만든 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((x, index) => (
                            <tr className='text-center' key={index}>
                                <td><Form.Check/></td>
                                <td>{x.projectName}</td>
                                <td className='text-center'>
                                    <Form.Switch disabled id="useSms" defaultChecked={x.useSms} />
                                </td>
                                <td className='text-center'>
                                <Form.Switch disabled id="usePush" defaultChecked={x.usePush}/>
                                </td>
                                <td className='text-center' style={{fontSize: "0.75rem", verticalAlign: "middle"}}>{ConvertDate(x.createTime)}</td>
                            </tr>
                        ))
                    }
                    
                    
                    
                </tbody>
                </Table>
                
        </div>
    );
};

export default ProjectSelect;