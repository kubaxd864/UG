import incidentsService from "../services/incidents.js";

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  FORBIDDEN: 403,
};

const handleError = (err, res) => {
  const status = err?.statusCode || HTTP_STATUS[err?.code] || 500;
  const safeMessage =
    status >= 500
      ? "Internal Server Error"
      : err?.message || "Request could not be processed";
  if (status >= 500) console.error(err);
  const body = { error: safeMessage };
  res.status(status).json(body);
};

const getAll = async (req, res) => {
  try {
    const { level, status, categoryIds, exclude } = req.query || {};
    const incidents = await incidentsService.findAll({
      level,
      status,
      categoryIds,
      exclude,
    });
    res.json({
      data: incidents,
      meta: { status, level, categoryIds, exclude, count: incidents.length },
    });
  } catch (err) {
    handleError(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await incidentsService.findById(id);
    res.json({
      data: incident,
      meta: { id },
    });
  } catch (err) {
    handleError(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { location, level, status, categoryIds } = req.body || {};
    if (!location || !level || !status)
      return res
        .status(400)
        .json({ error: "location, level and status are required" });
    const incident = await incidentsService.create({
      location,
      level,
      status,
      categoryIds,
    });
    res
      .status(201)
      .location(`/api/v1/incidents/${incident.id}`)
      .json({ data: incident });
  } catch (err) {
    handleError(err, res);
  }
};

const getStats = async (_req, res) => {
  try {
    const stats = await incidentsService.getStats();
    res.json({ data: stats });
  } catch (err) {
    handleError(err, res);
  }
};

const assignNewHero = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { hero_id } = req.body || {};
    if (!id)
      return res.status(400).json({ error: "Id of the incident is required" });
    if (!hero_id)
      return res.status(400).json({ error: "Id of the hero is required" });
    const updated = await incidentsService.assignNewHero({
      incidentId: id,
      heroId: hero_id,
    });
    res.json({ data: updated });
  } catch (err) {
    handleError(err, res);
  }
};

const closeIncident = async (req, res) => {
  try {
    const { id } = req.params || {};
    if (!id)
      return res.status(400).json({ error: "Id of the incident is required" });
    const incident = await incidentsService.closeIncident(id);
    res.json({ data: incident });
  } catch (err) {
    handleError(err, res);
  }
};

export default {
  getAll,
  getById,
  create,
  assignNewHero,
  closeIncident,
  getStats,
};
