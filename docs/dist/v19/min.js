const v = {
  version: "v19.0.0",
  description: "build table from store data and render to DOM uses json-transformer-funcs, json-to-tag under the hood"
}, N = (t) => {
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: v,
    Table: t
  });
}, w = ({ inData: t = [] } = {}) => {
  const o = t;
  if (!Array.isArray(o) || o.length === 0)
    return [];
  const e = o[0];
  return !e || typeof e != "object" ? [] : Object.keys(e).map((n) => ({
    key: n,
    label: n
  }));
}, k = !0, E = [], j = {
  columns: []
}, G = [], T = {
  serial: k,
  colgroup: E,
  head: j,
  foot: G
}, F = ({ inData: t = [], inColumns: o = [], inConfig: e = {}, inTopN: n } = {}) => {
  const a = t, s = o, l = e, r = n, c = Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [], d = Array.isArray(s) && s.length > 0 ? s : w({ inData: c }), i = {
    ...T,
    ...l
  };
  return {
    originalData: c,
    columns: d,
    config: i,
    topN: r
  };
}, I = ({ inColumnsCatalog: t = [], inColumnKeys: o = [] } = {}) => {
  const e = t, n = o;
  if (Array.isArray(n) && n.length > 0) {
    const a = new Map((Array.isArray(e) ? e : []).map((r) => [r.key, r])), s = [], l = [];
    for (const r of n) {
      const c = a.get(r);
      c ? l.push(c) : s.push(r);
    }
    return s.length > 0 && console.warn(
      `[json-to-tag-table] Warning: Config requested columns [${s.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), l;
  }
  return Array.isArray(e) ? e : [];
}, $ = ({ inColGroup: t = [] } = {}) => {
  const o = t;
  return Array.isArray(o) ? o.map((n) => {
    let a = { ...n };
    return "width" in n && (a.style = `width: ${n.width}`), a;
  }) : [];
}, O = ({ inColumnsCatalog: t, inColumnKeys: o, inResolveColumns: e, inShowLog: n = !0 } = {}) => {
  const a = e;
  return typeof a == "function" ? a({
    inColumnsCatalog: t,
    inColumnKeys: o
  }) : (localSource == null ? void 0 : localSource.columns) || [];
}, R = ({
  inColumnsCatalog: t,
  inColumnKeys: o,
  inColGroup: e,
  inResolveColumns: n
} = {}) => {
  const s = O({
    inColumnsCatalog: t,
    inColumnKeys: o,
    inResolveColumns: n
  }), l = $({
    inColGroup: e
  });
  return {
    activeColumns: s,
    colGroup: l
  };
}, K = ({ inData: t = [], inActiveColumns: o } = {}) => {
  const e = t;
  return Array.isArray(e) ? e == null ? void 0 : e.map((a) => {
    const s = {};
    return o == null || o.forEach((l) => {
      s[l.key] = a[l.key];
    }), s;
  }) : [];
}, V = ({ inConfig: t = {} } = {}) => {
  const o = t;
  return {
    key: "serial",
    label: "#",
    width: "50px",
    style: typeof (o == null ? void 0 : o.serial) == "object" && o.serial.style ? o.serial.style : "width: 50px;"
  };
}, B = ({ inColumns: t = [], inSerialCol: o = {} } = {}) => {
  const e = t, n = o, a = Array.isArray(e) ? e : [];
  return a.some((l) => l.key === "serial") ? a : [n, ...a];
}, H = ({ inColGroup: t = [], inSerialCol: o = {} } = {}) => {
  const e = t, n = o, a = Array.isArray(e) ? e : [];
  return a.some((l) => l.key === "serial") ? a : [n, ...a];
}, L = ({ inData: t = [] } = {}) => {
  const o = t;
  return (Array.isArray(o) ? o : []).map((n, a) => ({
    serial: a + 1,
    ...n || {}
  }));
}, M = ({ inColumns: t = [], inData: o = [], inConfig: e = {}, inColGroup: n } = {}) => {
  const a = t, s = o, l = e, r = n;
  if (!(l != null && l.serial))
    return {
      columns: a,
      data: s,
      colGroup: r,
      isSerialEnabled: !1
    };
  const c = V({ inConfig: l }), d = B({ inColumns: a, inSerialCol: c }), i = H({ inColGroup: r, inSerialCol: c }), u = L({ inData: s });
  return {
    columns: d,
    data: u,
    colGroup: i,
    isSerialEnabled: !0
  };
}, z = ({ inData: t = [], inLayout: o = {}, inConfig: e = {} } = {}) => {
  const n = t, a = o, s = e, l = K({
    inData: n,
    inActiveColumns: a.activeColumns
  }), r = M({
    inColumns: a.activeColumns,
    inData: l,
    inConfig: s,
    inColGroup: a.colGroup
  });
  return {
    columns: r.columns,
    stateData: r.data,
    isSerialEnabled: r.isSerialEnabled,
    colGroup: r.colGroup
  };
}, q = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, P = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, b = {
  rowKeys: q,
  types: P
}, J = ({ inData: t = [], inKey: o } = {}) => {
  const e = t, n = o;
  return !Array.isArray(e) || !n ? 0 : e.reduce((a, s) => {
    const l = Number(s == null ? void 0 : s[n]);
    return a + (isNaN(l) ? 0 : l);
  }, 0);
}, _ = ({ inData: t = [] } = {}) => {
  const o = t;
  return Array.isArray(o) ? o.length : 0;
}, U = ({ inData: t = [], inKey: o } = {}) => {
  const e = t, n = o;
  if (!Array.isArray(e) || e.length === 0 || !n) return 0;
  let a = 0;
  const s = e.reduce((l, r) => {
    const c = Number(r == null ? void 0 : r[n]);
    return isNaN(c) ? l : (a++, l + c);
  }, 0);
  return a > 0 ? s / a : 0;
}, W = ({ inData: t = [], inKey: o } = {}) => {
  const e = t, n = o;
  if (!Array.isArray(e) || e.length === 0 || !n) return 0;
  let a = !1, s = 1 / 0;
  return e.forEach((l) => {
    const r = Number(l == null ? void 0 : l[n]);
    isNaN(r) || (a = !0, r < s && (s = r));
  }), a ? s : 0;
}, X = ({ inData: t = [], inKey: o } = {}) => {
  const e = t, n = o;
  if (!Array.isArray(e) || e.length === 0 || !n) return 0;
  let a = !1, s = -1 / 0;
  return e.forEach((l) => {
    const r = Number(l == null ? void 0 : l[n]);
    isNaN(r) || (a = !0, r > s && (s = r));
  }), a ? s : 0;
}, Q = {
  sum: J,
  count: _,
  avg: U,
  min: W,
  max: X
}, Y = ({ inExpression: t = "", inScope: o = {} } = {}) => {
  const e = t, n = o;
  try {
    const a = Object.keys(n), s = Object.values(n);
    return new Function(...a, `return ${e};`)(...s);
  } catch (a) {
    return console.error(`Error evaluating expression "${e}":`, a), 0;
  }
}, Z = ({ inRowConfig: t = {}, inData: o = [], inScope: e = {} } = {}) => {
  var f, y;
  const n = t, a = o, s = e, l = b.rowKeys || {}, r = n.id ?? l.id, c = n.title ?? l.title, d = n.type ?? l.type, i = n.values ?? l.values, u = {};
  if (d === "aggregate") {
    const g = ((y = (f = b.types) == null ? void 0 : f.aggregate) == null ? void 0 : y.supportedFunctions) || [];
    Object.entries(i).forEach(([p, h]) => {
      if (!g.includes(h)) {
        console.warn(
          `[json-to-tag-table] Warning: Unknown aggregate function "${h}" for column "${p}". Supported: [${g.join(", ")}]`
        );
        return;
      }
      const m = Q[h];
      typeof m == "function" && (u[p] = m({ inData: a, inKey: p }));
    });
  } else d === "eval" ? Object.entries(i).forEach(([g, p]) => {
    typeof p == "string" && (u[g] = Y({
      inExpression: p,
      inScope: s
    }));
  }) : d === "input" && Object.assign(u, i || {});
  return {
    id: r,
    title: c,
    type: d,
    values: u
  };
}, tt = ({ inData: t = [], inFooterConfig: o = [] } = {}) => {
  const e = t, n = o;
  if (!Array.isArray(n)) return [];
  const a = {}, s = [];
  return n.forEach((l) => {
    const r = Z({
      inRowConfig: l,
      inData: e,
      inScope: a
    });
    l.id && (a[l.id] = r.values), s.push(r);
  }), s;
}, et = ({ inComputedFooter: t = [], inActiveColumns: o = [] } = {}) => {
  var l, r;
  const e = t, n = o;
  if (!Array.isArray(e) || e.length === 0)
    return [];
  if (!Array.isArray(n) || n.length === 0)
    return [];
  const a = ((l = n[0]) == null ? void 0 : l.key) === "serial" && n.length > 1 ? 1 : 0, s = (r = n[a]) == null ? void 0 : r.key;
  return e.map((c) => {
    const d = c.values || {}, i = {};
    return c.type === "input" ? (n.forEach((u) => {
      if (u.key === "serial")
        i[u.key] = "+";
      else if (u.key in d) {
        const f = d[u.key] || {}, y = {
          type: f.type || "text",
          class: f.class || "form-control form-control-sm",
          name: u.key,
          placeholder: f.placeholder || u.label || u.key
        };
        f.disabled && (y.disabled = "disabled"), i[u.key] = {
          tagName: "input",
          attributes: y
        };
      } else
        i[u.key] = "";
    }), i) : (n.forEach((u) => {
      u.key in d ? i[u.key] = d[u.key] : u.key === s ? i[u.key] = c.title || c.id || "" : i[u.key] = "";
    }), i);
  });
}, ot = ({ inData: t = [], inColumns: o = [], inFooterConfig: e = [] } = {}) => {
  const n = t, a = o, l = tt({
    inData: n,
    inFooterConfig: e
  }), r = et({
    inComputedFooter: l,
    inActiveColumns: a
  });
  return {
    computedFooter: l,
    footerData: r
  };
}, nt = ({ inSource: t = {}, inResolveColumns: o } = {}) => {
  var r, c, d, i;
  const e = t, a = R({
    inResolveColumns: o,
    inColumnsCatalog: e == null ? void 0 : e.columns,
    inColumnKeys: (c = (r = e == null ? void 0 : e.config) == null ? void 0 : r.head) == null ? void 0 : c.columns,
    inColGroup: (d = e == null ? void 0 : e.config) == null ? void 0 : d.colgroup
  }), s = z({
    inData: e == null ? void 0 : e.originalData,
    inLayout: a,
    inConfig: e == null ? void 0 : e.config
  }), l = ot({
    inData: s.stateData,
    inColumns: s.columns,
    inFooterConfig: (i = e == null ? void 0 : e.config) == null ? void 0 : i.foot
  });
  return {
    activeColumns: s.columns,
    stateData: s.stateData,
    colGroup: s.colGroup,
    isSerialEnabled: s.isSerialEnabled,
    computedFooter: l.computedFooter,
    footerData: l.footerData
  };
};
class lt {
  constructor({ inData: o = [], inColumns: e = [], inConfig: n = {} } = {}) {
    const a = o, s = e, l = n;
    this.source = F({
      inData: a,
      inColumns: s,
      inConfig: l
    }), this.library = nt({
      inSource: this.source,
      inResolveColumns: I
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
const at = (t, o) => {
  var l;
  const e = t, n = o, a = (l = n == null ? void 0 : n.textContent) == null ? void 0 : l.replace("${", "").replace("}", "");
  return e.map((r) => {
    const c = structuredClone(n);
    return c.textContent = r == null ? void 0 : r[a], c;
  });
}, st = (t, o, e) => {
  const n = t, a = o, s = e;
  return n.map((l) => {
    const r = structuredClone(a), c = rt({
      inSource: l,
      inTemplate: s
    });
    return r.children = c, r;
  });
}, rt = ({ inSource: t, inTemplate: o }) => {
  const e = t, n = o;
  let a = [];
  for (const [s, l] of Object.entries(e)) {
    const r = structuredClone(n);
    r.textContent = r.textContent.replace("${rowValue}", l).replace("${}", l), a.push(r);
  }
  return a;
}, it = ({ inData: t, inSpec: o, inTable: e }) => {
  const n = t, a = o, s = structuredClone(e), l = at(n.columns, a.buildHeader), r = st(
    n.rows,
    a.buildBody.outerTemplate,
    a.buildBody.innerTemplate
  ), c = s.children.find((i) => i.tagName === "thead"), d = s.children.find((i) => i.tagName === "tbody");
  return c.children[0].children = l, d.children = r, s;
}, ct = {
  version: "v9",
  description: "JSON-to-DOM engine with SVG namespace support, mixed text content, and centralized traversal"
}, ut = ({ inFuncDefinition: t, inReviewSpec: o } = {}) => {
  if (typeof globalThis > "u" || !t) return;
  globalThis.ks ?? (globalThis.ks = {});
  const e = {
    meta: ct,
    buildSpecElement: t,
    reviewSpec: o
  };
  globalThis.ks["json-to-tag"] = e, globalThis.ks.jsonToTag = e;
}, dt = (t) => t == null ? null : typeof Node < "u" && t instanceof Node ? t : typeof t == "string" || typeof t == "number" ? document.createTextNode(String(t)) : typeof t == "object" && (t.nodeType === 3 || t.tagName === "#text" || !t.tagName && (t.textContent !== void 0 || t.text !== void 0)) ? document.createTextNode(t.textContent ?? t.text ?? "") : x(t), A = (t) => Array.isArray(t) ? t.map(dt).flat(1 / 0).filter(Boolean) : [], ft = (t) => (t == null, t), gt = "http://www.w3.org/2000/svg", pt = /* @__PURE__ */ new Set([
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
]), yt = ({ inTagName: t }) => {
  const o = t == null ? void 0 : t.toLowerCase();
  if (!o) return null;
  if (o === "checkbox") {
    const e = document.createElement("input");
    return e.type = "checkbox", e;
  }
  return pt.has(o) ? document.createElementNS(gt, o) : document.createElement(o);
}, ht = ({ inElement: t, inTextContent: o }) => (!t || o === void 0 || o === null || (t.textContent = o), t), mt = ({ inElement: t, inProperties: o }) => (t && o && typeof o == "object" && Object.assign(t, o), t), Ct = "http://www.w3.org/1999/xlink", bt = ({ inElement: t, inAttributes: o }) => {
  const e = t, n = o;
  if (!e || !n || typeof n != "object")
    return e;
  const a = typeof SVGElement < "u" ? e instanceof SVGElement : e.namespaceURI === "http://www.w3.org/2000/svg";
  return Object.entries(n).forEach(([s, l]) => {
    if (s === "class") {
      a ? e.setAttribute("class", String(l)) : e.className = l;
      return;
    }
    if (s === "xlink:href" || s === "href") {
      if (l != null) {
        const r = String(l);
        if (a)
          try {
            e.setAttributeNS(Ct, "href", r);
          } catch {
          }
        e.setAttribute("href", r), e.setAttribute("xlink:href", r);
      }
      return;
    }
    if (typeof l == "boolean") {
      l ? e.setAttribute(s, "") : e.removeAttribute(s);
      return;
    }
    l != null && e.setAttribute(s, String(l));
  }), e;
}, wt = ({ inElement: t, inClassList: o }) => {
  if (!t || !o) return t;
  const e = typeof o == "string" ? o.split(/\s+/).filter(Boolean) : Array.isArray(o) ? o.filter((n) => typeof n == "string" && n.trim()) : [];
  return e.length && t.classList.add(...e), t;
}, Tt = (t) => {
  if (!t || typeof t != "object" || Array.isArray(t) || !t.tagName) return null;
  const o = yt({ inTagName: t.tagName });
  if (!o) return null;
  if (ht({
    inElement: o,
    inTextContent: ft(t.textContent),
    inTagName: t.tagName
  }), mt({
    inElement: o,
    inProperties: t.properties
  }), bt({
    inElement: o,
    inAttributes: t.attributes
  }), wt({
    inElement: o,
    inClassList: t.classList
  }), Array.isArray(t.children)) {
    const e = A(t.children);
    e.length && o.append(...e);
  }
  return o;
}, x = (t) => t == null ? null : typeof Node < "u" && t instanceof Node ? t : Array.isArray(t) ? A(t) : typeof t == "object" ? Tt(t) : typeof t == "string" || typeof t == "number" ? document.createTextNode(String(t)) : null, At = "./tags.schema.json", xt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, St = {
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
}, Dt = {
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
}, vt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, Nt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, kt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Et = {
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
}, jt = {
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
}, Gt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ft = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, It = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, $t = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ot = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Rt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Kt = {
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
}, Vt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Bt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Ht = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Lt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, Mt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, zt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, qt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Pt = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Jt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, _t = {
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
}, Ut = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, Wt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Xt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, Qt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, Zt = {
  $schema: At,
  div: xt,
  input: St,
  checkbox: Dt,
  colgroup: vt,
  col: Nt,
  label: kt,
  form: Et,
  select: jt,
  p: Gt,
  h1: Ft,
  h2: It,
  span: $t,
  img: Ot,
  button: Rt,
  table: Kt,
  thead: Vt,
  tbody: Bt,
  tfoot: Ht,
  tr: Lt,
  th: Mt,
  td: zt,
  datalist: qt,
  option: Pt,
  header: Jt,
  a: _t,
  i: Ut,
  small: Wt,
  ul: Xt,
  li: Qt,
  hr: Yt
}, C = ({ inSpec: t }) => {
  const o = t;
  if (!o) return [];
  if (Array.isArray(o))
    return o.flatMap((n) => C({ inSpec: n }));
  if (typeof o != "object") return [];
  const e = [];
  return typeof o.tagName == "string" && o.tagName.trim().length > 0 && e.push(o.tagName.toLowerCase()), Array.isArray(o.children) && o.children.length > 0 && o.children.forEach((n) => {
    const a = C({ inSpec: n });
    e.push(...a);
  }), e;
}, te = ({ inTagsFound: t, inAllowedTags: o }) => {
  const e = t ?? [], n = o ?? {}, a = new Set(
    Object.keys(n).filter((i) => i !== "$schema").map((i) => i.toLowerCase())
  ), s = {}, l = [], r = [];
  e.forEach((i) => {
    s[i] = (s[i] || 0) + 1, a.has(i) ? l.includes(i) || l.push(i) : r.includes(i) || r.push(i);
  });
  const c = e.length, d = r.length === 0;
  return {
    totalTags: c,
    tagCounts: s,
    uniqueTags: Object.keys(s),
    recognizedTags: l,
    unrecognizedTags: r,
    areAllTagsPresent: d
  };
}, ee = ({ inSpec: t, inTags: o = Zt } = {}) => {
  const e = t, n = o, a = C({ inSpec: e }), s = te({
    inTagsFound: a,
    inAllowedTags: n
  });
  return {
    areAllTagsPresent: s.areAllTagsPresent,
    totalTags: s.totalTags,
    tagCounts: s.tagCounts,
    uniqueTags: s.uniqueTags,
    recognizedTags: s.recognizedTags,
    unrecognizedTags: s.unrecognizedTags
  };
}, S = (t = {}) => {
  const o = (t == null ? void 0 : t.spec) ?? (t == null ? void 0 : t.inSpec) ?? t;
  return x(o);
};
ut({
  inFuncDefinition: S,
  inReviewSpec: ee
});
const oe = {
  tagName: "th",
  textContent: "${label}",
  attributes: {
    scope: "col"
  }
}, ne = {
  outerTemplate: {
    tagName: "tr"
  },
  innerTemplate: {
    tagName: "td",
    textContent: "${rowValue}"
  }
}, le = {
  buildHeader: oe,
  buildBody: ne
}, ae = "table", se = {
  class: "table table-hover table-striped align-middle border mb-0"
}, re = [
  {
    tagName: "thead",
    attributes: {
      class: "table-dark"
    },
    children: [
      {
        tagName: "tr",
        children: []
      }
    ]
  },
  {
    tagName: "tbody",
    children: []
  }
], ie = {
  tagName: ae,
  attributes: se,
  children: re
}, D = ({
  inTargetHtmlId: t,
  targetHtmlId: o,
  inColumns: e = [],
  inData: n = []
}) => {
  const a = t || o, s = it({
    inData: {
      columns: e,
      rows: n
    },
    inSpec: le,
    inTable: ie
  }), l = S(s);
  if (a && typeof document < "u") {
    const r = document.getElementById(a);
    r && (r.innerHTML = "", r.append(l));
  }
  return l;
}, ce = ({ inTable: t }) => {
  const o = t, e = o.store.library.activeColumns, n = o.store.library.stateData;
  return o.store.config, { render: ({ inTargetHtmlId: s, targetHtmlId: l } = {}) => {
    const r = s || l || o.containerId;
    return D({
      inTargetHtmlId: r,
      inColumns: e,
      inData: n
    });
  } };
};
class ue {
  constructor({
    inData: o,
    data: e = [],
    inColumns: n,
    columns: a,
    inConfig: s,
    config: l,
    inDataProvider: r,
    dataProvider: c = null,
    inTargetContainerId: d,
    targetContainerId: i = ""
  } = {}) {
    const u = o || e, f = r || c, y = d || i, g = n || a, p = s || l, h = Array.isArray(g) && g.length > 0 ? g : w({ inData: u }), m = {
      ...T,
      ...p
    };
    this.containerId = y, this.dataProvider = f, this.store = new lt({
      inData: u,
      inColumns: h,
      inConfig: m
    }), this.methods = ce({ inTable: this });
  }
}
const de = ({
  inTargetHtmlId: t,
  targetHtmlId: o,
  inColumns: e,
  inData: n,
  inConfig: a,
  config: s
}) => D({
  inTargetHtmlId: t || o,
  inColumns: e,
  inData: n
});
N(ue);
export {
  ue as Table,
  ue as default,
  T as defaultConfig,
  v as meta,
  de as render,
  D as renderTable
};
