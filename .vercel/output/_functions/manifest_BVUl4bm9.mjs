import 'piccolore';
import { o as decodeKey } from './chunks/astro/server_BxkpRKHs.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BGAW_Re-.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/","cacheDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/node_modules/.astro/","outDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/dist/","srcDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/src/","publicDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/public/","buildClientDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/dist/client/","buildServerDir":"file:///C:/Users/domen/OneDrive/Escritorio/dj%20edison%20arias/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"es/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.X3BVIXhN.css"}],"routeData":{"route":"/es","isIndex":true,"type":"page","pattern":"^\\/es\\/?$","segments":[[{"content":"es","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/es/index.astro","pathname":"/es","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"linktree/index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.X3BVIXhN.css"}],"routeData":{"route":"/linktree","isIndex":false,"type":"page","pattern":"^\\/linktree\\/?$","segments":[[{"content":"linktree","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/linktree.astro","pathname":"/linktree","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.X3BVIXhN.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/booking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/booking\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"booking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/booking.ts","pathname":"/api/booking","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.ariaslatinparty.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/pages/es/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/pages/linktree.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/api/booking@_@ts":"pages/api/booking.astro.mjs","\u0000@astro-page:src/pages/es/index@_@astro":"pages/es.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/linktree@_@astro":"pages/linktree.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BVUl4bm9.mjs","C:/Users/domen/OneDrive/Escritorio/dj edison arias/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DGzhndPA.mjs","C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/components/BookingForm.jsx":"_astro/BookingForm.Im79FdkV.js","C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/components/ContactModal.jsx":"_astro/ContactModal.kDkIJQKE.js","C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/components/three/HeroScene.jsx":"_astro/HeroScene.B9L97EoD.js","C:/Users/domen/OneDrive/Escritorio/dj edison arias/src/components/three/ModelViewer.jsx":"_astro/ModelViewer.jcVheisy.js","@astrojs/react/client.js":"_astro/client.Bz692-Ao.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.X3BVIXhN.css","/llms.txt","/robots.txt","/images/background.png","/images/dj.jpg","/images/Edy-past.jpg","/images/logo.png","/_astro/BookingForm.Im79FdkV.js","/_astro/client.Bz692-Ao.js","/_astro/ContactModal.kDkIJQKE.js","/_astro/ContactShadows.kEW-YLzl.js","/_astro/HeroScene.B9L97EoD.js","/_astro/index.DK-fsZOb.js","/_astro/jsx-runtime.ClP7wGfN.js","/_astro/ModelViewer.jcVheisy.js","/_astro/Turnstile.CNL-Nh31.js","/images/Events/20210703_102412.jpg","/images/Events/20210703_210035.jpg","/images/Events/20210709_171350.jpg","/images/Events/20210709_193545.jpg","/images/Profile/29340155_10155117723125064_3924578567752515584_n.jpg","/images/Profile/39390210_2669887416370911_6329243787990138880_n.jpg","/images/Profile/39775313_10160822004505118_2184423648100614144_n.jpg","/images/Flyers/1.jpg","/images/Flyers/2.jpg","/images/gallery/g3.jpg","/images/gallery/g4.jpg","/images/gallery/g6.jpg","/images/gallery/g7.jpg","/images/gallery/g8.jpg","/images/gallery/g9.jpg","/models/pioneer_dj_console/license.txt","/models/pioneer_dj_console/scene.bin","/models/pioneer_dj_console/scene.gltf","/models/krk_ce_99/license.txt","/models/krk_ce_99/scene.bin","/models/krk_ce_99/scene.gltf","/models/pioneer_dj_console/textures/console_material_baseColor.png","/models/pioneer_dj_console/textures/console_material_emissive.png","/models/pioneer_dj_console/textures/console_material_metallicRoughness.png","/models/pioneer_dj_console/textures/console_material_normal.png","/models/krk_ce_99/textures/CE-99_baseColor.png","/models/krk_ce_99/textures/Etiquette_baseColor.png","/models/krk_ce_99/textures/KRK_Logo_baseColor.png","/models/krk_ce_99/textures/Membrane-HP_baseColor.png","/models/krk_ce_99/textures/Texture-caisse_baseColor.jpeg","/es/index.html","/linktree/index.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["en","es"],"defaultLocale":"en","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"thCrycvwmFlL36c78SvhdvrIRz2L/mj3kasQNYGoZZI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
