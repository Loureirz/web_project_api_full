const { Schema, model } = require("mongoose");
const validator = require("validator");

const linkValid = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\/?.*$/i;

const userSchema = new Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: "Explorer",
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return linkValid.test(v);
      },
      message: (props) => `"${props.value}" não é um link válido.`,
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validade: {
      validator: validator.isEmail,
      message: props => `${props.value} não é um email válido!`,
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

const User = model("User", userSchema);

module.exports = User;