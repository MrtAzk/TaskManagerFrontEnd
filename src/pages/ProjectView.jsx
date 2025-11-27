import React, {  useContext, useEffect } from 'react'
import Main from '../layout/Main';
import ProjectsBar from '../components/ProjectsBar';
import { useParams } from 'react-router-dom';
import ProjectTasks from '../components/ProjectTasks';
import { ModalContext } from '../context/ModalContext';
import CreateModalProject from '../modal/CreateModalProject';

const ProjectView = () => {
    const params=useParams();
    const id =params.id
    const {setCurrentProjectId}=useContext(ModalContext)

    useEffect(()=>{
      setCurrentProjectId(id)
    },[setCurrentProjectId,id])

    const useModalContext=useContext(ModalContext);

    const handleCreateProject =()=>{
      useModalContext.appear({
        title:"Create Project",
        modalContent:CreateModalProject

      })
    }


    
  return (

    <Main sidebar={<><button onClick={handleCreateProject} className='justify-center item-center w-full bg-slate-400 p-3 hover:bg-slate-700 rounded-lg'>Create Project</button><ProjectsBar /></>} projectTasks ={<ProjectTasks/>}/>

    
  )
}

export default ProjectView