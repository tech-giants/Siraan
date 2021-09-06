"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;
  // console.log('categories hub data action=======4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444=====', action.payload);

  switch (action.payload) {
    case _constants.SET_CATEGORIES_DATA:
      return action.payload;
  }

  return state;
};

exports["default"] = _default;