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

export const createTask =async(val)=>{
    try {
        const res = await instance.post("v1/tasks",val)
        return res.data;
    } catch (error) {
        console.error("Task  yaratılırken hata oluştu:", error);
        throw error;
    }
}