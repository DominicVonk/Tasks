import { Router } from "https://deno.land/x/oak@v9.0.0/mod.ts";
export function serveStatic(router: Router) {
  return (file: string, contentType: string, path?: string) => {
    router.get(path?.length ? path : file, async (ctx) => {
      const response = await fetch(
        new URL(".." + file, import.meta.url),
      );
      ctx.response.body = response.body;
      const headers = new Headers(response.headers);
      // Set the appropriate content-type header value.
      headers.set("content-type", contentType || "text/plain; charset=utf-8");
      headers.set("content-security-policy", "default-src *");
      ctx.response.headers = headers;
    });
  };
}
