import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,ImageBackground } from 'react-native';
const backgroundImage = require('../../assets/loginpage.png');
const LoginScreen = ({ navigation, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (email === '' || password === '') {
      setError('Please enter email and password');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setUser({ email }); 
    navigation.navigate('Dashboard');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Food Recipe Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Text style={styles.error}>{error}</Text>
      <Button title="Login" onPress={handleLogin} />
      <Button 
        title="Don't have an account? Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap:10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
  },
  error: {
    color: 'red',
    marginBottom: 10,
  }
});

export default LoginScreen;
