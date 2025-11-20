import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createProject, listProject } from "../services/projectMethod";

export const useProjectQuery =()=>{

    const queryClient=useQueryClient();

    const findAll =useQuery({
        queryKey :["projects"],
        queryFn: async()=>{
            const res =await listProject();
            return res;
        }
    })

    const addProject=useMutation({
        mutationFn:async(data)=>{
            return await createProject(data)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:["projects"]
            })
        }
    })
    return findAll ;
}