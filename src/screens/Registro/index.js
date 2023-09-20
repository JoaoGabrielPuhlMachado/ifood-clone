import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useSetRecoilState } from "recoil";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

import UsuariosApi from "@/../../api/usuarios.js";
const usuariosApi = new UsuariosApi();

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import api from "../../services/api.js";
import { authState } from "../../recoil/atoms/auth.js";

export default function Registro({ navigation }) {
  const setUser = useSetRecoilState(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setData_Nascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data_nascimento;
    setShowDatePicker(false);
    setData_Nascimento(currentDate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registro = async () => {
    if (password !== confirmpassword) {
      setErrorMsg("As senhas devem ser iguais.");
      return;
    }

    try {
      await usuariosApi.adicionarUsuario({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        telefone: telefone,
        cpf: cpf,
        data_nascimento: data_nascimento.toISOString().split("T")[0],
        groups: [2],
      });
      const { data } = await api.post("token/", {
        email: email,
        password: password,
      });
      setUser({
        loggedIn: true,
        token: data.access,
        refresh: data.refresh,
      });
      await SecureStore.setItemAsync("access", data.access);
    } catch (error) {
      setUser({ loggedIn: false, access: null, refresh: null });
      setErrorMsg("Informe todos os campos!");
      await SecureStore.deleteItemAsync("access");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cabecalho}>{`Bem-Vindo à\n Lígia Roupas`}</Text>
      <TextInput
        style={styles.input}
        placeholder="Primeiro Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={first_name}
        onChangeText={setFirst_Name}
        autoCapitalize={"none"}
        textContentType="name"
      />
      <TextInput
        style={styles.input}
        placeholder="Último Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={last_name}
        onChangeText={setLast_Name}
        autoCapitalize={"none"}
        textContentType="middleName"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={email}
        onChangeText={setEmail}
        autoCapitalize={"none"}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={telefone}
        onChangeText={setTelefone}
        autoCapitalize={"none"}
        textContentType="telephoneNumber"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={cpf}
        onChangeText={setCpf}
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Data de Nascimento:{" "}
          {data_nascimento ? data_nascimento.toLocaleDateString() : ""}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={data_nascimento}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordTextInput}
          placeholder="Senha"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.togglePasswordIcon}
          onPress={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordInput}>
        <TextInput
          style={styles.passwordTextInput}
          placeholder="Confirmar Senha"
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={confirmpassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          autoCapitalize={"none"}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.togglePasswordIcon}
          onPress={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      <Text>{errorMsg}</Text>
      <TouchableOpacity style={styles.registro} onPress={() => registro()}>
        <Text style={styles.registrotext}>Registrar</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            height: 1,
            marginLeft: 20,
            backgroundColor: "black",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginwrap}
        >
          <Text style={styles.semconta}>Possui conta?</Text>
          <Text style={styles.logintext}> Faça login!</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            height: 1,
            marginRight: 20,
            backgroundColor: "black",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "rgba(255,255,255,0.8)",
    width: 250,
    height: 50,
    marginBottom: 10,
  },
  passwordTextInput: {
    flex: 1,
    padding: 10,
  },
  togglePasswordIcon: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f1ebf7",
    alignItems: "center",
    justifyContent: "center",
  },
  registro: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  registrotext: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    padding: 10,
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "rgba(0,0,0,0.1)",
  },
  cabecalho: {
    fontSize: 45,
    marginTop: 30,
    marginBottom: 30,
  },
  icones: {
    flexDirection: "row",
  },
  icone: {
    width: 118,
    height: 50,
    borderRadius: 10,
  },
  logintext: {
    color: "rgba(200,0,0,1)",
    paddingRight: 8,
  },
  semconta: {
    paddingLeft: 8,
  },
  loginwrap: {
    flexDirection: "row",
  },
});
