const R = {
  version: "v5.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, I = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: R,
    Table: n
  });
}, J = ({ inData: n = [], inColumns: e = [], inConfig: t = {}, inTopN: o } = {}) => {
  const a = n, s = e, r = t, l = o;
  return {
    originalData: Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [],
    columns: Array.isArray(s) ? s : [],
    config: r || {},
    topN: l
  };
}, H = ({ inColumnsCatalog: n = [], inColumnKeys: e = [] } = {}) => {
  const t = n, o = e;
  if (Array.isArray(o) && o.length > 0) {
    const a = new Map((Array.isArray(t) ? t : []).map((l) => [l.key, l])), s = [], r = [];
    for (const l of o) {
      const i = a.get(l);
      i ? r.push(i) : s.push(l);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((l) => `"${l}"`).join(", ")}] that do not exist in the columns catalog.`
    ), r;
  }
  return Array.isArray(t) ? t : [];
}, W = ({ inData: n = [], inActiveColumns: e } = {}) => {
  const t = n;
  return Array.isArray(t) ? t == null ? void 0 : t.map((a) => {
    const s = {};
    return e == null || e.forEach((r) => {
      s[r.key] = a[r.key];
    }), s;
  }) : [];
}, B = ({
  inColumns: n = [],
  inData: e = [],
  inConfig: t = {},
  inLabel: o,
  inColGroup: a
} = {}) => {
  var h, g;
  const s = n, r = e, l = t, i = o, d = a;
  if (!!!(l != null && l.serial || (h = l == null ? void 0 : l.table) != null && h.serial || (g = l == null ? void 0 : l.head) != null && g.serial))
    return {
      columns: s,
      data: r,
      isSerialEnabled: !1,
      colGroup: d
    };
  i || typeof (l == null ? void 0 : l.serial) == "object" && l.serial.label;
  const u = {
    key: "serial",
    width: "10%",
    style: "width: 5% !important;"
  }, b = (Array.isArray(s) ? s : []).some((y) => y.key === "serial"), p = b ? s : [u, ...Array.isArray(s) ? s : []], m = b ? d : [u, ...Array.isArray(d) ? d : []], f = (Array.isArray(r) ? r : []).map((y, C) => ({
    serial: C + 1,
    ...y || {}
  }));
  return {
    columns: p,
    data: f,
    isSerialEnabled: !0,
    colGroup: m
  };
}, K = {
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
}, k = {
  rowKeys: K,
  types: P
}, q = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  return !Array.isArray(t) || !o ? 0 : t.reduce((a, s) => {
    const r = Number(s == null ? void 0 : s[o]);
    return a + (isNaN(r) ? 0 : r);
  }, 0);
}, z = ({ inData: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.length : 0;
}, M = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = 0;
  const s = t.reduce((r, l) => {
    const i = Number(l == null ? void 0 : l[o]);
    return isNaN(i) ? r : (a++, r + i);
  }, 0);
  return a > 0 ? s / a : 0;
}, U = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = 1 / 0;
  return t.forEach((r) => {
    const l = Number(r == null ? void 0 : r[o]);
    isNaN(l) || (a = !0, l < s && (s = l));
  }), a ? s : 0;
}, V = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = -1 / 0;
  return t.forEach((r) => {
    const l = Number(r == null ? void 0 : r[o]);
    isNaN(l) || (a = !0, l > s && (s = l));
  }), a ? s : 0;
}, _ = {
  sum: q,
  count: z,
  avg: M,
  min: U,
  max: V
}, Q = ({ inExpression: n = "", inScope: e = {} } = {}) => {
  const t = n, o = e;
  try {
    const a = Object.keys(o), s = Object.values(o);
    return new Function(...a, `return ${t};`)(...s);
  } catch (a) {
    return console.error(`Error evaluating expression "${t}":`, a), 0;
  }
}, X = ({ inRowConfig: n = {}, inData: e = [], inScope: t = {} } = {}) => {
  var b, p;
  const o = n, a = e, s = t, r = k.rowKeys || {}, l = o.id ?? r.id, i = o.title ?? r.title, d = o.type ?? r.type, c = o.values ?? r.values, u = {};
  if (d === "aggregate") {
    const m = ((p = (b = k.types) == null ? void 0 : b.aggregate) == null ? void 0 : p.supportedFunctions) || [];
    Object.entries(c).forEach(([f, h]) => {
      if (!m.includes(h)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${h}" for column "${f}". Supported: [${m.join(", ")}]`
        );
        return;
      }
      const g = _[h];
      typeof g == "function" && (u[f] = g({ inData: a, inKey: f }));
    });
  } else d === "eval" && Object.entries(c).forEach(([m, f]) => {
    typeof f == "string" && (u[m] = Q({
      inExpression: f,
      inScope: s
    }));
  });
  return {
    id: l,
    title: i,
    values: u
  };
}, Y = ({ inData: n = [], inFooterConfig: e = [] } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(o)) return [];
  const a = {}, s = [];
  return o.forEach((r) => {
    const l = X({
      inRowConfig: r,
      inData: t,
      inScope: a
    });
    r.id && (a[r.id] = l.values), s.push(l);
  }), s;
}, Z = ({ inComputedFooter: n = [], inActiveColumns: e = [] } = {}) => {
  var r, l;
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0)
    return [];
  if (!Array.isArray(o) || o.length === 0)
    return [];
  const a = ((r = o[0]) == null ? void 0 : r.key) === "serial" && o.length > 1 ? 1 : 0, s = (l = o[a]) == null ? void 0 : l.key;
  return t.map((i) => {
    const d = i.values || {}, c = {};
    return o.forEach((u) => {
      u.key in d ? c[u.key] = d[u.key] : u.key === s ? c[u.key] = i.title || i.id || "" : c[u.key] = "";
    }), c;
  });
}, tt = ({ inColGroup: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.map((o) => {
    let a = { ...o };
    return "width" in o && (a.style = `width: ${o.width}`), a;
  }) : [];
}, et = ({ inSource: n = {}, inResolveColumns: e } = {}) => {
  var c, u, b, p;
  const t = n, o = e, a = typeof o == "function" ? o({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (u = (c = t == null ? void 0 : t.config) == null ? void 0 : c.head) == null ? void 0 : u.columns
  }) : (t == null ? void 0 : t.columns) || [], s = tt({ inColGroup: (b = t == null ? void 0 : t.config) == null ? void 0 : b.colgroup }), r = W({
    inData: t == null ? void 0 : t.originalData,
    inActiveColumns: a
  }), l = B({
    inColumns: a,
    inData: r,
    inConfig: t == null ? void 0 : t.config,
    inColGroup: s
  }), i = Y({
    inData: l.data,
    inFooterConfig: (p = t == null ? void 0 : t.config) == null ? void 0 : p.foot
  }), d = Z({
    inComputedFooter: i,
    inActiveColumns: l.columns
  });
  return {
    activeColumns: l.columns,
    stateData: l.data,
    computedFooter: i,
    footerData: d,
    isSerialEnabled: l.isSerialEnabled,
    colGroup: l.colGroup
  };
};
class ot {
  constructor({ inData: e = [], inColumns: t = [], inConfig: o = {} } = {}) {
    const a = e, s = t, r = o;
    this.source = J({
      inData: a,
      inColumns: s,
      inConfig: r
    }), this.library = et({
      inSource: this.source,
      inResolveColumns: H
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
const nt = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, st = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, at = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, A = ({ inArray: n = [], inFragments: e } = {}) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => x({
    inSpecJson: a,
    inFragments: o
  })).flat().filter(Boolean) : [];
}, x = ({
  inSpecJson: n,
  inFragments: e
} = {}) => {
  const t = n, o = e;
  if (nt({ inSpec: t }))
    return null;
  if (st({ inSpec: t }))
    return t;
  if (at({ inSpecJson: t }))
    return A({
      inArray: t,
      inFragments: o
    });
  if (typeof t != "object")
    return t;
  if ("slots" in t) {
    const {
      slots: a,
      children: s = [],
      ...r
    } = t, l = Array.isArray(a) ? a.map((i) => o && i in o ? x({
      inSpecJson: o[i],
      inFragments: o
    }) : null).flat().filter(Boolean) : [];
    return {
      ...structuredClone(r),
      children: [
        ...A({ inArray: s, inFragments: o }),
        ...l
      ]
    };
  }
  return "children" in t && Array.isArray(t.children) ? {
    ...structuredClone(t),
    children: A({
      inArray: t.children,
      inFragments: o
    })
  } : structuredClone(t);
}, rt = ({ inSkeleton: n, inFragments: e } = {}) => {
  const t = n, o = e;
  try {
    return x({
      inSpecJson: t,
      inFragments: o
    });
  } catch (a) {
    console.log("error : ", a);
  }
}, E = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, lt = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: E,
    buildSpecElement: n
  }, globalThis.ks.jsonToSpec = {
    meta: E,
    buildSpecElement: n
  });
}, ct = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, it = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, dt = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, ut = ({ inArray: n = [], inShowLog: e = !1, inDataJson: t }) => {
  const o = n, a = e, s = t;
  return Array.isArray(o) ? o.map((r) => w({
    inSpecJson: r,
    inShowLog: a,
    inDataJson: s
  })).flat().filter(Boolean) : [];
}, T = (n, e) => typeof n != "string" ? n : n.replace(/\$\{([^}]+)\}/g, (t, o) => {
  const a = o.trim().split(".");
  let s = e;
  for (const r of a) {
    if (s == null)
      return "";
    s = s[r];
  }
  return s === null || typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? String(s ?? "") : s;
}), S = ({ inSpecJson: n, inData: e, inShowLog: t }) => {
  const o = structuredClone(n);
  return typeof e == "string" ? ("textContent" in o && (o.textContent === "${}" ? o.textContent = e : typeof o.textContent == "string" && (o.textContent = o.textContent.replaceAll("${}", () => e))), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([a, s]) => [
        a,
        s === "${}" ? e : typeof s == "string" ? s.replaceAll("${}", () => e) : s
      ]
    )
  ))) : "key" in e && "value" in e ? "textContent" in o && (o.textContent = T(
    o.textContent,
    e
  )) : ("textContent" in o && (o.textContent = T(
    o.textContent,
    e
  )), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([a, s]) => [
        a,
        T(s, e)
      ]
    )
  )), "children" in o && (o.children = o.children.map((a) => w({
    inSpecJson: a,
    inShowLog: t,
    inDataJson: e
  })))), o;
}, pt = ({ inTemplate: n, inDataAsArray: e }) => {
  const t = e, o = n;
  return Array.isArray(t) ? t.map((s) => {
    const r = structuredClone(o);
    return w({
      inSpecJson: r,
      inDataJson: s
    });
  }) : [];
}, ht = ({ inTemplate: n, inDataAsObject: e }) => {
  const t = e, o = n;
  if (t === null || typeof t != "object")
    return [];
  const a = [];
  for (const [s, r] of Object.entries(t)) {
    const l = structuredClone(o), i = w({
      inSpecJson: l,
      inDataJson: {
        key: s,
        value: r
      }
    });
    a.push(i);
  }
  return a;
}, w = ({
  inSpecJson: n,
  inShowLog: e = !1,
  inDataJson: t
} = {}) => {
  if (ct({ inSpec: n }))
    return null;
  if (it({ inSpec: n }))
    return n;
  if (dt({ inSpecJson: n }))
    return ut({
      inArray: n,
      inShowLog: e,
      inDataJson: t
    });
  if ("jsonToSpec" in n) {
    if (n.jsonToSpec.operation === "loopArray") {
      const a = pt({
        inTemplate: n.jsonToSpec.template,
        inDataAsArray: t[n.jsonToSpec.source]
      }), {
        jsonToSpec: s,
        ...r
      } = n, l = {
        ...r,
        children: a
      };
      return S({
        inSpecJson: l,
        inShowLog: e,
        inData: t
      });
    }
    if (n.jsonToSpec.operation === "loopObject") {
      const a = ht({
        inTemplate: n.jsonToSpec.template,
        inDataAsObject: t
      }), {
        jsonToSpec: s,
        ...r
      } = n, l = {
        ...r,
        children: a
      };
      return S({
        inSpecJson: l,
        inShowLog: e,
        inData: t
      });
    }
  }
  return S({
    inSpecJson: n,
    inShowLog: e,
    inData: t
  });
}, D = ({
  specJson: n,
  showLog: e,
  dataJson: t
}) => {
  try {
    return w({
      inSpecJson: n,
      inShowLog: e,
      inDataJson: t
    });
  } catch (o) {
    console.log("error : ", o);
  }
};
lt(D);
const $ = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, bt = (n) => {
  const e = n, t = typeof e == "function" ? e : e == null ? void 0 : e.inFuncDefinition, o = e == null ? void 0 : e.inReviewSpec;
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-tag"] = {
    meta: $,
    buildSpecElement: t,
    reviewSpec: o
  }, globalThis.ks.jsonToTag = {
    meta: $,
    buildSpecElement: t,
    reviewSpec: o
  });
}, ft = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, mt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, gt = ({ inSpec: n }) => {
  const e = n;
  return Array.isArray(e);
}, yt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => j({
    inSpec: a,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, wt = ({ inTagName: n }) => {
  const e = n == null ? void 0 : n.toLowerCase();
  if (!e) return null;
  if (e === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(e);
}, Ct = ({ inElement: n, inTextContent: e, inAllowsTextContent: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, r = e, l = t, i = o, d = a;
  return !s || r === void 0 || r === null ? s : l ? (s.textContent = r, s) : (d && console.warn(`[json-to-tag v3] textContent is not allowed on <${i}>; discarded "${r}"`), s);
}, At = ({ inElement: n, inProperties: e }) => {
  const t = n, o = e;
  return t && o && typeof o == "object" && Object.assign(t, o), t;
}, Tt = ({ inElement: n, inAttributes: e }) => {
  const t = n, o = e;
  return !t || !o || typeof o != "object" || Object.entries(o).forEach(([a, s]) => {
    a === "class" ? t.className = s : typeof s == "boolean" ? s ? t.setAttribute(a, "") : t.removeAttribute(a) : s != null && t.setAttribute(a, String(s));
  }), t;
}, St = ({ inElement: n, inClassList: e }) => {
  const t = n, o = e;
  if (!t || !o) return t;
  let a = [];
  return typeof o == "string" ? a = o.split(/\s+/).filter(Boolean) : Array.isArray(o) && (a = o.filter((s) => typeof s == "string" && s.trim().length > 0)), a.length > 0 && t.classList.add(...a), t;
}, vt = ({ inElement: n, inChildren: e, inAllowsChildren: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, r = e, l = t, i = o, d = a;
  return !s || !Array.isArray(r) || r.length === 0 ? s : l ? (r.forEach((c) => {
    typeof Node < "u" && c instanceof Node ? s.appendChild(c) : (typeof c == "string" || typeof c == "number") && s.appendChild(document.createTextNode(String(c)));
  }), s) : (d && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${i}>; discarded ${r.length} child nodes.`), s);
}, Nt = ({ inSpec: n, inClassList: e }) => {
  const t = n, o = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const a = wt({ inTagName: t.tagName });
  return a ? (Ct({
    inElement: a,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), At({
    inElement: a,
    inProperties: t.properties
  }), Tt({
    inElement: a,
    inAttributes: t.attributes
  }), St({
    inElement: a,
    inClassList: o
  }), vt({
    inElement: a,
    inChildren: t.children,
    inTagName: t.tagName
  }), a) : null;
}, xt = ({ inChildren: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((s) => j({
    inSpec: s,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, jt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e, a = Nt({ inSpec: t });
  let s = [];
  return "children" in t && (s = Array.isArray(t.children) && t.children.length > 0 ? xt({
    inChildren: t.children,
    inShowLog: o
  }) : [], a.append(...s)), a;
}, j = ({ inSpec: n, inShowLog: e = !1 } = {}) => {
  const t = n, o = e;
  return ft({ inSpec: t }) ? null : mt({ inSpec: t }) ? t : gt({ inSpec: t }) ? yt({
    inSpec: t,
    inShowLog: o
  }) : jt({
    inSpec: t,
    inShowLog: o
  });
}, kt = "./tags.schema.json", Et = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, $t = {
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
}, Ft = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, Gt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, Ot = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Lt = {
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
}, Rt = {
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
}, It = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Jt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ht = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Wt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Bt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Kt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Pt = {
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
}, qt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, zt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Mt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Ut = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, Vt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, _t = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Qt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Xt = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, Zt = {
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
}, te = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, ee = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, oe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, ne = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, se = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, ae = {
  $schema: kt,
  div: Et,
  input: $t,
  checkbox: Dt,
  colgroup: Ft,
  col: Gt,
  label: Ot,
  form: Lt,
  select: Rt,
  p: It,
  h1: Jt,
  h2: Ht,
  span: Wt,
  img: Bt,
  button: Kt,
  table: Pt,
  thead: qt,
  tbody: zt,
  tfoot: Mt,
  tr: Ut,
  th: Vt,
  td: _t,
  datalist: Qt,
  option: Xt,
  header: Yt,
  a: Zt,
  i: te,
  small: ee,
  ul: oe,
  li: ne,
  hr: se
}, N = ({ inSpec: n }) => {
  const e = n;
  if (!e) return [];
  if (Array.isArray(e))
    return e.flatMap((o) => N({ inSpec: o }));
  if (typeof e != "object") return [];
  const t = [];
  return typeof e.tagName == "string" && e.tagName.trim().length > 0 && t.push(e.tagName.toLowerCase()), Array.isArray(e.children) && e.children.length > 0 && e.children.forEach((o) => {
    const a = N({ inSpec: o });
    t.push(...a);
  }), t;
}, re = ({ inTagsFound: n, inAllowedTags: e }) => {
  const t = n ?? [], o = e ?? {}, a = new Set(
    Object.keys(o).filter((c) => c !== "$schema").map((c) => c.toLowerCase())
  ), s = {}, r = [], l = [];
  t.forEach((c) => {
    s[c] = (s[c] || 0) + 1, a.has(c) ? r.includes(c) || r.push(c) : l.includes(c) || l.push(c);
  });
  const i = t.length, d = l.length === 0;
  return {
    totalTags: i,
    tagCounts: s,
    uniqueTags: Object.keys(s),
    recognizedTags: r,
    unrecognizedTags: l,
    areAllTagsPresent: d
  };
}, le = ({ inSpec: n, inTags: e = ae } = {}) => {
  const t = n, o = e, a = N({ inSpec: t }), s = re({
    inTagsFound: a,
    inAllowedTags: o
  });
  return {
    areAllTagsPresent: s.areAllTagsPresent,
    totalTags: s.totalTags,
    tagCounts: s.tagCounts,
    uniqueTags: s.uniqueTags,
    recognizedTags: s.recognizedTags,
    unrecognizedTags: s.unrecognizedTags
  };
}, F = (n = {}) => {
  try {
    const e = n, t = (e == null ? void 0 : e.spec) ?? (e == null ? void 0 : e.inSpec) ?? e;
    return j({
      inSpec: t
    });
  } catch (e) {
    throw console.error("error : ", e), e;
  }
};
bt({
  inFuncDefinition: F,
  inReviewSpec: le
});
const ce = {
  tagName: "table",
  attributes: {
    class: "table table-hover table-striped mb-0"
  },
  slots: [
    "colGroup",
    "thead",
    "tbody",
    "tfoot"
  ]
}, ie = {
  tagName: "div",
  attributes: {
    class: "table-responsive"
  },
  children: [
    {
      tagName: "table",
      attributes: {
        class: "table table-hover table-striped mb-0"
      },
      slots: [
        "colGroup",
        "thead",
        "tbody",
        "tfoot"
      ]
    }
  ]
}, de = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header bg-white py-3"
      },
      slots: [
        "cardHeader"
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, ue = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card-footer bg-white py-2"
      },
      slots: [
        "cardFooter"
      ]
    }
  ]
}, pe = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "card-header bg-white py-3"
      },
      slots: [
        "cardHeader"
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    },
    {
      tagName: "div",
      attributes: {
        class: "card-footer bg-white py-2"
      },
      slots: [
        "cardFooter"
      ]
    }
  ]
}, he = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-bordered table-hover mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, be = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-borderless table-hover mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, fe = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-sm table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, me = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm bg-dark text-white border-secondary"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-dark table-hover mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, ge = {
  tagName: "div",
  attributes: {
    class: "card shadow-sm"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, ye = {
  tagName: "div",
  attributes: {
    class: "card border-0 shadow-none"
  },
  children: [
    {
      tagName: "div",
      attributes: {
        class: "table-responsive"
      },
      children: [
        {
          tagName: "table",
          attributes: {
            class: "table table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody",
            "tfoot"
          ]
        }
      ]
    }
  ]
}, v = {
  default: {
    tagName: "div",
    attributes: {
      class: "card shadow-sm"
    },
    children: [
      {
        tagName: "div",
        attributes: {
          class: "table-responsive"
        },
        children: [
          {
            tagName: "table",
            attributes: {
              class: "table table-hover table-striped mb-0"
            },
            slots: [
              "colGroup",
              "thead",
              "tbody",
              "tfoot"
            ]
          }
        ]
      }
    ]
  },
  tableOnly: ce,
  tableResponsive: ie,
  cardWithHeader: de,
  cardWithFooter: ue,
  cardWithHeaderAndFooter: pe,
  bordered: he,
  borderless: be,
  compact: fe,
  dark: me,
  striped: ge,
  flush: ye
}, we = {
  tagName: "colgroup",
  jsonToSpec: {
    operation: "loopArray",
    source: "colGroup",
    template: {
      tagName: "col",
      attributes: {
        style: "${style}"
      }
    }
  },
  children: []
}, Ce = {
  tagName: "thead",
  attributes: {
    class: "table-dark"
  },
  children: [
    {
      tagName: "tr",
      jsonToSpec: {
        operation: "loopArray",
        source: "columns",
        template: {
          tagName: "th",
          textContent: "${label}"
        }
      },
      children: []
    }
  ]
}, Ae = {
  tagName: "tbody",
  attributes: {
    id: "table-body"
  },
  jsonToSpec: {
    operation: "loopArray",
    source: "data",
    template: {
      tagName: "tr",
      jsonToSpec: {
        operation: "loopObject",
        source: "data",
        template: {
          tagName: "td",
          textContent: "${value}"
        }
      },
      children: []
    }
  },
  children: []
}, Te = {
  tagName: "tfoot",
  attributes: {
    class: "table-light fw-bold"
  },
  jsonToSpec: {
    operation: "loopArray",
    source: "foot",
    template: {
      tagName: "tr",
      jsonToSpec: {
        operation: "loopObject",
        source: "foot",
        template: {
          tagName: "td",
          textContent: "${value}"
        }
      },
      children: []
    }
  },
  children: []
}, Se = {
  tagName: "div",
  attributes: {
    class: "d-flex justify-content-between align-items-center"
  },
  children: [
    {
      tagName: "h5",
      attributes: {
        class: "card-title mb-0"
      },
      textContent: "${title}"
    }
  ]
}, ve = {
  tagName: "div",
  attributes: {
    class: "d-flex justify-content-between align-items-center text-muted small"
  },
  children: [
    {
      tagName: "span",
      textContent: "${footerText}"
    }
  ]
}, Ne = {
  colGroup: we,
  thead: Ce,
  tbody: Ae,
  tfoot: Te,
  cardHeader: Se,
  cardFooter: ve
}, G = ({ inNode: n, inSlotName: e } = {}) => {
  const t = n, o = e;
  !t || typeof t != "object" || (Array.isArray(t.slots) && (t.slots = t.slots.filter((a) => a !== o)), Array.isArray(t.children) && t.children.forEach((a) => G({ inNode: a, inSlotName: o })));
}, xe = ({
  targetHtmlId: n,
  inTargetHtmlId: e,
  inColumns: t,
  inData: o,
  inColGroup: a,
  inFooterData: s = [],
  inConfig: r = {},
  inSkeletonType: l = "default"
} = {}) => {
  var f;
  const i = e ?? n, d = t, c = o, u = a, b = s, p = r, m = l;
  try {
    let h = {};
    h.columns = d, h.data = c, h.colGroup = u, h.foot = b, h.title = (p == null ? void 0 : p.title) ?? ((f = p == null ? void 0 : p.caption) == null ? void 0 : f.text) ?? "", h.footerText = (p == null ? void 0 : p.footerText) ?? "";
    const g = v[m] ?? v.default ?? v, y = structuredClone(g);
    (!Array.isArray(b) || b.length === 0) && G({ inNode: y, inSlotName: "tfoot" });
    const C = rt({
      inSkeleton: y,
      inFragments: Ne
    }), O = D({ specJson: C, dataJson: h, showLog: !0 }), L = F(O);
    document.getElementById(i).append(L);
  } catch (h) {
    console.log("error : ", h);
  }
}, je = ({ inTable: n } = {}) => {
  const e = n, t = e.store.library.activeColumns, o = e.store.library.stateData, a = e.store.library.colGroup, s = e.store.library.footerData, r = e.store.config;
  return { render: ({ targetHtmlId: i, inTargetHtmlId: d, inSkeletonType: c } = {}) => {
    const u = d ?? i ?? (e == null ? void 0 : e.containerId);
    xe({
      targetHtmlId: u,
      inColumns: t,
      inData: o,
      inColGroup: a,
      inFooterData: s,
      inConfig: r,
      inSkeletonType: c
    });
  } };
};
class ke {
  constructor({
    data: e = [],
    columns: t = [],
    config: o = {},
    dataProvider: a = null,
    targetContainerId: s = ""
  } = {}) {
    const r = e, l = t, i = o, d = a, c = s;
    this.containerId = c, this.dataProvider = d, this.store = new ot({
      inData: r,
      inColumns: l,
      inConfig: i
    }), this.methods = je({ inTable: this });
  }
}
I(ke);
export {
  ke as Table,
  ke as default
};
