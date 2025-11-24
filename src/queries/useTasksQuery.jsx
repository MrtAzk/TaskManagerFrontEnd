import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, listTask } from "../services/taskMethod";

export const useTasksQuery =(projectId)=>{

    const queryClient=useQueryClient();

    const findProjectTasks=useQuery({
        queryKey:["tasks",projectId],
        queryFn:async()=>{
            const res= await listTask({ projectId: projectId });
            return res 
        },
        enabled: !!projectId,
    })

    const addTask=useMutation({
        mutationFn:async(data)=>{
            return await createTask(data);
        },
        onSuccess:(variables)=>{
            const mutatedProjectId=variables.projectId //variables olarak almasak normal project id yi verrisek ivalidate te sorun çıkıyor böyle yap
            
            queryClient.invalidateQueries({
                queryKey:["tasks",mutatedProjectId]
            })
        },
     
    
    })

    return {findProjectTasks,addTask}

}