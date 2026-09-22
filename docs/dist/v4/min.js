const G = {
  version: "v4.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, O = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: G,
    Table: n
  });
}, L = ({ inData: n = [], inColumns: e = [], inConfig: t = {}, inTopN: o } = {}) => {
  const a = n, s = e, l = t, r = o;
  return {
    originalData: Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [],
    columns: Array.isArray(s) ? s : [],
    config: l || {},
    topN: r
  };
}, R = ({ inColumnsCatalog: n = [], inColumnKeys: e = [] } = {}) => {
  const t = n, o = e;
  if (Array.isArray(o) && o.length > 0) {
    const a = new Map((Array.isArray(t) ? t : []).map((r) => [r.key, r])), s = [], l = [];
    for (const r of o) {
      const i = a.get(r);
      i ? l.push(i) : s.push(r);
    }
    return s.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${s.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), l;
  }
  return Array.isArray(t) ? t : [];
}, I = ({ inData: n = [], inActiveColumns: e } = {}) => {
  const t = n;
  return Array.isArray(t) ? t == null ? void 0 : t.map((a) => {
    const s = {};
    return e == null || e.forEach((l) => {
      s[l.key] = a[l.key];
    }), s;
  }) : [];
}, J = ({
  inColumns: n = [],
  inData: e = [],
  inConfig: t = {},
  inLabel: o,
  inColGroup: a
} = {}) => {
  var f, m;
  const s = n, l = e, r = t, i = o, d = a;
  if (!!!(r != null && r.serial || (f = r == null ? void 0 : r.table) != null && f.serial || (m = r == null ? void 0 : r.head) != null && m.serial))
    return {
      columns: s,
      data: l,
      isSerialEnabled: !1,
      colGroup: d
    };
  i || typeof (r == null ? void 0 : r.serial) == "object" && r.serial.label;
  const u = {
    key: "serial",
    width: "10%",
    style: "width: 5% !important;"
  }, p = (Array.isArray(s) ? s : []).some((w) => w.key === "serial"), g = p ? s : [u, ...Array.isArray(s) ? s : []], h = p ? d : [u, ...Array.isArray(d) ? d : []], b = (Array.isArray(l) ? l : []).map((w, F) => ({
    serial: F + 1,
    ...w || {}
  }));
  return {
    columns: g,
    data: b,
    isSerialEnabled: !0,
    colGroup: h
  };
}, H = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, W = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, j = {
  rowKeys: H,
  types: W
}, B = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  return !Array.isArray(t) || !o ? 0 : t.reduce((a, s) => {
    const l = Number(s == null ? void 0 : s[o]);
    return a + (isNaN(l) ? 0 : l);
  }, 0);
}, P = ({ inData: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.length : 0;
}, K = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = 0;
  const s = t.reduce((l, r) => {
    const i = Number(r == null ? void 0 : r[o]);
    return isNaN(i) ? l : (a++, l + i);
  }, 0);
  return a > 0 ? s / a : 0;
}, q = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = 1 / 0;
  return t.forEach((l) => {
    const r = Number(l == null ? void 0 : l[o]);
    isNaN(r) || (a = !0, r < s && (s = r));
  }), a ? s : 0;
}, z = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = -1 / 0;
  return t.forEach((l) => {
    const r = Number(l == null ? void 0 : l[o]);
    isNaN(r) || (a = !0, r > s && (s = r));
  }), a ? s : 0;
}, M = {
  sum: B,
  count: P,
  avg: K,
  min: q,
  max: z
}, U = ({ inExpression: n = "", inScope: e = {} } = {}) => {
  const t = n, o = e;
  try {
    const a = Object.keys(o), s = Object.values(o);
    return new Function(...a, `return ${t};`)(...s);
  } catch (a) {
    return console.error(`Error evaluating expression "${t}":`, a), 0;
  }
}, V = ({ inRowConfig: n = {}, inData: e = [], inScope: t = {} } = {}) => {
  var p, g;
  const o = n, a = e, s = t, l = j.rowKeys || {}, r = o.id ?? l.id, i = o.title ?? l.title, d = o.type ?? l.type, c = o.values ?? l.values, u = {};
  if (d === "aggregate") {
    const h = ((g = (p = j.types) == null ? void 0 : p.aggregate) == null ? void 0 : g.supportedFunctions) || [];
    Object.entries(c).forEach(([b, f]) => {
      if (!h.includes(f)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${f}" for column "${b}". Supported: [${h.join(", ")}]`
        );
        return;
      }
      const m = M[f];
      typeof m == "function" && (u[b] = m({ inData: a, inKey: b }));
    });
  } else d === "eval" && Object.entries(c).forEach(([h, b]) => {
    typeof b == "string" && (u[h] = U({
      inExpression: b,
      inScope: s
    }));
  });
  return {
    id: r,
    title: i,
    values: u
  };
}, _ = ({ inData: n = [], inFooterConfig: e = [] } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(o)) return [];
  const a = {}, s = [];
  return o.forEach((l) => {
    const r = V({
      inRowConfig: l,
      inData: t,
      inScope: a
    });
    l.id && (a[l.id] = r.values), s.push(r);
  }), s;
}, Q = ({ inColGroup: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.map((o) => {
    let a = { ...o };
    return "width" in o && (a.style = `width: ${o.width}`), a;
  }) : [];
}, X = ({ inSource: n = {}, inResolveColumns: e } = {}) => {
  var d, c, u, p;
  const t = n, o = e, a = typeof o == "function" ? o({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (c = (d = t == null ? void 0 : t.config) == null ? void 0 : d.head) == null ? void 0 : c.columns
  }) : (t == null ? void 0 : t.columns) || [], s = Q({ inColGroup: (u = t == null ? void 0 : t.config) == null ? void 0 : u.colgroup }), l = I({
    inData: t == null ? void 0 : t.originalData,
    inActiveColumns: a
  }), r = J({
    inColumns: a,
    inData: l,
    inConfig: t == null ? void 0 : t.config,
    inColGroup: s
  }), i = _({
    inData: r.data,
    inFooterConfig: (p = t == null ? void 0 : t.config) == null ? void 0 : p.foot
  });
  return {
    activeColumns: r.columns,
    stateData: r.data,
    computedFooter: i,
    isSerialEnabled: r.isSerialEnabled,
    colGroup: r.colGroup
  };
};
class Y {
  constructor({ inData: e = [], inColumns: t = [], inConfig: o = {} } = {}) {
    const a = e, s = t, l = o;
    this.source = L({
      inData: a,
      inColumns: s,
      inConfig: l
    }), this.library = X({
      inSource: this.source,
      inResolveColumns: R
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
}
const Z = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, tt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, et = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, C = ({ inArray: n = [], inFragments: e } = {}) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => N({
    inSpecJson: a,
    inFragments: o
  })).flat().filter(Boolean) : [];
}, N = ({
  inSpecJson: n,
  inFragments: e
} = {}) => {
  const t = n, o = e;
  if (Z({ inSpec: t }))
    return null;
  if (tt({ inSpec: t }))
    return t;
  if (et({ inSpecJson: t }))
    return C({
      inArray: t,
      inFragments: o
    });
  if (typeof t != "object")
    return t;
  if ("slots" in t) {
    const {
      slots: a,
      children: s = [],
      ...l
    } = t, r = Array.isArray(a) ? a.map((i) => o && i in o ? N({
      inSpecJson: o[i],
      inFragments: o
    }) : null).flat().filter(Boolean) : [];
    return {
      ...structuredClone(l),
      children: [
        ...C({ inArray: s, inFragments: o }),
        ...r
      ]
    };
  }
  return "children" in t && Array.isArray(t.children) ? {
    ...structuredClone(t),
    children: C({
      inArray: t.children,
      inFragments: o
    })
  } : structuredClone(t);
}, ot = ({ inSkeleton: n, inFragments: e } = {}) => {
  const t = n, o = e;
  try {
    return N({
      inSpecJson: t,
      inFragments: o
    });
  } catch (a) {
    console.log("error : ", a);
  }
}, E = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, nt = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: E,
    buildSpecElement: n
  }, globalThis.ks.jsonToSpec = {
    meta: E,
    buildSpecElement: n
  });
}, st = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, at = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, lt = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, rt = ({ inArray: n = [], inShowLog: e = !1, inDataJson: t }) => {
  const o = n, a = e, s = t;
  return Array.isArray(o) ? o.map((l) => y({
    inSpecJson: l,
    inShowLog: a,
    inDataJson: s
  })).flat().filter(Boolean) : [];
}, T = (n, e) => typeof n != "string" ? n : n.replace(/\$\{([^}]+)\}/g, (t, o) => {
  const a = o.trim().split(".");
  let s = e;
  for (const l of a) {
    if (s == null)
      return "";
    s = s[l];
  }
  return s === null || typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? String(s ?? "") : s;
}), A = ({ inSpecJson: n, inData: e, inShowLog: t }) => {
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
  )), "children" in o && (o.children = o.children.map((a) => y({
    inSpecJson: a,
    inShowLog: t,
    inDataJson: e
  })))), o;
}, ct = ({ inTemplate: n, inDataAsArray: e }) => {
  const t = e, o = n;
  return Array.isArray(t) ? t.map((s) => {
    const l = structuredClone(o);
    return y({
      inSpecJson: l,
      inDataJson: s
    });
  }) : [];
}, it = ({ inTemplate: n, inDataAsObject: e }) => {
  const t = e, o = n;
  if (t === null || typeof t != "object")
    return [];
  const a = [];
  for (const [s, l] of Object.entries(t)) {
    const r = structuredClone(o), i = y({
      inSpecJson: r,
      inDataJson: {
        key: s,
        value: l
      }
    });
    a.push(i);
  }
  return a;
}, y = ({
  inSpecJson: n,
  inShowLog: e = !1,
  inDataJson: t
} = {}) => {
  if (st({ inSpec: n }))
    return null;
  if (at({ inSpec: n }))
    return n;
  if (lt({ inSpecJson: n }))
    return rt({
      inArray: n,
      inShowLog: e,
      inDataJson: t
    });
  if ("jsonToSpec" in n) {
    if (n.jsonToSpec.operation === "loopArray") {
      const a = ct({
        inTemplate: n.jsonToSpec.template,
        inDataAsArray: t[n.jsonToSpec.source]
      }), {
        jsonToSpec: s,
        ...l
      } = n, r = {
        ...l,
        children: a
      };
      return A({
        inSpecJson: r,
        inShowLog: e,
        inData: t
      });
    }
    if (n.jsonToSpec.operation === "loopObject") {
      const a = it({
        inTemplate: n.jsonToSpec.template,
        inDataAsObject: t
      }), {
        jsonToSpec: s,
        ...l
      } = n, r = {
        ...l,
        children: a
      };
      return A({
        inSpecJson: r,
        inShowLog: e,
        inData: t
      });
    }
  }
  return A({
    inSpecJson: n,
    inShowLog: e,
    inData: t
  });
}, k = ({
  specJson: n,
  showLog: e,
  dataJson: t
}) => {
  try {
    return y({
      inSpecJson: n,
      inShowLog: e,
      inDataJson: t
    });
  } catch (o) {
    console.log("error : ", o);
  }
};
nt(k);
const $ = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, dt = (n) => {
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
}, ut = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, pt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, bt = ({ inSpec: n }) => {
  const e = n;
  return Array.isArray(e);
}, ht = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => x({
    inSpec: a,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, ft = ({ inTagName: n }) => {
  const e = n == null ? void 0 : n.toLowerCase();
  if (!e) return null;
  if (e === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(e);
}, gt = ({ inElement: n, inTextContent: e, inAllowsTextContent: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, l = e, r = t, i = o, d = a;
  return !s || l === void 0 || l === null ? s : r ? (s.textContent = l, s) : (d && console.warn(`[json-to-tag v3] textContent is not allowed on <${i}>; discarded "${l}"`), s);
}, mt = ({ inElement: n, inProperties: e }) => {
  const t = n, o = e;
  return t && o && typeof o == "object" && Object.assign(t, o), t;
}, yt = ({ inElement: n, inAttributes: e }) => {
  const t = n, o = e;
  return !t || !o || typeof o != "object" || Object.entries(o).forEach(([a, s]) => {
    a === "class" ? t.className = s : typeof s == "boolean" ? s ? t.setAttribute(a, "") : t.removeAttribute(a) : s != null && t.setAttribute(a, String(s));
  }), t;
}, wt = ({ inElement: n, inClassList: e }) => {
  const t = n, o = e;
  if (!t || !o) return t;
  let a = [];
  return typeof o == "string" ? a = o.split(/\s+/).filter(Boolean) : Array.isArray(o) && (a = o.filter((s) => typeof s == "string" && s.trim().length > 0)), a.length > 0 && t.classList.add(...a), t;
}, Ct = ({ inElement: n, inChildren: e, inAllowsChildren: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, l = e, r = t, i = o, d = a;
  return !s || !Array.isArray(l) || l.length === 0 ? s : r ? (l.forEach((c) => {
    typeof Node < "u" && c instanceof Node ? s.appendChild(c) : (typeof c == "string" || typeof c == "number") && s.appendChild(document.createTextNode(String(c)));
  }), s) : (d && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${i}>; discarded ${l.length} child nodes.`), s);
}, Tt = ({ inSpec: n, inClassList: e }) => {
  const t = n, o = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const a = ft({ inTagName: t.tagName });
  return a ? (gt({
    inElement: a,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), mt({
    inElement: a,
    inProperties: t.properties
  }), yt({
    inElement: a,
    inAttributes: t.attributes
  }), wt({
    inElement: a,
    inClassList: o
  }), Ct({
    inElement: a,
    inChildren: t.children,
    inTagName: t.tagName
  }), a) : null;
}, At = ({ inChildren: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((s) => x({
    inSpec: s,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, St = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e, a = Tt({ inSpec: t });
  let s = [];
  return "children" in t && (s = Array.isArray(t.children) && t.children.length > 0 ? At({
    inChildren: t.children,
    inShowLog: o
  }) : [], a.append(...s)), a;
}, x = ({ inSpec: n, inShowLog: e = !1 } = {}) => {
  const t = n, o = e;
  return ut({ inSpec: t }) ? null : pt({ inSpec: t }) ? t : bt({ inSpec: t }) ? ht({
    inSpec: t,
    inShowLog: o
  }) : St({
    inSpec: t,
    inShowLog: o
  });
}, vt = "./tags.schema.json", Nt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, xt = {
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
}, jt = {
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
}, Et = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, $t = {
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
}, Dt = {
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
}, Ft = {
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
}, Ot = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Lt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Rt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, It = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Jt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, Ht = {
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
}, Wt = {
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
}, Pt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Kt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, qt = {
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
}, Mt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Ut = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Vt = {
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
}, Qt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, Xt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Yt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, Zt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, te = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, ee = {
  $schema: vt,
  div: Nt,
  input: xt,
  checkbox: jt,
  colgroup: Et,
  col: $t,
  label: kt,
  form: Dt,
  select: Ft,
  p: Gt,
  h1: Ot,
  h2: Lt,
  span: Rt,
  img: It,
  button: Jt,
  table: Ht,
  thead: Wt,
  tbody: Bt,
  tfoot: Pt,
  tr: Kt,
  th: qt,
  td: zt,
  datalist: Mt,
  option: Ut,
  header: Vt,
  a: _t,
  i: Qt,
  small: Xt,
  ul: Yt,
  li: Zt,
  hr: te
}, v = ({ inSpec: n }) => {
  const e = n;
  if (!e) return [];
  if (Array.isArray(e))
    return e.flatMap((o) => v({ inSpec: o }));
  if (typeof e != "object") return [];
  const t = [];
  return typeof e.tagName == "string" && e.tagName.trim().length > 0 && t.push(e.tagName.toLowerCase()), Array.isArray(e.children) && e.children.length > 0 && e.children.forEach((o) => {
    const a = v({ inSpec: o });
    t.push(...a);
  }), t;
}, oe = ({ inTagsFound: n, inAllowedTags: e }) => {
  const t = n ?? [], o = e ?? {}, a = new Set(
    Object.keys(o).filter((c) => c !== "$schema").map((c) => c.toLowerCase())
  ), s = {}, l = [], r = [];
  t.forEach((c) => {
    s[c] = (s[c] || 0) + 1, a.has(c) ? l.includes(c) || l.push(c) : r.includes(c) || r.push(c);
  });
  const i = t.length, d = r.length === 0;
  return {
    totalTags: i,
    tagCounts: s,
    uniqueTags: Object.keys(s),
    recognizedTags: l,
    unrecognizedTags: r,
    areAllTagsPresent: d
  };
}, ne = ({ inSpec: n, inTags: e = ee } = {}) => {
  const t = n, o = e, a = v({ inSpec: t }), s = oe({
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
}, D = (n = {}) => {
  try {
    const e = n, t = (e == null ? void 0 : e.spec) ?? (e == null ? void 0 : e.inSpec) ?? e;
    return x({
      inSpec: t
    });
  } catch (e) {
    throw console.error("error : ", e), e;
  }
};
dt({
  inFuncDefinition: D,
  inReviewSpec: ne
});
const se = {
  tagName: "table",
  attributes: {
    class: "table table-hover table-striped mb-0"
  },
  slots: [
    "colGroup",
    "thead",
    "tbody"
  ]
}, ae = {
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
        "tbody"
      ]
    }
  ]
}, le = {
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
            "tbody"
          ]
        }
      ]
    }
  ]
}, re = {
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
            "tbody"
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
}, ce = {
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
            "tbody"
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
}, ie = {
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
            "tbody"
          ]
        }
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
            "tbody"
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
            class: "table table-sm table-hover table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody"
          ]
        }
      ]
    }
  ]
}, pe = {
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
            "tbody"
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
            class: "table table-striped mb-0"
          },
          slots: [
            "colGroup",
            "thead",
            "tbody"
          ]
        }
      ]
    }
  ]
}, he = {
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
            "tbody"
          ]
        }
      ]
    }
  ]
}, S = {
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
              "tbody"
            ]
          }
        ]
      }
    ]
  },
  tableOnly: se,
  tableResponsive: ae,
  cardWithHeader: le,
  cardWithFooter: re,
  cardWithHeaderAndFooter: ce,
  bordered: ie,
  borderless: de,
  compact: ue,
  dark: pe,
  striped: be,
  flush: he
}, fe = {
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
}, ge = {
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
}, me = {
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
}, ye = {
  tagName: "tfoot",
  attributes: {
    class: "table-light fw-bold"
  },
  children: []
}, we = {
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
}, Ce = {
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
}, Te = {
  colGroup: fe,
  thead: ge,
  tbody: me,
  tfoot: ye,
  cardHeader: we,
  cardFooter: Ce
}, Ae = ({ targetHtmlId: n, inTargetHtmlId: e, inColumns: t, inData: o, inColGroup: a, inSkeletonType: s = "default" } = {}) => {
  const l = e ?? n, r = t, i = o, d = a, c = s;
  try {
    let u = {};
    u.columns = r, u.data = i, u.colGroup = d;
    const p = S[c] ?? S.default ?? S, g = ot({
      inSkeleton: p,
      inFragments: Te
    }), h = k({ specJson: g, dataJson: u, showLog: !0 }), b = D(h);
    document.getElementById(l).append(b);
  } catch (u) {
    console.log("error : ", u);
  }
}, Se = ({ inTable: n } = {}) => {
  const e = n, t = e.store.library.activeColumns, o = e.store.library.stateData, a = e.store.library.colGroup;
  return { render: ({ targetHtmlId: l, inTargetHtmlId: r, inSkeletonType: i } = {}) => {
    const d = r ?? l ?? (e == null ? void 0 : e.containerId);
    Ae({
      targetHtmlId: d,
      inColumns: t,
      inData: o,
      inColGroup: a,
      inSkeletonType: i
    });
  } };
};
class ve {
  constructor({
    data: e = [],
    columns: t = [],
    config: o = {},
    dataProvider: a = null,
    targetContainerId: s = ""
  } = {}) {
    const l = e, r = t, i = o, d = a, c = s;
    this.containerId = c, this.dataProvider = d, this.store = new Y({
      inData: l,
      inColumns: r,
      inConfig: i
    }), this.methods = Se({ inTable: this });
  }
}
O(ve);
export {
  ve as Table,
  ve as default
};
