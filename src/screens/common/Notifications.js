import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your order has been shipped!', time: '10:30 AM' },
    { id: 2, message: 'New friend request from John.', time: '11:15 AM' },
    { id: 3, message: 'Your password was updated successfully.', time: '12:00 PM' },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const renderNotification = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.notificationCard}>
        <Text style={styles.notificationText}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNotification}
        />
      ) : (
        <Text style={styles.noNotifications}>No notifications available</Text>
      )}
      <TouchableOpacity style={styles.clearButton} onPress={clearNotifications}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  noNotifications: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  clearButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '85%',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notifications;
