const {Diet} = require("../db");


const getDiets = async () => {
    const diets = await Diet.findAll()
    return diets;
}

const postDiet = async (name) => {
    const newDiet = await Diet.create(name);
    return newDiet;
}

module.exports = {
    getDiets,
    postDiet
}