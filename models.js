const Sequelize = require("sequelize");
const sequelize = new Sequelize("moviesInfo", "movieUser", "ei7veeChu4bo", {
    dialect: "mysql",
    host: "localhost"
});


const Movie = sequelize.define("movie", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    description: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },

});

const Session = sequelize.define("session", {
    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
});
Movie.hasMany(Session, { onDelete: "cascade", foreignKey: 'movieId'});


module.exports.Session = Session;
module.exports.sequelize = sequelize;
module.exports.Movie = Movie;

