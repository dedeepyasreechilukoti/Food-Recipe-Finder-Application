import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Image, RefreshControl,ImageBackground } from 'react-native';
import { fetchRecipes } from '../api'; 
const backgroundImage = require('../../assets/dash.jpeg'); 


const DashboardScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false); 

  const handleSearch = async () => {
    try {
      const recipes = await fetchRecipes(searchQuery);
      setSearchResults(recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const navigateToRecipeDetails = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  const onRefresh = async () => {
    setRefreshing(true); 
    await handleSearch(); 
    setRefreshing(false);
  };

  const handleLogout = () => {  
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search for recipies</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="search for recipies"
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToRecipeDetails(item.recipe)}>
            <View style={styles.recipeItem}>
              <Image source={{ uri: item.recipe.image }} style={styles.recipeImage} />
              <Text style={styles.recipeLabel}>{item.recipe.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
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
    padding: 20,
    
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff', 
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  recipeLabel: {
    fontSize: 16,
  },
});

export default DashboardScreen;
