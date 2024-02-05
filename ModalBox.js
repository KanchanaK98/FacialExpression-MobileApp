import React,{ useState, useEffect }from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
const ModalBox = ({data,closeModal,visible}) => {

  const hideModal = () => setVisible(false);
  return (
      <Portal>
        <Modal  visible={visible} onDismiss={closeModal} contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <Text style={{color:'black'}}>{data}</Text>
          </View>
        </Modal>
      </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    width: 400, height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default ModalBox;