const j = ({
  inBaseUrl: u = "",
  inReadUrl: f = "",
  inCreateUrl: p = "",
  inUpdateUrl: w = "",
  inDeleteUrl: h = "",
  inHeaders: y = {},
  inFetchOptions: U = {},
  inCustom: m = {}
} = {}) => {
  const l = u, $ = f || l, I = p || l, T = w || l, g = h || l, i = {
    "Content-Type": "application/json",
    ...y
  }, d = U, r = m;
  return {
    read: async ({ inQuery: n = {}, inUrl: s } = {}) => {
      const t = n;
      if (typeof r.read == "function")
        return await r.read({ inQuery: t });
      const a = s || $;
      if (!a) return [];
      let e = a;
      if (t && typeof t == "object" && Object.keys(t).length > 0) {
        const c = new URLSearchParams(t).toString();
        c && (e += (e.includes("?") ? "&" : "?") + c);
      }
      const o = await fetch(e, {
        method: "GET",
        headers: i,
        ...d
      });
      if (!o.ok)
        throw new Error(`DataProvider read failed: ${o.status} ${o.statusText}`);
      return await o.json();
    },
    create: async ({ inItem: n = {}, inUrl: s } = {}) => {
      const t = n;
      if (typeof r.create == "function")
        return await r.create({ inItem: t });
      const e = await fetch(s || I, {
        method: "POST",
        headers: i,
        body: JSON.stringify(t),
        ...d
      });
      if (!e.ok)
        throw new Error(`DataProvider create failed: ${e.status} ${e.statusText}`);
      return await e.json();
    },
    update: async ({ inId: n, inItem: s = {}, inUrl: t } = {}) => {
      const a = n, e = s;
      if (typeof r.update == "function")
        return await r.update({ inId: a, inItem: e });
      let o = t || T;
      a != null && (o.includes(":id") ? o = o.replace(":id", encodeURIComponent(a)) : o = `${o.replace(/\/$/, "")}/${encodeURIComponent(a)}`);
      const c = await fetch(o, {
        method: "PUT",
        headers: i,
        body: JSON.stringify(e),
        ...d
      });
      if (!c.ok)
        throw new Error(`DataProvider update failed: ${c.status} ${c.statusText}`);
      return await c.json();
    },
    delete: async ({ inId: n, inUrl: s } = {}) => {
      const t = n;
      if (typeof r.delete == "function")
        return await r.delete({ inId: t });
      let a = s || g;
      t != null && (a.includes(":id") ? a = a.replace(":id", encodeURIComponent(t)) : a = `${a.replace(/\/$/, "")}/${encodeURIComponent(t)}`);
      const e = await fetch(a, {
        method: "DELETE",
        headers: i,
        ...d
      });
      if (!e.ok)
        throw new Error(`DataProvider delete failed: ${e.status} ${e.statusText}`);
      return await e.json();
    }
  };
}, v = "v1.0.0";
window.ks ?? (window.ks = {});
window.ks["json-to-dom-provider"] = {
  version: v,
  createDataProvider: j
};
export {
  j as createDataProvider,
  j as default,
  v as version
};