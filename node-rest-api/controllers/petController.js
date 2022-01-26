const petService = require("../services/petService");

/**
 * Get all pets:
 *
 * */
module.exports.getAll = async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    res.status(201).json(pets);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Get all pets under age 3:
 *
 * */
module.exports.getAllUnder3 = async (req, res) => {
  try {
    let pets = await petService.getAllPetsUnder3();
    res.status(201).json(pets);
  } catch (error) {
    res.status(404).json({ message: err.message });
  }
};
/**
 * Create new pet:
 *
 * */
module.exports.create = async (req, res) => {
  console.log("[Create-Pet]:");
  try {
    await petService.create(req.body);

    res.status(201).json({ message: "Pet created successfully." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Update pet:
 *
 * */
module.exports.update = async (req, res) => {
  console.log("[Update-Pet]:");
  const { id } = req.params;
  const pet = req.body;
  try {
    const result = await petService.updatePet(pet, id);
    res.status(201).json({ message: "Pet updated." });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.deletePet = async (req, res) => {
  console.log("[Delete-Pet]:");

  const { id } = req.params;
  try {
    const result = await petService.deletePet(id);
    res.status(201).json({ message: "Pet deleted." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getPetById = async (req, res) => {
  console.log("[Get-Pet]:");

  const { id } = req.params;
  try {
    const result = await petService.getPetById(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
