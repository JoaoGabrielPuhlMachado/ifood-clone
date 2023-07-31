import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import ProdutosApi from  '../../api/produtos.js';
import CategoriasApi from '../../api/categorias.js';
import MarcasApi from '../../api/marcas.js';
import TamanhosApi from '../../api/tamanhos.js';
import CoresApi from '../../api/cores.js';
const produtosApi = new ProdutosApi();
const categoriasApi = new CategoriasApi();
const marcasApi = new MarcasApi();
const tamanhosApi = new TamanhosApi();
const coresApi = new CoresApi();
const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    quantidade: "",
    cor: {},
    marca: {},
    categoria: {},
    tamanho: {},
  });
  const [marcas, setMarcas] = useState([]);
  const [cores, setCores] = useState([]);
  const [tamanhos, setTamanhos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const produtosData = await produtosApi.buscarTodosOsProdutos();
      setProdutos(produtosData);

      const marcasData = await marcasApi.buscarTodasAsMarcas();
      setMarcas(marcasData);

      const coresData = await coresApi.buscarTodasAsCores();
      setCores(coresData);

      const tamanhosData = await tamanhosApi.buscarTodosOsTamanhos();
      setTamanhos(tamanhosData);

      const categoriasData = await categoriasApi.buscarTodasAsCategorias();
      setCategorias(categoriasData);
    }

    fetchData();
  }, []);

  async function salvar() {
    produto.cor = produto.cor.id;
    produto.marca = produto.marca.id;
    produto.categoria = produto.categoria.id;
    produto.tamanho = produto.tamanho.id;
    if (produto.id) {
      await produtosApi.atualizarProduto(produto);
    } else {
      await produtosApi.adicionarProduto(produto);
    }
    setProduto({
      cor: "",
      marca: "",
      categoria: "",
      tamanho: "",
    });

    const produtosData = await produtosApi.buscarTodosOsProdutos();
    setProdutos(produtosData);
  }

  function editar(editproduto) {
    setProduto({ ...editproduto });
  }

  async function excluir(produto) {
    await produtosApi.excluirProduto(produto.id);
    const produtosData = await produtosApi.buscarTodosOsProdutos();
    setProdutos(produtosData);
  }

  function abrir(id) {
    // Implementar a navegação para a tela de detalhes do produto
    // Por exemplo, usando React Navigation
    // navigation.navigate('DetalhesProduto', { productId: id });
  }

  return (
    <View>
      {/* Renderizar os campos do formulário aqui */}
      <Text>Descrição:</Text>
      <TextInput
        value={produto.nome}
        onChangeText={(text) => setProduto({ ...produto, nome: text })}
      />

      {/* Mais campos do formulário aqui... */}

      <Button title="Salvar" onPress={salvar} />

      {/* Renderizar a lista de produtos aqui */}
      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <View>
            {/* Renderizar informações do produto aqui */}
            <Text>ID: ({item.id})</Text>
            <Text>Cor: {item.cor.nome_cor}</Text>
            <Text>Categoria: {item.categoria.descricao}</Text>
            <Text>Marca: {item.marca.nome_marca}</Text>
            <Text>Tamanho: {item.tamanho.especificacao}</Text>
            <Text>Estoque: {item.quantidade}</Text>
            <Text>Preço: {item.preco}</Text>

            {/* Renderizar botões de ação aqui */}
            <Button title="Editar" onPress={() => editar(item)} />
            <Button title="Excluir" onPress={() => excluir(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Produtos;
