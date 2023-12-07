import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Login from "./screens/Login/index.js";
import Registro from "./screens/Registro/index.js";
import Usuario from "./screens/Usuario/index.js";
import Desc from "./screens/Desc/index.js";
import Categoria from "./screens/Categoria/index.js";
import Marca from "./screens/Marca/index.js";
import Resultado from "./screens/Resultado/index.js";

import { useRecoilValue } from "recoil";
import { authState } from "./recoil/atoms/auth.js";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Routes({}) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
export default function Main({}) {
  const currentAuthState = useRecoilValue(authState);

  if (currentAuthState.isLogged) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Routes">
          <Stack.Screen
            name="Routes"
            component={Routes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Usuario"
            component={Usuario}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Perfil"
            component={Perfil}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Desc"
            component={Desc}
            options={{
              headerShown: true,
              title: "Descrição do Produto",
            }}
          />
          <Stack.Screen
            name="Categoria"
            component={Categoria}
            options={{
              headerShown: true,
              title: "Categorias",
            }}
          />
          <Stack.Screen
            name="Marca"
            component={Marca}
            options={{
              headerShown: true,
              title: "Marcas",
            }}
          />
          <Stack.Screen
            name="Resultado"
            component={Resultado}
            options={{
              headerShown: true,
              title: "Resultado",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registro"
            component={Registro}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
