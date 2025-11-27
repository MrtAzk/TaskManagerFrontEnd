import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    
    // NOT: Burada token kontrolü yaparak, eğer token varsa direkt Proje sayfasına yönlendirme yapabilirsin.
    // const navigate = useNavigate();
    // const isAuthenticated = !!localStorage.getItem('jwtToken');
    // if (isAuthenticated) {
    //     navigate('/projects', { replace: true });
    //     return null; // Yönlendirme yapıldığı için null döneriz.
    // }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                
                
                <AuthForm isSignup={isSignup} /> 
                
                {/* Mod Değiştirme Butonu */}
                <div className="mt-4 text-center">
                    <button 
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-indigo-600 hover:underline text-sm"
                    >
                        {isSignup ? 
                            'Zaten hesabınız var mı? Giriş yapın.' : 
                            'Hesabınız yok mu? Hemen kayıt olun.'
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;