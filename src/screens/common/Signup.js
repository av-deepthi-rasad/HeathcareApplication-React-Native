import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default Signup;
