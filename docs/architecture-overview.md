# Simple Architecture Story

This repo is not just a table project. The real story is a JSON-driven UI stack.

> Convert JSON into a spec, turn that spec into DOM structure, and then mount the result into the browser.

This table repo is one specialized product built on top of that system. The central idea is not a table alone; it is the renderer architecture that makes the table possible.

---

## The big picture

The flow is simple:

1. Raw business data comes in
2. Some repo transforms or normalizes that data into structured JSON
3. A spec-building repo creates a UI blueprint
4. A DOM renderer turns that blueprint into actual HTML elements
5. This repo creates the table-specific version of that flow

In other words:

Data -> JSON structure -> UI spec -> DOM -> browser view

The key architectural boundary is this:

> `json-renderers` does not directly attach itself to the browser DOM. It orchestrates the flow, asks `json-renderers-build` for a JSON specification, and then delegates the actual DOM creation to `@keshavsoft/json-to-tag`.

That is the reason complex or hybrid components such as a table, a select box, a data list, or a nested form can be described as JSON and still become real browser elements without hardcoded DOM code in the runtime layer.

---

## Where this repo fits

This repo, `json-to-tag-table`, is the table-focused product layer.

It is responsible for:

- taking input data
- accepting columns and config
- building a table store/state
- calculating footer totals and aggregate values
- rendering a table in the browser

It does not try to do everything from scratch. It depends on lower-level repos that already know how to generate dynamic DOM from JSON.

---

## The ecosystem around it

In the same working folder, there are a few related repos:

- `json-to-spec`  
  Converts a structure + data into a JSON specification tree.

- `json-renderers-build`  
  Builds headless component specs for things like table, select, form, etc.

- `json-renderers`  
  Takes the spec and mounts real DOM into the browser.

- `json-transformer`  
  Helps transform and normalize data into JSON objects used by the UI layer.

- `json-to-tag-table`  
  This repo: table-specific renderer built on top of the generic JSON-to-DOM system.

Other repos in the folder such as the Tally repos are more about data collection and normalization from Tally software.

---

## What happens in practice

A typical sequence looks like this:

```text
Tally / API data
   -> normalized JSON
   -> spec build
   -> DOM blueprint
   -> HTML table rendered in browser
```

This repo usually sits near the end of that flow: after the data is ready, it creates a table layout and renders it.

---

## What is actually inside the code

This is the part that is easy to miss if you only look at the repo name.

The runtime is not writing a raw DOM tree by hand for every table or select element. Instead, it delegates the work in layers:

```text
input JSON
  -> json-renderers-build decides the structure
  -> returns a JSON specification
  -> @keshavsoft/json-to-tag converts that spec into browser nodes
  -> json-renderers mounts the result into the UI
```

The key idea is:

- the table is represented as structured JSON
- the select is represented as structured JSON
- the datalist or hybrid component is also represented as structured JSON
- the DOM is produced only when `json-to-tag` receives that blueprint

A table component might look like this in the spec layer:

```json
{
  "type": "table",
  "children": [
    { "type": "thead", "children": [{ "type": "tr", "children": ["Name", "City", "Amount"] }] },
    { "type": "tbody", "children": [
      { "type": "tr", "children": ["Alpha", "Hyderabad", 1200] },
      { "type": "tr", "children": ["Beta", "Bengaluru", 2200] }
    ] }
  ]
}
```

A select component might look like this:

```json
{
  "type": "select",
  "id": "city-select",
  "children": [
    { "type": "option", "value": "Hyderabad", "text": "Hyderabad" },
    { "type": "option", "value": "Bengaluru", "text": "Bengaluru" },
    { "type": "option", "value": "Pune", "text": "Pune" }
  ]
}
```

So the real work is not "one repo builds a DOM directly". The real work is this:

> build the structure as JSON, then let the renderer turn that JSON into the right HTML elements.

That is how the library supports complicated or hybrid components without hardcoding every browser element manually.

---

## Why this architecture is useful

This design keeps the system modular:

- the data layer can change without breaking the UI
- the renderer can change without rewriting all table logic
- config can define how the table behaves instead of hardcoding everything
- a feature like totals, footer rows, actions, or forms can be added as JSON-driven behavior

That is why the repo is structured around config, data, and rendering layers instead of one giant custom UI file.

---

## Why the repo feels bigger than a normal table library

Because it is not just a table library.

It is a tiny part of a larger framework that already knows how to:

- transform JSON
- build UI specs
- render DOM components declaratively

This repo adds the table-specific intelligence: rows, columns, state, summary values, and render behavior.

---

## The simplest way to remember it

If you remember only one sentence, remember this:

> The real product is the JSON renderer story: build a JSON specification, let json-to-tag create the DOM, and let the runtime mount the final UI.

This repo is the table-shaped expression of that architecture, not the whole architecture itself.

---

## When to edit which repo

- Edit `json-to-tag-table` for table behavior, column logic, totals, rendering flow
- Edit `json-renderers-build` for reusable component blueprint generation
- Edit `json-to-spec` when the lower-level spec engine behavior changes
- Edit `json-transformer` when data transformation rules need to change
- Edit Tally repos when data acquisition or normalization from Tally itself changes

---

## Final thought

This repo is smart because it follows the same pattern everywhere: define the structure as data, let the system compile it, then let the renderer create real DOM.

That is the central idea behind the whole stack.
