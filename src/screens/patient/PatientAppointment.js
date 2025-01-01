import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setAppointments(data.slice(0, 10))); // Limit to 10 items
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
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

export default PatientAppointments;
