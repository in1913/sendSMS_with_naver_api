import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const SideNavi = ({onMenuClick}) => {
    const { isDarkMode } = useTheme();
    return (
        <ListGroup data-bs-theme={isDarkMode ? "dark" : "light"}>
            <ListGroup.Item action onClick={() => onMenuClick(0)}>
                API 헤더 조회
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => onMenuClick(2)}>
                프로젝트 조회
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => onMenuClick(4)}>
                메세지 만들기
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => onMenuClick(5)}>
                발송 내역 조회
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => onMenuClick(6)}>
                발송 결과 조회
            </ListGroup.Item>
        </ListGroup>
    );
};

export default SideNavi;