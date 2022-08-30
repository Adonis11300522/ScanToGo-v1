// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/SettingScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';
import DetailScreen from './DetailScreen';
import PageNumberScreen from './PageNumberScreen';
import QrscannerScreen from "./QrscannerScreen"
import ExcelViewer from './Components/ExcelViewer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#0049EE', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const detailScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="DetailScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0049EE', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{
          title: 'Detail', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const numberScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="NumberScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0049EE', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="NumberScreen"
        component={PageNumberScreen}
        options={{
          title: 'Number', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};



const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0049EE', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const qrscannerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="QrscannerScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#0049EE', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="QrscannerScreen"
        component={QrscannerScreen}
        options={{
          title: 'Qr Scanner', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: 'Home Screen' }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="detailScreenStack"
        options={{ drawerLabel: 'Detail Screen' }}
        component={detailScreenStack}
      />
      <Drawer.Screen
        name="excelScreenStack"
        options={{ drawerLabel: 'Excel Screen' }}
        component={ExcelViewer}
      />
      <Drawer.Screen
        name="numberScreenStack"
        options={{ drawerLabel: 'Number Screen' }}
        component={numberScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{ drawerLabel: 'Setting Screen' }}
        component={settingScreenStack}
      />
      <Drawer.Screen
        name="qrscannerScreenStack"
        options={{ drawerLabel: 'QrScanner Screen' }}
        component={qrscannerScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
