import { onRequestGet as __insights_js_onRequestGet } from "C:\\wamp64\\www\\github\\vue\\prod\\good-things-foundation-astro\\functions\\insights.js"
import { onRequestGet as __index_js_onRequestGet } from "C:\\wamp64\\www\\github\\vue\\prod\\good-things-foundation-astro\\functions\\index.js"

export const routes = [
    {
      routePath: "/insights",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__insights_js_onRequestGet],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "GET",
      middlewares: [],
      modules: [__index_js_onRequestGet],
    },
  ]