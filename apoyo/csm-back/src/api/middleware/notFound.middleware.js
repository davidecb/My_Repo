module.exports = (req, res) => {
    const error = 'Resource not found';
    const status = 404;
    res.status(status).send({ isOkay: false, error, status });
};
