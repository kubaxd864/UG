import heroService from "../services/heroes.js";

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
    const { status, power } = req.query || {};
    const heroes = await heroService.findAll({ status, power });
    res.json({ data: heroes, meta: { status, power, count: heroes.length } });
  } catch (err) {
    handleError(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await heroService.findById(id);
    res.json({ data: hero, meta: { id } });
  } catch (err) {
    handleError(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { name, power, status } = req.body || {};
    if (!name || !power || !status)
      return res
        .status(400)
        .json({ error: "name, power and status are required" });
    const hero = await heroService.create({ name, power, status });
    res.status(201).location(`/api/v1/heroes/${hero.id}`).json({ data: hero });
  } catch (err) {
    handleError(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, power, status } = req.body || {};
    const hero = await heroService.updateById({ id, name, power, status });
    res.json({ data: hero, meta: { id } });
  } catch (err) {
    handleError(err, res);
  }
};

const getIncidentHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, pageSize } = req.query || {};
    const result = await heroService.getIncidentHistory({ id, page, pageSize });
    res.json({
      data: result.data,
      meta: {
        heroId: id,
        page: result.page,
        pageSize: result.pageSize,
        total: result.count,
      },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export default { getAll, getById, create, updateById, getIncidentHistory };
