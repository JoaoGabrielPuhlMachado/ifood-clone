import axios from "axios";
export default class UsuariosApi {
  async buscarTodosOsUsuarios() {
    const { data } = await axios.get("usuarios/");
    return data;
  }
  async buscarUsuarioPorId(id) {
    const { data } = await axios.get(`usuarios/${id}/`);
    return data;
  }
  async adicionarUsuario(usuario) {
    const { data } = await axios.post("usuarios/", usuario);
    return data;
  }
  async atualizarUsuario(usuario) {
    const { data } = await axios.patch(`usuarios/${usuario.id}/`, usuario);
    return data;
  }
  async excluirUsuario(id) {
    const { data } = await axios.delete(`usuarios/${id}/`);
    return data;
  }
}
