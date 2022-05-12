module.exports = (err, req, res, next) => {
    const error = err.message || 'Internal server error';
    const status = err.status || 500;
    res.status(status).send({ isOkay: false, error, status });
};
