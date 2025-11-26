import React from 'react';
import { useProjectQuery } from '../queries/useProjectsQuery';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Confirmation from '../modal/Confirmation';


const ProjectsBar = () => {

    const projectResult = useProjectQuery();
    const { data, isLoading, isError, error } = projectResult.findAll;
    const useModalContext = useContext(ModalContext)

    const navigate = useNavigate()

    const handleDelete = (id) => {

        const handleConfirm = (onConfirmModalId) => {
            useModalContext.disAppear(onConfirmModalId)
            projectResult.removeProject.mutateAsync(id)
        }

        useModalContext.appear({
            title: "Silem Onayı",
            modalContent: Confirmation,
            props: {
                message:"Seçili projeyi silmek istediğinizden eminmisiniz",
                onCancel: useModalContext.disAppear,
                onConfirm: handleConfirm
            }

        })

    }



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
                    key={project.id} className=" flex justify-between  rounded-md transition duration-150 ease-in-out hover:bg-amber-700 cursor-pointer text-sm items-stretch"
                    // Taskları görtülemek için fonmksiyon gelcek
                    onClick={() => { navigate("/project/" + project.id); }}>
                    <div className="flex flex-1 p-2">
                        {project.name}
                    </div>
                    <div className="flex items-center justify-center ml-4 gap-2  " >
                        <button className='bg-red-500 h-full w-5 rounded cursor-pointer ' onClick={() => handleDelete(project.id)}>x</button>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProjectsBar;