import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Categorias from "../../components/Home/Categorias";
import Produtos from "../../components/Home/Produtos";
import Marcas from "../../components/Home/Marcas";

export default function Home() {
  return (
    <ScrollView showsHorizontalScrollIndicator={true} style={styles.container}>
      <Categorias />
      <Marcas />
      <Produtos />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
