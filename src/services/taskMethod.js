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

export const getTask=async(taskId)=>{
    try {
        const res =await instance.get(`v1/tasks/${taskId}`)
        return res.data
    } catch (error) {
        console.error("Task  getirlirken hata oluştu:", error);
        throw error;
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

export const deleteTask=async(taskId)=>{
    try {
        const res=await instance.delete(`v1/tasks/${taskId}`)
        return res.data //cünkü bakcne string cevao dönüyor... o yüzden return ediyorum yoska gerek yok
    } catch (error) {
        console.error("Task  silinirken hata oluştu:", error);
        throw error;
        
    }
}