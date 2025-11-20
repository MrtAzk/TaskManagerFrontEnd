import { useQuery, useQueryClient } from "@tanstack/react-query"
import { listTask } from "../services/taskMethod";

export const useTasksQuery =(projectId)=>{

    const queryClient=useQueryClient();

    const findProjectTasks=useQuery({
        queryKey:["tasks","ProjectId:",projectId],
        queryFn:async()=>{
            const res= await listTask({ projectId: projectId });
            return res 
        },
        enabled: !!projectId,
    })

    return findProjectTasks

}