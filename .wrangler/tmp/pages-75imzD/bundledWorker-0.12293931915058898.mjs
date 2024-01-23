var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// ../.wrangler/tmp/bundle-XrKfdT/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}

// _worker.js
globalThis.process = {
  argv: [],
  env: {}
};
var Ef = Object.create;
var No = Object.defineProperty;
var vf = Object.getOwnPropertyDescriptor;
var bf = Object.getOwnPropertyNames;
var wf = Object.getPrototypeOf;
var Ff = Object.prototype.hasOwnProperty;
var te = (e2, t) => () => (e2 && (t = e2(e2 = 0)), t);
var mr = (e2, t) => () => (t || e2((t = { exports: {} }).exports, t), t.exports);
var Ne = (e2, t) => {
  for (var n in t)
    No(e2, n, { get: t[n], enumerable: true });
};
var Cf = (e2, t, n, r) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let o of bf(t))
      !Ff.call(e2, o) && o !== n && No(e2, o, { get: () => t[o], enumerable: !(r = vf(t, o)) || r.enumerable });
  return e2;
};
var Ao = (e2, t, n) => (n = e2 != null ? Ef(wf(e2)) : {}, Cf(t || !e2 || !e2.__esModule ? No(n, "default", { value: e2, enumerable: true }) : n, e2));
function ca(e2) {
  return e2.endsWith("/") ? e2 : e2 + "/";
}
function In(e2) {
  return e2[0] === "/" ? e2 : "/" + e2;
}
function So(e2) {
  return e2.replace(/(?<!:)\/\/+/g, "/");
}
function hr(e2) {
  return e2.endsWith("/") ? e2.slice(0, e2.length - 1) : e2;
}
function xf(e2) {
  return e2.startsWith("/") ? e2.substring(1) : e2;
}
function Oo(e2) {
  return e2.replace(/^\/|\/$/g, "");
}
function Nf(e2) {
  return typeof e2 == "string" || e2 instanceof String;
}
function Kt(...e2) {
  return e2.filter(Nf).map((t, n) => n === 0 ? hr(t) : n === e2.length - 1 ? xf(t) : Oo(t)).join("/");
}
function mn(e2) {
  return /^(http|ftp|https|ws):?\/\//.test(e2) || e2.startsWith("data:");
}
function To(e2) {
  return e2.replace(/\\/g, "/");
}
var Ln = te(() => {
});
var $o = mr((Ro) => {
  "use strict";
  Ro.parse = Sf;
  Ro.serialize = Of;
  var Af = Object.prototype.toString, gr = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Sf(e2, t) {
    if (typeof e2 != "string")
      throw new TypeError("argument str must be a string");
    for (var n = {}, r = t || {}, o = r.decode || Tf, s = 0; s < e2.length; ) {
      var i = e2.indexOf("=", s);
      if (i === -1)
        break;
      var a = e2.indexOf(";", s);
      if (a === -1)
        a = e2.length;
      else if (a < i) {
        s = e2.lastIndexOf(";", i - 1) + 1;
        continue;
      }
      var u = e2.slice(s, i).trim();
      if (n[u] === void 0) {
        var l = e2.slice(i + 1, a).trim();
        l.charCodeAt(0) === 34 && (l = l.slice(1, -1)), n[u] = Pf(l, o);
      }
      s = a + 1;
    }
    return n;
  }
  function Of(e2, t, n) {
    var r = n || {}, o = r.encode || Rf;
    if (typeof o != "function")
      throw new TypeError("option encode is invalid");
    if (!gr.test(e2))
      throw new TypeError("argument name is invalid");
    var s = o(t);
    if (s && !gr.test(s))
      throw new TypeError("argument val is invalid");
    var i = e2 + "=" + s;
    if (r.maxAge != null) {
      var a = r.maxAge - 0;
      if (isNaN(a) || !isFinite(a))
        throw new TypeError("option maxAge is invalid");
      i += "; Max-Age=" + Math.floor(a);
    }
    if (r.domain) {
      if (!gr.test(r.domain))
        throw new TypeError("option domain is invalid");
      i += "; Domain=" + r.domain;
    }
    if (r.path) {
      if (!gr.test(r.path))
        throw new TypeError("option path is invalid");
      i += "; Path=" + r.path;
    }
    if (r.expires) {
      var u = r.expires;
      if (!$f(u) || isNaN(u.valueOf()))
        throw new TypeError("option expires is invalid");
      i += "; Expires=" + u.toUTCString();
    }
    if (r.httpOnly && (i += "; HttpOnly"), r.secure && (i += "; Secure"), r.partitioned && (i += "; Partitioned"), r.priority) {
      var l = typeof r.priority == "string" ? r.priority.toLowerCase() : r.priority;
      switch (l) {
        case "low":
          i += "; Priority=Low";
          break;
        case "medium":
          i += "; Priority=Medium";
          break;
        case "high":
          i += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (r.sameSite) {
      var c = typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite;
      switch (c) {
        case true:
          i += "; SameSite=Strict";
          break;
        case "lax":
          i += "; SameSite=Lax";
          break;
        case "strict":
          i += "; SameSite=Strict";
          break;
        case "none":
          i += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return i;
  }
  function Tf(e2) {
    return e2.indexOf("%") !== -1 ? decodeURIComponent(e2) : e2;
  }
  function Rf(e2) {
    return encodeURIComponent(e2);
  }
  function $f(e2) {
    return Af.call(e2) === "[object Date]" || e2 instanceof Date;
  }
  function Pf(e2, t) {
    try {
      return t(e2);
    } catch {
      return e2;
    }
  }
});
function oe(e2, t) {
  let n = new RegExp(`\\x1b\\[${t}m`, "g"), r = `\x1B[${e2}m`, o = `\x1B[${t}m`;
  return function(s) {
    return !Vf.enabled || s == null ? s : r + (~("" + s).indexOf(o) ? s.replace(n, o + r) : s) + o;
  };
}
var Po;
var la;
var da;
var fa;
var pa;
var Vf;
var Ey;
var Dr;
var Vo;
var vy;
var by;
var wy;
var Fy;
var Cy;
var xy;
var ma;
var Ny;
var ha;
var ga;
var Ay;
var Sy;
var Oy;
var Ty;
var Ry;
var $y;
var Py;
var Vy;
var ky;
var By;
var Iy;
var Ly;
var My;
var et = te(() => {
  pa = true;
  typeof process < "u" && ({ FORCE_COLOR: Po, NODE_DISABLE_COLORS: la, NO_COLOR: da, TERM: fa } = process.env || {}, pa = process.stdout && process.stdout.isTTY);
  Vf = { enabled: !la && da == null && fa !== "dumb" && (Po != null && Po !== "0" || pa) };
  Ey = oe(0, 0), Dr = oe(1, 22), Vo = oe(2, 22), vy = oe(3, 23), by = oe(4, 24), wy = oe(7, 27), Fy = oe(8, 28), Cy = oe(9, 29), xy = oe(30, 39), ma = oe(31, 39), Ny = oe(32, 39), ha = oe(33, 39), ga = oe(34, 39), Ay = oe(35, 39), Sy = oe(36, 39), Oy = oe(37, 39), Ty = oe(90, 39), Ry = oe(90, 39), $y = oe(40, 49), Py = oe(41, 49), Vy = oe(42, 49), ky = oe(43, 49), By = oe(44, 49), Iy = oe(45, 49), Ly = oe(46, 49), My = oe(47, 49);
});
var kf;
var Bf;
var If;
var Lf;
var Da;
var ze = te(() => {
  ({ replace: kf } = ""), Bf = /[&<>'"]/g, If = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, Lf = (e2) => If[e2], Da = (e2) => kf.call(e2, Bf, Lf);
});
function ya(e2) {
  var t, n, r = "";
  if (typeof e2 == "string" || typeof e2 == "number")
    r += e2;
  else if (typeof e2 == "object")
    if (Array.isArray(e2)) {
      var o = e2.length;
      for (t = 0; t < o; t++)
        e2[t] && (n = ya(e2[t])) && (r && (r += " "), r += n);
    } else
      for (n in e2)
        e2[n] && (r && (r += " "), r += n);
  return r;
}
function ko() {
  for (var e2, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e2 = arguments[n]) && (t = ya(e2)) && (r && (r += " "), r += t);
  return r;
}
var Ke = te(() => {
});
function jf(e2) {
  return e2.replace(/\r\n|\r(?!\n)|\n/g, `
`);
}
function Hf(e2, t) {
  if (!t || t.line === void 0 || t.column === void 0)
    return "";
  let n = jf(e2).split(`
`).map((i) => i.replace(/\t/g, "  ")), r = [];
  for (let i = -2; i <= 2; i++)
    n[t.line + i] && r.push(t.line + i);
  let o = 0;
  for (let i of r) {
    let a = `> ${i}`;
    a.length > o && (o = a.length);
  }
  let s = "";
  for (let i of r) {
    let a = i === t.line - 1;
    s += a ? "> " : "  ", s += `${i + 1} | ${n[i]}
`, a && (s += `${Array.from({ length: o }).join(" ")}  | ${Array.from({ length: t.column }).join(" ")}^
`);
  }
  return s;
}
function Uf(e2) {
  return !(e2.length !== 3 || !e2[0] || typeof e2[0] != "object");
}
function Ma(e2, t, n) {
  let r = t?.split("/").pop()?.replace(".astro", "") ?? "", o = (...s) => {
    if (!Uf(s))
      throw new q({ ...ba, message: ba.message(r) });
    return e2(...s);
  };
  return Object.defineProperty(o, "name", { value: r, writable: false }), o.isAstroComponentFactory = true, o.moduleId = t, o.propagation = n, o;
}
function qf(e2) {
  return Ma(e2.factory, e2.moduleId, e2.propagation);
}
function ve(e2, t, n) {
  return typeof e2 == "function" ? Ma(e2, t, n) : qf(e2);
}
function Wf() {
  return (t) => {
    if (typeof t == "string")
      throw new q({ ...wa, message: wa.message(JSON.stringify(t)) });
    let n = [...Object.values(t)];
    if (n.length === 0)
      throw new q({ ...Fa, message: Fa.message(JSON.stringify(t)) });
    return Promise.all(n.map((r) => r()));
  };
}
function be(e2) {
  return { site: e2 ? new URL(e2) : void 0, generator: `Astro v${as}`, glob: Wf() };
}
async function us(e2, t, n, r) {
  let { request: o, url: s } = t, i = o.method.toUpperCase(), a = e2[i] ?? e2.ALL;
  return !n && n === false && i !== "GET" && r.warn("router", `${s.pathname} ${Dr(i)} requests are not available for a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` to enable.`), typeof a != "function" ? (r.warn("router", `No API Route handler exists for the method "${i}" for the route ${s.pathname}.
Found handlers: ${Object.keys(e2).map((u) => JSON.stringify(u)).join(", ")}
` + ("all" in e2 ? `One of the exported handlers is "all" (lowercase), did you mean to export 'ALL'?
` : "")), new Response(null, { status: 404, headers: { "X-Astro-Response": "Not-Found" } })) : a.call(e2, t);
}
function cs(e2) {
  return !!e2 && typeof e2 == "object" && typeof e2.then == "function";
}
function zf(e2) {
  return Object.prototype.toString.call(e2) === "[object HTMLString]";
}
function Ca(e2) {
  return e2 && typeof e2 == "object" && e2[ja];
}
function yr(e2) {
  return Object.defineProperty(e2, Ha, { value: true });
}
function Kf(e2) {
  return e2 && typeof e2 == "object" && e2[Ha];
}
function Lo(e2, t = {}, n = /* @__PURE__ */ new WeakSet()) {
  if (n.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  n.add(e2);
  let r = e2.map((o) => qa(o, t, n));
  return n.delete(e2), r;
}
function Ua(e2, t = {}, n = /* @__PURE__ */ new WeakSet()) {
  if (n.has(e2))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  n.add(e2);
  let r = Object.fromEntries(Object.entries(e2).map(([o, s]) => [o, qa(s, t, n)]));
  return n.delete(e2), r;
}
function qa(e2, t = {}, n = /* @__PURE__ */ new WeakSet()) {
  switch (Object.prototype.toString.call(e2)) {
    case "[object Date]":
      return [$e.Date, e2.toISOString()];
    case "[object RegExp]":
      return [$e.RegExp, e2.source];
    case "[object Map]":
      return [$e.Map, Lo(Array.from(e2), t, n)];
    case "[object Set]":
      return [$e.Set, Lo(Array.from(e2), t, n)];
    case "[object BigInt]":
      return [$e.BigInt, e2.toString()];
    case "[object URL]":
      return [$e.URL, e2.toString()];
    case "[object Array]":
      return [$e.JSON, Lo(e2, t, n)];
    case "[object Uint8Array]":
      return [$e.Uint8Array, Array.from(e2)];
    case "[object Uint16Array]":
      return [$e.Uint16Array, Array.from(e2)];
    case "[object Uint32Array]":
      return [$e.Uint32Array, Array.from(e2)];
    default:
      return e2 !== null && typeof e2 == "object" ? [$e.Value, Ua(e2, t, n)] : e2 === void 0 ? [$e.Value] : [$e.Value, e2];
  }
}
function Wa(e2, t) {
  return JSON.stringify(Ua(e2, t));
}
function Gf(e2, t) {
  let n = { isPage: false, hydration: null, props: {}, propsWithoutTransitionAttributes: {} };
  for (let [r, o] of Object.entries(e2))
    if (r.startsWith("server:") && r === "server:root" && (n.isPage = true), r.startsWith("client:"))
      switch (n.hydration || (n.hydration = { directive: "", value: "", componentUrl: "", componentExport: { value: "" } }), r) {
        case "client:component-path": {
          n.hydration.componentUrl = o;
          break;
        }
        case "client:component-export": {
          n.hydration.componentExport.value = o;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (n.hydration.directive = r.split(":")[1], n.hydration.value = o, !t.has(n.hydration.directive)) {
            let s = Array.from(t.keys()).map((i) => `client:${i}`).join(", ");
            throw new Error(`Error: invalid hydration directive "${r}". Supported hydration methods: ${s}`);
          }
          if (n.hydration.directive === "media" && typeof n.hydration.value != "string")
            throw new q(Mf);
          break;
        }
      }
    else
      n.props[r] = o, za.includes(r) || (n.propsWithoutTransitionAttributes[r] = o);
  for (let r of Object.getOwnPropertySymbols(e2))
    n.props[r] = e2[r], n.propsWithoutTransitionAttributes[r] = e2[r];
  return n;
}
async function Yf(e2, t) {
  let { renderer: n, result: r, astroId: o, props: s, attrs: i } = e2, { hydrate: a, componentUrl: u, componentExport: l } = t;
  if (!l.value)
    throw new q({ ...va, message: va.message(t.displayName) });
  let c = { children: "", props: { uid: o } };
  if (i)
    for (let [m, v] of Object.entries(i))
      c.props[m] = jn(v);
  c.props["component-url"] = await r.resolve(decodeURI(u)), n.clientEntrypoint && (c.props["component-export"] = l.value, c.props["renderer-url"] = await r.resolve(decodeURI(n.clientEntrypoint)), c.props.props = jn(Wa(s, t))), c.props.ssr = "", c.props.client = a;
  let f = await r.resolve("astro:scripts/before-hydration.js");
  return f.length && (c.props["before-hydration-url"] = f), c.props.opts = jn(JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" })), za.forEach((m) => {
    s[m] && (c.props[m] = s[m]);
  }), c;
}
function Jf(e2) {
  let t = 0;
  if (e2.length === 0)
    return t;
  for (let n = 0; n < e2.length; n++) {
    let r = e2.charCodeAt(n);
    t = (t << 5) - t + r, t = t & t;
  }
  return t;
}
function Xf(e2) {
  let t, n = "", r = Jf(e2), o = r < 0 ? "Z" : "";
  for (r = Math.abs(r); r >= Mo; )
    t = r % Mo, r = Math.floor(r / Mo), n = Ho[t] + n;
  return r > 0 && (n = Ho[r] + n), o + n;
}
function Ka(e2) {
  return e2 == null ? false : e2.isAstroComponentFactory === true;
}
function Qf(e2, t) {
  let n = t.propagation || "none";
  return t.moduleId && e2.componentMetadata.has(t.moduleId) && n === "none" && (n = e2.componentMetadata.get(t.moduleId).propagation), n === "in-tree" || n === "self";
}
function ls(e2) {
  return typeof e2 == "object" && !!e2[Zf];
}
function np(e2) {
  return e2._metadata.hasHydrationScript ? false : e2._metadata.hasHydrationScript = true;
}
function rp(e2, t) {
  return e2._metadata.hasDirectives.has(t) ? false : (e2._metadata.hasDirectives.add(t), true);
}
function xa(e2, t) {
  let r = e2.clientDirectives.get(t);
  if (!r)
    throw new Error(`Unknown directive: ${t}`);
  return r;
}
function op(e2, t, n) {
  switch (t) {
    case "both":
      return `${tp}<script>${xa(e2, n)};${ep}<\/script>`;
    case "directive":
      return `<script>${xa(e2, n)}<\/script>`;
  }
  return "";
}
function dp(e2) {
  let t = "";
  for (let [n, r] of Object.entries(e2))
    t += `const ${cp(n)} = ${JSON.stringify(r)?.replace(/<\/script>/g, "\\x3C/script>")};
`;
  return ne(t);
}
function Aa(e2) {
  return e2.length === 1 ? e2[0] : `${e2.slice(0, -1).join(", ")} or ${e2[e2.length - 1]}`;
}
function ct(e2, t, n = true) {
  if (e2 == null)
    return "";
  if (e2 === false)
    return ip.test(t) || ap.test(t) ? ne(` ${t}="false"`) : "";
  if (up.has(t))
    return console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`), "";
  if (t === "class:list") {
    let r = hn(ko(e2), n);
    return r === "" ? "" : ne(` ${t.slice(0, -5)}="${r}"`);
  }
  if (t === "style" && !(e2 instanceof Yt)) {
    if (Array.isArray(e2) && e2.length === 2)
      return ne(` ${t}="${hn(`${Na(e2[0])};${e2[1]}`, n)}"`);
    if (typeof e2 == "object")
      return ne(` ${t}="${hn(Na(e2), n)}"`);
  }
  return t === "className" ? ne(` class="${hn(e2, n)}"`) : e2 === true && (t.startsWith("data-") || sp.test(t)) ? ne(` ${t}`) : ne(` ${t}="${hn(e2, n)}"`);
}
function Uo(e2, t = true) {
  let n = "";
  for (let [r, o] of Object.entries(e2))
    n += ct(o, r, t);
  return ne(n);
}
function Mn(e2, { props: t, children: n = "" }, r = true) {
  let { lang: o, "data-astro-id": s, "define:vars": i, ...a } = t;
  return i && (e2 === "style" && (delete a["is:global"], delete a["is:scoped"]), e2 === "script" && (delete a.hoist, n = dp(i) + `
` + n)), (n == null || n == "") && ds.test(e2) ? `<${e2}${Uo(a, r)} />` : `<${e2}${Uo(a, r)}>${n}</${e2}>`;
}
function Ga(e2) {
  let t = [], n = { write: (o) => t.push(o) }, r = e2(n);
  return { async renderToFinalDestination(o) {
    for (let s of t)
      o.write(s);
    n.write = (s) => o.write(s), await r;
  } };
}
function Sa(e2) {
  e2._metadata.hasRenderedHead = true;
  let t = Array.from(e2.styles).filter(jo).map((s) => s.props.rel === "stylesheet" ? Mn("link", s) : Mn("style", s));
  e2.styles.clear();
  let n = Array.from(e2.scripts).filter(jo).map((s) => Mn("script", s, false)), r = Array.from(e2.links).filter(jo).map((s) => Mn("link", s, false)), o = t.join(`
`) + r.join(`
`) + n.join(`
`);
  if (e2._metadata.extraHead.length > 0)
    for (let s of e2._metadata.extraHead)
      o += s;
  return ne(o);
}
function* Ya() {
  yield yr({ type: "head" });
}
function* xr() {
  yield yr({ type: "maybe-head" });
}
function fp(e2) {
  return !!e2[qo];
}
function Nr(e2, t, n) {
  return !t && n ? Nr(e2, n) : { async render(r) {
    await gn(r, typeof t == "function" ? t(e2) : t);
  } };
}
async function Jt(e2, t, n) {
  let r = "", o = null, s = { write(a) {
    a instanceof Response || (typeof a == "object" && "type" in a && typeof a.type == "string" ? (o === null && (o = []), o.push(a)) : r += Nt(e2, a));
  } };
  return await Nr(e2, t, n).render(s), ne(new _r(r, o));
}
async function Ja(e2, t = {}) {
  let n = null, r = {};
  return t && await Promise.all(Object.entries(t).map(([o, s]) => Jt(e2, s).then((i) => {
    i.instructions && (n === null && (n = []), n.push(...i.instructions)), r[o] = i;
  }))), { slotInstructions: n, children: r };
}
function fs(e2, t) {
  if (Kf(t)) {
    let n = t;
    switch (n.type) {
      case "directive": {
        let { hydration: r } = n, o = r && np(e2), s = r && rp(e2, r.directive), i = o ? "both" : s ? "directive" : null;
        if (i) {
          let a = op(e2, i, r.directive);
          return ne(a);
        } else
          return "";
      }
      case "head":
        return e2._metadata.hasRenderedHead || e2.partial ? "" : Sa(e2);
      case "maybe-head":
        return e2._metadata.hasRenderedHead || e2._metadata.headInTree || e2.partial ? "" : Sa(e2);
      case "renderer-hydration-script": {
        let { rendererSpecificHydrationScripts: r } = e2._metadata, { rendererName: o } = n;
        return r.has(o) ? "" : (r.add(o), n.render());
      }
      default:
        throw new Error(`Unknown chunk type: ${t.type}`);
    }
  } else {
    if (t instanceof Response)
      return "";
    if (fp(t)) {
      let n = "", r = t;
      if (r.instructions)
        for (let o of r.instructions)
          n += fs(e2, o);
      return n += t.toString(), n;
    }
  }
  return t.toString();
}
function Nt(e2, t) {
  return ArrayBuffer.isView(t) ? mp.decode(t) : fs(e2, t);
}
function hp(e2, t) {
  if (ArrayBuffer.isView(t))
    return t;
  {
    let n = fs(e2, t);
    return Er.encode(n.toString());
  }
}
function gp(e2) {
  return !!e2 && typeof e2 == "object" && "render" in e2 && typeof e2.render == "function";
}
async function gn(e2, t) {
  if (t = await t, t instanceof _r)
    e2.write(t);
  else if (zf(t))
    e2.write(t);
  else if (Array.isArray(t)) {
    let n = t.map((r) => Ga((o) => gn(o, r)));
    for (let r of n)
      r && await r.renderToFinalDestination(e2);
  } else if (typeof t == "function")
    await gn(e2, t());
  else if (typeof t == "string")
    e2.write(ne(jn(t)));
  else if (!(!t && t !== 0))
    if (gp(t))
      await t.render(e2);
    else if (Za(t))
      await t.render(e2);
    else if (_p(t))
      await t.render(e2);
    else if (ArrayBuffer.isView(t))
      e2.write(t);
    else if (typeof t == "object" && (Symbol.asyncIterator in t || Symbol.iterator in t))
      for await (let n of t)
        await gn(e2, n);
    else
      e2.write(t);
}
function Dp(e2, t) {
  if (e2 != null)
    for (let n of Object.keys(e2))
      n.startsWith("client:") && console.warn(`You are attempting to render <${t} ${n} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
}
function yp(e2, t, n, r, o = {}) {
  Dp(r, t);
  let s = new Wo(e2, r, o, n);
  return Qf(e2, n) && e2._metadata.propagators.add(s), s;
}
function _p(e2) {
  return typeof e2 == "object" && !!e2[Xa];
}
function Za(e2) {
  return typeof e2 == "object" && !!e2[Qa];
}
function ce(e2, ...t) {
  return new zo(e2, t);
}
async function eu(e2, t, n, r, o = false, s) {
  let i = await tu(e2, t, n, r, s);
  if (i instanceof Response)
    return i;
  let a = "", u = false, l = { write(c) {
    if (o && !u && (u = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
      let f = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
      a += f;
    }
    c instanceof Response || (a += Nt(e2, c));
  } };
  return await i.render(l), a;
}
async function Ep(e2, t, n, r, o = false, s) {
  let i = await tu(e2, t, n, r, s);
  if (i instanceof Response)
    return i;
  let a = false;
  return o && await vp(e2), new ReadableStream({ start(u) {
    let l = { write(c) {
      if (o && !a && (a = true, !e2.partial && !/<!doctype html/i.test(String(c)))) {
        let m = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        u.enqueue(Er.encode(m));
      }
      if (c instanceof Response)
        throw new q({ ...wr });
      let f = hp(e2, c);
      u.enqueue(f);
    } };
    (async () => {
      try {
        await i.render(l), u.close();
      } catch (c) {
        q.is(c) && !c.loc && c.setLocation({ file: s?.component }), setTimeout(() => u.error(c), 0);
      }
    })();
  } });
}
async function tu(e2, t, n, r, o) {
  let s = await t(e2, n, r);
  if (s instanceof Response)
    return s;
  if (!Za(s))
    throw new q({ ..._a, message: _a.message(o?.route, typeof s), location: { file: o?.component } });
  return ls(s) ? s.content : s;
}
async function vp(e2) {
  let t = e2._metadata.propagators.values();
  for (; ; ) {
    let { value: n, done: r } = t.next();
    if (r)
      break;
    let o = await n.init(e2);
    ls(o) && e2._metadata.extraHead.push(o.head);
  }
}
function bp(e2) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e2);
}
async function wp(e2, t, n, r) {
  let o = Fp(t), s = "";
  for (let i in n)
    s += ` ${i}="${hn(await n[i])}"`;
  return ne(`<${o}${s}>${await Jt(e2, r?.default)}</${o}>`);
}
function Fp(e2) {
  let t = customElements.getName(e2);
  return t || e2.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
}
function xp(e2) {
  switch (e2?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid-js", "@astrojs/vue", "@astrojs/svelte", "@astrojs/lit"];
  }
}
function Np(e2) {
  return e2 === pp;
}
function Ap(e2) {
  return e2 && e2["astro:html"] === true;
}
function Tp(e2, t) {
  let n = t ? Op : Sp;
  return e2.replace(n, "");
}
async function Rp(e2, t, n, r, o = {}) {
  if (!n && !r["client:only"])
    throw new Error(`Unable to render ${t} because it is ${n}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: s, clientDirectives: i } = e2, a = { astroStaticSlot: true, displayName: t }, { hydration: u, isPage: l, props: c, propsWithoutTransitionAttributes: f } = Gf(r, i), m = "", v;
  u && (a.hydrate = u.directive, a.hydrateArgs = u.value, a.componentExport = u.componentExport, a.componentUrl = u.componentUrl);
  let A = xp(a.componentUrl), w = s.filter((D) => D.name !== "astro:jsx"), { children: R, slotInstructions: I } = await Ja(e2, o), V;
  if (a.hydrate !== "only") {
    let D = false;
    try {
      D = n && n[Oa];
    } catch {
    }
    if (D) {
      let F = n[Oa];
      V = s.find(({ name: O }) => O === F);
    }
    if (!V) {
      let F;
      for (let O of s)
        try {
          if (await O.ssr.check.call({ result: e2 }, n, c, R)) {
            V = O;
            break;
          }
        } catch (k) {
          F ??= k;
        }
      if (!V && F)
        throw F;
    }
    if (!V && typeof HTMLElement == "function" && bp(n)) {
      let F = await wp(e2, n, r, o);
      return { render(O) {
        O.write(F);
      } };
    }
  } else {
    if (a.hydrateArgs) {
      let D = a.hydrateArgs, F = Ta.has(D) ? Ta.get(D) : D;
      V = s.find(({ name: O }) => O === `@astrojs/${F}` || O === F);
    }
    if (!V && w.length === 1 && (V = w[0]), !V) {
      let D = a.componentUrl?.split(".").pop();
      V = s.filter(({ name: F }) => F === `@astrojs/${D}` || F === D)[0];
    }
  }
  if (V)
    a.hydrate === "only" ? m = await Jt(e2, o?.fallback) : { html: m, attrs: v } = await V.ssr.renderToStaticMarkup.call({ result: e2 }, n, f, R, a);
  else {
    if (a.hydrate === "only")
      throw new q({ ...Io, message: Io.message(a.displayName), hint: Io.hint(A.map((D) => D.replace("@astrojs/", "")).join("|")) });
    if (typeof n != "string") {
      let D = w.filter((O) => A.includes(O.name)), F = w.length > 1;
      if (D.length === 0)
        throw new q({ ...Bo, message: Bo.message(a.displayName, a?.componentUrl?.split(".").pop(), F, w.length), hint: Bo.hint(Aa(A.map((O) => "`" + O + "`"))) });
      if (D.length === 1)
        V = D[0], { html: m, attrs: v } = await V.ssr.renderToStaticMarkup.call({ result: e2 }, n, f, R, a);
      else
        throw new Error(`Unable to render ${a.displayName}!

This component likely uses ${Aa(A)},
but Astro encountered an error during server-side rendering.

Please ensure that ${a.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (V && !V.clientEntrypoint && V.name !== "@astrojs/lit" && a.hydrate)
    throw new q({ ...Ea, message: Ea.message(t, a.hydrate, V.name) });
  if (!m && typeof n == "string") {
    let D = $p(n), F = Object.values(R).join(""), O = ce`<${D}${Uo(c)}${ne(F === "" && ds.test(D) ? "/>" : `>${F}</${D}>`)}`;
    m = "";
    let k = { write(K) {
      K instanceof Response || (m += Nt(e2, K));
    } };
    await O.render(k);
  }
  if (!u)
    return { render(D) {
      if (I)
        for (let F of I)
          D.write(F);
      l || V?.name === "astro:jsx" ? D.write(m) : m && m.length > 0 && D.write(ne(Tp(m, V?.ssr?.supportsAstroStaticSlot ?? false)));
    } };
  let h = Xf(`<!--${a.componentExport.value}:${a.componentUrl}-->
${m}
${Wa(c, a)}`), _ = await Yf({ renderer: V, result: e2, astroId: h, props: c, attrs: v }, a), S = [];
  if (m) {
    if (Object.keys(R).length > 0)
      for (let D of Object.keys(R)) {
        let F = V?.ssr?.supportsAstroStaticSlot ? a.hydrate ? "astro-slot" : "astro-static-slot" : "astro-slot", O = D === "default" ? `<${F}>` : `<${F} name="${D}">`;
        m.includes(O) || S.push(D);
      }
  } else
    S = Object.keys(R);
  let j = S.length > 0 ? S.map((D) => `<template data-astro-template${D !== "default" ? `="${D}"` : ""}>${R[D]}</template>`).join("") : "";
  return _.children = `${m ?? ""}${j}`, _.children && (_.props["await-children"] = "", _.children += "<!--astro:end-->"), { render(D) {
    if (I)
      for (let F of I)
        D.write(F);
    D.write(yr({ type: "directive", hydration: u })), u.directive !== "only" && V?.ssr.renderHydrationScript && D.write(yr({ type: "renderer-hydration-script", rendererName: V.name, render: V.ssr.renderHydrationScript })), D.write(ne(Mn("astro-island", _, false)));
  } };
}
function $p(e2) {
  let t = /[&<>'"\s]+/g;
  return t.test(e2) ? e2.trim().split(t)[0].trim() : e2;
}
async function Pp(e2, t = {}) {
  let n = await Jt(e2, t?.default);
  return { render(r) {
    n != null && r.write(n);
  } };
}
async function Vp(e2, t, n, r = {}) {
  let { slotInstructions: o, children: s } = await Ja(e2, r), i = t({ slots: s }), a = o ? o.map((u) => Nt(e2, u)).join("") : "";
  return { render(u) {
    u.write(ne(a + i));
  } };
}
function kp(e2, t, n, r, o = {}) {
  let s = yp(e2, t, n, r, o);
  return { async render(i) {
    await s.render(i);
  } };
}
async function pe(e2, t, n, r, o = {}) {
  return cs(n) && (n = await n), Np(n) ? await Pp(e2, o) : (r = Bp(r), Ap(n) ? await Vp(e2, n, r, o) : Ka(n) ? kp(e2, t, n, r, o) : await Rp(e2, t, n, r, o));
}
function Bp(e2) {
  if (e2["class:list"] !== void 0) {
    let t = e2["class:list"];
    delete e2["class:list"], e2.class = ko(e2.class, t), e2.class === "" && delete e2.class;
  }
  return e2;
}
async function Ko(e2, t, n, r, o = {}, s = false, i) {
  let a = "", u = false, l = "";
  if (Ip(n))
    for (let c of xr())
      l += Nt(e2, c);
  try {
    let c = { write(m) {
      if (s && !u && (u = true, !e2.partial && !/<!doctype html/i.test(String(m)))) {
        let v = e2.compressHTML ? "<!DOCTYPE html>" : `<!DOCTYPE html>
`;
        a += v + l;
      }
      m instanceof Response || (a += Nt(e2, m));
    } };
    await (await pe(e2, t, n, r, o)).render(c);
  } catch (c) {
    throw q.is(c) && !c.loc && c.setLocation({ file: i?.component }), c;
  }
  return a;
}
function Ip(e2) {
  return !!e2?.[Cp];
}
async function xt(e2, t) {
  switch (true) {
    case t instanceof Yt:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return ne(jn(t));
    case typeof t == "function":
      return t;
    case (!t && t !== 0):
      return "";
    case Array.isArray(t):
      return ne((await Promise.all(t.map((r) => xt(e2, r)))).join(""));
  }
  let n;
  return t.props ? t.props[Gt.symbol] ? n = t.props[Gt.symbol] : n = new Gt(t) : n = new Gt(t), Yo(e2, t, n);
}
async function Yo(e2, t, n) {
  if (Ca(t)) {
    switch (true) {
      case !t.type:
        throw new Error(`Unable to render ${e2.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return xt(e2, t.props.children);
      case t.type.isAstroComponentFactory: {
        let r = {}, o = {};
        for (let [a, u] of Object.entries(t.props ?? {}))
          a === "children" || u && typeof u == "object" && u.$$slot ? o[a === "children" ? "default" : a] = () => xt(e2, u) : r[a] = u;
        let s = await eu(e2, t.type, r, o);
        if (s instanceof Response)
          throw s;
        return ne(s);
      }
      case (!t.type && t.type !== 0):
        return "";
      case (typeof t.type == "string" && t.type !== Ra):
        return ne(await Lp(e2, t.type, t.props ?? {}));
    }
    if (t.type) {
      let r = function(c) {
        if (Array.isArray(c))
          return c.map((f) => r(f));
        if (!Ca(c)) {
          i.default.push(c);
          return;
        }
        if ("slot" in c.props) {
          i[c.props.slot] = [...i[c.props.slot] ?? [], c], delete c.props.slot;
          return;
        }
        i.default.push(c);
      };
      if (typeof t.type == "function" && t.type["astro:renderer"] && n.increment(), typeof t.type == "function" && t.props["server:root"]) {
        let c = await t.type(t.props ?? {});
        return await xt(e2, c);
      }
      if (typeof t.type == "function")
        if (n.haveNoTried() || n.isCompleted()) {
          jp();
          try {
            let c = await t.type(t.props ?? {}), f;
            if (c?.[ja])
              return f = await Yo(e2, c, n), f;
            if (!c)
              return f = await Yo(e2, c, n), f;
          } catch (c) {
            if (n.isCompleted())
              throw c;
            n.increment();
          } finally {
            Hp();
          }
        } else
          n.increment();
      let { children: o = null, ...s } = t.props ?? {}, i = { default: [] };
      r(o);
      for (let [c, f] of Object.entries(s))
        f.$$slot && (i[c] = f, delete s[c]);
      let a = [], u = {};
      for (let [c, f] of Object.entries(i))
        a.push(xt(e2, f).then((m) => {
          m.toString().trim().length !== 0 && (u[c] = () => m);
        }));
      await Promise.all(a), s[Gt.symbol] = n;
      let l;
      return t.type === Ra && t.props["client:only"] ? l = await Ko(e2, t.props["client:display-name"] ?? "", null, s, u) : l = await Ko(e2, typeof t.type == "function" ? t.type.name : t.type, t.type, s, u), ne(l);
    }
  }
  return ne(`${t}`);
}
async function Lp(e2, t, { children: n, ...r }) {
  return ne(`<${t}${At(r)}${ne((n == null || n == "") && ds.test(t) ? "/>" : `>${n == null ? "" : await xt(e2, Mp(t, n))}</${t}>`)}`);
}
function Mp(e2, t) {
  return typeof t == "string" && (e2 === "style" || e2 === "script") ? ne(t) : t;
}
function jp() {
  if (ps++, !Go) {
    Go = console.error;
    try {
      console.error = Up;
    } catch {
    }
  }
}
function Hp() {
  ps--;
}
function Up(e2, ...t) {
  ps > 0 && typeof e2 == "string" && e2.includes("Warning: Invalid hook call.") && e2.includes("https://reactjs.org/link/invalid-hook-call") || Go(e2, ...t);
}
async function nu(e2, t, n, r, o, s) {
  if (!Ka(t)) {
    e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
    let c = { ...n ?? {}, "server:root": true }, f = await Ko(e2, t.name, t, c, {}, true, s), m = Er.encode(f);
    return new Response(m, { headers: new Headers([["Content-Type", "text/html; charset=utf-8"], ["Content-Length", m.byteLength.toString()]]) });
  }
  e2._metadata.headInTree = e2.componentMetadata.get(t.moduleId)?.containsHead ?? false;
  let i;
  if (o ? i = await Ep(e2, t, n, r, true, s) : i = await eu(e2, t, n, r, true, s), i instanceof Response)
    return i;
  let a = e2.response, u = new Headers(a.headers);
  return !o && typeof i == "string" && (i = Er.encode(i), u.set("Content-Length", i.byteLength.toString())), s?.component.endsWith(".md") && u.set("Content-Type", "text/html; charset=utf-8"), new Response(i, { ...a, headers: u });
}
function At(e2 = {}, t, { class: n } = {}) {
  let r = "";
  n && (typeof e2.class < "u" ? e2.class += ` ${n}` : typeof e2["class:list"] < "u" ? e2["class:list"] = [e2["class:list"], n] : e2.class = n);
  for (let [o, s] of Object.entries(e2))
    r += ct(s, o, true);
  return ne(r);
}
var Hn;
var Jo;
var vr;
var _a;
var Mf;
var Bo;
var Ea;
var Io;
var Xo;
var Qo;
var $a;
var Zo;
var Pa;
var es;
var va;
var ba;
var ts;
var ns;
var Va;
var rs;
var os;
var ka;
var br;
var Dn;
var ss;
var Ba;
var wr;
var Ia;
var Fr;
var Cr;
var is;
var wa;
var Fa;
var La;
var q;
var as;
var jn;
var Yt;
var ne;
var ja;
var Ha;
var $e;
var za;
var Ho;
var Mo;
var Zf;
var ep;
var tp;
var ds;
var sp;
var ip;
var ap;
var up;
var cp;
var hn;
var lp;
var Na;
var jo;
var qo;
var _r;
var pp;
var Oa;
var Er;
var mp;
var Xa;
var Wo;
var Qa;
var zo;
var Cp;
var Ta;
var Sp;
var Op;
var Ra;
var Gt;
var Go;
var ps;
var Ge = te(() => {
  et();
  ze();
  Ke();
  Hn = { name: "ClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in current adapter.", message: (e2) => `\`Astro.clientAddress\` is not available in the \`${e2}\` adapter. File an issue with the adapter to add support.` }, Jo = { name: "StaticClientAddressNotAvailable", title: "`Astro.clientAddress` is not available in static mode.", message: "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.", hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information on how to enable SSR." }, vr = { name: "NoMatchingStaticPathFound", title: "No static path found for requested path.", message: (e2) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e2}\`.`, hint: (e2) => `Possible dynamic routes being matched: ${e2.join(", ")}.` }, _a = { name: "OnlyResponseCanBeReturned", title: "Invalid type returned by Astro page.", message: (e2, t) => `Route \`${e2 || ""}\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`, hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information." }, Mf = { name: "MissingMediaQueryDirective", title: "Missing value for `client:media` directive.", message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided' }, Bo = { name: "NoMatchingRenderer", title: "No matching renderer found.", message: (e2, t, n, r) => `Unable to render \`${e2}\`.

${r > 0 ? `There ${n ? "are" : "is"} ${r} renderer${n ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${n ? "none were" : "it was not"} able to server-side render \`${e2}\`.` : `No valid renderer was found ${t ? `for the \`.${t}\` file extension.` : "for this file extension."}`}`, hint: (e2) => `Did you mean to enable the ${e2} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.` }, Ea = { name: "NoClientEntrypoint", title: "No client entrypoint specified in renderer.", message: (e2, t, n) => `\`${e2}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${n}\`.`, hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer." }, Io = { name: "NoClientOnlyHint", title: "Missing hint on client:only directive.", message: (e2) => `Unable to render \`${e2}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`, hint: (e2) => `Did you mean to pass \`client:only="${e2}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only` }, Xo = { name: "InvalidGetStaticPathsEntry", title: "Invalid entry inside getStaticPath's return value", message: (e2) => `Invalid entry returned by getStaticPaths. Expected an object, got \`${e2}\``, hint: "If you're using a `.map` call, you might be looking for `.flatMap()` instead. See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Qo = { name: "InvalidGetStaticPathsReturn", title: "Invalid value returned by getStaticPaths.", message: (e2) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e2}\``, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, $a = { name: "GetStaticPathsExpectedParams", title: "Missing params property on `getStaticPaths` route.", message: "Missing or empty required `params` property on `getStaticPaths` route.", hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Zo = { name: "GetStaticPathsInvalidRouteParam", title: "Invalid value for `getStaticPaths` route parameter.", message: (e2, t, n) => `Invalid getStaticPaths route parameter for \`${e2}\`. Expected undefined, a string or a number, received \`${n}\` (\`${t}\`)`, hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths." }, Pa = { name: "GetStaticPathsRequired", title: "`getStaticPaths()` function required for dynamic routes.", message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.", hint: 'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` or `output: "hybrid"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.' }, es = { name: "ReservedSlotName", title: "Invalid slot name.", message: (e2) => `Unable to create a slot named \`${e2}\`. \`${e2}\` is a reserved slot name. Please update the name of this slot.` }, va = { name: "NoMatchingImport", title: "No import found for component.", message: (e2) => `Could not render \`${e2}\`. No matching import has been found for \`${e2}\`.`, hint: "Please make sure the component is properly imported." }, ba = { name: "InvalidComponentArgs", title: "Invalid component arguments.", message: (e2) => `Invalid arguments passed to${e2 ? ` <${e2}>` : ""} component.`, hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`." }, ts = { name: "PageNumberParamNotFound", title: "Page number param not found.", message: (e2) => `[paginate()] page number param \`${e2}\` not found in your filepath.`, hint: "Rename your file to `[page].astro` or `[...page].astro`." }, ns = { name: "ImageMissingAlt", title: 'Image missing required "alt" property.', message: 'Image missing "alt" property. "alt" text is required to describe important images on the page.', hint: 'Use an empty string ("") for decorative images.' }, Va = { name: "InvalidImageService", title: "Error while loading image service.", message: "There was an error loading the configured image service. Please see the stack trace for more information." }, rs = { name: "MissingImageDimension", title: "Missing image dimensions", message: (e2, t) => `Missing ${e2 === "both" ? "width and height attributes" : `${e2} attribute`} for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`, hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets)." }, os = { name: "UnsupportedImageFormat", title: "Unsupported image format", message: (e2, t, n) => `Received unsupported format \`${e2}\` from \`${t}\`. Currently only ${n.join(", ")} are supported by our image services.`, hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for." }, ka = { name: "UnsupportedImageConversion", title: "Unsupported image conversion", message: "Converting between vector (such as SVGs) and raster (such as PNGs and JPEGs) images is not currently supported." }, br = { name: "PrerenderDynamicEndpointPathCollide", title: "Prerendered dynamic endpoint has path collision.", message: (e2) => `Could not render \`${e2}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`, hint: (e2) => `Rename \`${e2}\` to \`${e2.replace(/\.(js|ts)/, (t) => ".json" + t)}\`` }, Dn = { name: "ExpectedImage", title: "Expected src to be an image.", message: (e2, t, n) => `Expected \`src\` property for \`getImage\` or \`<Image />\` to be either an ESM imported image or a string with the path of a remote image. Received \`${e2}\` (type: \`${t}\`).

Full serialized options received: \`${n}\`.`, hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct. If you're passing an async function, make sure to call and await it." }, ss = { name: "ExpectedImageOptions", title: "Expected image options.", message: (e2) => `Expected getImage() parameter to be an object. Received \`${e2}\`.` }, Ba = { name: "IncompatibleDescriptorOptions", title: "Cannot set both `densities` and `widths`", message: "Only one of `densities` or `widths` can be specified. In most cases, you'll probably want to use only `widths` if you require specific widths.", hint: "Those attributes are used to construct a `srcset` attribute, which cannot have both `x` and `w` descriptors." }, wr = { name: "ResponseSentError", title: "Unable to set response.", message: "The response has already been sent to the browser and cannot be altered." }, Ia = { name: "MiddlewareNoDataOrNextCalled", title: "The middleware didn't return a `Response`.", message: "Make sure your middleware returns a `Response` object, either directly or by returning the `Response` from calling the `next` function." }, Fr = { name: "MiddlewareNotAResponse", title: "The middleware returned something that is not a `Response` object.", message: "Any data returned from middleware must be a valid `Response` object." }, Cr = { name: "LocalsNotAnObject", title: "Value assigned to `locals` is not accepted.", message: "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.", hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`." }, is = { name: "LocalImageUsedWrongly", title: "Local images must be imported.", message: (e2) => `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a string filepath. Received \`${e2}\`.`, hint: "If you want to use an image from your `src` folder, you need to either import it or if the image is coming from a content collection, use the [image() schema helper](https://docs.astro.build/en/guides/images/#images-in-content-collections) See https://docs.astro.build/en/guides/images/#src-required for more information on the `src` property." }, wa = { name: "AstroGlobUsedOutside", title: "Astro.glob() used outside of an Astro file.", message: (e2) => `\`Astro.glob(${e2})\` can only be used in \`.astro\` files. \`import.meta.glob(${e2})\` can be used instead to achieve a similar result.`, hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import" }, Fa = { name: "AstroGlobNoMatch", title: "Astro.glob() did not match any files.", message: (e2) => `\`Astro.glob(${e2})\` did not return any matching files. Check the pattern for typos.` }, La = { name: "CantRenderPage", title: "Astro can't render the route.", message: "Astro cannot find any content to render for this route. There is no file or redirect associated with this route.", hint: "If you expect to find a route here, this may be an Astro bug. Please file an issue/restart the dev server" };
  q = class extends Error {
    loc;
    title;
    hint;
    frame;
    type = "AstroError";
    constructor(t, n) {
      let { name: r, title: o, message: s, stack: i, location: a, hint: u, frame: l } = t;
      super(s, n), this.title = o, this.name = r, s && (this.message = s), this.stack = i || this.stack, this.loc = a, this.hint = u, this.frame = l;
    }
    setLocation(t) {
      this.loc = t;
    }
    setName(t) {
      this.name = t;
    }
    setMessage(t) {
      this.message = t;
    }
    setHint(t) {
      this.hint = t;
    }
    setFrame(t, n) {
      this.frame = Hf(t, n);
    }
    static is(t) {
      return t.type === "AstroError";
    }
  };
  as = "4.2.1";
  jn = Da, Yt = class extends String {
    get [Symbol.toStringTag]() {
      return "HTMLString";
    }
  }, ne = (e2) => e2 instanceof Yt ? e2 : typeof e2 == "string" ? new Yt(e2) : e2;
  ja = "astro:jsx";
  Ha = Symbol.for("astro:render");
  $e = { Value: 0, JSON: 1, RegExp: 2, Date: 3, Map: 4, Set: 5, BigInt: 6, URL: 7, Uint8Array: 8, Uint16Array: 9, Uint32Array: 10 };
  za = Object.freeze(["data-astro-transition-scope", "data-astro-transition-persist"]);
  Ho = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY", Mo = Ho.length;
  Zf = Symbol.for("astro.headAndContent");
  ep = '(()=>{var b=Object.defineProperty;var f=(c,o,i)=>o in c?b(c,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):c[o]=i;var l=(c,o,i)=>(f(c,typeof o!="symbol"?o+"":o,i),i);var p;{let c={0:t=>m(t),1:t=>i(t),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(i(t)),5:t=>new Set(i(t)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(t),9:t=>new Uint16Array(t),10:t=>new Uint32Array(t)},o=t=>{let[e,r]=t;return e in c?c[e](r):void 0},i=t=>t.map(o),m=t=>typeof t!="object"||t===null?t:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,o(r)]));customElements.get("astro-island")||customElements.define("astro-island",(p=class extends HTMLElement{constructor(){super(...arguments);l(this,"Component");l(this,"hydrator");l(this,"hydrate",async()=>{var d;if(!this.hydrator||!this.isConnected)return;let e=(d=this.parentElement)==null?void 0:d.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),a={},h=this.querySelectorAll("template[data-astro-template]");for(let n of h){let s=n.closest(this.tagName);s!=null&&s.isSameNode(this)&&(a[n.getAttribute("data-astro-template")||"default"]=n.innerHTML,n.remove())}for(let n of r){let s=n.closest(this.tagName);s!=null&&s.isSameNode(this)&&(a[n.getAttribute("name")||"default"]=n.innerHTML)}let u;try{u=this.hasAttribute("props")?m(JSON.parse(this.getAttribute("props"))):{}}catch(n){let s=this.getAttribute("component-url")||"<unknown>",y=this.getAttribute("component-export");throw y&&(s+=` (export ${y})`),console.error(`[hydrate] Error parsing props for component ${s}`,this.getAttribute("props"),n),n}await this.hydrator(this)(this.Component,u,a,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))});l(this,"unmount",()=>{this.isConnected||this.dispatchEvent(new CustomEvent("astro:unmount"))})}disconnectedCallback(){document.removeEventListener("astro:after-swap",this.unmount),document.addEventListener("astro:after-swap",this.unmount,{once:!0})}connectedCallback(){if(!this.hasAttribute("await-children")||document.readyState==="interactive"||document.readyState==="complete")this.childrenConnectedCallback();else{let e=()=>{document.removeEventListener("DOMContentLoaded",e),r.disconnect(),this.childrenConnectedCallback()},r=new MutationObserver(()=>{var a;((a=this.lastChild)==null?void 0:a.nodeType)===Node.COMMENT_NODE&&this.lastChild.nodeValue==="astro:end"&&(this.lastChild.remove(),e())});r.observe(this,{childList:!0}),document.addEventListener("DOMContentLoaded",e)}}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}Astro[r](async()=>{let a=this.getAttribute("renderer-url"),[h,{default:u}]=await Promise.all([import(this.getAttribute("component-url")),a?import(a):()=>()=>{}]),d=this.getAttribute("component-export")||"default";if(!d.includes("."))this.Component=h[d];else{this.Component=h;for(let n of d.split("."))this.Component=this.Component[n]}return this.hydrator=u,this.hydrate},e,this)}attributeChangedCallback(){this.hydrate()}},l(p,"observedAttributes",["props"]),p))}})();', tp = "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>";
  ds = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i, sp = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i, ip = /^(contenteditable|draggable|spellcheck|value)$/i, ap = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i, up = /* @__PURE__ */ new Set(["set:html", "set:text"]), cp = (e2) => e2.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (t, n) => /[^\w]|\s/.test(t) ? "" : n === 0 ? t : t.toUpperCase()), hn = (e2, t = true) => t ? String(e2).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e2, lp = (e2) => e2.toLowerCase() === e2 ? e2 : e2.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`), Na = (e2) => Object.entries(e2).filter(([t, n]) => typeof n == "string" && n.trim() || typeof n == "number").map(([t, n]) => t[0] !== "-" && t[1] !== "-" ? `${lp(t)}:${n}` : `${t}:${n}`).join(";");
  jo = (e2, t, n) => {
    let r = JSON.stringify(e2.props), o = e2.children;
    return t === n.findIndex((s) => JSON.stringify(s.props) === r && s.children == o);
  };
  qo = Symbol.for("astro:slot-string"), _r = class extends Yt {
    instructions;
    [qo];
    constructor(t, n) {
      super(t), this.instructions = n, this[qo] = true;
    }
  };
  pp = Symbol.for("astro:fragment"), Oa = Symbol.for("astro:renderer"), Er = new TextEncoder(), mp = new TextDecoder();
  Xa = Symbol.for("astro.componentInstance"), Wo = class {
    [Xa] = true;
    result;
    props;
    slotValues;
    factory;
    returnValue;
    constructor(t, n, r, o) {
      this.result = t, this.props = n, this.factory = o, this.slotValues = {};
      for (let s in r) {
        let i = false, a = r[s](t);
        this.slotValues[s] = () => i ? r[s](t) : (i = true, a);
      }
    }
    async init(t) {
      return this.returnValue !== void 0 ? this.returnValue : (this.returnValue = this.factory(t, this.props, this.slotValues), this.returnValue);
    }
    async render(t) {
      this.returnValue === void 0 && await this.init(this.result);
      let n = this.returnValue;
      cs(n) && (n = await n), ls(n) ? await n.content.render(t) : await gn(t, n);
    }
  };
  Qa = Symbol.for("astro.renderTemplateResult"), zo = class {
    [Qa] = true;
    htmlParts;
    expressions;
    error;
    constructor(t, n) {
      this.htmlParts = t, this.error = void 0, this.expressions = n.map((r) => cs(r) ? Promise.resolve(r).catch((o) => {
        if (!this.error)
          throw this.error = o, o;
      }) : r);
    }
    async render(t) {
      let n = this.expressions.map((r) => Ga((o) => {
        if (r || r === 0)
          return gn(o, r);
      }));
      for (let r = 0; r < this.htmlParts.length; r++) {
        let o = this.htmlParts[r], s = n[r];
        t.write(ne(o)), s && await s.renderToFinalDestination(t);
      }
    }
  };
  Cp = Symbol.for("astro.needsHeadRendering"), Ta = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
  Sp = /\<\/?astro-slot\b[^>]*>/g, Op = /\<\/?astro-static-slot\b[^>]*>/g;
  Ra = "astro-client-only", Gt = class {
    constructor(t) {
      this.vnode = t, this.count = 0;
    }
    count;
    increment() {
      this.count++;
    }
    haveNoTried() {
      return this.count === 0;
    }
    isCompleted() {
      return this.count > 2;
    }
    static symbol = Symbol("astro:jsx:skip");
  }, ps = 0;
});
function tt(e2, t) {
  let n = new Set(e2.split(","));
  return t ? (r) => n.has(r.toLowerCase()) : (r) => n.has(r);
}
function Zt(e2) {
  if (B(e2)) {
    let t = {};
    for (let n = 0; n < e2.length; n++) {
      let r = e2[n], o = Z(r) ? sm(r) : Zt(r);
      if (o)
        for (let s in o)
          t[s] = o[s];
    }
    return t;
  } else if (Z(e2) || ee(e2))
    return e2;
}
function sm(e2) {
  let t = {};
  return e2.replace(om, "").split(nm).forEach((n) => {
    if (n) {
      let r = n.split(rm);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function vs(e2) {
  let t = "";
  if (!e2 || Z(e2))
    return t;
  for (let n in e2) {
    let r = e2[n], o = n.startsWith("--") ? n : pt(n);
    (Z(r) || typeof r == "number") && (t += `${o}:${r};`);
  }
  return t;
}
function en(e2) {
  let t = "";
  if (Z(e2))
    t = e2;
  else if (B(e2))
    for (let n = 0; n < e2.length; n++) {
      let r = en(e2[n]);
      r && (t += r + " ");
    }
  else if (ee(e2))
    for (let n in e2)
      e2[n] && (t += n + " ");
  return t.trim();
}
function bn(e2) {
  return !!e2 || e2 === "";
}
function Du(e2) {
  if (gs.hasOwnProperty(e2))
    return gs[e2];
  let t = um.test(e2);
  return t && console.error(`unsafe attribute name: ${e2}`), gs[e2] = !t;
}
function $r(e2) {
  if (e2 == null)
    return false;
  let t = typeof e2;
  return t === "string" || t === "number" || t === "boolean";
}
function Ye(e2) {
  let t = "" + e2, n = cm.exec(t);
  if (!n)
    return t;
  let r = "", o, s, i = 0;
  for (s = n.index; s < t.length; s++) {
    switch (t.charCodeAt(s)) {
      case 34:
        o = "&quot;";
        break;
      case 38:
        o = "&amp;";
        break;
      case 39:
        o = "&#39;";
        break;
      case 60:
        o = "&lt;";
        break;
      case 62:
        o = "&gt;";
        break;
      default:
        continue;
    }
    i !== s && (r += t.slice(i, s)), i = s + 1, r += o;
  }
  return i !== s ? r + t.slice(i, s) : r;
}
function _u(e2) {
  return e2.replace(lm, "");
}
function dm(e2, t) {
  if (e2.length !== t.length)
    return false;
  let n = true;
  for (let r = 0; n && r < e2.length; r++)
    n = Je(e2[r], t[r]);
  return n;
}
function Je(e2, t) {
  if (e2 === t)
    return true;
  let n = lu(e2), r = lu(t);
  if (n || r)
    return n && r ? e2.getTime() === t.getTime() : false;
  if (n = lt(e2), r = lt(t), n || r)
    return e2 === t;
  if (n = B(e2), r = B(t), n || r)
    return n && r ? dm(e2, t) : false;
  if (n = ee(e2), r = ee(t), n || r) {
    if (!n || !r)
      return false;
    let o = Object.keys(e2).length, s = Object.keys(t).length;
    if (o !== s)
      return false;
    for (let i in e2) {
      let a = e2.hasOwnProperty(i), u = t.hasOwnProperty(i);
      if (a && !u || !a && u || !Je(e2[i], t[i]))
        return false;
    }
  }
  return String(e2) === String(t);
}
function wn(e2, t) {
  return e2.findIndex((n) => Je(n, t));
}
var se;
var yn;
var he;
var fu;
var dt;
var Wn;
var fe;
var Or;
var Zp;
var Q;
var B;
var St;
var ft;
var lu;
var W;
var Z;
var lt;
var ee;
var Xt;
var pu;
var zn;
var ys;
var _s;
var Tr;
var _n;
var Rr;
var em;
var nt;
var tm;
var pt;
var Kn;
var Gn;
var mt;
var En;
var vn;
var Qt;
var Es;
var du;
var Ot;
var nm;
var rm;
var om;
var im;
var am;
var bs;
var mu;
var hu;
var gu;
var ws;
var um;
var gs;
var yu;
var cm;
var lm;
var Fs;
var Eu;
var Ds;
var Fn = te(() => {
  se = {}, yn = [], he = () => {
  }, fu = () => false, dt = (e2) => e2.charCodeAt(0) === 111 && e2.charCodeAt(1) === 110 && (e2.charCodeAt(2) > 122 || e2.charCodeAt(2) < 97), Wn = (e2) => e2.startsWith("onUpdate:"), fe = Object.assign, Or = (e2, t) => {
    let n = e2.indexOf(t);
    n > -1 && e2.splice(n, 1);
  }, Zp = Object.prototype.hasOwnProperty, Q = (e2, t) => Zp.call(e2, t), B = Array.isArray, St = (e2) => zn(e2) === "[object Map]", ft = (e2) => zn(e2) === "[object Set]", lu = (e2) => zn(e2) === "[object Date]", W = (e2) => typeof e2 == "function", Z = (e2) => typeof e2 == "string", lt = (e2) => typeof e2 == "symbol", ee = (e2) => e2 !== null && typeof e2 == "object", Xt = (e2) => (ee(e2) || W(e2)) && W(e2.then) && W(e2.catch), pu = Object.prototype.toString, zn = (e2) => pu.call(e2), ys = (e2) => zn(e2).slice(8, -1), _s = (e2) => zn(e2) === "[object Object]", Tr = (e2) => Z(e2) && e2 !== "NaN" && e2[0] !== "-" && "" + parseInt(e2, 10) === e2, _n = tt(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Rr = (e2) => {
    let t = /* @__PURE__ */ Object.create(null);
    return (n) => t[n] || (t[n] = e2(n));
  }, em = /-(\w)/g, nt = Rr((e2) => e2.replace(em, (t, n) => n ? n.toUpperCase() : "")), tm = /\B([A-Z])/g, pt = Rr((e2) => e2.replace(tm, "-$1").toLowerCase()), Kn = Rr((e2) => e2.charAt(0).toUpperCase() + e2.slice(1)), Gn = Rr((e2) => e2 ? `on${Kn(e2)}` : ""), mt = (e2, t) => !Object.is(e2, t), En = (e2, t) => {
    for (let n = 0; n < e2.length; n++)
      e2[n](t);
  }, vn = (e2, t, n) => {
    Object.defineProperty(e2, t, { configurable: true, enumerable: false, value: n });
  }, Qt = (e2) => {
    let t = parseFloat(e2);
    return isNaN(t) ? e2 : t;
  }, Es = (e2) => {
    let t = Z(e2) ? Number(e2) : NaN;
    return isNaN(t) ? e2 : t;
  }, Ot = () => du || (du = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  nm = /;(?![^(]*\))/g, rm = /:([^]+)/, om = /\/\*[^]*?\*\//g;
  im = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", am = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", bs = tt(im), mu = tt(am), hu = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", gu = tt(hu), ws = tt(hu + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
  um = /[>/="'\u0009\u000a\u000c\u0020]/, gs = {};
  yu = { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" };
  cm = /["'&<>]/;
  lm = /^-?>|<!--|-->|--!>|<!-$/g;
  Fs = (e2) => Z(e2) ? e2 : e2 == null ? "" : B(e2) || ee(e2) && (e2.toString === pu || !W(e2.toString)) ? JSON.stringify(e2, Eu, 2) : String(e2), Eu = (e2, t) => t && t.__v_isRef ? Eu(e2, t.value) : St(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o], s) => (n[Ds(r, s) + " =>"] = o, n), {}) } : ft(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Ds(n)) } : lt(t) ? Ds(t) : ee(t) && !B(t) && !_s(t) ? String(t) : t, Ds = (e2, t = "") => {
    var n;
    return lt(e2) ? `Symbol(${(n = e2.description) != null ? n : t})` : e2;
  };
});
function fm(e2, t = Xe) {
  t && t.active && t.effects.push(e2);
}
function Ts() {
  return Xe;
}
function pm(e2) {
  return e2.value;
}
function vu(e2) {
  e2._trackId++, e2._depsLength = 0;
}
function bu(e2) {
  if (e2.deps && e2.deps.length > e2._depsLength) {
    for (let t = e2._depsLength; t < e2.deps.length; t++)
      Au(e2.deps[t], e2);
    e2.deps.length = e2._depsLength;
  }
}
function Au(e2, t) {
  let n = e2.get(t);
  n !== void 0 && t._trackId !== n && (e2.delete(t), e2.size === 0 && e2.cleanup());
}
function ht() {
  Su.push(Rt), Rt = false;
}
function gt() {
  let e2 = Su.pop();
  Rt = e2 === void 0 ? true : e2;
}
function Rs() {
  xs++;
}
function $s() {
  for (xs--; !xs && Ns.length; )
    Ns.shift()();
}
function Ou(e2, t, n) {
  var r;
  if (t.get(e2) !== e2._trackId) {
    t.set(e2, e2._trackId);
    let o = e2.deps[e2._depsLength];
    o !== t ? (o && Au(o, e2), e2.deps[e2._depsLength++] = t) : e2._depsLength++;
  }
}
function Tu(e2, t, n) {
  var r;
  Rs();
  for (let o of e2.keys())
    if (o._dirtyLevel < t && e2.get(o) === o._trackId) {
      let s = o._dirtyLevel;
      o._dirtyLevel = t, s === 0 && (o._shouldSchedule = true, o.trigger());
    }
  Ru(e2), $s();
}
function Ru(e2) {
  for (let t of e2.keys())
    t.scheduler && t._shouldSchedule && (!t._runnings || t.allowRecurse) && e2.get(t) === t._trackId && (t._shouldSchedule = false, Ns.push(t.scheduler));
}
function Ae(e2, t, n) {
  if (Rt && tn) {
    let r = As.get(e2);
    r || As.set(e2, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = $u(() => r.delete(n))), Ou(tn, o, void 0);
  }
}
function rt(e2, t, n, r, o, s) {
  let i = As.get(e2);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && B(e2)) {
    let u = Number(r);
    i.forEach((l, c) => {
      (c === "length" || !lt(c) && c >= u) && a.push(l);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        B(e2) ? Tr(n) && a.push(i.get("length")) : (a.push(i.get(nn)), St(e2) && a.push(i.get(Ss)));
        break;
      case "delete":
        B(e2) || (a.push(i.get(nn)), St(e2) && a.push(i.get(Ss)));
        break;
      case "set":
        St(e2) && a.push(i.get(nn));
        break;
    }
  Rs();
  for (let u of a)
    u && Tu(u, 2, void 0);
  $s();
}
function hm() {
  let e2 = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e2[t] = function(...n) {
      let r = J(this);
      for (let s = 0, i = this.length; s < i; s++)
        Ae(r, "get", s + "");
      let o = r[t](...n);
      return o === -1 || o === false ? r[t](...n.map(J)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e2[t] = function(...n) {
      ht(), Rs();
      let r = J(this)[t].apply(this, n);
      return $s(), gt(), r;
    };
  }), e2;
}
function gm(e2) {
  let t = J(this);
  return Ae(t, "has", e2), t.hasOwnProperty(e2);
}
function Pr(e2, t, n = false, r = false) {
  e2 = e2.__v_raw;
  let o = J(e2), s = J(t);
  n || (mt(t, s) && Ae(o, "get", t), Ae(o, "get", s));
  let { has: i } = Hr(o), a = r ? Ps : n ? Ms : Ls;
  if (i.call(o, t))
    return a(e2.get(t));
  if (i.call(o, s))
    return a(e2.get(s));
  e2 !== o && e2.get(t);
}
function Vr(e2, t = false) {
  let n = this.__v_raw, r = J(n), o = J(e2);
  return t || (mt(e2, o) && Ae(r, "has", e2), Ae(r, "has", o)), e2 === o ? n.has(e2) : n.has(e2) || n.has(o);
}
function kr(e2, t = false) {
  return e2 = e2.__v_raw, !t && Ae(J(e2), "iterate", nn), Reflect.get(e2, "size", e2);
}
function Fu(e2) {
  e2 = J(e2);
  let t = J(this);
  return Hr(t).has.call(t, e2) || (t.add(e2), rt(t, "add", e2, e2)), this;
}
function Cu(e2, t) {
  t = J(t);
  let n = J(this), { has: r, get: o } = Hr(n), s = r.call(n, e2);
  s || (e2 = J(e2), s = r.call(n, e2));
  let i = o.call(n, e2);
  return n.set(e2, t), s ? mt(t, i) && rt(n, "set", e2, t, i) : rt(n, "add", e2, t), this;
}
function xu(e2) {
  let t = J(this), { has: n, get: r } = Hr(t), o = n.call(t, e2);
  o || (e2 = J(e2), o = n.call(t, e2));
  let s = r ? r.call(t, e2) : void 0, i = t.delete(e2);
  return o && rt(t, "delete", e2, void 0, s), i;
}
function Nu() {
  let e2 = J(this), t = e2.size !== 0, n = void 0, r = e2.clear();
  return t && rt(e2, "clear", void 0, void 0, n), r;
}
function Br(e2, t) {
  return function(r, o) {
    let s = this, i = s.__v_raw, a = J(i), u = t ? Ps : e2 ? Ms : Ls;
    return !e2 && Ae(a, "iterate", nn), i.forEach((l, c) => r.call(o, u(l), u(c), s));
  };
}
function Ir(e2, t, n) {
  return function(...r) {
    let o = this.__v_raw, s = J(o), i = St(s), a = e2 === "entries" || e2 === Symbol.iterator && i, u = e2 === "keys" && i, l = o[e2](...r), c = n ? Ps : t ? Ms : Ls;
    return !t && Ae(s, "iterate", u ? Ss : nn), { next() {
      let { value: f, done: m } = l.next();
      return m ? { value: f, done: m } : { value: a ? [c(f[0]), c(f[1])] : c(f), done: m };
    }, [Symbol.iterator]() {
      return this;
    } };
  };
}
function Tt(e2) {
  return function(...t) {
    return e2 === "delete" ? false : e2 === "clear" ? void 0 : this;
  };
}
function Em() {
  let e2 = { get(s) {
    return Pr(this, s);
  }, get size() {
    return kr(this);
  }, has: Vr, add: Fu, set: Cu, delete: xu, clear: Nu, forEach: Br(false, false) }, t = { get(s) {
    return Pr(this, s, false, true);
  }, get size() {
    return kr(this);
  }, has: Vr, add: Fu, set: Cu, delete: xu, clear: Nu, forEach: Br(false, true) }, n = { get(s) {
    return Pr(this, s, true);
  }, get size() {
    return kr(this, true);
  }, has(s) {
    return Vr.call(this, s, true);
  }, add: Tt("add"), set: Tt("set"), delete: Tt("delete"), clear: Tt("clear"), forEach: Br(true, false) }, r = { get(s) {
    return Pr(this, s, true, true);
  }, get size() {
    return kr(this, true);
  }, has(s) {
    return Vr.call(this, s, true);
  }, add: Tt("add"), set: Tt("set"), delete: Tt("delete"), clear: Tt("clear"), forEach: Br(true, true) };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e2[s] = Ir(s, false, false), n[s] = Ir(s, true, false), t[s] = Ir(s, false, true), r[s] = Ir(s, true, true);
  }), [e2, n, t, r];
}
function Vs(e2, t) {
  let n = t ? e2 ? Fm : wm : e2 ? bm : vm;
  return (r, o, s) => o === "__v_isReactive" ? !e2 : o === "__v_isReadonly" ? e2 : o === "__v_raw" ? r : Reflect.get(Q(n, o) && o in r ? n : r, o, s);
}
function Sm(e2) {
  switch (e2) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Om(e2) {
  return e2.__v_skip || !Object.isExtensible(e2) ? 0 : Sm(ys(e2));
}
function Jn(e2) {
  return on(e2) ? e2 : Is(e2, false, Dm, Cm, Vu);
}
function ks(e2) {
  return Is(e2, false, _m, xm, ku);
}
function Bs(e2) {
  return Is(e2, true, ym, Nm, Bu);
}
function Is(e2, t, n, r, o) {
  if (!ee(e2) || e2.__v_raw && !(t && e2.__v_isReactive))
    return e2;
  let s = o.get(e2);
  if (s)
    return s;
  let i = Om(e2);
  if (i === 0)
    return e2;
  let a = new Proxy(e2, i === 2 ? r : n);
  return o.set(e2, a), a;
}
function $t(e2) {
  return on(e2) ? $t(e2.__v_raw) : !!(e2 && e2.__v_isReactive);
}
function on(e2) {
  return !!(e2 && e2.__v_isReadonly);
}
function Xn(e2) {
  return !!(e2 && e2.__v_isShallow);
}
function Ur(e2) {
  return $t(e2) || on(e2);
}
function J(e2) {
  let t = e2 && e2.__v_raw;
  return t ? J(t) : e2;
}
function qr(e2) {
  return vn(e2, "__v_skip", true), e2;
}
function Iu(e2, t, n = false) {
  let r, o, s = W(e2);
  return s ? (r = e2, o = he) : (r = e2.get, o = e2.set), new jr(r, o, s || !o, n);
}
function Tm(e2) {
  Rt && tn && (e2 = J(e2), Ou(tn, e2.dep || (e2.dep = $u(() => e2.dep = void 0, e2 instanceof jr ? e2 : void 0)), void 0));
}
function Cs(e2, t = 2, n) {
  e2 = J(e2);
  let r = e2.dep;
  r && Tu(r, t, void 0);
}
function we(e2) {
  return !!(e2 && e2.__v_isRef === true);
}
function Lu(e2) {
  return we(e2) ? e2.value : e2;
}
function Wr(e2) {
  return $t(e2) ? e2 : new Proxy(e2, Rm);
}
var Xe;
var Yn;
var tn;
var rn;
var Rt;
var xs;
var Su;
var Ns;
var $u;
var As;
var nn;
var Ss;
var mm;
var Pu;
var wu;
var Lr;
var Mr;
var Os;
var Dm;
var ym;
var _m;
var Ps;
var Hr;
var vm;
var bm;
var wm;
var Fm;
var Cm;
var xm;
var Nm;
var Vu;
var ku;
var Bu;
var Am;
var Ls;
var Ms;
var jr;
var Rm;
var js = te(() => {
  Fn();
  Yn = class {
    constructor(t = false) {
      this.detached = t, this._active = true, this.effects = [], this.cleanups = [], this.parent = Xe, !t && Xe && (this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    run(t) {
      if (this._active) {
        let n = Xe;
        try {
          return Xe = this, t();
        } finally {
          Xe = n;
        }
      }
    }
    on() {
      Xe = this;
    }
    off() {
      Xe = this.parent;
    }
    stop(t) {
      if (this._active) {
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++)
          this.effects[n].stop();
        for (n = 0, r = this.cleanups.length; n < r; n++)
          this.cleanups[n]();
        if (this.scopes)
          for (n = 0, r = this.scopes.length; n < r; n++)
            this.scopes[n].stop(true);
        if (!this.detached && this.parent && !t) {
          let o = this.parent.scopes.pop();
          o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
        }
        this.parent = void 0, this._active = false;
      }
    }
  };
  rn = class {
    constructor(t, n, r, o) {
      this.fn = t, this.trigger = n, this.scheduler = r, this.active = true, this.deps = [], this._dirtyLevel = 2, this._trackId = 0, this._runnings = 0, this._shouldSchedule = false, this._depsLength = 0, fm(this, o);
    }
    get dirty() {
      if (this._dirtyLevel === 1) {
        ht();
        for (let t = 0; t < this._depsLength; t++) {
          let n = this.deps[t];
          if (n.computed && (pm(n.computed), this._dirtyLevel >= 2))
            break;
        }
        this._dirtyLevel < 2 && (this._dirtyLevel = 0), gt();
      }
      return this._dirtyLevel >= 2;
    }
    set dirty(t) {
      this._dirtyLevel = t ? 2 : 0;
    }
    run() {
      if (this._dirtyLevel = 0, !this.active)
        return this.fn();
      let t = Rt, n = tn;
      try {
        return Rt = true, tn = this, this._runnings++, vu(this), this.fn();
      } finally {
        bu(this), this._runnings--, tn = n, Rt = t;
      }
    }
    stop() {
      var t;
      this.active && (vu(this), bu(this), (t = this.onStop) == null || t.call(this), this.active = false);
    }
  };
  Rt = true, xs = 0, Su = [];
  Ns = [];
  $u = (e2, t) => {
    let n = /* @__PURE__ */ new Map();
    return n.cleanup = e2, n.computed = t, n;
  }, As = /* @__PURE__ */ new WeakMap(), nn = Symbol(""), Ss = Symbol("");
  mm = tt("__proto__,__v_isRef,__isVue"), Pu = new Set(Object.getOwnPropertyNames(Symbol).filter((e2) => e2 !== "arguments" && e2 !== "caller").map((e2) => Symbol[e2]).filter(lt)), wu = hm();
  Lr = class {
    constructor(t = false, n = false) {
      this._isReadonly = t, this._shallow = n;
    }
    get(t, n, r) {
      let o = this._isReadonly, s = this._shallow;
      if (n === "__v_isReactive")
        return !o;
      if (n === "__v_isReadonly")
        return o;
      if (n === "__v_isShallow")
        return s;
      if (n === "__v_raw")
        return r === (o ? s ? Am : Bu : s ? ku : Vu).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      let i = B(t);
      if (!o) {
        if (i && Q(wu, n))
          return Reflect.get(wu, n, r);
        if (n === "hasOwnProperty")
          return gm;
      }
      let a = Reflect.get(t, n, r);
      return (lt(n) ? Pu.has(n) : mm(n)) || (o || Ae(t, "get", n), s) ? a : we(a) ? i && Tr(n) ? a : a.value : ee(a) ? o ? Bs(a) : Jn(a) : a;
    }
  }, Mr = class extends Lr {
    constructor(t = false) {
      super(false, t);
    }
    set(t, n, r, o) {
      let s = t[n];
      if (!this._shallow) {
        let u = on(s);
        if (!Xn(r) && !on(r) && (s = J(s), r = J(r)), !B(t) && we(s) && !we(r))
          return u ? false : (s.value = r, true);
      }
      let i = B(t) && Tr(n) ? Number(n) < t.length : Q(t, n), a = Reflect.set(t, n, r, o);
      return t === J(o) && (i ? mt(r, s) && rt(t, "set", n, r, s) : rt(t, "add", n, r)), a;
    }
    deleteProperty(t, n) {
      let r = Q(t, n), o = t[n], s = Reflect.deleteProperty(t, n);
      return s && r && rt(t, "delete", n, void 0, o), s;
    }
    has(t, n) {
      let r = Reflect.has(t, n);
      return (!lt(n) || !Pu.has(n)) && Ae(t, "has", n), r;
    }
    ownKeys(t) {
      return Ae(t, "iterate", B(t) ? "length" : nn), Reflect.ownKeys(t);
    }
  }, Os = class extends Lr {
    constructor(t = false) {
      super(true, t);
    }
    set(t, n) {
      return true;
    }
    deleteProperty(t, n) {
      return true;
    }
  }, Dm = new Mr(), ym = new Os(), _m = new Mr(true), Ps = (e2) => e2, Hr = (e2) => Reflect.getPrototypeOf(e2);
  [vm, bm, wm, Fm] = Em();
  Cm = { get: Vs(false, false) }, xm = { get: Vs(false, true) }, Nm = { get: Vs(true, false) }, Vu = /* @__PURE__ */ new WeakMap(), ku = /* @__PURE__ */ new WeakMap(), Bu = /* @__PURE__ */ new WeakMap(), Am = /* @__PURE__ */ new WeakMap();
  Ls = (e2) => ee(e2) ? Jn(e2) : e2, Ms = (e2) => ee(e2) ? Bs(e2) : e2, jr = class {
    constructor(t, n, r, o) {
      this._setter = n, this.dep = void 0, this.__v_isRef = true, this.__v_isReadonly = false, this.effect = new rn(() => t(this._value), () => Cs(this, 1), () => this.dep && Ru(this.dep)), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
    }
    get value() {
      let t = J(this);
      return (!t._cacheable || t.effect.dirty) && mt(t._value, t._value = t.effect.run()) && Cs(t, 2), Tm(t), t.effect._dirtyLevel >= 1 && Cs(t, 1), t._value;
    }
    set value(t) {
      this._setter(t);
    }
    get _dirty() {
      return this.effect.dirty;
    }
    set _dirty(t) {
      this.effect.dirty = t;
    }
  };
  Rm = { get: (e2, t, n) => Lu(Reflect.get(e2, t, n)), set: (e2, t, n, r) => {
    let o = e2[t];
    return we(o) && !we(n) ? (o.value = n, true) : Reflect.set(e2, t, n, r);
  } };
});
function Vt(e2, ...t) {
  ht();
  let n = tr.length ? tr[tr.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = Vm();
  if (r)
    Dt(r, n, 11, [e2 + t.join(""), n && n.proxy, o.map(({ vnode: s }) => `at <${Bc(n, s.type)}>`).join(`
`), o]);
  else {
    let s = [`[Vue warn]: ${e2}`, ...t];
    o.length && s.push(`
`, ...km(o)), console.warn(...s);
  }
  gt();
}
function Vm() {
  let e2 = tr[tr.length - 1];
  if (!e2)
    return [];
  let t = [];
  for (; e2; ) {
    let n = t[0];
    n && n.vnode === e2 ? n.recurseCount++ : t.push({ vnode: e2, recurseCount: 0 });
    let r = e2.component && e2.component.parent;
    e2 = r && r.vnode;
  }
  return t;
}
function km(e2) {
  let t = [];
  return e2.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...Bm(n));
  }), t;
}
function Bm({ vnode: e2, recurseCount: t }) {
  let n = t > 0 ? `... (${t} recursive calls)` : "", r = e2.component ? e2.component.parent == null : false, o = ` at <${Bc(e2.component, e2.type, r)}`, s = ">" + n;
  return e2.props ? [o, ...Im(e2.props), s] : [o + s];
}
function Im(e2) {
  let t = [], n = Object.keys(e2);
  return n.slice(0, 3).forEach((r) => {
    t.push(...rc(r, e2[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function rc(e2, t, n) {
  return Z(t) ? (t = JSON.stringify(t), n ? t : [`${e2}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e2}=${t}`] : we(t) ? (t = rc(e2, J(t.value), true), n ? t : [`${e2}=Ref<`, t, ">"]) : W(t) ? [`${e2}=fn${t.name ? `<${t.name}>` : ""}`] : (t = J(t), n ? t : [`${e2}=`, t]);
}
function Dt(e2, t, n, r) {
  let o;
  try {
    o = r ? e2(...r) : e2();
  } catch (s) {
    oo(s, t, n);
  }
  return o;
}
function Pe(e2, t, n, r) {
  if (W(e2)) {
    let s = Dt(e2, t, n, r);
    return s && Xt(s) && s.catch((i) => {
      oo(i, t, n);
    }), s;
  }
  let o = [];
  for (let s = 0; s < e2.length; s++)
    o.push(Pe(e2[s], t, n, r));
  return o;
}
function oo(e2, t, n, r = true) {
  let o = t ? t.vnode : null;
  if (t) {
    let s = t.parent, i = t.proxy, a = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; s; ) {
      let l = s.ec;
      if (l) {
        for (let c = 0; c < l.length; c++)
          if (l[c](e2, i, a) === false)
            return;
      }
      s = s.parent;
    }
    let u = t.appContext.config.errorHandler;
    if (u) {
      Dt(u, null, 10, [e2, i, a]);
      return;
    }
  }
  Lm(e2, n, o, r);
}
function Lm(e2, t, n, r = true) {
  console.error(e2);
}
function ei(e2) {
  let t = Zs || oc;
  return e2 ? t.then(this ? e2.bind(this) : e2) : t;
}
function Mm(e2) {
  let t = st + 1, n = Fe.length;
  for (; t < n; ) {
    let r = t + n >>> 1, o = Fe[r], s = sr(o);
    s < e2 || s === e2 && o.pre ? t = r + 1 : n = r;
  }
  return t;
}
function ti(e2) {
  (!Fe.length || !Fe.includes(e2, or && e2.allowRecurse ? st + 1 : st)) && (e2.id == null ? Fe.push(e2) : Fe.splice(Mm(e2.id), 0, e2), sc());
}
function sc() {
  !or && !zs && (zs = true, Zs = oc.then(ic));
}
function jm(e2) {
  let t = Fe.indexOf(e2);
  t > st && Fe.splice(t, 1);
}
function Hm(e2) {
  B(e2) ? Nn.push(...e2) : (!kt || !kt.includes(e2, e2.allowRecurse ? an + 1 : an)) && Nn.push(e2), sc();
}
function Mu(e2, t, n = or ? st + 1 : 0) {
  for (; n < Fe.length; n++) {
    let r = Fe[n];
    if (r && r.pre) {
      if (e2 && r.id !== e2.uid)
        continue;
      Fe.splice(n, 1), n--, r();
    }
  }
}
function Qr(e2) {
  if (Nn.length) {
    let t = [...new Set(Nn)].sort((n, r) => sr(n) - sr(r));
    if (Nn.length = 0, kt) {
      kt.push(...t);
      return;
    }
    for (kt = t, an = 0; an < kt.length; an++)
      kt[an]();
    kt = null, an = 0;
  }
}
function ic(e2) {
  zs = false, or = true, Fe.sort(Um);
  let t = he;
  try {
    for (st = 0; st < Fe.length; st++) {
      let n = Fe[st];
      n && n.active !== false && Dt(n, null, 14);
    }
  } finally {
    st = 0, Fe.length = 0, Qr(e2), or = false, Zs = null, (Fe.length || Nn.length) && ic(e2);
  }
}
function so(e2, ...t) {
  it ? it.emit(e2, ...t) : Ks || Zn.push({ event: e2, args: t });
}
function ac(e2, t) {
  var n, r;
  it = e2, it ? (it.enabled = true, Zn.forEach(({ event: o, args: s }) => it.emit(o, ...s)), Zn = []) : typeof window < "u" && window.HTMLElement && !((r = (n = window.navigator) == null ? void 0 : n.userAgent) != null && r.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((s) => {
    ac(s, t);
  }), setTimeout(() => {
    it || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ks = true, Zn = []);
  }, 3e3)) : (Ks = true, Zn = []);
}
function qm(e2, t) {
  so("app:init", e2, t, { Fragment: _e, Text: yt, Comment: Ve, Static: Lt });
}
function Wm(e2) {
  so("app:unmount", e2);
}
function ni(e2) {
  return (t) => {
    so(e2, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
function Ym(e2, t, n) {
  so("component:emit", e2.appContext.app, e2, t, n);
}
function Jm(e2, t, ...n) {
  if (e2.isUnmounted)
    return;
  let r = e2.vnode.props || se, o = n, s = t.startsWith("update:"), i = s && t.slice(7);
  if (i && i in r) {
    let c = `${i === "modelValue" ? "model" : i}Modifiers`, { number: f, trim: m } = r[c] || se;
    m && (o = n.map((v) => Z(v) ? v.trim() : v)), f && (o = n.map(Qt));
  }
  __VUE_PROD_DEVTOOLS__ && Ym(e2, t, o);
  let a, u = r[a = Gn(t)] || r[a = Gn(nt(t))];
  !u && s && (u = r[a = Gn(pt(t))]), u && Pe(u, e2, 6, o);
  let l = r[a + "Once"];
  if (l) {
    if (!e2.emitted)
      e2.emitted = {};
    else if (e2.emitted[a])
      return;
    e2.emitted[a] = true, Pe(l, e2, 6, o);
  }
}
function cc(e2, t, n = false) {
  let r = t.emitsCache, o = r.get(e2);
  if (o !== void 0)
    return o;
  let s = e2.emits, i = {}, a = false;
  if (__VUE_OPTIONS_API__ && !W(e2)) {
    let u = (l) => {
      let c = cc(l, t, true);
      c && (a = true, fe(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e2.extends && u(e2.extends), e2.mixins && e2.mixins.forEach(u);
  }
  return !s && !a ? (ee(e2) && r.set(e2, null), null) : (B(s) ? s.forEach((u) => i[u] = null) : fe(i, s), ee(e2) && r.set(e2, i), i);
}
function io(e2, t) {
  return !e2 || !dt(t) ? false : (t = t.slice(2).replace(/Once$/, ""), Q(e2, t[0].toLowerCase() + t.slice(1)) || Q(e2, pt(t)) || Q(e2, t));
}
function ir(e2) {
  let t = Qe;
  return Qe = e2, lc = e2 && e2.type.__scopeId || null, t;
}
function Xm(e2, t = Qe, n) {
  if (!t || e2._n)
    return e2;
  let r = (...o) => {
    r._d && Xu(-1);
    let s = ir(t), i;
    try {
      i = e2(...o);
    } finally {
      ir(s), r._d && Xu(1);
    }
    return __VUE_PROD_DEVTOOLS__ && uc(t), i;
  };
  return r._n = true, r._c = true, r._d = true, r;
}
function Yr(e2) {
  let { type: t, vnode: n, proxy: r, withProxy: o, props: s, propsOptions: [i], slots: a, attrs: u, emit: l, render: c, renderCache: f, data: m, setupState: v, ctx: A, inheritAttrs: w } = e2, R, I, V = ir(e2);
  try {
    if (n.shapeFlag & 4) {
      let S = o || r, j = S;
      R = Me(c.call(j, S, f, s, v, m, A)), I = u;
    } else {
      let S = t;
      R = Me(S.length > 1 ? S(s, { attrs: u, slots: a, emit: l }) : S(s, null)), I = t.props ? u : Qm(u);
    }
  } catch (S) {
    Vh.length = 0, oo(S, e2, 1), R = ye(Ve);
  }
  let h = R, _;
  if (I && w !== false) {
    let S = Object.keys(I), { shapeFlag: j } = h;
    S.length && j & 7 && (i && S.some(Wn) && (I = Zm(I, i)), h = Mt(h, I));
  }
  return n.dirs && (h = Mt(h), h.dirs = h.dirs ? h.dirs.concat(n.dirs) : n.dirs), n.transition && (h.transition = n.transition), R = h, ir(V), R;
}
function eh(e2, t, n) {
  let { props: r, children: o, component: s } = e2, { props: i, children: a, patchFlag: u } = t, l = s.emitsOptions;
  if (t.dirs || t.transition)
    return true;
  if (n && u >= 0) {
    if (u & 1024)
      return true;
    if (u & 16)
      return r ? ju(r, i, l) : !!i;
    if (u & 8) {
      let c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let m = c[f];
        if (i[m] !== r[m] && !io(l, m))
          return true;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? true : r === i ? false : r ? i ? ju(r, i, l) : true : !!i;
  return false;
}
function ju(e2, t, n) {
  let r = Object.keys(t);
  if (r.length !== Object.keys(e2).length)
    return true;
  for (let o = 0; o < r.length; o++) {
    let s = r[o];
    if (t[s] !== e2[s] && !io(n, s))
      return true;
  }
  return false;
}
function th({ vnode: e2, parent: t }, n) {
  for (; t; ) {
    let r = t.subTree;
    if (r.suspense && r.suspense.activeBranch === e2 && (r.el = e2.el), r === e2)
      (e2 = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
function dc(e2, t) {
  t && t.pendingBranch ? B(e2) ? t.effects.push(...e2) : t.effects.push(e2) : Hm(e2);
}
function Hs(e2, t, n) {
  return fc(e2, t, n);
}
function fc(e2, t, { immediate: n, deep: r, flush: o, once: s, onTrack: i, onTrigger: a } = se) {
  if (t && s) {
    let D = t;
    t = (...F) => {
      D(...F), j();
    };
  }
  let u = (D) => {
    Vt("Invalid watch source: ", D, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Ce, c = (D) => r === true ? D : Cn(D, r === false ? 1 : void 0), f, m = false, v = false;
  if (we(e2) ? (f = () => e2.value, m = Xn(e2)) : $t(e2) ? (f = () => c(e2), m = true) : B(e2) ? (v = true, m = e2.some((D) => $t(D) || Xn(D)), f = () => e2.map((D) => {
    if (we(D))
      return D.value;
    if ($t(D))
      return c(D);
    if (W(D))
      return Dt(D, l, 2);
  })) : W(e2) ? t ? f = () => Dt(e2, l, 2) : f = () => (A && A(), Pe(e2, l, 3, [w])) : f = he, t && r) {
    let D = f;
    f = () => Cn(D());
  }
  let A, w = (D) => {
    A = _.onStop = () => {
      Dt(D, l, 4), A = _.onStop = void 0;
    };
  }, R;
  if (po)
    if (w = he, t ? n && Pe(t, l, 3, [f(), v ? [] : void 0, w]) : f(), o === "sync") {
      let D = ie();
      R = D.__watcherHandles || (D.__watcherHandles = []);
    } else
      return he;
  let I = v ? new Array(e2.length).fill(zr) : zr, V = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        let D = _.run();
        (r || m || (v ? D.some((F, O) => mt(F, I[O])) : mt(D, I))) && (A && A(), Pe(t, l, 3, [D, I === zr ? void 0 : v && I[0] === zr ? [] : I, w]), I = D);
      } else
        _.run();
  };
  V.allowRecurse = !!t;
  let h;
  o === "sync" ? h = V : o === "post" ? h = () => Oe(V, l && l.suspense) : (V.pre = true, l && (V.id = l.uid), h = () => ti(V));
  let _ = new rn(f, he, h), S = Ts(), j = () => {
    _.stop(), S && Or(S.effects, _);
  };
  return t ? n ? V() : I = _.run() : o === "post" ? Oe(_.run.bind(_), l && l.suspense) : _.run(), R && R.push(j), j;
}
function oh(e2, t, n) {
  let r = this.proxy, o = Z(e2) ? e2.includes(".") ? pc(r, e2) : () => r[e2] : e2.bind(r, r), s;
  W(t) ? s = t : (s = t.handler, n = t);
  let i = ar(this), a = fc(o, s.bind(r), n);
  return i(), a;
}
function pc(e2, t) {
  let n = t.split(".");
  return () => {
    let r = e2;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function Cn(e2, t, n = 0, r) {
  if (!ee(e2) || e2.__v_skip)
    return e2;
  if (t && t > 0) {
    if (n >= t)
      return e2;
    n++;
  }
  if (r = r || /* @__PURE__ */ new Set(), r.has(e2))
    return e2;
  if (r.add(e2), we(e2))
    Cn(e2.value, t, n, r);
  else if (B(e2))
    for (let o = 0; o < e2.length; o++)
      Cn(e2[o], t, n, r);
  else if (ft(e2) || St(e2))
    e2.forEach((o) => {
      Cn(o, t, n, r);
    });
  else if (_s(e2))
    for (let o in e2)
      Cn(e2[o], t, n, r);
  return e2;
}
function ot(e2, t, n, r) {
  let o = e2.dirs, s = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    let a = o[i];
    s && (a.oldValue = s[i].value);
    let u = a.dir[r];
    u && (ht(), Pe(u, n, 8, [e2.el, a, e2, t]), gt());
  }
}
function ri() {
  let e2 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
  return ii(() => {
    e2.isMounted = true;
  }), Dc(() => {
    e2.isUnmounting = true;
  }), e2;
}
function hc(e2, t) {
  let { leavingVNodes: n } = e2, r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function An(e2, t, n, r) {
  let { appear: o, mode: s, persisted: i = false, onBeforeEnter: a, onEnter: u, onAfterEnter: l, onEnterCancelled: c, onBeforeLeave: f, onLeave: m, onAfterLeave: v, onLeaveCancelled: A, onBeforeAppear: w, onAppear: R, onAfterAppear: I, onAppearCancelled: V } = t, h = String(e2.key), _ = hc(n, e2), S = (F, O) => {
    F && Pe(F, r, 9, O);
  }, j = (F, O) => {
    let k = O[1];
    S(F, O), B(F) ? F.every((K) => K.length <= 1) && k() : F.length <= 1 && k();
  }, D = { mode: s, persisted: i, beforeEnter(F) {
    let O = a;
    if (!n.isMounted)
      if (o)
        O = w || a;
      else
        return;
    F[Bt] && F[Bt](true);
    let k = _[h];
    k && un(e2, k) && k.el[Bt] && k.el[Bt](), S(O, [F]);
  }, enter(F) {
    let O = u, k = l, K = c;
    if (!n.isMounted)
      if (o)
        O = R || u, k = I || l, K = V || c;
      else
        return;
    let $ = false, G = F[Kr] = (de) => {
      $ || ($ = true, de ? S(K, [F]) : S(k, [F]), D.delayedLeave && D.delayedLeave(), F[Kr] = void 0);
    };
    O ? j(O, [F, G]) : G();
  }, leave(F, O) {
    let k = String(e2.key);
    if (F[Kr] && F[Kr](true), n.isUnmounting)
      return O();
    S(f, [F]);
    let K = false, $ = F[Bt] = (G) => {
      K || (K = true, O(), G ? S(A, [F]) : S(v, [F]), F[Bt] = void 0, _[k] === e2 && delete _[k]);
    };
    _[k] = e2, m ? j(m, [F, $]) : $();
  }, clone(F) {
    return An(F, t, n, r);
  } };
  return D;
}
function Us(e2) {
  if (co(e2))
    return e2 = Mt(e2), e2.children = null, e2;
}
function Hu(e2) {
  return co(e2) ? e2.children ? e2.children[0] : void 0 : e2;
}
function Sn(e2, t) {
  e2.shapeFlag & 6 && e2.component ? Sn(e2.component.subTree, t) : e2.shapeFlag & 128 ? (e2.ssContent.transition = t.clone(e2.ssContent), e2.ssFallback.transition = t.clone(e2.ssFallback)) : e2.transition = t;
}
function uo(e2, t = false, n) {
  let r = [], o = 0;
  for (let s = 0; s < e2.length; s++) {
    let i = e2[s], a = n == null ? i.key : String(n) + String(i.key != null ? i.key : s);
    i.type === _e ? (i.patchFlag & 128 && o++, r = r.concat(uo(i.children, t, a))) : (t || i.type !== Ve) && r.push(a != null ? Mt(i, { key: a }) : i);
  }
  if (o > 1)
    for (let s = 0; s < r.length; s++)
      r[s].patchFlag = -2;
  return r;
}
function si(e2, t) {
  return W(e2) ? fe({ name: e2.name }, t, { setup: e2 }) : e2;
}
function ih(e2, t) {
  gc(e2, "a", t);
}
function ah(e2, t) {
  gc(e2, "da", t);
}
function gc(e2, t, n = Ce) {
  let r = e2.__wdc || (e2.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e2();
  });
  if (lo(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      co(o.parent.vnode) && uh(r, t, n, o), o = o.parent;
  }
}
function uh(e2, t, n, r) {
  let o = lo(t, e2, r, true);
  ui(() => {
    Or(r[t], o);
  }, n);
}
function lo(e2, t, n = Ce, r = false) {
  if (n) {
    let o = n[e2] || (n[e2] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      ht();
      let a = ar(n), u = Pe(t, n, e2, i);
      return a(), gt(), u;
    });
    return r ? o.unshift(s) : o.push(s), s;
  }
}
function mh(e2, t = Ce) {
  lo("ec", e2, t);
}
function Uu(e2) {
  return B(e2) ? e2.reduce((t, n) => (t[n] = null, t), {}) : e2;
}
function gh(e2) {
  let t = ci(e2), n = e2.proxy, r = e2.ctx;
  Ys = false, t.beforeCreate && qu(t.beforeCreate, e2, "bc");
  let { data: o, computed: s, methods: i, watch: a, provide: u, inject: l, created: c, beforeMount: f, mounted: m, beforeUpdate: v, updated: A, activated: w, deactivated: R, beforeDestroy: I, beforeUnmount: V, destroyed: h, unmounted: _, render: S, renderTracked: j, renderTriggered: D, errorCaptured: F, serverPrefetch: O, expose: k, inheritAttrs: K, components: $, directives: G, filters: de } = t;
  if (l && Dh(l, r, null), i)
    for (let X in i) {
      let L = i[X];
      W(L) && (r[X] = L.bind(n));
    }
  if (o) {
    let X = o.call(n, n);
    ee(X) && (e2.data = Jn(X));
  }
  if (Ys = true, s)
    for (let X in s) {
      let L = s[X], Be = W(L) ? L.bind(n, n) : W(L.get) ? L.get.bind(n, n) : he, Vn = !W(L) && W(L.set) ? L.set.bind(n) : he, kn = Gh({ get: Be, set: Vn });
      Object.defineProperty(r, X, { enumerable: true, configurable: true, get: () => kn.value, set: (dn) => kn.value = dn });
    }
  if (a)
    for (let X in a)
      yc(a[X], r, n, X);
  if (u) {
    let X = W(u) ? u.call(n) : u;
    Reflect.ownKeys(X).forEach((L) => {
      wh(L, X[L]);
    });
  }
  c && qu(c, e2, "c");
  function H(X, L) {
    B(L) ? L.forEach((Be) => X(Be.bind(n))) : L && X(L.bind(n));
  }
  if (H(ch, f), H(ii, m), H(lh, v), H(ai, A), H(ih, w), H(ah, R), H(mh, F), H(ph, j), H(fh, D), H(Dc, V), H(ui, _), H(dh, O), B(k))
    if (k.length) {
      let X = e2.exposed || (e2.exposed = {});
      k.forEach((L) => {
        Object.defineProperty(X, L, { get: () => n[L], set: (Be) => n[L] = Be });
      });
    } else
      e2.exposed || (e2.exposed = {});
  S && e2.render === he && (e2.render = S), K != null && (e2.inheritAttrs = K), $ && (e2.components = $), G && (e2.directives = G);
}
function Dh(e2, t, n = he) {
  B(e2) && (e2 = Js(e2));
  for (let r in e2) {
    let o = e2[r], s;
    ee(o) ? "default" in o ? s = Jr(o.from || r, o.default, true) : s = Jr(o.from || r) : s = Jr(o), we(s) ? Object.defineProperty(t, r, { enumerable: true, configurable: true, get: () => s.value, set: (i) => s.value = i }) : t[r] = s;
  }
}
function qu(e2, t, n) {
  Pe(B(e2) ? e2.map((r) => r.bind(t.proxy)) : e2.bind(t.proxy), t, n);
}
function yc(e2, t, n, r) {
  let o = r.includes(".") ? pc(n, r) : () => n[r];
  if (Z(e2)) {
    let s = t[e2];
    W(s) && Hs(o, s);
  } else if (W(e2))
    Hs(o, e2.bind(n));
  else if (ee(e2))
    if (B(e2))
      e2.forEach((s) => yc(s, t, n, r));
    else {
      let s = W(e2.handler) ? e2.handler.bind(n) : t[e2.handler];
      W(s) && Hs(o, s, e2);
    }
}
function ci(e2) {
  let t = e2.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: s, config: { optionMergeStrategies: i } } = e2.appContext, a = s.get(t), u;
  return a ? u = a : !o.length && !n && !r ? u = t : (u = {}, o.length && o.forEach((l) => Zr(u, l, i, true)), Zr(u, t, i)), ee(t) && s.set(t, u), u;
}
function Zr(e2, t, n, r = false) {
  let { mixins: o, extends: s } = t;
  s && Zr(e2, s, n, true), o && o.forEach((i) => Zr(e2, i, n, true));
  for (let i in t)
    if (!(r && i === "expose")) {
      let a = yh[i] || n && n[i];
      e2[i] = a ? a(e2[i], t[i]) : t[i];
    }
  return e2;
}
function Wu(e2, t) {
  return t ? e2 ? function() {
    return fe(W(e2) ? e2.call(this, this) : e2, W(t) ? t.call(this, this) : t);
  } : t : e2;
}
function _h(e2, t) {
  return er(Js(e2), Js(t));
}
function Js(e2) {
  if (B(e2)) {
    let t = {};
    for (let n = 0; n < e2.length; n++)
      t[e2[n]] = e2[n];
    return t;
  }
  return e2;
}
function Se(e2, t) {
  return e2 ? [...new Set([].concat(e2, t))] : t;
}
function er(e2, t) {
  return e2 ? fe(/* @__PURE__ */ Object.create(null), e2, t) : t;
}
function zu(e2, t) {
  return e2 ? B(e2) && B(t) ? [.../* @__PURE__ */ new Set([...e2, ...t])] : fe(/* @__PURE__ */ Object.create(null), Uu(e2), Uu(t ?? {})) : t;
}
function Eh(e2, t) {
  if (!e2)
    return t;
  if (!t)
    return e2;
  let n = fe(/* @__PURE__ */ Object.create(null), e2);
  for (let r in t)
    n[r] = Se(e2[r], t[r]);
  return n;
}
function _c() {
  return { app: null, config: { isNativeTag: fu, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
}
function bh(e2, t) {
  return function(r, o = null) {
    W(r) || (r = fe({}, r)), o != null && !ee(o) && (o = null);
    let s = _c(), i = /* @__PURE__ */ new WeakSet(), a = false, u = s.app = { _uid: vh++, _component: r, _props: o, _container: null, _context: s, _instance: null, version: nc, get config() {
      return s.config;
    }, set config(l) {
    }, use(l, ...c) {
      return i.has(l) || (l && W(l.install) ? (i.add(l), l.install(u, ...c)) : W(l) && (i.add(l), l(u, ...c))), u;
    }, mixin(l) {
      return __VUE_OPTIONS_API__ && (s.mixins.includes(l) || s.mixins.push(l)), u;
    }, component(l, c) {
      return c ? (s.components[l] = c, u) : s.components[l];
    }, directive(l, c) {
      return c ? (s.directives[l] = c, u) : s.directives[l];
    }, mount(l, c, f) {
      if (!a) {
        let m = ye(r, o);
        return m.appContext = s, f === true ? f = "svg" : f === false && (f = void 0), c && t ? t(m, l) : e2(m, l, f), a = true, u._container = l, l.__vue_app__ = u, __VUE_PROD_DEVTOOLS__ && (u._instance = m.component, qm(u, nc)), mi(m.component) || m.component.proxy;
      }
    }, unmount() {
      a && (e2(null, u._container), __VUE_PROD_DEVTOOLS__ && (u._instance = null, Wm(u)), delete u._container.__vue_app__);
    }, provide(l, c) {
      return s.provides[l] = c, u;
    }, runWithContext(l) {
      eo = u;
      try {
        return l();
      } finally {
        eo = null;
      }
    } };
    return u;
  };
}
function wh(e2, t) {
  if (Ce) {
    let n = Ce.provides, r = Ce.parent && Ce.parent.provides;
    r === n && (n = Ce.provides = Object.create(r)), n[e2] = t;
  }
}
function Jr(e2, t, n = false) {
  let r = Ce || Qe;
  if (r || eo) {
    let o = r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : eo._context.provides;
    if (o && e2 in o)
      return o[e2];
    if (arguments.length > 1)
      return n && W(t) ? t.call(r && r.proxy) : t;
  }
}
function Fh(e2, t, n, r = false) {
  let o = {}, s = {};
  vn(s, fo, 1), e2.propsDefaults = /* @__PURE__ */ Object.create(null), Ec(e2, t, o, s);
  for (let i in e2.propsOptions[0])
    i in o || (o[i] = void 0);
  n ? e2.props = r ? o : ks(o) : e2.type.props ? e2.props = o : e2.props = s, e2.attrs = s;
}
function Ch(e2, t, n, r) {
  let { props: o, attrs: s, vnode: { patchFlag: i } } = e2, a = J(o), [u] = e2.propsOptions, l = false;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      let c = e2.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let m = c[f];
        if (io(e2.emitsOptions, m))
          continue;
        let v = t[m];
        if (u)
          if (Q(s, m))
            v !== s[m] && (s[m] = v, l = true);
          else {
            let A = nt(m);
            o[A] = Xs(u, a, A, v, e2, false);
          }
        else
          v !== s[m] && (s[m] = v, l = true);
      }
    }
  } else {
    Ec(e2, t, o, s) && (l = true);
    let c;
    for (let f in a)
      (!t || !Q(t, f) && ((c = pt(f)) === f || !Q(t, c))) && (u ? n && (n[f] !== void 0 || n[c] !== void 0) && (o[f] = Xs(u, a, f, void 0, e2, true)) : delete o[f]);
    if (s !== a)
      for (let f in s)
        (!t || !Q(t, f)) && (delete s[f], l = true);
  }
  l && rt(e2, "set", "$attrs");
}
function Ec(e2, t, n, r) {
  let [o, s] = e2.propsOptions, i = false, a;
  if (t)
    for (let u in t) {
      if (_n(u))
        continue;
      let l = t[u], c;
      o && Q(o, c = nt(u)) ? !s || !s.includes(c) ? n[c] = l : (a || (a = {}))[c] = l : io(e2.emitsOptions, u) || (!(u in r) || l !== r[u]) && (r[u] = l, i = true);
    }
  if (s) {
    let u = J(n), l = a || se;
    for (let c = 0; c < s.length; c++) {
      let f = s[c];
      n[f] = Xs(o, u, f, l[f], e2, !Q(l, f));
    }
  }
  return i;
}
function Xs(e2, t, n, r, o, s) {
  let i = e2[n];
  if (i != null) {
    let a = Q(i, "default");
    if (a && r === void 0) {
      let u = i.default;
      if (i.type !== Function && !i.skipFactory && W(u)) {
        let { propsDefaults: l } = o;
        if (n in l)
          r = l[n];
        else {
          let c = ar(o);
          r = l[n] = u.call(null, t), c();
        }
      } else
        r = u;
    }
    i[0] && (s && !a ? r = false : i[1] && (r === "" || r === pt(n)) && (r = true));
  }
  return r;
}
function vc(e2, t, n = false) {
  let r = t.propsCache, o = r.get(e2);
  if (o)
    return o;
  let s = e2.props, i = {}, a = [], u = false;
  if (__VUE_OPTIONS_API__ && !W(e2)) {
    let c = (f) => {
      u = true;
      let [m, v] = vc(f, t, true);
      fe(i, m), v && a.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e2.extends && c(e2.extends), e2.mixins && e2.mixins.forEach(c);
  }
  if (!s && !u)
    return ee(e2) && r.set(e2, yn), yn;
  if (B(s))
    for (let c = 0; c < s.length; c++) {
      let f = nt(s[c]);
      Ku(f) && (i[f] = se);
    }
  else if (s)
    for (let c in s) {
      let f = nt(c);
      if (Ku(f)) {
        let m = s[c], v = i[f] = B(m) || W(m) ? { type: m } : fe({}, m);
        if (v) {
          let A = Ju(Boolean, v.type), w = Ju(String, v.type);
          v[0] = A > -1, v[1] = w < 0 || A < w, (A > -1 || Q(v, "default")) && a.push(f);
        }
      }
    }
  let l = [i, a];
  return ee(e2) && r.set(e2, l), l;
}
function Ku(e2) {
  return e2[0] !== "$";
}
function Gu(e2) {
  let t = e2 && e2.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e2 === null ? "null" : "";
}
function Yu(e2, t) {
  return Gu(e2) === Gu(t);
}
function Ju(e2, t) {
  return B(t) ? t.findIndex((n) => Yu(n, e2)) : W(t) && Yu(t, e2) ? 0 : -1;
}
function to(e2, t, n, r, o = false) {
  if (B(e2)) {
    e2.forEach((m, v) => to(m, t && (B(t) ? t[v] : t), n, r, o));
    return;
  }
  if (nr(r) && !o)
    return;
  let s = r.shapeFlag & 4 ? mi(r.component) || r.component.proxy : r.el, i = o ? null : s, { i: a, r: u } = e2, l = t && t.r, c = a.refs === se ? a.refs = {} : a.refs, f = a.setupState;
  if (l != null && l !== u && (Z(l) ? (c[l] = null, Q(f, l) && (f[l] = null)) : we(l) && (l.value = null)), W(u))
    Dt(u, a, 12, [i, c]);
  else {
    let m = Z(u), v = we(u), A = e2.f;
    if (m || v) {
      let w = () => {
        if (A) {
          let R = m ? Q(f, u) ? f[u] : c[u] : u.value;
          o ? B(R) && Or(R, s) : B(R) ? R.includes(s) || R.push(s) : m ? (c[u] = [s], Q(f, u) && (f[u] = c[u])) : (u.value = [s], e2.k && (c[e2.k] = u.value));
        } else
          m ? (c[u] = i, Q(f, u) && (f[u] = i)) : v && (u.value = i, e2.k && (c[e2.k] = i));
      };
      o || A ? w() : (w.id = -1, Oe(w, n));
    }
  }
}
function Th(e2) {
  let { mt: t, p: n, o: { patchProp: r, createText: o, nextSibling: s, parentNode: i, remove: a, insert: u, createComment: l } } = e2, c = (h, _) => {
    if (!_.hasChildNodes()) {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && Vt("Attempting to hydrate existing markup but container is empty. Performing full mount instead."), n(null, h, _), Qr(), _._vnode = h;
      return;
    }
    Pt = false, f(_.firstChild, h, null, null, null), Qr(), _._vnode = h, Pt && console.error("Hydration completed but contains mismatches.");
  }, f = (h, _, S, j, D, F = false) => {
    let O = Qn(h) && h.data === "[", k = () => w(h, _, S, j, D, O), { type: K, ref: $, shapeFlag: G, patchFlag: de } = _, ge = h.nodeType;
    _.el = h, __VUE_PROD_DEVTOOLS__ && ("__vnode" in h || Object.defineProperty(h, "__vnode", { value: _, enumerable: false }), "__vueParentComponent" in h || Object.defineProperty(h, "__vueParentComponent", { value: S, enumerable: false })), de === -2 && (F = false, _.dynamicChildren = null);
    let H = null;
    switch (K) {
      case yt:
        ge !== 3 ? _.children === "" ? (u(_.el = o(""), i(h), h), H = h) : H = k() : (h.data !== _.children && (Pt = true, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && Vt("Hydration text mismatch in", h.parentNode, `
  - rendered on server: ${JSON.stringify(h.data)}
  - expected on client: ${JSON.stringify(_.children)}`), h.data = _.children), H = s(h));
        break;
      case Ve:
        V(h) ? (H = s(h), I(_.el = h.content.firstChild, h, S)) : ge !== 8 || O ? H = k() : H = s(h);
        break;
      case Lt:
        if (O && (h = s(h), ge = h.nodeType), ge === 1 || ge === 3) {
          H = h;
          let X = !_.children.length;
          for (let L = 0; L < _.staticCount; L++)
            X && (_.children += H.nodeType === 1 ? H.outerHTML : H.data), L === _.staticCount - 1 && (_.anchor = H), H = s(H);
          return O ? s(H) : H;
        } else
          k();
        break;
      case _e:
        O ? H = A(h, _, S, j, D, F) : H = k();
        break;
      default:
        if (G & 1)
          (ge !== 1 || _.type.toLowerCase() !== h.tagName.toLowerCase()) && !V(h) ? H = k() : H = m(h, _, S, j, D, F);
        else if (G & 6) {
          _.slotScopeIds = D;
          let X = i(h);
          if (O ? H = R(h) : Qn(h) && h.data === "teleport start" ? H = R(h, h.data, "teleport end") : H = s(h), t(_, X, null, S, j, Gr(X), F), nr(_)) {
            let L;
            O ? (L = ye(_e), L.anchor = H ? H.previousSibling : X.lastChild) : L = h.nodeType === 3 ? Rc("") : ye("div"), L.el = h, _.component.subTree = L;
          }
        } else
          G & 64 ? ge !== 8 ? H = k() : H = _.type.hydrate(h, _, S, j, D, F, e2, v) : G & 128 ? H = _.type.hydrate(h, _, S, j, Gr(i(h)), D, F, e2, f) : __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && Vt("Invalid HostVNode type:", K, `(${typeof K})`);
    }
    return $ != null && to($, null, j, _), H;
  }, m = (h, _, S, j, D, F) => {
    F = F || !!_.dynamicChildren;
    let { type: O, props: k, patchFlag: K, shapeFlag: $, dirs: G, transition: de } = _, ge = O === "input" || O === "option";
    if (ge || K !== -1) {
      G && ot(_, null, S, "created");
      let H = false;
      if (V(h)) {
        H = Ac(j, de) && S && S.vnode.props && S.vnode.props.appear;
        let L = h.content.firstChild;
        H && de.beforeEnter(L), I(L, h, S), _.el = h = L;
      }
      if ($ & 16 && !(k && (k.innerHTML || k.textContent))) {
        let L = v(h.firstChild, _, h, S, j, D, F), Be = false;
        for (; L; ) {
          Pt = true, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && !Be && (Vt("Hydration children mismatch on", h, `
Server rendered element contains more child nodes than client vdom.`), Be = true);
          let Vn = L;
          L = L.nextSibling, a(Vn);
        }
      } else
        $ & 8 && h.textContent !== _.children && (Pt = true, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && Vt("Hydration text content mismatch on", h, `
  - rendered on server: ${h.textContent}
  - expected on client: ${_.children}`), h.textContent = _.children);
      if (k)
        if (ge || !F || K & 48)
          for (let L in k)
            (ge && (L.endsWith("value") || L === "indeterminate") || dt(L) && !_n(L) || L[0] === ".") && r(h, L, null, k[L], void 0, void 0, S);
        else
          k.onClick && r(h, "onClick", null, k.onClick, void 0, void 0, S);
      let X;
      (X = k && k.onVnodeBeforeMount) && Le(X, S, _), G && ot(_, null, S, "beforeMount"), ((X = k && k.onVnodeMounted) || G || H) && dc(() => {
        X && Le(X, S, _), H && de.enter(h), G && ot(_, null, S, "mounted");
      }, j);
    }
    return h.nextSibling;
  }, v = (h, _, S, j, D, F, O) => {
    O = O || !!_.dynamicChildren;
    let k = _.children, K = k.length, $ = false;
    for (let G = 0; G < K; G++) {
      let de = O ? k[G] : k[G] = Me(k[G]);
      if (h)
        h = f(h, de, j, D, F, O);
      else {
        if (de.type === yt && !de.children)
          continue;
        Pt = true, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && !$ && (Vt("Hydration children mismatch on", S, `
Server rendered element contains fewer child nodes than client vdom.`), $ = true), n(null, de, S, null, j, D, Gr(S), F);
      }
    }
    return h;
  }, A = (h, _, S, j, D, F) => {
    let { slotScopeIds: O } = _;
    O && (D = D ? D.concat(O) : O);
    let k = i(h), K = v(s(h), _, k, S, j, D, F);
    return K && Qn(K) && K.data === "]" ? s(_.anchor = K) : (Pt = true, u(_.anchor = l("]"), k, K), K);
  }, w = (h, _, S, j, D, F) => {
    if (Pt = true, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ && Vt(`Hydration node mismatch:
- rendered on server:`, h, h.nodeType === 3 ? "(text)" : Qn(h) && h.data === "[" ? "(start of fragment)" : "", `
- expected on client:`, _.type), _.el = null, F) {
      let K = R(h);
      for (; ; ) {
        let $ = s(h);
        if ($ && $ !== K)
          a($);
        else
          break;
      }
    }
    let O = s(h), k = i(h);
    return a(h), n(null, _, k, O, S, j, Gr(k), D), O;
  }, R = (h, _ = "[", S = "]") => {
    let j = 0;
    for (; h; )
      if (h = s(h), h && Qn(h) && (h.data === _ && j++, h.data === S)) {
        if (j === 0)
          return s(h);
        j--;
      }
    return h;
  }, I = (h, _, S) => {
    let j = _.parentNode;
    j && j.replaceChild(h, _);
    let D = S;
    for (; D; )
      D.vnode.el === _ && (D.vnode.el = D.subTree.el = h), D = D.parent;
  }, V = (h) => h.nodeType === 1 && h.tagName.toLowerCase() === "template";
  return [c, f];
}
function Rh() {
  let e2 = [];
  typeof __VUE_OPTIONS_API__ != "boolean" && (Ot().__VUE_OPTIONS_API__ = true), typeof __VUE_PROD_DEVTOOLS__ != "boolean" && (Ot().__VUE_PROD_DEVTOOLS__ = false), typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (Ot().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false);
}
function Cc(e2) {
  return Nc(e2);
}
function xc(e2) {
  return Nc(e2, Th);
}
function Nc(e2, t) {
  Rh();
  let n = Ot();
  n.__VUE__ = true, __VUE_PROD_DEVTOOLS__ && ac(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  let { insert: r, remove: o, patchProp: s, createElement: i, createText: a, createComment: u, setText: l, setElementText: c, parentNode: f, nextSibling: m, setScopeId: v = he, insertStaticContent: A } = e2, w = (d, p, g, y = null, E = null, x = null, T = void 0, C = null, N = !!p.dynamicChildren) => {
    if (d === p)
      return;
    d && !un(d, p) && (y = pr(d), Ct(d, E, x, true), d = null), p.patchFlag === -2 && (N = false, p.dynamicChildren = null);
    let { type: b, ref: P, shapeFlag: U } = p;
    switch (b) {
      case yt:
        R(d, p, g, y);
        break;
      case Ve:
        I(d, p, g, y);
        break;
      case Lt:
        d == null && V(p, g, y, T);
        break;
      case _e:
        G(d, p, g, y, E, x, T, C, N);
        break;
      default:
        U & 1 ? j(d, p, g, y, E, x, T, C, N) : U & 6 ? de(d, p, g, y, E, x, T, C, N) : (U & 64 || U & 128) && b.process(d, p, g, y, E, x, T, C, N, fn);
    }
    P != null && E && to(P, d && d.ref, x, p || d, !p);
  }, R = (d, p, g, y) => {
    if (d == null)
      r(p.el = a(p.children), g, y);
    else {
      let E = p.el = d.el;
      p.children !== d.children && l(E, p.children);
    }
  }, I = (d, p, g, y) => {
    d == null ? r(p.el = u(p.children || ""), g, y) : p.el = d.el;
  }, V = (d, p, g, y) => {
    [d.el, d.anchor] = A(d.children, p, g, y, d.el, d.anchor);
  }, h = (d, p, g, y) => {
    if (p.children !== d.children) {
      let E = m(d.anchor);
      S(d), [p.el, p.anchor] = A(p.children, g, E, y);
    } else
      p.el = d.el, p.anchor = d.anchor;
  }, _ = ({ el: d, anchor: p }, g, y) => {
    let E;
    for (; d && d !== p; )
      E = m(d), r(d, g, y), d = E;
    r(p, g, y);
  }, S = ({ el: d, anchor: p }) => {
    let g;
    for (; d && d !== p; )
      g = m(d), o(d), d = g;
    o(p);
  }, j = (d, p, g, y, E, x, T, C, N) => {
    p.type === "svg" ? T = "svg" : p.type === "math" && (T = "mathml"), d == null ? D(p, g, y, E, x, T, C, N) : k(d, p, E, x, T, C, N);
  }, D = (d, p, g, y, E, x, T, C) => {
    let N, b, { props: P, shapeFlag: U, transition: M, dirs: z } = d;
    if (N = d.el = i(d.type, x, P && P.is, P), U & 8 ? c(N, d.children) : U & 16 && O(d.children, N, null, y, E, Ws(d, x), T, C), z && ot(d, null, y, "created"), F(N, d, d.scopeId, T, y), P) {
      for (let re in P)
        re !== "value" && !_n(re) && s(N, re, null, P[re], x, d.children, y, E, ut);
      "value" in P && s(N, "value", null, P.value, x), (b = P.onVnodeBeforeMount) && Le(b, y, d);
    }
    __VUE_PROD_DEVTOOLS__ && (Object.defineProperty(N, "__vnode", { value: d, enumerable: false }), Object.defineProperty(N, "__vueParentComponent", { value: y, enumerable: false })), z && ot(d, null, y, "beforeMount");
    let Y = Ac(E, M);
    Y && M.beforeEnter(N), r(N, p, g), ((b = P && P.onVnodeMounted) || Y || z) && Oe(() => {
      b && Le(b, y, d), Y && M.enter(N), z && ot(d, null, y, "mounted");
    }, E);
  }, F = (d, p, g, y, E) => {
    if (g && v(d, g), y)
      for (let x = 0; x < y.length; x++)
        v(d, y[x]);
    if (E) {
      let x = E.subTree;
      if (p === x) {
        let T = E.vnode;
        F(d, T, T.scopeId, T.slotScopeIds, E.parent);
      }
    }
  }, O = (d, p, g, y, E, x, T, C, N = 0) => {
    for (let b = N; b < d.length; b++) {
      let P = d[b] = C ? It(d[b]) : Me(d[b]);
      w(null, P, p, g, y, E, x, T, C);
    }
  }, k = (d, p, g, y, E, x, T) => {
    let C = p.el = d.el, { patchFlag: N, dynamicChildren: b, dirs: P } = p;
    N |= d.patchFlag & 16;
    let U = d.props || se, M = p.props || se, z;
    if (g && sn(g, false), (z = M.onVnodeBeforeUpdate) && Le(z, g, p, d), P && ot(p, d, g, "beforeUpdate"), g && sn(g, true), b ? K(d.dynamicChildren, b, C, g, y, Ws(p, E), x) : T || Be(d, p, C, null, g, y, Ws(p, E), x, false), N > 0) {
      if (N & 16)
        $(C, p, U, M, g, y, E);
      else if (N & 2 && U.class !== M.class && s(C, "class", null, M.class, E), N & 4 && s(C, "style", U.style, M.style, E), N & 8) {
        let Y = p.dynamicProps;
        for (let re = 0; re < Y.length; re++) {
          let ue = Y[re], De = U[ue], We = M[ue];
          (We !== De || ue === "value") && s(C, ue, De, We, E, d.children, g, y, ut);
        }
      }
      N & 1 && d.children !== p.children && c(C, p.children);
    } else
      !T && b == null && $(C, p, U, M, g, y, E);
    ((z = M.onVnodeUpdated) || P) && Oe(() => {
      z && Le(z, g, p, d), P && ot(p, d, g, "updated");
    }, y);
  }, K = (d, p, g, y, E, x, T) => {
    for (let C = 0; C < p.length; C++) {
      let N = d[C], b = p[C], P = N.el && (N.type === _e || !un(N, b) || N.shapeFlag & 70) ? f(N.el) : g;
      w(N, b, P, null, y, E, x, T, true);
    }
  }, $ = (d, p, g, y, E, x, T) => {
    if (g !== y) {
      if (g !== se)
        for (let C in g)
          !_n(C) && !(C in y) && s(d, C, g[C], null, T, p.children, E, x, ut);
      for (let C in y) {
        if (_n(C))
          continue;
        let N = y[C], b = g[C];
        N !== b && C !== "value" && s(d, C, b, N, T, p.children, E, x, ut);
      }
      "value" in y && s(d, "value", g.value, y.value, T);
    }
  }, G = (d, p, g, y, E, x, T, C, N) => {
    let b = p.el = d ? d.el : a(""), P = p.anchor = d ? d.anchor : a(""), { patchFlag: U, dynamicChildren: M, slotScopeIds: z } = p;
    z && (C = C ? C.concat(z) : z), d == null ? (r(b, g, y), r(P, g, y), O(p.children || [], g, P, E, x, T, C, N)) : U > 0 && U & 64 && M && d.dynamicChildren ? (K(d.dynamicChildren, M, g, E, x, T, C), (p.key != null || E && p === E.subTree) && Sc(d, p, true)) : Be(d, p, g, P, E, x, T, C, N);
  }, de = (d, p, g, y, E, x, T, C, N) => {
    p.slotScopeIds = C, d == null ? p.shapeFlag & 512 ? E.ctx.activate(p, g, y, T, N) : ge(p, g, y, E, x, T, N) : H(d, p, N);
  }, ge = (d, p, g, y, E, x, T) => {
    let C = d.component = $c(d, y, E);
    if (co(d) && (C.ctx.renderer = fn), Vc(C), C.asyncDep) {
      if (E && E.registerDep(C, X), !d.el) {
        let N = C.subTree = ye(Ve);
        I(null, N, p, g);
      }
    } else
      X(C, d, p, g, E, x, T);
  }, H = (d, p, g) => {
    let y = p.component = d.component;
    if (eh(d, p, g))
      if (y.asyncDep && !y.asyncResolved) {
        L(y, p, g);
        return;
      } else
        y.next = p, jm(y.update), y.effect.dirty = true, y.update();
    else
      p.el = d.el, y.vnode = p;
  }, X = (d, p, g, y, E, x, T) => {
    let C = () => {
      if (d.isMounted) {
        let { next: P, bu: U, u: M, parent: z, vnode: Y } = d;
        {
          let pn = Oc(d);
          if (pn) {
            P && (P.el = Y.el, L(d, P, T)), pn.asyncDep.then(() => {
              d.isUnmounted || C();
            });
            return;
          }
        }
        let re = P, ue;
        sn(d, false), P ? (P.el = Y.el, L(d, P, T)) : P = Y, U && En(U), (ue = P.props && P.props.onVnodeBeforeUpdate) && Le(ue, z, P, Y), sn(d, true);
        let De = Yr(d), We = d.subTree;
        d.subTree = De, w(We, De, f(We.el), pr(We), d, E, x), P.el = De.el, re === null && th(d, De.el), M && Oe(M, E), (ue = P.props && P.props.onVnodeUpdated) && Oe(() => Le(ue, z, P, Y), E), __VUE_PROD_DEVTOOLS__ && uc(d);
      } else {
        let P, { el: U, props: M } = p, { bm: z, m: Y, parent: re } = d, ue = nr(p);
        if (sn(d, false), z && En(z), !ue && (P = M && M.onVnodeBeforeMount) && Le(P, re, p), sn(d, true), U && xo) {
          let De = () => {
            d.subTree = Yr(d), xo(U, d.subTree, d, E, null);
          };
          ue ? p.type.__asyncLoader().then(() => !d.isUnmounted && De()) : De();
        } else {
          let De = d.subTree = Yr(d);
          w(null, De, g, y, d, E, x), p.el = De.el;
        }
        if (Y && Oe(Y, E), !ue && (P = M && M.onVnodeMounted)) {
          let De = p;
          Oe(() => Le(P, re, De), E);
        }
        (p.shapeFlag & 256 || re && nr(re.vnode) && re.vnode.shapeFlag & 256) && d.a && Oe(d.a, E), d.isMounted = true, __VUE_PROD_DEVTOOLS__ && zm(d), p = g = y = null;
      }
    }, N = d.effect = new rn(C, he, () => ti(b), d.scope), b = d.update = () => {
      N.dirty && N.run();
    };
    b.id = d.uid, sn(d, true), b();
  }, L = (d, p, g) => {
    p.component = d;
    let y = d.vnode.props;
    d.vnode = p, d.next = null, Ch(d, p.props, y, g), Ah(d, p.children, g), ht(), Mu(d), gt();
  }, Be = (d, p, g, y, E, x, T, C, N = false) => {
    let b = d && d.children, P = d ? d.shapeFlag : 0, U = p.children, { patchFlag: M, shapeFlag: z } = p;
    if (M > 0) {
      if (M & 128) {
        kn(b, U, g, y, E, x, T, C, N);
        return;
      } else if (M & 256) {
        Vn(b, U, g, y, E, x, T, C, N);
        return;
      }
    }
    z & 8 ? (P & 16 && ut(b, E, x), U !== b && c(g, U)) : P & 16 ? z & 16 ? kn(b, U, g, y, E, x, T, C, N) : ut(b, E, x, true) : (P & 8 && c(g, ""), z & 16 && O(U, g, y, E, x, T, C, N));
  }, Vn = (d, p, g, y, E, x, T, C, N) => {
    d = d || yn, p = p || yn;
    let b = d.length, P = p.length, U = Math.min(b, P), M;
    for (M = 0; M < U; M++) {
      let z = p[M] = N ? It(p[M]) : Me(p[M]);
      w(d[M], z, g, null, E, x, T, C, N);
    }
    b > P ? ut(d, E, x, true, false, U) : O(p, g, y, E, x, T, C, N, U);
  }, kn = (d, p, g, y, E, x, T, C, N) => {
    let b = 0, P = p.length, U = d.length - 1, M = P - 1;
    for (; b <= U && b <= M; ) {
      let z = d[b], Y = p[b] = N ? It(p[b]) : Me(p[b]);
      if (un(z, Y))
        w(z, Y, g, null, E, x, T, C, N);
      else
        break;
      b++;
    }
    for (; b <= U && b <= M; ) {
      let z = d[U], Y = p[M] = N ? It(p[M]) : Me(p[M]);
      if (un(z, Y))
        w(z, Y, g, null, E, x, T, C, N);
      else
        break;
      U--, M--;
    }
    if (b > U) {
      if (b <= M) {
        let z = M + 1, Y = z < P ? p[z].el : y;
        for (; b <= M; )
          w(null, p[b] = N ? It(p[b]) : Me(p[b]), g, Y, E, x, T, C, N), b++;
      }
    } else if (b > M)
      for (; b <= U; )
        Ct(d[b], E, x, true), b++;
    else {
      let z = b, Y = b, re = /* @__PURE__ */ new Map();
      for (b = Y; b <= M; b++) {
        let Re = p[b] = N ? It(p[b]) : Me(p[b]);
        Re.key != null && re.set(Re.key, b);
      }
      let ue, De = 0, We = M - Y + 1, pn = false, ia = 0, Bn = new Array(We);
      for (b = 0; b < We; b++)
        Bn[b] = 0;
      for (b = z; b <= U; b++) {
        let Re = d[b];
        if (De >= We) {
          Ct(Re, E, x, true);
          continue;
        }
        let Ze;
        if (Re.key != null)
          Ze = re.get(Re.key);
        else
          for (ue = Y; ue <= M; ue++)
            if (Bn[ue - Y] === 0 && un(Re, p[ue])) {
              Ze = ue;
              break;
            }
        Ze === void 0 ? Ct(Re, E, x, true) : (Bn[Ze - Y] = b + 1, Ze >= ia ? ia = Ze : pn = true, w(Re, p[Ze], g, null, E, x, T, C, N), De++);
      }
      let aa = pn ? $h(Bn) : yn;
      for (ue = aa.length - 1, b = We - 1; b >= 0; b--) {
        let Re = Y + b, Ze = p[Re], ua = Re + 1 < P ? p[Re + 1].el : y;
        Bn[b] === 0 ? w(null, Ze, g, ua, E, x, T, C, N) : pn && (ue < 0 || b !== aa[ue] ? dn(Ze, g, ua, 2) : ue--);
      }
    }
  }, dn = (d, p, g, y, E = null) => {
    let { el: x, type: T, transition: C, children: N, shapeFlag: b } = d;
    if (b & 6) {
      dn(d.component.subTree, p, g, y);
      return;
    }
    if (b & 128) {
      d.suspense.move(p, g, y);
      return;
    }
    if (b & 64) {
      T.move(d, p, g, fn);
      return;
    }
    if (T === _e) {
      r(x, p, g);
      for (let U = 0; U < N.length; U++)
        dn(N[U], p, g, y);
      r(d.anchor, p, g);
      return;
    }
    if (T === Lt) {
      _(d, p, g);
      return;
    }
    if (y !== 2 && b & 1 && C)
      if (y === 0)
        C.beforeEnter(x), r(x, p, g), Oe(() => C.enter(x), E);
      else {
        let { leave: U, delayLeave: M, afterLeave: z } = C, Y = () => r(x, p, g), re = () => {
          U(x, () => {
            Y(), z && z();
          });
        };
        M ? M(x, Y, re) : re();
      }
    else
      r(x, p, g);
  }, Ct = (d, p, g, y = false, E = false) => {
    let { type: x, props: T, ref: C, children: N, dynamicChildren: b, shapeFlag: P, patchFlag: U, dirs: M } = d;
    if (C != null && to(C, null, g, d, true), P & 256) {
      p.ctx.deactivate(d);
      return;
    }
    let z = P & 1 && M, Y = !nr(d), re;
    if (Y && (re = T && T.onVnodeBeforeUnmount) && Le(re, p, d), P & 6)
      _f2(d.component, g, y);
    else {
      if (P & 128) {
        d.suspense.unmount(g, y);
        return;
      }
      z && ot(d, null, p, "beforeUnmount"), P & 64 ? d.type.remove(d, p, g, E, fn, y) : b && (x !== _e || U > 0 && U & 64) ? ut(b, p, g, false, true) : (x === _e && U & 384 || !E && P & 16) && ut(N, p, g), y && oa(d);
    }
    (Y && (re = T && T.onVnodeUnmounted) || z) && Oe(() => {
      re && Le(re, p, d), z && ot(d, null, p, "unmounted");
    }, g);
  }, oa = (d) => {
    let { type: p, el: g, anchor: y, transition: E } = d;
    if (p === _e) {
      yf(g, y);
      return;
    }
    if (p === Lt) {
      S(d);
      return;
    }
    let x = () => {
      o(g), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (d.shapeFlag & 1 && E && !E.persisted) {
      let { leave: T, delayLeave: C } = E, N = () => T(g, x);
      C ? C(d.el, x, N) : N();
    } else
      x();
  }, yf = (d, p) => {
    let g;
    for (; d !== p; )
      g = m(d), o(d), d = g;
    o(p);
  }, _f2 = (d, p, g) => {
    let { bum: y, scope: E, update: x, subTree: T, um: C } = d;
    y && En(y), E.stop(), x && (x.active = false, Ct(T, d, p, g)), C && Oe(C, p), Oe(() => {
      d.isUnmounted = true;
    }, p), p && p.pendingBranch && !p.isUnmounted && d.asyncDep && !d.asyncResolved && d.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve()), __VUE_PROD_DEVTOOLS__ && Gm(d);
  }, ut = (d, p, g, y = false, E = false, x = 0) => {
    for (let T = x; T < d.length; T++)
      Ct(d[T], p, g, y, E);
  }, pr = (d) => d.shapeFlag & 6 ? pr(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : m(d.anchor || d.el), Fo = false, sa = (d, p, g) => {
    d == null ? p._vnode && Ct(p._vnode, null, null, true) : w(p._vnode || null, d, p, null, null, null, g), Fo || (Fo = true, Mu(), Qr(), Fo = false), p._vnode = d;
  }, fn = { p: w, um: Ct, m: dn, r: oa, mt: ge, mc: O, pc: Be, pbc: K, n: pr, o: e2 }, Co, xo;
  return t && ([Co, xo] = t(fn)), { render: sa, hydrate: Co, createApp: bh(sa, Co) };
}
function Ws({ type: e2, props: t }, n) {
  return n === "svg" && e2 === "foreignObject" || n === "mathml" && e2 === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function sn({ effect: e2, update: t }, n) {
  e2.allowRecurse = t.allowRecurse = n;
}
function Ac(e2, t) {
  return (!e2 || e2 && !e2.pendingBranch) && t && !t.persisted;
}
function Sc(e2, t, n = false) {
  let r = e2.children, o = t.children;
  if (B(r) && B(o))
    for (let s = 0; s < r.length; s++) {
      let i = r[s], a = o[s];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[s] = It(o[s]), a.el = i.el), n || Sc(i, a)), a.type === yt && (a.el = i.el);
    }
}
function $h(e2) {
  let t = e2.slice(), n = [0], r, o, s, i, a, u = e2.length;
  for (r = 0; r < u; r++) {
    let l = e2[r];
    if (l !== 0) {
      if (o = n[n.length - 1], e2[o] < l) {
        t[r] = o, n.push(r);
        continue;
      }
      for (s = 0, i = n.length - 1; s < i; )
        a = s + i >> 1, e2[n[a]] < l ? s = a + 1 : i = a;
      l < e2[n[s]] && (s > 0 && (t[r] = n[s - 1]), n[s] = r);
    }
  }
  for (s = n.length, i = n[s - 1]; s-- > 0; )
    n[s] = i, i = t[i];
  return n;
}
function Oc(e2) {
  let t = e2.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Oc(t);
}
function Xu(e2) {
  di += e2;
}
function no(e2) {
  return e2 ? e2.__v_isVNode === true : false;
}
function un(e2, t) {
  return e2.type === t.type && e2.key === t.key;
}
function kh(e2, t = null, n = null, r = 0, o = null, s = e2 === _e ? 0 : 1, i = false, a = false) {
  let u = { __v_isVNode: true, __v_skip: true, type: e2, props: t, key: t && Tc(t), ref: t && Xr(t), scopeId: lc, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetAnchor: null, staticCount: 0, shapeFlag: s, patchFlag: r, dynamicProps: o, dynamicChildren: null, appContext: null, ctx: Qe };
  return a ? (fi(u, n), s & 128 && e2.normalize(u)) : n && (u.shapeFlag |= Z(n) ? 8 : 16), di > 0 && !i && xn && (u.patchFlag > 0 || s & 6) && u.patchFlag !== 32 && xn.push(u), u;
}
function Bh(e2, t = null, n = null, r = 0, o = null, s = false) {
  if ((!e2 || e2 === nh) && (e2 = Ve), no(e2)) {
    let a = Mt(e2, t, true);
    return n && fi(a, n), di > 0 && !s && xn && (a.shapeFlag & 6 ? xn[xn.indexOf(e2)] = a : xn.push(a)), a.patchFlag |= -2, a;
  }
  if (Kh(e2) && (e2 = e2.__vccOpts), t) {
    t = Ih(t);
    let { class: a, style: u } = t;
    a && !Z(a) && (t.class = en(a)), ee(u) && (Ur(u) && !B(u) && (u = fe({}, u)), t.style = Zt(u));
  }
  let i = Z(e2) ? 1 : rh(e2) ? 128 : Ph(e2) ? 64 : ee(e2) ? 4 : W(e2) ? 2 : 0;
  return kh(e2, t, n, r, o, i, s, true);
}
function Ih(e2) {
  return e2 ? Ur(e2) || fo in e2 ? fe({}, e2) : e2 : null;
}
function Mt(e2, t, n = false) {
  let { props: r, ref: o, patchFlag: s, children: i } = e2, a = t ? ae(r || {}, t) : r;
  return { __v_isVNode: true, __v_skip: true, type: e2.type, props: a, key: a && Tc(a), ref: t && t.ref ? n && o ? B(o) ? o.concat(Xr(t)) : [o, Xr(t)] : Xr(t) : o, scopeId: e2.scopeId, slotScopeIds: e2.slotScopeIds, children: i, target: e2.target, targetAnchor: e2.targetAnchor, staticCount: e2.staticCount, shapeFlag: e2.shapeFlag, patchFlag: t && e2.type !== _e ? s === -1 ? 16 : s | 16 : s, dynamicProps: e2.dynamicProps, dynamicChildren: e2.dynamicChildren, appContext: e2.appContext, dirs: e2.dirs, transition: e2.transition, component: e2.component, suspense: e2.suspense, ssContent: e2.ssContent && Mt(e2.ssContent), ssFallback: e2.ssFallback && Mt(e2.ssFallback), el: e2.el, anchor: e2.anchor, ctx: e2.ctx, ce: e2.ce };
}
function Rc(e2 = " ", t = 0) {
  return ye(yt, null, e2, t);
}
function Me(e2) {
  return e2 == null || typeof e2 == "boolean" ? ye(Ve) : B(e2) ? ye(_e, null, e2.slice()) : typeof e2 == "object" ? It(e2) : ye(yt, null, String(e2));
}
function It(e2) {
  return e2.el === null && e2.patchFlag !== -1 || e2.memo ? e2 : Mt(e2);
}
function fi(e2, t) {
  let n = 0, { shapeFlag: r } = e2;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      let o = t.default;
      o && (o._c && (o._d = false), fi(e2, o()), o._c && (o._d = true));
      return;
    } else {
      n = 32;
      let o = t._;
      !o && !(fo in t) ? t._ctx = Qe : o === 3 && Qe && (Qe.slots._ === 1 ? t._ = 1 : (t._ = 2, e2.patchFlag |= 1024));
    }
  else
    W(t) ? (t = { default: t, _ctx: Qe }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [Rc(t)]) : n = 8);
  e2.children = t, e2.shapeFlag |= n;
}
function ae(...e2) {
  let t = {};
  for (let n = 0; n < e2.length; n++) {
    let r = e2[n];
    for (let o in r)
      if (o === "class")
        t.class !== r.class && (t.class = en([t.class, r.class]));
      else if (o === "style")
        t.style = Zt([t.style, r.style]);
      else if (dt(o)) {
        let s = t[o], i = r[o];
        i && s !== i && !(B(s) && s.includes(i)) && (t[o] = s ? [].concat(s, i) : i);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
function Le(e2, t, n, r = null) {
  Pe(e2, t, 7, [n, r]);
}
function $c(e2, t, n) {
  let r = e2.type, o = (t ? t.appContext : e2.appContext) || Lh, s = { uid: Mh++, vnode: e2, type: r, parent: t, appContext: o, root: null, next: null, subTree: null, effect: null, update: null, scope: new Yn(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(o.provides), accessCache: null, renderCache: [], components: null, directives: null, propsOptions: vc(r, o), emitsOptions: cc(r, o), emit: null, emitted: null, propsDefaults: se, inheritAttrs: r.inheritAttrs, ctx: se, data: se, props: se, attrs: se, slots: se, refs: se, setupState: se, setupContext: null, attrsProxy: null, slotsProxy: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
  return s.ctx = { _: s }, s.root = t ? t.root : s, s.emit = Jm.bind(null, s), e2.ce && e2.ce(s), s;
}
function Pc(e2) {
  return e2.vnode.shapeFlag & 4;
}
function Vc(e2, t = false) {
  t && Qs(t);
  let { props: n, children: r } = e2.vnode, o = Pc(e2);
  Fh(e2, n, o, t), Nh(e2, r);
  let s = o ? jh(e2, t) : void 0;
  return t && Qs(false), s;
}
function jh(e2, t) {
  var n;
  let r = e2.type;
  e2.accessCache = /* @__PURE__ */ Object.create(null), e2.proxy = qr(new Proxy(e2.ctx, hh));
  let { setup: o } = r;
  if (o) {
    let s = e2.setupContext = o.length > 1 ? Uh(e2) : null, i = ar(e2);
    ht();
    let a = Dt(o, e2, 0, [e2.props, s]);
    if (gt(), i(), Xt(a)) {
      if (a.then(Qu, Qu), t)
        return a.then((u) => {
          Zu(e2, u, t);
        }).catch((u) => {
          oo(u, e2, 0);
        });
      e2.asyncDep = a;
    } else
      Zu(e2, a, t);
  } else
    kc(e2, t);
}
function Zu(e2, t, n) {
  W(t) ? e2.type.__ssrInlineRender ? e2.ssrRender = t : e2.render = t : ee(t) && (__VUE_PROD_DEVTOOLS__ && (e2.devtoolsRawSetupState = t), e2.setupState = Wr(t)), kc(e2, n);
}
function kc(e2, t, n) {
  let r = e2.type;
  if (!e2.render) {
    if (!t && ec && !r.render) {
      let o = r.template || ci(e2).template;
      if (o) {
        let { isCustomElement: s, compilerOptions: i } = e2.appContext.config, { delimiters: a, compilerOptions: u } = r, l = fe(fe({ isCustomElement: s, delimiters: a }, i), u);
        r.render = ec(o, l);
      }
    }
    e2.render = r.render || he, tc && tc(e2);
  }
  if (__VUE_OPTIONS_API__) {
    let o = ar(e2);
    ht();
    try {
      gh(e2);
    } finally {
      gt(), o();
    }
  }
}
function Hh(e2) {
  return e2.attrsProxy || (e2.attrsProxy = new Proxy(e2.attrs, { get(t, n) {
    return Ae(e2, "get", "$attrs"), t[n];
  } }));
}
function Uh(e2) {
  let t = (n) => {
    e2.exposed = n || {};
  };
  return { get attrs() {
    return Hh(e2);
  }, slots: e2.slots, emit: e2.emit, expose: t };
}
function mi(e2) {
  if (e2.exposed)
    return e2.exposeProxy || (e2.exposeProxy = new Proxy(Wr(qr(e2.exposed)), { get(t, n) {
      if (n in t)
        return t[n];
      if (n in rr)
        return rr[n](e2);
    }, has(t, n) {
      return n in t || n in rr;
    } }));
}
function zh(e2, t = true) {
  return W(e2) ? e2.displayName || e2.name : e2.name || t && e2.__name;
}
function Bc(e2, t, n = false) {
  let r = zh(t);
  if (!r && t.__file) {
    let o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e2 && e2.parent) {
    let o = (s) => {
      for (let i in s)
        if (s[i] === t)
          return i;
    };
    r = o(e2.components || e2.parent.type.components) || o(e2.appContext.components);
  }
  return r ? Wh(r) : n ? "App" : "Anonymous";
}
function Kh(e2) {
  return W(e2) && "__vccOpts" in e2;
}
function On(e2, t, n) {
  let r = arguments.length;
  return r === 2 ? ee(t) && !B(t) ? no(t) ? ye(e2, null, [t]) : ye(e2, t) : ye(e2, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && no(n) && (n = [n]), ye(e2, t, n));
}
var tr;
var or;
var zs;
var Fe;
var st;
var Nn;
var kt;
var an;
var oc;
var Zs;
var sr;
var Um;
var it;
var Zn;
var Ks;
var zm;
var uc;
var Km;
var Gm;
var Qe;
var lc;
var Qm;
var Zm;
var nh;
var rh;
var ao;
var ie;
var zr;
var Bt;
var Kr;
var Ie;
var oi;
var sh;
var mc;
var nr;
var co;
var _t;
var ch;
var ii;
var lh;
var ai;
var Dc;
var ui;
var dh;
var fh;
var ph;
var Gs;
var rr;
var qs;
var hh;
var Ys;
var yh;
var vh;
var eo;
var bc;
var li;
var xh;
var wc;
var Fc;
var Nh;
var Ah;
var Pt;
var Sh;
var Oh;
var Gr;
var Qn;
var Oe;
var Ph;
var _e;
var yt;
var Ve;
var Lt;
var Vh;
var xn;
var di;
var fo;
var Tc;
var Xr;
var ye;
var Lh;
var Mh;
var Ce;
var pi;
var ro;
var Qs;
var ar;
var Qu;
var po;
var ec;
var tc;
var qh;
var Wh;
var Gh;
var nc;
var Tn;
var Yh;
var mo;
var hi = te(() => {
  js();
  js();
  Fn();
  Fn();
  tr = [];
  or = false, zs = false, Fe = [], st = 0, Nn = [], kt = null, an = 0, oc = Promise.resolve(), Zs = null;
  sr = (e2) => e2.id == null ? 1 / 0 : e2.id, Um = (e2, t) => {
    let n = sr(e2) - sr(t);
    if (n === 0) {
      if (e2.pre && !t.pre)
        return -1;
      if (t.pre && !e2.pre)
        return 1;
    }
    return n;
  };
  Zn = [], Ks = false;
  zm = ni("component:added"), uc = ni("component:updated"), Km = ni("component:removed"), Gm = (e2) => {
    it && typeof it.cleanupBuffer == "function" && !it.cleanupBuffer(e2) && Km(e2);
  };
  Qe = null, lc = null;
  Qm = (e2) => {
    let t;
    for (let n in e2)
      (n === "class" || n === "style" || dt(n)) && ((t || (t = {}))[n] = e2[n]);
    return t;
  }, Zm = (e2, t) => {
    let n = {};
    for (let r in e2)
      (!Wn(r) || !(r.slice(9) in t)) && (n[r] = e2[r]);
    return n;
  };
  nh = Symbol.for("v-ndc"), rh = (e2) => e2.__isSuspense;
  ao = Symbol.for("v-scx"), ie = () => {
    {
      let e2 = Jr(ao);
      return e2;
    }
  }, zr = {};
  Bt = Symbol("_leaveCb"), Kr = Symbol("_enterCb");
  Ie = [Function, Array], oi = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: Ie, onEnter: Ie, onAfterEnter: Ie, onEnterCancelled: Ie, onBeforeLeave: Ie, onLeave: Ie, onAfterLeave: Ie, onLeaveCancelled: Ie, onBeforeAppear: Ie, onAppear: Ie, onAfterAppear: Ie, onAppearCancelled: Ie }, sh = { name: "BaseTransition", props: oi, setup(e2, { slots: t }) {
    let n = pi(), r = ri(), o;
    return () => {
      let s = t.default && uo(t.default(), true);
      if (!s || !s.length)
        return;
      let i = s[0];
      if (s.length > 1) {
        let w = false;
        for (let R of s)
          if (R.type !== Ve) {
            i = R, w = true;
            break;
          }
      }
      let a = J(e2), { mode: u } = a;
      if (r.isLeaving)
        return Us(i);
      let l = Hu(i);
      if (!l)
        return Us(i);
      let c = An(l, a, r, n);
      Sn(l, c);
      let f = n.subTree, m = f && Hu(f), v = false, { getTransitionKey: A } = l.type;
      if (A) {
        let w = A();
        o === void 0 ? o = w : w !== o && (o = w, v = true);
      }
      if (m && m.type !== Ve && (!un(l, m) || v)) {
        let w = An(m, a, r, n);
        if (Sn(m, w), u === "out-in")
          return r.isLeaving = true, w.afterLeave = () => {
            r.isLeaving = false, n.update.active !== false && (n.effect.dirty = true, n.update());
          }, Us(i);
        u === "in-out" && l.type !== Ve && (w.delayLeave = (R, I, V) => {
          let h = hc(r, m);
          h[String(m.key)] = m, R[Bt] = () => {
            I(), R[Bt] = void 0, delete c.delayedLeave;
          }, c.delayedLeave = V;
        });
      }
      return i;
    };
  } }, mc = sh;
  nr = (e2) => !!e2.type.__asyncLoader;
  co = (e2) => e2.type.__isKeepAlive;
  _t = (e2) => (t, n = Ce) => (!po || e2 === "sp") && lo(e2, (...r) => t(...r), n), ch = _t("bm"), ii = _t("m"), lh = _t("bu"), ai = _t("u"), Dc = _t("bum"), ui = _t("um"), dh = _t("sp"), fh = _t("rtg"), ph = _t("rtc");
  Gs = (e2) => e2 ? Pc(e2) ? mi(e2) || e2.proxy : Gs(e2.parent) : null, rr = fe(/* @__PURE__ */ Object.create(null), { $: (e2) => e2, $el: (e2) => e2.vnode.el, $data: (e2) => e2.data, $props: (e2) => e2.props, $attrs: (e2) => e2.attrs, $slots: (e2) => e2.slots, $refs: (e2) => e2.refs, $parent: (e2) => Gs(e2.parent), $root: (e2) => Gs(e2.root), $emit: (e2) => e2.emit, $options: (e2) => __VUE_OPTIONS_API__ ? ci(e2) : e2.type, $forceUpdate: (e2) => e2.f || (e2.f = () => {
    e2.effect.dirty = true, ti(e2.update);
  }), $nextTick: (e2) => e2.n || (e2.n = ei.bind(e2.proxy)), $watch: (e2) => __VUE_OPTIONS_API__ ? oh.bind(e2) : he }), qs = (e2, t) => e2 !== se && !e2.__isScriptSetup && Q(e2, t), hh = { get({ _: e2 }, t) {
    let { ctx: n, setupState: r, data: o, props: s, accessCache: i, type: a, appContext: u } = e2, l;
    if (t[0] !== "$") {
      let v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (qs(r, t))
          return i[t] = 1, r[t];
        if (o !== se && Q(o, t))
          return i[t] = 2, o[t];
        if ((l = e2.propsOptions[0]) && Q(l, t))
          return i[t] = 3, s[t];
        if (n !== se && Q(n, t))
          return i[t] = 4, n[t];
        (!__VUE_OPTIONS_API__ || Ys) && (i[t] = 0);
      }
    }
    let c = rr[t], f, m;
    if (c)
      return t === "$attrs" && Ae(e2, "get", t), c(e2);
    if ((f = a.__cssModules) && (f = f[t]))
      return f;
    if (n !== se && Q(n, t))
      return i[t] = 4, n[t];
    if (m = u.config.globalProperties, Q(m, t))
      return m[t];
  }, set({ _: e2 }, t, n) {
    let { data: r, setupState: o, ctx: s } = e2;
    return qs(o, t) ? (o[t] = n, true) : r !== se && Q(r, t) ? (r[t] = n, true) : Q(e2.props, t) || t[0] === "$" && t.slice(1) in e2 ? false : (s[t] = n, true);
  }, has({ _: { data: e2, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s } }, i) {
    let a;
    return !!n[i] || e2 !== se && Q(e2, i) || qs(t, i) || (a = s[0]) && Q(a, i) || Q(r, i) || Q(rr, i) || Q(o.config.globalProperties, i);
  }, defineProperty(e2, t, n) {
    return n.get != null ? e2._.accessCache[t] = 0 : Q(n, "value") && this.set(e2, t, n.value, null), Reflect.defineProperty(e2, t, n);
  } };
  Ys = true;
  yh = { data: Wu, props: zu, emits: zu, methods: er, computed: er, beforeCreate: Se, created: Se, beforeMount: Se, mounted: Se, beforeUpdate: Se, updated: Se, beforeDestroy: Se, beforeUnmount: Se, destroyed: Se, unmounted: Se, activated: Se, deactivated: Se, errorCaptured: Se, serverPrefetch: Se, components: er, directives: er, watch: Eh, provide: Wu, inject: _h };
  vh = 0;
  eo = null;
  bc = (e2) => e2[0] === "_" || e2 === "$stable", li = (e2) => B(e2) ? e2.map(Me) : [Me(e2)], xh = (e2, t, n) => {
    if (t._n)
      return t;
    let r = Xm((...o) => li(t(...o)), n);
    return r._c = false, r;
  }, wc = (e2, t, n) => {
    let r = e2._ctx;
    for (let o in e2) {
      if (bc(o))
        continue;
      let s = e2[o];
      if (W(s))
        t[o] = xh(o, s, r);
      else if (s != null) {
        let i = li(s);
        t[o] = () => i;
      }
    }
  }, Fc = (e2, t) => {
    let n = li(t);
    e2.slots.default = () => n;
  }, Nh = (e2, t) => {
    if (e2.vnode.shapeFlag & 32) {
      let n = t._;
      n ? (e2.slots = J(t), vn(t, "_", n)) : wc(t, e2.slots = {});
    } else
      e2.slots = {}, t && Fc(e2, t);
    vn(e2.slots, fo, 1);
  }, Ah = (e2, t, n) => {
    let { vnode: r, slots: o } = e2, s = true, i = se;
    if (r.shapeFlag & 32) {
      let a = t._;
      a ? n && a === 1 ? s = false : (fe(o, t), !n && a === 1 && delete o._) : (s = !t.$stable, wc(t, o)), i = t;
    } else
      t && (Fc(e2, t), i = { default: 1 });
    if (s)
      for (let a in o)
        !bc(a) && i[a] == null && delete o[a];
  };
  Pt = false, Sh = (e2) => e2.namespaceURI.includes("svg") && e2.tagName !== "foreignObject", Oh = (e2) => e2.namespaceURI.includes("MathML"), Gr = (e2) => {
    if (Sh(e2))
      return "svg";
    if (Oh(e2))
      return "mathml";
  }, Qn = (e2) => e2.nodeType === 8;
  Oe = dc;
  Ph = (e2) => e2.__isTeleport, _e = Symbol.for("v-fgt"), yt = Symbol.for("v-txt"), Ve = Symbol.for("v-cmt"), Lt = Symbol.for("v-stc"), Vh = [], xn = null, di = 1;
  fo = "__vInternal", Tc = ({ key: e2 }) => e2 ?? null, Xr = ({ ref: e2, ref_key: t, ref_for: n }) => (typeof e2 == "number" && (e2 = "" + e2), e2 != null ? Z(e2) || we(e2) || W(e2) ? { i: Qe, r: e2, k: t, f: !!n } : e2 : null);
  ye = Bh;
  Lh = _c(), Mh = 0;
  Ce = null, pi = () => Ce || Qe;
  {
    let e2 = Ot(), t = (n, r) => {
      let o;
      return (o = e2[n]) || (o = e2[n] = []), o.push(r), (s) => {
        o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
      };
    };
    ro = t("__VUE_INSTANCE_SETTERS__", (n) => Ce = n), Qs = t("__VUE_SSR_SETTERS__", (n) => po = n);
  }
  ar = (e2) => {
    let t = Ce;
    return ro(e2), e2.scope.on(), () => {
      e2.scope.off(), ro(t);
    };
  }, Qu = () => {
    Ce && Ce.scope.off(), ro(null);
  };
  po = false;
  qh = /(?:^|[-_])(\w)/g, Wh = (e2) => e2.replace(qh, (t) => t.toUpperCase()).replace(/[-_]/g, "");
  Gh = (e2, t) => Iu(e2, t, po);
  nc = "3.4.15", Tn = he, Yh = { createComponentInstance: $c, setupComponent: Vc, renderComponentRoot: Yr, setCurrentRenderingInstance: ir, isVNode: no, normalizeVNode: Me }, mo = Yh;
});
function ol(e2) {
  let t = {};
  for (let $ in e2)
    $ in rl || (t[$] = e2[$]);
  if (e2.css === false)
    return t;
  let { name: n = "v", type: r, duration: o, enterFromClass: s = `${n}-enter-from`, enterActiveClass: i = `${n}-enter-active`, enterToClass: a = `${n}-enter-to`, appearFromClass: u = s, appearActiveClass: l = i, appearToClass: c = a, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: m = `${n}-leave-active`, leaveToClass: v = `${n}-leave-to` } = e2, A = eg(o), w = A && A[0], R = A && A[1], { onBeforeEnter: I, onEnter: V, onEnterCancelled: h, onLeave: _, onLeaveCancelled: S, onBeforeAppear: j = I, onAppear: D = V, onAppearCancelled: F = h } = t, O = ($, G, de) => {
    Ht($, G ? c : a), Ht($, G ? l : i), de && de();
  }, k = ($, G) => {
    $._isLeaving = false, Ht($, f), Ht($, v), Ht($, m), G && G();
  }, K = ($) => (G, de) => {
    let ge = $ ? D : V, H = () => O(G, $, de);
    cn(ge, [G, H]), Mc(() => {
      Ht(G, $ ? u : s), Et(G, $ ? c : a), Lc(ge) || jc(G, r, w, H);
    });
  };
  return fe(t, { onBeforeEnter($) {
    cn(I, [$]), Et($, s), Et($, i);
  }, onBeforeAppear($) {
    cn(j, [$]), Et($, u), Et($, l);
  }, onEnter: K(false), onAppear: K(true), onLeave($, G) {
    $._isLeaving = true;
    let de = () => k($, G);
    Et($, f), il(), Et($, m), Mc(() => {
      $._isLeaving && (Ht($, f), Et($, v), Lc(_) || jc($, r, R, de));
    }), cn(_, [$, de]);
  }, onEnterCancelled($) {
    O($, false), cn(h, [$]);
  }, onAppearCancelled($) {
    O($, true), cn(F, [$]);
  }, onLeaveCancelled($) {
    k($), cn(S, [$]);
  } });
}
function eg(e2) {
  if (e2 == null)
    return null;
  if (ee(e2))
    return [gi(e2.enter), gi(e2.leave)];
  {
    let t = gi(e2);
    return [t, t];
  }
}
function gi(e2) {
  return Es(e2);
}
function Et(e2, t) {
  t.split(/\s+/).forEach((n) => n && e2.classList.add(n)), (e2[Rn] || (e2[Rn] = /* @__PURE__ */ new Set())).add(t);
}
function Ht(e2, t) {
  t.split(/\s+/).forEach((r) => r && e2.classList.remove(r));
  let n = e2[Rn];
  n && (n.delete(t), n.size || (e2[Rn] = void 0));
}
function Mc(e2) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e2);
  });
}
function jc(e2, t, n, r) {
  let o = e2._endId = ++tg, s = () => {
    o === e2._endId && r();
  };
  if (n)
    return setTimeout(s, n);
  let { type: i, timeout: a, propCount: u } = sl(e2, t);
  if (!i)
    return r();
  let l = i + "end", c = 0, f = () => {
    e2.removeEventListener(l, m), s();
  }, m = (v) => {
    v.target === e2 && ++c >= u && f();
  };
  setTimeout(() => {
    c < u && f();
  }, a + 1), e2.addEventListener(l, m);
}
function sl(e2, t) {
  let n = window.getComputedStyle(e2), r = (A) => (n[A] || "").split(", "), o = r(`${jt}Delay`), s = r(`${jt}Duration`), i = Hc(o, s), a = r(`${ur}Delay`), u = r(`${ur}Duration`), l = Hc(a, u), c = null, f = 0, m = 0;
  t === jt ? i > 0 && (c = jt, f = i, m = s.length) : t === ur ? l > 0 && (c = ur, f = l, m = u.length) : (f = Math.max(i, l), c = f > 0 ? i > l ? jt : ur : null, m = c ? c === jt ? s.length : u.length : 0);
  let v = c === jt && /\b(transform|all)(,|$)/.test(r(`${jt}Property`).toString());
  return { type: c, timeout: f, propCount: m, hasTransform: v };
}
function Hc(e2, t) {
  for (; e2.length < t.length; )
    e2 = e2.concat(e2);
  return Math.max(...t.map((n, r) => Uc(n) + Uc(e2[r])));
}
function Uc(e2) {
  return e2 === "auto" ? 0 : Number(e2.slice(0, -1).replace(",", ".")) * 1e3;
}
function il() {
  return document.body.offsetHeight;
}
function ng(e2, t, n) {
  let r = e2[Rn];
  r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e2.removeAttribute("class") : n ? e2.setAttribute("class", t) : e2.className = t;
}
function cr(e2, t) {
  e2.style.display = t ? e2[vi] : "none";
}
function og() {
  rg.getSSRProps = ({ value: e2 }) => {
    if (!e2)
      return { style: { display: "none" } };
  };
}
function ig(e2, t, n) {
  let r = e2.style, o = r.display, s = Z(n);
  if (n && !s) {
    if (t && !Z(t))
      for (let i in t)
        n[i] == null && _i(r, i, "");
    for (let i in n)
      _i(r, i, n[i]);
  } else if (s) {
    if (t !== n) {
      let i = r[sg];
      i && (n += ";" + i), r.cssText = n;
    }
  } else
    t && e2.removeAttribute("style");
  vi in e2 && (r.display = o);
}
function _i(e2, t, n) {
  if (B(n))
    n.forEach((r) => _i(e2, t, r));
  else if (n == null && (n = ""), t.startsWith("--"))
    e2.setProperty(t, n);
  else {
    let r = ag(e2, t);
    qc.test(n) ? e2.setProperty(pt(r), n.replace(qc, ""), "important") : e2[r] = n;
  }
}
function ag(e2, t) {
  let n = Di[t];
  if (n)
    return n;
  let r = nt(t);
  if (r !== "filter" && r in e2)
    return Di[t] = r;
  r = Kn(r);
  for (let o = 0; o < Wc.length; o++) {
    let s = Wc[o] + r;
    if (s in e2)
      return Di[t] = s;
  }
  return t;
}
function ug(e2, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null ? e2.removeAttributeNS(zc, t.slice(6, t.length)) : e2.setAttributeNS(zc, t, n);
  else {
    let s = gu(t);
    n == null || s && !bn(n) ? e2.removeAttribute(t) : e2.setAttribute(t, s ? "" : n);
  }
}
function cg(e2, t, n, r, o, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, o, s), e2[t] = n ?? "";
    return;
  }
  let a = e2.tagName;
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e2._value = n;
    let l = a === "OPTION" ? e2.getAttribute("value") : e2.value, c = n ?? "";
    l !== c && (e2.value = c), n == null && e2.removeAttribute(t);
    return;
  }
  let u = false;
  if (n === "" || n == null) {
    let l = typeof e2[t];
    l === "boolean" ? n = bn(n) : n == null && l === "string" ? (n = "", u = true) : l === "number" && (n = 0, u = true);
  }
  try {
    e2[t] = n;
  } catch {
  }
  u && e2.removeAttribute(t);
}
function vt(e2, t, n, r) {
  e2.addEventListener(t, n, r);
}
function lg(e2, t, n, r) {
  e2.removeEventListener(t, n, r);
}
function dg(e2, t, n, r, o = null) {
  let s = e2[Kc] || (e2[Kc] = {}), i = s[t];
  if (r && i)
    i.value = r;
  else {
    let [a, u] = fg(t);
    if (r) {
      let l = s[t] = hg(r, o);
      vt(e2, a, l, u);
    } else
      i && (lg(e2, a, i, u), s[t] = void 0);
  }
}
function fg(e2) {
  let t;
  if (Gc.test(e2)) {
    t = {};
    let r;
    for (; r = e2.match(Gc); )
      e2 = e2.slice(0, e2.length - r[0].length), t[r[0].toLowerCase()] = true;
  }
  return [e2[2] === ":" ? e2.slice(3) : pt(e2.slice(2)), t];
}
function hg(e2, t) {
  let n = (r) => {
    if (!r._vts)
      r._vts = Date.now();
    else if (r._vts <= n.attached)
      return;
    Pe(gg(r, n.value), t, 5, [r]);
  };
  return n.value = e2, n.attached = mg(), n;
}
function gg(e2, t) {
  if (B(t)) {
    let n = e2.stopImmediatePropagation;
    return e2.stopImmediatePropagation = () => {
      n.call(e2), e2._stopped = true;
    }, t.map((r) => (o) => !o._stopped && r && r(o));
  } else
    return t;
}
function yg(e2, t, n, r) {
  if (r)
    return !!(t === "innerHTML" || t === "textContent" || t in e2 && Yc(t) && W(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e2.tagName === "INPUT" || t === "type" && e2.tagName === "TEXTAREA")
    return false;
  if (t === "width" || t === "height") {
    let o = e2.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return false;
  }
  return Yc(t) && Z(n) ? false : t in e2;
}
function vg(e2) {
  let t = e2.el;
  t[go] && t[go](), t[Jc] && t[Jc]();
}
function bg(e2) {
  ul.set(e2, e2.el.getBoundingClientRect());
}
function wg(e2) {
  let t = al.get(e2), n = ul.get(e2), r = t.left - n.left, o = t.top - n.top;
  if (r || o) {
    let s = e2.el.style;
    return s.transform = s.webkitTransform = `translate(${r}px,${o}px)`, s.transitionDuration = "0s", e2;
  }
}
function Fg(e2, t, n) {
  let r = e2.cloneNode(), o = e2[Rn];
  o && o.forEach((a) => {
    a.split(/\s+/).forEach((u) => u && r.classList.remove(u));
  }), n.split(/\s+/).forEach((a) => a && r.classList.add(a)), r.style.display = "none";
  let s = t.nodeType === 1 ? t : t.parentNode;
  s.appendChild(r);
  let { hasTransform: i } = sl(r);
  return s.removeChild(r), i;
}
function Cg(e2) {
  e2.target.composing = true;
}
function Xc(e2) {
  let t = e2.target;
  t.composing && (t.composing = false, t.dispatchEvent(new Event("input")));
}
function Qc(e2, { value: t, oldValue: n }, r) {
  e2._modelValue = t, B(t) ? e2.checked = wn(t, r.props.value) > -1 : ft(t) ? e2.checked = t.has(r.props.value) : t !== n && (e2.checked = Je(t, dl(e2, true)));
}
function Zc(e2, t, n, r) {
  let o = e2.multiple, s = B(t);
  if (!(o && !s && !ft(t)) && !(s && Je(t, n))) {
    for (let i = 0, a = e2.options.length; i < a; i++) {
      let u = e2.options[i], l = $n(u);
      if (o)
        if (s) {
          let c = typeof l;
          c === "string" || c === "number" ? u.selected = t.includes(r ? Qt(l) : l) : u.selected = wn(t, l) > -1;
        } else
          u.selected = t.has(l);
      else if (Je($n(u), t)) {
        e2.selectedIndex !== i && (e2.selectedIndex = i);
        return;
      }
    }
    !o && e2.selectedIndex !== -1 && (e2.selectedIndex = -1);
  }
}
function $n(e2) {
  return "_value" in e2 ? e2._value : e2.value;
}
function dl(e2, t) {
  let n = t ? "_trueValue" : "_falseValue";
  return n in e2 ? e2[n] : t;
}
function fl(e2, t) {
  switch (e2) {
    case "SELECT":
      return xg;
    case "TEXTAREA":
      return Ei;
    default:
      switch (t) {
        case "checkbox":
          return cl;
        case "radio":
          return ll;
        default:
          return Ei;
      }
  }
}
function ho(e2, t, n, r, o) {
  let i = fl(e2.tagName, n.props && n.props.type)[o];
  i && i(e2, t, n, r);
}
function Ag() {
  Ei.getSSRProps = ({ value: e2 }) => ({ value: e2 }), ll.getSSRProps = ({ value: e2 }, t) => {
    if (t.props && Je(t.props.value, e2))
      return { checked: true };
  }, cl.getSSRProps = ({ value: e2 }, t) => {
    if (B(e2)) {
      if (t.props && wn(e2, t.props.value) > -1)
        return { checked: true };
    } else if (ft(e2)) {
      if (t.props && e2.has(t.props.value))
        return { checked: true };
    } else if (e2)
      return { checked: true };
  }, Ng.getSSRProps = (e2, t) => {
    if (typeof t.type != "string")
      return;
    let n = fl(t.type.toUpperCase(), t.props && t.props.type);
    if (n.getSSRProps)
      return n.getSSRProps(e2, t);
  };
}
function Sg() {
  return lr || (lr = Cc(pl));
}
function Og() {
  return lr = el ? lr : xc(pl), el = true, lr;
}
function gl(e2) {
  if (e2 instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e2 instanceof MathMLElement)
    return "mathml";
}
function Dl(e2) {
  return Z(e2) ? document.querySelector(e2) : e2;
}
var Jh;
var Xh;
var Ut;
var Ic;
var Qh;
var jt;
var ur;
var Rn;
var nl;
var rl;
var Zh;
var cn;
var Lc;
var tg;
var vi;
var rg;
var sg;
var qc;
var Wc;
var Di;
var zc;
var Kc;
var Gc;
var yi;
var pg;
var mg;
var Yc;
var Dg;
var al;
var ul;
var go;
var Jc;
var _g;
var Eg;
var qt;
var je;
var Ei;
var cl;
var ll;
var xg;
var Ng;
var pl;
var lr;
var el;
var ml;
var hl;
var tl;
var yl;
var _l = te(() => {
  hi();
  hi();
  Fn();
  Jh = "http://www.w3.org/2000/svg", Xh = "http://www.w3.org/1998/Math/MathML", Ut = typeof document < "u" ? document : null, Ic = Ut && Ut.createElement("template"), Qh = { insert: (e2, t, n) => {
    t.insertBefore(e2, n || null);
  }, remove: (e2) => {
    let t = e2.parentNode;
    t && t.removeChild(e2);
  }, createElement: (e2, t, n, r) => {
    let o = t === "svg" ? Ut.createElementNS(Jh, e2) : t === "mathml" ? Ut.createElementNS(Xh, e2) : Ut.createElement(e2, n ? { is: n } : void 0);
    return e2 === "select" && r && r.multiple != null && o.setAttribute("multiple", r.multiple), o;
  }, createText: (e2) => Ut.createTextNode(e2), createComment: (e2) => Ut.createComment(e2), setText: (e2, t) => {
    e2.nodeValue = t;
  }, setElementText: (e2, t) => {
    e2.textContent = t;
  }, parentNode: (e2) => e2.parentNode, nextSibling: (e2) => e2.nextSibling, querySelector: (e2) => Ut.querySelector(e2), setScopeId(e2, t) {
    e2.setAttribute(t, "");
  }, insertStaticContent(e2, t, n, r, o, s) {
    let i = n ? n.previousSibling : t.lastChild;
    if (o && (o === s || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(true), n), !(o === s || !(o = o.nextSibling)); )
        ;
    else {
      Ic.innerHTML = r === "svg" ? `<svg>${e2}</svg>` : r === "mathml" ? `<math>${e2}</math>` : e2;
      let a = Ic.content;
      if (r === "svg" || r === "mathml") {
        let u = a.firstChild;
        for (; u.firstChild; )
          a.appendChild(u.firstChild);
        a.removeChild(u);
      }
      t.insertBefore(a, n);
    }
    return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
  } }, jt = "transition", ur = "animation", Rn = Symbol("_vtc"), nl = (e2, { slots: t }) => On(mc, ol(e2), t);
  nl.displayName = "Transition";
  rl = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String }, Zh = nl.props = fe({}, oi, rl), cn = (e2, t = []) => {
    B(e2) ? e2.forEach((n) => n(...t)) : e2 && e2(...t);
  }, Lc = (e2) => e2 ? B(e2) ? e2.some((t) => t.length > 1) : e2.length > 1 : false;
  tg = 0;
  vi = Symbol("_vod"), rg = { beforeMount(e2, { value: t }, { transition: n }) {
    e2[vi] = e2.style.display === "none" ? "" : e2.style.display, n && t ? n.beforeEnter(e2) : cr(e2, t);
  }, mounted(e2, { value: t }, { transition: n }) {
    n && t && n.enter(e2);
  }, updated(e2, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e2), cr(e2, true), r.enter(e2)) : r.leave(e2, () => {
      cr(e2, false);
    }) : cr(e2, t));
  }, beforeUnmount(e2, { value: t }) {
    cr(e2, t);
  } };
  sg = Symbol("");
  qc = /\s*!important$/;
  Wc = ["Webkit", "Moz", "ms"], Di = {};
  zc = "http://www.w3.org/1999/xlink";
  Kc = Symbol("_vei");
  Gc = /(?:Once|Passive|Capture)$/;
  yi = 0, pg = Promise.resolve(), mg = () => yi || (pg.then(() => yi = 0), yi = Date.now());
  Yc = (e2) => e2.charCodeAt(0) === 111 && e2.charCodeAt(1) === 110 && e2.charCodeAt(2) > 96 && e2.charCodeAt(2) < 123, Dg = (e2, t, n, r, o, s, i, a, u) => {
    let l = o === "svg";
    t === "class" ? ng(e2, r, l) : t === "style" ? ig(e2, n, r) : dt(t) ? Wn(t) || dg(e2, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : yg(e2, t, r, l)) ? cg(e2, t, r, s, i, a, u) : (t === "true-value" ? e2._trueValue = r : t === "false-value" && (e2._falseValue = r), ug(e2, t, r, l));
  };
  al = /* @__PURE__ */ new WeakMap(), ul = /* @__PURE__ */ new WeakMap(), go = Symbol("_moveCb"), Jc = Symbol("_enterCb"), _g = { name: "TransitionGroup", props: fe({}, Zh, { tag: String, moveClass: String }), setup(e2, { slots: t }) {
    let n = pi(), r = ri(), o, s;
    return ai(() => {
      if (!o.length)
        return;
      let i = e2.moveClass || `${e2.name || "v"}-move`;
      if (!Fg(o[0].el, n.vnode.el, i))
        return;
      o.forEach(vg), o.forEach(bg);
      let a = o.filter(wg);
      il(), a.forEach((u) => {
        let l = u.el, c = l.style;
        Et(l, i), c.transform = c.webkitTransform = c.transitionDuration = "";
        let f = l[go] = (m) => {
          m && m.target !== l || (!m || /transform$/.test(m.propertyName)) && (l.removeEventListener("transitionend", f), l[go] = null, Ht(l, i));
        };
        l.addEventListener("transitionend", f);
      });
    }), () => {
      let i = J(e2), a = ol(i), u = i.tag || _e;
      o = s, s = t.default ? uo(t.default()) : [];
      for (let l = 0; l < s.length; l++) {
        let c = s[l];
        c.key != null && Sn(c, An(c, a, r, n));
      }
      if (o)
        for (let l = 0; l < o.length; l++) {
          let c = o[l];
          Sn(c, An(c, a, r, n)), al.set(c, c.el.getBoundingClientRect());
        }
      return ye(u, null, s);
    };
  } }, Eg = (e2) => delete e2.mode;
  _g.props;
  qt = (e2) => {
    let t = e2.props["onUpdate:modelValue"] || false;
    return B(t) ? (n) => En(t, n) : t;
  };
  je = Symbol("_assign"), Ei = { created(e2, { modifiers: { lazy: t, trim: n, number: r } }, o) {
    e2[je] = qt(o);
    let s = r || o.props && o.props.type === "number";
    vt(e2, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let a = e2.value;
      n && (a = a.trim()), s && (a = Qt(a)), e2[je](a);
    }), n && vt(e2, "change", () => {
      e2.value = e2.value.trim();
    }), t || (vt(e2, "compositionstart", Cg), vt(e2, "compositionend", Xc), vt(e2, "change", Xc));
  }, mounted(e2, { value: t }) {
    e2.value = t ?? "";
  }, beforeUpdate(e2, { value: t, modifiers: { lazy: n, trim: r, number: o } }, s) {
    if (e2[je] = qt(s), e2.composing)
      return;
    let i = o || e2.type === "number" ? Qt(e2.value) : e2.value, a = t ?? "";
    i !== a && (document.activeElement === e2 && e2.type !== "range" && (n || r && e2.value.trim() === a) || (e2.value = a));
  } }, cl = { deep: true, created(e2, t, n) {
    e2[je] = qt(n), vt(e2, "change", () => {
      let r = e2._modelValue, o = $n(e2), s = e2.checked, i = e2[je];
      if (B(r)) {
        let a = wn(r, o), u = a !== -1;
        if (s && !u)
          i(r.concat(o));
        else if (!s && u) {
          let l = [...r];
          l.splice(a, 1), i(l);
        }
      } else if (ft(r)) {
        let a = new Set(r);
        s ? a.add(o) : a.delete(o), i(a);
      } else
        i(dl(e2, s));
    });
  }, mounted: Qc, beforeUpdate(e2, t, n) {
    e2[je] = qt(n), Qc(e2, t, n);
  } };
  ll = { created(e2, { value: t }, n) {
    e2.checked = Je(t, n.props.value), e2[je] = qt(n), vt(e2, "change", () => {
      e2[je]($n(e2));
    });
  }, beforeUpdate(e2, { value: t, oldValue: n }, r) {
    e2[je] = qt(r), t !== n && (e2.checked = Je(t, r.props.value));
  } }, xg = { deep: true, created(e2, { value: t, modifiers: { number: n } }, r) {
    let o = ft(t);
    vt(e2, "change", () => {
      let s = Array.prototype.filter.call(e2.options, (i) => i.selected).map((i) => n ? Qt($n(i)) : $n(i));
      e2[je](e2.multiple ? o ? new Set(s) : s : s[0]), e2._assigning = true, ei(() => {
        e2._assigning = false;
      });
    }), e2[je] = qt(r);
  }, mounted(e2, { value: t, oldValue: n, modifiers: { number: r } }) {
    Zc(e2, t, n, r);
  }, beforeUpdate(e2, t, n) {
    e2[je] = qt(n);
  }, updated(e2, { value: t, oldValue: n, modifiers: { number: r } }) {
    e2._assigning || Zc(e2, t, n, r);
  } };
  Ng = { created(e2, t, n) {
    ho(e2, t, n, null, "created");
  }, mounted(e2, t, n) {
    ho(e2, t, n, null, "mounted");
  }, beforeUpdate(e2, t, n, r) {
    ho(e2, t, n, r, "beforeUpdate");
  }, updated(e2, t, n, r) {
    ho(e2, t, n, r, "updated");
  } };
  pl = fe({ patchProp: Dg }, Qh), el = false;
  ml = (...e2) => {
    let t = Sg().createApp(...e2), { mount: n } = t;
    return t.mount = (r) => {
      let o = Dl(r);
      if (!o)
        return;
      let s = t._component;
      !W(s) && !s.render && !s.template && (s.template = o.innerHTML), o.innerHTML = "";
      let i = n(o, false, gl(o));
      return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
    }, t;
  }, hl = (...e2) => {
    let t = Og().createApp(...e2), { mount: n } = t;
    return t.mount = (r) => {
      let o = Dl(r);
      if (o)
        return n(o, true, gl(o));
    }, t;
  };
  tl = false, yl = () => {
    tl || (tl = true, Ag(), og());
  };
});
var bt = te(() => {
  _l();
});
function me(e2, t) {
  let n = "";
  for (let r in e2) {
    if (Tg(r) || dt(r) || t === "textarea" && r === "value")
      continue;
    let o = e2[r];
    r === "class" ? n += ` class="${He(o)}"` : r === "style" ? n += ` style="${$g(o)}"` : n += Rg(r, o, t);
  }
  return n;
}
function Rg(e2, t, n) {
  if (!$r(t))
    return "";
  let r = n && (n.indexOf("-") > 0 || bs(n)) ? e2 : yu[e2] || e2.toLowerCase();
  return ws(r) ? bn(t) ? ` ${r}` : "" : Du(r) ? t === "" ? ` ${r}` : ` ${r}="${Ye(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${r}`), "");
}
function at(e2, t) {
  return $r(t) ? ` ${e2}="${Ye(t)}"` : "";
}
function He(e2) {
  return Ye(en(e2));
}
function $g(e2) {
  if (!e2)
    return "";
  if (Z(e2))
    return Ye(e2);
  let t = Zt(e2);
  return Ye(vs(t));
}
function Ue(e2, t = null, n = null, r = null, o) {
  return bi(ye(e2, t, n), r, o);
}
function Pg(e2, t, n, r, o) {
  e2("<!--teleport start-->");
  let s = o.appContext.provides[ao], i = s.__teleportBuffers || (s.__teleportBuffers = {}), a = i[n] || (i[n] = []), u = a.length, l;
  if (r)
    t(e2), l = "<!--teleport anchor-->";
  else {
    let { getBuffer: c, push: f } = wl();
    t(f), f("<!--teleport anchor-->"), l = c();
  }
  a.splice(u, 0, l), e2("<!--teleport end-->");
}
function Ee(e2) {
  return Ye(Fs(e2));
}
function Pn(e2, t) {
  if (B(e2) || Z(e2))
    for (let n = 0, r = e2.length; n < r; n++)
      t(e2[n], n);
  else if (typeof e2 == "number")
    for (let n = 0; n < e2; n++)
      t(n + 1, n);
  else if (ee(e2))
    if (e2[Symbol.iterator]) {
      let n = Array.from(e2);
      for (let r = 0, o = n.length; r < o; r++)
        t(n[r], r);
    } else {
      let n = Object.keys(e2);
      for (let r = 0, o = n.length; r < o; r++) {
        let s = n[r];
        t(e2[s], s, r);
      }
    }
}
function Vg(e2, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function wl() {
  let e2 = false, t = [];
  return { getBuffer() {
    return t;
  }, push(n) {
    let r = Z(n);
    e2 && r ? t[t.length - 1] += n : t.push(n), e2 = r, (Xt(n) || B(n) && n.hasAsync) && (t.hasAsync = true);
  } };
}
function bi(e2, t = null, n) {
  let r = kg(e2, t, null), o = Bg(r, true), s = Xt(o), i = r.sp;
  if (s || i) {
    let a = s ? o : Promise.resolve();
    return i && (a = a.then(() => Promise.all(i.map((u) => u.call(r.proxy)))).catch(he)), a.then(() => bl(r, n));
  } else
    return bl(r, n);
}
function bl(e2, t) {
  let n = e2.type, { getBuffer: r, push: o } = wl();
  if (W(n)) {
    let s = vl(e2);
    if (!n.props)
      for (let i in e2.attrs)
        i.startsWith("data-v-") && ((s.props || (s.props = {}))[i] = "");
    Do(o, e2.subTree = s, e2, t);
  } else {
    (!e2.render || e2.render === he) && !e2.ssrRender && !n.ssrRender && Z(n.template) && (n.ssrRender = Vg(n.template));
    for (let i of e2.scope.effects)
      i.computed && (i.computed._dirty = true, i.computed._cacheable = true);
    let s = e2.ssrRender || n.ssrRender;
    if (s) {
      let i = e2.inheritAttrs !== false ? e2.attrs : void 0, a = false, u = e2;
      for (; ; ) {
        let c = u.vnode.scopeId;
        c && (a || (i = { ...i }, a = true), i[c] = "");
        let f = u.parent;
        if (f && f.subTree && f.subTree === u.vnode)
          u = f;
        else
          break;
      }
      t && (a || (i = { ...i }), i[t.trim()] = "");
      let l = El(e2);
      try {
        s(e2.proxy, o, e2, i, e2.props, e2.setupState, e2.data, e2.ctx);
      } finally {
        El(l);
      }
    } else if (e2.render && e2.render !== he)
      Do(o, e2.subTree = vl(e2), e2, t);
    else {
      let i = n.name || n.__file || "<Anonymous>";
      Tn(`Component ${i} is missing template or render function.`), o("<!---->");
    }
  }
  return r();
}
function Do(e2, t, n, r) {
  let { type: o, shapeFlag: s, children: i } = t;
  switch (o) {
    case yt:
      e2(Ye(i));
      break;
    case Ve:
      e2(i ? `<!--${_u(i)}-->` : "<!---->");
      break;
    case Lt:
      e2(i);
      break;
    case _e:
      t.slotScopeIds && (r = (r ? r + " " : "") + t.slotScopeIds.join(" ")), e2("<!--[-->"), wi(e2, i, n, r), e2("<!--]-->");
      break;
    default:
      s & 1 ? Lg(e2, t, n, r) : s & 6 ? e2(bi(t, n, r)) : s & 64 ? jg(e2, t, n, r) : s & 128 ? Do(e2, t.ssContent, n, r) : Tn("[@vue/server-renderer] Invalid VNode type:", o, `(${typeof o})`);
  }
}
function wi(e2, t, n, r) {
  for (let o = 0; o < t.length; o++)
    Do(e2, Ig(t[o]), n, r);
}
function Lg(e2, t, n, r) {
  let o = t.type, { props: s, children: i, shapeFlag: a, scopeId: u, dirs: l } = t, c = `<${o}`;
  l && (s = Mg(t, s, l)), s && (c += me(s, o)), u && (c += ` ${u}`);
  let f = n, m = t;
  for (; f && m === f.subTree; )
    m = f.vnode, m.scopeId && (c += ` ${m.scopeId}`), f = f.parent;
  if (r && (c += ` ${r}`), e2(c + ">"), !mu(o)) {
    let v = false;
    s && (s.innerHTML ? (v = true, e2(s.innerHTML)) : s.textContent ? (v = true, e2(Ye(s.textContent))) : o === "textarea" && s.value && (v = true, e2(Ye(s.value)))), v || (a & 8 ? e2(Ye(i)) : a & 16 && wi(e2, i, n, r)), e2(`</${o}>`);
  }
}
function Mg(e2, t, n) {
  let r = [];
  for (let o = 0; o < n.length; o++) {
    let s = n[o], { dir: { getSSRProps: i } } = s;
    if (i) {
      let a = i(s, e2);
      a && r.push(a);
    }
  }
  return ae(t || {}, ...r);
}
function jg(e2, t, n, r) {
  let o = t.props && t.props.to, s = t.props && t.props.disabled;
  if (!o)
    return s || Tn("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!Z(o))
    return Tn("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Pg(e2, (i) => {
    wi(i, t.children, n, r);
  }, o, s || s === "", n);
}
async function Fi(e2) {
  if (e2.hasAsync) {
    let t = "";
    for (let n = 0; n < e2.length; n++) {
      let r = e2[n];
      Xt(r) && (r = await r), Z(r) ? t += r : t += await Fi(r);
    }
    return t;
  } else
    return Fl(e2);
}
function Fl(e2) {
  let t = "";
  for (let n = 0; n < e2.length; n++) {
    let r = e2[n];
    Z(r) ? t += r : t += Fl(r);
  }
  return t;
}
async function Ci(e2, t = {}) {
  if (Hg(e2))
    return Ci(ml({ render: () => e2 }), t);
  let n = ye(e2._component, e2._props);
  n.appContext = e2._context, e2.provide(ao, t);
  let r = await bi(n), o = await Fi(r);
  if (await Ug(t), t.__watcherHandles)
    for (let s of t.__watcherHandles)
      s();
  return o;
}
async function Ug(e2) {
  if (e2.__teleportBuffers) {
    e2.teleports = e2.teleports || {};
    for (let t in e2.__teleportBuffers)
      e2.teleports[t] = await Fi(await Promise.all([e2.__teleportBuffers[t]]));
  }
}
var Tg;
var kg;
var El;
var Bg;
var vl;
var Ig;
var Hg;
var lE;
var Cl = te(() => {
  bt();
  Fn();
  Tg = tt(",key,ref,innerHTML,textContent,ref_key,ref_for");
  {
    let e2 = Ot(), t = (n, r) => {
      let o;
      return (o = e2[n]) || (o = e2[n] = []), o.push(r), (s) => {
        o.length > 1 ? o.forEach((i) => i(s)) : o[0](s);
      };
    };
    t("__VUE_INSTANCE_SETTERS__", (n) => n), t("__VUE_SSR_SETTERS__", (n) => n);
  }
  ({ createComponentInstance: kg, setCurrentRenderingInstance: El, setupComponent: Bg, renderComponentRoot: vl, normalizeVNode: Ig } = mo);
  ({ isVNode: Hg } = mo);
  ({ isVNode: lE } = mo);
  yl();
});
var Wt = te(() => {
  Cl();
});
function zg(e2) {
  return !!e2.ssrRender || !!e2.__ssrInlineRender;
}
async function Kg(e2, t, n, r) {
  let o = {}, s = { ...t };
  delete s.slot;
  for (let [u, l] of Object.entries(n))
    o[u] = () => On(Wg, { value: l, name: u === "default" ? void 0 : u, hydrate: r.astroStaticSlot ? !!r.hydrate : true });
  let i = hl({ render: () => On(e2, s, o) });
  return await qg(), { html: await Ci(i) };
}
var qg;
var Wg;
var Gg;
var xe;
var wt = te(() => {
  bt();
  Wt();
  qg = () => {
  }, Wg = si({ props: { value: String, name: String, hydrate: { type: Boolean, default: true } }, setup({ name: e2, value: t, hydrate: n }) {
    if (!t)
      return () => null;
    let r = n ? "astro-slot" : "astro-static-slot";
    return () => On(r, { name: e2, innerHTML: t });
  } });
  Gg = { check: zg, renderToStaticMarkup: Kg, supportsAstroStaticSlot: true }, xe = [Object.assign({ name: "@astrojs/vue", clientEntrypoint: "@astrojs/vue/client.js", serverEntrypoint: "@astrojs/vue/server.js" }, { ssr: Gg })];
});
var Te;
var zt = te(() => {
  Te = void 0;
});
var Nl = mr((yE, xl) => {
  "use strict";
  function yo() {
    this._types = /* @__PURE__ */ Object.create(null), this._extensions = /* @__PURE__ */ Object.create(null);
    for (let e2 = 0; e2 < arguments.length; e2++)
      this.define(arguments[e2]);
    this.define = this.define.bind(this), this.getType = this.getType.bind(this), this.getExtension = this.getExtension.bind(this);
  }
  yo.prototype.define = function(e2, t) {
    for (let n in e2) {
      let r = e2[n].map(function(o) {
        return o.toLowerCase();
      });
      n = n.toLowerCase();
      for (let o = 0; o < r.length; o++) {
        let s = r[o];
        if (s[0] !== "*") {
          if (!t && s in this._types)
            throw new Error('Attempt to change mapping for "' + s + '" extension from "' + this._types[s] + '" to "' + n + '". Pass `force=true` to allow this, otherwise remove "' + s + '" from the list of extensions for "' + n + '".');
          this._types[s] = n;
        }
      }
      if (t || !this._extensions[n]) {
        let o = r[0];
        this._extensions[n] = o[0] !== "*" ? o : o.substr(1);
      }
    }
  };
  yo.prototype.getType = function(e2) {
    e2 = String(e2);
    let t = e2.replace(/^.*[/\\]/, "").toLowerCase(), n = t.replace(/^.*\./, "").toLowerCase(), r = t.length < e2.length;
    return (n.length < t.length - 1 || !r) && this._types[n] || null;
  };
  yo.prototype.getExtension = function(e2) {
    return e2 = /^\s*([^;\s]*)/.test(e2) && RegExp.$1, e2 && this._extensions[e2.toLowerCase()] || null;
  };
  xl.exports = yo;
});
var Sl = mr((_E, Al) => {
  Al.exports = { "application/andrew-inset": ["ez"], "application/applixware": ["aw"], "application/atom+xml": ["atom"], "application/atomcat+xml": ["atomcat"], "application/atomdeleted+xml": ["atomdeleted"], "application/atomsvc+xml": ["atomsvc"], "application/atsc-dwd+xml": ["dwd"], "application/atsc-held+xml": ["held"], "application/atsc-rsat+xml": ["rsat"], "application/bdoc": ["bdoc"], "application/calendar+xml": ["xcs"], "application/ccxml+xml": ["ccxml"], "application/cdfx+xml": ["cdfx"], "application/cdmi-capability": ["cdmia"], "application/cdmi-container": ["cdmic"], "application/cdmi-domain": ["cdmid"], "application/cdmi-object": ["cdmio"], "application/cdmi-queue": ["cdmiq"], "application/cu-seeme": ["cu"], "application/dash+xml": ["mpd"], "application/davmount+xml": ["davmount"], "application/docbook+xml": ["dbk"], "application/dssc+der": ["dssc"], "application/dssc+xml": ["xdssc"], "application/ecmascript": ["es", "ecma"], "application/emma+xml": ["emma"], "application/emotionml+xml": ["emotionml"], "application/epub+zip": ["epub"], "application/exi": ["exi"], "application/express": ["exp"], "application/fdt+xml": ["fdt"], "application/font-tdpfr": ["pfr"], "application/geo+json": ["geojson"], "application/gml+xml": ["gml"], "application/gpx+xml": ["gpx"], "application/gxf": ["gxf"], "application/gzip": ["gz"], "application/hjson": ["hjson"], "application/hyperstudio": ["stk"], "application/inkml+xml": ["ink", "inkml"], "application/ipfix": ["ipfix"], "application/its+xml": ["its"], "application/java-archive": ["jar", "war", "ear"], "application/java-serialized-object": ["ser"], "application/java-vm": ["class"], "application/javascript": ["js", "mjs"], "application/json": ["json", "map"], "application/json5": ["json5"], "application/jsonml+json": ["jsonml"], "application/ld+json": ["jsonld"], "application/lgr+xml": ["lgr"], "application/lost+xml": ["lostxml"], "application/mac-binhex40": ["hqx"], "application/mac-compactpro": ["cpt"], "application/mads+xml": ["mads"], "application/manifest+json": ["webmanifest"], "application/marc": ["mrc"], "application/marcxml+xml": ["mrcx"], "application/mathematica": ["ma", "nb", "mb"], "application/mathml+xml": ["mathml"], "application/mbox": ["mbox"], "application/mediaservercontrol+xml": ["mscml"], "application/metalink+xml": ["metalink"], "application/metalink4+xml": ["meta4"], "application/mets+xml": ["mets"], "application/mmt-aei+xml": ["maei"], "application/mmt-usd+xml": ["musd"], "application/mods+xml": ["mods"], "application/mp21": ["m21", "mp21"], "application/mp4": ["mp4s", "m4p"], "application/msword": ["doc", "dot"], "application/mxf": ["mxf"], "application/n-quads": ["nq"], "application/n-triples": ["nt"], "application/node": ["cjs"], "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"], "application/oda": ["oda"], "application/oebps-package+xml": ["opf"], "application/ogg": ["ogx"], "application/omdoc+xml": ["omdoc"], "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"], "application/oxps": ["oxps"], "application/p2p-overlay+xml": ["relo"], "application/patch-ops-error+xml": ["xer"], "application/pdf": ["pdf"], "application/pgp-encrypted": ["pgp"], "application/pgp-signature": ["asc", "sig"], "application/pics-rules": ["prf"], "application/pkcs10": ["p10"], "application/pkcs7-mime": ["p7m", "p7c"], "application/pkcs7-signature": ["p7s"], "application/pkcs8": ["p8"], "application/pkix-attr-cert": ["ac"], "application/pkix-cert": ["cer"], "application/pkix-crl": ["crl"], "application/pkix-pkipath": ["pkipath"], "application/pkixcmp": ["pki"], "application/pls+xml": ["pls"], "application/postscript": ["ai", "eps", "ps"], "application/provenance+xml": ["provx"], "application/pskc+xml": ["pskcxml"], "application/raml+yaml": ["raml"], "application/rdf+xml": ["rdf", "owl"], "application/reginfo+xml": ["rif"], "application/relax-ng-compact-syntax": ["rnc"], "application/resource-lists+xml": ["rl"], "application/resource-lists-diff+xml": ["rld"], "application/rls-services+xml": ["rs"], "application/route-apd+xml": ["rapd"], "application/route-s-tsid+xml": ["sls"], "application/route-usd+xml": ["rusd"], "application/rpki-ghostbusters": ["gbr"], "application/rpki-manifest": ["mft"], "application/rpki-roa": ["roa"], "application/rsd+xml": ["rsd"], "application/rss+xml": ["rss"], "application/rtf": ["rtf"], "application/sbml+xml": ["sbml"], "application/scvp-cv-request": ["scq"], "application/scvp-cv-response": ["scs"], "application/scvp-vp-request": ["spq"], "application/scvp-vp-response": ["spp"], "application/sdp": ["sdp"], "application/senml+xml": ["senmlx"], "application/sensml+xml": ["sensmlx"], "application/set-payment-initiation": ["setpay"], "application/set-registration-initiation": ["setreg"], "application/shf+xml": ["shf"], "application/sieve": ["siv", "sieve"], "application/smil+xml": ["smi", "smil"], "application/sparql-query": ["rq"], "application/sparql-results+xml": ["srx"], "application/srgs": ["gram"], "application/srgs+xml": ["grxml"], "application/sru+xml": ["sru"], "application/ssdl+xml": ["ssdl"], "application/ssml+xml": ["ssml"], "application/swid+xml": ["swidtag"], "application/tei+xml": ["tei", "teicorpus"], "application/thraud+xml": ["tfi"], "application/timestamped-data": ["tsd"], "application/toml": ["toml"], "application/trig": ["trig"], "application/ttml+xml": ["ttml"], "application/ubjson": ["ubj"], "application/urc-ressheet+xml": ["rsheet"], "application/urc-targetdesc+xml": ["td"], "application/voicexml+xml": ["vxml"], "application/wasm": ["wasm"], "application/widget": ["wgt"], "application/winhlp": ["hlp"], "application/wsdl+xml": ["wsdl"], "application/wspolicy+xml": ["wspolicy"], "application/xaml+xml": ["xaml"], "application/xcap-att+xml": ["xav"], "application/xcap-caps+xml": ["xca"], "application/xcap-diff+xml": ["xdf"], "application/xcap-el+xml": ["xel"], "application/xcap-ns+xml": ["xns"], "application/xenc+xml": ["xenc"], "application/xhtml+xml": ["xhtml", "xht"], "application/xliff+xml": ["xlf"], "application/xml": ["xml", "xsl", "xsd", "rng"], "application/xml-dtd": ["dtd"], "application/xop+xml": ["xop"], "application/xproc+xml": ["xpl"], "application/xslt+xml": ["*xsl", "xslt"], "application/xspf+xml": ["xspf"], "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"], "application/yang": ["yang"], "application/yin+xml": ["yin"], "application/zip": ["zip"], "audio/3gpp": ["*3gpp"], "audio/adpcm": ["adp"], "audio/amr": ["amr"], "audio/basic": ["au", "snd"], "audio/midi": ["mid", "midi", "kar", "rmi"], "audio/mobile-xmf": ["mxmf"], "audio/mp3": ["*mp3"], "audio/mp4": ["m4a", "mp4a"], "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"], "audio/ogg": ["oga", "ogg", "spx", "opus"], "audio/s3m": ["s3m"], "audio/silk": ["sil"], "audio/wav": ["wav"], "audio/wave": ["*wav"], "audio/webm": ["weba"], "audio/xm": ["xm"], "font/collection": ["ttc"], "font/otf": ["otf"], "font/ttf": ["ttf"], "font/woff": ["woff"], "font/woff2": ["woff2"], "image/aces": ["exr"], "image/apng": ["apng"], "image/avif": ["avif"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/hej2k": ["hej2"], "image/hsj2": ["hsj2"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jph": ["jph"], "image/jphc": ["jhc"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/jxra": ["jxra"], "image/jxrs": ["jxrs"], "image/jxs": ["jxs"], "image/jxsc": ["jxsc"], "image/jxsi": ["jxsi"], "image/jxss": ["jxss"], "image/ktx": ["ktx"], "image/ktx2": ["ktx2"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"], "message/disposition-notification": ["disposition-notification"], "message/global": ["u8msg"], "message/global-delivery-status": ["u8dsn"], "message/global-disposition-notification": ["u8mdn"], "message/global-headers": ["u8hdr"], "message/rfc822": ["eml", "mime"], "model/3mf": ["3mf"], "model/gltf+json": ["gltf"], "model/gltf-binary": ["glb"], "model/iges": ["igs", "iges"], "model/mesh": ["msh", "mesh", "silo"], "model/mtl": ["mtl"], "model/obj": ["obj"], "model/step+xml": ["stpx"], "model/step+zip": ["stpz"], "model/step-xml+zip": ["stpxz"], "model/stl": ["stl"], "model/vrml": ["wrl", "vrml"], "model/x3d+binary": ["*x3db", "x3dbz"], "model/x3d+fastinfoset": ["x3db"], "model/x3d+vrml": ["*x3dv", "x3dvz"], "model/x3d+xml": ["x3d", "x3dz"], "model/x3d-vrml": ["x3dv"], "text/cache-manifest": ["appcache", "manifest"], "text/calendar": ["ics", "ifb"], "text/coffeescript": ["coffee", "litcoffee"], "text/css": ["css"], "text/csv": ["csv"], "text/html": ["html", "htm", "shtml"], "text/jade": ["jade"], "text/jsx": ["jsx"], "text/less": ["less"], "text/markdown": ["markdown", "md"], "text/mathml": ["mml"], "text/mdx": ["mdx"], "text/n3": ["n3"], "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"], "text/richtext": ["rtx"], "text/rtf": ["*rtf"], "text/sgml": ["sgml", "sgm"], "text/shex": ["shex"], "text/slim": ["slim", "slm"], "text/spdx": ["spdx"], "text/stylus": ["stylus", "styl"], "text/tab-separated-values": ["tsv"], "text/troff": ["t", "tr", "roff", "man", "me", "ms"], "text/turtle": ["ttl"], "text/uri-list": ["uri", "uris", "urls"], "text/vcard": ["vcard"], "text/vtt": ["vtt"], "text/xml": ["*xml"], "text/yaml": ["yaml", "yml"], "video/3gpp": ["3gp", "3gpp"], "video/3gpp2": ["3g2"], "video/h261": ["h261"], "video/h263": ["h263"], "video/h264": ["h264"], "video/iso.segment": ["m4s"], "video/jpeg": ["jpgv"], "video/jpm": ["*jpm", "jpgm"], "video/mj2": ["mj2", "mjp2"], "video/mp2t": ["ts"], "video/mp4": ["mp4", "mp4v", "mpg4"], "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"], "video/ogg": ["ogv"], "video/quicktime": ["qt", "mov"], "video/webm": ["webm"] };
});
var Tl = mr((EE, Ol) => {
  "use strict";
  var Yg = Nl();
  Ol.exports = new Yg(Sl());
});
var kl = {};
Ne(kl, { D: () => _o, a: () => Ni, b: () => xi, c: () => Eo, i: () => Ft, n: () => rD });
function Ft(e2) {
  return typeof e2 == "object";
}
function xi(e2) {
  return typeof e2 == "string";
}
function Jg(e2, t) {
  return Qg(e2, t.protocol) && Vl(e2, t.hostname, true) && Xg(e2, t.port) && Zg(e2, t.pathname, true);
}
function Xg(e2, t) {
  return !t || t === e2.port;
}
function Qg(e2, t) {
  return !t || t === e2.protocol.slice(0, -1);
}
function Vl(e2, t, n) {
  if (t) {
    if (!n || !t.startsWith("*"))
      return t === e2.hostname;
    if (t.startsWith("**.")) {
      let r = t.slice(2);
      return r !== e2.hostname && e2.hostname.endsWith(r);
    } else if (t.startsWith("*.")) {
      let r = t.slice(1);
      return e2.hostname.replace(r, "").split(".").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Zg(e2, t, n) {
  if (t) {
    if (!n || !t.endsWith("*"))
      return t === e2.pathname;
    if (t.endsWith("/**")) {
      let r = t.slice(0, -2);
      return r !== e2.pathname && e2.pathname.startsWith(r);
    } else if (t.endsWith("/*")) {
      let r = t.slice(0, -1);
      return e2.pathname.replace(r, "").split("/").filter(Boolean).length === 1;
    }
  } else
    return true;
  return false;
}
function Eo(e2, { domains: t = [], remotePatterns: n = [] }) {
  if (!mn(e2))
    return false;
  let r = new URL(e2);
  return t.some((o) => Vl(r, o)) || n.some((o) => Jg(r, o));
}
function Ni(e2) {
  return e2 ? "transform" in e2 : false;
}
function Pl(e2) {
  let t = e2.width, n = e2.height;
  if (Ft(e2.src)) {
    let r = e2.src.width / e2.src.height;
    n && !t ? t = Math.round(n * r) : t && !n ? n = Math.round(t / r) : !t && !n && (t = e2.src.width, n = e2.src.height);
  }
  return { targetWidth: t, targetHeight: n };
}
var Rl;
var $l;
var _o;
var eD;
var tD;
var nD;
var rD;
var Ai = te(() => {
  Ln();
  Ge();
  Rl = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg", "avif"], $l = "webp", _o = ["src", "width", "height", "format", "quality"];
  eD = { propertiesToHash: _o, validateOptions(e2) {
    if (!e2.src || typeof e2.src != "string" && typeof e2.src != "object")
      throw new q({ ...Dn, message: Dn.message(JSON.stringify(e2.src), typeof e2.src, JSON.stringify(e2, (t, n) => n === void 0 ? null : n)) });
    if (Ft(e2.src)) {
      if (!Rl.includes(e2.src.format))
        throw new q({ ...os, message: os.message(e2.src.format, e2.src.src, Rl) });
      if (e2.widths && e2.densities)
        throw new q(Ba);
      if (e2.src.format === "svg" && (e2.format = "svg"), e2.src.format === "svg" && e2.format !== "svg" || e2.src.format !== "svg" && e2.format === "svg")
        throw new q(ka);
    } else {
      if (e2.src.startsWith("/@fs/") || !mn(e2.src) && !e2.src.startsWith("/"))
        throw new q({ ...is, message: is.message(e2.src) });
      let t;
      if (!e2.width && !e2.height ? t = "both" : !e2.width && e2.height ? t = "width" : e2.width && !e2.height && (t = "height"), t)
        throw new q({ ...rs, message: rs.message(t, e2.src) });
    }
    return e2.format || (e2.format = $l), e2.width && (e2.width = Math.round(e2.width)), e2.height && (e2.height = Math.round(e2.height)), e2;
  }, getHTMLAttributes(e2) {
    let { targetWidth: t, targetHeight: n } = Pl(e2), { src: r, width: o, height: s, format: i, quality: a, densities: u, widths: l, formats: c, ...f } = e2;
    return { ...f, width: t, height: n, loading: f.loading ?? "lazy", decoding: f.decoding ?? "async" };
  }, getSrcSet(e2) {
    let t = [], { targetWidth: n } = Pl(e2), { widths: r, densities: o } = e2, s = e2.format ?? $l, i = e2.width, a = 1 / 0;
    Ft(e2.src) && (i = e2.src.width, a = i);
    let { width: u, height: l, ...c } = e2, f = [];
    if (o) {
      let m = o.map((A) => typeof A == "number" ? A : parseFloat(A)), v = m.sort().map((A) => Math.round(n * A));
      f.push(...v.map((A, w) => ({ maxTargetWidth: Math.min(A, a), descriptor: `${m[w]}x` })));
    } else
      r && f.push(...r.map((m) => ({ maxTargetWidth: Math.min(m, a), descriptor: `${m}w` })));
    for (let { maxTargetWidth: m, descriptor: v } of f) {
      let A = { ...c };
      m !== i ? A.width = m : e2.width && e2.height && (A.width = e2.width, A.height = e2.height), t.push({ transform: A, descriptor: v, attributes: { type: `image/${s}` } });
    }
    return t;
  }, getURL(e2, t) {
    let n = new URLSearchParams();
    if (Ft(e2.src))
      n.append("href", e2.src.src);
    else if (Eo(e2.src, t))
      n.append("href", e2.src);
    else
      return e2.src;
    return Object.entries({ w: "width", h: "height", q: "quality", f: "format" }).forEach(([s, i]) => {
      e2[i] && n.append(s, e2[i].toString());
    }), `${Kt("/", "/_image")}?${n}`;
  }, parseURL(e2) {
    let t = e2.searchParams;
    return t.has("href") ? { src: t.get("href"), width: t.has("w") ? parseInt(t.get("w")) : void 0, height: t.has("h") ? parseInt(t.get("h")) : void 0, format: t.get("f"), quality: t.get("q") } : void 0;
  } };
  tD = { ...eD, propertiesToHash: ["src"], async transform(e2, t) {
    return { data: e2, format: t.format };
  } }, nD = tD, rD = Object.freeze(Object.defineProperty({ __proto__: null, default: nD }, Symbol.toStringTag, { value: "Module" }));
});
var Ll = {};
Ne(Ll, { GET: () => fD });
async function Il() {
  if (!globalThis?.astroAsset?.imageService) {
    let { default: e2 } = await Promise.resolve().then(() => (Ai(), kl)).then((t) => t.n).catch((t) => {
      let n = new q(Va);
      throw n.cause = t, n;
    });
    return globalThis.astroAsset || (globalThis.astroAsset = {}), globalThis.astroAsset.imageService = e2, e2;
  }
  return globalThis.astroAsset.imageService;
}
async function oD(e2, t) {
  if (!e2 || typeof e2 != "object")
    throw new q({ ...ss, message: ss.message(JSON.stringify(e2)) });
  if (typeof e2.src > "u")
    throw new q({ ...Dn, message: Dn.message(e2.src, "undefined", JSON.stringify(e2)) });
  let n = await Il(), r = { ...e2, src: typeof e2.src == "object" && "then" in e2.src ? (await e2.src).default ?? await e2.src : e2.src }, o = Ft(r.src) ? r.src.fsPath : r.src, s = Ft(r.src) ? r.src.clone ?? r.src : r.src;
  r.src = s;
  let i = n.validateOptions ? await n.validateOptions(r, t) : r, a = n.getSrcSet ? await n.getSrcSet(i, t) : [], u = await n.getURL(i, t), l = await Promise.all(a.map(async (c) => ({ transform: c.transform, url: await n.getURL(c.transform, t), descriptor: c.descriptor, attributes: c.attributes })));
  if (Ni(n) && globalThis.astroAsset.addStaticImage && !(xi(i.src) && u === i.src)) {
    let c = n.propertiesToHash ?? _o;
    u = globalThis.astroAsset.addStaticImage(i, c, o), l = a.map((f) => ({ transform: f.transform, url: globalThis.astroAsset.addStaticImage(f.transform, c, o), descriptor: f.descriptor, attributes: f.attributes }));
  }
  return { rawOptions: r, options: i, src: u, srcSet: { values: l, attribute: l.map((c) => `${c.url} ${c.descriptor}`).join(", ") }, attributes: n.getHTMLAttributes !== void 0 ? await n.getHTMLAttributes(i, t) : {} };
}
async function dD(e2) {
  try {
    let t = await fetch(e2);
    return t.ok ? await t.arrayBuffer() : void 0;
  } catch {
    return;
  }
}
var Bl;
var sD;
var iD;
var aD;
var uD;
var cD;
var lD;
var vo;
var Si;
var fD;
var Ml = te(() => {
  Ln();
  Bl = Ao(Tl(), 1);
  Ge();
  Ai();
  ze();
  Ke();
  sD = (e2) => {
    let t = e2.length, n = 0, r = 0, o = 8997, s = 0, i = 33826, a = 0, u = 40164, l = 0, c = 52210;
    for (; n < t; )
      o ^= e2.charCodeAt(n++), r = o * 435, s = i * 435, a = u * 435, l = c * 435, a += o << 8, l += i << 8, s += r >>> 16, o = r & 65535, a += s >>> 16, i = s & 65535, c = l + (a >>> 16) & 65535, u = a & 65535;
    return (c & 15) * 281474976710656 + u * 4294967296 + i * 65536 + (o ^ c >> 4);
  }, iD = (e2, t = false) => (t ? 'W/"' : '"') + sD(e2).toString(36) + e2.length.toString(36) + '"', aD = be(), uD = ve(async (e2, t, n) => {
    let r = e2.createAstro(aD, t, n);
    r.self = uD;
    let o = r.props;
    if (o.alt === void 0 || o.alt === null)
      throw new q(ns);
    typeof o.width == "string" && (o.width = parseInt(o.width)), typeof o.height == "string" && (o.height = parseInt(o.height));
    let s = await Si(o), i = {};
    return s.srcSet.values.length > 0 && (i.srcset = s.srcSet.attribute), ce`${xr()}<img${ct(s.src, "src")}${At(i)}${At(s.attributes)}>`;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/node_modules/astro/components/Image.astro", void 0), cD = be(), lD = ve(async (e2, t, n) => {
    let r = e2.createAstro(cD, t, n);
    r.self = lD;
    let o = ["webp"], s = "png", i = ["gif", "svg", "jpg", "jpeg"], { formats: a = o, pictureAttributes: u = {}, fallbackFormat: l, ...c } = r.props;
    if (c.alt === void 0 || c.alt === null)
      throw new q(ns);
    let f = await Promise.all(a.map(async (R) => await Si({ ...c, format: R, widths: c.widths, densities: c.densities }))), m = l ?? s;
    !l && Ft(c.src) && i.includes(c.src.format) && (m = c.src.format);
    let v = await Si({ ...c, format: m, widths: c.widths, densities: c.densities }), A = {}, w = {};
    return c.sizes && (w.sizes = c.sizes), v.srcSet.values.length > 0 && (A.srcset = v.srcSet.attribute), ce`${xr()}<picture${At(u)}> ${Object.entries(f).map(([R, I]) => {
      let V = c.densities || !c.densities && !c.widths ? `${I.src}${I.srcSet.values.length > 0 ? ", " + I.srcSet.attribute : ""}` : I.srcSet.attribute;
      return ce`<source${ct(V, "srcset")}${ct("image/" + I.options.format, "type")}${At(w)}>`;
    })} <img${ct(v.src, "src")}${At(A)}${At(v.attributes)}> </picture>`;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/node_modules/astro/components/Picture.astro", void 0), vo = { service: { entrypoint: "astro/assets/services/noop", config: {} }, domains: [], remotePatterns: [] };
  new URL("file:///C:/wamp64/www/github/vue/prod/good-things-foundation-astro/dist/");
  Si = async (e2) => await oD(e2, vo);
  fD = async ({ request: e2 }) => {
    try {
      let t = await Il();
      if (!("transform" in t))
        throw new Error("Configured image service is not a local service");
      let n = new URL(e2.url), r = await t.parseURL(n, vo);
      if (!r?.src)
        throw new Error("Incorrect transform returned by `parseURL`");
      let o, s = mn(r.src) ? new URL(r.src) : new URL(r.src, n.origin);
      if (mn(r.src) && Eo(r.src, vo) === false)
        return new Response("Forbidden", { status: 403 });
      if (o = await dD(s), !o)
        return new Response("Not Found", { status: 404 });
      let { data: i, format: a } = await t.transform(new Uint8Array(o), r, vo);
      return new Response(i, { status: 200, headers: { "Content-Type": Bl.default.getType(a) ?? `image/${a}`, "Cache-Control": "public, max-age=31536000", ETag: iD(i.toString()), Date: (/* @__PURE__ */ new Date()).toUTCString() } });
    } catch (t) {
      return console.error("Could not process image request:", t), new Response(`Server Error: ${t}`, { status: 500 });
    }
  };
});
var jl = {};
Ne(jl, { onRequest: () => Te, page: () => pD, renderers: () => xe });
var pD;
var Hl = te(() => {
  wt();
  zt();
  pD = () => Promise.resolve().then(() => (Ml(), Ll));
});
var ed = {};
Ne(ed, { $: () => ke, _: () => le, g: () => RD });
function mD(e2, t, n, r, o, s, i, a) {
  t(`<div${me(ae({ class: "card" }, r))} data-v-3c553506><h2 data-v-3c553506>${Ee(o.heading)}</h2><p data-v-3c553506>${Ee(o.text)}</p><button${at("id", o.name)} class="${He(o.cardButtonClass)}" type="button" data-v-3c553506>${Ee(o.cardButton)}</button></div>`);
}
function gD(e2, t, n, r, o, s, i, a) {
  t(`<section${me(ae({ class: "card-container", "aria-labelledby": s.store.getAriaLabel }, r))} data-v-cbb8b709><h1${at("id", s.store.getAriaLabel)} class="card-container__heading" data-v-cbb8b709>${Ee(s.store.getTitle())}</h1><p class="card-container__text" data-v-cbb8b709>${Ee(s.store.getDetails())}</p><div class="card-container__container" data-v-cbb8b709><!--[-->`), Pn(s.store.getCardContent(), (u) => {
    t(Ue(s.InfoCard, { key: u.id, name: u.name, heading: u.heading, text: u.text, cardButton: u.cardButton, cardButtonClass: s.store.getCardButtonClass() }, null, n));
  }), t(`<!--]--></div><button${at("id", s.store.getMainButton().name)} class="${He(s.store.getMainButton().class)}" type="button" data-v-cbb8b709>${Ee(s.store.getMainButton().text)}</button></section>`);
}
function yD(e2, t, n, r, o, s, i, a) {
  t(`<li${me(ae({ class: "navbar__item" }, r))} data-v-05a92d8a><a${at("href", o.name)} data-v-05a92d8a>${Ee(o.title)}</a></li>`);
}
function ED(e2, t, n, r, o, s, i, a) {
  t(`<nav${me(ae({ class: "navbar navbar--style", "aria-label": "primary" }, r))} data-v-1b4918bc><div class="navbar__element" data-v-1b4918bc><div class="navbar__element navbar__element--burger" data-v-1b4918bc><i class="fa fa-bars" data-v-1b4918bc></i></div><ul id="menu" class="navbar__list navbar__list--style" data-v-1b4918bc><!--[-->`), Pn(s.store.getMenu(), (u) => {
    t(Ue(s.NavItem, { key: u.id, name: u.name, title: u.title }, null, n));
  }), t("<!--]--></ul></div></nav>");
}
function bD(e2, t, n, r) {
  t(`<form${me(ae({ class: "search-form" }, r))} data-v-efff20de><label class="search-form__icon" for="search" data-v-efff20de><i title="search" aria-hidden="true" class="fa-solid fa-magnifying-glass" data-v-efff20de></i><span class="sr-only" data-v-efff20de>Search input field</span></label><input class="search-form__input" type="search" id="search" name="search" placeholder="Search" data-v-efff20de></form>`);
}
function ND(e2, t, n, r) {
  t(`<section${me(ae({ class: "placeholder-content" }, r))}><h1>Get Involved</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></section>`);
}
var Ul;
var le;
var Oi;
var ql;
var hD;
var Ti;
var Wl;
var DD;
var Ri;
var zl;
var _D;
var Kl;
var $i;
var Gl;
var vD;
var Pi;
var Yl;
var wD;
var Jl;
var FD;
var CD;
var Xl;
var xD;
var ke;
var Vi;
var Ql;
var AD;
var SD;
var Zl;
var OD;
var TD;
var RD;
var ln = te(() => {
  Ge();
  et();
  ze();
  Ke();
  bt();
  Wt();
  Ul = function() {
    let e2 = { title: "What do we do?", ariaLabel: "what-do-we-do", details: "You might not have heard of us, but we're the people behind the following impactful programmes.", cardContent: [{ id: 1, name: "get-online", heading: "Get online week", text: "Lorem ipsum dolor sit amet", cardButton: "Read more" }, { id: 2, name: "learn-my-way", heading: "Learn my way", text: "Lorem ipsum dolor sit amet", cardButton: "Read more" }, { id: 3, name: "make-it-click", heading: "Make it click", text: "Lorem ipsum dolor sit amet", cardButton: "Read more" }, { id: 4, name: "digital-you", heading: "Digital you", text: "Lorem ipsum dolor sit amet", cardButton: "Read more" }], cardButtonClass: "card__button card__button--red", mainButton: { name: "more-about", text: "More about what we do", class: "card-container__button card-container__button--red" } };
    return { getTitle: () => e2.title, getAriaLabel: () => e2.ariaLabel, getDetails: () => e2.details, getCardContent: () => e2.cardContent, getCardButtonClass: () => e2.cardButtonClass, getMainButton: () => e2.mainButton };
  }(), le = (e2, t) => {
    let n = e2.__vccOpts || e2;
    for (let [r, o] of t)
      n[r] = o;
    return n;
  }, Oi = { __name: "InfoCard", props: { name: { type: String, required: true }, heading: { type: String, required: true }, text: { type: String, required: true }, cardButton: { type: String, required: true }, cardButtonClass: { type: String, required: true } }, setup(e2, { expose: t }) {
    t();
    let n = {};
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  ql = Oi.setup;
  Oi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/InfoCard.vue"), ql ? ql(e2, t) : void 0;
  };
  hD = le(Oi, [["ssrRender", mD], ["__scopeId", "data-v-3c553506"]]), Ti = { __name: "CardContainer", setup(e2, { expose: t }) {
    t();
    let r = { store: Ul, get useCardContainerStore() {
      return Ul;
    }, InfoCard: hD };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  Wl = Ti.setup;
  Ti.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/CardContainer.vue"), Wl ? Wl(e2, t) : void 0;
  };
  DD = le(Ti, [["ssrRender", gD], ["__scopeId", "data-v-cbb8b709"]]), Ri = { __name: "NavItem", props: { name: { type: String, required: true }, title: { type: String, required: true } }, setup(e2, { expose: t }) {
    t();
    let n = {};
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  zl = Ri.setup;
  Ri.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/NavItem.vue"), zl ? zl(e2, t) : void 0;
  };
  _D = le(Ri, [["ssrRender", yD], ["__scopeId", "data-v-05a92d8a"]]), Kl = function() {
    let e2 = { menu: [{ id: 1, name: "/", title: "Home" }, { id: 2, name: "/what-to-do/", title: "What To Do" }, { id: 3, name: "/the-digital-divide/", title: "The Digital Divide" }, { id: 4, name: "/get-involved/", title: "Get Involved" }, { id: 5, name: "/our-network/", title: "Our Network" }, { id: 6, name: "/insights/", title: "Insights" }] };
    return { getMenu: () => e2.menu };
  }(), $i = { __name: "NavMenu", setup(e2, { expose: t }) {
    t();
    let r = { store: Kl, NavItem: _D, get useNavItemsStore() {
      return Kl;
    } };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  Gl = $i.setup;
  $i.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/NavMenu.vue"), Gl ? Gl(e2, t) : void 0;
  };
  vD = le($i, [["ssrRender", ED], ["__scopeId", "data-v-1b4918bc"]]), Pi = {};
  Yl = Pi.setup;
  Pi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/SearchForm.vue"), Yl ? Yl(e2, t) : void 0;
  };
  wD = le(Pi, [["ssrRender", bD], ["__scopeId", "data-v-efff20de"]]), Jl = Object.freeze, FD = Object.defineProperty, CD = (e2, t) => Jl(FD(e2, "raw", { value: Jl(t || e2.slice()) })), xD = be(), ke = ve(async (e2, t, n) => {
    let r = e2.createAstro(xD, t, n);
    r.self = ke;
    let { title: o } = r.props;
    return ce(Xl || (Xl = CD(['<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" href="/favicon.png"><script src="https://kit.fontawesome.com/1e75f7228b.js" crossorigin="anonymous"><\/script><meta name="generator"', "><title>", "</title>", '</head> <body> <header class="header"> ', ' <button class="mode-button mode-button--white" type="button">Learn</button> <button class="mode-button mode-button--red" type="button">Donate</button> <img class="logo" src="/logo.png" alt="Good Things Foundation Logo"> ', " </header> ", " ", " </body></html>"])), ct(r.generator, "content"), o, Ya(), pe(e2, "SearchForm", wD, {}), pe(e2, "NavMenu", vD, {}), Nr(e2, n.default), pe(e2, "CardContainer", DD, {}));
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/layouts/Layout.astro", void 0), Vi = {};
  Ql = Vi.setup;
  Vi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/GetInvolvedView.vue"), Ql ? Ql(e2, t) : void 0;
  };
  AD = le(Vi, [["ssrRender", ND]]), SD = be(), Zl = ve(async (e2, t, n) => {
    let r = e2.createAstro(SD, t, n);
    return r.self = Zl, ce`${pe(e2, "Layout", ke, { title: "Get Involved" }, { default: (o) => ce` ${pe(o, "GetInvolvedView", AD, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/get-involved.astro", void 0), OD = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/get-involved.astro", TD = "/get-involved", RD = Object.freeze(Object.defineProperty({ __proto__: null, default: Zl, file: OD, url: TD }, Symbol.toStringTag, { value: "Module" }));
});
var hd = {};
Ne(hd, { default: () => md, file: () => YD, url: () => JD });
function $D(e2, t, n, r, o, s, i, a) {
  t(`<section${me(ae({ class: o.section.class, "aria-labelledby": o.section.aria }, r))} data-v-8486293f><h1 class="${He(o.heading.class)}"${at("id", o.section.aria)} data-v-8486293f>${Ee(o.heading.text)}</h1>`), o.paragraph ? t(`<p class="${He(o.paragraph.class)}" data-v-8486293f>${Ee(o.paragraph.text)}</p>`) : t("<!---->"), o.button ? t(`<button class="${He(o.button.class)}" type="button" data-v-8486293f>${Ee(o.button.text)}</button>`) : t("<!---->"), t("</section>");
}
function PD(e2, t, n, r, o, s, i, a) {
  t(Ue(s.HeadlineBlock, ae({ section: s.store.getSection(), heading: s.store.getHeading(), paragraph: s.store.getParagraph(), button: s.store.getButton() }, r), null, n));
}
function kD(e2, t, n, r, o, s, i, a) {
  t(`<!--[--><div class="${He(s.store.getImage().class)}" data-v-61c0cdde></div>`), t(Ue(s.HeadlineBlock, { section: s.store.getSection(), heading: s.store.getHeading(), paragraph: s.store.getParagraph(), button: s.store.getButton() }, null, n)), t("<!--]-->");
}
function ID(e2, t, n, r, o, s, i, a) {
  t(`<option${me(ae({ value: o.value }, r))}>${Ee(o.text)}</option>`);
}
function MD(e2, t, n, r, o, s, i, a) {
  t(`<!--[--><label class="${He(o.labelClass)}"${at("for", o.selectId)} data-v-90b2dd79>${Ee(o.label)}</label><select class="${He(o.selectClass)}"${at("id", o.selectId)} data-v-90b2dd79><!--[-->`), Pn(o.options, (u) => {
    t(Ue(s.SelectOption, { key: u.value, value: u.value, text: u.text }, null, n));
  }), t("<!--]--></select><!--]-->");
}
function HD(e2, t, n, r, o, s, i, a) {
  t(`<form${me(ae({ class: s.store.getFormClass(), id: s.store.getFormId() }, r))} data-v-d22652fd><!--[-->`), Pn(s.store.getSelectBoxes(), (u) => {
    t(Ue(s.SelectInput, { key: u.id, labelClass: u.labelClass, label: u.label, selectClass: u.selectClass, selectId: u.selectId, options: u.options }, null, n));
  }), t(`<!--]--><button class="${He(s.store.getButtonClass())}" type="button" data-v-d22652fd>${Ee(s.store.getButtonText())}</button></form>`);
}
function qD(e2, t, n, r, o, s, i, a) {
  t(`<section${me(ae({ class: "question-box", "aria-labelledby": s.store.getAriaLabel }, r))} data-v-957a249f><h1 class="question-box__heading"${at("id", s.store.getAriaLabel)} data-v-957a249f>${Ee(s.store.getHeading())}</h1><p class="question-box__text" data-v-957a249f>${Ee(s.store.getText())}</p>`), t(Ue(s.QuestionForm, null, null, n)), t("</section>");
}
function zD(e2, t, n, r, o, s, i, a) {
  t(`<main${me(ae({ class: "main-content" }, r))} data-v-646d235a>`), t(Ue(s.HeroBanner, null, null, n)), t(Ue(s.HeadlineBanner, null, null, n)), t(Ue(s.QuestionBox, null, null, n)), t("</main>");
}
var td;
var ki;
var nd;
var pd;
var Bi;
var rd;
var VD;
var od;
var Ii;
var sd;
var BD;
var id;
var ad;
var Li;
var ud;
var LD;
var Mi;
var cd;
var jD;
var ji;
var ld;
var UD;
var Hi;
var dd;
var WD;
var Ui;
var fd;
var KD;
var GD;
var md;
var YD;
var JD;
var gd = te(() => {
  Ge();
  et();
  ze();
  Ke();
  ln();
  bt();
  Wt();
  td = function() {
    let e2 = { section: { class: "headline headline--image headline--fifty headline--volunteers", aria: "get-online-week" }, heading: { class: "headline__heading headline__heading--hero", text: "Get online week 2021" }, paragraph: { class: "headline__text headline__text--hero", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }, button: { class: "headline__button headline__button--hero", text: "Get involved now!" } };
    return { getSection: () => e2.section, getHeading: () => e2.heading, getParagraph: () => e2.paragraph, getButton: () => e2.button };
  }(), ki = { __name: "HeadlineBlock", props: { section: { type: Object, required: true }, heading: { type: Object, required: true }, paragraph: { type: Object, required: false }, button: { type: Object, required: false } }, setup(e2, { expose: t }) {
    t();
    let n = {};
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  nd = ki.setup;
  ki.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/HeadlineBlock.vue"), nd ? nd(e2, t) : void 0;
  };
  pd = le(ki, [["ssrRender", $D], ["__scopeId", "data-v-8486293f"]]), Bi = { __name: "HeroBanner", setup(e2, { expose: t }) {
    t();
    let r = { store: td, get useHeroBannerStore() {
      return td;
    }, HeadlineBlock: pd };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  rd = Bi.setup;
  Bi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/HeroBanner.vue"), rd ? rd(e2, t) : void 0;
  };
  VD = le(Bi, [["ssrRender", PD]]), od = function() {
    let e2 = { section: { class: "headline headline--blue headline--thirty headline--half", aria: "helping-people" }, heading: { class: "headline__heading headline__heading--box", text: "We are a social change charity, helping people to improve their lives through digital." }, paragraph: { class: "headline__text headline__text--box", text: "We tackle the most pressing issues of our time, working with partners in thousands of communities across the UK and further afield." }, button: { class: "headline__button headline__button--box", text: "Learn more about us" }, image: { class: "image-box image-box--charity-people image-box--thirty" } };
    return { getSection: () => e2.section, getHeading: () => e2.heading, getParagraph: () => e2.paragraph, getButton: () => e2.button, getImage: () => e2.image };
  }(), Ii = { __name: "HeadlineBanner", setup(e2, { expose: t }) {
    t();
    let r = { store: od, get useHeadlineBannerStore() {
      return od;
    }, HeadlineBlock: pd };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  sd = Ii.setup;
  Ii.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/HeadlineBanner.vue"), sd ? sd(e2, t) : void 0;
  };
  BD = le(Ii, [["ssrRender", kD], ["__scopeId", "data-v-61c0cdde"]]), id = function() {
    let e2 = { ariaLabel: "how-can-we-help", heading: "How can we help you?", text: "Let us know who you are and what you're looking for, and we'll help you get to the right place." };
    return { getHeading: () => e2.heading, getText: () => e2.text };
  }(), ad = function() {
    let e2 = { formClass: "question-box__form", formId: "i-form", selectBoxes: [{ id: 1, labelClass: "question-box__label", label: "I am", selectClass: "question-box__select", selectId: "i-am", options: [{ value: "individual", text: "an individual" }, { value: "organisation", text: "a group" }, { value: "group", text: "an individual" }, { value: "journalist", text: "a journalist" }] }, { id: 2, labelClass: "question-box__label", label: "and I want", selectClass: "question-box__select", selectId: "i-want", options: [{ value: "learn", text: "to learn" }, { value: "get-advice", text: "to get advice" }, { value: "volunteer", text: "to volunteer" }, { value: "speak", text: "to speak to someone" }] }], buttonClass: "question-box__button question-box__button--red", buttonText: "Start now" };
    return { getFormClass: () => e2.formClass, getFormId: () => e2.formId, getSelectBoxes: () => e2.selectBoxes, getButtonClass: () => e2.buttonClass, getButtonText: () => e2.buttonText };
  }(), Li = { __name: "SelectOption", props: { value: { type: String, required: true }, text: { type: String, required: true } }, setup(e2, { expose: t }) {
    t();
    let n = {};
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  ud = Li.setup;
  Li.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/SelectOption.vue"), ud ? ud(e2, t) : void 0;
  };
  LD = le(Li, [["ssrRender", ID]]), Mi = { __name: "SelectInput", props: { labelClass: { type: String, required: true }, label: { type: String, required: true }, selectClass: { type: String, required: true }, selectId: { type: String, required: true }, options: { type: Array, required: true } }, setup(e2, { expose: t }) {
    t();
    let n = { SelectOption: LD };
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  cd = Mi.setup;
  Mi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/SelectInput.vue"), cd ? cd(e2, t) : void 0;
  };
  jD = le(Mi, [["ssrRender", MD], ["__scopeId", "data-v-90b2dd79"]]), ji = { __name: "QuestionForm", setup(e2, { expose: t }) {
    t();
    let r = { store: ad, get useQuestionFormStore() {
      return ad;
    }, SelectInput: jD };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  ld = ji.setup;
  ji.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/QuestionForm.vue"), ld ? ld(e2, t) : void 0;
  };
  UD = le(ji, [["ssrRender", HD], ["__scopeId", "data-v-d22652fd"]]), Hi = { __name: "QuestionBox", setup(e2, { expose: t }) {
    t();
    let r = { store: id, get useQuestionBoxStore() {
      return id;
    }, QuestionForm: UD };
    return Object.defineProperty(r, "__isScriptSetup", { enumerable: false, value: true }), r;
  } };
  dd = Hi.setup;
  Hi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/components/QuestionBox.vue"), dd ? dd(e2, t) : void 0;
  };
  WD = le(Hi, [["ssrRender", qD], ["__scopeId", "data-v-957a249f"]]), Ui = { __name: "HomeView", setup(e2, { expose: t }) {
    t();
    let n = { HeroBanner: VD, HeadlineBanner: BD, QuestionBox: WD };
    return Object.defineProperty(n, "__isScriptSetup", { enumerable: false, value: true }), n;
  } };
  fd = Ui.setup;
  Ui.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/HomeView.vue"), fd ? fd(e2, t) : void 0;
  };
  KD = le(Ui, [["ssrRender", zD], ["__scopeId", "data-v-646d235a"]]), GD = be(), md = ve(async (e2, t, n) => {
    let r = e2.createAstro(GD, t, n);
    return r.self = md, ce`${pe(e2, "Layout", ke, { title: "Good Things Foundation" }, { default: (o) => ce` ${pe(o, "HomeView", KD, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/index.astro", void 0), YD = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/index.astro", JD = "";
});
var Dd = {};
Ne(Dd, { onRequest: () => Te, page: () => XD, renderers: () => xe });
var XD;
var yd = te(() => {
  wt();
  zt();
  XD = () => Promise.resolve().then(() => (gd(), hd));
});
var _d = {};
Ne(_d, { onRequest: () => Te, page: () => QD, renderers: () => xe });
var QD;
var Ed = te(() => {
  wt();
  zt();
  QD = () => Promise.resolve().then(() => (ln(), ed)).then((e2) => e2.g);
});
var wd = {};
Ne(wd, { default: () => bd, file: () => n0, url: () => r0 });
function ZD(e2, t, n, r) {
  t(`<section${me(ae({ class: "placeholder-content" }, r))}><h1>Insights</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></section>`);
}
var qi;
var vd;
var e0;
var t0;
var bd;
var n0;
var r0;
var Fd = te(() => {
  Ge();
  et();
  ze();
  Ke();
  ln();
  bt();
  Wt();
  qi = {};
  vd = qi.setup;
  qi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/InsightsView.vue"), vd ? vd(e2, t) : void 0;
  };
  e0 = le(qi, [["ssrRender", ZD]]), t0 = be(), bd = ve(async (e2, t, n) => {
    let r = e2.createAstro(t0, t, n);
    return r.self = bd, ce`${pe(e2, "Layout", ke, { title: "Insights" }, { default: (o) => ce` ${pe(o, "InsightsView", e0, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/insights.astro", void 0), n0 = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/insights.astro", r0 = "/insights";
});
var Cd = {};
Ne(Cd, { onRequest: () => Te, page: () => o0, renderers: () => xe });
var o0;
var xd = te(() => {
  wt();
  zt();
  o0 = () => Promise.resolve().then(() => (Fd(), wd));
});
var Sd = {};
Ne(Sd, { default: () => Ad, file: () => u0, url: () => c0 });
function s0(e2, t, n, r) {
  t(`<section${me(ae({ class: "placeholder-content" }, r))}><h1>Our Network</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></section>`);
}
var Wi;
var Nd;
var i0;
var a0;
var Ad;
var u0;
var c0;
var Od = te(() => {
  Ge();
  et();
  ze();
  Ke();
  ln();
  bt();
  Wt();
  Wi = {};
  Nd = Wi.setup;
  Wi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/OurNetworkView.vue"), Nd ? Nd(e2, t) : void 0;
  };
  i0 = le(Wi, [["ssrRender", s0]]), a0 = be(), Ad = ve(async (e2, t, n) => {
    let r = e2.createAstro(a0, t, n);
    return r.self = Ad, ce`${pe(e2, "Layout", ke, { title: "Our Network" }, { default: (o) => ce` ${pe(o, "OurNetworkView", i0, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/our-network.astro", void 0), u0 = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/our-network.astro", c0 = "/our-network";
});
var Td = {};
Ne(Td, { onRequest: () => Te, page: () => l0, renderers: () => xe });
var l0;
var Rd = te(() => {
  wt();
  zt();
  l0 = () => Promise.resolve().then(() => (Od(), Sd));
});
var Vd = {};
Ne(Vd, { default: () => Pd, file: () => m0, url: () => h0 });
function d0(e2, t, n, r) {
  t(`<section${me(ae({ class: "placeholder-content" }, r))}><h1>The Digital Divide</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></section>`);
}
var zi;
var $d;
var f0;
var p0;
var Pd;
var m0;
var h0;
var kd = te(() => {
  Ge();
  et();
  ze();
  Ke();
  ln();
  bt();
  Wt();
  zi = {};
  $d = zi.setup;
  zi.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/TheDigitalDivideView.vue"), $d ? $d(e2, t) : void 0;
  };
  f0 = le(zi, [["ssrRender", d0]]), p0 = be(), Pd = ve(async (e2, t, n) => {
    let r = e2.createAstro(p0, t, n);
    return r.self = Pd, ce`${pe(e2, "Layout", ke, { title: "The Digital Divide" }, { default: (o) => ce` ${pe(o, "TheDigitalDivideView", f0, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/the-digital-divide.astro", void 0), m0 = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/the-digital-divide.astro", h0 = "/the-digital-divide";
});
var Bd = {};
Ne(Bd, { onRequest: () => Te, page: () => g0, renderers: () => xe });
var g0;
var Id = te(() => {
  wt();
  zt();
  g0 = () => Promise.resolve().then(() => (kd(), Vd));
});
var jd = {};
Ne(jd, { default: () => Md, file: () => E0, url: () => v0 });
function D0(e2, t, n, r) {
  t(`<section${me(ae({ class: "placeholder-content" }, r))}><h1>What To Do</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></section>`);
}
var Ki;
var Ld;
var y0;
var _0;
var Md;
var E0;
var v0;
var Hd = te(() => {
  Ge();
  et();
  ze();
  Ke();
  ln();
  bt();
  Wt();
  Ki = {};
  Ld = Ki.setup;
  Ki.setup = (e2, t) => {
    let n = ie();
    return (n.modules || (n.modules = /* @__PURE__ */ new Set())).add("src/views/WhatToDoView.vue"), Ld ? Ld(e2, t) : void 0;
  };
  y0 = le(Ki, [["ssrRender", D0]]), _0 = be(), Md = ve(async (e2, t, n) => {
    let r = e2.createAstro(_0, t, n);
    return r.self = Md, ce`${pe(e2, "Layout", ke, { title: "What To Do" }, { default: (o) => ce` ${pe(o, "WhatToDoView", y0, {})} ` })} `;
  }, "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/what-to-do.astro", void 0), E0 = "C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/what-to-do.astro", v0 = "/what-to-do";
});
var Ud = {};
Ne(Ud, { onRequest: () => Te, page: () => b0, renderers: () => xe });
var b0;
var qd = te(() => {
  wt();
  zt();
  b0 = () => Promise.resolve().then(() => (Hd(), jd));
});
Ln();
var dr = Ao($o(), 1);
Ge();
Ln();
var h_ = Ao($o(), 1);
et();
function ms({ onlyFirst: e2 = false } = {}) {
  let t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
  return new RegExp(t, e2 ? void 0 : "g");
}
var Jy = ms();
ze();
Ke();
Ge();
function qp(e2) {
  for (var t = [], n = 0; n < e2.length; ) {
    var r = e2[n];
    if (r === "*" || r === "+" || r === "?") {
      t.push({ type: "MODIFIER", index: n, value: e2[n++] });
      continue;
    }
    if (r === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: n++, value: e2[n++] });
      continue;
    }
    if (r === "{") {
      t.push({ type: "OPEN", index: n, value: e2[n++] });
      continue;
    }
    if (r === "}") {
      t.push({ type: "CLOSE", index: n, value: e2[n++] });
      continue;
    }
    if (r === ":") {
      for (var o = "", s = n + 1; s < e2.length; ) {
        var i = e2.charCodeAt(s);
        if (i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122 || i === 95) {
          o += e2[s++];
          continue;
        }
        break;
      }
      if (!o)
        throw new TypeError("Missing parameter name at ".concat(n));
      t.push({ type: "NAME", index: n, value: o }), n = s;
      continue;
    }
    if (r === "(") {
      var a = 1, u = "", s = n + 1;
      if (e2[s] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(s));
      for (; s < e2.length; ) {
        if (e2[s] === "\\") {
          u += e2[s++] + e2[s++];
          continue;
        }
        if (e2[s] === ")") {
          if (a--, a === 0) {
            s++;
            break;
          }
        } else if (e2[s] === "(" && (a++, e2[s + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(s));
        u += e2[s++];
      }
      if (a)
        throw new TypeError("Unbalanced pattern at ".concat(n));
      if (!u)
        throw new TypeError("Missing pattern at ".concat(n));
      t.push({ type: "PATTERN", index: n, value: u }), n = s;
      continue;
    }
    t.push({ type: "CHAR", index: n, value: e2[n++] });
  }
  return t.push({ type: "END", index: n, value: "" }), t;
}
function Wp(e2, t) {
  t === void 0 && (t = {});
  for (var n = qp(e2), r = t.prefixes, o = r === void 0 ? "./" : r, s = "[^".concat(Kp(t.delimiter || "/#?"), "]+?"), i = [], a = 0, u = 0, l = "", c = function(j) {
    if (u < n.length && n[u].type === j)
      return n[u++].value;
  }, f = function(j) {
    var D = c(j);
    if (D !== void 0)
      return D;
    var F = n[u], O = F.type, k = F.index;
    throw new TypeError("Unexpected ".concat(O, " at ").concat(k, ", expected ").concat(j));
  }, m = function() {
    for (var j = "", D; D = c("CHAR") || c("ESCAPED_CHAR"); )
      j += D;
    return j;
  }; u < n.length; ) {
    var v = c("CHAR"), A = c("NAME"), w = c("PATTERN");
    if (A || w) {
      var R = v || "";
      o.indexOf(R) === -1 && (l += R, R = ""), l && (i.push(l), l = ""), i.push({ name: A || a++, prefix: R, suffix: "", pattern: w || s, modifier: c("MODIFIER") || "" });
      continue;
    }
    var I = v || c("ESCAPED_CHAR");
    if (I) {
      l += I;
      continue;
    }
    l && (i.push(l), l = "");
    var V = c("OPEN");
    if (V) {
      var R = m(), h = c("NAME") || "", _ = c("PATTERN") || "", S = m();
      f("CLOSE"), i.push({ name: h || (_ ? a++ : ""), pattern: h && !_ ? s : _, prefix: R, suffix: S, modifier: c("MODIFIER") || "" });
      continue;
    }
    f("END");
  }
  return i;
}
function ru(e2, t) {
  return zp(Wp(e2, t), t);
}
function zp(e2, t) {
  t === void 0 && (t = {});
  var n = Gp(t), r = t.encode, o = r === void 0 ? function(u) {
    return u;
  } : r, s = t.validate, i = s === void 0 ? true : s, a = e2.map(function(u) {
    if (typeof u == "object")
      return new RegExp("^(?:".concat(u.pattern, ")$"), n);
  });
  return function(u) {
    for (var l = "", c = 0; c < e2.length; c++) {
      var f = e2[c];
      if (typeof f == "string") {
        l += f;
        continue;
      }
      var m = u ? u[f.name] : void 0, v = f.modifier === "?" || f.modifier === "*", A = f.modifier === "*" || f.modifier === "+";
      if (Array.isArray(m)) {
        if (!A)
          throw new TypeError('Expected "'.concat(f.name, '" to not repeat, but got an array'));
        if (m.length === 0) {
          if (v)
            continue;
          throw new TypeError('Expected "'.concat(f.name, '" to not be empty'));
        }
        for (var w = 0; w < m.length; w++) {
          var R = o(m[w], f);
          if (i && !a[c].test(R))
            throw new TypeError('Expected all "'.concat(f.name, '" to match "').concat(f.pattern, '", but got "').concat(R, '"'));
          l += f.prefix + R + f.suffix;
        }
        continue;
      }
      if (typeof m == "string" || typeof m == "number") {
        var R = o(String(m), f);
        if (i && !a[c].test(R))
          throw new TypeError('Expected "'.concat(f.name, '" to match "').concat(f.pattern, '", but got "').concat(R, '"'));
        l += f.prefix + R + f.suffix;
        continue;
      }
      if (!v) {
        var I = A ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(f.name, '" to be ').concat(I));
      }
    }
    return l;
  };
}
function Kp(e2) {
  return e2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Gp(e2) {
  return e2 && e2.sensitive ? "" : "i";
}
var Yp = new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
var Un = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 };
function hs(e2, t, n, r, o = true) {
  let s = e2.level, i = e2.dest, a = { label: n, level: t, message: r, newLine: o };
  Jp(s, t) && i.write(a);
}
function Jp(e2, t) {
  return Un[e2] <= Un[t];
}
function ou(e2, t, n, r = true) {
  return hs(e2, "info", t, n, r);
}
function su(e2, t, n, r = true) {
  return hs(e2, "warn", t, n, r);
}
function iu(e2, t, n, r = true) {
  return hs(e2, "error", t, n, r);
}
function au(...e2) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e2);
}
function uu({ level: e2, label: t }) {
  let n = `${Yp.format(/* @__PURE__ */ new Date())}`, r = [];
  return e2 === "error" || e2 === "warn" ? (r.push(Dr(n)), r.push(`[${e2.toUpperCase()}]`)) : r.push(n), t && r.push(`[${t}]`), e2 === "error" ? ma(r.join(" ")) : e2 === "warn" ? ha(r.join(" ")) : r.length === 1 ? Vo(r[0]) : Vo(r[0]) + " " + ga(r.splice(1).join(" "));
}
if (typeof process < "u") {
  let e2 = process;
  "argv" in e2 && Array.isArray(e2.argv) && (e2.argv.includes("--verbose") || e2.argv.includes("--silent"));
}
var Ar = class {
  options;
  constructor(t) {
    this.options = t;
  }
  info(t, n, r = true) {
    ou(this.options, t, n, r);
  }
  warn(t, n, r = true) {
    su(this.options, t, n, r);
  }
  error(t, n, r = true) {
    iu(this.options, t, n, r);
  }
  debug(t, ...n) {
    au(t, ...n);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(t) {
    return new qn(this.options, t);
  }
};
var qn = class e {
  options;
  label;
  constructor(t, n) {
    this.options = t, this.label = n;
  }
  fork(t) {
    return new e(this.options, t);
  }
  info(t) {
    ou(this.options, this.label, t);
  }
  warn(t) {
    su(this.options, this.label, t);
  }
  error(t) {
    iu(this.options, this.label, t);
  }
  debug(t) {
    au(this.label, t);
  }
};
function Xp(e2, t) {
  let n = e2.map((s) => "/" + s.map((i) => i.spread ? `:${i.content.slice(3)}(.*)?` : i.dynamic ? `:${i.content}` : i.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join(""), r = "";
  return t === "always" && e2.length && (r = "/"), ru(n + r);
}
function Sr(e2) {
  return { route: e2.route, type: e2.type, pattern: new RegExp(e2.pattern), params: e2.params, component: e2.component, generate: Xp(e2.segments, e2._meta.trailingSlash), pathname: e2.pathname || void 0, segments: e2.segments, prerender: e2.prerender, redirect: e2.redirect, redirectRoute: e2.redirectRoute ? Sr(e2.redirectRoute) : void 0, fallbackRoutes: e2.fallbackRoutes.map((t) => Sr(t)) };
}
function Qp(e2) {
  let t = [];
  for (let s of e2.routes) {
    t.push({ ...s, routeData: Sr(s.routeData) });
    let i = s;
    i.routeData = Sr(s.routeData);
  }
  let n = new Set(e2.assets), r = new Map(e2.componentMetadata), o = new Map(e2.clientDirectives);
  return { ...e2, assets: n, componentMetadata: r, clientDirectives: o, routes: t };
}
var cu = Qp({ adapterName: "@astrojs/cloudflare", routes: [{ file: "", links: [], scripts: [], styles: [], routeData: { type: "endpoint", isIndex: false, route: "/_image", pattern: "^\\/_image$", segments: [[{ content: "_image", dynamic: false, spread: false }]], params: [], component: "node_modules/astro/dist/assets/endpoint/generic.js", pathname: "/_image", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.headline[data-v-8486293f]{margin:0;text-align:center;flex-basis:100%;background-position:center;padding:2% 6%}@media (min-width: 768px){.headline[data-v-8486293f]{text-align:left}}.headline--volunteers[data-v-8486293f]{background-image:url(/_astro/volunteers.BQPeqUAm.png);background-repeat:no-repeat;background-size:cover}.headline--thirty[data-v-8486293f]{min-height:30vh}.headline--fifty[data-v-8486293f]{min-height:50vh}.headline--blue[data-v-8486293f]{background-color:var(--mid-blue);color:var(--white)}@media (min-width: 768px){.headline--half[data-v-8486293f]{flex-basis:50%;text-align:left}}.headline__heading[data-v-8486293f]{text-align:center;font-size:1.7rem}.headline__heading--hero[data-v-8486293f]{background-color:var(--mid-blue);color:var(--white);font-size:3rem;font-weight:600;margin:3% 0;padding:1% 2%;width:100%}@media (min-width: 768px){.headline__heading--hero[data-v-8486293f]{width:fit-content}}.headline__heading--box[data-v-8486293f]{margin:3% 0 2%;padding:0;width:fit-content;text-align:center}@media (min-width: 768px){.headline__heading--box[data-v-8486293f]{text-align:left}}.headline__text[data-v-8486293f]{width:100%;font-size:1.3rem}.headline__text--hero[data-v-8486293f]{color:var(--mid-blue);background-color:var(--white);font-size:1.4rem;font-weight:600;margin:2% 0;padding:1% 2%}@media (min-width: 768px){.headline__text--hero[data-v-8486293f]{width:50%}}.headline__text--box[data-v-8486293f]{margin:1% 0;padding:0}.headline__button[data-v-8486293f]{font-size:1rem;padding:1.5%;font-weight:600;cursor:pointer;width:fit-content;border-radius:80px}.headline__button--hero[data-v-8486293f]{margin:0 0 3%;background-color:var(--white);border:var(--white) solid 1px;color:var(--red-purple)}.headline__button--hero[data-v-8486293f]:hover{background-color:var(--red-purple);color:var(--white);border-color:var(--red-purple)}@media (min-width: 768px){.headline__button--hero[data-v-8486293f]{padding:1%}}.headline__button--box[data-v-8486293f]{margin:1% 0 3%;background-color:transparent;border:var(--white) solid 2px;color:var(--white)}.headline__button--box[data-v-8486293f]:hover{background-color:var(--white);color:var(--mid-blue)}.image-box[data-v-61c0cdde]{flex-basis:100%;background-position:center;margin:0;padding:2% 6%;text-align:center}@media (min-width: 768px){.image-box[data-v-61c0cdde]{flex-basis:50%}}.image-box--charity-people[data-v-61c0cdde]{background-image:url(/_astro/charity-people.PtXwJf04.png);background-repeat:no-repeat;background-size:cover}.image-box--thirty[data-v-61c0cdde]{min-height:30vh}.question-box__label[data-v-90b2dd79]{background-color:var(--white);padding:.2%;margin:.2%}.question-box__select[data-v-90b2dd79]{background-color:var(--white);color:var(--mid-blue);padding:.2%;margin:.2%;width:auto;font-size:1.2rem}.question-box__form[data-v-d22652fd]{background-color:var(--white);padding:1%;margin:1% 0;display:flex;justify-content:center;font-size:1.2rem;flex-direction:column;align-items:center;align-content:center}@media (min-width: 768px){.question-box__form[data-v-d22652fd]{flex-direction:row}}.question-box__button[data-v-d22652fd]{margin:2% 1%;padding:2%;border-radius:20px;font-size:1rem;font-weight:600;cursor:pointer;width:fit-content}.question-box__button--red[data-v-d22652fd]{background-color:var(--red-purple);color:var(--white);border:var(--white) solid 1px}.question-box__button--red[data-v-d22652fd]:hover{background-color:var(--white);color:var(--red-purple);border:var(--red-purple) solid 1px}@media (min-width: 768px){.question-box__button[data-v-d22652fd]{margin:.2%;padding:.6%;font-size:1rem}}.question-box[data-v-957a249f]{padding:2% 6%;flex-basis:100%;background-color:var(--light);color:var(--dark)}.question-box__heading[data-v-957a249f]{margin:.5% 0;padding:0;width:fit-content;font-size:1.6rem}.question-box__text[data-v-957a249f]{margin:1% 0;padding:0;font-size:1.3rem}.main-content[data-v-646d235a]{display:flex;flex-direction:row;flex-wrap:wrap}
` }], routeData: { route: "/", isIndex: true, type: "page", pattern: "^\\/$", segments: [], params: [], component: "src/pages/index.astro", pathname: "/", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.placeholder-content{margin:2% 6%;font-size:1.2rem}
` }], routeData: { route: "/get-involved", isIndex: false, type: "page", pattern: "^\\/get-involved\\/?$", segments: [[{ content: "get-involved", dynamic: false, spread: false }]], params: [], component: "src/pages/get-involved.astro", pathname: "/get-involved", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.placeholder-content{margin:2% 6%;font-size:1.2rem}
` }], routeData: { route: "/insights", isIndex: false, type: "page", pattern: "^\\/insights\\/?$", segments: [[{ content: "insights", dynamic: false, spread: false }]], params: [], component: "src/pages/insights.astro", pathname: "/insights", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.placeholder-content{margin:2% 6%;font-size:1.2rem}
` }], routeData: { route: "/our-network", isIndex: false, type: "page", pattern: "^\\/our-network\\/?$", segments: [[{ content: "our-network", dynamic: false, spread: false }]], params: [], component: "src/pages/our-network.astro", pathname: "/our-network", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.placeholder-content{margin:2% 6%;font-size:1.2rem}
` }], routeData: { route: "/the-digital-divide", isIndex: false, type: "page", pattern: "^\\/the-digital-divide\\/?$", segments: [[{ content: "the-digital-divide", dynamic: false, spread: false }]], params: [], component: "src/pages/the-digital-divide.astro", pathname: "/the-digital-divide", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }, { file: "", links: [], scripts: [], styles: [{ type: "external", src: "/_astro/get-involved.ZAvM4e2e.css" }, { type: "inline", content: `.placeholder-content{margin:2% 6%;font-size:1.2rem}
` }], routeData: { route: "/what-to-do", isIndex: false, type: "page", pattern: "^\\/what-to-do\\/?$", segments: [[{ content: "what-to-do", dynamic: false, spread: false }]], params: [], component: "src/pages/what-to-do.astro", pathname: "/what-to-do", prerender: false, fallbackRoutes: [], _meta: { trailingSlash: "ignore" } } }], base: "/", trailingSlash: "ignore", compressHTML: true, componentMetadata: [["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/get-involved.astro", { propagation: "none", containsHead: true }], ["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/index.astro", { propagation: "none", containsHead: true }], ["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/insights.astro", { propagation: "none", containsHead: true }], ["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/our-network.astro", { propagation: "none", containsHead: true }], ["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/the-digital-divide.astro", { propagation: "none", containsHead: true }], ["C:/wamp64/www/github/vue/prod/good-things-foundation-astro/src/pages/what-to-do.astro", { propagation: "none", containsHead: true }]], renderers: [], clientDirectives: [["idle", '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();'], ["load", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();'], ["media", '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();'], ["only", '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();'], ["visible", '(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value=="object"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event("astro:visible"));})();']], entryModules: { "\0@astrojs-ssr-virtual-entry": "_worker.mjs", "\0@astro-renderers": "renderers.mjs", "\0empty-middleware": "_empty-middleware.mjs", "/node_modules/astro/dist/assets/endpoint/generic.js": "chunks/pages/generic_8FGhU5RX.mjs", "/src/pages/index.astro": "chunks/pages/index_zyxaF-mk.mjs", "/src/pages/insights.astro": "chunks/pages/insights_bdhWV7qE.mjs", "/src/pages/our-network.astro": "chunks/pages/our-network_PFM80jVS.mjs", "/src/pages/the-digital-divide.astro": "chunks/pages/the-digital-divide_qZm5YosY.mjs", "/src/pages/what-to-do.astro": "chunks/pages/what-to-do_oDpMKNRh.mjs", "\0@astrojs-manifest": "manifest_aIaA8N9Q.mjs", "\0@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js": "chunks/generic_bhV3Hkyt.mjs", "\0@astro-page:src/pages/index@_@astro": "chunks/index_t9N_Pzkw.mjs", "\0@astro-page:src/pages/get-involved@_@astro": "chunks/get-involved_psc1ror0.mjs", "\0@astro-page:src/pages/insights@_@astro": "chunks/insights_fYsuHfxQ.mjs", "\0@astro-page:src/pages/our-network@_@astro": "chunks/our-network_S2zHIXkb.mjs", "\0@astro-page:src/pages/the-digital-divide@_@astro": "chunks/the-digital-divide_d3RGBUH6.mjs", "\0@astro-page:src/pages/what-to-do@_@astro": "chunks/what-to-do_v2tcGuq5.mjs", "@astrojs/vue/client.js": "_astro/client.wVF2Fm0T.js", "astro:scripts/before-hydration.js": "" }, assets: ["/_astro/charity-people.PtXwJf04.png", "/_astro/volunteers.BQPeqUAm.png", "/_astro/get-involved.ZAvM4e2e.css", "/favicon.png", "/logo.png", "/$server_build/renderers.mjs", "/$server_build/_empty-middleware.mjs", "/$server_build/_worker.mjs", "/_astro/client.wVF2Fm0T.js", "/$server_build/chunks/astro_RJklWuop.mjs", "/$server_build/chunks/generic_bhV3Hkyt.mjs", "/$server_build/chunks/get-involved_psc1ror0.mjs", "/$server_build/chunks/index_t9N_Pzkw.mjs", "/$server_build/chunks/insights_fYsuHfxQ.mjs", "/$server_build/chunks/our-network_S2zHIXkb.mjs", "/$server_build/chunks/the-digital-divide_d3RGBUH6.mjs", "/$server_build/chunks/what-to-do_v2tcGuq5.mjs", "/$server_build/_astro/charity-people.PtXwJf04.png", "/$server_build/_astro/get-involved.ZAvM4e2e.css", "/$server_build/_astro/volunteers.BQPeqUAm.png", "/$server_build/chunks/astro/assets-service_k_Lu9Jjg.mjs", "/$server_build/chunks/pages/generic_8FGhU5RX.mjs", "/$server_build/chunks/pages/get-involved_ltYB7lRx.mjs", "/$server_build/chunks/pages/index_zyxaF-mk.mjs", "/$server_build/chunks/pages/insights_bdhWV7qE.mjs", "/$server_build/chunks/pages/our-network_PFM80jVS.mjs", "/$server_build/chunks/pages/the-digital-divide_qZm5YosY.mjs", "/$server_build/chunks/pages/what-to-do_oDpMKNRh.mjs"] });
et();
ze();
Ke();
wt();
function w0(e2, t) {
  for (let n of t)
    if (typeof n == "string") {
      if (n === e2)
        return n;
    } else
      for (let r of n.codes)
        if (r === e2)
          return n.path;
}
function qe(e2) {
  return e2.replaceAll("_", "-").toLowerCase();
}
function F0(e2) {
  let t = [];
  for (let n of e2)
    if (typeof n == "string")
      t.push(n);
    else
      for (let r of n.codes)
        t.push(r);
  return t;
}
var of = Symbol.for("astro.routeData");
function Wd(e2, t) {
  let n = e2.split("/");
  for (let r of n)
    for (let o of t)
      if (typeof o == "string") {
        if (qe(r) === qe(o))
          return true;
      } else if (r === o.path)
        return true;
  return false;
}
function C0(e2, t, n) {
  if (e2)
    return async (r, o) => {
      if (!e2)
        return await o();
      let s = Reflect.get(r.request, of);
      if (s && s.type !== "page" && s.type !== "fallback")
        return await o();
      let i = r.url, { locales: a, defaultLocale: u, fallback: l, routing: c } = e2, f = await o();
      if (f instanceof Response) {
        let m = i.pathname.includes(`/${u}`);
        switch (e2.routing) {
          case "pathname-prefix-other-locales": {
            if (m) {
              let v = i.pathname.replace(`/${u}`, "");
              return f.headers.set("Location", v), new Response(null, { status: 404, headers: f.headers });
            }
            break;
          }
          case "pathname-prefix-always-no-redirect": {
            if (!(i.pathname === t + "/" || i.pathname === t || Wd(i.pathname, e2.locales)))
              return new Response(null, { status: 404, headers: f.headers });
            break;
          }
          case "pathname-prefix-always": {
            if (i.pathname === t + "/" || i.pathname === t)
              return n === "always" ? r.redirect(`${ca(Kt(t, e2.defaultLocale))}`) : r.redirect(`${Kt(t, e2.defaultLocale)}`);
            if (!Wd(i.pathname, e2.locales))
              return new Response(null, { status: 404, headers: f.headers });
          }
        }
        if (f.status >= 300 && l) {
          let v = e2.fallback ? Object.keys(e2.fallback) : [], w = i.pathname.split("/").find((R) => {
            for (let I of a)
              if (typeof I == "string") {
                if (I === R)
                  return true;
              } else if (I.path === R)
                return true;
            return false;
          });
          if (w && v.includes(w)) {
            let R = l[w], I = w0(R, a), V;
            return I === u && c === "pathname-prefix-other-locales" ? V = i.pathname.replace(`/${w}`, "") : V = i.pathname.replace(`/${w}`, `/${I}`), r.redirect(V);
          }
        }
      }
      return f;
    };
}
var x0 = (e2) => {
  Reflect.set(e2.request, of, e2.route);
};
var N0 = /* @__PURE__ */ new Date(0);
var zd = "deleted";
var A0 = Symbol.for("astro.responseSent");
var bo = class {
  constructor(t) {
    this.value = t;
  }
  json() {
    if (this.value === void 0)
      throw new Error("Cannot convert undefined to an object.");
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    return this.value === "false" || this.value === "0" ? false : !!this.value;
  }
};
var fr = class {
  #e;
  #t;
  #n;
  #o;
  constructor(t) {
    this.#e = t, this.#t = null, this.#n = null, this.#o = false;
  }
  delete(t, n) {
    let r = { expires: N0 };
    n?.domain && (r.domain = n.domain), n?.path && (r.path = n.path), this.#r().set(t, [zd, (0, dr.serialize)(t, zd, r), false]);
  }
  get(t, n = void 0) {
    if (this.#n?.has(t)) {
      let [o, , s] = this.#n.get(t);
      return s ? new bo(o) : void 0;
    }
    let r = this.#s(n);
    if (t in r) {
      let o = r[t];
      return new bo(o);
    }
  }
  has(t, n = void 0) {
    if (this.#n?.has(t)) {
      let [, , o] = this.#n.get(t);
      return o;
    }
    return !!this.#s(n)[t];
  }
  set(t, n, r) {
    if (this.#o) {
      let i = new Error(`Astro.cookies.set() was called after the cookies had already been sent to the browser.
This may have happened if this method was called in an imported component.
Please make sure that Astro.cookies.set() is only called in the frontmatter of the main page.`);
      i.name = "Warning", console.warn(i);
    }
    let o;
    if (typeof n == "string")
      o = n;
    else {
      let i = n.toString();
      i === Object.prototype.toString.call(n) ? o = JSON.stringify(n) : o = i;
    }
    let s = {};
    if (r && Object.assign(s, r), this.#r().set(t, [o, (0, dr.serialize)(t, o, s), true]), this.#e[A0])
      throw new q({ ...wr });
  }
  *headers() {
    if (this.#n != null)
      for (let [, t] of this.#n)
        yield t[1];
  }
  static consume(t) {
    return t.#o = true, t.headers();
  }
  #s(t = void 0) {
    return this.#t || this.#a(t), this.#t || (this.#t = {}), this.#t;
  }
  #r() {
    return this.#n || (this.#n = /* @__PURE__ */ new Map()), this.#n;
  }
  #a(t = void 0) {
    let n = this.#e.headers.get("cookie");
    n && (this.#t = (0, dr.parse)(n, t));
  }
};
var ta = Symbol.for("astro.cookies");
function na(e2, t) {
  Reflect.set(e2, ta, t);
}
function S0(e2) {
  return Reflect.has(e2, ta);
}
function O0(e2) {
  let t = Reflect.get(e2, ta);
  if (t != null)
    return t;
}
function* Kd(e2) {
  let t = O0(e2);
  if (!t)
    return [];
  for (let n of fr.consume(t))
    yield n;
  return [];
}
var T0 = { write(e2) {
  let t = console.error;
  return Un[e2.level] < Un.error && (t = console.log), e2.label === "SKIP_FORMAT" ? t(e2.message) : t(uu(e2) + " " + e2.message), true;
} };
async function sf(e2, t, n) {
  let r = false, o, i = e2(t, async () => (r = true, o = n(), o));
  return await Promise.resolve(i).then(async (a) => {
    if (r)
      if (typeof a < "u") {
        if (!(a instanceof Response))
          throw new q(Fr);
        return Gd(t, a);
      } else {
        if (o)
          return o;
        throw new q(Fr);
      }
    else {
      if (typeof a > "u")
        throw new q(Ia);
      if (a instanceof Response)
        return Gd(t, a);
      throw new q(Fr);
    }
  });
}
function Gd(e2, t) {
  return e2.cookies !== void 0 && !S0(t) && na(t, e2.cookies), t;
}
function af(e2) {
  return e2?.type === "redirect";
}
function uf(e2) {
  return e2?.type === "fallback";
}
function R0(e2, t) {
  let n = e2.redirectRoute, r = e2.redirect;
  if (typeof n < "u")
    return n?.generate(t) || n?.pathname || "/";
  if (typeof r == "string") {
    let o = r;
    for (let s of Object.keys(t)) {
      let i = t[s];
      o = o.replace(`[${s}]`, i), o = o.replace(`[...${s}]`, i);
    }
    return o;
  } else if (typeof r > "u")
    return "/";
  return r.destination;
}
function $0(e2, t = "GET") {
  return e2.redirectRoute && typeof e2.redirect == "object" ? e2.redirect.status : t !== "GET" ? 308 : 301;
}
var P0 = { default() {
  return new Response(null, { status: 301 });
} };
var V0 = { page: () => Promise.resolve(P0), onRequest: (e2, t) => t(), renderers: [] };
var k0 = ["string", "number", "undefined"];
function B0([e2, t], n) {
  if (!k0.includes(typeof t))
    throw new q({ ...Zo, message: Zo.message(e2, t, typeof t), location: { file: n } });
}
function I0(e2, { ssr: t, route: n }) {
  if ((!t || n.prerender) && !e2.getStaticPaths)
    throw new q({ ...Pa, location: { file: n.component } });
}
function L0(e2, t, n) {
  if (!Array.isArray(e2))
    throw new q({ ...Qo, message: Qo.message(typeof e2), location: { file: n.component } });
  e2.forEach((r) => {
    if (typeof r == "object" && Array.isArray(r) || r === null)
      throw new q({ ...Xo, message: Xo.message(Array.isArray(r) ? "array" : typeof r) });
    if (r.params === void 0 || r.params === null || r.params && Object.keys(r.params).length === 0)
      throw new q({ ...$a, location: { file: n.component } });
    for (let [o, s] of Object.entries(r.params))
      typeof s > "u" || typeof s == "string" || typeof s == "number" || t.warn("router", `getStaticPaths() returned an invalid path param: "${o}". A string, number or undefined value was expected, but got \`${JSON.stringify(s)}\`.`), typeof s == "string" && s === "" && t.warn("router", `getStaticPaths() returned an invalid path param: "${o}". \`undefined\` expected for an optional param, but got empty string.`);
  });
}
function M0(e2) {
  return (n) => {
    let r = {};
    return e2.forEach((o, s) => {
      o.startsWith("...") ? r[o.slice(3)] = n[s + 1] ? n[s + 1] : void 0 : r[o] = n[s + 1];
    }), r;
  };
}
function cf(e2, t) {
  let n = Object.entries(e2).reduce((r, o) => {
    B0(o, t.component);
    let [s, i] = o;
    return i !== void 0 && (r[s] = typeof i == "string" ? Oo(i) : i.toString()), r;
  }, {});
  return JSON.stringify(t.generate(n));
}
function j0(e2) {
  return function(n, r = {}) {
    let { pageSize: o, params: s, props: i } = r, a = o || 10, u = "page", l = s || {}, c = i || {}, f;
    if (e2.params.includes(`...${u}`))
      f = false;
    else if (e2.params.includes(`${u}`))
      f = true;
    else
      throw new q({ ...ts, message: ts.message(u) });
    let m = Math.max(1, Math.ceil(n.length / a));
    return [...Array(m).keys()].map((A) => {
      let w = A + 1, R = a === 1 / 0 ? 0 : (w - 1) * a, I = Math.min(R + a, n.length), V = { ...l, [u]: f || w > 1 ? String(w) : void 0 }, h = Gi(e2.generate({ ...V })), _ = w === m ? void 0 : Gi(e2.generate({ ...V, page: String(w + 1) })), S = w === 1 ? void 0 : Gi(e2.generate({ ...V, page: !f && w - 1 === 1 ? void 0 : String(w - 1) }));
      return { params: V, props: { ...c, page: { data: n.slice(R, I), start: R, end: I - 1, size: a, total: n.length, currentPage: w, lastPage: m, url: { current: h, next: _, prev: S } } } };
    });
  };
}
function Gi(e2) {
  return e2 === "" ? "/" : e2;
}
async function H0({ mod: e2, route: t, routeCache: n, logger: r, ssr: o }) {
  let s = n.get(t);
  if (!e2)
    throw new Error("This is an error caused by Astro and not your code. Please file an issue.");
  if (s?.staticPaths)
    return s.staticPaths;
  if (I0(e2, { ssr: o, route: t }), o && !t.prerender) {
    let u = Object.assign([], { keyed: /* @__PURE__ */ new Map() });
    return n.set(t, { ...s, staticPaths: u }), u;
  }
  let i = [];
  if (!e2.getStaticPaths)
    throw new Error("Unexpected Error.");
  i = await e2.getStaticPaths({ paginate: j0(t) }), L0(i, r, t);
  let a = i;
  a.keyed = /* @__PURE__ */ new Map();
  for (let u of a) {
    let l = cf(u.params, t);
    a.keyed.set(l, u);
  }
  return n.set(t, { ...s, staticPaths: a }), a;
}
var Ji = class {
  logger;
  cache = {};
  mode;
  constructor(t, n = "production") {
    this.logger = t, this.mode = n;
  }
  clearAll() {
    this.cache = {};
  }
  set(t, n) {
    this.mode === "production" && this.cache[t.component]?.staticPaths && this.logger.warn(null, `Internal Warning: route cache overwritten. (${t.component})`), this.cache[t.component] = n;
  }
  get(t) {
    return this.cache[t.component];
  }
};
function U0(e2, t, n, r) {
  let o = cf(t, n), s = e2.keyed.get(o);
  if (s)
    return s;
  r.debug("router", `findPathItemByKey() - Unexpected cache miss looking for ${o}`);
}
async function q0(e2) {
  let { logger: t, mod: n, route: r, routeCache: o, pathname: s, ssr: i } = e2;
  if (!r || r.pathname)
    return [{}, {}];
  let a = W0(r, s) ?? {};
  if (af(r) || uf(r))
    return [a, {}];
  n && z0(r, n, a);
  let u = await H0({ mod: n, route: r, routeCache: o, logger: t, ssr: i }), l = U0(u, a, r, t);
  if (!l && (!i || r.prerender))
    throw new q({ ...vr, message: vr.message(s), hint: vr.hint([r.component]) });
  let c = l?.props ? { ...l.props } : {};
  return [a, c];
}
function W0(e2, t) {
  if (e2.params.length) {
    let n = e2.pattern.exec(decodeURIComponent(t));
    if (n)
      return M0(e2.params)(n);
  }
}
function z0(e2, t, n) {
  if (e2.type === "endpoint" && t.getStaticPaths) {
    let r = e2.segments[e2.segments.length - 1], o = Object.values(n), s = o[o.length - 1];
    if (r.length === 1 && r[0].dynamic && s === void 0)
      throw new q({ ...br, message: br.message(e2.route), hint: br.hint(e2.component), location: { file: e2.component } });
  }
}
var Yd = Symbol.for("astro.locals");
async function Jd(e2) {
  let t = e2.request, n = e2.pathname ?? new URL(t.url).pathname, [r, o] = await q0({ mod: e2.mod, route: e2.route, routeCache: e2.env.routeCache, pathname: n, logger: e2.env.logger, ssr: e2.env.ssr }), s = { ...e2, pathname: n, params: r, props: o, locales: e2.locales, routing: e2.routing, defaultLocale: e2.defaultLocale };
  return Object.defineProperty(s, "locals", { enumerable: true, get() {
    return Reflect.get(t, Yd);
  }, set(i) {
    if (typeof i != "object")
      throw new q(Cr);
    Reflect.set(t, Yd, i);
  } }), s;
}
function lf(e2) {
  if (e2 === "*")
    return [{ locale: e2, qualityValue: void 0 }];
  let t = [], n = e2.split(",").map((r) => r.trim());
  for (let r of n) {
    let o = r.split(";").map((a) => a.trim()), s = o[0], i = o[1];
    if (o)
      if (i && i.startsWith("q=")) {
        let a = Number.parseFloat(i.slice(2));
        Number.isNaN(a) || a > 1 ? t.push({ locale: s, qualityValue: void 0 }) : t.push({ locale: s, qualityValue: a });
      } else
        t.push({ locale: s, qualityValue: void 0 });
  }
  return t;
}
function df(e2, t) {
  let n = F0(t).map(qe);
  return e2.filter((r) => r.locale !== "*" ? n.includes(qe(r.locale)) : true).sort((r, o) => {
    if (r.qualityValue && o.qualityValue) {
      if (r.qualityValue > o.qualityValue)
        return -1;
      if (r.qualityValue < o.qualityValue)
        return 1;
    }
    return 0;
  });
}
function ff(e2, t) {
  let n = e2.headers.get("Accept-Language"), r;
  if (n) {
    let s = df(lf(n), t).at(0);
    if (s && s.locale !== "*")
      for (let i of t)
        if (typeof i == "string")
          qe(i) === qe(s.locale) && (r = i);
        else
          for (let a of i.codes)
            qe(a) === qe(s.locale) && (r = i.path);
  }
  return r;
}
function pf(e2, t) {
  let n = e2.headers.get("Accept-Language"), r = [];
  if (n) {
    let o = df(lf(n), t);
    if (o.length === 1 && o.at(0).locale === "*")
      return t.map((s) => typeof s == "string" ? s : s.codes.at(0));
    if (o.length > 0)
      for (let s of o)
        for (let i of t)
          if (typeof i == "string")
            qe(i) === qe(s.locale) && r.push(i);
          else
            for (let a of i.codes)
              a === s.locale && r.push(i.path);
  }
  return r;
}
function mf(e2, t, n, r) {
  let o = new URL(e2.url);
  for (let s of o.pathname.split("/"))
    for (let i of t)
      if (typeof i == "string") {
        if (qe(i) === qe(s))
          return i;
      } else if (i.path === s)
        return i.codes.at(0);
  if (n === "pathname-prefix-other-locales")
    return r;
}
var Xd = Symbol.for("astro.clientAddress");
var Yi = Symbol.for("astro.locals");
function hf({ request: e2, params: t, site: n, props: r, adapterName: o, locales: s, routingStrategy: i, defaultLocale: a }) {
  let u, l, c;
  return { cookies: new fr(e2), request: e2, params: t, site: n ? new URL(n) : void 0, generator: `Astro v${as}`, props: r, redirect(m, v) {
    return new Response(null, { status: v || 302, headers: { Location: m } });
  }, get preferredLocale() {
    if (u)
      return u;
    if (s)
      return u = ff(e2, s), u;
  }, get preferredLocaleList() {
    if (l)
      return l;
    if (s)
      return l = pf(e2, s), l;
  }, get currentLocale() {
    return c || (s && (c = mf(e2, s, i, a)), c);
  }, url: new URL(e2.url), get clientAddress() {
    if (Xd in e2)
      return Reflect.get(e2, Xd);
    throw o ? new q({ ...Hn, message: Hn.message(o) }) : new q(Jo);
  }, get locals() {
    let m = Reflect.get(e2, Yi);
    if (m === void 0 && (m = {}, Reflect.set(e2, Yi, m)), typeof m != "object")
      throw new q(Cr);
    return m;
  }, set locals(m) {
    if (typeof m != "object")
      throw new q(Cr);
    Reflect.set(e2, Yi, m);
  } };
}
async function K0(e2, t, n, r) {
  let o = hf({ request: n.request, params: n.params, props: n.props, site: t.site, adapterName: t.adapterName, routingStrategy: n.routing, defaultLocale: n.defaultLocale, locales: n.locales }), s;
  return r ? s = await sf(r, o, async () => await us(e2, o, t.ssr, t.logger)) : s = await us(e2, o, t.ssr, t.logger), na(s, o.cookies), s;
}
function G0(...e2) {
  let t = e2.filter((r) => !!r), n = t.length;
  return n ? (r, o) => {
    return s(0, r);
    function s(i, a) {
      let u = t[i];
      return u(a, async () => i < n - 1 ? s(i + 1, a) : o());
    }
  } : (o, s) => s();
}
function ra(e2, t, n) {
  return n ? Kt(n, To(e2)) : t ? In(Kt(t, To(e2))) : e2;
}
function Y0(e2, t, n) {
  return e2.type === "inline" ? { props: {}, children: e2.content } : { props: { rel: "stylesheet", href: ra(e2.src, t, n) }, children: "" };
}
function J0(e2, t, n) {
  return new Set(e2.map((r) => Y0(r, t, n)));
}
function X0(e2, t, n) {
  return e2.type === "external" ? Q0(e2.value, t, n) : { props: { type: "module" }, children: e2.value };
}
function Q0(e2, t, n) {
  return { props: { type: "module", src: ra(e2, t, n) }, children: "" };
}
function Qd(e2, t) {
  let n = decodeURI(e2);
  return t.routes.find((r) => r.pattern.test(n) || r.fallbackRoutes.some((o) => o.pattern.test(n)));
}
var Zd = Symbol.for("astro.clientAddress");
var Z0 = Symbol.for("astro.responseSent");
function ey(e2) {
  if (e2 && e2.expressions?.length === 1)
    return e2.expressions[0];
}
var Xi = class {
  #e;
  #t;
  #n;
  constructor(t, n, r) {
    if (this.#e = t, this.#t = n, this.#n = r, n)
      for (let o of Object.keys(n)) {
        if (this[o] !== void 0)
          throw new q({ ...es, message: es.message(o) });
        Object.defineProperty(this, o, { get() {
          return true;
        }, enumerable: true });
      }
  }
  has(t) {
    return this.#t ? !!this.#t[t] : false;
  }
  async render(t, n = []) {
    if (!this.#t || !this.has(t))
      return;
    let r = this.#e;
    if (!Array.isArray(n))
      this.#n.warn(null, `Expected second parameter to be an array, received a ${typeof n}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
    else if (n.length > 0) {
      let i = this.#t[t], a = typeof i == "function" ? await i(r) : await i, u = ey(a);
      if (u)
        return await Jt(r, async () => typeof u == "function" ? u(...n) : u).then((c) => c != null ? String(c) : c);
      if (typeof a == "function")
        return await xt(r, a(...n)).then((l) => l != null ? String(l) : l);
    }
    let o = await Jt(r, this.#t[t]);
    return Nt(r, o);
  }
};
function ty(e2) {
  let { params: t, request: n, resolve: r, locals: o } = e2, s = new URL(n.url), i = new Headers();
  i.set("Content-Type", "text/html");
  let a = { status: e2.status, statusText: "OK", headers: i };
  Object.defineProperty(a, "headers", { value: a.headers, enumerable: true, writable: false });
  let u = e2.cookies, l, c, f, m = { styles: e2.styles ?? /* @__PURE__ */ new Set(), scripts: e2.scripts ?? /* @__PURE__ */ new Set(), links: e2.links ?? /* @__PURE__ */ new Set(), componentMetadata: e2.componentMetadata ?? /* @__PURE__ */ new Map(), renderers: e2.renderers, clientDirectives: e2.clientDirectives, compressHTML: e2.compressHTML, partial: e2.partial, pathname: e2.pathname, cookies: u, createAstro(v, A, w) {
    let R = new Xi(m, w, e2.logger);
    return { __proto__: v, get clientAddress() {
      if (!(Zd in n))
        throw e2.adapterName ? new q({ ...Hn, message: Hn.message(e2.adapterName) }) : new q(Jo);
      return Reflect.get(n, Zd);
    }, get cookies() {
      return u || (u = new fr(n), m.cookies = u, u);
    }, get preferredLocale() {
      if (l)
        return l;
      if (e2.locales)
        return l = ff(n, e2.locales), l;
    }, get preferredLocaleList() {
      if (c)
        return c;
      if (e2.locales)
        return c = pf(n, e2.locales), c;
    }, get currentLocale() {
      if (f || e2.locales && (f = mf(n, e2.locales, e2.routingStrategy, e2.defaultLocale), f))
        return f;
    }, params: t, props: A, locals: o, request: n, url: s, redirect(V, h) {
      if (n[Z0])
        throw new q({ ...wr });
      return new Response(null, { status: h || 302, headers: { Location: V } });
    }, response: a, slots: R };
  }, resolve: r, response: a, _metadata: { hasHydrationScript: false, rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(), hasRenderedHead: false, hasDirectives: /* @__PURE__ */ new Set(), headInTree: false, extraHead: [], propagators: /* @__PURE__ */ new Set() } };
  return m;
}
async function ef({ mod: e2, renderContext: t, env: n, cookies: r }) {
  if (af(t.route))
    return new Response(null, { status: $0(t.route, t.request.method), headers: { location: R0(t.route, t.params) } });
  if (uf(t.route))
    return new Response(null, { status: 404 });
  if (!e2)
    throw new q(La);
  let o = e2.default;
  if (!o)
    throw new Error(`Expected an exported Astro component but received typeof ${typeof o}`);
  let s = ty({ adapterName: n.adapterName, links: t.links, styles: t.styles, logger: n.logger, params: t.params, pathname: t.pathname, componentMetadata: t.componentMetadata, resolve: n.resolve, renderers: n.renderers, clientDirectives: n.clientDirectives, compressHTML: n.compressHTML, request: t.request, partial: !!e2.partial, site: n.site, scripts: t.scripts, ssr: n.ssr, status: t.status ?? 200, cookies: r, locals: t.locals ?? {}, locales: t.locales, defaultLocale: t.defaultLocale, routingStrategy: t.routing }), i = await nu(s, o, t.props, {}, n.streaming, t.route);
  return s.cookies && na(i, s.cookies), i;
}
var Qi = class {
  env;
  #e;
  #t = { before: [] };
  #n;
  constructor(t) {
    this.env = t;
  }
  setEnvironment() {
  }
  setEndpointHandler(t) {
    this.#n = t;
  }
  setMiddlewareFunction(t) {
    this.#e = t;
  }
  unsetMiddlewareFunction() {
    this.#e = void 0;
  }
  getEnvironment() {
    return this.env;
  }
  async renderRoute(t, n) {
    for (let o of this.#t.before)
      o(t, n);
    let r = await this.#o(t, this.env, n, this.#e);
    if (t.route.type === "endpoint") {
      if (!this.#n)
        throw new Error("You created a pipeline that does not know how to handle the result coming from an endpoint.");
      return this.#n(t.request, r);
    } else
      return r;
  }
  async #o(t, n, r, o) {
    let s = hf({ request: t.request, params: t.params, props: t.props, site: n.site, adapterName: n.adapterName, locales: t.locales, routingStrategy: t.routing, defaultLocale: t.defaultLocale });
    switch (t.route.type) {
      case "page":
      case "fallback":
      case "redirect":
        return o ? await sf(o, s, () => ef({ mod: r, renderContext: t, env: n, cookies: s.cookies })) : await ef({ mod: r, renderContext: t, env: n, cookies: s.cookies });
      case "endpoint":
        return await K0(r, n, t, o);
      default:
        throw new Error(`Couldn't find route of type [${t.route.type}]`);
    }
  }
  onBeforeRenderRoute(t) {
    this.#t.before.push(t);
  }
};
var wo = class extends Error {
  originalResponse;
  constructor(t) {
    super(), this.originalResponse = t;
  }
};
var Zi = class extends Qi {
  constructor(t) {
    super(t), this.setEndpointHandler(this.#e);
  }
  async #e(t, n) {
    if (n.headers.get("X-Astro-Response") === "Not-Found")
      throw new wo(n);
    return n;
  }
};
var ny = Symbol.for("astro.locals");
var ry = Symbol.for("astro.clientAddress");
var tf = Symbol.for("astro.responseSent");
var oy = /* @__PURE__ */ new Set([404, 500]);
var _e2, _t2, _n2, _o2, _s2, _r2, _a3, _c2, _f, f_fn, _p2, p_fn, _m2, m_fn, _a2, _l2, l_fn, _i2, i_fn, _u2, u_fn, _h2, h_fn, _d2, d_fn;
var ea = (_a2 = class {
  constructor(t, n = true) {
    __privateAdd(this, _f);
    __privateAdd(this, _p2);
    __privateAdd(this, _m2);
    __privateAdd(this, _l2);
    __privateAdd(this, _i2);
    __privateAdd(this, _u2);
    __privateAdd(this, _h2);
    __privateAdd(this, _d2);
    __privateAdd(this, _e2, void 0);
    __privateAdd(this, _t2, void 0);
    __privateAdd(this, _n2, void 0);
    __privateAdd(this, _o2, new Ar({ dest: T0, level: "info" }));
    __privateAdd(this, _s2, void 0);
    __privateAdd(this, _r2, void 0);
    __privateAdd(this, _a3, void 0);
    __privateAdd(this, _c2, false);
    __privateSet(this, _e2, t), __privateSet(this, _t2, { routes: t.routes.map((r) => r.routeData) }), __privateSet(this, _n2, new Map(t.routes.map((r) => [r.routeData, r]))), __privateSet(this, _s2, hr(__privateGet(this, _e2).base)), __privateSet(this, _r2, new Zi(__privateMethod(this, _f, f_fn).call(this, n))), __privateSet(this, _a3, new qn(__privateGet(this, _o2).options, __privateGet(this, _e2).adapterName));
  }
  getAdapterLogger() {
    return __privateGet(this, _a3);
  }
  set setManifestData(t) {
    __privateSet(this, _t2, t);
  }
  removeBase(t) {
    return t.startsWith(__privateGet(this, _e2).base) ? t.slice(__privateGet(this, _s2).length + 1) : t;
  }
  match(t) {
    let n = new URL(t.url);
    if (__privateGet(this, _e2).assets.has(n.pathname))
      return;
    let r = In(this.removeBase(n.pathname)), o = Qd(r, __privateGet(this, _t2));
    if (!(!o || o.prerender))
      return o;
  }
  async render(t, n, r) {
    let o, s, i, a;
    if (n && ("addCookieHeader" in n || "clientAddress" in n || "locals" in n || "routeData" in n) ? ("addCookieHeader" in n && (a = n.addCookieHeader), "clientAddress" in n && (i = n.clientAddress), "routeData" in n && (o = n.routeData), "locals" in n && (s = n.locals)) : (o = n, s = r, (n || s) && __privateMethod(this, _m2, m_fn).call(this)), s && Reflect.set(t, ny, s), i && Reflect.set(t, ry, i), t.url !== So(t.url) && (t = new Request(So(t.url), t)), o || (o = this.match(t)), !o)
      return __privateMethod(this, _i2, i_fn).call(this, t, { status: 404 });
    let u = __privateMethod(this, _p2, p_fn).call(this, t), l = __privateMethod(this, _h2, h_fn).call(this, o, u), c = await __privateMethod(this, _d2, d_fn).call(this, o), f = await c.page(), m = new URL(t.url), v = await __privateMethod(this, _l2, l_fn).call(this, m, t, o, c, l), A;
    try {
      let w = C0(__privateGet(this, _e2).i18n, __privateGet(this, _e2).base, __privateGet(this, _e2).trailingSlash);
      w ? (c.onRequest ? __privateGet(this, _r2).setMiddlewareFunction(G0(w, c.onRequest)) : __privateGet(this, _r2).setMiddlewareFunction(w), __privateGet(this, _r2).onBeforeRenderRoute(x0)) : c.onRequest && __privateGet(this, _r2).setMiddlewareFunction(c.onRequest), A = await __privateGet(this, _r2).renderRoute(v, f);
    } catch (w) {
      return w instanceof wo ? __privateMethod(this, _i2, i_fn).call(this, t, { status: 404, response: w.originalResponse }) : (__privateGet(this, _o2).error(null, w.stack || w.message || String(w)), __privateMethod(this, _i2, i_fn).call(this, t, { status: 500 }));
    }
    if ((o.type === "page" || o.type === "redirect") && oy.has(A.status))
      return __privateMethod(this, _i2, i_fn).call(this, t, { response: A, status: A.status });
    if (a)
      for (let w of _a2.getSetCookieFromResponse(A))
        A.headers.append("set-cookie", w);
    return Reflect.set(A, tf, true), A;
  }
  setCookieHeaders(t) {
    return Kd(t);
  }
}, _e2 = new WeakMap(), _t2 = new WeakMap(), _n2 = new WeakMap(), _o2 = new WeakMap(), _s2 = new WeakMap(), _r2 = new WeakMap(), _a3 = new WeakMap(), _c2 = new WeakMap(), _f = new WeakSet(), f_fn = function(t = false) {
  return { adapterName: __privateGet(this, _e2).adapterName, logger: __privateGet(this, _o2), mode: "production", compressHTML: __privateGet(this, _e2).compressHTML, renderers: __privateGet(this, _e2).renderers, clientDirectives: __privateGet(this, _e2).clientDirectives, resolve: async (n) => {
    if (!(n in __privateGet(this, _e2).entryModules))
      throw new Error(`Unable to resolve [${n}]`);
    let r = __privateGet(this, _e2).entryModules[n];
    switch (true) {
      case r.startsWith("data:"):
      case r.length === 0:
        return r;
      default:
        return ra(r, __privateGet(this, _e2).base, __privateGet(this, _e2).assetsPrefix);
    }
  }, routeCache: new Ji(__privateGet(this, _o2)), site: __privateGet(this, _e2).site, ssr: true, streaming: t };
}, _p2 = new WeakSet(), p_fn = function(t) {
  let n = new URL(t.url);
  return In(this.removeBase(n.pathname));
}, _m2 = new WeakSet(), m_fn = function() {
  __privateGet(this, _c2) || (__privateGet(this, _o2).warn("deprecated", `The adapter ${__privateGet(this, _e2).adapterName} is using a deprecated signature of the 'app.render()' method. From Astro 4.0, locals and routeData are provided as properties on an optional object to this method. Using the old signature will cause an error in Astro 5.0. See https://github.com/withastro/astro/pull/9199 for more information.`), __privateSet(this, _c2, true));
}, _l2 = new WeakSet(), l_fn = async function(t, n, r, o, s = 200) {
  if (r.type === "endpoint") {
    let i = "/" + this.removeBase(t.pathname), u = await o.page();
    return await Jd({ request: n, pathname: i, route: r, status: s, env: __privateGet(this, _r2).env, mod: u, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  } else {
    let i = In(this.removeBase(t.pathname)), a = __privateGet(this, _n2).get(r), u = /* @__PURE__ */ new Set(), l = J0(a.styles), c = /* @__PURE__ */ new Set();
    for (let m of a.scripts)
      "stage" in m ? m.stage === "head-inline" && c.add({ props: {}, children: m.children }) : c.add(X0(m));
    let f = await o.page();
    return await Jd({ request: n, pathname: i, componentMetadata: __privateGet(this, _e2).componentMetadata, scripts: c, styles: l, links: u, route: r, status: s, mod: f, env: __privateGet(this, _r2).env, locales: __privateGet(this, _e2).i18n?.locales, routing: __privateGet(this, _e2).i18n?.routing, defaultLocale: __privateGet(this, _e2).i18n?.defaultLocale });
  }
}, _i2 = new WeakSet(), i_fn = async function(t, { status: n, response: r, skipMiddleware: o = false }) {
  let s = `/${n}${__privateGet(this, _e2).trailingSlash === "always" ? "/" : ""}`, i = Qd(s, __privateGet(this, _t2)), a = new URL(t.url);
  if (i) {
    if (i.prerender) {
      let c = i.route.endsWith(`/${n}`) ? ".html" : "", f = new URL(`${__privateGet(this, _s2)}/${n}${c}`, a), m = await fetch(f.toString()), v = { status: n };
      return __privateMethod(this, _u2, u_fn).call(this, m, r, v);
    }
    let l = await __privateMethod(this, _d2, d_fn).call(this, i);
    try {
      let c = await __privateMethod(this, _l2, l_fn).call(this, a, t, i, l, n), f = await l.page();
      o === false && l.onRequest && __privateGet(this, _r2).setMiddlewareFunction(l.onRequest), o && __privateGet(this, _r2).unsetMiddlewareFunction();
      let m = await __privateGet(this, _r2).renderRoute(c, f);
      return __privateMethod(this, _u2, u_fn).call(this, m, r);
    } catch {
      if (o === false && l.onRequest)
        return __privateMethod(this, _i2, i_fn).call(this, t, { status: n, response: r, skipMiddleware: true });
    }
  }
  let u = __privateMethod(this, _u2, u_fn).call(this, new Response(null, { status: n }), r);
  return Reflect.set(u, tf, true), u;
}, _u2 = new WeakSet(), u_fn = function(t, n, r) {
  if (!n)
    return r !== void 0 ? new Response(t.body, { status: r.status, statusText: t.statusText, headers: t.headers }) : t;
  let o = r?.status ? r.status : n.status === 200 ? t.status : n.status;
  try {
    n.headers.delete("Content-type");
  } catch {
  }
  return new Response(t.body, { status: o, statusText: o === 200 ? t.statusText : n.statusText, headers: new Headers([...Array.from(t.headers), ...Array.from(n.headers)]) });
}, _h2 = new WeakSet(), h_fn = function(t, n) {
  if (!t.pattern.exec(n)) {
    for (let o of t.fallbackRoutes)
      if (o.pattern.test(n))
        return 302;
  }
  let r = hr(t.route);
  return r.endsWith("/404") ? 404 : r.endsWith("/500") ? 500 : 200;
}, _d2 = new WeakSet(), d_fn = async function(t) {
  if (t.type === "redirect")
    return V0;
  if (__privateGet(this, _e2).pageMap) {
    let n = __privateGet(this, _e2).pageMap.get(t.component);
    if (!n)
      throw new Error(`Unexpectedly unable to find a component instance for route ${t.route}`);
    return await n();
  } else {
    if (__privateGet(this, _e2).pageModule)
      return __privateGet(this, _e2).pageModule;
    throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
  }
}, __publicField(_a2, "getSetCookieFromResponse", Kd), _a2);
var sy = typeof process == "object" && Object.prototype.toString.call(process) === "[object process]";
function iy() {
  return new Proxy({}, { get: (e2, t) => {
    console.warn(`Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`);
  } });
}
sy || (process.env = iy());
function gf(e2) {
  let t = new ea(e2);
  return { default: { fetch: async (r, o, s) => {
    process.env = o;
    let { pathname: i } = new URL(r.url);
    if (e2.assets.has(i))
      return o.ASSETS.fetch(r);
    let a = t.match(r);
    Reflect.set(r, Symbol.for("astro.clientAddress"), r.headers.get("cf-connecting-ip"));
    let u = { runtime: { waitUntil: (c) => {
      s.waitUntil(c);
    }, env: o, cf: r.cf, caches } }, l = await t.render(r, a, u);
    if (t.setCookieHeaders)
      for (let c of t.setCookieHeaders(l))
        l.headers.append("Set-Cookie", c);
    return l;
  } } };
}
var nf = Object.freeze(Object.defineProperty({ __proto__: null, createExports: gf }, Symbol.toStringTag, { value: "Module" }));
var ay = () => Promise.resolve().then(() => (Hl(), jl));
var uy = () => Promise.resolve().then(() => (yd(), Dd));
var cy = () => Promise.resolve().then(() => (Ed(), _d));
var ly = () => Promise.resolve().then(() => (xd(), Cd));
var dy = () => Promise.resolve().then(() => (Rd(), Td));
var fy = () => Promise.resolve().then(() => (Id(), Bd));
var py = () => Promise.resolve().then(() => (qd(), Ud));
var my = /* @__PURE__ */ new Map([["node_modules/astro/dist/assets/endpoint/generic.js", ay], ["src/pages/index.astro", uy], ["src/pages/get-involved.astro", cy], ["src/pages/insights.astro", ly], ["src/pages/our-network.astro", dy], ["src/pages/the-digital-divide.astro", fy], ["src/pages/what-to-do.astro", py]]);
var Df = Object.assign(cu, { pageMap: my, renderers: xe });
var hy = void 0;
var gy = gf(Df);
var kv = gy.default;
var rf = "start";
rf in nf && nf[rf](Df, hy);

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e2) {
  return {
    name: e2?.name,
    message: e2?.message ?? String(e2),
    stack: e2?.stack,
    cause: e2?.cause === void 0 ? void 0 : reduceError(e2.cause)
  };
}
var jsonError = async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e2) {
    const error = reduceError(e2);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
};
var middleware_miniflare3_json_error_default = jsonError;
var wrap = void 0;

// ../.wrangler/tmp/bundle-XrKfdT/middleware-insertion-facade.js
var envWrappers = [wrap].filter(Boolean);
var facade = {
  ...kv,
  envWrappers,
  middleware: [
    middleware_miniflare3_json_error_default,
    ...kv.middleware ? kv.middleware : []
  ].filter(Boolean)
};
var middleware_insertion_facade_default = facade;

// ../.wrangler/tmp/bundle-XrKfdT/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
var __facade_modules_fetch__ = function(request, env, ctx) {
  if (middleware_insertion_facade_default.fetch === void 0)
    throw new Error("Handler does not export a fetch() function.");
  return middleware_insertion_facade_default.fetch(request, env, ctx);
};
function getMaskedEnv(rawEnv) {
  let env = rawEnv;
  if (middleware_insertion_facade_default.envWrappers && middleware_insertion_facade_default.envWrappers.length > 0) {
    for (const wrapFn of middleware_insertion_facade_default.envWrappers) {
      env = wrapFn(env);
    }
  }
  return env;
}
var registeredMiddleware = false;
var facade2 = {
  ...middleware_insertion_facade_default.tail && {
    tail: maskHandlerEnv(middleware_insertion_facade_default.tail)
  },
  ...middleware_insertion_facade_default.trace && {
    trace: maskHandlerEnv(middleware_insertion_facade_default.trace)
  },
  ...middleware_insertion_facade_default.scheduled && {
    scheduled: maskHandlerEnv(middleware_insertion_facade_default.scheduled)
  },
  ...middleware_insertion_facade_default.queue && {
    queue: maskHandlerEnv(middleware_insertion_facade_default.queue)
  },
  ...middleware_insertion_facade_default.test && {
    test: maskHandlerEnv(middleware_insertion_facade_default.test)
  },
  ...middleware_insertion_facade_default.email && {
    email: maskHandlerEnv(middleware_insertion_facade_default.email)
  },
  fetch(request, rawEnv, ctx) {
    const env = getMaskedEnv(rawEnv);
    if (middleware_insertion_facade_default.middleware && middleware_insertion_facade_default.middleware.length > 0) {
      if (!registeredMiddleware) {
        registeredMiddleware = true;
        for (const middleware of middleware_insertion_facade_default.middleware) {
          __facade_register__(middleware);
        }
      }
      const __facade_modules_dispatch__ = function(type, init) {
        if (type === "scheduled" && middleware_insertion_facade_default.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return middleware_insertion_facade_default.scheduled(controller, env, ctx);
        }
      };
      return __facade_invoke__(
        request,
        env,
        ctx,
        __facade_modules_dispatch__,
        __facade_modules_fetch__
      );
    } else {
      return __facade_modules_fetch__(request, env, ctx);
    }
  }
};
function maskHandlerEnv(handler) {
  return (data, env, ctx) => handler(data, getMaskedEnv(env), ctx);
}
var middleware_loader_entry_default = facade2;
export {
  middleware_loader_entry_default as default,
  my as pageMap
};
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-core/dist/runtime-core.esm-bundler.js:
  (**
  * @vue/runtime-core v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)

@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:
  (**
  * @vue/runtime-dom v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
  (*! #__NO_SIDE_EFFECTS__ *)

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/server-renderer/dist/server-renderer.esm-bundler.js:
  (**
  * @vue/server-renderer v3.4.15
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
//# sourceMappingURL=bundledWorker-0.12293931915058898.mjs.map
