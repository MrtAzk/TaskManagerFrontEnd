import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { ModalContext } from '../context/ModalContext';
import { useTasksQuery } from '../queries/useTasksQuery';
import { useParams } from 'react-router-dom';


const UpdateModalTask = ({ modalId,taskIdToUpdate }) => {

    

    const useModalContext = useContext(ModalContext);

    const results=useTasksQuery(useModalContext.currentProjectId)
   
    const{data,isLoading}=results.getTaskById(taskIdToUpdate)

    const schema = yup.object({
        name: yup.string().required("Project İsmi Boş Bırakılamaz"),
        description: yup.string().required("Project Açıklaması Boş Bırakılamaz"),
        dueDate: yup.date()
            .typeError("Lütfen geçerli bir tarih seçin") 
            .required("Proje bitiş tarihi boş bırakılamaz")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const onSub = (data) => {
        const dateObj = new Date(data.dueDate);
        
        const day = String(dateObj.getDate()).padStart(2, '0');      // 5 -> 05 yapar
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başlar!
        const year = dateObj.getFullYear();

        const formattedDate = `${day}-${month}-${year}`; // Örn: 25-11-2025

        // Orijinal veriyi bozmadan, tarihi güncelleyip yeni bir obje yapıyoruz
        const payload = {
            ...data,
            projectId:Number(useModalContext.currentProjectId),
            dueDate: formattedDate

        };

        console.log(payload)
        useModalContext.disAppear(modalId)
        addTask.mutateAsync(payload)
        reset();
    }   

    useEffect(() => {
        // Veri geldiyse ve yükleme bittiyse (veya veri varsa)
        if (data) {
            
            // Backend'den gelen tarihi YYYY-MM-DD formatına çevir (HTML input tipi için zorunlu)
            const formattedDate = new Date(data.dueDate).toISOString().split('T')[0];
            
            // reset() metodunu kullanarak form alanlarını güvenli bir şekilde dolduruyoruz
            reset({ 
                name: data.name,
                description: data.description,
                dueDate: formattedDate,
            });
        }
    }, [data, reset]); // taskToEdit veya reset metodu değiştiğinde çalışır

    const inputClass ="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 mb-3"

    return (
        <form onSubmit={handleSubmit(onSub)} className='flex-row'>
            <input {...register("name")} placeholder="Task İsmi" className={inputClass}  />
            <p className='text-red-700'>{errors.name?.message}</p>

            <textarea {...register("description")} placeholder="Açıklama" className={inputClass} />
             <p className='text-red-700'>{errors.description?.message}</p>


             <div>
                <input type="date" {...register("dueDate")} className={inputClass} />
             </div>

            <div className='flex justify-end'><button type="submit" className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700'>Create</button></div>

        </form>
    )
}

export default UpdateModalTask