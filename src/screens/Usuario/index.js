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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth.js";

import UsuariosApi from "@/../../api/usuarios.js";

const Usuario = ({ route, navigation }) => {
  const setUser = useSetRecoilState(authState);
  const logOut = async () => {
    setUser({
      isLogged: false,
    });
    await SecureStore.deleteItemAsync("access");
  };
  const usuariosApi = new UsuariosApi();
  const auth = useRecoilValue(authState);
  const [usuario, setUsuario] = useState({
    id: auth.userID,
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
  const [errorMsg, setErrorMsg] = useState("");
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const usuarioData = await usuariosApi.buscarUsuarioPorId(usuario.id);
        setUsuario(usuarioData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsuario();
  }, [usuario.id]);

  useEffect(() => {
    if (reloadFlag) {
      setReloadFlag(false);
    }
  }, [reloadFlag]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || usuario.data_nascimento;
    setShowDatePicker(false);

    const year = currentDate.getFullYear();
    const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
    const day = (`0${currentDate.getDate()}`).slice(-2); 
    const formattedDate = `${year}-${month}-${day}`;
  
    setUsuario({ ...usuario, data_nascimento: formattedDate });
  };
  
  const handleSalvar = async () => {
    try {
      const { email, password, first_name, last_name, telefone, cpf } = usuario;
      if (email && password && first_name && last_name && telefone && cpf) {
        if (usuario.id) {
          await usuariosApi.atualizarUsuario(usuario.id, usuario);
          setReloadFlag(true);
          Alert.alert("Usuário atualizado com sucesso!");
        } else {
          await usuariosApi.adicionarUsuario(usuario);
        }
      } else {
        setErrorMsg("Informe todos os campos obrigatórios!");
      }
    } catch (error) {
      setErrorMsg("Ocorreu um erro ao salvar. Tente novamente mais tarde.");
    }
  };

  const handleExcluir = async () => {
    try {
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
              try {
                if (usuario.id) {
                  await usuariosApi.excluirUsuario(usuario.id);
                  logOut();
                  Alert.alert("Sua conta foi excluída com sucesso!");
                  navigation.navigate("Login");
                } else {
                  Alert.alert("A conta não possui um ID válido.");
                }
              } catch (error) {
                console.error(error);
                Alert.alert("Ocorreu um erro ao excluir a conta.");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error(error);
    }
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
        onChangeText={(text) =>
          setUsuario((prevState) => ({ ...prevState, email: text }))
        }
        autoCapitalize={"none"}
        textContentType="emailAddress"
      />

      <TextInput
        style={styles.input}
        placeholder="Primeiro Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.first_name}
        onChangeText={(text) =>
          setUsuario((prevState) => ({ ...prevState, first_name: text }))
        }
        autoCapitalize={"none"}
        textContentType="name"
      />

      <TextInput
        style={styles.input}
        placeholder="Último Nome"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.last_name}
        onChangeText={(text) =>
          setUsuario((prevState) => ({ ...prevState, last_name: text }))
        }
        autoCapitalize={"none"}
        textContentType="middleName"
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.telefone}
        onChangeText={(text) =>
          setUsuario((prevState) => ({ ...prevState, telefone: text }))
        }
        autoCapitalize={"none"}
        textContentType="telephoneNumber"
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="rgba(0,0,0,0.5)"
        value={usuario.cpf}
        onChangeText={(text) =>
          setUsuario((prevState) => ({ ...prevState, cpf: text }))
        }
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          Data de Nascimento:
          {usuario.data_nascimento instanceof Date
            ? usuario.data_nascimento.toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })
            : new Date(usuario.data_nascimento).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
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
    backgroundColor: "#f1ebf7",
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
