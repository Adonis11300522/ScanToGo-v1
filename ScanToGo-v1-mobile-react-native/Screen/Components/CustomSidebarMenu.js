// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: '#0049EE' }}>
            {'Settings'.charAt(0)}
          </Text>
        </View>
        <View style={stylesSidebar.profileHeaderPicRect}>
          <Text style={stylesSidebar.profileHeaderText}>Settings</Text>
        </View>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props}/> */}
        <DrawerItem
          label={({ color }) =>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="md-home" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>Home</Text>
            </View>
          }
          onPress={() => {
            props.navigation.push('HomeScreen');
          }}
        />
        <DrawerItem
          label={({ color }) =>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="cog" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>User Info</Text>
            </View>
          }
          onPress={() => {
            props.navigation.navigate('SettingScreenStack');
          }}
        />
        <DrawerItem
          label={({ color }) =>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="cube" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>Membership</Text>
            </View>
          }
          onPress={() => {
            props.navigation.navigate('MemberShipScreenStack');
          }}
        />
        <DrawerItem
          label={({ color }) =>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="logout" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>Log Out</Text>
            </View>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              { cancelable: false },
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0049EE',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#0049EE',
    height: 100,
    paddingLeft: 15,
    alignItems: 'flex-end',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderPicRect: {
    height: 60,
    justifyContent: 'flex-end',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});
