const e = require("express");
const { model } = require("mongoose");

async function get(model, fieldsToPopulate) {
  try {
    const modelInstances = await model.find();
    const promises = !fieldsToPopulate.length ? [] : modelInstances.map(
      async (modelInst) => await modelInst.populate(fieldsToPopulate.join(" "))
    );
    await Promise.all(promises);
    return modelInstances;
  } catch (err) {
    throw err;
  }
}

async function getById(id, model, fieldsToPopulate) {
  try {
    const modelInstance = await model.findById(id);
    !fieldsToPopulate.length ? [] : await modelInstance.populate(fieldsToPopulate.join(" "));
    return modelInstance;
  } catch (err) {
    throw err;
  }
}

async function getBy(criteria, model, fieldsToPopulate) {
  try {
    const modelInstance = await model.findOne(criteria);
    !fieldsToPopulate.length ? [] : await modelInstance.populate(fieldsToPopulate.join(" "));
    return modelInstance;
  } catch (err) {
    throw err;
  }
}

async function getAllBy(criteria, model, fieldsToPopulate) {
  try {
    const modelInstances = await model.find(criteria);
    const promises = !fieldsToPopulate.length ? [] : modelInstances.map(
      async (modelInst) => await modelInst.populate(fieldsToPopulate.join(" "))
    );
    await Promise.all(promises);
    return modelInstances;
  } catch (err) {
    throw err;
  }
}



async function add(modelWithData, fieldsToPopulate) {
  try {
    const savedModel = await modelWithData.save();
    !fieldsToPopulate.length ? [] : await savedModel.populate(fieldsToPopulate.join(" "));
    return savedModel;
  } catch (err) {
    throw err;
  }
}

async function editById(id, overridingData, model, fieldsToPopulate) {
  try {
    const modelInstance = await model.findById(id);
    Object.entries(overridingData).forEach(([k, v]) => (modelInstance[k] = v));
    const savedModel = await modelInstance.save();
    !fieldsToPopulate.length ? [] : await savedModel.populate(fieldsToPopulate.join(" "));
    return savedModel;
  } catch (err) {
    throw err;
  }
}

async function deleteById(id, model, fieldsToPopulate) {
  try {
    const deletedModelInstance = await model.findByIdAndDelete(id);
    !fieldsToPopulate.length ? [] : await deletedModelInstance.populate(fieldsToPopulate.join(" "));
    return deletedModelInstance;
  } catch (err) {
    throw err;
  }
}

module.exports = { get, getById, getBy, getAllBy, add, editById, deleteById };
