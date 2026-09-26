const I = {
  version: "v11.1.0",
  description: "build table from store data and render to DOM uses json-to-spec, json-to-dom under the hood"
}, K = (a) => {
  typeof globalThis > "u" || !a || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.jsonToTagTable = {
    meta: I,
    Table: a
  });
}, T = ({ inData: a = [] } = {}) => {
  const o = a;
  if (!Array.isArray(o) || o.length === 0)
    return [];
  const t = o[0];
  return !t || typeof t != "object" ? [] : Object.keys(t).map((e) => ({
    key: e,
    label: e
  }));
}, H = !0, B = [], J = {
  columns: []
}, P = [], F = {
  serial: H,
  colgroup: B,
  head: J,
  foot: P
}, W = ({ inData: a = [], inColumns: o = [], inConfig: t = {}, inTopN: e } = {}) => {
  const l = a, n = o, s = t, r = e, i = Array.isArray(l) ? typeof structuredClone == "function" ? structuredClone(l) : JSON.parse(JSON.stringify(l)) : [], u = Array.isArray(n) && n.length > 0 ? n : T({ inData: i }), c = {
    ...F,
    ...s
  };
  return {
    originalData: i,
    columns: u,
    config: c,
    topN: r
  };
}, V = ({ inColumnsCatalog: a = [], inColumnKeys: o = [] } = {}) => {
  const t = a, e = o;
  if (Array.isArray(e) && e.length > 0) {
    const l = new Map((Array.isArray(t) ? t : []).map((r) => [r.key, r])), n = [], s = [];
    for (const r of e) {
      const i = l.get(r);
      i ? s.push(i) : n.push(r);
    }
    return n.length > 0 && console.warn(
      `[json-to-dom-renderers] Warning: Config requested columns [${n.map((r) => `"${r}"`).join(", ")}] that do not exist in the columns catalog.`
    ), s;
  }
  return Array.isArray(t) ? t : [];
}, M = ({ inColGroup: a = [] } = {}) => {
  const o = a;
  return Array.isArray(o) ? o.map((e) => {
    let l = { ...e };
    return "width" in e && (l.style = `width: ${e.width}`), l;
  }) : [];
}, q = ({ inColumnsCatalog: a, inColumnKeys: o, inResolveColumns: t, inShowLog: e = !0 } = {}) => {
  const l = t;
  return typeof l == "function" ? l({
    inColumnsCatalog: a,
    inColumnKeys: o
  }) : (localSource == null ? void 0 : localSource.columns) || [];
}, z = ({
  inColumnsCatalog: a,
  inColumnKeys: o,
  inColGroup: t,
  inResolveColumns: e
} = {}) => {
  const n = q({
    inColumnsCatalog: a,
    inColumnKeys: o,
    inResolveColumns: e
  }), s = M({
    inColGroup: t
  });
  return {
    activeColumns: n,
    colGroup: s
  };
}, U = ({ inData: a = [], inActiveColumns: o } = {}) => {
  const t = a;
  return Array.isArray(t) ? t == null ? void 0 : t.map((l) => {
    const n = {};
    return o == null || o.forEach((s) => {
      n[s.key] = l[s.key];
    }), n;
  }) : [];
}, _ = ({ inConfig: a = {} } = {}) => {
  const o = a;
  return {
    key: "serial",
    label: "#",
    width: "50px",
    style: typeof (o == null ? void 0 : o.serial) == "object" && o.serial.style ? o.serial.style : "width: 50px;"
  };
}, Q = ({ inColumns: a = [], inSerialCol: o = {} } = {}) => {
  const t = a, e = o, l = Array.isArray(t) ? t : [];
  return l.some((s) => s.key === "serial") ? l : [e, ...l];
}, X = ({ inColGroup: a = [], inSerialCol: o = {} } = {}) => {
  const t = a, e = o, l = Array.isArray(t) ? t : [];
  return l.some((s) => s.key === "serial") ? l : [e, ...l];
}, Y = ({ inData: a = [] } = {}) => {
  const o = a;
  return (Array.isArray(o) ? o : []).map((e, l) => ({
    serial: l + 1,
    ...e || {}
  }));
}, Z = ({ inColumns: a = [], inData: o = [], inConfig: t = {}, inColGroup: e } = {}) => {
  const l = a, n = o, s = t, r = e;
  if (!(s != null && s.serial))
    return {
      columns: l,
      data: n,
      colGroup: r,
      isSerialEnabled: !1
    };
  const i = _({ inConfig: s }), u = Q({ inColumns: l, inSerialCol: i }), c = X({ inColGroup: r, inSerialCol: i }), d = Y({ inData: n });
  return {
    columns: u,
    data: d,
    colGroup: c,
    isSerialEnabled: !0
  };
}, tt = ({ inData: a = [], inLayout: o = {}, inConfig: t = {} } = {}) => {
  const e = a, l = o, n = t, s = U({
    inData: e,
    inActiveColumns: l.activeColumns
  }), r = Z({
    inColumns: l.activeColumns,
    inData: s,
    inConfig: n,
    inColGroup: l.colGroup
  });
  return {
    columns: r.columns,
    stateData: r.data,
    isSerialEnabled: r.isSerialEnabled,
    colGroup: r.colGroup
  };
}, et = {
  id: "",
  title: "",
  type: "aggregate",
  values: {}
}, ot = {
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
  rowKeys: et,
  types: ot
}, at = ({ inData: a = [], inKey: o } = {}) => {
  const t = a, e = o;
  return !Array.isArray(t) || !e ? 0 : t.reduce((l, n) => {
    const s = Number(n == null ? void 0 : n[e]);
    return l + (isNaN(s) ? 0 : s);
  }, 0);
}, lt = ({ inData: a = [] } = {}) => {
  const o = a;
  return Array.isArray(o) ? o.length : 0;
}, nt = ({ inData: a = [], inKey: o } = {}) => {
  const t = a, e = o;
  if (!Array.isArray(t) || t.length === 0 || !e) return 0;
  let l = 0;
  const n = t.reduce((s, r) => {
    const i = Number(r == null ? void 0 : r[e]);
    return isNaN(i) ? s : (l++, s + i);
  }, 0);
  return l > 0 ? n / l : 0;
}, st = ({ inData: a = [], inKey: o } = {}) => {
  const t = a, e = o;
  if (!Array.isArray(t) || t.length === 0 || !e) return 0;
  let l = !1, n = 1 / 0;
  return t.forEach((s) => {
    const r = Number(s == null ? void 0 : s[e]);
    isNaN(r) || (l = !0, r < n && (n = r));
  }), l ? n : 0;
}, rt = ({ inData: a = [], inKey: o } = {}) => {
  const t = a, e = o;
  if (!Array.isArray(t) || t.length === 0 || !e) return 0;
  let l = !1, n = -1 / 0;
  return t.forEach((s) => {
    const r = Number(s == null ? void 0 : s[e]);
    isNaN(r) || (l = !0, r > n && (n = r));
  }), l ? n : 0;
}, ct = {
  sum: at,
  count: lt,
  avg: nt,
  min: st,
  max: rt
}, it = ({ inExpression: a = "", inScope: o = {} } = {}) => {
  const t = a, e = o;
  try {
    const l = Object.keys(e), n = Object.values(e);
    return new Function(...l, `return ${t};`)(...n);
  } catch (l) {
    return console.error(`Error evaluating expression "${t}":`, l), 0;
  }
}, ut = ({ inRowConfig: a = {}, inData: o = [], inScope: t = {} } = {}) => {
  var p, f;
  const e = a, l = o, n = t, s = D.rowKeys || {}, r = e.id ?? s.id, i = e.title ?? s.title, u = e.type ?? s.type, c = e.values ?? s.values, d = {};
  if (u === "aggregate") {
    const m = ((f = (p = D.types) == null ? void 0 : p.aggregate) == null ? void 0 : f.supportedFunctions) || [];
    Object.entries(c).forEach(([b, y]) => {
      if (!m.includes(y)) {
        console.warn(
          `[json-to-dom-renderers] Warning: Unknown aggregate function "${y}" for column "${b}". Supported: [${m.join(", ")}]`
        );
        return;
      }
      const N = ct[y];
      typeof N == "function" && (d[b] = N({ inData: l, inKey: b }));
    });
  } else u === "eval" ? Object.entries(c).forEach(([m, b]) => {
    typeof b == "string" && (d[m] = it({
      inExpression: b,
      inScope: n
    }));
  }) : u === "input" && Object.assign(d, c || {});
  return {
    id: r,
    title: i,
    type: u,
    values: d
  };
}, dt = ({ inData: a = [], inFooterConfig: o = [] } = {}) => {
  const t = a, e = o;
  if (!Array.isArray(e)) return [];
  const l = {}, n = [];
  return e.forEach((s) => {
    const r = ut({
      inRowConfig: s,
      inData: t,
      inScope: l
    });
    s.id && (l[s.id] = r.values), n.push(r);
  }), n;
}, pt = ({ inComputedFooter: a = [], inActiveColumns: o = [] } = {}) => {
  var s, r;
  const t = a, e = o;
  if (!Array.isArray(t) || t.length === 0)
    return [];
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const l = ((s = e[0]) == null ? void 0 : s.key) === "serial" && e.length > 1 ? 1 : 0, n = (r = e[l]) == null ? void 0 : r.key;
  return t.map((i) => {
    const u = i.values || {}, c = {};
    return i.type === "input" ? (e.forEach((d) => {
      if (d.key === "serial")
        c[d.key] = "+";
      else if (d.key in u) {
        const p = u[d.key] || {}, f = {
          type: p.type || "text",
          class: p.class || "form-control form-control-sm",
          name: d.key,
          placeholder: p.placeholder || d.label || d.key
        };
        p.disabled && (f.disabled = "disabled"), c[d.key] = {
          tagName: "input",
          attributes: f
        };
      } else
        c[d.key] = "";
    }), c) : (e.forEach((d) => {
      d.key in u ? c[d.key] = u[d.key] : d.key === n ? c[d.key] = i.title || i.id || "" : c[d.key] = "";
    }), c);
  });
}, ft = ({ inData: a = [], inColumns: o = [], inFooterConfig: t = [] } = {}) => {
  const e = a, l = o, s = dt({
    inData: e,
    inFooterConfig: t
  }), r = pt({
    inComputedFooter: s,
    inActiveColumns: l
  });
  return {
    computedFooter: s,
    footerData: r
  };
}, bt = ({ inSource: a = {}, inResolveColumns: o } = {}) => {
  var r, i, u, c;
  const t = a, l = z({
    inResolveColumns: o,
    inColumnsCatalog: t == null ? void 0 : t.columns,
    inColumnKeys: (i = (r = t == null ? void 0 : t.config) == null ? void 0 : r.head) == null ? void 0 : i.columns,
    inColGroup: (u = t == null ? void 0 : t.config) == null ? void 0 : u.colgroup
  }), n = tt({
    inData: t == null ? void 0 : t.originalData,
    inLayout: l,
    inConfig: t == null ? void 0 : t.config
  }), s = ft({
    inData: n.stateData,
    inColumns: n.columns,
    inFooterConfig: (c = t == null ? void 0 : t.config) == null ? void 0 : c.foot
  });
  return {
    activeColumns: n.columns,
    stateData: n.stateData,
    colGroup: n.colGroup,
    isSerialEnabled: n.isSerialEnabled,
    computedFooter: s.computedFooter,
    footerData: s.footerData
  };
};
class ht {
  constructor({ inData: o = [], inColumns: t = [], inConfig: e = {} } = {}) {
    const l = o, n = t, s = e;
    this.source = W({
      inData: l,
      inColumns: n,
      inConfig: s
    }), this.library = bt({
      inSource: this.source,
      inResolveColumns: V
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
const mt = ({
  inColumns: a,
  inData: o,
  inColGroup: t,
  inFooterData: e = [],
  inConfig: l = {}
} = {}) => {
  var n;
  return {
    columns: a,
    data: o,
    colGroup: t,
    foot: e,
    title: (l == null ? void 0 : l.title) ?? ((n = l == null ? void 0 : l.caption) == null ? void 0 : n.text) ?? "",
    footerText: (l == null ? void 0 : l.footerText) ?? ""
  };
}, gt = ({ inSpec: a }) => {
  const o = a;
  return o == null;
}, yt = ({ inSpec: a }) => typeof Node < "u" && a instanceof Node, Ct = ({ inSpecJson: a }) => {
  const o = a;
  return Array.isArray(o);
}, C = ({
  inArray: a = [],
  inFragments: o,
  inShowLog: t = !1
} = {}) => {
  const e = a, l = o;
  return t && console.log("buildSpecArray 1 : ", e, l), Array.isArray(e) ? e.map((n) => S({
    inSpecJson: n,
    inFragments: l
  })).flat().filter(Boolean) : [];
}, S = ({
  inSpecJson: a,
  inFragments: o,
  inShowLog: t = !1
} = {}) => {
  const e = a, l = o;
  if (t && console.log("dispatchSpec : ", e, l), gt({ inSpec: e }))
    return null;
  if (yt({ inSpec: e }))
    return e;
  if (Ct({ inSpecJson: e }))
    return C({
      inArray: e,
      inFragments: l
    });
  if (typeof e != "object")
    return e;
  if ("slots" in e) {
    const {
      slots: n,
      children: s = [],
      ...r
    } = e, i = Array.isArray(n) ? n.map((u) => l && u in l ? S({
      inSpecJson: l[u],
      inFragments: l
    }) : null).flat().filter(Boolean) : [];
    return {
      ...structuredClone(r),
      children: [
        ...C({ inArray: s, inFragments: l }),
        ...i
      ]
    };
  }
  return "children" in e && Array.isArray(e.children) ? {
    ...structuredClone(e),
    children: C({
      inArray: e.children,
      inFragments: l
    })
  } : structuredClone(e);
}, wt = ({ inSkeleton: a, inFragments: o } = {}) => {
  const t = a, e = o;
  try {
    return S({
      inSpecJson: t,
      inFragments: e
    });
  } catch (l) {
    console.log("error : ", l);
  }
}, At = {
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
}, Tt = {
  tagName: "table",
  attributes: {
    class: "table table-hover table-striped mb-0"
  },
  slots: [
    "tbody"
  ]
}, St = {
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
}, vt = {
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
}, Nt = {
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
}, Dt = {
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
}, xt = {
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
}, jt = {
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
}, $t = {
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
}, Ft = {
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
}, kt = {
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
}, Et = {
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
}, Gt = {
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
}, k = {
  tableSimple: At,
  bodyOnly: Tt,
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
  tableOnly: St,
  tableResponsive: vt,
  cardWithHeader: Nt,
  cardWithFooter: Dt,
  cardWithHeaderAndFooter: xt,
  bordered: jt,
  borderless: $t,
  compact: Ft,
  dark: kt,
  striped: Et,
  flush: Gt
}, Ot = {
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
}, Lt = {
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
}, Rt = {
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
          attributes: {
            class: "tdddddd ${value}"
          },
          textContent: "${value}"
        }
      },
      children: []
    }
  },
  children: []
}, It = {
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
}, Kt = {
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
}, Ht = {
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
}, E = {
  colGroup: Ot,
  thead: Lt,
  tbody: Rt,
  tfoot: It,
  cardHeader: Kt,
  cardFooter: Ht
}, Bt = ({
  inSkeletonType: a = "default",
  inSkeletonJson: o = k,
  inFragmentsJson: t = E,
  inShowLog: e = !1
} = {}) => {
  const l = o[a] ?? o.default ?? o, n = structuredClone(l);
  e && console.log("targetSkeleton : ", n);
  const s = wt({
    inSkeleton: n,
    inFragments: t
  });
  return e && console.log("structureJson : ", s), s;
}, x = {
  version: "v24.0",
  description: "Pure spec engine no document at all"
}, Jt = (a) => {
  typeof globalThis > "u" || !a || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-spec"] = {
    meta: x,
    buildSpecElement: a
  }, globalThis.ks.jsonToSpec = {
    meta: x,
    buildSpecElement: a
  });
}, Pt = ({ inSpec: a }) => {
  const o = a;
  return o == null;
}, Wt = ({ inSpec: a }) => typeof Node < "u" && a instanceof Node, G = ({ inSpecJson: a }) => {
  const o = a;
  return Array.isArray(o);
}, Vt = ({ inArray: a = [], inShowLog: o = !1, inDataJson: t }) => {
  const e = a, l = o, n = t;
  return Array.isArray(e) ? e.map((s) => h({
    inSpecJson: s,
    inShowLog: l,
    inDataJson: n
  })).flat().filter(Boolean) : [];
}, g = ({ inTemplate: a, inData: o, inRowIndex: t }) => {
  if (Number.isFinite(t)) {
    debugger;
    console.log("vvvvvvvvvvvvvv : ", t);
    let e = Mt({ inTemplate: a, inRowIndex: t });
    return j({ inTemplate: e, inData: o });
  } else
    return j({ inTemplate: a, inData: o });
}, j = ({ inTemplate: a, inData: o }) => {
  const t = a, e = o;
  return typeof t != "string" ? t : t.replace(/\$\{([^}]+)\}/g, (l, n) => {
    const s = n.trim().split(".");
    let r = e;
    for (const i of s) {
      if (r == null) return "";
      r = r[i];
    }
    return r === null || typeof r == "string" || typeof r == "number" || typeof r == "boolean" ? String(r ?? "") : r;
  });
}, Mt = ({ inTemplate: a, inRowIndex: o }) => {
  const t = a, e = o;
  return t.replace(/\#\{([^}]+)\}/g, (l, n) => {
    const s = n.trim().split(".");
    let r = e;
    console.log("aaaaaaa : ", o, a, s);
    for (const i of s) {
      if (r == null) return "";
      r = r[i];
    }
    return r === null || typeof r == "string" || typeof r == "number" || typeof r == "boolean" ? String(r ?? "") : r;
  });
}, qt = ({ inSpec: a, inData: o, inShowLog: t }) => {
  const e = a, l = o, n = t;
  return "textContent" in e && (e.textContent = g({ inTemplate: e.textContent, inData: l })), "attributes" in e && typeof e.attributes == "object" && e.attributes && (e.attributes = Object.fromEntries(
    Object.entries(e.attributes).map(([s, r]) => [
      s,
      g({ inTemplate: r, inData: l })
    ])
  )), Array.isArray(e.children) && (e.children = e.children.map(
    (s) => h({
      inSpecJson: s,
      inShowLog: n,
      inDataJson: l
    })
  )), e;
}, zt = ({ inSpec: a, inData: o }) => {
  const t = a, e = o, l = e.value;
  return G({ inSpecJson: l }) ? (t.children = [{
    tagName: "button",
    attributes: {
      class: "btn btn-primary btn-sm"
    },
    textContent: l.length
  }], delete t.textContent, t) : typeof l == "object" && l !== null && l.tagName ? (t.children = [l], delete t.textContent, t) : ("textContent" in t && (t.textContent = g({ inTemplate: t.textContent, inData: e })), "attributes" in t && typeof t.attributes == "object" && t.attributes && (t.attributes = Object.fromEntries(
    Object.entries(t.attributes).map(([n, s]) => [
      n,
      g({ inTemplate: s, inData: e })
    ])
  )), t);
}, Ut = ({ inSpec: a, inData: o }) => {
  const t = a, e = o;
  return "textContent" in t && (t.textContent === "${}" ? t.textContent = e : typeof t.textContent == "string" && (t.textContent = t.textContent.replaceAll("${}", () => e))), "attributes" in t && typeof t.attributes == "object" && t.attributes && (t.attributes = Object.fromEntries(
    Object.entries(t.attributes).map(([l, n]) => [
      l,
      n === "${}" ? e : typeof n == "string" ? n.replaceAll("${}", () => e) : n
    ])
  )), t;
}, w = ({ inSpecJson: a, inData: o, inRowIndex: t, inShowLog: e = !1 } = {}) => {
  const l = a, n = o, s = e, r = structuredClone(l);
  return s && console.log("buildSingleElement start : ", l, n), typeof n == "string" ? Ut({ inSpec: r, inData: n }) : typeof n == "object" && n !== null && "key" in n && "value" in n ? zt({ inSpec: r, inData: n }) : qt({
    inSpec: r,
    inData: n,
    inShowLog: s
  });
}, _t = ({ inTemplate: a, inDataAsArray: o }) => {
  const t = o, e = a;
  return Array.isArray(t) ? t.map((n, s) => {
    const r = structuredClone(e);
    return h({
      inSpecJson: r,
      inDataJson: n,
      inRowIndex: s
    });
  }) : [];
}, Qt = ({ inTemplate: a, inDataAsObject: o }) => {
  const t = o, e = a;
  if (t === null || typeof t != "object")
    return [];
  const l = [];
  for (const [n, s] of Object.entries(t)) {
    const r = structuredClone(e), i = h({
      inSpecJson: r,
      inDataJson: {
        key: n,
        value: s
      }
    });
    l.push(i);
  }
  return l;
}, Xt = ({
  inSpecJson: a,
  inShowLog: o = !1,
  inDataJson: t,
  inRowIndex: e
} = {}) => {
  if (Number.isFinite(e) && ("attributes" in a ? a.attributes.rowIndex = e : a.attributes = {
    rowIndex: e
  }), a.jsonToSpec.operation === "loopArray") {
    const l = _t({
      inTemplate: a.jsonToSpec.template,
      inDataAsArray: t[a.jsonToSpec.source]
    }), {
      jsonToSpec: n,
      ...s
    } = a, r = {
      ...s,
      children: l
    };
    return w({
      inSpecJson: r,
      inShowLog: o,
      inData: t
    });
  }
  if (a.jsonToSpec.operation === "loopObject") {
    const l = Qt({
      inTemplate: a.jsonToSpec.template,
      inDataAsObject: t
    }), {
      jsonToSpec: n,
      ...s
    } = a, r = {
      ...s,
      children: l
    };
    return w({
      inSpecJson: r,
      inShowLog: o,
      inData: t
    });
  }
}, h = ({
  inSpecJson: a,
  inShowLog: o = !1,
  inDataJson: t,
  inRowIndex: e
} = {}) => Pt({ inSpec: a }) ? null : Wt({ inSpec: a }) ? a : (o && console.log("dispatchSpec 3 : ", a, t), G({ inSpecJson: a }) ? Vt({
  inArray: a,
  inShowLog: o,
  inDataJson: t
}) : "jsonToSpec" in a ? Xt({
  inSpecJson: a,
  inShowLog: o,
  inDataJson: t,
  inRowIndex: e
}) : w({
  inSpecJson: a,
  inShowLog: o,
  inRowIndex: e,
  inData: t
})), O = ({
  specJson: a,
  showLog: o = !1,
  dataJson: t
}) => {
  try {
    return o && console.log("jsonToSpec 1 : ", a), h({
      inSpecJson: a,
      inShowLog: o,
      inDataJson: t
    });
  } catch (e) {
    console.log("error : ", e);
  }
};
Jt(O);
const $ = {
  version: "v3.0",
  description: "Pure DOM engine with JSON review and tags.json catalog verification"
}, Yt = (a) => {
  const o = a, t = typeof o == "function" ? o : o == null ? void 0 : o.inFuncDefinition, e = o == null ? void 0 : o.inReviewSpec;
  typeof globalThis > "u" || !t || (globalThis.ks ?? (globalThis.ks = {}), globalThis.ks["json-to-tag"] = {
    meta: $,
    buildSpecElement: t,
    reviewSpec: e
  }, globalThis.ks.jsonToTag = {
    meta: $,
    buildSpecElement: t,
    reviewSpec: e
  });
}, Zt = ({ inSpec: a }) => {
  const o = a;
  return o == null;
}, te = ({ inSpec: a }) => typeof Node < "u" && a instanceof Node, ee = ({ inSpec: a }) => {
  const o = a;
  return Array.isArray(o);
}, oe = ({ inSpec: a, inShowLog: o = !1 }) => {
  const t = a, e = o;
  return Array.isArray(t) ? t.map((l) => v({
    inSpec: l,
    inShowLog: e
  })).flat().filter(Boolean) : [];
}, ae = ({ inTagName: a }) => {
  const o = a == null ? void 0 : a.toLowerCase();
  if (!o) return null;
  if (o === "checkbox") {
    const t = document.createElement("input");
    return t.type = "checkbox", t;
  }
  return document.createElement(o);
}, le = ({ inElement: a, inTextContent: o, inAllowsTextContent: t = !0, inTagName: e, inShowLog: l = !1 }) => {
  const n = a, s = o, r = t, i = e, u = l;
  return !n || s === void 0 || s === null ? n : r ? (n.textContent = s, n) : (u && console.warn(`[json-to-tag v3] textContent is not allowed on <${i}>; discarded "${s}"`), n);
}, ne = ({ inElement: a, inProperties: o }) => {
  const t = a, e = o;
  return t && e && typeof e == "object" && Object.assign(t, e), t;
}, se = ({ inElement: a, inAttributes: o }) => {
  const t = a, e = o;
  return !t || !e || typeof e != "object" || Object.entries(e).forEach(([l, n]) => {
    l === "class" ? t.className = n : typeof n == "boolean" ? n ? t.setAttribute(l, "") : t.removeAttribute(l) : n != null && t.setAttribute(l, String(n));
  }), t;
}, re = ({ inElement: a, inClassList: o, inShowLog: t = !1 }) => {
  const e = a, l = o, n = t;
  if (!e || !l) return e;
  let s = [];
  return typeof l == "string" ? s = l.split(/\s+/).filter(Boolean) : Array.isArray(l) && (s = l.filter((r) => typeof r == "string" && r.trim().length > 0)), s.length > 0 && e.classList.add(...s), n && console.log("------ : ", e), e;
}, ce = ({ inElement: a, inChildren: o, inAllowsChildren: t = !0, inTagName: e, inShowLog: l = !1 }) => {
  const n = a, s = o, r = t, i = e, u = l;
  return !n || !Array.isArray(s) || s.length === 0 ? n : r ? (s.forEach((c) => {
    typeof Node < "u" && c instanceof Node ? n.appendChild(c) : (typeof c == "string" || typeof c == "number") && n.appendChild(document.createTextNode(String(c)));
  }), n) : (u && console.warn(`[json-to-tag v3] Children are not allowed on void tag <${i}>; discarded ${s.length} child nodes.`), n);
}, ie = ({ inSpec: a, inClassList: o, inShowLog: t = !1 }) => {
  const e = a, l = o || (e == null ? void 0 : e.classList), n = t;
  if (!e || !e.tagName) return null;
  n && console.log("localSpec : ", e, l);
  const s = ae({ inTagName: e.tagName });
  return s ? (le({
    inElement: s,
    inTextContent: e.textContent,
    inTagName: e.tagName
  }), ne({
    inElement: s,
    inProperties: e.properties
  }), se({
    inElement: s,
    inAttributes: e.attributes
  }), n && console.log("before class List : ", s.classList), re({
    inElement: s,
    inClassList: e == null ? void 0 : e.class
  }), n && console.log("after class List : ", s.classList), ce({
    inElement: s,
    inChildren: e.children,
    inTagName: e.tagName
  }), s) : null;
}, ue = ({ inChildren: a, inShowLog: o = !1 }) => {
  const t = a, e = o;
  return Array.isArray(t) ? t.map((n) => v({
    inSpec: n,
    inShowLog: e
  })).flat().filter(Boolean) : [];
}, de = ({ inSpec: a, inShowLog: o = !1 }) => {
  const t = a, e = o, l = ie({ inSpec: t });
  let n = [];
  return "children" in t && (n = Array.isArray(t.children) && t.children.length > 0 ? ue({
    inChildren: t.children,
    inShowLog: e
  }) : [], l.append(...n)), l;
}, v = ({ inSpec: a, inShowLog: o = !1 } = {}) => {
  const t = a, e = o;
  return Zt({ inSpec: t }) ? null : te({ inSpec: t }) ? t : ee({ inSpec: t }) ? oe({
    inSpec: t,
    inShowLog: e
  }) : de({
    inSpec: t,
    inShowLog: e
  });
}, pe = "./tags.schema.json", fe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "title",
    "role"
  ],
  childTags: []
}, be = {
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
}, he = {
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
}, me = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "span"
  ],
  childTags: [
    "col"
  ]
}, ge = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "span",
    "style",
    "width"
  ]
}, ye = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "for"
  ],
  childTags: []
}, Ce = {
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
}, we = {
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
}, Ae = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Te = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Se = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, ve = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: []
}, Ne = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: [
    "src",
    "alt",
    "width",
    "height",
    "loading"
  ]
}, De = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "type",
    "disabled",
    "name",
    "value"
  ],
  childTags: []
}, xe = {
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
}, je = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, $e = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, Fe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "tr"
  ]
}, ke = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "td",
    "th"
  ]
}, Ee = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "scope",
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Ge = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "colspan",
    "rowspan"
  ],
  childTags: []
}, Oe = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [],
  childTags: [
    "option"
  ]
}, Le = {
  allowsTextContent: !0,
  allowsChildren: !1,
  allowedAttributes: [
    "value",
    "label",
    "selected",
    "disabled"
  ]
}, Re = {
  allowsTextContent: !1,
  allowsChildren: !0,
  allowedAttributes: [
    "role"
  ],
  childTags: []
}, Ie = {
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
}, Ke = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "aria-hidden"
  ],
  childTags: []
}, He = {
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
}, Je = {
  allowsTextContent: !0,
  allowsChildren: !0,
  allowedAttributes: [
    "value"
  ],
  childTags: []
}, Pe = {
  allowsTextContent: !1,
  allowsChildren: !1,
  allowedAttributes: []
}, We = {
  $schema: pe,
  div: fe,
  input: be,
  checkbox: he,
  colgroup: me,
  col: ge,
  label: ye,
  form: Ce,
  select: we,
  p: Ae,
  h1: Te,
  h2: Se,
  span: ve,
  img: Ne,
  button: De,
  table: xe,
  thead: je,
  tbody: $e,
  tfoot: Fe,
  tr: ke,
  th: Ee,
  td: Ge,
  datalist: Oe,
  option: Le,
  header: Re,
  a: Ie,
  i: Ke,
  small: He,
  ul: Be,
  li: Je,
  hr: Pe
}, A = ({ inSpec: a }) => {
  const o = a;
  if (!o) return [];
  if (Array.isArray(o))
    return o.flatMap((e) => A({ inSpec: e }));
  if (typeof o != "object") return [];
  const t = [];
  return typeof o.tagName == "string" && o.tagName.trim().length > 0 && t.push(o.tagName.toLowerCase()), Array.isArray(o.children) && o.children.length > 0 && o.children.forEach((e) => {
    const l = A({ inSpec: e });
    t.push(...l);
  }), t;
}, Ve = ({ inTagsFound: a, inAllowedTags: o }) => {
  const t = a ?? [], e = o ?? {}, l = new Set(
    Object.keys(e).filter((c) => c !== "$schema").map((c) => c.toLowerCase())
  ), n = {}, s = [], r = [];
  t.forEach((c) => {
    n[c] = (n[c] || 0) + 1, l.has(c) ? s.includes(c) || s.push(c) : r.includes(c) || r.push(c);
  });
  const i = t.length, u = r.length === 0;
  return {
    totalTags: i,
    tagCounts: n,
    uniqueTags: Object.keys(n),
    recognizedTags: s,
    unrecognizedTags: r,
    areAllTagsPresent: u
  };
}, Me = ({ inSpec: a, inTags: o = We } = {}) => {
  const t = a, e = o, l = A({ inSpec: t }), n = Ve({
    inTagsFound: l,
    inAllowedTags: e
  });
  return {
    areAllTagsPresent: n.areAllTagsPresent,
    totalTags: n.totalTags,
    tagCounts: n.tagCounts,
    uniqueTags: n.uniqueTags,
    recognizedTags: n.recognizedTags,
    unrecognizedTags: n.unrecognizedTags
  };
}, L = (a, o = !1) => {
  try {
    const t = a;
    return o && console.log("original spec : ", a), v({
      inSpec: t
    });
  } catch (t) {
    throw console.error("error : ", t), t;
  }
};
Yt({
  inFuncDefinition: L,
  inReviewSpec: Me
});
const qe = ({
  inStructureJson: a,
  inDataAsJson: o,
  inShowLog: t = !1
} = {}) => {
  const e = O({
    specJson: a,
    dataJson: o,
    showLog: t
  });
  return t && console.log("specAsJsonToDom : ", e), L(e);
}, ze = ({ inTargetHtmlId: a } = {}) => typeof a == "string" ? document.getElementById(a) : a ?? null, Ue = ({ inEvent: a, inColumns: o, inData: t } = {}) => {
  var u, c, d;
  const e = (u = a == null ? void 0 : a.target) == null ? void 0 : u.closest("button");
  if (!e) return null;
  const l = e.closest("tr"), n = e.closest("td");
  if (!l || !n) return null;
  const s = l.sectionRowIndex, r = (c = o == null ? void 0 : o[n.cellIndex]) == null ? void 0 : c.key, i = (d = t == null ? void 0 : t[s]) == null ? void 0 : d[r];
  return !Array.isArray(i) || i.length === 0 ? null : {
    parentRowIndex: s,
    childColumnKey: r,
    childTableData: i
  };
}, _e = ({ inTargetHtmlId: a, inChildColumnKey: o } = {}) => {
  const t = typeof a == "string" ? document.getElementById(a) : a;
  if (!t) return null;
  const e = `${t.id || "table"}-${o}`;
  let l = document.getElementById(e);
  return l || (l = document.createElement("div"), l.id = e, l.className = "child-table-container mt-3", t.insertAdjacentElement("afterend", l)), l;
}, Qe = ({ inChildTableContainer: a, inParentRowIndex: o } = {}) => {
  const t = a.dataset.activeRow === String(o), e = a.style.display !== "none";
  return t && e ? (a.style.display = "none", !0) : !1;
}, Xe = ({ inChildTableContainer: a, inClickedRowDetails: o } = {}) => (a.style.display = "", a.dataset.activeRow = String(o.parentRowIndex), a.dataset.fieldName = o.childColumnKey, a.innerHTML = "", a.childData = o.childTableData, a), Ye = ({ inEvent: a, inTargetHtmlId: o, inColumns: t, inData: e } = {}) => {
  const l = Ue({
    inEvent: a,
    inColumns: t,
    inData: e
  });
  if (!l) return null;
  const n = _e({
    inTargetHtmlId: o,
    inChildColumnKey: l.childColumnKey
  });
  return !n || Qe({
    inChildTableContainer: n,
    inParentRowIndex: l.parentRowIndex
  }) ? null : Xe({
    inChildTableContainer: n,
    inClickedRowDetails: l
  });
}, Ze = ({ inChildTableContainer: a, inContainer: o, inRenderFunc: t } = {}) => {
  const e = a || o, l = e == null ? void 0 : e.childData;
  t({
    inTargetHtmlId: e,
    inColumns: T({ inData: l }),
    inData: l,
    inSkeletonType: "tableOnly"
  });
}, to = ({
  inEvent: a,
  inData: o,
  inColumns: t,
  inRenderFunc: e,
  inTargetHtmlId: l
} = {}) => {
  const n = Ye({ inEvent: a, inTargetHtmlId: l, inColumns: t, inData: o });
  n && Ze({ inChildTableContainer: n, inRenderFunc: e });
}, eo = ({
  inTargetContainer: a,
  inData: o,
  inColumns: t,
  inRenderFunc: e,
  inTargetHtmlId: l
} = {}) => {
  a.addEventListener("click", (n) => {
    to({
      inEvent: n,
      inData: o,
      inColumns: t,
      inRenderFunc: e,
      inTargetHtmlId: l
    });
  });
}, R = ({
  targetHtmlId: a,
  inTargetHtmlId: o,
  inColumns: t,
  inData: e,
  inColGroup: l,
  inFooterData: n = [],
  inConfig: s = {},
  inSkeletonType: r = "default",
  inShowLog: i = !1
} = {}) => {
  const u = o ?? a;
  try {
    const c = mt({
      inColumns: t,
      inData: e,
      inColGroup: l,
      inFooterData: n,
      inConfig: s
    }), d = Bt({
      inSkeletonType: r,
      inSkeletonJson: k,
      inFragmentsJson: E,
      inShowLog: i
    }), p = qe({
      inStructureJson: d,
      inDataAsJson: c,
      inShowLog: i
    }), f = ze({
      inTargetHtmlId: u
    });
    if (!f) return;
    eo({
      inTargetContainer: f,
      inData: e,
      inColumns: t,
      inRenderFunc: R,
      inTargetHtmlId: u
    }), f.append(p);
  } catch (c) {
    console.log("error : ", c);
  }
}, oo = ({ inTable: a } = {}) => {
  const o = a, t = o.store.library.activeColumns, e = o.store.library.stateData, l = o.store.library.colGroup, n = o.store.library.footerData, s = o.store.config;
  return { render: ({ targetHtmlId: i, inTargetHtmlId: u, inSkeletonType: c } = {}) => {
    const d = u ?? i ?? (o == null ? void 0 : o.containerId);
    R({
      targetHtmlId: d,
      inColumns: t,
      inData: e,
      inColGroup: l,
      inFooterData: n,
      inConfig: s,
      inSkeletonType: c
    });
  } };
};
class ao {
  constructor({
    data: o = [],
    columns: t,
    config: e,
    dataProvider: l = null,
    targetContainerId: n = ""
  } = {}) {
    const s = o, r = l, i = n, u = Array.isArray(t) && t.length > 0 ? t : T({ inData: s }), c = {
      ...F,
      ...e
    };
    this.containerId = i, this.dataProvider = r, this.store = new ht({
      inData: s,
      inColumns: u,
      inConfig: c
    }), this.methods = oo({ inTable: this });
  }
}
K(ao);
export {
  ao as Table,
  ao as default,
  F as defaultConfig
};
