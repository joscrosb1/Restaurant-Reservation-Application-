const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");

// Validation functions

async function validateTableExists(req, res, next) {
  const table = await service.read(req.params.table_id);

  if (table) {
    res.locals.table = table;
    return next();
  }

  next({
    status: 404,
    message: `Table with ID ${req.params.table_id} not found`,
  });
}

async function validateReservationExists(req, res, next) {
  const { reservation_id } = req.body.data;
  const reservation = await reservationsService.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  next({
    status: 404,
    message: `Reservation with ID ${reservation_id} not found`,
  });
}

function validateHasDataProperty(req, res, next) {
  if (req.body.data) {
    return next();
  }

  next({ status: 400, message: "Request body must include 'data' property" });
}

function validateHasReservationId(req, res, next) {
  const { data } = req.body;

  if (!data.reservation_id) {
    return next({
      status: 400,
      message: "Request body must include 'reservation_id' property",
    });
  }

  next();
}

const requiredProperties = ["table_name", "capacity"];
const validateRequiredProperties = hasProperties(requiredProperties);

function validateTableName(req, res, next) {
  const tableName = req.body.data.table_name;

  if (tableName.length < 2) {
    return next({
      status: 400,
      message: "The table_name must be at least 2 characters long",
    });
  }

  next();
}

function validateCapacity(req, res, next) {
  const tableCapacity = req.body.data.capacity;

  if (!Number.isInteger(tableCapacity)) {
    return next({
      status: 400,
      message: "Table capacity must be a valid integer",
    });
  }

  if (tableCapacity < 1) {
    return next({
      status: 400,
      message: "Table capacity must be at least 1",
    });
  }

  next();
}

function validateTableCanFitAllPeople(req, res, next) {
  const tableCapacity = res.locals.table.capacity;
  const numberOfPeopleInReservation = res.locals.reservation.people;

  if (tableCapacity < numberOfPeopleInReservation) {
    return next({
      status: 400,
      message: `The selected table's capacity is ${tableCapacity} people. Please choose a larger table.`,
    });
  }

  next();
}

function validateTableIsOccupied(req, res, next) {
  const table = res.locals.table;

  if (table.reservation_id) {
    return next({
      status: 400,
      message:
        "The selected table is already occupied. Please choose a different table.",
    });
  }

  next();
}

function validateTableIsUnoccupied(req, res, next) {
  const table = res.locals.table;

  if (!table.reservation_id) {
    return next({
      status: 400,
      message: "The selected table is not occupied.",
    });
  }

  next();
}

function validateReservationNotSeated(req, res, next) {
  const { status } = res.locals.reservation;

  if (status === "seated") {
    return next({
      status: 400,
      message: "The selected reservation is already seated",
    });
  }

  next();
}

//Operations

async function createTable(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({
    data: newTable,
  });
}

function readTable(req, res) {
  const data = res.locals.table;
  res.json({ data });
}

async function updateTable(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    table_id: res.locals.table.table_id,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const updatedReservation = {
    ...res.locals.reservation,
    reservation_id: res.locals.reservation.reservation_id,
    status: "seated",
  };

  await reservationsService.update(updatedReservation);

  const data = await service.update(updatedTable);
  res.json({ data });
}

async function finishTable(req, res, next) {
  const table = await service.read(req.params.table_id);
  const reservation = await reservationsService.read(table.reservation_id);

  const updatedTable = {
    ...table,
    reservation_id: null,
  };

  const updatedReservation = {
    ...reservation,
    status: "finished",
  };

  await reservationsService.update(updatedReservation);
  const data = await service.update(updatedTable);

  res.json({ data });
}

async function listTables(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

module.exports = {
  create: [
    validateHasDataProperty,
    validateRequiredProperties,
    validateTableName,
    validateCapacity,
    asyncErrorBoundary(createTable),
  ],
  read: [asyncErrorBoundary(validateTableExists), readTable],
  update: [
    validateHasDataProperty,
    validateHasReservationId,
    asyncErrorBoundary(validateTableExists),
    asyncErrorBoundary(validateReservationExists),
    validateReservationNotSeated,
    validateTableCanFitAllPeople,
    validateTableIsOccupied,
    asyncErrorBoundary(updateTable),
  ],
  delete: [
    asyncErrorBoundary(validateTableExists),
    validateTableIsUnoccupied,
    asyncErrorBoundary(finishTable),
  ],
  list: asyncErrorBoundary(listTables),
};