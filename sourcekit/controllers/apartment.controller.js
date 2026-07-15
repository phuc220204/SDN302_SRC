const db = require('../models');

// CRUD REST API cho collection "cha" (Task 02).
// [ĐỔI THEO ĐỀ]: đổi db.Apartment/db.Resident + danh sách field.

// [GET] /api/apartments
const getAll = async (req, res, next) => {
  try {
    const apartments = await db.Apartment.find();
    res.status(200).json({ status: 'success', data: apartments });
  } catch (err) { next(err); }
};

// [GET] /api/apartments/:id
const getById = async (req, res, next) => {
  try {
    const apartment = await db.Apartment.findById(req.params.id);
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

// [POST] /api/apartments
const create = async (req, res, next) => {
  try {
    const { apartmentName, totalOfFloors } = req.body; // [ĐỔI THEO ĐỀ] fields
    const apartment = await db.Apartment.create({ apartmentName, totalOfFloors });
    res.status(201).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

// [PUT] /api/apartments/:id
const update = async (req, res, next) => {
  try {
    const { apartmentName, totalOfFloors } = req.body; // [ĐỔI THEO ĐỀ] fields
    const apartment = await db.Apartment.findByIdAndUpdate(
      req.params.id,
      { apartmentName, totalOfFloors },
      { new: true, runValidators: true } // runValidators: update cũng phải qua schema
    );
    if (!apartment) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', data: apartment });
  } catch (err) { next(err); }
};

// [DELETE] /api/apartments/:id — DELETE-GUARD (pattern lặp lại mọi đề):
// chặn xóa "cha" nếu còn "con" tham chiếu
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const used = await db.Resident.findOne({ apartment: id });
    if (used) {
      return res.status(400).json({
        message: 'Cannot delete apartment because it has associated residents', // [ĐỔI THEO ĐỀ] message
      });
    }
    const deleted = await db.Apartment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Apartment not found' });
    res.status(200).json({ status: 'success', message: 'Delete apartment successfully' });
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
