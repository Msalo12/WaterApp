import React from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { height } = Dimensions.get('window');
const MODAL_HEIGHT = height * 0.4;

export const Opacity = ({ visible, onClose }) => {
  const handleBackdropPress = (event) => {
    const { locationY } = event.nativeEvent;
    
    // Check if the touch was inside the modal container
    if (locationY > height - MODAL_HEIGHT) {
      return;
    }
    
    // Close the modal when touching the backdrop
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.modalBackdrop}>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
     modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
});