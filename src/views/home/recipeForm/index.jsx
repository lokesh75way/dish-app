import React, { useState, useRef, useEffect } from 'react';
import { func } from 'prop-types';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Divider,
  InputLabel,
  TextField,
  Button,
} from '@material-ui/core';
import { CloseOutlined as CloseIcon } from '@material-ui/icons';
import Ingredients from './ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from '../../../redux/recipe/actions';
import { saveRecipes, validateImageUrl } from '../../../utils/helper.js';

const useStateCallback = (initialState) => {
  const [isSubmit, setIsSubmit] = useState(initialState);
  const cbRef = useRef(null);

  const setIsSubmitCallback = (isSubmit, cb) => {
    cbRef.current = cb;
    setIsSubmit(isSubmit);
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(isSubmit);
      cbRef.current = null;
    }
  }, [isSubmit]);

  return [isSubmit, setIsSubmitCallback];
};

const RecipeForm = (props) => {
  const { setOpenDialog } = props;
  const state = {
    name: '',
    ingredients: [{ id: 1, name: '', quantity: '', measurement: '' }],
    stepsToCook: '',
    image: '',
    isValidate: false,
  };
  const [formData, setFormData] = useState(state);
  const [isSubmit, setIsSubmit] = useStateCallback(false);
  const dispatch = useDispatch();
  const recipes = useSelector(({ recipe }) => recipe.recipes);

  const addMoreIngredients = () => {
    const updatedIngredients = [
      ...formData.ingredients,
      {
        id: formData.ingredients.length + 1,
        name: '',
        quantity: '',
        measurement: '',
      },
    ];

    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleIngredients = (ingredients) => {
    setFormData({ ...formData, ingredients });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveRecipe = () => {
    setIsSubmit({ isSubmit: true }, (stateData) => {
      if (stateData.isSubmit) {
        const { isValidate } = formData;
        if (!isValidate) return;
        dispatch(setRecipes([...recipes, formData]));
        setOpenDialog(false);
        saveRecipes([...recipes, formData]);
      }
    });
  };

  const checkValidations = () => {
    let errorStructure = {
      errorName: '',
      errorImage: '',
      errorStepsToCook: '',
      errorIngredients: [],
    };
    if (!isSubmit) return errorStructure;
    if (!formData.name) {
      errorStructure.errorName = 'Required';
    }
    if (!formData.image) {
      errorStructure.errorImage = 'Required';
    } else if (!validateImageUrl(formData.image)) {
      errorStructure.errorImage = 'Please enter valid image url';
    }
    if (!formData.stepsToCook) {
      errorStructure.errorStepsToCook = 'Required';
    }
    formData.ingredients.forEach((ingredientData) => {
      const errorIngredientsStructure = {
        id: '',
        errorName: '',
        errorQuantity: '',
        errorMeasurement: '',
      };
      errorIngredientsStructure.id = ingredientData.id;
      if (!ingredientData.name) {
        errorIngredientsStructure.errorName = 'Required';
      }
      if (!ingredientData.quantity) {
        errorIngredientsStructure.errorQuantity = 'Required';
      } else if (ingredientData.quantity <= 0) {
        errorIngredientsStructure.errorQuantity = 'Should be greater than 0';
      }
      if (!ingredientData.measurement) {
        errorIngredientsStructure.errorMeasurement = 'Required';
      }
      if (
        errorIngredientsStructure.errorName ||
        errorIngredientsStructure.errorQuantity ||
        errorIngredientsStructure.errorMeasurement
      ) {
        errorStructure.errorIngredients.push(errorIngredientsStructure);
      } else {
        const index = errorStructure.errorIngredients.find(
          (data) => data.id === ingredientData.id
        );
        if (index !== -1) {
          errorStructure.errorIngredients.splice(index, 1);
        }
      }
    });
    if (
      !errorStructure.errorName &&
      !errorStructure.errorImage &&
      !errorStructure.errorStepsToCook &&
      errorStructure.errorIngredients.length === 0
    ) {
      formData.isValidate = true;
    } else {
      formData.isValidate = false;
    }
    return errorStructure;
  };

  const {
    errorName,
    errorStepsToCook,
    errorImage,
    errorIngredients,
  } = checkValidations();

  return (
    <Box padding={2}>
      <Box
        component={Grid}
        container
        justify="space-between"
        alignItems="center"
        paddingBottom={1}
      >
        <Box variant="h5" component={Typography}>
          Add Recipe
        </Box>
        <Box>
          <IconButton onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <TextField
        label="Name"
        placeholder="Name of dish"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        name="name"
        onChange={handleChange}
        error={Boolean(errorName)}
        helperText={errorName}
      />
      <Box paddingTop={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <InputLabel id="list-of-ingredients">
              List of ingredients
            </InputLabel>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={addMoreIngredients}
            >
              Add more ingredients
            </Button>
          </Box>
        </Box>

        <Ingredients
          ingredients={formData.ingredients}
          handleIngredients={handleIngredients}
          errorIngredients={errorIngredients}
        />
      </Box>

      <TextField
        label="Steps to cook"
        placeholder="WriteSteps to cook"
        fullWidth
        multiline
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        rows={4}
        variant="outlined"
        name="stepsToCook"
        onChange={handleChange}
        error={Boolean(errorStepsToCook)}
        helperText={errorStepsToCook}
      />
      <TextField
        label="Picture of dish"
        placeholder="https://www.image.com/dish-image"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        name="image"
        onChange={handleChange}
        error={Boolean(errorImage)}
        helperText={errorImage}
      />
      <Box paddingY={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={Boolean(!formData.isValidate && isSubmit)}
          onClick={saveRecipe}
        >
          Save Recipe
        </Button>
      </Box>
    </Box>
  );
};

RecipeForm.defaultProps = {
  setOpenDialog: () => {},
};

RecipeForm.propTypes = {
  setOpenDialog: func,
};

export default RecipeForm;
