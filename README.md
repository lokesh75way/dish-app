# Dish App Task

## Prerequisite

1. Install node from https://nodejs.org/en/download/
2. Yarn package (Run below command if package is not installed)

```
npm install yarn
```

## Setup & Run : In the project directory, you can run:

```
yarn install
```

## To run a server in development mode

```
yarn start
```

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

## Testing and Development

Unit Testing is done with jest to load the interactive test suite

```
yarn test
```

## Build

To build the compiled assets to the `dist` folder with:

```
yarn build
```

## Assumptions to ambiguity or missed requirement(s)

- `Steps to cook` should be at dish/recipe level not ingredient level
- `Photo Url` should be at dish/recipe level not ingredient level
- Minimum `1` ingredient should be mandatory to save a recipe
- `Filter by ingredients` should display the list of all ingredients from all recipes and remove the duplicate ingredients from it.

## TODO

- Responsiveness for `Add More Ingredient` button and table in mobile view
