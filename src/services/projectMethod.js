import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080"
});

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
        console.error("Proje  yaratılırken hata oluştu:", error);
        throw error;

    }
}

export const deleteProject = async (id) => {
    try {
        const res = await instance.delete(`v1/projects/${id}`)
        return res.data

    } catch (error) {
        console.error("Proje  silinirken hata oluştu:", error);
        throw error;

    }
}