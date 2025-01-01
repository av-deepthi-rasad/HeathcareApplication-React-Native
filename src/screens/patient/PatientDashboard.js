import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40; // 20 padding on each side

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.95);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
  }, []);

  const renderAppointmentCard = ({ item, index }) => {
    const inputRange = [
      -1,
      0,
      CARD_WIDTH * index,
      CARD_WIDTH * (index + 2)
    ];

    const scale = fadeAnim.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8]
    });

    const opacity = fadeAnim.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    });

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity,
            transform: [{ scale }]
          }
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.appointmentStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Upcoming</Text>
          </View>
          <Text style={styles.appointmentDate}>Today, 2:30 PM</Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.doctorIndicator}>
              <MaterialIcons name="verified" size={16} color="#005a99" />
            </View>
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.body}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => alert('Reschedule Appointment')}
          >
            <MaterialIcons name="schedule" size={20} color="#005a99" />
            <Text style={styles.buttonText}>Reschedule</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => alert('Cancel Appointment')}
          >
            <MaterialIcons name="close" size={20} color="#e74c3c" />
            <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005a99" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={appointments.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAppointmentCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  header: {
    backgroundColor: '#005a99',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#d9e3eb',
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
  },
  appointmentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00b894',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#00b894',
    fontWeight: '600',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#e2e8f0',
  },
  doctorIndicator: {
    position: 'absolute',
    bottom: -5,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#edf2f7',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  rescheduleButton: {
    backgroundColor: '#ebf5ff',
  },
  cancelButton: {
    backgroundColor: '#fff5f5',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#005a99',
  },
  cancelText: {
    color: '#e74c3c',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f9fc',
  },
});

export default PatientDashboard;