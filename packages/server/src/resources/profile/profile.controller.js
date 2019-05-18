import mongoose from 'mongoose';
import { escape } from 'validator';
import * as profileService from './profile.services';

export const getMyProfile = async (req, res, next) => {
  const profile = await profileService.findProfile(req.user.id);

  if (!profile) {
    return res.status(404).json({ data: { error: 'Profile not found' } });
  }

  res.json({ data: { profile } });
};

export const createProfile = async (req, res, next) => {
  if (!req.body.status || !req.body.skills) {
    return res
      .status(400)
      .json({ data: { error: 'Field: status or skills is missing' } });
  }

  // Sanitization
  const profileObj = { user: req.user.id, social: {} };
  const socialLinks = ['facebook', 'youtube', 'linkedin', 'twitter'];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(req.body)) {
    if (Array.isArray(value)) {
      profileObj[key] = value.map(item => escape(item).trim());
    } else if (socialLinks.includes(key)) {
      profileObj.social[key] = escape(value).trim();
    } else {
      profileObj[key] = escape(value).trim();
    }
  }

  try {
    let profile = await profileService.findProfile(req.user.id);

    if (!profile) {
      profile = await profileService.createProfile(profileObj);
    } else {
      profile = await profileService.updateProfile(profileObj);
    }

    return res.json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};

export const getProfiles = async (req, res, next) => {
  try {
    const profiles = await profileService.getProfiles();
    return res.json({ data: { profiles } });
  } catch (e) {
    next(e);
  }
};

export const getProfileById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ data: { error: 'Profile not found' } });
    }

    const profile = await profileService.findProfile(req.params.id);

    if (!profile) {
      return res.status(404).json({ data: { error: 'Profile not found' } });
    }

    res.json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};

export const addExperience = async (req, res, next) => {
  if (!req.body.title || !req.body.company || !req.body.from) {
    return res
      .status(400)
      .json({ data: { error: 'Title, company and from fields are required' } });
  }

  try {
    const profile = await profileService.addExperienceOrEducation(
      req.user.id,
      req.body,
      'experience',
    );
    res.json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};

export const removeExperience = async (req, res, next) => {
  try {
    const profile = await profileService.removeExperienceOrEducation(
      req.user.id,
      req.params.id,
      'experience',
    );
    res.status(202).json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};

export const addEducation = async (req, res, next) => {
  try {
    const profile = await profileService.addExperienceOrEducation(
      req.user.id,
      req.body,
      'education',
    );
    res.json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};

export const removeEducation = async (req, res, next) => {
  try {
    const profile = await profileService.removeExperienceOrEducation(
      req.user.id,
      req.params.id,
      'education',
    );
    res.status(202).json({ data: { profile } });
  } catch (e) {
    next(e);
  }
};
