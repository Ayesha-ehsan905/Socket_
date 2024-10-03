import React from "react";
import { styled } from "@stitches/react";

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
}

const Modal = ({ show, children }: ModalProps) => {
  if (!show) return null; // Render nothing if the modal is not shown

  return (
    <Overlay>
      <ModalContainer>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

export const Overlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99,
});

const ModalContainer = styled("div", {
  backgroundColor: "$white1", // white background for the modal
  borderRadius: "12px",
  width: "400px", // You can adjust width as needed
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  position: "relative",
  padding: "20px",
  margin: "0 1rem",
});

const Content = styled("div", {
  fontSize: "16px",
});
