// ==============================================
import Container from 'react-bootstrap/Container';
// ==============================================
function ErrorPage() {
    return (
        <>
            <div data-bs-theme="dark" className="page-overlay">
                {/* --------------------- */}
                {/* Content Body Section */}
                <Container fluid
                    className="d-flex flex-column align-items-center justify-content-evenly w-100 content-body"
                    style={{ height: "50vh" }}>
                    <h1 className="mb-4 text-center">
                        We&apos;re very sorry for the inconvenience.
                    </h1>
                    <div className="d-flex flex-column align-items-center">
                        <h6 className="text-center">
                            We were unable to locate the page you were looking for.
                        </h6>
                        <h6 className="text-center">
                            Perhaps check if it&apos;s the link&apos;s correct?
                        </h6>
                    </div>
                    <div>
                        <h6 className="text-center">
                            Feel free to reach out to our support helpdesk,&nbsp;
                            <a href="mailto:abracadabra@alakazam.wiz"
                                className="fw-bold text-decoration-none">
                                abracadabra@alakazam.wiz
                            </a>.
                        </h6>
                    </div>
                </Container>
                {/* --------------------- */}
            </div >
        </>
    )
}

export default ErrorPage
// ==============================================
