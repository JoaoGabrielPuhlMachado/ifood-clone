import { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useSetRecoilState } from "recoil";
import { atualizarState } from "../../recoil/atoms/auth";

import MarcasApi from "../../api/marcas";
const marcasApi = new MarcasApi();
import ProdutosApi from "../../api/produtos";
const produtosApi = new ProdutosApi();
import CategoriasApi from "../../api/categorias";
const categoriasApi = new CategoriasApi();

export default function Atualizar() {
  const setAtualizar = useSetRecoilState(atualizarState);

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [produtos, setProdutos] = useState([]);

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
  // useEffect(() => {
  //   async function getAll() {
  //     const categoriasData = await categoriasApi.buscarTodasAsCategorias();
  //     setCategorias(categoriasData);
  //     const marcasData = await marcasApi.buscarTodasAsMarcas();
  //     setMarcas(marcasData);
  //     const produtosData = await produtosApi.buscarTodosOsProdutos();
  //     setProdutos(produtosData);
  //   }
  //   getAll();
  // }, []);
  // async function updateAll() {
  //   const categoriasData = await categoriasApi.buscarTodasAsCategorias();
  //   setCategorias(categoriasData);
  //   const marcasData = await marcasApi.buscarTodasAsMarcas();
  //   setMarcas(marcasData);
  //   const produtosData = await produtosApi.buscarTodosOsProdutos();
  //   setProdutos(produtosData);
  // }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => updateAll()}>
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
