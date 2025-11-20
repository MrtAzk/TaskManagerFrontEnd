import axios from "axios";

export const instance =axios.create({
    baseURL:"http://localhost:8080"
});

export const listTask=async(query)=>{
    try {
        const res=await instance.get("v1/tasks",{params:query});
        return res.data;
    } catch (error) {
        console.log("projeler çekilirken hata oluştu");
        throw error ;
        
    }
}