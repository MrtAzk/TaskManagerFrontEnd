import React, { useState } from 'react';
import { useProjectQuery } from '../queries/useProjectsQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Confirmation from '../modal/Confirmation';
import { toast } from 'react-toastify';


const ProjectsBar = () => {

    //Sayfalama için stateler
    const [currentpage,setCurrentpage]=useState(0);
    const [pageSize,setPageSize]=useState(10)

    const projectResult = useProjectQuery();
    const { data, isLoading, isError, error } = projectResult.findAll;
    const useModalContext = useContext(ModalContext)

    const navigate = useNavigate()

    const { id: selectedIdString } = useParams(); 
    const selectedId = selectedIdString;

    const totalPages=data?.totalPages || 0
 

    const handlePageChange=(newPage)=>{
        if(newPage>=0 && newPage<totalPages){
            setCurrentpage(newPage);
        }
        console.log("sayfa"+currentpage)
    }


    const handleDelete = (id) => {

        const handleConfirm = async (onConfirmModalId) => {
            useModalContext.disAppear(onConfirmModalId)
            await projectResult.removeProject.mutateAsync(id)
            toast.success("Proje başarıyla silindi!");
        }

        useModalContext.appear({
            title: "Silem Onayı",
            modalContent: Confirmation,
            props: {
                message: "Seçili projeyi silmek istediğinizden eminmisiniz",
                onCancel: useModalContext.disAppear,
                onConfirm: handleConfirm
            }

        })



    }



    // 2. Yükleniyor durumunu yönet
    if (isLoading) {
        return <div className="text-gray-300 p-2 animate-pulse">Projeler yükleniyor...</div>;
    }

    // 3. Hata durumunu yönet
    if (isError) {

        console.error("Proje çekme hatası:", error);
        return <div className="text-red-300 p-2">Hata: Sunucuya ulaşılamıyor!</div>;
    }


    const projectList = data?.content;

    // Proje listesi boşsa
    if (!projectList || projectList.length === 0) {
        return <div className="text-gray-500 p-2 italic">Henüz proje yok.</div>;
    }


    return (

        <div className="space-y-1">
            <h3 className="text-lg font-bold border-b border-amber-700 pb-2 mb-2">
                Tüm Projeler ({projectList.length})
            </h3>
            {projectList.map(project => (
                <div
                    key={project.id} className={`flex justify-between p-2 rounded-md transition duration-150 ease-in-out cursor-pointer text-sm items-stretch
                        ${selectedId === String(project.id) 
                            ? 'bg-amber-600 font-semibold text-white shadow-inner' // Seçiliyse
                            : 'hover:bg-amber-700/50 text-gray-200'}`} // Seçili değilse
                    // Taskları görtülemek için fonmksiyon gelcek
                    onClick={() => { navigate("/project/" + project.id); }}

                >
                    <div className="flex flex-1 items-center p-2">
                        {project.name}
                    </div>
                    <div className="flex items-center justify-center ml-4 gap-2  " >
                        <button className='bg-red-600/80 hover:bg-red-700 text-white font-medium px-2 py-1 rounded transition duration-150 text-xs' onClick={() => handleDelete(project.id)}>x</button>
                    </div>

                </div>
            ))}
            {/* PAGINATION UI'ı */}
                        {totalPages >1 &&(
                <div className="flex justify-center items-center space-x-3 mt-8 p-4 bg-gray-700/50 rounded-lg">
                    
                    {/* Önceki Sayfa Butonu */}
                    <button
                        onClick={() => handlePageChange(currentpage - 1)}
                        disabled={currentpage === 0}
                        className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md disabled:opacity-50"
                    >
                        &lt; Önceki
                    </button>

                    {/* Sayfa Bilgisi */}
                    <span className="text-gray-300 font-semibold">
                        Sayfa {currentpage + 1} / {totalPages}
                    </span>

                    {/* Sonraki Sayfa Butonu */}
                    <button
                        onClick={() => handlePageChange(currentpage + 1)}
                        disabled={currentpage === totalPages - 1}
                        className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md disabled:opacity-50"
                    >
                        Sonraki &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectsBar;