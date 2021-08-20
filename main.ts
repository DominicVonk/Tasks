import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { serveStatic } from "./lib/static.ts";
const app = new Application();
const router = new Router();

const staticRouter = serveStatic(router);
staticRouter("/static/index.html", "text/html; charset=utf-8", "/");
staticRouter(
  "/static/css/style.css",
  "text/css; charset=utf-8",
  "/css/style.css",
);

router.all("/(.*)", (ctx) => {
  ctx.response.body = "404";
});

app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
