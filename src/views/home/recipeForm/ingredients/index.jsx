import React from 'react';
import { array, func } from 'prop-types';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  FormHelperText,
  useMediaQuery,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { listOfUnits } from '../../../../constants';
import { DeleteOutlineOutlined as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  deleteIcon: {
    '&.MuiButtonBase-root.Mui-disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'fill',
    },
  },
}));

const Ingredients = (props) => {
  const { ingredients, handleIngredients, errorIngredients } = props;
  const classes = useStyles();

  const handleChange = (e, id) => {
    const ingredientsData = [...ingredients];
    const index = ingredientsData.findIndex(
      (ingredient) => ingredient.id === id
    );
    ingredientsData[index] = {
      ...ingredientsData[index],
      [e.target.name]: e.target.value,
    };
    handleIngredients(ingredientsData);
  };

  const handleDelete = (id) => {
    const ingredientsData = [...ingredients];
    const index = ingredientsData.findIndex(
      (ingredient) => ingredient.id === id
    );
    ingredientsData.splice(index, 1);
    const updatedData = ingredientsData.map((data, index) => {
      return {
        ...data,
        id: index + 1,
      };
    });
    handleIngredients(updatedData);
  };

  const isBelow600Screen = useMediaQuery('(max-width:600px)');
  const isBelow411Screen = useMediaQuery('(max-width:411px)');

  return (
    <Box
      border={1}
      borderColor="grey.200"
      borderRadius={10}
      marginTop={2}
      paddingBottom={1}
    >
      {ingredients &&
        ingredients.length > 0 &&
        ingredients.map((data, index) => {
          const { id, name, quantity, measurement } = data || {};
          const { errorName, errorQuantity, errorMeasurement } =
            (errorIngredients &&
              errorIngredients.length > 0 &&
              errorIngredients.find(
                (ingredientData) => ingredientData.id === id
              )) ||
            {};
          return (
            <Box key={index}>
              <Box display="flex" alignItems="center">
                <Box width={isBelow411Screen ? '77%' : '100%'}>
                  <Box key={id} component={Grid} container alignItems="center">
                    <Box
                      component={Grid}
                      item
                      xs={12}
                      sm={4}
                      paddingX={1}
                      paddingRight={1}
                    >
                      <TextField
                        label="Name"
                        placeholder="Ingredient name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={name}
                        name="name"
                        error={Boolean(errorName)}
                        helperText={errorName}
                        data-testid="name-input"
                        onChange={(e) => handleChange(e, id)}
                      />
                    </Box>
                    <Box component={Grid} item xs={12} sm={4} paddingX={1}>
                      <TextField
                        label="Quantity"
                        placeholder="Ingredient quantity"
                        fullWidth
                        type="number"
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={quantity}
                        name="quantity"
                        error={Boolean(errorQuantity)}
                        helperText={errorQuantity}
                        onChange={(e) => handleChange(e, id)}
                      />
                    </Box>
                    <Box
                      component={Grid}
                      item
                      xs={12}
                      sm={4}
                      paddingTop={1}
                      paddingLeft={1}
                      paddingRight={0.8}
                    >
                      <FormControl fullWidth>
                        <InputLabel
                          id="Measurement-name"
                          error={Boolean(errorMeasurement)}
                        >
                          Measurement
                        </InputLabel>
                        <Select
                          labelId="Measurement-name"
                          id="demo-simple-select"
                          value={measurement || 0}
                          name="measurement"
                          onChange={(e) => handleChange(e, id)}
                          error={Boolean(errorMeasurement)}
                        >
                          <MenuItem value={0} disabled>
                            Select Measurement
                          </MenuItem>
                          {listOfUnits.map((data, index) => {
                            const { name } = data;
                            return (
                              <MenuItem key={index} value={name}>
                                {name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {errorMeasurement && (
                          <FormHelperText error={Boolean(errorMeasurement)}>
                            {errorMeasurement}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box color="grey.500">
                  <IconButton
                    className={classes.deleteIcon}
                    disabled={ingredients.length === 1}
                    onClick={() => ingredients.length !== 1 && handleDelete(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              {isBelow600Screen &&
                ingredients.length > 1 &&
                index !== ingredients.length - 1 && (
                  <Box paddingTop={3} paddingBottom={1}>
                    <Divider />
                  </Box>
                )}
            </Box>
          );
        })}
    </Box>
  );
};

Ingredients.defaultProps = {
  ingredients: [],
  errorIngredients: [],
  handleIngredients: () => {},
};

Ingredients.propTypes = {
  ingredients: array,
  errorIngredients: array,
  handleIngredients: func,
};

export default Ingredients;
