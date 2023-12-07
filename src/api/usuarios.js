import api from "../services/api";
export default class UsuariosApi {
  async buscarTodosOsUsuarios() {
    const { data } = await api.get("usuarios/");
    return data;
  }
  async buscarUsuarioPorId(id) {
    const { data } = await api.get(`usuarios/${id}/`);
    return data;
  }
  async adicionarUsuario(usuario) {
    const { data } = await api.post("usuarios/", usuario);
    return data;
  }
  async atualizarUsuario(id, dadosUsuario) {
    const { data } = await api.patch(`usuarios/${id}/`, dadosUsuario);
    return data;
  }
  async excluirUsuario(id) {
    const { data } = await api.delete(`usuarios/${id}/`);
    return data;
  }
}
