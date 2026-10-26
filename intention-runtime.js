import { compileLookCss, lookClassNames } from "./intention-looks.js";

const nativeElements = {
  button: { tag: "button" },
  input: { tag: "input" },
  checkbox: { tag: "input", attributes: { type: "checkbox" } },
  select: { tag: "select" },
  image: { tag: "img" },
  dialog: { tag: "dialog" },
  form: { tag: "form" },
  heading: { tag: "h1" },
  text: { tag: "span" },
  message: { tag: "p" },
  section: { tag: "section" },
  grid: { tag: "div" },
  row: { tag: "div" },
  column: { tag: "div" },
  card: { tag: "section" },
};

const eventNames = {
  clicked: "click",
  changed: "change",
  submitted: "submit",
};

const layoutNames = new Set(["column", "row", "width", "height"]);
const gridNames = new Set(["columns", "minimum", "gap", "padding"]);

const styleSelectors = {
  host: ":host",
  heading: "h1",
  text: "span",
  message: "p",
  image: "img",
  row: ".intent-row",
  column: ".intent-column",
  grid: ".intent-grid",
  card: ".intent-card",
};

const componentStyles = `
  :host { display: block; box-sizing: border-box; color: #171821; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
  h1 { margin: 0 0 1rem; font-size: clamp(1.8rem, 6vw, 3rem); line-height: 1.05; letter-spacing: -.045em; }
  p { margin: .45rem 0 1rem; color: #686b79; line-height: 1.65; }
  button { min-height: 42px; padding: .65rem 1rem; border: 1px solid #6c4cff55; border-radius: .8rem; color: #fff; background: #6545f5; font: 750 .92rem/1 system-ui, sans-serif; cursor: pointer; }
  button:hover { background: #5437db; }
  button:disabled { opacity: .45; cursor: not-allowed; }
  input, select { min-height: 42px; padding: .65rem .8rem; border: 1px solid #d8d8e3; border-radius: .75rem; background: #fff; color: #171821; font: inherit; }
  .intent-row { display: flex; align-items: center; gap: .75rem; flex-wrap: wrap; }
  .intent-column { display: flex; flex-direction: column; gap: .75rem; }
  .intent-grid { display: grid; align-items: stretch; }
  .intent-card { border: 1px solid #e3e2ea; border-radius: 1rem; padding: 1rem; background: #fff; box-shadow: 0 10px 28px #31285b0c; }
  .intent-enter-fade-up { animation: intent-fade-up .65s cubic-bezier(.2,.8,.2,1) both; }
  @keyframes intent-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
  .intent-reveal { opacity: 0; transform: translateY(38px) scale(.985); transition: opacity .8s cubic-bezier(.2,.75,.2,1), transform .8s cubic-bezier(.2,.75,.2,1); transition-delay: var(--intent-reveal-delay, 0ms); }
  .intent-reveal.intent-visible { opacity: 1; transform: none; }
  slot { display: contents; }
  .intent-hidden { display: none !important; }
  @media (prefers-reduced-motion: reduce) { .intent-reveal { opacity: 1; transform: none; transition: none; } }
`;

function kebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}

function clone(value) {
  return value && typeof value === "object" ? structuredClone(value) : value;
}

export function persistentStorageKey(component, name) {
  return `intention:${component}:${name}`;
}

export function readPersistentValue(storage, key, fallback) {
  try {
    const stored = storage?.getItem(key);
    return stored == null ? fallback : JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function pathGet(scope, source) {
  const path = source.trim().split(".");
  let current = scope;
  for (const key of path) current = current?.[key];
  return current;
}

function pathSet(scope, source, value) {
  const path = source.split(".");
  let current = scope;
  while (current && !Object.prototype.hasOwnProperty.call(current, path[0])) {
    current = Object.getPrototypeOf(current);
  }
  current ||= scope;
  for (const key of path.slice(0, -1)) {
    if (current[key] == null) current[key] = {};
    current = current[key];
  }
  current[path.at(-1)] = value;
  return current;
}

function unwrapParentheses(source) {
  let text = source.trim();
  while (text.startsWith("(") && text.endsWith(")")) {
    let depth = 0;
    let enclosesEverything = true;
    for (let index = 0; index < text.length; index += 1) {
      if (text[index] === "(") depth += 1;
      if (text[index] === ")") depth -= 1;
      if (depth === 0 && index < text.length - 1) {
        enclosesEverything = false;
        break;
      }
    }
    if (!enclosesEverything) break;
    text = text.slice(1, -1).trim();
  }
  return text;
}

function splitBinary(source, operators) {
  let depth = 0;
  let quote = null;
  let result = null;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === quote && source[index - 1] !== "\\") quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === "(") depth += 1;
    if (character === ")") depth -= 1;
    if (depth !== 0) continue;
    const operator = operators.find((candidate) => source.startsWith(candidate, index));
    if (!operator) continue;
    if ((operator === "+" || operator === "-") && !source.slice(0, index).trim()) continue;
    result = [source.slice(0, index), operator, source.slice(index + operator.length)];
    index += operator.length - 1;
  }
  return result;
}

export function evaluateExpression(expression, scope) {
  const text = unwrapParentheses(expression);
  let match;
  if ((match = text.match(/^(.+) is greater than (.+)$/))) {
    return evaluateExpression(match[1], scope) > evaluateExpression(match[2], scope);
  }
  if ((match = text.match(/^(.+) is less than (.+)$/))) {
    return evaluateExpression(match[1], scope) < evaluateExpression(match[2], scope);
  }
  if ((match = text.match(/^(.+) equals (.+)$/))) {
    return Object.is(evaluateExpression(match[1], scope), evaluateExpression(match[2], scope));
  }
  if ((match = text.match(/^(.+) is not empty$/))) {
    const result = evaluateExpression(match[1], scope);
    return Array.isArray(result) ? result.length > 0 : Boolean(result);
  }
  if ((match = text.match(/^(.+) is empty$/))) {
    const result = evaluateExpression(match[1], scope);
    return Array.isArray(result) ? result.length === 0 : !result;
  }
  if ((match = text.match(/^(.+) is (true|false)$/))) {
    return Boolean(evaluateExpression(match[1], scope)) === (match[2] === "true");
  }
  const precedence = [
    ["||"],
    ["&&"],
    ["==", "!=", ">=", "<=", ">", "<"],
    ["+", "-"],
    ["*", "/", "%"],
  ];
  for (const operators of precedence) {
    const parts = splitBinary(text, operators);
    if (!parts) continue;
    const [leftSource, operator, rightSource] = parts;
    const left = evaluateExpression(leftSource, scope);
    const right = evaluateExpression(rightSource, scope);
    if (operator === "||") return left || right;
    if (operator === "&&") return left && right;
    if (operator === "==") return Object.is(left, right);
    if (operator === "!=") return !Object.is(left, right);
    if (operator === ">=") return left >= right;
    if (operator === "<=") return left <= right;
    if (operator === ">") return left > right;
    if (operator === "<") return left < right;
    if (operator === "+") return left + right;
    if (operator === "-") return left - right;
    if (operator === "*") return left * right;
    if (operator === "/") return left / right;
    if (operator === "%") return left % right;
  }
  if (text.startsWith("!")) return !evaluateExpression(text.slice(1), scope);
  if (text === "[]") return [];
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === "null") return null;
  if (text === "empty") return "";
  if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text);
  if (text.startsWith('"')) {
    try { return JSON.parse(text); } catch { return text.slice(1, -1); }
  }
  return pathGet(scope, text);
}

