import React,{ useState, useEffect }from 'react';
import { Modal, Portal, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const LoadingModal = ({animating}) => {

  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
      <Portal>
        <Modal visible={animating}  contentContainerStyle={styles.container}>
        <View style={styles.content}>
             <ActivityIndicator animating={true} color='red' />
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
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingModal;