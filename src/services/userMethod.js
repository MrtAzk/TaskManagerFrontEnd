import axios from "axios";

export const instance =axios.create({
    baseURL:"http://localhost:8080",
    // 🚀 KRİTİK EKLEME: Bu, tarayıcıya çerezleri (JWT token dahil) 
    // Cross-Origin isteğiyle birlikte göndermesini söyler.
    withCredentials: true
});

export const saveUser=async(val)=>{
    try {
        const res =await instance.post("v1/auth/signup",val)
        return res.data
    } catch (error) {
        console.log("Kullanıcı kayıt edilirken hata oluştu",error.response?.data || error.message)
        throw error
    }
}
export const logUser=async(val)=>{
    try {
        const res =await instance.post("v1/auth/login",val)
        return res.data
    } catch (error) {
        console.log("Kullanıcı giriş yaparken hata oluştu",error.response?.data || error.message)
        throw error
    }
    
}

export const getCurrentUser = async () => {
  try {
    const res = await instance.get("/v1/auth/me", { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error("Kullanıcı bilgisi çekilemedi:", error);
    throw error;
  }
};