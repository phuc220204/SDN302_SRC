const db = require('../models');

const currentYear = new Date().getFullYear();
const toYOB = (age) => currentYear - Number(age);
const toAge = (yOB) => currentYear - yOB;

const renderList = async (res, error = null, status = 200) => {
  const residents = await db.Resident.find().populate('apartment', 'apartmentName');
  const apartments = await db.Apartment.find();
  res.status(status).render('residents', { residents, apartments, toAge, error });
};

const friendlyError = (err) => {
  if (err.code === 11000) return 'Resident name must be unique';
  if (err.name === 'ValidationError')
    return Object.values(err.errors).map((e) => e.message).join(', ');
  return err.message;
};

const list = async (req, res, next) => {
  try {
    await renderList(res);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { residentName, residentDescription, floor, age, apartment } = req.body;
    await db.Resident.create({
      residentName,
      residentDescription,
      floor,
      yOB: toYOB(age),
      isOwned: req.body.isOwned === 'on',
      apartment,
    });
    res.redirect('/view/residents');
  } catch (err) {
    try {
      await renderList(res, friendlyError(err), 400);
    } catch (e) {
      next(e);
    }
  }
};

const update = async (req, res, next) => {
  try {
    const { residentName, residentDescription, floor, age, apartment } = req.body;
    const updated = await db.Resident.findByIdAndUpdate(
      req.params.id,
      {
        residentName,
        residentDescription,
        floor,
        yOB: toYOB(age),
        isOwned: req.body.isOwned === 'on',
        apartment,
      },
      { new: true, runValidators: true }
    );
    if (!updated) return renderList(res, 'Resident not found', 404);
    res.redirect('/view/residents');
  } catch (err) {
    try {
      await renderList(res, friendlyError(err), 400);
    } catch (e) {
      next(e);
    }
  }
};

const remove = async (req, res, next) => {
  try {
    const deleted = await db.Resident.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Resident not found' });
    res.status(200).json({ message: 'Delete resident successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { list, create, update, remove };
