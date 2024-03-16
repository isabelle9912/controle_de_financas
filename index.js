// Modulos
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
// Express
const app = express();
const conn = require("./db/conn");

// Models
const Deal = require("./models/Deal");
const User = require("./models/User");

// Import Routes
const dealsRoutes = require("./routes/dealsRoutes");
const authRoutes = require("./routes/authRoutes");

// Import Routes
const DealController = require("./controllers/DealController");

const AuthController = require("./controllers/AuthController");
// Tamplate engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Receber resposta do body

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Session middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

// Flash messages
app.use(flash());



// Public path
app.use(express.static("public"));

// Set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/deals", dealsRoutes);
app.use("/", authRoutes);

// Servidor e conexão com banco
app.listen(3000);
conn
//.sync({force: true})
  .sync()
  .then()
  .catch((error) => {
    console.log(error);
  });