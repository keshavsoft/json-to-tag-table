const O = {
  version: "v18.0.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, I = (t) => {
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: O,
    Table: t
  });
}, x = ({ inData: t = [] } = {}) => {
  const n = t;
  if (!Array.isArray(n) || n.length === 0)
    return [];
  const e = n[0];
  return !e || typeof e != "object" ? [] : Object.keys(e).map((o) => ({
    key: o,
    label: o
  }));
}, K = !0, V = [], J = {
  columns: []
}, L = [], D = {
  serial: K,
  colgroup: V,
  head: J,
  foot: L
}, M = ({ inData: t = [], inColumns: n = [], inConfig: e = {}, inTopN: o } = {}) => {
  const l = t, a = n, r = e, s = o, u = Array.isArray(l) ? typeof structuredClone == "function" ? structuredClone(l) : JSON.parse(JSON.stringify(l)) : [], d = Array.isArray(a) && a.length > 0 ? a : x({ inData: u }), c = {
    ...D,
    ...r
  };
  return {
    originalData: u,
    columns: d,
    config: c,
    topN: s
  };
}, z = ({ inColumnsCatalog: t = [], inColumnKeys: n = [] } = {}) => {
  const e = t, o = n;
  if (Array.isArray(o) && o.length > 0) {
    const l = new Map((Array.isArray(e) ? e : []).map((s) => [s.key, s])), a = [], r = [];
    for (const s of o) {
      const u = l.get(s);
      u ? r.push(u) : a.push(s);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${a.map((s) => `"${s}"`).join(", ")}] that do not exist in the columns catalog.`
    ), r;
  }
  return Array.isArray(e) ? e : [];
}, H = ({ inColGroup: t = [] } = {}) => {
  const n = t;
  return Array.isArray(n) ? n.map((o) => {
    let l = { ...o };
    return "width" in o && (l.style = `width: ${o.width}`), l;
  }) : [];
}, P = ({ inColumnsCatalog: t, inColumnKeys: n, inResolveColumns: e, inShowLog: o = !0 } = {}) => {
  const l = e;
  return typeof l == "function" ? l({
    inColumnsCatalog: t,
    inColumnKeys: n
  }) : (localSource == null ? void 0 : localSource.columns) || [];
}, q = ({
  inColumnsCatalog: t,
  inColumnKeys: n,
  inColGroup: e,
  inResolveColumns: o
} = {}) => {
  const a = P({
    inColumnsCatalog: t,
    inColumnKeys: n,
    inResolveColumns: o
  }), r = H({
    inColGroup: e
  });
  return {
    activeColumns: a,
    colGroup: r
  };
}, B = ({ inData: t = [], inActiveColumns: n } = {}) => {
  const e = t;
  return Array.isArray(e) ? e == null ? void 0 : e.map((l) => {
    const a = {};
    return n == null || n.forEach((r) => {
      a[r.key] = l[r.key];
    }), a;
  }) : [];
}, _ = ({ inConfig: t = {} } = {}) => {
  const n = t;
  return {
    key: "serial",
    label: "#",
    width: "50px",
    style: typeof (n == null ? void 0 : n.serial) == "object" && n.serial.style ? n.serial.style : "width: 50px;"
  };
}, U = ({ inColumns: t = [], inSerialCol: n = {} } = {}) => {
  const e = t, o = n, l = Array.isArray(e) ? e : [];
  return l.some((r) => r.key === "serial") ? l : [o, ...l];
}, W = ({ inColGroup: t = [], inSerialCol: n = {} } = {}) => {
  const e = t, o = n, l = Array.isArray(e) ? e : [];
  return l.some((r) => r.key === "serial") ? l : [o, ...l];
}, X = ({ inData: t = [] } = {}) => {
  const n = t;
  return (Array.isArray(n) ? n : []).map((o, l) => ({
    serial: l + 1,
    ...o || {}
  }));
}, Q = ({ inColumns: t = [], inData: n = [], inConfig: e = {}, inColGroup: o } = {}) => {
  const l = t, a = n, r = e, s = o;
  if (!(r != null && r.serial))
    return {
      columns: l,
      data: a,
      colGroup: s,
      isSerialEnabled: !1
    };
  const u = _({ inConfig: r }), d = U({ inColumns: l, inSerialCol: u }), c = W({ inColGroup: s, inSerialCol: u }), i = X({ inData: a });
  return {
    columns: d,
    data: i,
    colGroup: c,
    isSerialEnabled: !0
  };
}, Y = ({ inData: t = [], inLayout: n = {}, inConfig: e = {} } = {}) => {
  const o = t, l = n, a = e, r = B({
    inData: o,
    inActiveColumns: l.activeColumns
  }), s = Q({
    inColumns: l.activeColumns,
    inData: r,
    inConfig: a,
    inColGroup: l.colGroup
  });
  return {
    columns: s.columns,
    stateData: s.data,
    isSerialEnabled: s.isSerialEnabled,
    colGroup: s.colGroup
  };
}, Z = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, tt = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, A = {
  rowKeys: Z,
  types: tt
}, et = ({ inData: t = [], inKey: n } = {}) => {
  const e = t, o = n;
  return !Array.isArray(e) || !o ? 0 : e.reduce((l, a) => {
    const r = Number(a == null ? void 0 : a[o]);
    return l + (isNaN(r) ? 0 : r);
  }, 0);
}, nt = ({ inData: t = [] } = {}) => {
  const n = t;
  return Array.isArray(n) ? n.length : 0;
}, ot = ({ inData: t = [], inKey: n } = {}) => {
  const e = t, o = n;
  if (!Array.isArray(e) || e.length === 0 || !o) return 0;
  let l = 0;
  const a = e.reduce((r, s) => {
    const u = Number(s == null ? void 0 : s[o]);
    return isNaN(u) ? r : (l++, r + u);
  }, 0);
  return l > 0 ? a / l : 0;
}, lt = ({ inData: t = [], inKey: n } = {}) => {
  const e = t, o = n;
  if (!Array.isArray(e) || e.length === 0 || !o) return 0;
  let l = !1, a = 1 / 0;
  return e.forEach((r) => {
    const s = Number(r == null ? void 0 : r[o]);
    isNaN(s) || (l = !0, s < a && (a = s));
  }), l ? a : 0;
}, at = ({ inData: t = [], inKey: n } = {}) => {
  const e = t, o = n;
  if (!Array.isArray(e) || e.length === 0 || !o) return 0;
  let l = !1, a = -1 / 0;
  return e.forEach((r) => {
    const s = Number(r == null ? void 0 : r[o]);
    isNaN(s) || (l = !0, s > a && (a = s));
  }), l ? a : 0;
}, rt = {
  sum: et,
  count: nt,
  avg: ot,
  min: lt,
  max: at
}, st = ({ inExpression: t = "", inScope: n = {} } = {}) => {
  const e = t, o = n;
  try {
    const l = Object.keys(o), a = Object.values(o);
    return new Function(...l, `return ${e};`)(...a);
  } catch (l) {
    return console.error(`Error evaluating expression "${e}":`, l), 0;
  }
}, ct = ({ inRowConfig: t = {}, inData: n = [], inScope: e = {} } = {}) => {
  var p, f;
  const o = t, l = n, a = e, r = A.rowKeys || {}, s = o.id ?? r.id, u = o.title ?? r.title, d = o.type ?? r.type, c = o.values ?? r.values, i = {};
  if (d === "aggregate") {
    const m = ((f = (p = A.types) == null ? void 0 : p.aggregate) == null ? void 0 : f.supportedFunctions) || [];
    Object.entries(c).forEach(([y, g]) => {
      if (!m.includes(g)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${g}" for column "${y}". Supported: [${m.join(", ")}]`
        );
        return;
      }
      const h = rt[g];
      typeof h == "function" && (i[y] = h({ inData: l, inKey: y }));
    });
  } else d === "eval" ? Object.entries(c).forEach(([m, y]) => {
    typeof y == "string" && (i[m] = st({
      inExpression: y,
      inScope: a
    }));
  }) : d === "input" && Object.assign(i, c || {});
  return {
    id: s,
    title: u,
    type: d,
    values: i
  };
}, it = ({ inData: t = [], inFooterConfig: n = [] } = {}) => {
  const e = t, o = n;
  if (!Array.isArray(o)) return [];
  const l = {}, a = [];
  return o.forEach((r) => {
    const s = ct({
      inRowConfig: r,
      inData: e,
      inScope: l
    });
    r.id && (l[r.id] = s.values), a.push(s);
  }), a;
}, ut = ({ inComputedFooter: t = [], inActiveColumns: n = [] } = {}) => {
  var r, s;
  const e = t, o = n;
  if (!Array.isArray(e) || e.length === 0)
    return [];
  if (!Array.isArray(o) || o.length === 0)
    return [];
  const l = ((r = o[0]) == null ? void 0 : r.key) === "serial" && o.length > 1 ? 1 : 0, a = (s = o[l]) == null ? void 0 : s.key;
  return e.map((u) => {
    const d = u.values || {}, c = {};
    return u.type === "input" ? (o.forEach((i) => {
      if (i.key === "serial")
        c[i.key] = "+";
      else if (i.key in d) {
        const p = d[i.key] || {}, f = {
          type: p.type || "text",
          class: p.class || "form-control form-control-sm",
          name: i.key,
          placeholder: p.placeholder || i.label || i.key
        };
        p.disabled && (f.disabled = "disabled"), c[i.key] = {
          tagName: "input",
          attributes: f
        };
      } else
        c[i.key] = "";
    }), c) : (o.forEach((i) => {
      i.key in d ? c[i.key] = d[i.key] : i.key === a ? c[i.key] = u.title || u.id || "" : c[i.key] = "";
    }), c);
  });
}, dt = ({ inData: t = [], inColumns: n = [], inFooterConfig: e = [] } = {}) => {
  const o = t, l = n, r = it({
    inData: o,
    inFooterConfig: e
  }), s = ut({
    inComputedFooter: r,
    inActiveColumns: l
  });
  return {
    computedFooter: r,
    footerData: s
  };
}, ft = ({ inSource: t = {}, inResolveColumns: n } = {}) => {
  var s, u, d, c;
  const e = t, l = q({
    inResolveColumns: n,
    inColumnsCatalog: e == null ? void 0 : e.columns,
    inColumnKeys: (u = (s = e == null ? void 0 : e.config) == null ? void 0 : s.head) == null ? void 0 : u.columns,
    inColGroup: (d = e == null ? void 0 : e.config) == null ? void 0 : d.colgroup
  }), a = Y({
    inData: e == null ? void 0 : e.originalData,
    inLayout: l,
    inConfig: e == null ? void 0 : e.config
  }), r = dt({
    inData: a.stateData,
    inColumns: a.columns,
    inFooterConfig: (c = e == null ? void 0 : e.config) == null ? void 0 : c.foot
  });
  return {
    activeColumns: a.columns,
    stateData: a.stateData,
    colGroup: a.colGroup,
    isSerialEnabled: a.isSerialEnabled,
    computedFooter: r.computedFooter,
    footerData: r.footerData
  };
};
class pt {
  constructor({ inData: n = [], inColumns: e = [], inConfig: o = {} } = {}) {
    const l = n, a = e, r = o;
    this.source = M({
      inData: l,
      inColumns: a,
      inConfig: r
    }), this.library = ft({
      inSource: this.source,
      inResolveColumns: z
    });
  }
  get rawData() {
    return this.source.originalData;
  }
  get config() {
    return this.source.config;
  }
  get stateData() {
    return this.library.stateData;
  }
  get activeColumns() {
    return this.library.activeColumns;
  }
  get computedFooter() {
    return this.library.computedFooter;
  }
  get footerData() {
    return this.library.footerData;
  }
}
const mt = {
  version: "v8.0.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, yt = (t) => {
  var n;
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), (n = globalThis.ks).jsonRenderersBuild ?? (n.jsonRenderersBuild = {
    meta: mt,
    renderToDom: t
  }));
}, v = ({ inItems: t, inRecipe: n, inExecute: e }) => {
  const o = t, l = n, a = e;
  return o.map((r) => w({
    inSource: r,
    inRecipe: l,
    inExecute: a
  })).flat(1 / 0).filter(Boolean);
}, gt = ({ inSource: t, inRecipe: n, inExecute: e }) => {
  const o = t, l = n, a = e;
  let r = o;
  typeof a == "function" && (r = a({
    inSource: o,
    inRecipe: l
  }));
  for (const [s, u] of Object.entries(r))
    Array.isArray(u) && l && s in l && (r[s] = v({
      inItems: u,
      inRecipe: l[s],
      inExecute: a
    }));
  return r;
}, w = ({ inSource: t, inRecipe: n, inExecute: e }) => {
  const o = t, l = n, a = e;
  return Array.isArray(o) ? v({
    inItems: o,
    inRecipe: l,
    inExecute: a
  }) : typeof o == "object" && o !== null ? gt({
    inSource: o,
    inRecipe: l,
    inExecute: a
  }) : o;
}, ht = ({ inKey: t, inDirective: n }) => {
  const e = t, o = n;
  return (o == null ? void 0 : o.alterKey) || e;
}, Ct = ({ inValue: t, inDirective: n, inExecute: e }) => {
  const o = t, l = n, a = e;
  return l && "transform" in l ? w({
    inSource: o,
    inRecipe: l,
    inExecute: a
  }) : o;
}, bt = ({ inValue: t, inDirective: n }) => {
  const e = t, o = n;
  return (o == null ? void 0 : o.valueType) === "array" && !Array.isArray(e) ? [e] : e;
}, wt = ({ inValue: t, inDirective: n }) => {
  const e = t, o = n;
  return o != null && o.valueKey && e && typeof e == "object" ? e[o.valueKey] : e;
}, Tt = ({ inSource: t, inTransform: n, inExecute: e }) => {
  const o = t, l = n, a = e, r = {};
  for (const [s, u] of Object.entries(o)) {
    if (!(s in l))
      continue;
    const d = l[s], c = ht({ inKey: s, inDirective: d });
    let i = u;
    i = Ct({
      inValue: i,
      inDirective: d,
      inExecute: a
    }), i = bt({ inValue: i, inDirective: d }), i = wt({ inValue: i, inDirective: d }), r[c] = i;
  }
  return r;
};
function $(t, n) {
  for (const e in t)
    typeof t[e] == "object" && t[e] !== null ? $(t[e], n) : typeof t[e] == "string" && t[e] === "${}" && (t[e] = n);
  return t;
}
const At = ({ inSource: t, inOperation: n, inExecute: e }) => {
  const o = t, l = n;
  for (const [a, r] of Object.entries(l))
    if ("operationType" in r && r.operationType === "loopArray" && a in o) {
      const s = o[a].map((u) => {
        const d = structuredClone(r == null ? void 0 : r.template);
        return $(d, u), d;
      });
      o[a] = s;
    }
  return o;
}, C = ({ inSource: t, inRecipe: n }) => {
  let e = t;
  const o = n;
  return o && typeof o == "object" && "transform" in o && (e = Tt({
    inSource: e,
    inTransform: o.transform,
    inExecute: C
  })), o && typeof o == "object" && "operation" in o && (e = At({
    inSource: e,
    inOperation: o.operation,
    inExecute: C
  })), e;
}, T = (t, n) => w({
  inSource: t,
  inRecipe: n,
  inExecute: C
}), xt = {
  children: ""
}, Dt = {
  children: {
    operationType: "loopArray",
    template: {
      tagName: "th",
      attributes: {
        value: "${}"
      },
      textContent: "${}"
    }
  }
}, vt = {
  transform: xt,
  operation: Dt
}, $t = ({
  inData: t
}) => {
  let e = T({
    children: t
  }, vt);
  return e == null ? void 0 : e.children;
}, St = "tr", kt = [], Et = {
  tagName: St,
  children: kt
}, Nt = ({
  inData: t
}) => {
  const n = t, e = structuredClone(Et);
  return e.children = $t({ inData: n }), e;
}, Ft = "thead", jt = [], Rt = {
  tagName: Ft,
  children: jt
}, S = ({
  inData: t
}) => {
  const n = t, e = structuredClone(Rt);
  return e.children = [Nt({ inData: n })], e;
}, Gt = {
  children: ""
}, Ot = {
  children: {
    operationType: "loopArray",
    template: {
      tagName: "td",
      attributes: {
        value: "${}"
      },
      textContent: "${}"
    }
  }
}, It = {
  transform: Gt,
  operation: Ot
}, Kt = ({
  inData: t
}) => {
  let e = T({
    children: t
  }, It);
  return e == null ? void 0 : e.children;
}, Vt = "tr", Jt = [], Lt = {
  tagName: Vt,
  children: Jt
}, Mt = ({
  inData: t,
  inColumns: n
}) => {
  const e = t, o = n;
  return e.map((l) => {
    const a = Array.isArray(l) ? l : o.map((s) => l[s]), r = structuredClone(Lt);
    return r.children = Kt({ inData: a }), r;
  });
}, zt = "tbody", Ht = [], Pt = {
  tagName: zt,
  children: Ht
}, k = ({
  inData: t,
  inColumns: n
}) => {
  const e = t, o = n, l = structuredClone(Pt);
  return l.children = Mt({
    inData: e,
    inColumns: o
  }), l;
}, qt = "table", Bt = {
  class: "table table-hover table-striped mb-0"
}, _t = [], Ut = {
  tagName: qt,
  attributes: Bt,
  children: _t
}, E = ({
  inColumns: t,
  inData: n
}) => {
  const e = t, o = n, l = structuredClone(Ut);
  return l.children = [
    S({ inData: e }),
    k({ inData: o, inColumns: e })
  ], l;
}, Wt = {
  children: ""
}, Xt = {
  children: {
    operationType: "loopArray",
    template: {
      tagName: "option",
      attributes: {
        value: "${}"
      },
      textContent: "${}"
    }
  }
}, Qt = {
  transform: Wt,
  operation: Xt
}, N = ({
  inData: t
}) => {
  let e = T({
    children: t
  }, Qt);
  return e == null ? void 0 : e.children;
}, Yt = "select", Zt = {
  id: "LedgerName"
}, te = [], ee = {
  tagName: Yt,
  attributes: Zt,
  children: te
}, ne = ({
  inData: t
}) => {
  let e = N({
    inData: t
  });
  const o = structuredClone(ee);
  return o.children = e, o;
}, oe = {
  table: E,
  select: ne,
  selectOptionsOnly: N,
  tableHead: S,
  tableBody: k
}, le = ({
  type: t = "table",
  data: n,
  columns: e
}) => {
  const l = oe[t];
  return l({
    inColumns: e,
    inData: n
  });
};
yt(le);
const ae = {
  version: "v9",
  description: "JSON-to-DOM engine with SVG namespace support, mixed text content, and centralized traversal"
}, re = ({ inFuncDefinition: t, inReviewSpec: n } = {}) => {
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = {
    meta: ae,
    buildSpecElement: t,
    reviewSpec: n
  };
  globalThis.ks["json-to-tag"] = e, globalThis.ks.jsonToTag = e;
}, se = (t) => t == null ? null : typeof Node < "u" && t instanceof Node ? t : typeof t == "string" || typeof t == "number" ? document.createTextNode(String(t)) : typeof t == "object" && (t.nodeType === 3 || t.tagName === "#text" || !t.tagName && (t.textContent !== void 0 || t.text !== void 0)) ? document.createTextNode(t.textContent ?? t.text ?? "") : j(t), F = (t) => Array.isArray(t) ? t.map(se).flat(1 / 0).filter(Boolean) : [], ce = (t) => (t == null, t), ie = "http://www.w3.org/2000/svg", ue = /* @__PURE__ */ new Set([
  "svg",
  "path",
  "symbol",
  "use",
  "g",
  "circle",
  "ellipse",
  "rect",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "defs",
  "clippath",
  "mask",
  "pattern",
  "marker",
  "lineargradient",
  "radialgradient",
  "stop",
  "image",
  "filter",
  "fegaussianblur",
  "femerge",
  "femergenode"
]), de = ({ inTagName: t }) => {
  const n = t == null ? void 0 : t.toLowerCase();
  if (!n) return null;
  if (n === "checkbox") {
    const e = document.createElement("input");
    return e.type = "checkbox", e;
  }
  return ue.has(n) ? document.createElementNS(ie, n) : document.createElement(n);
}, fe = ({ inElement: t, inTextContent: n }) => (!t || n === void 0 || n === null || (t.textContent = n), t), pe = ({ inElement: t, inProperties: n }) => (t && n && typeof n == "object" && Object.assign(t, n), t), me = "http://www.w3.org/1999/xlink", ye = ({ inElement: t, inAttributes: n }) => {
  const e = t, o = n;
  if (!e || !o || typeof o != "object")
    return e;
  const l = typeof SVGElement < "u" ? e instanceof SVGElement : e.namespaceURI === "http://www.w3.org/2000/svg";
  return Object.entries(o).forEach(([a, r]) => {
    if (a === "class") {
      l ? e.setAttribute("class", String(r)) : e.className = r;
      return;
    }
    if (a === "xlink:href" || a === "href") {
      if (r != null) {
        const s = String(r);
        if (l)
          try {
            e.setAttributeNS(me, "href", s);
          } catch {
          }
        e.setAttribute("href", s), e.setAttribute("xlink:href", s);
      }
      return;
    }
    if (typeof r == "boolean") {
      r ? e.setAttribute(a, "") : e.removeAttribute(a);
      return;
    }
    r != null && e.setAttribute(a, String(r));
  }), e;
}, ge = ({ inElement: t, inClassList: n }) => {
  if (!t || !n) return t;
  const e = typeof n == "string" ? n.split(/\s+/).filter(Boolean) : Array.isArray(n) ? n.filter((o) => typeof o == "string" && o.trim()) : [];
  return e.length && t.classList.add(...e), t;
}, he = (t) => {
  if (!t || typeof t != "object" || Array.isArray(t) || !t.tagName) return null;
  const n = de({ inTagName: t.tagName });
  if (!n) return null;
  if (fe({
    inElement: n,
    inTextContent: ce(t.textContent),
    inTagName: t.tagName
  }), pe({
    inElement: n,
    inProperties: t.properties
  }), ye({
    inElement: n,
    inAttributes: t.attributes
  }), ge({
    inElement: n,
    inClassList: t.classList
  }), Array.isArray(t.children)) {
    const e = F(t.children);
    e.length && n.append(...e);
  }
  return n;
}, j = (t) => t == null ? null : typeof Node < "u" && t instanceof Node ? t : Array.isArray(t) ? F(t) : typeof t == "object" ? he(t) : typeof t == "string" || typeof t == "number" ? document.createTextNode(String(t)) : null, Ce = "./tags.schema.json", be = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, we = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "placeholder",
    "value",
    "name",
    "disabled",
    "readonly",
    "required",
    "list"
  ]
}, Te = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "type",
    "checked",
    "name",
    "value",
    "disabled",
    "required"
  ]
}, Ae = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, xe = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, De = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, ve = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "action",
    "method",
    "autocomplete",
    "enctype",
    "name",
    "novalidate",
    "target"
  ],
  childTags: []
}, $e = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "name",
    "disabled",
    "required",
    "multiple",
    "size"
  ],
  childTags: [
    "option"
  ]
}, Se = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ke = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ee = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ne = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Fe = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, je = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Re = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "border",
    "cellpadding",
    "cellspacing"
  ],
  childTags: [
    "caption",
    "colgroup",
    "thead",
    "tbody",
    "tfoot",
    "tr"
  ]
}, Ge = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Oe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Ie = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Ke = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, Ve = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Je = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Le = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Me = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, ze = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, He = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "href",
    "target",
    "rel",
    "title",
    "download"
  ],
  childTags: []
}, Pe = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, qe = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Be = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, _e = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, Ue = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, We = {
  $schema: Ce,
  div: be,
  input: we,
  checkbox: Te,
  colgroup: Ae,
  col: xe,
  label: De,
  form: ve,
  select: $e,
  p: Se,
  h1: ke,
  h2: Ee,
  span: Ne,
  img: Fe,
  button: je,
  table: Re,
  thead: Ge,
  tbody: Oe,
  tfoot: Ie,
  tr: Ke,
  th: Ve,
  td: Je,
  datalist: Le,
  option: Me,
  header: ze,
  a: He,
  i: Pe,
  small: qe,
  ul: Be,
  li: _e,
  hr: Ue
}, b = ({ inSpec: t }) => {
  const n = t;
  if (!n) return [];
  if (Array.isArray(n))
    return n.flatMap((o) => b({ inSpec: o }));
  if (typeof n != "object") return [];
  const e = [];
  return typeof n.tagName == "string" && n.tagName.trim().length > 0 && e.push(n.tagName.toLowerCase()), Array.isArray(n.children) && n.children.length > 0 && n.children.forEach((o) => {
    const l = b({ inSpec: o });
    e.push(...l);
  }), e;
}, Xe = ({ inTagsFound: t, inAllowedTags: n }) => {
  const e = t ?? [], o = n ?? {}, l = new Set(
    Object.keys(o).filter((c) => c !== "$schema").map((c) => c.toLowerCase())
  ), a = {}, r = [], s = [];
  e.forEach((c) => {
    a[c] = (a[c] || 0) + 1, l.has(c) ? r.includes(c) || r.push(c) : s.includes(c) || s.push(c);
  });
  const u = e.length, d = s.length === 0;
  return {
    totalTags: u,
    tagCounts: a,
    uniqueTags: Object.keys(a),
    recognizedTags: r,
    unrecognizedTags: s,
    areAllTagsPresent: d
  };
}, Qe = ({ inSpec: t, inTags: n = We } = {}) => {
  const e = t, o = n, l = b({ inSpec: e }), a = Xe({
    inTagsFound: l,
    inAllowedTags: o
  });
  return {
    areAllTagsPresent: a.areAllTagsPresent,
    totalTags: a.totalTags,
    tagCounts: a.tagCounts,
    uniqueTags: a.uniqueTags,
    recognizedTags: a.recognizedTags,
    unrecognizedTags: a.unrecognizedTags
  };
}, R = (t = {}) => {
  const n = (t == null ? void 0 : t.spec) ?? (t == null ? void 0 : t.inSpec) ?? t;
  return j(n);
};
re({
  inFuncDefinition: R,
  inReviewSpec: Qe
});
const G = ({
  inTargetHtmlId: t,
  targetHtmlId: n,
  inColumns: e,
  inData: o
}) => {
  const l = t || n, a = e, r = o, s = a.map((f) => f.label), u = a.map((f) => f.key), d = r.map((f) => u.map((m) => f[m])), c = E({
    inColumns: s,
    inData: d
  }), i = R(c), p = document.getElementById(l);
  return p.innerHTML = "", p.append(i), i;
}, Ye = ({ inTable: t }) => {
  const n = t, e = n.store.library.activeColumns, o = n.store.library.stateData;
  return { render: ({ inTargetHtmlId: a, targetHtmlId: r } = {}) => {
    const s = a || r || n.containerId;
    return G({
      inTargetHtmlId: s,
      inColumns: e,
      inData: o
    });
  } };
};
class Ze {
  constructor({
    inData: n,
    data: e = [],
    inColumns: o,
    columns: l,
    inConfig: a,
    config: r,
    inDataProvider: s,
    dataProvider: u = null,
    inTargetContainerId: d,
    targetContainerId: c = ""
  } = {}) {
    const i = n || e, p = s || u, f = d || c, m = o || l, y = a || r, g = Array.isArray(m) && m.length > 0 ? m : x({ inData: i }), h = {
      ...D,
      ...y
    };
    this.containerId = f, this.dataProvider = p, this.store = new pt({
      inData: i,
      inColumns: g,
      inConfig: h
    }), this.methods = Ye({ inTable: this });
  }
}
const tn = ({
  inTargetHtmlId: t,
  targetHtmlId: n,
  inColumns: e,
  inData: o
}) => G({
  inTargetHtmlId: t || n,
  inColumns: e,
  inData: o
});
I(Ze);
export {
  Ze as Table,
  Ze as default,
  D as defaultConfig,
  tn as render,
  G as renderTable
};
