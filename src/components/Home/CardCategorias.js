import { dadosState } from "../../recoil/atoms/dados.js";
import { useRecoilValue } from "recoil";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function CardCategorias() {
  const { categorias } = useRecoilValue(dadosState);
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorias</Text>
      <View style={styles.content}>
        {categorias.map((categoria) => (
          <View key={categoria.id} style={styles.card}>
            <Image
              style={styles.imagem}
              source={{ uri: categoria.capa_categoria?.file }}
            />
            <Text style={styles.texto}>{categoria.descricao}</Text>
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
  imagem: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "85%",
    borderRadius: 3,
  },
  card: {
    padding: 8,
    backgroundColor: "white",
    width: "23.5%",
    height: 100,
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
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
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
