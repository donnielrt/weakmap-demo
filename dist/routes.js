"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _koaRouter = _interopRequireDefault(require("koa-router"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const router = new _koaRouter.default();

/**
                                          * GET /
                                          */
router.get('/', async ctx => {
  // ctx.body = 
  return await ctx.render('index');
});var _default =

router;exports.default = _default;
//# sourceMappingURL=routes.js.map