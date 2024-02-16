import { useContext, createContext, useState } from 'react';

const IncompleteFeatureContext = createContext({
    showModal: false, setShowModal: null,
    modalHeaderTitle: "", setModalHeaderTitle: null
});
export function GetIncompleteFeatureContext() {
    return useContext(IncompleteFeatureContext);
}

export function IncompleteFeatureContextProvider({ children }) {
    const [showModal, setShowModal] = useState(false);
    const [modalHeaderTitle, setModalHeaderTitle] = useState("");

    return (
        <IncompleteFeatureContext.Provider value={{
            showModal: showModal, setShowModal: setShowModal,
            modalHeaderTitle: modalHeaderTitle, setModalHeaderTitle: setModalHeaderTitle
        }}>
            {children}
        </IncompleteFeatureContext.Provider>
    );
}