export function findElementByIdDeep(root, id) {
  if (!root || !id) return null;
  if (root.id === id) return root;
  for (const child of root.children || []) {
    const found = findElementByIdDeep(child.shadowRoot, id)
      || findElementByIdDeep(child, id);
    if (found) return found;
  }
  return null;
}

function internalUrlFromClick(event) {
  if (event.defaultPrevented || (typeof event.button === "number" && event.button > 0)
    || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;

  for (const item of event.composedPath?.() || []) {
    const target = item?.getAttribute?.("target");
    if (item?.hasAttribute?.("download") || (target && target !== "_self")) return null;
    const href = item?.getAttribute?.("href") || item?.href;
    if (typeof href !== "string" || !href) continue;
    try {
      const url = new URL(href, window.location.href);
      const current = new URL(window.location.href);
      if (url.origin === current.origin) return url;
    } catch {
      return null;
    }
  }
  return null;
}

function scrollToIntentionHash(root, hash) {
  if (!hash) return false;
  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    id = hash.slice(1);
  }
  const target = findElementByIdDeep(root, id);
  if (!target) return false;
  let current = target;
  while (current) {
    const parent = current.assignedSlot || current.parentElement || current.getRootNode?.()?.host;
    if (!parent) break;
    const style = typeof getComputedStyle === "function" ? getComputedStyle(parent) : null;
    const scrollable = style && ["auto", "scroll"].includes(style.overflowY)
      && parent.scrollHeight > parent.clientHeight;
    if (scrollable) {
      const top = parent.scrollTop + target.getBoundingClientRect().top - parent.getBoundingClientRect().top;
      if (typeof parent.scrollTo === "function") parent.scrollTo({ top, behavior: "smooth" });
      else parent.scrollTop = top;
      return true;
    }
    current = parent;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function normalizeRoutePath(pathname) {
  const clean = String(pathname || "/").replace(/\/+$/, "");
  return clean || "/";
}

export function normalizeBasePath(basePath) {
  const value = String(basePath || "").trim();
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

export function stripBasePath(pathname, basePath) {
  const base = normalizeBasePath(basePath);
  const path = String(pathname || "/");
  if (!base) return path;
  if (path === base || path === `${base}/`) return "/";
  return path.startsWith(`${base}/`) ? path.slice(base.length) : path;
}

export function withBasePath(url, basePath) {
  const base = normalizeBasePath(basePath);
  const value = String(url || "");
  if (!base || !value.startsWith("/") || value.startsWith("//")) return value;
  if (value === base || value.startsWith(`${base}/`) || value.startsWith(`${base}#`)) return value;
  return `${base}${value}`;
}

export function matchRoutePath(pattern, pathname) {
  const path = normalizeRoutePath(pathname);
  if (pattern === "*") return {};
  const patternParts = normalizeRoutePath(pattern).split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params = {};
  for (let index = 0; index < patternParts.length; index += 1) {
    const expected = patternParts[index];
    const received = pathParts[index];
    if (expected.startsWith(":")) {
      try { params[expected.slice(1)] = decodeURIComponent(received); }
      catch { params[expected.slice(1)] = received; }
    } else if (expected !== received) {
      return null;
    }
  }
  return params;
}

export function findRoute(program, pathname) {
  const path = normalizeRoutePath(pathname);
  const routes = program.routes || [];
  const candidates = [
    ...routes.filter((route) => route.path !== "*" && !route.path.includes(":")),
    ...routes.filter((route) => route.path.includes(":")),
  ];
  for (const route of candidates) {
    const params = matchRoutePath(route.path, path);
    if (params) return { ...route, params, matchedPath: path };
  }
  const fallback = routes.find((route) => route.path === "*");
  return fallback ? { ...fallback, params: {}, matchedPath: path } : null;
}

function evaluate(value, scope) {
  if (!value) return undefined;
  if (value.type === "literal") {
    if (typeof value.value !== "string") return clone(value.value);
    return value.value.replace(/\{([^}]+)\}/g, (_, expression) => evaluateExpression(expression, scope) ?? "");
  }
  return evaluateExpression(value.value, scope);
}

function elementSpec(kind) {
  if (kind.includes("-")) {
    return { tag: kind, custom: true, waitingFor: kind };
  }
  return { ...(nativeElements[kind] || { tag: "div" }), custom: false };
}

function styleSelector(selector) {
  return String(selector).split(",").map((part) => {
    const source = part.trim();
    for (const [intentName, cssName] of Object.entries(styleSelectors)) {
      if (source === intentName) return cssName;
      if (source.startsWith(`${intentName}:`)) return `${cssName}${source.slice(intentName.length)}`;
    }
    return source;
  }).join(", ");
}

export function componentStyleText(definition) {
  return definition.body
    .filter((node) => node.type === "style")
    .flatMap((node) => node.rules)
    .map((rule) => {
      const responsive = rule.selector.match(/^(.*?)\s+(under|over)\s+(\d+)$/i);
      const selector = styleSelector(responsive ? responsive[1] : rule.selector);
      const body = `${selector} { ${rule.declarations
        .map((declaration) => `${declaration.property}: ${declaration.value};`)
        .join(" ")} }`;
      if (!responsive) return body;
      const boundary = responsive[2].toLowerCase() === "under" ? "max-width" : "min-width";
      return `@media (${boundary}: ${responsive[3]}px) { ${body} }`;
    })
    .join("\n");
}

function propertyName(spec, name) {
  return spec.properties?.[name] || name;
}

function eventName(spec, name) {
  return spec.events?.[name] || eventNames[name] || name;
}

function isEventNode(node) {
  return node.type === "when" && Boolean(node.event || eventNames[node.test]);
}

function givenValues(node, scope, basePath = "") {
  const values = Object.fromEntries(
    node.children
      .filter((child) => child.type === "give")
      .map((child) => [
        child.name,
        child.name === "code" && child.value?.type === "literal"
          ? clone(child.value.value)
          : evaluate(child.value, scope),
      ]),
  );
  if (values.href) values.href = withBasePath(values.href, basePath);
  if (values.src) values.src = withBasePath(values.src, basePath);
  return values;
}

function positiveInteger(value, fallback) {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function nonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function applyPlacement(element, values) {
  for (const name of layoutNames) {
    if (values[name] != null) element.dataset[`intentGrid${name[0].toUpperCase()}${name.slice(1)}`] = values[name];
  }
}

function applyGivenProperties(element, spec, node, values) {
  for (const [name, value] of Object.entries(values)) {
    if (layoutNames.has(name) || ["key", "ref", "look", "enter"].includes(name) || (node.kind === "grid" && gridNames.has(name))) continue;
    if (["reveal", "delay", "scrollSpy"].includes(name)) continue;
    if (name === "style" && value && typeof value === "object") {
      Object.assign(element.style, value);
      continue;
    }
    if (name === "class") {
      for (const className of String(value || "").split(/\s+/).filter(Boolean)) element.classList.add(className);
      continue;
    }
    const target = propertyName(spec, name);
    if (target in element || (value && typeof value === "object")) {
      element[target] = value;
    } else if (typeof value === "boolean") {
      element.toggleAttribute(target, value);
    } else if (value != null) {
      element.setAttribute(target, String(value));
    }
  }
}

function applyVisualIntent(element, values, program) {
  for (const className of lookClassNames(values.look, program)) element.classList.add(className);
  if (values.enter) element.classList.add(`intent-enter-${kebab(values.enter)}`);
}

export function computeGridPlacements(items, requestedColumns, compact = false) {
  const columns = positiveInteger(requestedColumns, 1);
  const occupied = new Set();
  const placements = [];
  const isFree = (row, column, width, height) => {
    if (column < 1 || column + width - 1 > columns || row < 1) return false;
    for (let y = row; y < row + height; y += 1) {
      for (let x = column; x < column + width; x += 1) {
        if (occupied.has(`${y}:${x}`)) return false;
      }
    }
    return true;
  };
  const occupy = (row, column, width, height) => {
    for (let y = row; y < row + height; y += 1) {
      for (let x = column; x < column + width; x += 1) occupied.add(`${y}:${x}`);
    }
  };

  for (const item of items) {
    const width = Math.min(positiveInteger(item.width, 1), columns);
    const height = compact ? 1 : positiveInteger(item.height, 1);
    const fixedColumn = compact ? null : positiveInteger(item.column, null);
    const fixedRow = compact ? null : positiveInteger(item.row, null);
    let column = Math.min(fixedColumn || 1, columns - width + 1);
    let row = fixedRow || 1;

    if (!fixedColumn || !fixedRow) {
      let found = false;
      for (let candidateRow = fixedRow || 1; !found; candidateRow += 1) {
        const firstColumn = fixedColumn || 1;
        const lastColumn = fixedColumn || columns - width + 1;
        for (let candidateColumn = firstColumn; candidateColumn <= lastColumn; candidateColumn += 1) {
          if (!isFree(candidateRow, candidateColumn, width, height)) continue;
          row = candidateRow;
          column = candidateColumn;
          found = true;
          break;
        }
      }
    }

    occupy(row, column, width, height);
    placements.push({ column, row, width, height });
  }
  return placements;
}

function placeGridChildren(grid, columns, compact = false) {
  const children = [...grid.children];
  const placements = computeGridPlacements(children.map((child) => ({
    width: child.dataset.intentGridWidth,
    height: child.dataset.intentGridHeight,
    column: child.dataset.intentGridColumn,
    row: child.dataset.intentGridRow,
  })), columns, compact);
  children.forEach((child, index) => {
    const placement = placements[index];
    child.style.minWidth = "0";
    child.style.gridColumn = `${placement.column} / span ${placement.width}`;
    child.style.gridRow = `${placement.row} / span ${placement.height}`;
  });
}

function actionResult(changed = false, shared = false) {
  return { changed, shared };
}

function mergeActionResult(left, right) {
  return actionResult(left.changed || right.changed, left.shared || right.shared);
}

function executeAction(node, scope, host) {
  if (node.type !== "action") return actionResult();
  if (node.action === "emit") {
    host?.dispatchEvent(new CustomEvent(node.event, {
      detail: node.value ? evaluate(node.value, scope) : undefined,
      bubbles: true,
      composed: true,
    }));
    return actionResult();
  }
  if (node.action === "routine") {
    return host?.runRoutine(node.routine, node.value ? evaluate(node.value, scope) : undefined, scope) || actionResult();
  }
  if (["focus", "scroll", "play", "pause"].includes(node.action)) {
    queueMicrotask(() => {
      const element = host?.refs?.get(node.reference);
      if (node.action === "focus") element?.focus?.();
      if (node.action === "scroll") element?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
      if (node.action === "play") element?.play?.();
      if (node.action === "pause") element?.pause?.();
    });
    return actionResult();
  }
  if (node.action === "notify") {
    if (typeof window !== "undefined") window.alert(String(evaluate(node.value, scope) ?? ""));
    return actionResult();
  }
  if (node.action === "log") {
    console.log(evaluate(node.value, scope));
    return actionResult();
  }
  if (node.action === "reset") {
    const rootName = node.target.split(".")[0];
    const initialRoot = host?.initialValues?.has(rootName)
      ? host.initialValues.get(rootName)
      : host?.intentContext?.sharedInitial?.get(rootName);
    const initial = node.target.includes(".")
      ? pathGet({ [rootName]: initialRoot }, node.target)
      : initialRoot;
    const owner = pathSet(scope, node.target, clone(initial));
    return actionResult(!host?.nonReactiveNames?.has(rootName), owner === host?.intentContext?.shared);
  }
  const current = pathGet(scope, node.target);
  let owner;
  if (node.action === "increase") owner = pathSet(scope, node.target, Number(current) + Number(evaluate(node.amount, scope)));
  if (node.action === "decrease") owner = pathSet(scope, node.target, Number(current) - Number(evaluate(node.amount, scope)));
  if (node.action === "set") owner = pathSet(scope, node.target, evaluate(node.value, scope));
  if (node.action === "toggle") owner = pathSet(scope, node.target, !current);
  if (node.action === "empty") owner = pathSet(scope, node.target, Array.isArray(current) ? [] : "");
  if (node.action === "add") owner = pathSet(scope, node.target, [...(current || []), evaluate(node.value, scope)]);
  if (node.action === "remove") {
    const unwanted = evaluate(node.value, scope);
    owner = pathSet(scope, node.target, (current || []).filter((item) => item !== unwanted));
  }
  if (node.action === "plus") {
    const added = evaluate(node.value, scope);
    owner = pathSet(scope, node.target, Array.isArray(current) ? [...current, added] : current + added);
  }
  if (node.action === "minus") {
    const removed = evaluate(node.value, scope);
    owner = pathSet(scope, node.target, Array.isArray(current) ? current.filter((item) => item !== removed) : current - removed);
  }
  if (!owner) return actionResult();
  const rootName = node.target.split(".")[0];
  return actionResult(!host?.nonReactiveNames?.has(rootName), owner === host?.intentContext?.shared);
}

function executeActions(nodes, scope, host) {
  let result = actionResult();
  let previousCondition = null;
  for (const node of nodes) {
    if (node.type === "when" && !isEventNode(node)) {
      previousCondition = Boolean(evaluateExpression(node.test, scope));
      if (previousCondition) result = mergeActionResult(result, executeActions(node.children, scope, host));
      continue;
    }
    if (node.type === "otherwise") {
      if (previousCondition === false) result = mergeActionResult(result, executeActions(node.children, scope, host));
      previousCondition = null;
      continue;
    }
    previousCondition = null;
    result = mergeActionResult(result, executeAction(node, scope, host));
  }
  return result;
}

function createComponentClass(definition, context) {
  return class IntentionElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.intentInputs = {};
      this.intentContext = context;
      this.state = null;
      this.watchedTags = new Set();
      this.layoutObservers = [];
      this.refs = new Map();
      this.initialValues = new Map();
      this.nonReactiveNames = new Set();
      this.resourceRequests = new Map();
      this.effectValues = new Map();
      this.childSnapshots = new Map();
      this.hasMounted = false;
    }

    connectedCallback() {
      context.instances.add(this);
      if (!this.state) this.initialize();
      this.render();
    }

    disconnectedCallback() {
      context.instances.delete(this);
      for (const observer of this.layoutObservers) observer.disconnect();
      this.layoutObservers = [];
      for (const request of this.resourceRequests.values()) request.controller?.abort();
      queueMicrotask(() => {
        if (this.isConnected) return;
        for (const effect of definition.body.filter((node) => node.type === "effect" && node.trigger === "unmount")) {
          const result = executeActions(effect.children, this.state, this);
          this.persistState();
          if (result.shared) context.refreshAll();
        }
      });
    }

    initialize() {
      this.state = Object.create(context.shared);
      const initialScope = Object.assign(Object.create(context.shared), this.intentInputs);
      for (const node of definition.body) {
        if (node.type === "input") {
          this.state[node.name] = node.name in this.intentInputs
            ? this.intentInputs[node.name]
            : evaluate(node.initial, initialScope);
          initialScope[node.name] = this.state[node.name];
        }
        if (node.type === "state" || node.type === "memory") {
          const initialValue = evaluate(node.initial, initialScope);
          this.state[node.name] = node.persistent ? this.readPersistent(node.name, initialValue) : clone(initialValue);
          this.initialValues.set(node.name, clone(initialValue));
          if (node.type === "memory") this.nonReactiveNames.add(node.name);
          initialScope[node.name] = this.state[node.name];
        }
        if (node.type === "resource") {
          this.state[node.name] = null;
          this.state[`${node.name}Loading`] = false;
          this.state[`${node.name}Error`] = "";
        }
      }
      for (const [name, storedValue] of Object.entries(this.intentRestoreState || {})) {
        if (this.initialValues.has(name)) this.state[name] = clone(storedValue);
      }
      for (const node of definition.body) {
        if (node.type !== "derived") continue;
        Object.defineProperty(this.state, node.name, {
          configurable: true,
          enumerable: true,
          get: () => evaluateExpression(node.expression, this.state),
        });
      }
    }

    intentSnapshot() {
      return Object.fromEntries([...this.initialValues.keys()].map((name) => [name, clone(this.state[name])]));
    }

    runRoutine(name, argument, parentScope) {
      const routine = definition.body.find((node) => node.type === "routine" && node.name === name);
      if (!routine) {
        console.warn(`Intention: action « ${name} » inconnue dans ${definition.name}.`);
        return actionResult();
      }
      const routineScope = Object.create(parentScope || this.state);
      if (routine.parameter) routineScope[routine.parameter] = argument;
      return executeActions(routine.children, routineScope, this);
    }

    commitActions(result) {
      this.persistState();
      if (!result?.changed && !result?.shared) return;
      if (result.shared) context.refreshAll();
      else this.render();
    }

    readPersistent(name, fallback) {
      try {
        return readPersistentValue(window.localStorage, persistentStorageKey(definition.name, name), fallback);
      } catch {
        return fallback;
      }
    }

    persistState() {
      for (const node of definition.body) {
        if (node.type !== "state" || !node.persistent) continue;
        try {
          window.localStorage.setItem(persistentStorageKey(definition.name, node.name), JSON.stringify(this.state[node.name]));
        } catch {
          // Le stockage peut être indisponible en navigation privée ; l'état reste réactif en mémoire.
        }
      }
    }

    watch(tag) {
      if (!tag || this.watchedTags.has(tag)) return;
      this.watchedTags.add(tag);
      customElements.whenDefined(tag).then(() => {
        if (this.isConnected) this.render();
      });
    }

    render() {
      const activeKey = this.shadowRoot.activeElement?.dataset?.intentKey;
      const selectionStart = this.shadowRoot.activeElement?.selectionStart;
      const selectionEnd = this.shadowRoot.activeElement?.selectionEnd;
      for (const observer of this.layoutObservers) observer.disconnect();
      this.layoutObservers = [];
      for (const element of this.shadowRoot.querySelectorAll("[data-intent-component-instance]")) {
        if (element.dataset.intentIdentity && element.intentSnapshot) {
          this.childSnapshots.set(element.dataset.intentIdentity, element.intentSnapshot());
        }
      }
      this.usedChildIdentities = new Set();
      this.refs.clear();
      this.shadowRoot.replaceChildren();
      const style = document.createElement("style");
      style.textContent = `${componentStyles}\n${compileLookCss(context.program)}\n${componentStyleText(definition)}\n${definition.compiledStyles || ""}`;
      this.shadowRoot.append(style);
      const scope = this.state;
      this.renderNodes(definition.body, this.shadowRoot, scope, "root");
      for (const identity of this.childSnapshots.keys()) {
        if (!this.usedChildIdentities.has(identity)) this.childSnapshots.delete(identity);
      }
      if (activeKey) {
        queueMicrotask(() => {
          const element = [...this.shadowRoot.querySelectorAll("[data-intent-key]")]
            .find((candidate) => candidate.dataset.intentKey === activeKey);
          element?.focus();
          if (element?.setSelectionRange && selectionStart != null) {
            element.setSelectionRange(selectionStart, selectionEnd);
          }
        });
      }
      this.runEffects();
      this.loadResources();
    }

    runEffects() {
      let result = actionResult();
      for (const effect of definition.body.filter((node) => node.type === "effect")) {
        if (effect.trigger === "mount" && !this.hasMounted) {
          result = mergeActionResult(result, executeActions(effect.children, this.state, this));
        }
        if (effect.trigger === "change") {
          const current = evaluateExpression(effect.expression, this.state);
          const previous = this.effectValues.get(effect);
          this.effectValues.set(effect, clone(current));
          if (this.hasMounted && !Object.is(JSON.stringify(previous), JSON.stringify(current))) {
            result = mergeActionResult(result, executeActions(effect.children, this.state, this));
          }
        }
      }
      this.hasMounted = true;
      if (result.changed || result.shared) queueMicrotask(() => this.commitActions(result));
    }

    loadResources() {
      for (const resource of definition.body.filter((node) => node.type === "resource")) {
        const url = evaluate(resource.source, this.state);
        const previous = this.resourceRequests.get(resource.name);
        if (!url || previous?.url === url) continue;
        previous?.controller?.abort();
        const controller = new AbortController();
        this.resourceRequests.set(resource.name, { url, controller });
        this.state[`${resource.name}Loading`] = true;
        this.state[`${resource.name}Error`] = "";
        queueMicrotask(() => {
          if (this.isConnected && this.resourceRequests.get(resource.name)?.controller === controller) this.render();
        });
        fetch(String(url), { signal: controller.signal })
          .then(async (response) => {
            if (!response.ok) throw new Error(`${response.status} ${response.statusText}`.trim());
            const contentType = response.headers.get("content-type") || "";
            return contentType.includes("json") ? response.json() : response.text();
          })
          .then((data) => {
            if (controller.signal.aborted) return;
            this.state[resource.name] = data;
            this.state[`${resource.name}Loading`] = false;
            this.render();
          })
          .catch((error) => {
            if (controller.signal.aborted) return;
            this.state[`${resource.name}Loading`] = false;
            this.state[`${resource.name}Error`] = error.message || String(error);
            this.render();
          });
      }
    }

    renderNodes(nodes, parent, scope, path) {
      let previousCondition = null;
      nodes.forEach((node, index) => {
        const key = `${path}.${index}`;
        if (["state", "memory", "input", "derived", "resource", "routine", "effect", "style", "stylesheet"].includes(node.type)) return;
        if (node.type === "slot") {
          this.intentRenderChildren?.(parent);
          return;
        }
        if (node.type === "when" && !isEventNode(node)) {
          previousCondition = Boolean(evaluateExpression(node.test, scope));
          if (previousCondition) this.renderNodes(node.children, parent, scope, key);
          return;
        }
        if (node.type === "otherwise") {
          if (previousCondition === false) this.renderNodes(node.children, parent, scope, key);
          previousCondition = null;
          return;
        }
        previousCondition = null;
        if (node.type === "show") this.renderShow(node, parent, scope, key);
        if (node.type === "each") {
          const collection = evaluateExpression(node.collection, scope) || [];
          collection.forEach((item, itemIndex) => {
            const local = Object.create(scope);
            local[node.item] = item;
            local.index = itemIndex;
            if (node.filter && !evaluateExpression(node.filter, local)) return;
            const identity = node.key ? evaluateExpression(node.key, local) : itemIndex;
            this.renderNodes(node.children, parent, local, `${key}.${identity}`);
          });
        }
      });
    }

    renderShow(node, parent, scope, key) {
      const values = givenValues(node, scope, context.basePath);
      const ownComponent = context.components.get(node.kind);
      if (ownComponent) {
        const element = document.createElement(ownComponent.tag);
        const identity = `${key}:${values.key ?? "default"}`;
        const inputs = {};
        for (const [name, inputValue] of Object.entries(values)) {
          if (!layoutNames.has(name) && !["key", "ref", "class", "style", "look", "enter"].includes(name)) inputs[name] = inputValue;
        }
        const content = evaluate(node.content, scope);
        if (content != null && !("content" in inputs)) inputs.content = content;
        element.intentInputs = inputs;
        element.intentRestoreState = this.childSnapshots.get(identity);
        element.intentRenderChildren = (target) => {
          const visualChildren = node.children.filter((child) =>
            ["show", "each", "otherwise", "slot"].includes(child.type) || (child.type === "when" && !isEventNode(child)));
          this.renderNodes(visualChildren, target, scope, `${key}.slot`);
        };
        element.dataset.intentKey = key;
        element.dataset.intentIdentity = identity;
        element.dataset.intentComponentInstance = "";
        if (values.id || values.anchor) element.id = String(values.id || values.anchor);
        this.usedChildIdentities.add(identity);
        applyPlacement(element, values);
        if (values.class) {
          for (const className of String(values.class).split(/\s+/).filter(Boolean)) element.classList.add(className);
        }
        applyVisualIntent(element, values, context.program);
        if (values.style && typeof values.style === "object") Object.assign(element.style, values.style);
        for (const child of node.children) {
          if (!isEventNode(child)) continue;
          element.addEventListener(eventName({}, child.test), (event) => {
            const eventScope = Object.create(scope);
            eventScope.event = event.detail;
            eventScope.eventObject = event;
            this.commitActions(executeActions(child.children, eventScope, this));
          });
        }
        parent.append(element);
        if (values.ref) this.refs.set(String(values.ref), element);
        return;
      }

      const spec = elementSpec(node.kind);
      this.watch(spec.waitingFor);
      const element = document.createElement(spec.tag);
      element.classList.add(`intent-${node.kind}`);
      applyVisualIntent(element, values, context.program);
      element.dataset.intentKey = key;
      applyPlacement(element, values);
      for (const [name, attributeValue] of Object.entries(spec.attributes || {})) {
        element.setAttribute(name, attributeValue);
      }
      applyGivenProperties(element, spec, node, values);
      if (values.ref) this.refs.set(String(values.ref), element);

      const content = evaluate(node.content, scope);
      if (content != null) {
        if (node.kind === "input") element[propertyName(spec, "placeholder")] = String(content);
        else if (node.kind === "image") element[propertyName(spec, "src")] = withBasePath(String(content), context.basePath);
        else element.textContent = String(content);
      }

      for (const child of node.children) {
        if (child.type === "property") {
          const active = Boolean(evaluateExpression(child.test, scope));
          const target = propertyName(spec, child.name);
          element[target] = active;
          if (!spec.custom && child.name === "hidden") element.classList.toggle("intent-hidden", active);
        }
        if (child.type === "bind") {
          const target = propertyName(spec, node.kind === "checkbox" ? "checked" : "value");
          element[target] = pathGet(scope, child.target) ?? "";
          element.addEventListener(spec.events?.input || "input", (event) => {
            const next = event.detail?.value ?? event.target[target];
            const owner = pathSet(scope, child.target, next);
            this.commitActions(actionResult(!this.nonReactiveNames.has(child.target.split(".")[0]), owner === context.shared));
          });
        }
        if (isEventNode(child)) {
          element.addEventListener(eventName(spec, child.test), (event) => {
            if (child.test === "submitted") event.preventDefault();
            const eventScope = Object.create(scope);
            eventScope.event = event.detail;
            eventScope.eventObject = event;
            this.commitActions(executeActions(child.children, eventScope, this));
          });
        }
      }

      const visualChildren = node.children.filter((child) =>
        ["show", "each", "otherwise", "slot"].includes(child.type) || (child.type === "when" && !isEventNode(child)));
      if (visualChildren.length) this.renderNodes(visualChildren, element, scope, key);
      if (node.kind === "grid") this.configureGrid(element, values);
      parent.append(element);
      if (values.scrollSpy) this.configureScrollSpy(element);
      if (values.reveal) {
        element.classList.add("intent-reveal");
        element.style.setProperty("--intent-reveal-delay", `${Math.max(0, Number(values.delay) || 0)}ms`);
        if (typeof IntersectionObserver === "undefined") {
          element.classList.add("intent-visible");
        } else {
          const observer = new IntersectionObserver(([entry]) => {
            if (!entry?.isIntersecting) return;
            element.classList.add("intent-visible");
            observer.disconnect();
          }, { threshold: 0.12, rootMargin: "0px 0px -45px" });
          observer.observe(element);
          this.layoutObservers.push(observer);
        }
      }
    }

    configureScrollSpy(root) {
      if (typeof IntersectionObserver === "undefined") return;
      const links = [...this.shadowRoot.querySelectorAll("[href*='#']")]
        .map((element) => {
          try {
            const url = new URL(element.getAttribute("href") || element.href, window.location.href);
            return { element, id: decodeURIComponent(url.hash.slice(1)) };
          } catch {
            return null;
          }
        })
        .filter((item) => item?.id);
      if (!links.length) return;
      const ids = new Set(links.map((item) => item.id));
      const sections = [...root.querySelectorAll("[id]")].filter((element) => ids.has(element.id));
      if (!sections.length) return;

      const setActive = (id) => {
        for (const link of links) {
          const active = link.id === id;
          link.element.classList.toggle("intent-active", active);
          if (active) link.element.setAttribute("aria-current", "location");
          else link.element.removeAttribute("aria-current");
        }
      };
      const visible = new Set();
      setActive(decodeURIComponent(window.location.hash.slice(1)) || sections[0].id);
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const active = [...visible]
          .sort((left, right) => left.getBoundingClientRect().top - right.getBoundingClientRect().top)[0];
        if (active) setActive(active.id);
      }, { root, rootMargin: "-8% 0px -70%", threshold: [0, 0.01, 0.2] });
      sections.forEach((section) => observer.observe(section));
      this.layoutObservers.push(observer);
    }

    configureGrid(element, values) {
      const columns = positiveInteger(values.columns, 1);
      const minimum = nonNegativeNumber(values.minimum, 0);
      const gap = nonNegativeNumber(values.gap, 0);
      const padding = nonNegativeNumber(values.padding, 0);
      element.style.gap = `${gap}px`;
      element.style.padding = `${padding}px`;

      const update = (width) => {
        const available = Math.max(0, Number(width) || element.clientWidth);
        const activeColumns = minimum > 0
          ? Math.min(columns, Math.max(1, Math.floor((available + gap) / (minimum + gap))))
          : columns;
        element.style.gridTemplateColumns = `repeat(${activeColumns}, minmax(0, 1fr))`;
        placeGridChildren(element, activeColumns, activeColumns < columns);
      };

      update(element.clientWidth);
      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver((entries) => update(entries[0]?.contentRect.width));
        observer.observe(element);
        this.layoutObservers.push(observer);
      }
    }
  };
}

