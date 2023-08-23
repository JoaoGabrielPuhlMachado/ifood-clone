import { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useSetRecoilState } from "recoil";
import { dadosState } from "../../recoil/atoms/dados";



export default function Atualizar() {
  const setAtualizar = useSetRecoilState(dadosState);

  const update = async () => {
    const categoriasData = await categoriasApi.buscarTodasAsCategorias();
    const marcasData = await marcasApi.buscarTodasAsMarcas();
    const produtosData = await produtosApi.buscarTodosOsProdutos();
    setAtualizar({
      categorias: categoriasData,
      marcas: marcasData,
      produtos: produtosData,
    });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => update()}>
        <MaterialIcons name="refresh" size={26} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    backgroundColor: "#f1ebf7",
    padding: 8,
    borderRadius: 100,
  },
});
