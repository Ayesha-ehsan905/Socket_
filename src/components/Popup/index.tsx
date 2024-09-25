import { styled } from "../../styles";
import { Box } from "../elements/Box";

type AlertDTO = {
  open: boolean;
  text: string;
  severity: "success" | "error" | "info" | "warning";
  onClose?: (status: boolean) => void;
  isClose?: boolean;
};

const Overlay = styled(Box, {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
});

const SnackbarContainer = styled(Box, {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  position: "relative",
  textAlign: "center",
});

const CloseButton = styled("button", {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "none",
  fontSize: "20px",
  cursor: "pointer",
});

const Alert = ({ open, text, severity, onClose, isClose }: AlertDTO) => {
  const handleClose = () => {
    onClose?.(false);
  };

  return (
    <Overlay style={{ display: open ? "flex" : "none" }}>
      <SnackbarContainer
        style={{
          transform: "translate(-50%, -50%)",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      >
        {!isClose && <CloseButton onClick={handleClose}>&times;</CloseButton>}
        <h3>{severity}</h3>
        <p>{text}</p>
      </SnackbarContainer>
    </Overlay>
  );
};

export default Alert;
