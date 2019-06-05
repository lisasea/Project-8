'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "Title is required"}}
    },
    author: {
      type: DataTypes.STRING,
      validate: {notEmpty: {msg: "Author is required"}}
    },
    genre: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER, //should this be DataTypes.STRING ?
    }, 
  },
  );
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};