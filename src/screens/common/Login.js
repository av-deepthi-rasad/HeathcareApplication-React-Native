import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

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

  const handleLogin = () => {
    if (validateFields()) {
      navigation.navigate('Main', { role });
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
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email"
                style={[
                  styles.input,
                  errors.email && styles.errorInput,
                ]}
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
                style={[
                  styles.input,
                  errors.password && styles.errorInput,
                ]}
                placeholderTextColor="#666"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors((prev) => ({ ...prev, password: '' }));
                }}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
          </View>

          <View style={styles.roleButtonsContainer}>
            <TouchableOpacity
              onPress={() => setRole('patient')}
              style={[
                styles.roleButton,
                role === 'patient' && styles.activeRoleButton,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'patient' && styles.activeRoleButtonText,
                ]}
              >
                Login as Patient
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRole('doctor')}
              style={[
                styles.roleButton,
                role === 'doctor' && styles.activeRoleButton,
              ]}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'doctor' && styles.activeRoleButtonText,
                ]}
              >
                Login as Doctor
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerLinkText}>
              Don't have an account? Register Here
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
  subtitle: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
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
  roleButtonsContainer: {
    marginBottom: 25,
  },
  roleButton: {
    backgroundColor: '#c3c3c3',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
  },
  activeRoleButton: {
    backgroundColor: '#005a99',
  },
  roleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  activeRoleButtonText: {
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#0f9fd5',
    padding: 18,
    borderRadius: 12,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#005a99',
    fontSize: 14,
  },
  registerLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerLinkText: {
    color: '#005a99',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default Login;
