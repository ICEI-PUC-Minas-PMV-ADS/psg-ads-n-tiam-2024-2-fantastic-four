import React from 'react';
import { Modal } from 'react-native';

interface CustomModalProps {
  visible: boolean;
  children: any;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, children }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
     {children}
    </Modal>
  );
};


export default CustomModal;
