import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = () => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Image Uploader" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default AppBar;