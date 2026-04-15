import { getClient, heroAuditLog, heroProfiles } from "../mongo/client.js";

const PROFILE_PROJECTION = {
  _id: 0,
  heroId: 1,
  heroName: 1,
  power: 1,
  bio: 1,
  specializations: 1,
  stats: 1,
  recentIncidents: 1,
  deletedAt: 1,
  createdAt: 1,
  updatedAt: 1,
};

const toPositiveIntOrNull = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const buildFilter = ({ powers, minMissions, withBio, specialization }) => {
  const filter = { deletedAt: null };

  if (Array.isArray(powers) && powers.length > 0) {
    filter.power = { $in: powers };
  }

  if (typeof minMissions === "number") {
    filter["stats.totalMissions"] = { $gte: minMissions };
  }

  if (withBio === true) {
    filter.bio = { $exists: true, $nin: [null, ""] };
  }

  if (specialization) {
    filter.specializations = specialization;
  }

  return filter;
};

const findProfiles = async ({
  powers,
  minMissions,
  withBio,
  specialization,
  page,
  limit,
}) => {
  const filter = buildFilter({ powers, minMissions, withBio, specialization });
  const skip = (page - 1) * limit;

  return heroProfiles()
    .find(filter, { projection: PROFILE_PROJECTION })
    .sort({ heroId: 1 })
    .skip(skip)
    .limit(limit)
    .toArray();
};

const findProfileByHeroId = async (heroId) => {
  const parsedHeroId = toPositiveIntOrNull(heroId);
  if (parsedHeroId === null) return null;

  return heroProfiles().findOne(
    { heroId: parsedHeroId, deletedAt: null },
    { projection: PROFILE_PROJECTION },
  );
};

const updateBioByHeroId = async ({ heroId, bio }) => {
  const parsedHeroId = toPositiveIntOrNull(heroId);
  if (parsedHeroId === null) return null;

  const result = await heroProfiles().findOneAndUpdate(
    { heroId: parsedHeroId, deletedAt: null },
    { $set: { bio, updatedAt: new Date() } },
    { returnDocument: "after", projection: PROFILE_PROJECTION },
  );

  return result?.value ?? result ?? null;
};

const addSpecializationByHeroId = async ({ heroId, specialization }) => {
  const parsedHeroId = toPositiveIntOrNull(heroId);
  if (parsedHeroId === null) return null;

  const result = await heroProfiles().findOneAndUpdate(
    { heroId: parsedHeroId, deletedAt: null },
    {
      $addToSet: { specializations: specialization },
      $set: { updatedAt: new Date() },
    },
    { returnDocument: "after", projection: PROFILE_PROJECTION },
  );

  return result?.value ?? result ?? null;
};

const deleteSpecializationByHeroId = async ({ heroId, specialization }) => {
  const parsedHeroId = toPositiveIntOrNull(heroId);
  if (parsedHeroId === null) return null;

  const result = await heroProfiles().findOneAndUpdate(
    { heroId: parsedHeroId, deletedAt: null },
    {
      $pull: { specializations: specialization },
      $set: { updatedAt: new Date() },
    },
    { returnDocument: "after", projection: PROFILE_PROJECTION },
  );

  return result?.value ?? result ?? null;
};

const softDeleteByHeroId = async ({ heroId }) => {
  const parsedHeroId = toPositiveIntOrNull(heroId);
  if (parsedHeroId === null) return null;

  const session = getClient().startSession();

  try {
    let deletedProfile = null;

    await session.withTransaction(async () => {
      const profileResult = await heroProfiles().findOneAndUpdate(
        { heroId: parsedHeroId, deletedAt: null },
        { $set: { deletedAt: new Date(), updatedAt: new Date() } },
        {
          session,
          returnDocument: "after",
          projection: PROFILE_PROJECTION,
        },
      );

      deletedProfile = profileResult?.value ?? profileResult ?? null;
      if (!deletedProfile) {
        throw new Error("PROFILE_NOT_FOUND");
      }

      await heroAuditLog().insertOne(
        {
          heroId: parsedHeroId,
          action: "PROFILE_SOFT_DELETE",
          createdAt: new Date(),
        },
        { session },
      );
    });

    return deletedProfile;
  } catch (err) {
    if (err?.message === "PROFILE_NOT_FOUND") return null;
    throw err;
  } finally {
    await session.endSession();
  }
};

export default {
  findProfiles,
  findProfileByHeroId,
  updateBioByHeroId,
  addSpecializationByHeroId,
  deleteSpecializationByHeroId,
  softDeleteByHeroId,
};
