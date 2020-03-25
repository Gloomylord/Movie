const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const engine = require('consolidate');
const path = require('path');
const Movie = require('./models.js').Movie;
const sequelize = require('./models.js').sequelize;
const Session = require('./models.js').Session;
const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/build/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
// определение фильтра
const fileFilter = (req, file, cb) => {

    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.engine('html', engine.mustache);
app.use(express.static(path.join(__dirname, 'build')));

app.set('views', path.join(__dirname + '/build'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
sequelize.sync().catch(err => console.log(err));
app.use(express.static(__dirname));

app.use(multer({storage: storageConfig, fileFilter: fileFilter}).single("img"));

app.post("/api/changeimg", async function (req, res, next) {
    let obj = {};
    let img = req.file;
    console.log('filedata:', img);
    console.log('body:', req.body.id);
    if (!img) {
        obj.message = "Ошибка при загрузке файла. Возможно тип файла не поддерживается";
    } else {
        obj.message = "Файл загружен";
        console.log('url: ', '/build/img/' + img.originalname);
        let url = {
            url: '/build/img/' + img.originalname
        };
        await Movie.update(url, {
            where: {
                id: req.body.id
            }
        }).catch(err => console.log(err));
    }
    res.json(obj);
});

app.post("/api/addmovie", async function (req, res, next) {
    let obj = {};
    let timetable;
    if (req.body.name && req.body.description) {
        let img = req.file;
        if (!img) {
            obj.message = "Ошибка при загрузке файла. Возможно тип файла не поддерживается";
        } else {
            let movie;
            if (req.body.description.length < 1000) {
                movie = await Movie.create({
                    name: req.body.name,
                    description: req.body.description,
                    url: '/build/img/' + img.originalname
                }).catch((err) => console.log(err));
                obj.message = "Файл загружен";
            } else {
                obj.message = "Длина описания больше 1000 символов";
            }

            if (req.body.timetable) {
                timetable=JSON.parse(req.body.timetable);
                for (let value of timetable) {
                    if (value.times) {
                        for (let i of value.times) {
                            Session.create({
                                date: value.date,
                                time: i,
                                movieId: 12
                            });
                        }

                    }
                }
            }
        }
        res.json(obj);
    } else {
        if (!req.body.name) {
            obj.message = 'нет имени';
        }
        if (!req.body.description) {
            obj.message = 'нет описания';
        }
        res.json(obj);

    }

});


app.post('/api/movies', async function (req, res, next) {
    let obj = {};
    if (req.body.id) {
        obj.movie = await Movie.findAll({where: {id: req.body.id}});
    } else {
        obj.movies = await Movie.findAll();
    }
    res.json(obj);
});

app.post('/api/sessions', async function (req, res, next) {
    let obj = {};
    if (req.body.id) {
        let res = await Movie.findOne({where: {id: req.body.id}});
        if (!res) return console.log("Movie not found");
        obj.sessions = await res.getSessions({
            order: [
                ['date', 'ASC'],
                ['time', 'ASC'],
            ],
        }).catch(err => console.log(err));
    } else {
        obj.res = 'Ничего не найдено';
    }
    res.json(obj);
});

app.post('/api/allsessions', async function (req, res, next) {
    let obj = {};
    obj.sessions = await Session.findAll({
        order: [
            ['date', 'ASC'],
            ['time', 'ASC'],
        ],
    }).catch(err => console.log(err));
    res.json(obj);
});

app.post('/api/description', async function (req, res, next) {
    let obj = {};
    console.log(req.body.id, req.body.description);
    if (req.body.id) {
        obj.res = await Movie.update({description: req.body.description}, {where: {id: req.body.id}});
    }
    res.json(obj);
});

app.post('/api/datetime', async function (req, res, next) {
    let obj = {};
    console.log('time: ', req.body.time, 'date: ', req.body.date);
    Movie.findOne({where: {id: req.body.id}}).then(async movie => {
        obj.res = await movie.createSession({
            date: req.body.date,
            time: req.body.time,
            movieId: req.body.id,
        })
    }).catch((err) => console.log(err));

    res.json(obj);
});

app.post('/api/deletetime', async function (req, res, next) {
    let obj = {};
    console.log('time: ', req.body.time, 'date: ', req.body.date, 'movieId', req.body.id);
    Session.destroy({
        where: {
            time: req.body.time,
            date: req.body.date + ' ' + '03:00:00',
            movieId: req.body.id,
        }
    }).catch((err) => console.log(err));

    res.json(obj);
});

app.get('*', function (req, res) {
    res.render('index.html');
});

app.listen(4000, function (res, req) {
    console.log('Example app listening on port 4000!');
});
