import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppBar from './AppBar';
import Main from './Main';
export default function App() {
  return (
    <PaperProvider>
      <AppBar/>
    <View style={styles.container}>
      <Main/>
      <StatusBar style="auto" />
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