let playgroundSequence = 0;

const intentionHighlightGroups = {
  declaration: new Set(["component", "routes", "if", "else", "each", "in", "where", "key"]),
  state: new Set(["var", "persist", "memory", "input", "computed", "shared"]),
  routine: new Set(["action"]),
  action: new Set(["do", "reset", "focus", "play", "pause", "notify", "log", "scroll", "to", "toggle"]),
  async: new Set(["load", "from"]),
  event: new Set(["on", "emit", "change", "of"]),
  metadata: new Set(["application", "start", "library"]),
  constant: new Set(["true", "false", "null"]),
  native: new Set(Object.keys(nativeElements)),
};

function escapeHighlight(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function highlightedToken(value, type) {
  return `<span class="it-${type}">${escapeHighlight(value)}</span>`;
}

function highlightIntentionLine(line) {
  const styleProperty = line.match(/^\s{4,}([A-Za-z-][A-Za-z0-9-]*)\s*:/)?.[1];
  let output = "";
  let index = 0;
  while (index < line.length) {
    const character = line[index];
    if (character === "#") {
      output += highlightedToken(line.slice(index), "comment");
      break;
    }
    if (character === '"' || character === "'") {
      const quote = character;
      let end = index + 1;
      while (end < line.length) {
        if (line[end] === quote && line[end - 1] !== "\\") {
          end += 1;
          break;
        }
        end += 1;
      }
      output += highlightedToken(line.slice(index, end), "string");
      index = end;
      continue;
    }
    const word = line.slice(index).match(/^[A-Za-z_][A-Za-z0-9_-]*/)?.[0];
    if (word) {
      const remaining = line.slice(index + word.length);
      let type = "plain";
      if (word === styleProperty) type = "property";
      else if (word === "style") type = "style-keyword";
      else if (word === "slot") type = "slot";
      else if (intentionHighlightGroups.declaration.has(word)) type = "keyword";
      else if (intentionHighlightGroups.state.has(word) && (word !== "input" || /^\s*input\s+[A-Za-z_]\w*\s*=/.test(line))) type = "state";
      else if (intentionHighlightGroups.routine.has(word)) type = "keyword";
      else if (intentionHighlightGroups.action.has(word)) type = "action";
      else if (intentionHighlightGroups.async.has(word)) type = "async";
      else if (intentionHighlightGroups.event.has(word)) type = "event";
      else if (intentionHighlightGroups.metadata.has(word)) type = "metadata";
      else if (intentionHighlightGroups.constant.has(word)) type = "constant";
      else if (intentionHighlightGroups.native.has(word)) type = "native";
      else if (word.includes("-")) type = "web-component";
      else if (/^[A-Z]/.test(word)) type = "component";
      else if (/^\s*:/.test(remaining)) type = "parameter";
      output += highlightedToken(word, type);
      index += word.length;
      continue;
    }
    const number = line.slice(index).match(/^-?\d+(?:\.\d+)?/)?.[0];
    if (number) {
      output += highlightedToken(number, "constant");
      index += number.length;
      continue;
    }
    const operator = line.slice(index).match(/^(?:\+=|-=|==|!=|>=|<=|&&|\|\||[=+\-*/%!<>])/)?.[0];
    if (operator) {
      output += highlightedToken(operator, "operator");
      index += operator.length;
      continue;
    }
    if (character === ":" && !line.slice(index + 1).trim()) output += highlightedToken(character, "block");
    else output += escapeHighlight(character);
    index += 1;
  }
  return output;
}

export function highlightIntention(source) {
  return String(source ?? "").split("\n").map(highlightIntentionLine).join("\n");
}

const intentionHighlightStyles = `
  .it-plain{color:#d9e1f2}.it-comment{color:#637087;font-style:italic}.it-keyword{color:#c792ea;font-weight:700}
  .it-component{color:#82aaff;font-weight:700}.it-metadata,.it-action,.it-constant{color:#f78c6c}.it-state{color:#ff5370;font-weight:700}
  .it-async,.it-native,.it-operator{color:#89ddff}.it-event{color:#c792ea}.it-slot,.it-web-component{color:#15c8a0;font-weight:700}
  .it-style-keyword,.it-parameter{color:#ffcb6b}.it-property{color:#f07178}.it-string{color:#c3e88d}.it-block{color:#c792ea;font-weight:700}
`;

function ensureCodeBlockElement() {
  if (typeof customElements === "undefined" || customElements.get("intention-code-block")) return;
  customElements.define("intention-code-block", class extends HTMLElement {
    static observedAttributes = ["code"];

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    set code(value) {
      this.setAttribute("code", value == null ? "" : String(value));
    }

    get code() {
      return this.getAttribute("code") || "";
    }

    render() {
      this.shadowRoot.innerHTML = `<style>:host{display:block;min-width:0}pre{margin:0;color:#d9e1f2;font:inherit;line-height:inherit;white-space:pre-wrap;overflow-wrap:anywhere}${intentionHighlightStyles}</style><pre><code>${highlightIntention(this.code)}</code></pre>`;
    }
  });
}

function ensurePlaygroundElement() {
  ensureCodeBlockElement();
  if (typeof customElements === "undefined" || customElements.get("intention-playground")) return;
  const parserUrl = new URL("./intention-parser.js", import.meta.url).href;
  const runtimeUrl = new URL("./intention-runtime.js", import.meta.url).href;

  customElements.define("intention-playground", class extends HTMLElement {
    static observedAttributes = ["code", "label", "description"];

    constructor() {
      super();
      this.playgroundId = `intention-playground-${++playgroundSequence}`;
      this.attachShadow({ mode: "open" });
      this.onMessage = (event) => {
        if (event.source !== this.frame?.contentWindow || event.data?.playground !== this.playgroundId) return;
        this.status.textContent = event.data.ok ? "Aperçu synchronisé" : "Corrigez l’erreur indiquée";
        this.status.classList.toggle("error", !event.data.ok);
      };
    }

    connectedCallback() {
      this.initialCode = this.getAttribute("code") || "component App:\n  heading \"Bonjour Intention\"";
      this.renderShell();
      window.addEventListener("message", this.onMessage);
      this.run(this.initialCode);
    }

    disconnectedCallback() {
      window.removeEventListener("message", this.onMessage);
      clearTimeout(this.timer);
    }

    attributeChangedCallback(name, oldValue, value) {
      if (name !== "code" || !this.isConnected || oldValue === value || !this.editor) return;
      this.initialCode = value || "";
      this.editor.value = this.initialCode;
      this.syncHighlight();
      this.run(this.initialCode);
    }

    renderShell() {
      this.shadowRoot.innerHTML = `
        <style>
          :host{display:block;margin:26px 0;border:1px solid #17182416;border-radius:20px;background:#fff;box-shadow:0 20px 55px #30275d10;overflow:hidden;container-type:inline-size}*{box-sizing:border-box}
          .head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 18px;border-bottom:1px solid #17182410;background:#fbfbfd}.heading{min-width:0}.label{display:block;color:#292a34;font-size:.88rem;font-weight:850}.description{display:block;margin-top:3px;color:#777987;font-size:.75rem}.reset{flex:0 0 auto;padding:8px 11px;border:1px solid #dcdce5;border-radius:9px;color:#595b68;background:#fff;font:750 .75rem system-ui;cursor:pointer}.workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);width:100%;min-width:0;min-height:360px;overflow:hidden}.pane{min-width:0;overflow:hidden;display:flex;flex-direction:column}.pane:first-child{border-right:1px solid #17182412;background:#10131a}.bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;color:#a8b5cc;background:#171c26;font:700 .7rem ui-monospace,monospace;letter-spacing:.04em}.status{color:#82e7bd}.status.error{color:#ff5370}.editor-wrap{position:relative;flex:1;min-width:0;min-height:330px;overflow:hidden;background:#10131a}.highlight,textarea{position:absolute;inset:0;width:100%;height:100%;margin:0;padding:18px;border:0;font:500 .82rem/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;tab-size:2;white-space:pre;overflow:auto}.highlight{pointer-events:none;color:#d9e1f2;background:#10131a}.highlight code{font:inherit}textarea{z-index:1;outline:0;resize:none;color:transparent;-webkit-text-fill-color:transparent;caret-color:#ffcb6b;background:transparent}textarea::selection{background:#34415a}.preview-label{padding:10px 14px;border-bottom:1px solid #1718240d;color:#777987;background:#fafafe;font:750 .7rem system-ui;letter-spacing:.04em;text-transform:uppercase}iframe{display:block;width:100%;min-width:0;height:100%;min-height:330px;border:0;background:#f8f8fc}${intentionHighlightStyles}
          @container(max-width:760px){.workspace{grid-template-columns:1fr}.pane:first-child{border-right:0;border-bottom:1px solid #17182412}.editor-wrap{min-height:300px}iframe{min-height:320px}}
          @media(max-width:800px){.workspace{grid-template-columns:1fr}.pane:first-child{border-right:0;border-bottom:1px solid #17182412}.editor-wrap{min-height:280px}iframe{min-height:300px}}
        </style>
        <div class="head"><span class="heading"><strong class="label"></strong><span class="description"></span></span><button class="reset" type="button">Réinitialiser</button></div>
        <div class="workspace">
          <div class="pane"><div class="bar"><span>app.intent</span><span class="status">Compilation…</span></div><div class="editor-wrap"><pre class="highlight" aria-hidden="true"><code></code></pre><textarea spellcheck="false" wrap="off" aria-label="Code Intention modifiable"></textarea></div></div>
          <div class="pane"><div class="preview-label">Rendu</div><iframe title="Aperçu du code Intention" sandbox="allow-scripts allow-same-origin"></iframe></div>
        </div>`;
      this.editor = this.shadowRoot.querySelector("textarea");
      this.highlightLayer = this.shadowRoot.querySelector(".highlight");
      this.highlightCode = this.highlightLayer.querySelector("code");
      this.frame = this.shadowRoot.querySelector("iframe");
      this.status = this.shadowRoot.querySelector(".status");
      this.shadowRoot.querySelector(".label").textContent = this.getAttribute("label") || "Exemple interactif";
      this.shadowRoot.querySelector(".description").textContent = this.getAttribute("description") || "Modifiez le code : le rendu se met à jour automatiquement.";
      this.editor.value = this.initialCode;
      this.syncHighlight();
      this.editor.addEventListener("input", () => {
        this.syncHighlight();
        this.status.textContent = "Compilation…";
        this.status.classList.remove("error");
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.run(this.editor.value), 280);
      });
      this.editor.addEventListener("scroll", () => {
        this.highlightLayer.scrollTop = this.editor.scrollTop;
        this.highlightLayer.scrollLeft = this.editor.scrollLeft;
      });
      this.editor.addEventListener("keydown", (event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        this.editor.setRangeText("  ", this.editor.selectionStart, this.editor.selectionEnd, "end");
        this.editor.dispatchEvent(new Event("input"));
      });
      this.shadowRoot.querySelector(".reset").addEventListener("click", () => {
        this.editor.value = this.initialCode;
        this.syncHighlight();
        this.run(this.initialCode);
        this.editor.focus();
      });
    }

    syncHighlight() {
      this.highlightCode.innerHTML = `${highlightIntention(this.editor.value)}\n`;
      this.highlightLayer.scrollTop = this.editor.scrollTop;
      this.highlightLayer.scrollLeft = this.editor.scrollLeft;
    }

    run(source) {
      const sourceLiteral = JSON.stringify(String(source)).replaceAll("<", "\\u003c");
      const playgroundLiteral = JSON.stringify(this.playgroundId);
      this.frame.srcdoc = `<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html{color-scheme:light}*{box-sizing:border-box}body{margin:0;padding:24px;background:#f8f8fc;color:#171821;font-family:Inter,ui-sans-serif,system-ui,sans-serif}intention-root{display:block}#error{margin:0;padding:16px;border:1px solid #ff6b6b55;border-radius:12px;color:#9b2525;background:#fff1f1;font:600 .8rem/1.6 ui-monospace,monospace;white-space:pre-wrap}</style></head><body><intention-root></intention-root><pre id="error" hidden></pre><script type="module">import { parseIntention } from ${JSON.stringify(parserUrl)};import { startIntention } from ${JSON.stringify(runtimeUrl)};const source=${sourceLiteral};const id=${playgroundLiteral};try{const program=parseIntention(source,"playground.intent");program.basePath="";startIntention(program);parent.postMessage({playground:id,ok:true},"*")}catch(error){const output=document.querySelector("#error");output.hidden=false;output.textContent=error.message;parent.postMessage({playground:id,ok:false,message:error.message},"*")}<\/script></body></html>`;
    }
  });
}

