import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleInputChange = (field, value, isLogin = false) => {
    if (isLogin) {
      setLoginData(prev => ({ ...prev, [field]: value }));
    } else {
      setUserData(prev => ({ ...prev, [field]: value }));
    }
  };

  // Register function
  const handleRegister = async () => {
    if (!userData.email || !userData.password || !userData.username) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password
      }));
      Alert.alert('Success', 'Registration successful');
      setIsRegistering(false);
      setUserData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      Alert.alert('Error', 'Registration failed');
    }
  };

  // Login function
  const handleLogin = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.email === loginData.email && parsedUser.password === loginData.password) {
          setIsLoggedIn(true);
          setLoginData({ email: '', password: '' });
          Alert.alert('Success', 'Login successful');
        } else {
          Alert.alert('Error', 'Invalid credentials');
        }
      } else {
        Alert.alert('Error', 'No user found');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  // Logout function
  const handleLogout = async () => {
    setIsLoggedIn(false);
    setUserData({ username: '', email: '', password: '', confirmPassword: '' });
    Alert.alert('Success', 'Logged out successfully');
  };

  // Update profile function
  const handleUpdateProfile = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password
      }));
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Profile update failed');
    }
  };

  // Render Login Form
  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={loginData.email}
        onChangeText={(text) => handleInputChange('email', text, true)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={loginData.password}
        onChangeText={(text) => handleInputChange('password', text, true)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => setIsRegistering(true)}>
        <Text style={styles.switchText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Register Form
  const renderRegisterForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userData.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={userData.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => setIsRegistering(false)}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );

  // Render Profile View
  const renderProfileView = () => (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userData.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={userData.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        isRegistering ? renderRegisterForm() : renderLoginForm()
      ) : (
        renderProfileView()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  switchText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileScreen;