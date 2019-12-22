"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _koa = _interopRequireDefault(require("koa"));
var _cors = _interopRequireDefault(require("@koa/cors"));
var _koaMorgan = _interopRequireDefault(require("koa-morgan"));
var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));
var _koaViews = _interopRequireDefault(require("koa-views"));
var _routes = _interopRequireDefault(require("./routes"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const app = new _koa.default();

// Set middlewares
app.use(
(0, _koaBodyparser.default)({
  enableTypes: ["json", "form"],
  formLimit: "10mb",
  jsonLimit: "10mb" }));



// Logger
app.use(
(0, _koaMorgan.default)("dev", {
  skip: () => app.env === "test" }));



// Enable CORS
app.use((0, _cors.default)());

// Default error handler middleware
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      statusCode: ctx.status,
      message: err.message };

    ctx.app.emit("error", err, ctx);
  }
});

// Views
app.use(
(0, _koaViews.default)(__dirname + "/views", {
  map: {
    html: "underscore" } }));




// Routes
app.use(_routes.default.routes());var _default =

app;exports.default = _default;
//# sourceMappingURL=app.js.map