import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSetRecoilState } from "recoil";
import { Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { dadosState } from "../../recoil/atoms/dados.js";

import Categorias from "../../components/Home/Categorias";
import Produtos from "../../components/Home/Produtos";
import Marcas from "../../components/Home/Marcas";

import MarcasApi from "../../api/marcas";
const marcasApi = new MarcasApi();
import ProdutosApi from "../../api/produtos";
const produtosApi = new ProdutosApi();
import CategoriasApi from "../../api/categorias";
const categoriasApi = new CategoriasApi();

export default function Home() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const setDados = useSetRecoilState(dadosState);

  const update = async () => {
    const categoriasData = await categoriasApi.buscarTodasAsCategorias();
    const marcasData = await marcasApi.buscarTodasAsMarcas();
    const produtosData = await produtosApi.buscarTodosOsProdutos();
    setDados({
      categorias: categoriasData,
      marcas: marcasData,
      produtos: produtosData,
    });
  };

  useEffect(() => {
    update();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
    update();
  }, []);

  const handleSearch = async () => {
    if (searchInput.trim() !== "") {
      const produtosPorNome = await produtosApi.buscarProdutosPorNome(
        searchInput.trim()
      );
      navigation.navigate("Resultado", { pesquisa: produtosPorNome });
      setSearchInput("");
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={true}
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.inputContainer}>
        <Animatable.View
          animation={isFocused ? "pulse" : ""}
          duration={400}
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Pesquisar produtos"
            onChangeText={(text) => setSearchInput(text)}
            value={searchInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSearch}
          />
        </Animatable.View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSearch}
          style={styles.searchIcon}
        >
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Categorias />
      <Marcas />
      <Produtos />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1ebf7",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderRightWidth: 1,
    borderColor: "#b0b0b0",
  },
  searchIcon: {
    marginLeft: 10,
  },
});
