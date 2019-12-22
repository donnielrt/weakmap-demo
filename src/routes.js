import Router from 'koa-router';

const router = new Router();

/**
 * GET /
 */
router.get('/', async ctx => {
  // ctx.body = 
  return await ctx.render('index');
});

export default router;
