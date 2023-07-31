import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Input from '../../components/Input';
import Categorias from '../../components/Home/Categorias';
import Produtos from '../../components/Home/Produtos';

export default function Home() {
  return (
    <ScrollView showsHorizontalScrollIndicator={true} style={styles.container}>
      <Input placeholder="Busque por produto ou categoria" />
      <Categorias />
      <Produtos />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});