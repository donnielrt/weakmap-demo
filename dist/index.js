"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _app = _interopRequireDefault(require("./app"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const { PORT = 8080 } = process.env;
const server = _app.default.listen(PORT, () => console.log(`Listening on port ${PORT}`)); // eslint-disable-line no-console
var _default =
server;exports.default = _default;
//# sourceMappingURL=index.js.map