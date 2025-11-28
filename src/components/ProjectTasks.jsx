import { useParams } from "react-router-dom";
import { useTasksQuery } from "../queries/useTasksQuery";
import { isPastDue } from "../utils/isPastDue";
import { use, useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import CreateModalTask from "../modal/CreateModalTask";
import UpdateModalTask from "../modal/UpdateModalTask";
import Confirmation from "../modal/Confirmation";
import { toast } from "react-toastify";

const ProjectTasks = () => {

        //Sayfalama için useStateler

     const [currentpage,setCurrentpage]=useState(0);
     const [pageSize,setPageSize]=useState(5);

    const params = useParams()
    const projectId = params.id ? Number(params.id) : null;
    const taskResults = useTasksQuery(projectId,currentpage,pageSize)
    const { data, isLoading, isError } = taskResults.findProjectTasks
    const tasks = data?.content
    //Sayfa bilgisi
    const totalPages=data?.totalPages || 0
 
    

    

    const handlePageChange=(newPage)=>{
        if(newPage>=0 && newPage<totalPages){
            setCurrentpage(newPage);
        }
        console.log("sayfa"+currentpage)
    }




    const useModalContext = useContext(ModalContext)

    const handleCreateTask = async () => {
        useModalContext.appear({
            title: "Task Ekle",
            modalContent: CreateModalTask
        })


    }

    const handleDeleteTask = (id) => {


        const handleConfirm = async (onConfirmModalId) => {

            useModalContext.disAppear(onConfirmModalId)

            await taskResults.removeTask.mutateAsync({
                taskId: id,
                projectId: projectId // bunu yollama sebebim invalidate qury düzgün çalışsın diye 
            })
            toast.success("Task silindi")

        }


        useModalContext.appear({
            title: "Silme Onayı",
            modalContent: Confirmation,
            props: {
                message: "Bu görevi silmek istediğinizden eminmisiniz",
                onConfirm: handleConfirm,
                onCancel: useModalContext.disAppear//referans gidecek sadece 
            }

        })
    }

    const handleUpdateTask = (taskId) => {
        useModalContext.appear({
            title: "Task Güncelleme",
            modalContent: UpdateModalTask,
            props: {
                taskIdToUpdate: taskId // Task'ın ID'sini prop olarak gönderdik
            }
        })



    }


    // 1. Yüklenme Durumu
    if (isLoading) {
        return (
            <div className="p-8 text-center text-xl text-blue-600">
                Görevler Yükleniyor... Lütfen bekleyin.
            </div>
        );
    }

    // 2. Hata Durumu
    if (isError) {
        return (
            <div className="p-8 text-center text-xl text-red-600 bg-red-50 border border-red-200 rounded-lg">
                ❌ Hata! Görevler çekilirken sunucu bağlantı sorunu oluştu.
            </div>
        );
    }

    // 3. Proje Seçilmemişse (tasks null veya undefined ise)
    // Not: Bu durum genellikle ProjectView'da Router'dan ID gelmediğinde oluşur.
    if (!tasks) {
        return (
            <div className="p-8 text-center text-xl text-gray-500">
                Lütfen sol menüden bir proje seçin.
            </div>
        );
    }

    // 4. Görev Listesi Boşsa
    if (tasks.length === 0) {
        return (<div>
            <div className="p-8 text-center text-xl text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg">
                ⚠️ Bu projeye ait henüz tanımlanmış bir görev bulunmamaktadır.

            </div>
            <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-3"
            >
                <AiOutlinePlus className="h-5 w-5" />
                <span>Yeni Task Ekle</span>
            </button>
        </div>


        );
    }

    // 5. Başarılı Veri Render Etme (Görev Kartları)
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-cyan-400 border-b border-gray-600 pb-2 mb-4">📋 Proje Görevleri ({tasks.length})</h2>
            <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg flex items-center space-x-3 transition duration-150"
            >
                <AiOutlinePlus className="h-5 w-5" />
                <span>Yeni Task Ekle</span>
            </button>

            {tasks.map((task) => {
                // Görevin vadesi geçmiş mi?
                const isOverdue = isPastDue(task.dueDate);
                const statusClasses = (() => {
                    if (isOverdue) {
                        return 'bg-red-900/50 text-red-300 font-bold border-l-3 border-red-500';//vadesi geçmişse
                    }
                    return 'bg-yellow-900/50 text-yellow-300 border-l-3 border-yellow-500';//vadesi geçmemişse
                });
                return (
                    <div
                        key={task.id}
                        className="bg-gray-700/70 rounded-lg shadow-xl hover:shadow-cyan-500/30 transition duration-200 
                                   flex justify-between items-stretch m-3 border border-gray-600"
                    >
                        {/* 1. Task İçeriği (Ad, Açıklama, Tarih) */}
                        <div className="flex flex-row justify-between flex-1 p-5">
                            <span className="text-xl font-semibold text-gray-100 mb-1">{task.name}</span>
                            <span className="text-sm text-gray-400">{task.description}</span>

                            <div className={`px-3 py-1 text-sm font-medium rounded-full mr-3 ${statusClasses()}`}>
                                {isOverdue ? 'VADESİ GEÇTİ' : 'DEVAM EDİYOR'}:({task.dueDate})
                            </div>
                        </div>
                        {/* 3. Aksiyon Butonları */}
                        <div className="flex items-center justify-center ml-4 gap-2 mr-3">
                            <button className="bg-red-500 hover:bg-red-800 text-white font-semibold 
                       p-3 rounded-md transition duration-150 flex items-center justify-center cursor-pointer"  title="Görevi Sil"onClick={() => handleDeleteTask(task.id)}><FaRegTrashAlt className="h-5 w-5" /></button>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold 
                       p-3 rounded-md transition duration-150 flex items-center justify-center cursor-pointer"title="Görevi Düzenle" onClick={() => handleUpdateTask(task.id)}><FaRegEdit className="h-5 w-5" /></button>
                        </div>
                    </div>)
            })}
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

export default ProjectTasks;