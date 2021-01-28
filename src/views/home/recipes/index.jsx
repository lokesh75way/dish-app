import React from 'react';
import { array } from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { getFilteredRecipes } from '../../../utils/helper';
import NoImage from '../../../images/no-img.jpg';

const Recipes = (props) => {
  const { selectedIngredients } = props;
  const recipes = useSelector(({ recipe }) => recipe.recipes);
  const filteredRecipes = getFilteredRecipes(recipes, selectedIngredients);
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell width="12%">Serial no.</TableCell>
              <TableCell width="20%">Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell width="20%">Total Ingredients</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecipes.length === 0 && (
              <TableRow>
                <TableCell component="th" scope="row" colSpan={4}>
                  <Box textAlign="center">No recipe found</Box>
                </TableCell>
              </TableRow>
            )}
            {filteredRecipes.length > 0 &&
              filteredRecipes.map((recipe, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      src={recipe.image || NoImage}
                      alt={`no-img-found-${index}`}
                      width="100px"
                    />
                  </TableCell>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>
                    {(recipe?.ingredients && recipe.ingredients.length) || 0}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Recipes.defaultProps = {
  selectedIngredients: [],
};

Recipes.propTypes = {
  selectedIngredients: array,
};

export default Recipes;
