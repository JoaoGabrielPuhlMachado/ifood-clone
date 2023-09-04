import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRecoilValue } from "recoil";
import { authState } from "./recoil/atoms/auth.js";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./routes.js";
import Login from "./screens/Login/index.js";
import Registro from "./screens/Registro/index.js";

const Stack = createStackNavigator();

export default function Main() {
  const currentAuthState = useRecoilValue(authState);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentAuthState.loggedIn ? (
          <Stack.Screen
            name="Routes"
            component={Routes}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
