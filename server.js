const Koa = require('koa');
const Router = require('koa-router');
const db = require('./db.json');

const app = new Koa();
const router = new Router();

// Log requests
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

router.get('/api/threads', async (ctx) => {
  ctx.body = db.threads;
});

router.get('/api/threads/:threadId', async (ctx) => {
  const id = parseInt(ctx.params.threadId);
  const thread = db.threads.find((t) => t.id === id);

  if (!thread) {
    ctx.status = 404;
    ctx.body = { error: 'Thread not found' };
    return;
  }

  ctx.body = thread;
});

router.get('/api/', async (ctx) => {
  ctx.body = "API ready to receive requests";
});

router.get('/', async (ctx) => {
  ctx.body = "Thread service ready";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3002, () => {
  console.log('Threads service running on http://localhost:3002');
});
