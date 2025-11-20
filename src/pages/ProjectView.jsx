import React from 'react'
import Main from '../layout/Main';
import { useProjectQuery } from '../queries/useProjectsQuery';
import ProjectsBar from '../components/ProjectsBar';
import { useParams } from 'react-router-dom';
import ProjectTasks from '../components/ProjectTasks';

const ProjectView = () => {
    const params=useParams();


    
  return (

    <Main sidebar={<ProjectsBar />} projectTasks ={<ProjectTasks/>}/>

    
  )
}

export default ProjectView