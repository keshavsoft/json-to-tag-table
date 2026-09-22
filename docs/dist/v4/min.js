const q = {
  version: "v2.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, B = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: q,
    Table: n
  });
}, I = ({ inData: n = [], inColumns: e = [], inConfig: t = {}, inTopN: o } = {}) => {
  const s = n, a = e, r = t, l = o;
  return {
    originalData: Array.isArray(s) ? typeof structuredClone == "function" ? structuredClone(s) : JSON.parse(JSON.stringify(s)) : [],
    columns: Array.isArray(a) ? a : [],
    config: r || {},
    topN: l
  };
}, j = ({ inColumnsCatalog: n = [], inColumnKeys: e = [] } = {}) => {
  const t = n, o = e;
  if (Array.isArray(o) && o.length > 0) {
    const s = new Map((Array.isArray(t) ? t : []).map((l) => [l.key, l])), a = [], r = [];
    for (const l of o) {
      const i = s.get(l);
      i ? r.push(i) : a.push(l);
    }
    return a.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${a.map((l) => `"${l}"`).join(", ")}] that do not exist in the columns catalog.`
    ), r;
  }
  return Array.isArray(t) ? t : [];
}, J = ({ inData: n = [], inActiveColumns: e } = {}) => {
  const t = n;
  return Array.isArray(t) ? t == null ? void 0 : t.map((s) => {
    const a = {};
    return e == null || e.forEach((r) => {
      a[r.key] = s[r.key];
    }), a;
  }) : [];
}, K = ({
  inColumns: n = [],
  inData: e = [],
  inConfig: t = {},
  inLabel: o,
  inColGroup: s
} = {}) => {
  var g, m;
  const a = n, r = e, l = t, i = o, u = s;
  if (!!!(l != null && l.serial || (g = l == null ? void 0 : l.table) != null && g.serial || (m = l == null ? void 0 : l.head) != null && m.serial))
    return {
      columns: a,
      data: r,
      isSerialEnabled: !1,
      colGroup: u
    };
  i || typeof (l == null ? void 0 : l.serial) == "object" && l.serial.label;
  const p = {
    key: "serial",
    width: "10%",
    style: "width: 5% !important;"
  }, d = (Array.isArray(a) ? a : []).some((C) => C.key === "serial"), h = d ? a : [p, ...Array.isArray(a) ? a : []], f = d ? u : [p, ...Array.isArray(u) ? u : []], b = (Array.isArray(r) ? r : []).map((C, R) => ({
    serial: R + 1,
    ...C || {}
  }));
  return {
    columns: h,
    data: b,
    isSerialEnabled: !0,
    colGroup: f
  };
}, W = {
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
}, D = {
  rowKeys: W,
  types: P
}, z = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  return !Array.isArray(t) || !o ? 0 : t.reduce((s, a) => {
    const r = Number(a == null ? void 0 : a[o]);
    return s + (isNaN(r) ? 0 : r);
  }, 0);
}, H = ({ inData: n = [] } = {}) => {
  const e = n;
  return Array.isArray(e) ? e.length : 0;
}, Q = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let s = 0;
  const a = t.reduce((r, l) => {
    const i = Number(l == null ? void 0 : l[o]);
    return isNaN(i) ? r : (s++, r + i);
  }, 0);
  return s > 0 ? a / s : 0;
}, M = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let s = !1, a = 1 / 0;
  return t.forEach((r) => {
    const l = Number(r == null ? void 0 : r[o]);
    isNaN(l) || (s = !0, l < a && (a = l));
  }), s ? a : 0;
}, U = ({ inData: n = [], inKey: e } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(t) || t.length === 0 || !o) return 0;
  let s = !1, a = -1 / 0;
  return t.forEach((r) => {
    const l = Number(r == null ? void 0 : r[o]);
    isNaN(l) || (s = !0, l > a && (a = l));
  }), s ? a : 0;
}, V = {
  sum: z,
  count: H,
  avg: Q,
  min: M,
  max: U
}, _ = ({ inExpression: n = "", inScope: e = {} } = {}) => {
  const t = n, o = e;
  try {
    const s = Object.keys(o), a = Object.values(o);
    return new Function(...s, `return ${t};`)(...a);
  } catch (s) {
    return console.error(`Error evaluating expression "${t}":`, s), 0;
  }
}, X = ({ inRowConfig: n = {}, inData: e = [], inScope: t = {} } = {}) => {
  var d, h;
  const o = n, s = e, a = t, r = D.rowKeys || {}, l = o.id ?? r.id, i = o.title ?? r.title, u = o.type ?? r.type, c = o.values ?? r.values, p = {};
  if (u === "aggregate") {
    const f = ((h = (d = D.types) == null ? void 0 : d.aggregate) == null ? void 0 : h.supportedFunctions) || [];
    Object.entries(c).forEach(([b, g]) => {
      if (!f.includes(g)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${g}" for column "${b}". Supported: [${f.join(", ")}]`
        );
        return;
      }
      const m = V[g];
      typeof m == "function" && (p[b] = m({ inData: s, inKey: b }));
    });
  } else u === "eval" && Object.entries(c).forEach(([f, b]) => {
    typeof b == "string" && (p[f] = _({
      inExpression: b,
      inScope: a
    }));
  });
  return {
    id: l,
    title: i,
    values: p
  };
}, O = ({ inData: n = [], inFooterConfig: e = [] } = {}) => {
  const t = n, o = e;
  if (!Array.isArray(o)) return [];
  const s = {}, a = [];
  return o.forEach((r) => {
    const l = X({
      inRowConfig: r,
      inData: t,
      inScope: s
    });
    r.id && (s[r.id] = l.values), a.push(l);
  }), a;
}, Y = ({ inColGroup: n }) => n.map((t) => {
  let o = { ...t };
  return "width" in t && (o.style = `width: ${t.width}`), o;
}), E = ({ inSource: n = {}, inResolveColumns: e } = {}) => {
  var u, c, p, d;
  const t = n, o = e, s = typeof o == "function" ? o({
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (c = (u = t == null ? void 0 : t.config) == null ? void 0 : u.head) == null ? void 0 : c.columns
  }) : (t == null ? void 0 : t.columns) || [], a = Y({ inColGroup: (p = t == null ? void 0 : t.config) == null ? void 0 : p.colgroup }), r = J({
    inData: t == null ? void 0 : t.originalData,
    inActiveColumns: s
  }), l = K({
    inColumns: s,
    inData: r,
    inConfig: t == null ? void 0 : t.config,
    inColGroup: a
  }), i = O({
    inData: l.data,
    inFooterConfig: (d = t == null ? void 0 : t.config) == null ? void 0 : d.foot
  });
  return {
    activeColumns: l.columns,
    stateData: l.data,
    computedFooter: i,
    isSerialEnabled: l.isSerialEnabled,
    colGroup: l.colGroup
  };
}, Z = ({ inQuery: n = "", inActiveColumns: e = [] } = {}) => {
  const t = n, o = e, s = new Set(
    (Array.isArray(o) ? o : []).map((a) => typeof a == "object" && a !== null ? a.key : a).filter(Boolean)
  );
  if (typeof t == "object" && t !== null) {
    if (t.type === "string")
      return {
        type: "string",
        value: String(t.value ?? "").trim().toLowerCase()
      };
    const a = t.type === "object" && typeof t.value == "object" && t.value !== null ? t.value : t, r = {};
    for (const [l, i] of Object.entries(a))
      if (s.has(l) && i !== void 0 && i !== null) {
        const u = String(i).trim().toLowerCase();
        u !== "" && (r[l] = u);
      }
    return {
      type: "object",
      value: r
    };
  }
  return {
    type: "string",
    value: String(t ?? "").trim().toLowerCase()
  };
}, tt = ({ inData: n = [], inQueryObject: e = {}, inActiveColumns: t = [] } = {}) => {
  const o = n, s = e, a = t;
  if (!Array.isArray(o)) return [];
  const r = s == null ? void 0 : s.type, l = s == null ? void 0 : s.value, i = Array.isArray(a) && a.length > 0 ? a.map((c) => typeof c == "object" && c !== null ? c.key : c).filter(Boolean) : null;
  if (r === "object") {
    const p = Object.entries(typeof l == "object" && l !== null ? l : {});
    return p.length === 0 ? [...o] : o.filter((d) => !d || typeof d != "object" ? !1 : p.every(([h, f]) => {
      const b = d[h];
      return b == null ? !1 : String(b).toLowerCase().includes(f);
    }));
  }
  const u = typeof l == "string" ? l : String(s ?? "").trim().toLowerCase();
  return u ? o.filter((c) => !c || typeof c != "object" ? !1 : (i ? i.map((d) => c[d]) : Object.values(c)).some((d) => d == null ? !1 : String(d).toLowerCase().includes(u))) : [...o];
}, et = ({ inData: n = [], inIsEnabled: e = !1 } = {}) => {
  const t = n;
  return !e || !Array.isArray(t) ? t : t.map((s, a) => ({
    ...s,
    serial: a + 1
  }));
}, $ = ({ inStore: n, inData: e = [], inQuery: t = "" } = {}) => {
  var h;
  const o = n, s = e, a = t, r = o.library.activeColumns, l = o.library.isSerialEnabled, i = (h = o.source.config) == null ? void 0 : h.foot, u = Z({
    inQuery: a,
    inActiveColumns: r
  }), c = tt({
    inData: s,
    inQueryObject: u,
    inActiveColumns: r
  }), p = et({
    inData: c,
    inIsEnabled: l
  }), d = O({
    inData: p,
    inFooterConfig: i
  });
  return o.library.stateData = p, o.library.computedFooter = d, {
    activeColumns: o.library.activeColumns,
    stateData: o.library.stateData,
    computedFooter: o.library.computedFooter
  };
};
class ot {
  constructor({ inData: e = [], inColumns: t = [], inConfig: o = {} } = {}) {
    const s = e, a = t, r = o;
    this.source = I({
      inData: s,
      inColumns: a,
      inConfig: r
    }), this.library = E({
      inSource: this.source,
      inResolveColumns: j
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
  updateData({ inData: e = [] } = {}) {
    const t = e;
    return this.source.originalData = Array.isArray(t) ? t : [], this.library = E({
      inSource: this.source,
      inResolveColumns: j
    }), this.library.stateData;
  }
  filterOriginalData({ inQuery: e = "" } = {}) {
    const t = e;
    return $({
      inStore: this,
      inData: this.source.originalData,
      inQuery: t
    });
  }
  filterStateData({ inQuery: e = "" } = {}) {
    const t = e;
    return $({
      inStore: this,
      inData: this.library.stateData,
      inQuery: t
    });
  }
  filter({ inQuery: e = "" } = {}) {
    const t = e;
    return this.filterOriginalData({ inQuery: t });
  }
}
const nt = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, at = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, st = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, w = ({ inArray: n = [], inFragments: e } = {}) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((s) => N({
    inSpecJson: s,
    inFragments: o
  })).flat().filter(Boolean) : [];
}, N = ({
  inSpecJson: n,
  inFragments: e
} = {}) => {
  const t = n, o = e;
  if (nt({ inSpec: t }))
    return null;
  if (at({ inSpec: t }))
    return t;
  if (st({ inSpecJson: t }))
    return w({
      inArray: t,
      inFragments: o
    });
  if (typeof t != "object")
    return t;
  if ("slots" in t) {
    const {
      slots: s,
      children: a = [],
      ...r
    } = t, l = Array.isArray(s) ? s.map((i) => o && i in o ? N({
      inSpecJson: o[i],
      inFragments: o
    }) : null).flat().filter(Boolean) : [];
    return {
      ...structuredClone(r),
      children: [
        ...w({ inArray: a, inFragments: o }),
        ...l
      ]
    };
  }
  return "children" in t && Array.isArray(t.children) ? {
    ...structuredClone(t),
    children: w({
      inArray: t.children,
      inFragments: o
    })
  } : structuredClone(t);
}, rt = ({ inSkeleton: n, inFragments: e } = {}) => {
  const t = n, o = e;
  try {
    return N({
      inSpecJson: t,
      inFragments: o
    });
  } catch (s) {
    console.log("error : ", s);
  }
}, k = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, lt = (n) => {
  typeof globalThis > "u" || !n || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: k,
    buildSpecElement: n
  }, globalThis.ks.jsonToSpec = {
    meta: k,
    buildSpecElement: n
  });
}, ct = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, it = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, ut = ({ inSpecJson: n }) => {
  const e = n;
  return Array.isArray(e);
}, dt = ({ inArray: n = [], inShowLog: e = !1, inDataJson: t }) => {
  const o = n, s = e, a = t;
  return Array.isArray(o) ? o.map((r) => y({
    inSpecJson: r,
    inShowLog: s,
    inDataJson: a
  })).flat().filter(Boolean) : [];
}, A = (n, e) => typeof n != "string" ? n : n.replace(/\$\{([^}]+)\}/g, (t, o) => {
  const s = o.trim().split(".");
  let a = e;
  for (const r of s) {
    if (a == null)
      return "";
    a = a[r];
  }
  return a === null || typeof a == "string" || typeof a == "number" || typeof a == "boolean" ? String(a ?? "") : a;
}), T = ({ inSpecJson: n, inData: e, inShowLog: t }) => {
  const o = structuredClone(n);
  return typeof e == "string" ? ("textContent" in o && (o.textContent === "${}" ? o.textContent = e : typeof o.textContent == "string" && (o.textContent = o.textContent.replaceAll("${}", () => e))), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([s, a]) => [
        s,
        a === "${}" ? e : typeof a == "string" ? a.replaceAll("${}", () => e) : a
      ]
    )
  ))) : "key" in e && "value" in e ? "textContent" in o && (o.textContent = A(
    o.textContent,
    e
  )) : ("textContent" in o && (o.textContent = A(
    o.textContent,
    e
  )), "attributes" in o && (o.attributes = Object.fromEntries(
    Object.entries(o.attributes).map(
      ([s, a]) => [
        s,
        A(a, e)
      ]
    )
  )), "children" in o && (o.children = o.children.map((s) => y({
    inSpecJson: s,
    inShowLog: t,
    inDataJson: e
  })))), o;
}, pt = ({ inTemplate: n, inDataAsArray: e }) => {
  const t = e, o = n;
  return Array.isArray(t) ? t.map((a) => {
    const r = structuredClone(o);
    return y({
      inSpecJson: r,
      inDataJson: a
    });
  }) : [];
}, bt = ({ inTemplate: n, inDataAsObject: e }) => {
  const t = e, o = n;
  if (t === null || typeof t != "object")
    return [];
  const s = [];
  for (const [a, r] of Object.entries(t)) {
    const l = structuredClone(o), i = y({
      inSpecJson: l,
      inDataJson: {
        key: a,
        value: r
      }
    });
    s.push(i);
  }
  return s;
}, y = ({
  inSpecJson: n,
  inShowLog: e = !1,
  inDataJson: t
} = {}) => {
  if (ct({ inSpec: n }))
    return null;
  if (it({ inSpec: n }))
    return n;
  if (ut({ inSpecJson: n }))
    return dt({
      inArray: n,
      inShowLog: e,
      inDataJson: t
    });
  if ("jsonToSpec" in n) {
    if (n.jsonToSpec.operation === "loopArray") {
      const s = pt({
        inTemplate: n.jsonToSpec.template,
        inDataAsArray: t[n.jsonToSpec.source]
      }), {
        jsonToSpec: a,
        ...r
      } = n, l = {
        ...r,
        children: s
      };
      return T({
        inSpecJson: l,
        inShowLog: e,
        inData: t
      });
    }
    if (n.jsonToSpec.operation === "loopObject") {
      const s = bt({
        inTemplate: n.jsonToSpec.template,
        inDataAsObject: t
      }), {
        jsonToSpec: a,
        ...r
      } = n, l = {
        ...r,
        children: s
      };
      return T({
        inSpecJson: l,
        inShowLog: e,
        inData: t
      });
    }
  }
  return T({
    inSpecJson: n,
    inShowLog: e,
    inData: t
  });
}, G = ({
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
lt(G);
const F = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, ht = (n) => {
  const e = n, t = typeof e == "function" ? e : e == null ? void 0 : e.inFuncDefinition, o = e == null ? void 0 : e.inReviewSpec;
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-tag"] = {
    meta: F,
    buildSpecElement: t,
    reviewSpec: o
  }, globalThis.ks.jsonToTag = {
    meta: F,
    buildSpecElement: t,
    reviewSpec: o
  });
}, ft = ({ inSpec: n }) => {
  const e = n;
  return e == null;
}, gt = ({ inSpec: n }) => typeof Node < "u" && n instanceof Node, mt = ({ inSpec: n }) => {
  const e = n;
  return Array.isArray(e);
}, yt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((s) => x({
    inSpec: s,
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
}, wt = ({ inElement: n, inTextContent: e, inAllowsTextContent: t = !0, inTagName: o, inShowLog: s = !1 }) => {
  const a = n, r = e, l = t, i = o, u = s;
  return !a || r === void 0 || r === null ? a : l ? (a.textContent = r, a) : (u && console.warn(`[json-to-tag v3] textContent is not allowed on <${i}>; discarded "${r}"`), a);
}, At = ({ inElement: n, inProperties: e }) => {
  const t = n, o = e;
  return t && o && typeof o == "object" && Object.assign(t, o), t;
}, Tt = ({ inElement: n, inAttributes: e }) => {
  const t = n, o = e;
  return !t || !o || typeof o != "object" || Object.entries(o).forEach(([s, a]) => {
    s === "class" ? t.className = a : typeof a == "boolean" ? a ? t.setAttribute(s, "") : t.removeAttribute(s) : a != null && t.setAttribute(s, String(a));
  }), t;
}, vt = ({ inElement: n, inClassList: e }) => {
  const t = n, o = e;
  if (!t || !o) return t;
  let s = [];
  return typeof o == "string" ? s = o.split(/\s+/).filter(Boolean) : Array.isArray(o) && (s = o.filter((a) => typeof a == "string" && a.trim().length > 0)), s.length > 0 && t.classList.add(...s), t;
}, St = ({ inElement: n, inChildren: e, inAllowsChildren: t = !0, inTagName: o, inShowLog: s = !1 }) => {
  const a = n, r = e, l = t, i = o, u = s;
  return !a || !Array.isArray(r) || r.length === 0 ? a : l ? (r.forEach((c) => {
    typeof Node < "u" && c instanceof Node ? a.appendChild(c) : (typeof c == "string" || typeof c == "number") && a.appendChild(document.createTextNode(String(c)));
  }), a) : (u && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${i}>; discarded ${r.length} child nodes.`), a);
}, Nt = ({ inSpec: n, inClassList: e }) => {
  const t = n, o = e || (t == null ? void 0 : t.classList);
  if (!t || !t.tagName) return null;
  const s = Ct({ inTagName: t.tagName });
  return s ? (wt({
    inElement: s,
    inTextContent: t.textContent,
    inTagName: t.tagName
  }), At({
    inElement: s,
    inProperties: t.properties
  }), Tt({
    inElement: s,
    inAttributes: t.attributes
  }), vt({
    inElement: s,
    inClassList: o
  }), St({
    inElement: s,
    inChildren: t.children,
    inTagName: t.tagName
  }), s) : null;
}, xt = ({ inChildren: n, inShowLog: e = !1 }) => {
  const t = n, o = e;
  return Array.isArray(t) ? t.map((a) => x({
    inSpec: a,
    inShowLog: o
  })).flat().filter(Boolean) : [];
}, jt = ({ inSpec: n, inShowLog: e = !1 }) => {
  const t = n, o = e, s = Nt({ inSpec: t });
  let a = [];
  return "children" in t && (a = Array.isArray(t.children) && t.children.length > 0 ? xt({
    inChildren: t.children,
    inShowLog: o
  }) : [], s.append(...a)), s;
}, x = ({ inSpec: n, inShowLog: e = !1 } = {}) => {
  const t = n, o = e;
  return ft({ inSpec: t }) ? null : gt({ inSpec: t }) ? t : mt({ inSpec: t }) ? yt({
    inSpec: t,
    inShowLog: o
  }) : jt({
    inSpec: t,
    inShowLog: o
  });
}, Dt = "./tags.schema.json", Et = {
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
}, kt = {
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
}, Ot = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, Gt = {
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
}, qt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Bt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
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
}, Wt = {
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
}, zt = {
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
}, Qt = {
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
    "td",
    "th"
  ]
}, Ut = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Vt = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, _t = {
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
}, ae = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, se = {
  $schema: Dt,
  div: Et,
  input: $t,
  checkbox: kt,
  colgroup: Ft,
  col: Ot,
  label: Gt,
  form: Lt,
  select: Rt,
  p: qt,
  h1: Bt,
  h2: It,
  span: Jt,
  img: Kt,
  button: Wt,
  table: Pt,
  thead: zt,
  tbody: Ht,
  tfoot: Qt,
  tr: Mt,
  th: Ut,
  td: Vt,
  datalist: _t,
  option: Xt,
  header: Yt,
  a: Zt,
  i: te,
  small: ee,
  ul: oe,
  li: ne,
  hr: ae
}, S = ({ inSpec: n }) => {
  const e = n;
  if (!e) return [];
  if (Array.isArray(e))
    return e.flatMap((o) => S({ inSpec: o }));
  if (typeof e != "object") return [];
  const t = [];
  return typeof e.tagName == "string" && e.tagName.trim().length > 0 && t.push(e.tagName.toLowerCase()), Array.isArray(e.children) && e.children.length > 0 && e.children.forEach((o) => {
    const s = S({ inSpec: o });
    t.push(...s);
  }), t;
}, re = ({ inTagsFound: n, inAllowedTags: e }) => {
  const t = n ?? [], o = e ?? {}, s = new Set(
    Object.keys(o).filter((c) => c !== "$schema").map((c) => c.toLowerCase())
  ), a = {}, r = [], l = [];
  t.forEach((c) => {
    a[c] = (a[c] || 0) + 1, s.has(c) ? r.includes(c) || r.push(c) : l.includes(c) || l.push(c);
  });
  const i = t.length, u = l.length === 0;
  return {
    totalTags: i,
    tagCounts: a,
    uniqueTags: Object.keys(a),
    recognizedTags: r,
    unrecognizedTags: l,
    areAllTagsPresent: u
  };
}, le = ({ inSpec: n, inTags: e = se } = {}) => {
  const t = n, o = e, s = S({ inSpec: t }), a = re({
    inTagsFound: s,
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
}, L = (n = {}) => {
  try {
    const e = n, t = (e == null ? void 0 : e.spec) ?? (e == null ? void 0 : e.inSpec) ?? e;
    return x({
      inSpec: t
    });
  } catch (e) {
    throw console.error("error : ", e), e;
  }
};
ht({
  inFuncDefinition: L,
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
    "tbody"
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
        "tbody"
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
            "tbody"
          ]
        }
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
            "tbody"
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
            "tbody"
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
            "tbody"
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
              "tbody"
            ]
          }
        ]
      }
    ]
  },
  tableOnly: ce,
  tableResponsive: ie,
  cardWithHeader: ue,
  cardWithFooter: de,
  cardWithHeaderAndFooter: pe,
  bordered: be,
  borderless: he,
  compact: fe,
  dark: ge,
  striped: me,
  flush: ye
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
}, we = {
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
}, Se = {
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
  colGroup: Ce,
  thead: we,
  tbody: Ae,
  tfoot: Te,
  cardHeader: ve,
  cardFooter: Se
}, xe = ({ targetHtmlId: n, inColumns: e, inData: t, inColGroup: o, inSkeletonType: s = "default" } = {}) => {
  const a = n, r = e, l = t, i = o, u = s;
  try {
    let c = {};
    c.columns = r, c.data = l, c.colGroup = i;
    const p = v[u] ?? v.default ?? v, d = rt({
      inSkeleton: p,
      inFragments: Ne
    }), h = G({ specJson: d, dataJson: c, showLog: !0 }), f = L(h);
    document.getElementById(a).append(f);
  } catch (c) {
    console.log("error : ", c);
  }
}, je = ({ inTable: n } = {}) => {
  const e = n, t = e.store.library.activeColumns, o = e.store.library.stateData, s = e.store.library.colGroup;
  return { render: ({ targetHtmlId: r, inSkeletonType: l } = {}) => {
    xe({
      targetHtmlId: r,
      inColumns: t,
      inData: o,
      inColGroup: s,
      inSkeletonType: l
    });
  } };
};
class De {
  constructor({
    data: e = [],
    columns: t = [],
    config: o = {},
    dataProvider: s = null,
    targetContainerId: a = ""
  } = {}) {
    const r = e, l = t, i = o, u = s, c = a;
    this.containerId = c, this.dataProvider = u, this.store = new ot({
      inData: r,
      inColumns: l,
      inConfig: i
    }), this.methods = je({ inTable: this });
  }
}
B(De);
export {
  De as Table,
  De as default
};
