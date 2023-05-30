import React, {useEffect, useRef, useState} from 'react';
import {Toast,Dropdown} from "react-bootstrap";

function NavToasts(props) {
    const [showA, setShowA] = useState(true);
    const dropDownItem = useRef();

    const toggleShowA = () => {
        setShowA(!showA);
        dropDownItem.current.style.display = "none";
    }
    return (
            <Dropdown.Item href="" ref={dropDownItem}>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <i className="bi bi-person-circle px-1"></i>
                        <strong className="me-auto">HR</strong>
                        <small>{props.time}  ago</small>
                    </Toast.Header>
                    <Toast.Body>{props.body}</Toast.Body>
                </Toast>
            </Dropdown.Item>
    );
}

export default NavToasts;