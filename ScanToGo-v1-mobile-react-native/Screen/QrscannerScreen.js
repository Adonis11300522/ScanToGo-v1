import react, {useState, useRef, useEffect} from "react";
import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";

export default function QrscannerScreen() {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

   const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }

  }

  const __takePicture = async () => {
    try{
      console.log("========take picture=====");
      if (!cameraRef) return
      console.log("=========second========");
      // const photo = await cameraRef.current.takePictureAsync()
      // console.log(photo)
      // setPreviewVisible(true)
      // setCapturedImage(photo)

      const photo = {
        "height": 520,
        "uri": "https://d33wubrfki0l68.cloudfront.net/d74da08f08b4a17c368b58d36ee23c368b4a6819/fff62/img/homepage/phones.png",
        "width": 400,
      };

      console.log("========Start=====");
      
      const data = new FormData();
      data.append('url', 'https://d33wubrfki0l68.cloudfront.net/d74da08f08b4a17c368b58d36ee23c368b4a6819/fff62/img/homepage/phones.png');
      // data.append('url', 'https://storage.googleapis.com/api4ai-static/samples/ocr-1.png');

      const options = {
        method: 'POST',
        url: 'https://ocr43.p.rapidapi.com/v1/results',
        headers: {
          'X-RapidAPI-Key': '318757d1bamsh086a039ab74dd9cp1561e6jsn7ba7994cae9e',
          'X-RapidAPI-Host': 'ocr43.p.rapidapi.com'
        },
        data: data
      };
      
      axios.request(options).then(function (response) {
        console.log();
        if(response.data.results[0].status.code == "ok") {
            const content = response.data.results[0].entities[0].objects[0].entities[0].text;
        }
      }).catch(function (error) {
        console.error(error);
      });

    } catch(e) {
      console.log(e);
    }
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __savePhoto = () => {
    alert('save');
  }
  return (
    <View style={styles.container}>
      {setPreviewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
      ) : (
        <Camera style={styles.camera} ref={cameraRef}  flashMode={flashMode}>
        <TouchableOpacity
            onPress={__handleFlashMode}
            style={{
            position: 'absolute',
            left: '5%',
            top: '10%',
            backgroundColor: flashMode === 'off' ? '#000' : '#fff',
            borderRadius: 50,
            height: 30,
            width: 30,
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#0049ee',
            borderWidth: 2,
            backgroundColor: '#fff',
        }}
        >
            <Ionicons name="flashlight" size={20} color="#0049ee" />
        </TouchableOpacity>
        <View
        style={{
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
        }}
      >
        <View
        style={{
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
        }}
        >
            <TouchableOpacity
            onPress={__takePicture}
            style={{
            width: 70,
            height: 70,
            bottom: 0,
            borderColor: '#fff',
            borderWidth: 5,
            borderRadius: 50,
            backgroundColor: '#0049ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
            }}            
            ><Ionicons name="camera" size={40} color="#fff" /></TouchableOpacity>
    </View>
    </View>
        </Camera>
      )}
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  camera: {
    flex:1
  },
});