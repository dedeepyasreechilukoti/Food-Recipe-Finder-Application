import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchRecipes } from '../api'; 

const RecipeSearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const searchRecipes = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes(query);
      setRecipes(data);
      setError('');
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToRecipeDetails = (recipe) => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  const renderRecipes = () => {
    return (
      <View>
        <FlatList
          data={recipes}
          renderItem={({ item }) => (
            <View style={styles.recipeContainer}>
              <Text style={styles.recipeTitle}>{item.label}</Text>
              <Button title="View Details" onPress={() => navigateToRecipeDetails(item)} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search recipes"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={searchRecipes} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : recipes.length > 0 ? (
        renderRecipes()
      ) : (
        <Text style={styles.message}>No recipes found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  recipeContainer: {
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  message: {
    marginTop: 10,
  },
});

export default RecipeSearchScreen;
