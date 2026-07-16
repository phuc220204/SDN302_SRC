const db = require('../models');

const getAll = async (req, res, next) => {
  try {
    const apartments = await db.Apartment.find();
    res.status(200).json({ status: 'success', data: apartments });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const apartment = await db.Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const apartment = await db.Apartment.create({ ...req.body });
    res.status(201).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const apartment = await db.Apartment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const used = await db.Resident.findOne({ apartment: id });
    if (used) {
      return res.status(400).json({
        message: 'Cannot delete apartment because it has associated residents',
      });
    }
    const deleted = await db.Apartment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', message: 'Delete apartment successfully' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