export function startIntention(program, options = {}) {
  ensurePlaygroundElement();
  const context = {
    components: new Map(),
    instances: new Set(),
    shared: {},
    sharedInitial: new Map(),
    refreshPending: false,
    basePath: normalizeBasePath(options.basePath || program.basePath),
    program,
  };
  for (const item of program.shared || []) {
    context.shared[item.name] = evaluate(item.initial, context.shared);
    context.sharedInitial.set(item.name, clone(context.shared[item.name]));
  }
  context.refreshAll = () => {
    if (context.refreshPending) return;
    context.refreshPending = true;
    queueMicrotask(() => {
      context.refreshPending = false;
      for (const instance of [...context.instances]) {
        if (instance.isConnected) instance.render();
      }
    });
  };
  for (const definition of program.components) {
    const tag = `intent-${kebab(definition.name)}`;
    context.components.set(definition.name, { tag, definition });
  }
  for (const definition of program.components) {
    const { tag } = context.components.get(definition.name);
    if (!customElements.get(tag)) customElements.define(tag, createComponentClass(definition, context));
  }
  const root = document.querySelector("intention-root");
  if (!root) throw new Error("Intention: élément <intention-root> absent.");

  const renderPage = () => {
    const routePath = stripBasePath(window.location.pathname, context.basePath);
    const route = findRoute(program, routePath);
    if (program.routes?.length && !route) return false;
    const componentName = route?.component || program.start;
    const component = context.components.get(componentName);
    if (!component) return false;
    const page = document.createElement(component.tag);
    page.intentInputs = { ...(route?.params || {}) };
    root.replaceChildren(page);
    root.removeAttribute("data-intention-ssr");
    root.dataset.route = normalizeRoutePath(routePath);
    document.title = route && route.name !== program.start
      ? `${route.name} — ${program.application}`
      : program.application;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!scrollToIntentionHash(root, window.location.hash)) window.scrollTo({ top: 0, left: 0 });
      if (window.location.hash) {
        setTimeout(() => scrollToIntentionHash(root, window.location.hash), 120);
        setTimeout(() => scrollToIntentionHash(root, window.location.hash), 360);
      }
    }));
    return true;
  };

  renderPage();

  if (!root.intentNavigationHandler) {
    root.intentNavigationHandler = (event) => {
      const url = internalUrlFromClick(event);
      if (!url) return;
      const targetPath = stripBasePath(url.pathname, context.basePath);
      const currentPath = stripBasePath(window.location.pathname, context.basePath);
      const route = findRoute(program, targetPath);
      const samePage = normalizeRoutePath(targetPath) === normalizeRoutePath(currentPath)
        && url.search === window.location.search;

      if (!route && program.routes?.length) return;
      if (samePage && !url.hash) return;
      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      if (samePage) scrollToIntentionHash(root, url.hash);
      else renderPage();
    };
    root.addEventListener("click", root.intentNavigationHandler);

    root.intentPopStateHandler = () => {
      const currentPath = stripBasePath(window.location.pathname, context.basePath);
      const currentRoute = findRoute(program, currentPath);
      const routePath = normalizeRoutePath(currentPath);
      if (root.dataset.route !== routePath) renderPage();
      else if (!scrollToIntentionHash(root, window.location.hash)) window.scrollTo({ top: 0, left: 0 });
    };
    window.addEventListener("popstate", root.intentPopStateHandler);
  }
}
