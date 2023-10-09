const handleMongooseError = (error, _, next) => {
  const { code } = error;
  const status = code === 11000 ? 409 : 400;
  error.status = status;
  next(error);
};

export default handleMongooseError;
