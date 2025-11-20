import { useParams } from "react-router-dom";
import { useTasksQuery } from "../queries/useTasksQuery";
import { isPastDue } from "../utils/isPastDue";

const ProjectTasks = () => {

    const params = useParams()
    const projectId = params.id ? Number(params.id) : null;

    const { data, isLoading, isError } = useTasksQuery(projectId)
    const tasks = data?.content


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
        return (
            <div className="p-8 text-center text-xl text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg">
                ⚠️ Bu projeye ait henüz tanımlanmış bir görev bulunmamaktadır.
            </div>
        );
    }

    // 5. Başarılı Veri Render Etme (Görev Kartları)
    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-2">📋 Proje Görevleri ({tasks.length})</h2>

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
                        className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex justify-between items-center border-l-4 border-blue-500"
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-semibold text-gray-800">{task.title}</span>
                            <span className="text-sm text-gray-500">{task.description}</span>
                        </div>
                        <div className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses()}`}>
                            {isOverdue ? 'VADESİ GEÇTİ' : 'DEVAM EDİYOR'}:({isOverdue ? "":task.dueDate})
                        </div>
                    </div>)
            })}
        </div>
    );
};

export default ProjectTasks;