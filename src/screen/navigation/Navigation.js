import React from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Intro from '../public/Intro';
import LoginScreen from '../Autentivication/LoginScreen';
import RegisterScreen from '../Autentivication/RegisterScreen';
import ForgotPassword from '../Autentivication/ForgotPassword';
import HomeScreen from '../public/HomeScreen';
import Profile from '../public/Profile';
import Detail from '../public/Detail';
import ChatScreen from '../user/ChatScreen';
import CartScreen from '../user/CartScreen';
import Categories from '../public/Categories';
import UpdateScreen from '../user/UpdateScreen';
import ChangePassword from '../user/ChangePassword';
import NavigasiToko from '../user/NavigasiToko';
import BuatToko from '../user/BuatToko';
import TambahProduk from '../admin/TambahProduk';
import EditProduk from '../admin/EditProduk';
import UpdateToko from '../admin/UpdateToko';
import Konfirmasi from '../user/Konfirmasi';
import Dikirim from '../user/Dikirim';
import Selesai from '../user/Selesai';
import KonfirmasiToko from '../admin/KonfirmasiToko';
import DikirimToko from '../admin/DikirimToko';
import SelesaiToko from '../admin/SelesaiToko';
import Kontak from '../user/Kontak';
import ClikToko from '../public/ClikToko';
import DetailFromToko from '../public/DetailFromToko';
import Search from '../public/Search';
import GetCheckOut from '../user/GetCeckOut';
import DetailFromAdmin from '../admin/DetailFromAdmin';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const IconBottom = (props) => {
  const {color, focused} = props.data;
  let colorSelected = focused ? color : 'grey';
  return (
    <View>
      <Image
        source={props.image}
        style={{width: 30, height: 30, tintColor: colorSelected}}
      />
    </View>
  );
};

const top = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="Konfirmasi" component={Konfirmasi} />
      <Top.Screen name="Dikirim" component={Dikirim} />
      <Top.Screen name="Selesai" component={Selesai} />
    </Top.Navigator>
  );
};

const top2 = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="Konfirmasi" component={KonfirmasiToko} />
      <Top.Screen name="Dikirim" component={DikirimToko} />
      <Top.Screen name="Selesai" component={SelesaiToko} />
    </Top.Navigator>
  );
};

const tab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('./icon/house.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Toko"
        component={NavigasiToko}
        options={{
          title: 'Toko',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('./icon/shop.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('./icon/user.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Pemesanan"
        component={top}
        options={{
          title: 'Pemesanan',
          tabBarIcon: (props) => (
            <IconBottom data={props} image={require('./icon/box.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={tab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateScreen"
          component={UpdateScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BuatToko"
          component={BuatToko}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tambah Produk"
          component={TambahProduk}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProduk"
          component={EditProduk}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateToko"
          component={UpdateToko}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="KonfirmasiToko"
          component={top2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kontak"
          component={Kontak}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ClickToko"
          component={ClikToko}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailToko"
          component={DetailFromToko}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetCheckOut"
          component={GetCheckOut}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailFromAdmin"
          component={DetailFromAdmin}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
