import { Modal } from "@mui/material";
import { Btn } from "./input-field";
import useAuth from "../hooks/useAuth";

export default function PopUpModal() {
  const { questAccord, setQuestAccord, crownStyle } = useAuth();

  const handleClose = () => {
    setQuestAccord(false);
  };

  return (
    <Modal className="modal-container" onClose={handleClose} open={questAccord}>
      <div className="modal-element">
        <h1>
          You earn a crown!{" "}
          <i className="fa-duotone fa-crown" style={crownStyle}></i>
        </h1>
        <h2>Keep up the good work towards a sustainable climate.</h2>
        <Btn class="modal-btn" text="Continue" onclick={handleClose} />
      </div>
    </Modal>
  );
}
