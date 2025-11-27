import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ( {element} ) => {
    const Element =element
    // 💡 KRİTİK: Her render'da güncel JWT durumunu kontrol eder.
    const isAuthenticated = !!localStorage.getItem('jwtToken'); 

    if (isAuthenticated) {
        // Token varsa, istenen bileşeni (ProjectView) render et
        return <Element/>;
    } else {
        // Token yoksa, Login sayfasına yönlendir
        return <Navigate to="/login" />;
    }
};

export default ProtectRoute;