"use client"

import { createContext, useContext, useState } from "react"

const ModalContext = createContext(null)

export function ModalProvider({children}){
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

export function useModal() {
    const context = useContext(ModalContext)
    if(!context){
        throw new Error('useModal must be used inside ModalProvider');
    }
    return context;
}