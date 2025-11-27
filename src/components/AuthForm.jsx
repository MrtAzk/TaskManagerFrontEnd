import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserQuery } from '../queries/useUserQuery';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// 💡 Schema: Hem login hem de signup için geçerli temel doğrulama
const schema = yup.object({
    email: yup.string().email('Geçerli bir e-posta adresi girin.').required('E-posta zorunludur.'),
    password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır.').required('Şifre zorunludur.'),
    // Not: Signup için 'name' alanı da eklenebilir.
});

// isSignup prop'u ile formun Kayıt mı (Signup) yoksa Giriş mi (Login) olduğunu belirleriz.
const AuthForm = ({ isSignup }) => {
    const navigate = useNavigate();
    const { loginUser, addUser } = useUserQuery();

    // 💡 Formun hangi mutasyonu kullanacağını belirle
    const mutation = isSignup ? addUser : loginUser;

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const responseData = await mutation.mutateAsync(data);

            if (!isSignup && responseData?.token) {
                toast.success(`Hoş geldiniz, ${responseData.username}!`)

                navigate('/projects');
            }
            else if (isSignup) {

                toast.success('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
                // Kayıt başarılıysa Login ekranına dön.
                navigate('/login');
            }

        } catch (error) {
            console.error("Auth işleminde hata:", error.response?.data);
            toast.error(`Giriş başarısız: ${error.response?.data?.message || 'Kullanıcı adı veya şifre hatalı.'}`)

        }


    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800">
                {isSignup ? 'Kullanıcı Kaydı' : 'Giriş Yap'}
            </h2>

            {/* 💡 Eğer signup ise name alanı eklenebilir */}
            {isSignup && (
                <input
                    {...register('name')}
                    type="text"
                    placeholder="Adınız Soyadınız"
                    className="w-full p-3 border rounded"
                />
            )}

            <input
                {...register('email')}
                type="email"
                placeholder="E-posta"
                className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>

            <input
                {...register('password')}
                type="password"
                placeholder="Şifre"
                className="w-full p-3 border rounded"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 disabled:bg-indigo-400"
            >
                {mutation.isPending ? 'İşleniyor...' : (isSignup ? 'Kayıt Ol' : 'Giriş Yap')}
            </button>
        </form>
    );
};

export default AuthForm;