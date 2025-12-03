import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUserQuery } from '../queries/useUserQuery';

const ProtectRoute = ( {element} ) => {
    const Element =element
    // 💡 KRİTİK: Her render'da güncel JWT durumunu kontrol eder.
   const userRes=useUserQuery();
    const { data: user, isLoading, isError } = userRes.findCurrentUser;

        if (isLoading) {
        // Loading sırasında herhangi bir render yapma, boş dönebilirsin veya spinner
        return null;
    }

    if (isError || !user) {
         // Token yoksa, Login sayfasına yönlendir
         return <Navigate to="/login" />;
    
    } else {
        // Token varsa, istenen bileşeni (ProjectView) render et
        return <Element/>;
        
    }
};

export default ProtectRoute;