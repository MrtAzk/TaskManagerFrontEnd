import React from 'react';
import { useProjectQuery } from '../queries/useProjectsQuery';
import { useNavigate } from 'react-router-dom';


const ProjectsBar = () => {

    const { data, isLoading, isError, error } = useProjectQuery();

    const navigate = useNavigate()



    // 2. Yükleniyor durumunu yönet
    if (isLoading) {
        return <div className="text-white p-2">Projeler yükleniyor...</div>;
    }

    // 3. Hata durumunu yönet
    if (isError) {

        console.error("Proje çekme hatası:", error);
        return <div className="text-red-300 p-2">Hata: Sunucuya ulaşılamıyor!</div>;
    }


    const projectList = data?.content;

    // Proje listesi boşsa
    if (!projectList || projectList.length === 0) {
        return <div className="text-white p-2 opacity-75">Henüz proje yok.</div>;
    }


    return (
        <div className="space-y-1">
            <h3 className="text-lg font-bold border-b border-amber-700 pb-2 mb-2">
                Tüm Projeler ({projectList.length})
            </h3>
            {projectList.map(project => (
                <div
                    key={project.id}

                    className="p-2 rounded-md transition duration-150 ease-in-out 
                               hover:bg-amber-700 cursor-pointer text-sm"
                    // Taskları görtülemek için fonmksiyon gelcek
                    onClick={() => {
                        navigate("/project/" + project.id);
                    }}
                >   
                    {project.name || `Proje #${project.id}`}
                </div>
            ))}
        </div>
    );
};

export default ProjectsBar;