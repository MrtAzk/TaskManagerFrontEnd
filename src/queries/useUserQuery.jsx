import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { data } from "react-router-dom";
import { getCurrentUser, logUser, saveUser } from "../services/userMethod";

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
        },
        onError: (error) => {
            // Hata yönetimini burada yap (UI'da göstermek için)
            console.error("Login hatası:", error);
        }
        
    })
    const findCurrentUser = useQuery({

    queryKey: ["authStatus"],

    queryFn: getCurrentUser,

    retry: false, // Başarısız olursa otomatik tekrar denemesin
    refetchOnWindowFocus: false, // Pencere focus olduğunda tekrar sorgulamasın
  });
    return { addUser, loginUser,findCurrentUser }
}
