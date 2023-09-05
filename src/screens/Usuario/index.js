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
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/auth.js";

import UsuariosApi from "@/../../api/usuarios.js";

const Usuario = ({ route }) => {
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

  useEffect(() => {
    const fetchUsuario = async () => {
      console.log(userId);
      console.log(auth);
      console.log(JSON.parse(atob(auth.access.split(".")[1])).user_id);
      // criar variavel para guardar info do user id e usar dps...

      try {
        const usuarioData = await usuariosApi.buscarUsuarioPorId(userId);
        setUsuario(usuarioData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsuario();
  }, [userId]);

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
      if (usuario.id) {
        await usuariosApi.atualizarUsuario(usuario);
        Alert.alert("Usuário atualizado com sucesso!");
      } else {
        await usuariosApi.adicionarUsuario(usuario);
      }
      // Navegue para a página desejada após salvar
    } catch (error) {
      setErrorMsg("Informe todos os campos!");
      // Lide com o erro aqui
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
            if (usuario.userId) {
              await usuariosApi.excluirUsuario(usuario.userId);
              Alert.alert("Sua conta foi excluída com sucesso!");
              // Navegue para a página desejada após a exclusão
            } else {
              Alert.alert("A conta não possui um ID válido.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text>--{userId}</Text>
      <View>
        <Image
          style={{ width: 100, height: 100 }}
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
          {usuario.data_nascimento
            ? usuario.data_nascimento.toLocaleDateString()
            : ""}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={usuario.data_nascimento}
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
      <TouchableOpacity onPress={handleExcluir}>
        <Text>Excluir Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSalvar}>
        <Text>Salvar Informações</Text>
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
};
