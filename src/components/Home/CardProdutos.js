import { dadosState } from "../../recoil/atoms/dados.js";
import { useRecoilValue } from "recoil";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function CardProdutos() {
  const { produtos } = useRecoilValue(dadosState);

  if (!produtos || produtos.length === 0) {
    return <Text style={styles.loading}>Carregando produtos...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos</Text>
      <View style={styles.content}>
        {produtos.map((produto) => (
          <View key={produto.id} style={styles.card}>
            <Image style={styles.imagem} source={{ uri: produto.capa?.file }} />
            <Text style={styles.texto}>{produto.nome}</Text>
            <Text style={styles.preco}>
              R${produto.preco.replace(".", ",")}
            </Text>
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    fontSize: 25,
    textAlign: "center",
    marginTop: "29%",
    marginBottom: "29%",
  },
  imagem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "80%",
    borderRadius: 3,
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "47%",
    height: 240,
    borderRadius: 0,
    marginLeft: "1.5%",
    marginRight: "1.5%",
    marginTop: 12,
    borderRadius: 3,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 13,
    color: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
  preco: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1ebf7",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
