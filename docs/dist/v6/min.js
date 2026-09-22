const I = {
  version: "v6.1.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, J = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: I,
    Table: n
  });
}, W = ({ inData: n = [], inColumns: e = [], inConfig: t = {}, inTopN: o } = {}) => {
  const a = n, s = e, l = t, r = o;
  return {
    originalData: Array.isArray(a) ? typeof structuredClone == "function" ? structuredClone(a) : JSON.parse(JSON.stringify(a)) : [],
    columns: Array.isArray(s) ? s : [],
    config: l || {},
    topN: r
  };
}, H = ({ inColumnsCatalog: n = [], inColumnKeys: e = [] } = {}) => {
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
}, B = ({ inData: n = [], inActiveColumns: e } = {}) => {
  const t = n;
  return Array.isArray(t) ? t == null ? void 0 : t.map((a) => {
    const s = {};
    return e == null || e.forEach((l) => {
      s[l.key] = a[l.key];
    }), s;
  }) : [];
}, K = ({
  inColumns: n = [],
  inData: e = [],
  inConfig: t = {},
  inLabel: o,
  inColGroup: a
} = {}) => {
  var A, T;
  const s = n, l = e, r = t, i = o, d = a;
  if (!!!(r != null && r.serial || (A = r == null ? void 0 : r.table) != null && A.serial || (T = r == null ? void 0 : r.head) != null && T.serial))
    return {
      columns: s,
      data: l,
      isSerialEnabled: !1,
      colGroup: d
    };
  const u = i || typeof (r == null ? void 0 : r.serial) == "object" && r.serial.label || "#", b = typeof (r == null ? void 0 : r.serial) == "object" && r.serial.width ? r.serial.width : "50px", p = typeof (r == null ? void 0 : r.serial) == "object" && r.serial.style ? r.serial.style : `width: ${b};`, m = {
    key: "serial",
    label: u,
    width: b,
    style: p
  }, f = (Array.isArray(s) ? s : []).some((y) => y.key === "serial"), h = f ? s : [m, ...Array.isArray(s) ? s : []], g = f ? d : [m, ...Array.isArray(d) ? d : []], C = (Array.isArray(l) ? l : []).map((y, $) => ({
    serial: $ + 1,
    ...y || {}
  }));
  return {
    columns: h,
    data: C,
    isSerialEnabled: !0,
    colGroup: g
  };
}, P = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, q = {
  aggregate: {
    supportedFunctions: [
      "sum",
      "count",
      "avg",
      "min",
      "max"
    ]
  }
}, D = {
  rowKeys: P,
  types: q
}, z = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  return !Array.isArray(t) || !o ? 0 : t.reduce((a, s) => {
    const l = Number(s == null ? void 0 : s[o]);
    return a + (isNaN(l) ? 0 : l);
  }, 0);
}, M = ({ inData: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.length : 0;
}, U = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = 0;
  const s = t.reduce((l, r) => {
    const i = Number(r == null ? void 0 : r[o]);
    return isNaN(i) ? l : (a++, l + i);
  }, 0);
  return a > 0 ? s / a : 0;
}, V = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = 1 / 0;
  return t.forEach((l) => {
    const r = Number(l == null ? void 0 : l[o]);
    isNaN(r) || (a = !0, r < s && (s = r));
  }), a ? s : 0;
}, _ = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let a = !1, s = -1 / 0;
  return t.forEach((l) => {
    const r = Number(l == null ? void 0 : l[o]);
    isNaN(r) || (a = !0, r > s && (s = r));
  }), a ? s : 0;
}, Q = {
  sum: z,
  count: M,
  avg: U,
  min: V,
  max: _
}, X = ({ inExpression: n = "", inScope: e = {} } = {}) => {
  const t = n, o = e;
  try {
    const a = Object.keys(o), s = Object.values(o);
    return new Function(...a, `return ${t};`)(...s);
  } catch (a) {
    return console.error(`Error evaluating expression "${t}":`, a), 0;
  }
}, Y = ({ inRowConfig: n = {}, inData: e = [], inScope: t = {} } = {}) => {
  var b, p;
  const o = n, a = e, s = t, l = D.rowKeys || {}, r = o.id ?? l.id, i = o.title ?? l.title, d = o.type ?? l.type, c = o.values ?? l.values, u = {};
  if (d === "aggregate") {
    const m = ((p = (b = D.types) == null ? void 0 : b.aggregate) == null ? void 0 : p.supportedFunctions) || [];
    Object.entries(c).forEach(([f, h]) => {
      if (!m.includes(h)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${h}" for column "${f}". Supported: [${m.join(", ")}]`
        );
        return;
      }
      const g = Q[h];
      typeof g == "function" && (u[f] = g({ inData: a, inKey: f }));
    });
  } else d === "eval" && Object.entries(c).forEach(([m, f]) => {
    typeof f == "string" && (u[m] = X({
      inExpression: f,
      inScope: s
    }));
  });
  return {
    id: r,
    title: i,
    values: u
  };
}, Z = ({ inData: n = [], inFooterConfig: e = [] } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(o)) return [];
  const a = {}, s = [];
  return o.forEach((l) => {
    const r = Y({
      inRowConfig: l,
      inData: t,
      inScope: a
    });
    l.id && (a[l.id] = r.values), s.push(r);
  }), s;
}, tt = ({ inComputedFooter: n = [], inActiveColumns: e = [] } = {}) => {
  var l, r;
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0)
    return [];
  if (!Array.isArray(o) || o.length === 0)
    return [];
  const a = ((l = o[0]) == null ? void 0 : l.key) === "serial" && o.length > 1 ? 1 : 0, s = (r = o[a]) == null ? void 0 : r.key;
  return t.map((i) => {
    const d = i.values || {}, c = {};
    return o.forEach((u) => {
      u.key in d ? c[u.key] = d[u.key] : u.key === s ? c[u.key] = i.title || i.id || "" : c[u.key] = "";
    }), c;
  });
}, et = ({ inColGroup: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.map((o) => {
    let a = { ...o };
    return "width" in o && (a.style = `width: ${o.width}`), a;
  }) : [];
}, ot = ({ inSource: n = {}, inResolveColumns: e } = {}) => {
  var c, u, b, p;
  const t = n, o = e, a = typeof o == "function" ? o({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (u = (c = t == null ? void 0 : t.config) == null ? void 0 : c.head) == null ? void 0 : u.columns
  }) : (t == null ? void 0 : t.columns) || [], s = et({ inColGroup: (b = t == null ? void 0 : t.config) == null ? void 0 : b.colgroup }), l = B({
    inData: t == null ? void 0 : t.originalData,
    inActiveColumns: a
  }), r = K({
    inColumns: a,
    inData: l,
    inConfig: t == null ? void 0 : t.config,
    inColGroup: s
  }), i = Z({
    inData: r.data,
    inFooterConfig: (p = t == null ? void 0 : t.config) == null ? void 0 : p.foot
  }), d = tt({
    inComputedFooter: i,
    inActiveColumns: r.columns
  });
  return {
    activeColumns: r.columns,
    stateData: r.data,
    computedFooter: i,
    footerData: d,
    isSerialEnabled: r.isSerialEnabled,
    colGroup: r.colGroup
  };
};
class nt {
  constructor({ inData: e = [], inColumns: t = [], inConfig: o = {} } = {}) {
    const a = e, s = t, l = o;
    this.source = W({
      inData: a,
      inColumns: s,
      inConfig: l
    }), this.library = ot({
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
const st = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, at = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, rt = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, S = ({ inArray: n = [], inFragments: e } = {}) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => k({
    inSpecJson: a,
    inFragments: o
  })).flat().filter(Boolean) : [];
}, k = ({
  inSpecJson: n,
  inFragments: e
} = {}) => {
  const t = n, o = e;
  if (st({ inSpec: t }))
    return null;
  if (at({ inSpec: t }))
    return t;
  if (rt({ inSpecJson: t }))
    return S({
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
    } = t, r = Array.isArray(a) ? a.map((i) => o && i in o ? k({
      inSpecJson: o[i],
      inFragments: o
    }) : null).flat().filter(Boolean) : [];
    return {
      ...structuredClone(l),
      children: [
        ...S({ inArray: s, inFragments: o }),
        ...r
      ]
    };
  }
  return "children" in t && Array.isArray(t.children) ? {
    ...structuredClone(t),
    children: S({
      inArray: t.children,
      inFragments: o
    })
  } : structuredClone(t);
}, lt = ({ inSkeleton: n, inFragments: e } = {}) => {
  const t = n, o = e;
  try {
    return k({
      inSpecJson: t,
      inFragments: o
    });
  } catch (a) {
    console.log("error : ", a);
  }
}, F = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, ct = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: F,
    buildSpecElement: n
  }, globalThis.ks.jsonToSpec = {
    meta: F,
    buildSpecElement: n
  });
}, it = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, dt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, ut = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, pt = ({ inArray: n = [], inShowLog: e = !1, inDataJson: t }) => {
  const o = n, a = e, s = t;
  return Array.isArray(o) ? o.map((l) => w({
    inSpecJson: l,
    inShowLog: a,
    inDataJson: s
  })).flat().filter(Boolean) : [];
}, v = (n, e) => typeof n != "string" ? n : n.replace(/\$\{([^}]+)\}/g, (t, o) => {
  const a = o.trim().split(".");
  let s = e;
  for (const l of a) {
    if (s == null)
      return "";
    s = s[l];
  }
  return s === null || typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? String(s ?? "") : s;
}), N = ({ inSpecJson: n, inData: e, inShowLog: t }) => {
  const o = structuredClone(n);
  return typeof e == "string" ? ("textContent" in o && (o.textContent === "${}" ? o.textContent = e : typeof o.textContent == "string" && (o.textContent = o.textContent.replaceAll("${}", () => e))), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([a, s]) => [
        a,
        s === "${}" ? e : typeof s == "string" ? s.replaceAll("${}", () => e) : s
      ]
    )
  ))) : "key" in e && "value" in e ? "textContent" in o && (o.textContent = v(
    o.textContent,
    e
  )) : ("textContent" in o && (o.textContent = v(
    o.textContent,
    e
  )), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([a, s]) => [
        a,
        v(s, e)
      ]
    )
  )), "children" in o && (o.children = o.children.map((a) => w({
    inSpecJson: a,
    inShowLog: t,
    inDataJson: e
  })))), o;
}, ht = ({ inTemplate: n, inDataAsArray: e }) => {
  const t = e, o = n;
  return Array.isArray(t) ? t.map((s) => {
    const l = structuredClone(o);
    return w({
      inSpecJson: l,
      inDataJson: s
    });
  }) : [];
}, bt = ({ inTemplate: n, inDataAsObject: e }) => {
  const t = e, o = n;
  if (t === null || typeof t != "object")
    return [];
  const a = [];
  for (const [s, l] of Object.entries(t)) {
    const r = structuredClone(o), i = w({
      inSpecJson: r,
      inDataJson: {
        key: s,
        value: l
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
  if (it({ inSpec: n }))
    return null;
  if (dt({ inSpec: n }))
    return n;
  if (ut({ inSpecJson: n }))
    return pt({
      inArray: n,
      inShowLog: e,
      inDataJson: t
    });
  if ("jsonToSpec" in n) {
    if (n.jsonToSpec.operation === "loopArray") {
      const a = ht({
        inTemplate: n.jsonToSpec.template,
        inDataAsArray: t[n.jsonToSpec.source]
      }), {
        jsonToSpec: s,
        ...l
      } = n, r = {
        ...l,
        children: a
      };
      return N({
        inSpecJson: r,
        inShowLog: e,
        inData: t
      });
    }
    if (n.jsonToSpec.operation === "loopObject") {
      const a = bt({
        inTemplate: n.jsonToSpec.template,
        inDataAsObject: t
      }), {
        jsonToSpec: s,
        ...l
      } = n, r = {
        ...l,
        children: a
      };
      return N({
        inSpecJson: r,
        inShowLog: e,
        inData: t
      });
    }
  }
  return N({
    inSpecJson: n,
    inShowLog: e,
    inData: t
  });
}, O = ({
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
ct(O);
const G = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, ft = (n) => {
  const e = n, t = typeof e == "function" ? e : e == null ? void 0 : e.inFuncDefinition, o = e == null ? void 0 : e.inReviewSpec;
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-tag"] = {
    meta: G,
    buildSpecElement: t,
    reviewSpec: o
  }, globalThis.ks.jsonToTag = {
    meta: G,
    buildSpecElement: t,
    reviewSpec: o
  });
}, mt = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, gt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, yt = ({ inSpec: n }) => {
  const e = n;
  return Array.isArray(e);
}, wt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => E({
    inSpec: a,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, Ct = ({ inTagName: n }) => {
  const e = n == null ? void 0 : n.toLowerCase();
  if (!e) return null;
  if (e === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(e);
}, At = ({ inElement: n, inTextContent: e, inAllowsTextContent: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, l = e, r = t, i = o, d = a;
  return !s || l === void 0 || l === null ? s : r ? (s.textContent = l, s) : (d && console.warn(`[json-to-tag v3] textContent is not allowed on <${i}>; discarded "${l}"`), s);
}, Tt = ({ inElement: n, inProperties: e }) => {
  const t = n, o = e;
  return t && o && typeof o == "object" && Object.assign(t, o), t;
}, St = ({ inElement: n, inAttributes: e }) => {
  const t = n, o = e;
  return !t || !o || typeof o != "object" || Object.entries(o).forEach(([a, s]) => {
    a === "class" ? t.className = s : typeof s == "boolean" ? s ? t.setAttribute(a, "") : t.removeAttribute(a) : s != null && t.setAttribute(a, String(s));
  }), t;
}, vt = ({ inElement: n, inClassList: e }) => {
  const t = n, o = e;
  if (!t || !o) return t;
  let a = [];
  return typeof o == "string" ? a = o.split(/\s+/).filter(Boolean) : Array.isArray(o) && (a = o.filter((s) => typeof s == "string" && s.trim().length > 0)), a.length > 0 && t.classList.add(...a), t;
}, Nt = ({ inElement: n, inChildren: e, inAllowsChildren: t = !0, inTagName: o, inShowLog: a = !1 }) => {
  const s = n, l = e, r = t, i = o, d = a;
  return !s || !Array.isArray(l) || l.length === 0 ? s : r ? (l.forEach((c) => {
    typeof Node < "u" && c instanceof Node ? s.appendChild(c) : (typeof c == "string" || typeof c == "number") && s.appendChild(document.createTextNode(String(c)));
  }), s) : (d && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${i}>; discarded ${l.length} child nodes.`), s);
}, xt = ({ inSpec: n, inClassList: e }) => {
  const t = n, o = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const a = Ct({ inTagName: t.tagName });
  return a ? (At({
    inElement: a,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), Tt({
    inElement: a,
    inProperties: t.properties
  }), St({
    inElement: a,
    inAttributes: t.attributes
  }), vt({
    inElement: a,
    inClassList: o
  }), Nt({
    inElement: a,
    inChildren: t.children,
    inTagName: t.tagName
  }), a) : null;
}, jt = ({ inChildren: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((s) => E({
    inSpec: s,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, kt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e, a = xt({ inSpec: t });
  let s = [];
  return "children" in t && (s = Array.isArray(t.children) && t.children.length > 0 ? jt({
    inChildren: t.children,
    inShowLog: o
  }) : [], a.append(...s)), a;
}, E = ({ inSpec: n, inShowLog: e = !1 } = {}) => {
  const t = n, o = e;
  return mt({ inSpec: t }) ? null : gt({ inSpec: t }) ? t : yt({ inSpec: t }) ? wt({
    inSpec: t,
    inShowLog: o
  }) : kt({
    inSpec: t,
    inShowLog: o
  });
}, Et = "./tags.schema.json", $t = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, Dt = {
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
}, Ft = {
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
}, Gt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, Ot = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, Lt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Rt = {
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
}, It = {
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
}, Jt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Wt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ht = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Bt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Kt = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, Pt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, qt = {
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
    "tr"
  ]
}, Vt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, _t = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Qt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Xt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Yt = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Zt = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, te = {
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
}, ee = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, oe = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ne = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "type"
  ],
  childTags: [
    "li"
  ]
}, se = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, ae = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, re = {
  $schema: Et,
  div: $t,
  input: Dt,
  checkbox: Ft,
  colgroup: Gt,
  col: Ot,
  label: Lt,
  form: Rt,
  select: It,
  p: Jt,
  h1: Wt,
  h2: Ht,
  span: Bt,
  img: Kt,
  button: Pt,
  table: qt,
  thead: zt,
  tbody: Mt,
  tfoot: Ut,
  tr: Vt,
  th: _t,
  td: Qt,
  datalist: Xt,
  option: Yt,
  header: Zt,
  a: te,
  i: ee,
  small: oe,
  ul: ne,
  li: se,
  hr: ae
}, j = ({ inSpec: n }) => {
  const e = n;
  if (!e) return [];
  if (Array.isArray(e))
    return e.flatMap((o) => j({ inSpec: o }));
  if (typeof e != "object") return [];
  const t = [];
  return typeof e.tagName == "string" && e.tagName.trim().length > 0 && t.push(e.tagName.toLowerCase()), Array.isArray(e.children) && e.children.length > 0 && e.children.forEach((o) => {
    const a = j({ inSpec: o });
    t.push(...a);
  }), t;
}, le = ({ inTagsFound: n, inAllowedTags: e }) => {
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
}, ce = ({ inSpec: n, inTags: e = re } = {}) => {
  const t = n, o = e, a = j({ inSpec: t }), s = le({
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
}, L = (n = {}) => {
  try {
    const e = n, t = (e == null ? void 0 : e.spec) ?? (e == null ? void 0 : e.inSpec) ?? e;
    return E({
      inSpec: t
    });
  } catch (e) {
    throw console.error("error : ", e), e;
  }
};
ft({
  inFuncDefinition: L,
  inReviewSpec: ce
});
const ie = {
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
}, de = {
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
}, ue = {
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
}, pe = {
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
}, he = {
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
}, me = {
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
}, ge = {
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
}, ye = {
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
}, we = {
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
}, x = {
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
  tableOnly: ie,
  tableResponsive: de,
  cardWithHeader: ue,
  cardWithFooter: pe,
  cardWithHeaderAndFooter: he,
  bordered: be,
  borderless: fe,
  compact: me,
  dark: ge,
  striped: ye,
  flush: we
}, Ce = {
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
}, Ae = {
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
}, Te = {
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
}, Se = {
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
}, ve = {
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
}, Ne = {
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
}, xe = {
  colGroup: Ce,
  thead: Ae,
  tbody: Te,
  tfoot: Se,
  cardHeader: ve,
  cardFooter: Ne
}, R = ({ inNode: n, inSlotName: e } = {}) => {
  const t = n, o = e;
  !t || typeof t != "object" || (Array.isArray(t.slots) && (t.slots = t.slots.filter((a) => a !== o)), Array.isArray(t.children) && t.children.forEach((a) => R({ inNode: a, inSlotName: o })));
}, je = ({
  targetHtmlId: n,
  inTargetHtmlId: e,
  inColumns: t,
  inData: o,
  inColGroup: a,
  inFooterData: s = [],
  inConfig: l = {},
  inSkeletonType: r = "default"
} = {}) => {
  var f;
  const i = e ?? n, d = t, c = o, u = a, b = s, p = l, m = r;
  try {
    let h = {};
    h.columns = d, h.data = c, h.colGroup = u, h.foot = b, h.title = (p == null ? void 0 : p.title) ?? ((f = p == null ? void 0 : p.caption) == null ? void 0 : f.text) ?? "", h.footerText = (p == null ? void 0 : p.footerText) ?? "";
    const g = x[m] ?? x.default ?? x, C = structuredClone(g);
    (!Array.isArray(b) || b.length === 0) && R({ inNode: C, inSlotName: "tfoot" });
    const A = lt({
      inSkeleton: C,
      inFragments: xe
    }), T = O({ specJson: A, dataJson: h, showLog: !0 }), y = L(T);
    document.getElementById(i).append(y);
  } catch (h) {
    console.log("error : ", h);
  }
}, ke = ({ inTable: n } = {}) => {
  const e = n, t = e.store.library.activeColumns, o = e.store.library.stateData, a = e.store.library.colGroup, s = e.store.library.footerData, l = e.store.config;
  return { render: ({ targetHtmlId: i, inTargetHtmlId: d, inSkeletonType: c } = {}) => {
    const u = d ?? i ?? (e == null ? void 0 : e.containerId);
    je({
      targetHtmlId: u,
      inColumns: t,
      inData: o,
      inColGroup: a,
      inFooterData: s,
      inConfig: l,
      inSkeletonType: c
    });
  } };
};
class Ee {
  constructor({
    data: e = [],
    columns: t = [],
    config: o = {},
    dataProvider: a = null,
    targetContainerId: s = ""
  } = {}) {
    const l = e, r = t, i = o, d = a, c = s;
    this.containerId = c, this.dataProvider = d, this.store = new nt({
      inData: l,
      inColumns: r,
      inConfig: i
    }), this.methods = ke({ inTable: this });
  }
}
J(Ee);
export {
  Ee as Table,
  Ee as default
};
