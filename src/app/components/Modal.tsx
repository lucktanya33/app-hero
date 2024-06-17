import { ModalProps } from "@/app/type";

import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
`;

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <ModalButton onClick={onClose}>確定</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
