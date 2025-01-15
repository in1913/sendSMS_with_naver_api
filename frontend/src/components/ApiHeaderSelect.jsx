import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Table, Button,Form } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import MyModal from './MyModal';
import { useToast } from '../contexts/ToastContext';
import { useTheme } from '../contexts/ThemeContext';
import  ConvertDate from '../utils/ConvertDate';

const ApiSelect = ({onMenuClick}) => {
    const { showToastMessage } = useToast();
    const userInfo = useUser();
    const [data, setdata] = useState([]);
    const {isDarkMode} = useTheme();
    
    
    useEffect(() => {
        try{
            axios.post('http://localhost:3001/api/select', {
                fk_user_id : userInfo.id
            }).then((response) => {
                setdata(response.data);
            }).then((error) => {
                //console.log(error);
            });
            
        }catch(error){
            console.log(error);
        }
        
    },[userInfo.id]);

    const [showModal, setShowModal] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const handleCheck = (e) => {
        const { id, checked } = e.target;
        setCheckedList((prevChecked) =>
            checked ? [...prevChecked, id] : prevChecked.filter((x) => x !== id)
        );
    };

    const handleDelete = () => {
        try{
            axios.post('http://localhost:3001/api/delete', {
                ids : checkedList,
                fk_user_id : userInfo.id
            }).then((response) => {
                if(response.status === 200){
                    setdata(response.data);
                    setCheckedList([]);
                    setShowModal(!showModal);
                    showToastMessage('삭제되었습니다.', 'success');
                    
                }
            }).catch((error) => {
                setShowModal(!showModal);
                showToastMessage('삭제에 실패했습니다.', 'fail');
                
            });
        }catch(error){
            setShowModal(!showModal);
            showToastMessage('삭제에 실패했습니다.', 'fail');
            
        }
    };
    
    return (
        <div>
            
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='d-inline-block'>API 헤더 조회</h3> 
                {
                    data.length === 0 ? 
                    <Button className='bg-naver' onClick={() => onMenuClick(1)}>
                        API 헤더 생성
                    </Button>
                    :
                    <></>

                }
                
            </div>
            
            <Table striped bordered hover className=' mt-4' data-bs-theme={isDarkMode ? "dark" : "light"}>
                <thead className=''>
                    <tr className='text-center'>
                        <th width="5%"><Form.Check disabled/></th>
                        <th width="75%">Access Key</th>
                        <th width="20%">만든 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((x, index) => (
                            <tr key={index}>
                                <td className='text-center'>
                                    <Form.Check id={x._id} onClick={handleCheck} checked={checkedList.includes(x._id)}/>
                                </td>
                                <td>{x.accessKey}</td>
                                <td className='text-center' style={{fontSize: "0.75rem", verticalAlign: "middle"}}>{ConvertDate(x.createdon)}</td>
                            </tr>
                            ))
                    }
                    
                </tbody>
                </Table>
                <div className='d-flex justify-content-end'>
                    <Button className="bg-naver-danger px-3" disabled={checkedList.length === 0} type="button" onClick={() => setShowModal(!showModal)}>
                        삭제
                    </Button>
                </div>
                <MyModal showModal={showModal} modalMsg={"정말 삭제하시겠습니까?"} onHide={() => setShowModal(!showModal)} cmd={handleDelete}/>
        </div>
    );
};

export default ApiSelect;