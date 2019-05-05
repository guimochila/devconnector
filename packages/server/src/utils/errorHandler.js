import logger from './logger';

export const developmentErrors = (err, req, res, next) => {
  const error = {
    message: err.message,
    stack: err.stack,
  };
  logger.error(error);
  return res.status(500).json({ data: { error } });
};

export const productionErrros = (err, req, res, next) => {
  return res.status(500).json({ data: { error: err.message } });
};
