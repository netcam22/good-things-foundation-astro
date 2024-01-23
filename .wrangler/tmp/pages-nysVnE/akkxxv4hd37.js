// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: [
    "/",
    "/_image",
    "/insights",
    "/what-to-do",
    "/our-network",
    "/get-involved",
    "/the-digital-divide"
  ],
  exclude: []
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\wamp64\\www\\github\\vue\\prod\\good-things-foundation-astro\\.wrangler\\tmp\\pages-nysVnE\\bundledWorker-0.41097771943093697.mjs";
export * from "C:\\wamp64\\www\\github\\vue\\prod\\good-things-foundation-astro\\.wrangler\\tmp\\pages-nysVnE\\bundledWorker-0.41097771943093697.mjs";
import { isRoutingRuleMatch } from "C:\\wamp64\\www\\github\\vue\\prod\\good-things-foundation-astro\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=akkxxv4hd37.js.map
