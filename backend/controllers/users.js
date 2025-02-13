require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const listUsers = (req, res) => {
  User.find().then((users) => {
    res.json(users);
  });
};

const getUserById = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(() => {
      const error = new Error('Esse usuário não existe');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, ...data } = req.body;

  if (!email || !password) {
    const error = new Error("Dados Inválidos");
    error.statusCode = 400;
    throw error;
  }

  bcrypt.hash(password, 10)
  .then(hash => User.create({
    email,
    password: hash,
    ...data
  }))
  .then(user => res.status(201).send({ data: user }))
  .catch(next);
};

const updateProfile = (req, res, next) => {
  if (req.user.id !== req.user.id) {
    const error = new Error('Você não tem permissão para editar esse perfil');
    error.statusCode = 403;
    throw error;
  }

  User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true, upsert: true }
  )
    .orFail(() => {
      const error = new Error('Esse usuário não existe');
      error.statusCode = 404;
      throw error;
    })
    .then(user => res.send({ data: user }))
    .catch(err => {
      const statusCode = err.statusCode || 500;
      const message = statusCode === 500
        ? "Houve um erro no servidor interno"
        : err.message;

    res.status(statusCode).send({ message });
    })
};

const updateAvatar = (req, res, next) => {
  if (req.user.id !== req.user.id) {
    const error = new Error('Você não tem permissão para editar esse perfil');
    error.statusCode = 403;
    throw error;
  }

  User.findByIdAndUpdate(
    req.user.id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true, upsert: true }
  )
  .orFail(()=>{
    const error = new Error('Esse usuário não existe');
    error.statusCode = 404;
    throw error;
  })
   .then(user => res.send({
     data: user
   }))
   .catch(err =>  {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500
      ? 'Houve um erro no servidor interno'
      : err.message;
 
    res.status(statusCode).send({ message });
  });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(Object.assign(new Error('E-mail ou senha incorretos'), { statusCode: 401 }));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { listUsers, getUserById, createUser, updateProfile, updateAvatar, login };