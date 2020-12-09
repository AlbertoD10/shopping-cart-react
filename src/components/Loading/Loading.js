import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner animation="border" variant="primary" />
      <h5>Cargando...</h5>
    </div>
  );
}
