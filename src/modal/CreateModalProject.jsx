import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { ModalContext } from '../context/ModalContext';
import { useProjectQuery } from '../queries/useProjectsQuery';
import Confirmation from './Confirmation';
import { toast } from 'react-toastify';

const CreateModalProject = ({ modalId }) => {

    const useModalContext = useContext(ModalContext);

    const { addProject } = useProjectQuery();

    const schema = yup.object({
        name: yup.string().required("Project İsmi Boş Bırakılamaz"),
        description: yup.string().required("Project Açıklaması Boş Bırakılamaz")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const onSub = (data) => {

        const handleConfirm = async() => {
            useModalContext.disAppear(modalId)
            await addProject.mutateAsync(data)
            toast.success("Proje yaratıldı")
            reset();

        }

        useModalContext.appear({
            title:"Yaratma Onayı",
            modalContent:Confirmation,
            props:{
                message:"Bu projeyi yaratmak  istediğinizden eminmisiniz",
                onConfirm:handleConfirm,
                onCancel:useModalContext.disAppear//referans gidecek sadece 
            }
        })


    }

    return (
        <form onSubmit={handleSubmit(onSub)} className='flex-row'>
            <input {...register("name")} placeholder="Proje İsmi" className="w-full border border-gray-300 p-2 rounded-lg shadow-sm 
            focus:border-blue-500 mb-3 "/>
            <p className='text-red-700'>{errors.name?.message}</p>

            <textarea {...register("description")} placeholder="Açıklama" className="w-full border border-gray-300 p-2 rounded-lg shadow-sm 
            focus:border-blue-500 mb-3 " />
            <p className='text-red-700'>{errors.description?.message}</p>
            <div className='flex justify-end'><button type="submit" className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700'>Create</button></div>

        </form>
    )
}

export default CreateModalProject