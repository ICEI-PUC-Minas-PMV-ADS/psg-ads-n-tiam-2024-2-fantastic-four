import React from "react";
import { Modal, View, StyleSheet } from "react-native";

interface CustomModalProps {
  visible: boolean;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, children }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginHorizontal:24,
    width:'90%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
});
