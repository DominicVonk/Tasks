import { Application, Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = "Test";
});

router.get("/static/css/style.css", async (ctx) => {
  const response = await fetch(
    new URL("static/css/style.css", import.meta.url),
  );
  ctx.response.body = response.body;
  const headers = new Headers(response.headers);
  // Set the appropriate content-type header value.
  headers.set("content-type", "text/css; charset=utf-8");
  ctx.response.headers = headers;
});

router.all("/(.*)", (ctx) => {
  ctx.response.body = "404";
});

app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
