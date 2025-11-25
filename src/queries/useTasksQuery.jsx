import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTask, deleteTask, getTask, listTask } from "../services/taskMethod";

export const useTasksQuery =(projectId)=>{

    const queryClient=useQueryClient();

    const findProjectTasks=useQuery({
        queryKey:["tasks",projectId],
        queryFn:async()=>{
            const res= await listTask({ projectId: projectId });//request paramdadan değişken olarak bekliyor diye böyle nesne yaptım
            return res 
        },
        enabled: !!projectId,
    })

    const getTaskById=(id) =>{
        return useQuery({
        queryKey: ["task-detail", id], 
            
            queryFn: async () => {
              
                const res = await getTask(id);
                return res;
            },
            enabled: !!id,
    })}

    const addTask=useMutation({
        mutationFn:async(data)=>{
            return await createTask(data);
        },
        onSuccess:(res,variables)=>{
            const mutatedProjectId=variables.projectId //variables olarak almasak normal project id yi verrisek ivalidate te sorun çıkıyor böyle yap
            
            queryClient.invalidateQueries({
                queryKey:["tasks",mutatedProjectId]
            })
        },
     
    
    })

    const removeTask=useMutation({
        mutationFn:async(data)=>{
            return await deleteTask(data.taskId)
        },
        onSuccess:(res,variables)=>{
            const mutatedProjectId=variables.projectId
            
            queryClient.invalidateQueries({
                queryKey:["tasks",mutatedProjectId]
            })
        }
    })

    return {findProjectTasks,addTask,removeTask,getTaskById}

}