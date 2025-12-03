import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    


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