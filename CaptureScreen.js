import React,{useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

const CaptureScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const [dataImage, setDataImage] = useState(null);
    const [returnedData, setReturnedData] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = {quality: 1, base64: false};
            await cameraRef.current.takePictureAsync(options)
              .then(res=>getYoloResult(res))
        }
    };

    const moveToSearch = (data) => {
        let unique = undefined;
        console.log(data)
        if (data === undefined || data === null || data.length == 0) {
            //debug
            unique = ['kiwi']

        } else {
            const names = [];
            for (let q = 0; q < data.length; q++) {
                names.push(data[q].name);
            }
            unique = names.filter((v, i, a) => a.indexOf(v) === i);
        }
        console.log(unique);
        navigation.navigate('Search Recipe',{query:unique})
    }

    const getYoloResult = async (res) => {
        let formData = new FormData();
        
        const imageUri = res.uri;
        const filename = imageUri.split('/').pop();
        
        //image param
        formData.append('image', { uri: imageUri, name: filename, type:'image/jpg' });
        
        try {
            const response = await fetch(
            'https://0267-182-1-115-74.ngrok.io/api/yolov5sv1',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept:'application/json'
                },
                body:formData,
            }
            );
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.indexOf('application/json') !== -1) {
                  const json = await response.json();
                  setReturnedData(json);
                  moveToSearch(returnedData);
                } else {
                  console.log('empty response')
                }
              }
            
        } catch (error) {
            console.error(error);
        }
    };
    

    return(
        <View style={{flex:1, backgroundColor:'black'}}>
            
            { isFocused && 
            <Camera  
                style={{flex:12}}
                ref={cameraRef}
            />  
            }
            
            <View style={{flex:1, marginVertical:30}}>
                    <Button
                        title='Capture'
                        onPress={takePicture}
                    />
            </View>
            
        </View>
    );
}

export default CaptureScreen;