"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenameColumns1676365053461 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RenameColumns1676365053461 = /*#__PURE__*/function () {
  function RenameColumns1676365053461() {
    (0, _classCallCheck2["default"])(this, RenameColumns1676365053461);
  }

  (0, _createClass2["default"])(RenameColumns1676365053461, [{
    key: "up",
    value: function () {
      var _up = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryRunner) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return queryRunner.renameColumn('users', 'password_digest', 'passwordDigest');

              case 2:
                _context.next = 4;
                return queryRunner.renameColumn('posts', 'author_id', 'authorId');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function up(_x) {
        return _up.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryRunner) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return queryRunner.renameColumn('users', 'passwordDigest', 'password_digest');

              case 2:
                _context2.next = 4;
                return queryRunner.renameColumn('posts', 'authorId', 'author_id');

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function down(_x2) {
        return _down.apply(this, arguments);
      }

      return down;
    }()
  }]);
  return RenameColumns1676365053461;
}();

exports.RenameColumns1676365053461 = RenameColumns1676365053461;