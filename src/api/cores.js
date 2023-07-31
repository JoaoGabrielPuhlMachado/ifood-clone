import axios from "axios";
export default class CoresApi {
  async buscarTodasAsCores() {
    const { data } = await axios.get("cores/");
    return data;
  }
  async buscarCorPorId(id) {
    const { data } = await axios.get(`cores/${id}/`);
    return data;
  }
  async adicionarCor(cor) {
    const { data } = await axios.post("cores/", cor);
    return data;
  }
  async atualizarCor(cor) {
    const { data } = await axios.put(`cores/${cor.id}/`, cor);
    return data;
  }
  async excluirCor(id) {
    const { data } = await axios.delete(`cores/${id}/`);
    return data;
  }
}
