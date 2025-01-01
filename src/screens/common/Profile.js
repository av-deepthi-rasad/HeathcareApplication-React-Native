import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
  // State variables for profile information and edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('john.doe@example.com');
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [phoneNumber, setPhoneNumber] = useState('+1 234 567 890');
  const [location, setLocation] = useState('New York, USA');

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle name change
  const handleNameChange = (text) => {
    setProfileName(text);
  };

  // Handle email change (if needed in the future)
  const handleEmailChange = (text) => {
    setProfileEmail(text);
  };

  // Handle image change (use a hardcoded image URL for simplicity)
  const handleImageChange = () => {
    setProfileImage('https://randomuser.me/api/portraits/men/2.jpg'); // Example: changing the image
  };

  // Handle phone number change
  const handlePhoneChange = (text) => {
    setPhoneNumber(text);
  };

  // Handle location change
  const handleLocationChange = (text) => {
    setLocation(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: profileImage }} // Profile image
          style={styles.profileImage}
        />
        {isEditing ? (
          <TouchableOpacity onPress={handleImageChange}>
            <MaterialIcons name="edit" size={24} color="#00b894" />
          </TouchableOpacity>
        ) : null}
        <Text style={styles.profileName}>
          {profileName}
        </Text>
        <Text style={styles.profileEmail}>
          {profileEmail}
        </Text>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={profileName}
                onChangeText={handleNameChange}
              />
            ) : (
              <Text style={styles.info}>{profileName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
              />
            ) : (
              <Text style={styles.info}>{phoneNumber}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Location</Text>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                value={location}
                onChangeText={handleLocationChange}
              />
            ) : (
              <Text style={styles.info}>{location}</Text>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="notifications" size={24} color="#00b894" />
            <Text style={styles.info}>Notifications</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="privacy-tip" size={24} color="#e17055" />
            <Text style={styles.info}>Privacy Settings</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ffffff', // White background
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    ...Platform.select({
      ios: {
        elevation: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4682b4', // Steel blue border
    marginBottom: 15,
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a365d', // Dark blue text
  },
  profileEmail: {
    fontSize: 16,
    color: '#5f9ea0', // Cadet blue
    marginTop: 5,
  },
  editInput: {
    fontSize: 18,
    color: '#1a365d', // Dark blue text
    borderBottomWidth: 1,
    borderColor: '#4682b4', // Steel blue underline
    paddingVertical: 5,
    width: 200,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#4682b4', // Steel blue button
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: '#ffffff', // White text
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff', // White card background
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    ...Platform.select({
      ios: {
        elevation: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d', // Dark blue text
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#5f9ea0', // Cadet blue labels
    fontWeight: '500',
  },
  info: {
    fontSize: 16,
    color: '#1a365d', // Dark blue text
    fontWeight: '600',
  },
});


export default Profile;
