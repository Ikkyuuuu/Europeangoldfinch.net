function notFound(req, res, _next) {
    res.status(404).json({ error: 'Not Found' });
}

function errorHandler(err, _req, res, _next) { 
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
}

module.exports = { notFound, errorHandler };
