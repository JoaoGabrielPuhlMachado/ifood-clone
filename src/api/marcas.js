import api from "../services/api";
export default class MarcasApi {
  async buscarTodasAsMarcas() {
    const { data } = await api.get("marcas/");
    return data;
  }
  async buscarMarcaPorId(id) {
    const { data } = await api.get(`marcas/${id}/`);
    return data;
  }
  async adicionarMarca(marca) {
    const { data } = await api.post("marcas/", marca);
    return data;
  }
  async atualizarMarca(marca) {
    const { data } = await api.put(`marcas/${marca.id}/`, marca);
    return data;
  }
  async excluirMarca(id) {
    const { data } = await api.delete(`marcas/${id}/`);
    return data;
  }
}
