import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';

const Welcome = ({ navigation }) => {
  const handleGetStarted = () => {
    if (navigation) navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/healthcare.gif')} // Replace with your image
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to WellnessWay</Text>
      <Text style={styles.subtitle}>
        Your one-stop solution for managing appointments, health records, and more.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.5,
    height: height * 0.5,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86C1', // Blue accent color
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2E86C1', // Blue button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
