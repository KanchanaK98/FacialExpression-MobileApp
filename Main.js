import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import imgPlaceholder from './assets/splash.png';

export default function Main() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [listImages, setListImages] = useState(null);

  

  


  // Method to pick image from device
  const pickImage = async () => {
    // Calling image picker to let user pick image
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      });

      // Selecting the picked image
      if (!result.canceled) {
        setProgress(0);
        setLoading(true);
        setImage(result.assets[0]);
      }
    } catch (_) {
      console.log('File could not be selected');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: '5px' }} />
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 400, height: 400 }} />}
        {!image && <Image source={imgPlaceholder} style={{ width: 400, height: 400 }} />}
        <View style={{ padding: '5px' }} />
        <Button title="Pick and upload an image" onPress={pickImage} disabled={loading || imagesLoading} />
      </View>

      {image && 
        <View style={{ padding: '20px', alignItems: 'center' }}>
          <Button title="camera"  onPress={() => console.log('Pressed')}>
            Press me
        </Button>
        </View>}
        
      
    </View>
  );
}