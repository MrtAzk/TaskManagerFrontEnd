import { useMutation, useQueryClient } from "@tanstack/react-query"
import { data } from "react-router-dom";
import { logUser, saveUser } from "../services/userMethod";

export const useUserQuery = () => {
    const queryClient = useQueryClient();

    const addUser = useMutation({
        mutationFn: async (data) => {
            return await saveUser(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
        }
    })
    const loginUser = useMutation({
        mutationFn: async (data) => {

          return await logUser(data);
        },
        onSuccess: (responseData) => {
            console.log("Login Başarılı! Response:", responseData);
            if (responseData && responseData.token) {
                // 1. JWT Token'ı KALICI olarak kaydet!
                localStorage.setItem('jwtToken', responseData.token);
            }
        },
        onError: (error) => {
            // Hata yönetimini burada yap (UI'da göstermek için)
            console.error("Login hatası:", error);
        }
    })
    return { addUser, loginUser }
}
