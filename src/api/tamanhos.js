import api from "../services/api";
export default class TamanhosApi {
  async buscarTodosOsTamanhos() {
    const { data } = await api.get("tamanhos/");
    return data;
  }
  async buscarTamanhoPorId(id) {
    const { data } = await api.get(`tamanhos/${id}/`);
    return data;
  }
  async adicionarTamanho(tamanho) {
    const { data } = await api.post("tamanhos/", tamanho);
    return data;
  }
  async atualizarTamanho(tamanho) {
    const { data } = await api.put(`tamanhos/${tamanho.id}/`, tamanho);
    return data;
  }
  async excluirTamanho(id) {
    const { data } = await api.delete(`tamanhos/${id}/`);
    return data;
  }
}
