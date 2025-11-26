import { useParams } from "react-router-dom";
import { useTasksQuery } from "../queries/useTasksQuery";
import { isPastDue } from "../utils/isPastDue";
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import { AiOutlinePlus } from 'react-icons/ai';
import CreateModalTask from "../modal/CreateModalTask";
import UpdateModalTask from "../modal/UpdateModalTask";
import Confirmation from "../modal/Confirmation";

const ProjectTasks = () => {

    const params = useParams()
    const projectId = params.id ? Number(params.id) : null;
    const taskResults = useTasksQuery(projectId)
    const { data, isLoading, isError } = taskResults.findProjectTasks
    const tasks = data?.content
    

    const useModalContext = useContext(ModalContext)

    const handleCreateTask = () => {
        useModalContext.appear({
            title: "Task Ekle",
            modalContent: CreateModalTask
        })

    }

    const handleDeleteTask = (id) => {


        const handleConfirm=(onConfirmModalId)=>{

            useModalContext.disAppear(onConfirmModalId)

            taskResults.removeTask.mutateAsync({
            taskId: id,
            projectId: projectId // bunu yollama sebebim invalidate qury düzgün çalışsın diye 
        })

        }


        useModalContext.appear({
            title:"Silme Onayı",
            modalContent:Confirmation,
            props:{
                message:"Bu görevi silmek istediğinizden eminmisiniz",
                onConfirm:handleConfirm,
                onCancel:useModalContext.disAppear//referans gidecek sadece 
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
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-2">📋 Proje Görevleri ({tasks.length})</h2>
            <button
                onClick={handleCreateTask}
                className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-3"
            >
                <AiOutlinePlus className="h-5 w-5" />
                <span>Yeni Task Ekle</span>
            </button>

            {tasks.map((task) => {
                // Görevin vadesi geçmiş mi?
                const isOverdue = isPastDue(task.dueDate);
                const statusClasses = (() => {
                    if (isOverdue) {
                        // Tamamlanmamış ve vadesi geçmişse kırmızı
                        return 'bg-red-100 text-red-700 font-bold';
                    }
                    // vadesi geçmemişse sarı (Devam Ediyor)
                    return 'bg-yellow-100 text-yellow-700';
                });
                return (
                    <div
                        key={task.id}
                        className="bg-white  rounded-lg shadow-md hover:shadow-lg transition duration-200 flex justify-between items-stretch m-3 "
                    >
                        <div className="flex flex-row justify-between flex-1 p-5">
                            <span className="text-lg font-semibold text-gray-800 ">{task.name}</span>
                            <span className="text-sm text-gray-500">{task.description}</span>

                            <div className={`px-3 py-1 text-sm font-medium rounded-full mr-3 ${statusClasses()}`}>
                                {isOverdue ? 'VADESİ GEÇTİ' : 'DEVAM EDİYOR'}:({task.dueDate})
                            </div>
                        </div>
                        <div className="flex items-center justify-center ml-4 gap-2">
                            <button className="text-white bg-red-500 hover:bg-red-600 font-semibold w-24 h-full rounded cursor-pointer  " onClick={() => handleDeleteTask(task.id)}>Sil</button>
                            <button className="text-white bg-green-500 hover:bg-green-600 font-semibold w-24 h-full rounded cursor-pointer  " onClick={() =>handleUpdateTask(task.id)}>Düzenle</button>
                        </div>
                    </div>)
            })}
        </div>
    );
};

export default ProjectTasks;