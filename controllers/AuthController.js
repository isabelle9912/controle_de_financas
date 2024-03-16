// Modules for ORM, CRIPTOGRAPHY and MODELS 
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = class AuthController {
  // Login
  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuário não encontrado!");
      res.render("auth/login");

      return;
    }

    // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      res.render("auth/login", {
        message: "Senha inválida!",
      });

      return;
    }

    // auth user
    req.session.userid = user.id;

    req.flash("message", "Login realizado com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, password2 } = req.body;

    // Validation form
    if (!name || typeof name == undefined || name == null) {
      req.flash("message", "Nome inválido!");
      res.render("auth/register");
    }

    if (!password || typeof password == undefined || password == null) {
      req.flash("message", "Senha inválida");
      res.render("auth/register");
    }

    if (password.length < 4) {
      req.flash("message", "Senha muito pequena!");
      res.render("auth/register");
    }

    if (password != password2) {
      req.flash("message", "As senhas são diferentes, tente novamente!");
      res.render("auth/register");
    }

    // Check if user exist
    const checkUserExists = await User.findOne({ where: { email: email } });

    if (checkUserExists) {
      req.flash("message", "O email já está em uso, tente novamente!");
      res.render("auth/register");

      return;
    }

    // Create password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      // Initialize session
      req.session.userid = createdUser.id;
      req.session.username = createdUser.name;
      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  } // End registerPost

  // Logout
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}; // End module.exports
