import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { serveStatic } from "./lib/static.ts";
const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Test";
});

const staticRouter = serveStatic(router);
staticRouter("/static/index.html", "/");
staticRouter("/static/css/style.css", "/css/style.css");

router.all("/(.*)", (ctx) => {
  ctx.response.body = "404";
});

app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
