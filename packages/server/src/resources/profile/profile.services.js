import Profile from './profile.model';

export const findProfile = async id => {
  const profile = await Profile.findOne({ user: id }).populate('user', [
    'name',
    'avatar',
  ]);
  return profile;
};

export const createProfile = async profile => {
  const newProfile = await new Profile(profile).save();
  return newProfile;
};

export const updateProfile = async profile => {
  const updatedProfile = await Profile.findOneAndUpdate(
    { user: profile.user },
    profile,
    { new: true, runValidators: true },
  ).exec();
  return updatedProfile;
};

export const getProfiles = async () => {
  const profiles = await Profile.find({}).populate('user', ['name', 'avatar']);
  return profiles;
};

export const addExperienceOrEducation = async (id, experience, option) => {
  const profile = await Profile.findOneAndUpdate(
    { user: id },
    { $push: { [option]: { $each: [experience], $position: 0 } } },
    { safe: true, upsert: true, new: true, runValidators: true },
  );

  return profile;
};

export const removeExperienceOrEducation = async (
  userId,
  experienceId,
  option,
) => {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $pull: { [option]: { _id: experienceId } } },
    { safe: true, new: true },
  );

  return profile;
};
