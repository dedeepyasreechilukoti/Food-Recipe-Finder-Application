import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.recipeLabel}>{recipe.label}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {recipe.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Image
              source={{ uri: ingredient.image }}
              style={styles.ingredientImage}
              resizeMode="cover"
            />
            <Text>{ingredient.text}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Nutrients:</Text>
      <View style={styles.nutrientsContainer}>
        {Object.keys(recipe.totalNutrients).map((nutrientKey) => (
          <View key={nutrientKey} style={styles.nutrientItem}>
            <Text style={styles.nutrientLabel}>{recipe.totalNutrients[nutrientKey].label}:</Text>
            <Text style={styles.nutrientValue}>{recipe.totalNutrients[nutrientKey].quantity} {recipe.totalNutrients[nutrientKey].unit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  recipeLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nutrientsContainer: {
    marginTop: 10,
  },
  nutrientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nutrientLabel: {
    fontWeight: 'bold',
  },
  nutrientValue: {
    marginLeft: 10,
  },
});

export default RecipeDetailsScreen;
