// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateProfile, getProfile } from '../../api/api';
import { useGlobalState } from "state-pool";
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [userID, setUserID, updateUserID] = useGlobalState('userID')

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    getProfile(userID)
      .then((res) => {
        setEmail(res.email)
        setFirstName(res.first_name)
        setLastName(res.last_name)
      })
  }, [])

  const onUpdate = () => {
    updateProfile({ first_name: firstName, last_name: lastName, email: email, id: userID })
      .then((res) => {
        if (res === 'success')
          alert("Update your profile successfully");
        else
          alert('Please check your input data')
      })
  }

  const onPassChange = () => {
    if (password !== repassword) {
      alert("Please confirm password")
      return;
    }
    if (password.length < 6) {
      alert("Password has to great than 6");
      return;
    }
    updateProfile({ id: userID, password: password })
      .then((res) => {
        if (res === 'success')
          alert("Change your password correctly")
        else
          alert("Please check your input data")
      })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.avtarContainer}>
        <View style={styles.avtarImageContainer}>
          {image && <Image source={{ uri: image }} style={styles.avtarImage} />}
          {!image && <Image source={require('../../assets/icon.png')} style={styles.avtarImage} />}
        </View>
        {/* <View style={styles.changePhoto}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={pickImage}>
            <MaterialCommunityIcons name="pencil" size={24} color="#0049EE" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Change Photo</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.row}>
          <TextInput style={{ ...styles.textInput, ...{ width: '45%' } }} placeholder='first name' defaultValue={firstName} onChangeText={(txt) => setFirstName(txt)} />
          <TextInput style={{ ...styles.textInput, ...{ width: '45%', marginLeft: '10%' } }} placeholder='last name' defaultValue={lastName} onChangeText={(txt) => { setLastName(txt) }} />
        </View>
        <View style={styles.row}>
          <TextInput style={{ ...styles.textInput, ...{ width: '100%' } }} placeholder='email' defaultValue={email} onChangeText={(txt) => { setEmail(txt) }} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            onUpdate();
          }}>
            <Text style={{ color: 'white', fontSize: 16 }}>UPDATE</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ ...styles.row, ...{ justifyContent: 'flex-start', } }}>
          <Text style={{ fontSize: 17 }}>Change Password</Text>
        </View>
        <View style={styles.row}>
          <TextInput style={{ ...styles.textInput, ...{ width: '45%' } }} placeholder='new password' defaultValue={password} onChangeText={(txt) => { setPassword(txt) }} />
          <TextInput style={{ ...styles.textInput, ...{ width: '45%', marginLeft: '10%' } }} placeholder='confirm password' defaultValue={repassword} onChangeText={(txt)=> { setRePassword(txt) }} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=> {
            onPassChange()
          }}>
            <Text style={{ color: 'white', fontSize: 16 }}>CHANGE</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  avtarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 50,
  },
  avtarImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  avtarImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7c7b7b',
    borderWidth: 1,
  },
  changePhoto: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  textInput: {
    borderBottomWidth: 1,
    height: 40,
    padding: 3,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: '5%',
    width: '100%',
  },
  button: {
    backgroundColor: '#0049EE',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    borderRadius: 5,
  }
})