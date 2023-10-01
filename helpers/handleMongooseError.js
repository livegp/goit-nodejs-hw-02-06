const handleMongooseError = (error, _, next) => {
  error.status = 400;
  next(error);
};

export default handleMongooseError;
