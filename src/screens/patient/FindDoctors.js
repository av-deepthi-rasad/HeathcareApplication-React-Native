import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Doctors</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f9f9f9', padding: 15, marginBottom: 10, borderRadius: 8 },
  cardTitle: { fontWeight: 'bold', marginBottom: 5 },
});

export default FindDoctors;
