/**
* Modal javascript
*
* @module YeeModal.jsx
* @author Thai Duy Bao
* since 2023
*/

import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
const YeeModal = (props) => {

    const data = props.modalProps;
    //console.log(data);
    // modal
    const loginModal = useRef(null);
    
    // back drop
    const backdrop = useRef(null);

    const handleCloseModal = () => {

        loginModal.current.classList.remove("show");
        loginModal.current.style.display = "none";
        backdrop.current.style.display = "none";
    }

    if (data.type === "ERROR_MODAL") {
        return (
            <>
                <div ref={loginModal}
                    className="modal fade"
                    id="err_Modal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content text-center">
                            <div className="modal-header pd-0 border-0">
                                <FontAwesomeIcon icon={faCircleExclamation} className="color-primary px-1"/> 
                                <h5 className="modal-title color-primary">{data.errCap}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    data-bs-backdrop="false"
                                    onClick={() => handleCloseModal()}
                                ></button>
                            </div>
                            <div className="modal-body py-0">
                                
                                <span className="yee-text-fw-bold">
                                    {data.errTitle}
                                </span>
                                <p>{data.errMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade" ref={backdrop} id="backdrop" style={{display: "none"}}></div>
            </>
        );
    }
}

export default YeeModal;