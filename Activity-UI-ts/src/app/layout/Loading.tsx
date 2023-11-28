import React from "react";
import { Spinner } from "react-bootstrap";


interface Props {
    inverted?: boolean ;
    content?: string;
}

export default function Loading({inverted = true, content = "Loading..."}: Props) {
    return (
        <div className="d-flex justify-content-center text-center spinner" >
            <Spinner animation="border" role="status" >
                <span className="visually-hidden" >{content}</span>
            </Spinner>
      </div>
    )
}