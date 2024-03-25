import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DashboardScreen from '../src/screens/DashboardScreen';

describe('DashboardScreen', () => {
  it('renders search input field', () => {
    const { getByPlaceholderText } = render(<DashboardScreen />);
    const searchInput = getByPlaceholderText('Enter search query');
    expect(searchInput).toBeTruthy();
  });

  it('updates search query state when typing', () => {
    const { getByPlaceholderText } = render(<DashboardScreen />);
    const searchInput = getByPlaceholderText('Enter search query');

    fireEvent.changeText(searchInput, 'chicken');
    expect(searchInput.props.value).toBe('chicken');
  });

  it('navigates to recipe details screen when clicking on a recipe', () => {
    const { getByText, navigation } = render(<DashboardScreen />);
    const recipeLink = getByText('Chicken Recipe');

    fireEvent.press(recipeLink);
    expect(navigation.navigate).toHaveBeenCalledWith('RecipeDetails', { recipe: 'chicken' });
  });
});
