import React from 'react';
import { useUser } from '../contexts/UserContext';
const UserWelcome = () => {
    const userInfo = useUser();
    
    return (
        <div>
            {userInfo.email} 님, <br />안녕하세요!
        </div>
    );
};

export default UserWelcome;