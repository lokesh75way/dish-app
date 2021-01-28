import React from 'react';
import { array, func } from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
} from '@material-ui/core';
import { FilterList as FilterListIcon } from '@material-ui/icons';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

const RecipeFilters = (props) => {
  const { selectedIngredients, setSelectedIngredients } = props;
  const recipes = useSelector(({ recipe }) => recipe.recipes);

  const handleIngredient = (e) => {
    setSelectedIngredients(e.target.value);
  };

  const getIngredientsName = () => {
    const ingredientsData = [];
    recipes.forEach(({ ingredients }) =>
      ingredients.forEach(({ name }) => {
        !ingredientsData.includes(name) && ingredientsData.push(name);
      })
    );
    return ingredientsData;
  };

  const ingredientsName = getIngredientsName();

  if (recipes.length === 0) return null;
  return (
    <Box paddingBottom={2}>
      <Box paddingTop={2}>
        <FormControl fullWidth>
          <InputLabel id="list-of-ingredients">
            <Box display="flex" alignItems="flex-start">
              <Box marginTop={-0.5} marginRight={0.5}>
                <FilterListIcon />
              </Box>
              Filter by ingredients
            </Box>
          </InputLabel>
          <Select
            labelId="list-of-ingredients"
            id="demo-mutiple-checkbox"
            multiple
            value={selectedIngredients}
            onChange={handleIngredient}
            data-testid="ingredient-dropdown"
            MenuProps={MenuProps}
            renderValue={(selected) => {
              return (
                <Box display="flex" flexWrap="wrap">
                  {selected.map((value, index) => (
                    <Box
                      component={Chip}
                      key={index}
                      label={value}
                      marginRight={1}
                      marginLeft={index === 0 ? 1 : 0}
                      marginY={0.6}
                    />
                  ))}
                </Box>
              );
            }}
          >
            <MenuItem disabled value="">
              <ListItemText primary="Select Ingredients" />
            </MenuItem>
            {ingredientsName.map((name, index) => {
              return (
                <MenuItem key={index} value={name}>
                  <Checkbox
                    checked={selectedIngredients.includes(name)}
                    color="primary"
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

RecipeFilters.defaultProps = {
  selectedIngredients: [],
  setSelectedIngredients: () => {},
};

RecipeFilters.propTypes = {
  selectedIngredients: array,
  setSelectedIngredients: func,
};

export default RecipeFilters;
