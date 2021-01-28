import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Grid,
  Typography,
  Dialog,
} from '@material-ui/core';
import Recipes from './recipes';
import RecipeForm from './recipeForm';
import { useDispatch } from 'react-redux';
import { getRecipes } from '../../utils/helper';
import { setRecipes } from '../../redux/recipe/actions';
import RecipeFilters from './recipeFilters';

const Home = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const recipes = getRecipes();
    dispatch(setRecipes(recipes));
  }, [dispatch]);

  return (
    <>
      <Box>
        <Container maxWidth="md">
          <Box
            component={Grid}
            container
            justify="space-between"
            alignItems="center"
            paddingY={2}
          >
            <Box variant="h5" component={Typography}>
              Recipes
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
                data-testid="add-recipe"
              >
                Add Recipe
              </Button>
            </Box>
          </Box>
          <RecipeFilters
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />
          <Recipes selectedIngredients={selectedIngredients} />
        </Container>
      </Box>
      <Dialog fullWidth={true} maxWidth="sm" open={openDialog}>
        <Box data-testid="recipe-form">
          <RecipeForm setOpenDialog={setOpenDialog} />
        </Box>
      </Dialog>
    </>
  );
};

export default Home;
