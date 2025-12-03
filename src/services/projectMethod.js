import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8080',
    // 🚀 KRİTİK EKLEME: Bu, tarayıcıya çerezleri (JWT token dahil) 
    // Cross-Origin isteğiyle birlikte göndermesini söyler.
    withCredentials: true
});

// 💡 Interceptor (Kesici) Ekleme
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); 
        
        if (token) {
            // Token'ı trim'leyerek Header'a ekle (boşluk hatasını önler)
            config.headers.Authorization = `Bearer ${token.trim()}`; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const listProject = async (query) => {
    try {
        const res = await instance.get("v1/projects", { params: query });
        return res.data;
    } catch (error) {
        console.error("Proje çekilirken hata oluştu:", error);
        throw error;

    }


}

export const createProject = async (data) => {
    try {
        const res = await instance.post("v1/projects", data)
        return res.data

    } catch (error) {
        console.error("Proje  yaratılırken hata oluştu:" ,error.response?.data || error.message);
        throw error;

    }
}

export const deleteProject = async (id) => {
    try {
        const res = await instance.delete(`v1/projects/${id}`)
        return res.data

    } catch (error) {
        console.error("Proje  silinirken hata oluştu:", error.response?.data || error.message);
        throw error;

    }
}