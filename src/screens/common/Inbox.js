import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const Inbox = ({ route, navigation }) => {
  const { chat } = route.params; 

  const [message, setMessage] = useState(''); 

  // Handle send button click
  const handleSend = () => {
    if (message.trim()) {
  
      console.log('Message Sent:', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

   
      <View style={styles.contentContainer}>
        <Image source={{ uri: chat.profilePic }} style={styles.profilePic} />
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.timestamp}>{chat.timestamp}</Text>
        <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
      </View>

    
      <View style={styles.messageContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage} 
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Use a blue background for the page
    paddingTop: 40, // Add some padding to make space for the back button at the top
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust the top margin to fit well with the content
    left: 20,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#007bff', // Use blue background for the button
    borderRadius: 25, // Make the button circular
    elevation: 5, // Add shadow effect to give it elevation
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Add some spacing between the back button and content
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular shape for profile picture
    marginBottom: 20,
    borderWidth: 3, // Add border to highlight the profile picture
    borderColor: '#fff', // White border to make the profile picture stand out
  },
  chatName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 15,
  },
  lastMessage: {
    fontSize: 20,
    color: '#1a261s',
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff', // Blue color for send button
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Inbox;
