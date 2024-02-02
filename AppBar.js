import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header style={{backgroundColor:'#3652AD'}}>
    <Appbar.Action icon="face-agent" color="white" />
    <Appbar.Content title="Emotion Recognizor" titleStyle={{color:"white"}} />
    
  </Appbar.Header>
);

export default AppBar;