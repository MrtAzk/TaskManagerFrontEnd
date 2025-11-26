import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { ModalContext } from '../context/ModalContext';
import { useTasksQuery } from '../queries/useTasksQuery';
import { useParams } from 'react-router-dom';
import Confirmation from './Confirmation';


const CreateModalTask = ({ modalId }) => {

    

    const useModalContext = useContext(ModalContext);

    const {addTask} = useTasksQuery();

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




        const handleConfirm = () => {


            // Orijinal veriyi bozmadan, tarihi güncelleyip yeni bir obje yapıyoruz
            const payload = {
                ...data,
                projectId: Number(useModalContext.currentProjectId),
                dueDate: formattedDate

            }

            useModalContext.disAppear(modalId)
            addTask.mutateAsync(payload)
            reset();

        }

        useModalContext.appear({
            title: "Yaratma Onayı",
            modalContent: Confirmation,
            props: {
                message: "Bu görevi yaratmak  istediğinizden eminmisiniz",
                onConfirm: handleConfirm,
                onCancel: useModalContext.disAppear//referans gidecek sadece 
            }

        })


    }   

    const inputClass ="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:border-blue-500 mb-3"

    return (
        <form onSubmit={handleSubmit(onSub)} className='flex-row'>
            <input {...register("name")} placeholder="Task İsmi" className={inputClass}/>
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

export default CreateModalTask