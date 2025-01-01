import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient'); // Default role set to 'Patient'
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Name is required.';
    }

    if (!mobile) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!mobileRegex.test(mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateFields()) {
      // Registration logic (e.g., API call)
      console.log('Registered:', { name, mobile, email, password, role });
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an Account</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Name"
                style={[styles.input, errors.name && styles.errorInput]}
                placeholderTextColor="#666"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setErrors((prev) => ({ ...prev, name: '' }));
                }}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Mobile Number"
                style={[styles.input, errors.mobile && styles.errorInput]}
                placeholderTextColor="#666"
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text);
                  setErrors((prev) => ({ ...prev, mobile: '' }));
                }}
                keyboardType="phone-pad"
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email"
                style={[styles.input, errors.email && styles.errorInput]}
                placeholderTextColor="#666"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors((prev) => ({ ...prev, email: '' }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Password"
                style={[styles.input, errors.password && styles.errorInput]}
                placeholderTextColor="#666"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

          {/* Role Selector */}
          <View style={styles.roleSelectorContainer}>
            <Text style={styles.roleSelectorTitle}>Select Role</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[styles.roleButton, role === 'Doctor' && styles.selectedRole]}
                onPress={() => setRole('Doctor')}
              >
                <Text style={styles.roleButtonText}>Doctor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleButton, role === 'Patient' && styles.selectedRole]}
                onPress={() => setRole('Patient')}
              >
                <Text style={styles.roleButtonText}>Patient</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Login Here
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    marginBottom: 15,
  },
  input: {
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderWidth: 1,
    borderColor: '#ff4d4d',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  roleSelectorContainer: {
    marginBottom: 25,
  },
  roleSelectorTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    backgroundColor: '#c3c3c3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#005a99',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#0f9fd5',
    padding: 18,
    borderRadius: 12,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  loginLinkText: {
    color: '#005a99',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Register;
