function throwError(status, errorMessage) {
    const error = new Error();
    error.status = status;
    error.message = errorMessage;
    throw error;
}

module.exports = throwError;
