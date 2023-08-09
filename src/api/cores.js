import api from "../services/api";
export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await api.get("cores/");
    return data;
  }
  async buscarCorPorId(id) {
    const { data } = await api.get(`cores/${id}/`);
    return data;
  }
  async adicionarCor(cor) {
    const { data } = await api.post("cores/", cor);
    return data;
  }
  async atualizarCor(cor) {
    const { data } = await api.put(`cores/${cor.id}/`, cor);
    return data;
  }
  async excluirCor(id) {
    const { data } = await api.delete(`cores/${id}/`);
    return data;
  }
}
