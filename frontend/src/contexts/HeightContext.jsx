import React, { createContext, useState, useEffect } from 'react';

// Context 생성
const HeightContext = createContext();

// Context Provider 컴포넌트
const HeightProvider = ({ children }) => {
    const [clientHeight, setClientHeight] = useState(window.innerHeight);

        useEffect(() => {
        // 브라우저 창의 크기가 변경될 때 clientHeight 업데이트
        const handleResize = () => setClientHeight(window.innerHeight);
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <HeightContext.Provider value={{ clientHeight }}>
        {children}
        </HeightContext.Provider>
    );
};

export { HeightProvider, HeightContext };
