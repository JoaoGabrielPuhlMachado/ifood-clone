import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useRecoilValue } from "recoil";

import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Login from "./screens/Login/index.js";

const BottomTab = createBottomTabNavigator();
const LoginStack = createStackNavigator();

import { dadosState } from "../src/recoil/atoms/dados.js";
const currentAuthState = useRecoilValue(dadosState);

function LoginConfirm() {
  <NavigationContainer>
    <LoginStack.Navigator>
      {currentAuthState.loggedIn ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </LoginStack.Navigator>
  </NavigationContainer>;
}
export default function Routes() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
        }}
      >
        <BottomTab.Screen
          name="Login"
          component={LoginConfirm}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="login" color={color} size={26} />
            ),
          }}
        />
        <BottomTab.Screen
          name="PerfilRoutes"
          component={Perfil}
          options={{
            headerShown: false,
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" color={color} size={26} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
