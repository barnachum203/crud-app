const dal = require("../dal/dalPet");

/**
 * Get all pets:
 *
 * */
exports.getAllPets = async () => {
  try {
    const pets = await dal.getAllPets();
    console.log(`[PET-SERV] - send ${pets.length} pets`);
    return pets;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Get all pets under age 3:
 *
 * */
exports.getAllPetsUnder3 = async () => {
  try {
    let pets = await dal.getAllPets();
    pets = pets.filter((pet) => pet.age <= 3);

    console.log(`[PET-SERV] - send ${pets.length} pets under age 3`);
    return pets;
  } catch (error) {
    throw Error(error);
  }
};

/**
 * Create new pet:
 *
 * */
exports.create = async (pet) => {
  try {
    await dal.createPet(pet);

    console.log("[PET-SERV]: Pet created successfully.");

    return { pet };
  } catch (err) {
    throw Error(err);
  }
};

/**
 * Update pet:
 *
 * */
exports.updatePet = async (pet, id) => {
  const updatedPet = await dal.updatePetById(id, pet);
  if (!updatedPet) {
    console.log("[PET-SERV]: Pet is not updated");

    throw Error("Pet is not updated");
  }
  console.log("[PET-SERV]: Pet updated.");

  return updatedPet;
};

exports.deletePet = async (id) => {
  const result = await dal.deletePet(id);
  if (!result) {
    console.log("[PET-SERV]: Pet is not deleted.");
    throw Error("Pet is not deleted.");
  }
  console.log("[PET-SERV]: Pet deleted: " + id);

  return result;
};

exports.getPetById = async (id) => {
  const result = await dal.getPetById(id);
  if (!result) {
    throw Error("Pet is not exist");
  }
  console.log("[PET-SERV]: Sent pet: " + id);

  return result;
};
