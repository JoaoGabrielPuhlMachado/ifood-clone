import { atom } from "recoil";

import MarcasApi from "../../api/marcas";
const marcasApi = new MarcasApi();
import ProdutosApi from "../../api/produtos";
const produtosApi = new ProdutosApi();
import CategoriasApi from "../../api/categorias";
const categoriasApi = new CategoriasApi();

export const atualizarState = atom({
  key: "atualizar",
  default: {
    isLoading: true,
    loggedIn: false,
    access_token: null,
    refresh_token: null,
    categorias: [],
    marcas: [],
    produtos: [],
  },
});
async function Atualizar() {
  const [atualizar, setAtualizar] = useRecoilState(atualizarState);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const categoriasData = await categoriasApi.buscarTodasAsCategorias();
  setCategorias(categoriasData);
  const marcasData = await marcasApi.buscarTodasAsMarcas();
  setMarcas(marcasData);
  const produtosData = await produtosApi.buscarTodosOsProdutos();
  setProdutos(produtosData);
}
