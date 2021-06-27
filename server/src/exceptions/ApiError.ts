class ApiError extends Error {
  constructor(message) {
    super(message);
  }
}

export default ApiError;