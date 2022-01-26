const mongoose = require("mongoose");
const { Pet } = require("../model/Pet");

/**
 * Get all pets
 */
module.exports.getAllPets = async (type) => {
  const pets = await Pet.find();
  return pets;
};

/**
 * Creates new pet
 */
module.exports.createPet = async (petToCreate) => {
  const newPet = await Pet.create(petToCreate);
  return newPet;
};

/**
 * Update pet
 */
module.exports.updatePetById = async (id, pet) => {
  const result = await Pet.findByIdAndUpdate(mongoose.Types.ObjectId(id), pet);
  return result;
};

/**
 * Delete pet
 */
module.exports.deletePet = async (petId) => {
  const result = await Pet.findOneAndDelete(petId);

  return result;
};
