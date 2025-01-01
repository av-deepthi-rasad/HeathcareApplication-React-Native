import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      status: 'Active',
      nextAppointment: 'Today, 2:30 PM',
      condition: 'Regular Checkup'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      status: 'New Patient',
      nextAppointment: 'Tomorrow, 10:00 AM',
      condition: 'Consultation'
    },
    {
      id: 3,
      name: 'Mark Johnson',
      email: 'mark.johnson@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      status: 'Follow-up',
      nextAppointment: 'Dec 30, 3:15 PM',
      condition: 'Post-Surgery'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'Urgent',
      nextAppointment: 'Today, 4:45 PM',
      condition: 'Emergency'
    },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#2ecc71';
      case 'New Patient': return '#3498db';
      case 'Follow-up': return '#f39c12';
      case 'Urgent': return '#e74c3c';
      default: return '#9b59b6';
    }
  };

  const renderPatientCard = ({ item, index }) => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }
      ]}>
        <View style={styles.cardHeader}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
          </View>
          <Text style={styles.appointmentTime}>
            <MaterialIcons name="access-time" size={14} color="#64748b" /> {item.nextAppointment}
          </Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            {item.status === 'Urgent' && (
              <View style={styles.urgentIndicator}>
                <MaterialIcons name="priority-high" size={14} color="#fff" />
              </View>
            )}
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardEmail}>{item.email}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity style={[styles.actionButton, styles.viewButton]} onPress={() => alert(`View ${item.name}'s Details`)}>
            <MaterialIcons name="visibility" size={20} color="#005a99" />
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.messageButton]} onPress={() => alert(`Message ${item.name}`)}>
            <MaterialIcons name="message" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPatientCard}
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
    backgroundColor: '#2980b9',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 25,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  appointmentTime: {
    fontSize: 14,
    color: '#95a5a6',
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#d1d8e0',
  },
  urgentIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  patientInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
  },
  cardEmail: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  condition: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  viewButton: {
    backgroundColor: '#ecf0f1',
  },
  messageButton: {
    backgroundColor: '#16a085',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
  },
});

export default DoctorDashboard;
