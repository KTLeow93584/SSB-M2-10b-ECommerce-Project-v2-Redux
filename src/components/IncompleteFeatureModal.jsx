// ==============================================
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { GetIncompleteFeatureContext } from '../contexts/IncompleteFeatureContext.jsx';
// ==============================================
export default function IncompleteFeatureModal() {
    const incompeleteFeatureModalContext = GetIncompleteFeatureContext();
    const showModal = incompeleteFeatureModalContext.showModal;
    const setShowModal = incompeleteFeatureModalContext.setShowModal;

    const modalHeaderTitle = incompeleteFeatureModalContext.modalHeaderTitle;

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeaderTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The following feature is not yet available in this iteration of the prototype website!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
// ==============================================