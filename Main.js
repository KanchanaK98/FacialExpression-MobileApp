import React, { useState, useEffect } from 'react';
import { Button, Image, View, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import imgPlaceholder from './assets/splash.png';
import axios from 'axios';

export default function Main() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setimageURL] = useState(null);
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
        setLoading(true);
        setImage(result.assets[0]);
      }
    } catch (_) {
      console.log('File could not be selected');
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) {
        console.log('No image selected');
        return;
      }
      setLoading(true);
            const uri = image.uri;
            const type = `test/${image.uri.split(".")[1]}`;
            const name = `test.${image.uri.split(".")[1]}`;
            const source = {uri, type, name}; 
            const data = new FormData()
            data.append('file', source)
            data.append('upload_preset', 'contactApp')
            data.append("cloud_name", "khan98")
            fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
            method: "post",
            body: data
            }).then(res => res.json()).
            then(data => {
                //console.log("URL = "+data.url);
                setimageURL(data.url)
            }).catch(err => {
                console.log("An Error has been ocurred While Uploading")
            })
      
      
      const response = await axios.post('http://192.168.8.192:5000/image/processImage', {
        image: imageURL,
      });
      //console.log( response );
  
      // Handle the response from the backend
      if (response.status == 200) {
        console.log('Image uploaded successfully:', response.data);
      } else {
        console.error('Image uploaded unsuccessfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };
  

  const cancelImage = () =>
  {
    console.log("start canceling...")
    setImage(null);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: '5px' }} />
      <View>
        {image && <Image source={{ uri: image.uri }} style={{ width: 400, height: 400 }} />}
        {!image && <Image source={imgPlaceholder} style={{ width: 400, height: 400 }} />}
        <View style={{ padding: '5px' }} />
        <Button title="Pick and upload an image" onPress={pickImage} disabled={loading} />
      </View>

      {image && 
        <View style={{ padding: '20px', alignItems: 'center' }}>
            <Button title="Upload"  onPress={uploadImage}/>
            <Button title="Cancel"  onPress={cancelImage}/>
        </View>}
        
      
    </View>
  );
}