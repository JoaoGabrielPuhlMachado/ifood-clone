import api from "../services/api";
export default class ProdutosApi {
  async buscarTodosOsProdutos() {
    const { data } = await api.get("produtos/");
    return data;
  }
  async buscarProdutoPorId(id) {
    const { data } = await api.get(`produtos/${id}/`);
    return data;
  }
  async adicionarProduto(produto) {
    const { data } = await api.post("produtos/", produto);
    return data;
  }
  async atualizarProduto(produto) {
    const { data } = await api.patch(`produtos/${produto.id}/`, produto);
    return data;
  }
  async excluirProduto(id) {
    const { data } = await api.delete(`produtos/${id}/`);
    return data;
  }
}
