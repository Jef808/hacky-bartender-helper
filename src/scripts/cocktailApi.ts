import getInfo from './requestHandler'

const drinksByName = 'search.php?s';
const drinksByFirstLetter = 'search.php?f'
const drinkById = 'lookup.php?i';
const ingredientsByName = 'search.php?i';
const ingredientById = 'lookup.php?iid'
const drinkRandom = 'random.php'
const drinksByIngredient = 'filter.php?i'
const drinksByCategory = 'filter.php?c'
const categoriesList = 'list.php?c=list'
const ingredientsList = 'list.php?g=list'

export default {
    getDrinksByName: getInfo(drinksByName),
    getDrinksByFirstLetter: getInfo(drinksByFirstLetter),
    getDrinkById: getInfo(drinkById),
    getIngredientsByName: getInfo(ingredientsByName),
    getIngredientById: getInfo(ingredientById),
    getRandomDrink: getInfo(drinkRandom),
    getDrinksByIngredient: getInfo(drinksByIngredient),
    getDrinksByCategory: getInfo(drinksByCategory),
    getCategories: getInfo(categoriesList),
    getIngredients: getInfo(ingredientsList),
}
