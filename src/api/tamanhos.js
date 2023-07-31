import axios from "axios";
export default class TamanhosApi {
  async buscarTodosOsTamanhos() {
    const { data } = await axios.get("tamanhos/");
    return data;
  }
  async buscarTamanhoPorId(id) {
    const { data } = await axios.get(`tamanhos/${id}/`);
    return data;
  }
  async adicionarTamanho(tamanho) {
    const { data } = await axios.post("tamanhos/", tamanho);
    return data;
  }
  async atualizarTamanho(tamanho) {
    const { data } = await axios.put(`tamanhos/${tamanho.id}/`, tamanho);
    return data;
  }
  async excluirTamanho(id) {
    const { data } = await axios.delete(`tamanhos/${id}/`);
    return data;
  }
}
