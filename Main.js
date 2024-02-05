import React, { useState} from 'react';
import { Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Button, ActivityIndicator, Colors } from 'react-native-paper';
import Animation from './Animation';
import ModalBox from './ModalBox';
import LoadingModal from './LoadingModal';

export default function Main() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageURL, setimageURL] = useState(null);
  const [responseData, setresponseData] = useState(null);
  const [modal, setModal] = useState(false);
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
        setImage(result.assets[0]);
      }
    } catch (_) {
      console.log('File could not be selected');
    }
  };

  const uploadImage = async () => {
    let response;
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
            const res = await fetch("https://api.cloudinary.com/v1_1/khan98/image/upload", {
            method: "post",
            body: data
            })
            const uploadData = await res.json();
            if(uploadData.url)
            {
              await setimageURL(uploadData.url)
              response = await axios.post('http://192.168.8.192:5000/image/processImage', {
                image: imageURL,
              });
            }
            
      
            console.log(" URL = "+imageURL)
      
  
      // Handle the response from the backend
      if (response.status == 200) {
        console.log('Image uploaded successfully:', response.data);
        setLoading(false);
        setresponseData(response.data)
        setImage(null)
        setModal(true)
      } else {
        setLoading(false);
        console.error('Image uploaded unsuccessfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setLoading(false);
    } 
  };

  const pickCamera = async () => {
    try{

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      //console.log(result);
      
      if (!result.cancelled) {
          // setImage(result.uri);
          setImage(result.assets[0]);
          
      }else
      {
        setLoading(false);
      }
    } catch (_) {
      console.log('File could not be selected');
      setImage(null);
      setLoading(false);
    }
    
  };
  

  const cancelImage = () =>
  {
    console.log("start canceling...")
    setImage(null);
    setLoading(false);
  }

  const closeModal = () => {
    setModal(false);
    setImage(null);
    setresponseData(null);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: '5px' }} />
      {loading&& <LoadingModal animating={loading} />}
      <View>
        {image&&!responseData && <Image source={{ uri: image.uri }} style={{ width: 400, height: 400 }} />}
        {!image&&!responseData && <Animation style={{ width: 400, height: 400 }}/>}
        <View style={{ padding: '20px',alignItems: 'center'  }} />
          {!image&&!responseData &&
          <>
          <Button icon="file-cabinet" mode="contained" onPress={pickImage} disabled={loading} style={{margin:2,width: 100,alignSelf: 'center',backgroundColor: 'blue'}}>
          <Text style={{color:"white"}}>Gallery</Text>
          </Button>
          <Button icon="camera" mode="contained" onPress={pickCamera} disabled={loading} style={{margin:1,width: 100,alignSelf: 'center',backgroundColor: 'green'}}>
          <Text style={{color:"white"}}>Camera</Text>
          </Button>
          </>}
          {image&&!responseData && 
        <>
            <Button icon="file-upload" mode="contained" onPress={uploadImage} style={{margin:2,width: 100,alignSelf: 'center'}}>
              Upload
            </Button>
            <Button icon="cancel" mode="contained" onPress={cancelImage} style={{margin:2,width: 100,alignSelf: 'center',backgroundColor: 'red'}}>
              Cancel
            </Button>
        </>}
        {!image&&responseData && 
        <>
        <ModalBox data={responseData.message} closeModal={closeModal} visible={modal}/>
        </>
        }
      </View>
      
      
      
        
      
    </View>
  );
}