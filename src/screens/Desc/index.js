import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import ProdutosApi from "../../api/produtos";
import CategoriasApi from "../../api/categorias";
import MarcasApi from "../../api/marcas";
import CoresApi from "../../api/cores";
import TamanhosApi from "../../api/tamanhos";
const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const coresApi = new CoresApi();
const tamanhosApi = new TamanhosApi();

const Desc = ({ route }) => {
  const { id } = route.params;
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
    categoria: "",
    marca: "",
    cor: "",
    tamanho: "",
    capa: "",
  });
  const [categoria, setCategoria] = useState({});
  const [marca, setMarca] = useState({});
  const [cor, setCor] = useState({});
  const [tamanho, setTamanho] = useState({});
  const [error, setError] = useState(null);
  const [quantidadeDesejada, setQuantidadeDesejada] = useState(0);

  const handleQuantidadeDesejadaChange = (text) => {
    const quantidadeDigitada = parseInt(text, 10);
    if (!isNaN(quantidadeDigitada)) {
      setQuantidadeDesejada(quantidadeDigitada);
      if (quantidadeDigitada > parseInt(produto.quantidade, 10)) {
        setError(
          "Selecione uma quantidade de itens dentro do estoque disponível"
        );
      } else {
        setError(null);
      }
    } else {
      setError("Por favor, insira um número válido.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduto = await produtosApi.buscarProdutoPorId(id);
        setProduto(fetchedProduto);

        const fetchedCategoria = await categoriasApi.buscarCategoriaPorId(
          fetchedProduto.categoria
        );
        setCategoria(fetchedCategoria);

        const fetchedMarca = await marcasApi.buscarMarcaPorId(
          fetchedProduto.marca
        );
        setMarca(fetchedMarca);

        const fetchedCor = await coresApi.buscarCorPorId(fetchedProduto.cor);
        setCor(fetchedCor);

        const fetchedTamanho = await tamanhosApi.buscarTamanhoPorId(
          fetchedProduto.tamanho
        );
        setTamanho(fetchedTamanho);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f1ebf7" }}>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          width: "90%",
          alignSelf: "center",
          marginTop: "6%",
          borderRadius: 3,
        }}
      >
        <Image
          source={{ uri: produto.capa ? produto.capa.url : null }}
          style={{
            width: 200,
            height: 200,
            marginTop: 10,
            alignSelf: "center",
            borderColor: "#ededed",
            borderWidth: 1,
            borderRadius: 3,
          }}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginHorizontal: 20,
            }}
          >
            {produto.nome}
          </Text>
          <View style={{ marginVertical: 15, marginLeft: 20 }}>
            <Text>Preço: R${produto.preco.replace(".", ",")}</Text>
            <Text>Quantidade em estoque: {produto.quantidade}</Text>
            <Text>Cor: {cor.nome_cor}</Text>
            <Text>Categoria: {categoria.descricao}</Text>
            <Text>Marca: {marca.nome_marca}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          width: "90%",
          alignSelf: "center",
          marginTop: "5%",
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          height: 150,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            placeholder="Quant. Desejada"
            style={{
              borderWidth: 1,
              borderColor: "#ededed",
              borderRadius: 3,
              height: 30,
              width: 125,
              textAlign: "center",
            }}
            onChangeText={handleQuantidadeDesejadaChange}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={tamanho.id}
            style={{
              height: 30,
              width: 125,
            }}
            onValueChange={(itemValue, itemIndex) => setTamanho(itemValue)}
          >
            <Picker.Item label={tamanho.especificacao} value={tamanho.id} />
          </Picker>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              if (!error) {
                // Se não houver erro, adicione ao carrinho
              }
            }}
            style={{
              backgroundColor: "#f1ebf7",
              width: 250,
              height: 50,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Adicionar ao Carrinho
            </Text>
          </TouchableOpacity>
        </View>
        {error && (
          <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>
            {error}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Desc;
