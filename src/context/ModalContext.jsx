import { createContext, useState } from "react";
import BaseModal from "../modal/BaseModal";
import { nanoid } from "nanoid";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(null);

    const appear =(modal)=>{
        const id =nanoid();
        setModals([...modals,{id,...modal}])
    }

    const disAppear=(modalId)=>{
        setModals(modals.filter(val=>val.id!==modalId))

    }




    const contextValue = {
        appear,disAppear,currentProjectId,
        setCurrentProjectId
    };


    return (
        <ModalContext.Provider value={contextValue} >
            {children}
            {modals.length > 0 && (
                <div  className=" flex items-center justify-center bg-black/25 fixed top-0  w-full h-screen " >
                    {modals.map((modal) => { return <BaseModal key={modal.id} id={modal.id}  title={modal.title} modalContent={modal.modalContent} onClose={() => disAppear(modal.id)} /> })}
                </div>)}

        </ModalContext.Provider>
    )
}