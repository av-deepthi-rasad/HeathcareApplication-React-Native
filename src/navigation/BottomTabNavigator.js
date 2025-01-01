import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PatientDashboard from '../screens/patient/PatientDashboard';
import DoctorDashboard from '../screens/doctor/DoctorDashboard';
import Profile from '../screens/common/Profile';
import Chat from '../screens/common/Chat';
import Notifications from '../screens/common/Notifications';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {
  const { role } = route.params; // Passed during navigation: 'patient' or 'doctor'

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubbles';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {role === 'patient' ? (
        <Tab.Screen name="Dashboard" component={PatientDashboard} />
      ) : (
        <Tab.Screen name="Dashboard" component={DoctorDashboard} />
      )}
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
