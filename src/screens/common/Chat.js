import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const Chat = ({ navigation }) => {
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: '10:30 AM',
      unreadMessages: 2,
      profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'Can you send me the report?',
      timestamp: 'Yesterday',
      unreadMessages: 0,
      profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'Looking forward to the meeting.',
      timestamp: '2 days ago',
      unreadMessages: 0,
      profilePic: 'https://randomuser.me/api/portraits/men/8.jpg',
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteChat = (id) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== id));
  };

  const renderChatItem = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteChat(item.id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('Inbox', { chat: item })}
      >
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <View style={styles.timestampContainer}>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
          {item.unreadMessages > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadMessages}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* New Chat Button */}
      <TouchableOpacity style={styles.newChatButton}>
        <Text style={styles.newChatIcon}>💬</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Ivory background
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: '#008080', // Teal for the search icon
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  chatList: {
    paddingBottom: 80,
  },
  chatItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Soft gray for borders
    alignItems: 'center',
    backgroundColor: '#fff', // White for chat card
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  profilePic: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#008080', // Teal for profile border
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Dark gray for chat names
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666', // Muted gray for last messages
    marginTop: 4,
    marginRight: 10,
  },
  timestampContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa', // Light gray for timestamps
  },
  unreadBadge: {
    backgroundColor: '#ff6347', // Coral for unread badge
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newChatButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#008080', // Teal for new chat button
    borderRadius: 50,
    padding: 20,
    elevation: 5,
  },
  newChatIcon: {
    color: '#fff',
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: '#ff6347', // Coral for delete button
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '80%',
    borderRadius: 10,
    marginTop: 12,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Chat;
