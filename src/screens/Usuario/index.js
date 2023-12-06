import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, setToken } from "../../recoil/atoms/auth.js";

import UsuariosApi from "@/../../api/usuarios.js";

const Usuario = ({ route, navigation }) => {
  const setUser = useSetRecoilState(authState);
  const logOut = async () => {
    setUser({
      loggedIn: false,
    });
    await SecureStore.deleteItemAsync("access");
  };
  const usuariosApi = new UsuariosApi();
  const auth = useRecoilValue(authState);
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    telefone: "",
    cpf: "",
    data_nascimento: new Date(),
    foto: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const setUserId = useSetRecoilState(authState);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuariosApi.buscarUsuarioPorId(auth.userID);
        setUsuario(usuarioData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsuario();
  }, [setUserId]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || usuario.data_nascimento;
    setShowDatePicker(false);
    setUsuario({ ...usuario, data_nascimento: currentDate });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSalvar = async () => {
    try {
      if (auth.userID) {
        await usuariosApi.atualizarUsuario(auth.userID);
        navigation.navigate("Perfil");
        Alert.alert("Usuário atualizado com sucesso!");
      } else {
        await usuariosApi.adicionarUsuario(auth.userID);
        navigation.navigate("Perfil");
      }
    } catch (error) {
      setErrorMsg("Informe todos os campos!");
    }
  };

  const handleExcluir = () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir a conta? Ela será excluída permanentemente!",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            if (auth.userID) {
              await usuariosApi.excluirUsuario(auth.userID);
              logOut();
              Alert.alert("Sua conta foi excluída com sucesso!");
              navigation.navigate("Login");
            } else {
              Alert.alert("A conta não possui um ID válido.");
            }
          },
        },
      ]
    );
  };
  const updateAuthToken = async (newToken) => {
    await setToken(newToken);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.userImage}
          source={{ uri: usuario.foto ? usuario.foto.url : null }}
        />
        {!usuario.foto && <Text>Usuário Sem Imagem</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.email}
        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
        autoCapitalize={"none"}
        textContentType="emailAddress"
      />
      <TextInput
        style={styles.input}
        placeholder="Primeiro Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.first_name}
        onChangeText={(text) => setUsuario({ ...usuario, first_name: text })}
        autoCapitalize={"none"}
        textContentType="name"
      />
      <TextInput
        style={styles.input}
        placeholder="Último Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.last_name}
        onChangeText={(text) => setUsuario({ ...usuario, last_name: text })}
        autoCapitalize={"none"}
        textContentType="middleName"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.telefone}
        onChangeText={(text) => setUsuario({ ...usuario, telefone: text })}
        autoCapitalize={"none"}
        textContentType="telephoneNumber"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.cpf}
        onChangeText={(text) => setUsuario({ ...usuario, cpf: text })}
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          Data de Nascimento:{" "}
          {usuario.data_nascimento instanceof Date
            ? usuario.data_nascimento.toLocaleDateString()
            : ""}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={
            usuario.data_nascimento instanceof Date
              ? usuario.data_nascimento
              : new Date()
          }
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
          value={usuario.password}
          onChangeText={(text) => setUsuario({ ...usuario, password: text })}
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
      <TouchableOpacity style={styles.button} onPress={handleExcluir}>
        <Text style={styles.buttonText}>Excluir Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar Informações</Text>
      </TouchableOpacity>
      <Text>{errorMsg}</Text>
    </View>
  );
};

export default Usuario;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1ebf7", // Cor de fundo similar à página de login
  },
  userIdText: {
    fontSize: 20,
    marginBottom: 10,
    color: "#000", // Cor do texto similar à página de login
  },
  userImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 100,
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
  datePicker: {
    padding: 10,
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
  },
  datePickerText: {
    marginTop: "auto",
    marginBottom: "auto",
  },
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
  button: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
};
