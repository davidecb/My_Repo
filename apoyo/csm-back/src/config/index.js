if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI: process.env.DATABASE_URI
};
