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

const componentStyles = `
  :host { display: block; color: #171821; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
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
  .intent-hidden { display: none !important; }
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

function designSpec(kind, design) {
  const native = nativeElements[kind] || { tag: "div" };
  const candidate = design[kind];
  const configured = typeof candidate === "string" ? { tag: candidate } : candidate;
  if (configured?.tag && customElements.get(configured.tag)) {
    return { ...configured, custom: true };
  }
  return { ...native, custom: false, waitingFor: configured?.tag };
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
    if (layoutNames.has(name) || ["key", "ref"].includes(name) || (node.kind === "grid" && gridNames.has(name))) continue;
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

function placeGridChildren(grid, columns, compact = false) {
  for (const child of grid.children) {
    const requestedWidth = positiveInteger(child.dataset.intentGridWidth, 1);
    const width = Math.min(requestedWidth, columns);
    const height = compact ? 1 : positiveInteger(child.dataset.intentGridHeight, 1);
    const column = compact ? null : positiveInteger(child.dataset.intentGridColumn, null);
    const row = compact ? null : positiveInteger(child.dataset.intentGridRow, null);

    child.style.minWidth = "0";
    child.style.gridColumn = column ? `${column} / span ${width}` : `span ${width}`;
    child.style.gridRow = row ? `${row} / span ${height}` : `span ${height}`;
  }
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
      style.textContent = componentStyles;
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
        if (["state", "memory", "input", "derived", "resource", "routine", "effect"].includes(node.type)) return;
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
          if (!layoutNames.has(name) && !["key", "ref"].includes(name)) inputs[name] = inputValue;
        }
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
        this.usedChildIdentities.add(identity);
        applyPlacement(element, values);
        if (values.class) {
          for (const className of String(values.class).split(/\s+/).filter(Boolean)) element.classList.add(className);
        }
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

      const spec = designSpec(node.kind, context.design);
      this.watch(spec.waitingFor);
      const element = document.createElement(spec.tag);
      element.classList.add(`intent-${node.kind}`);
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
        else if (node.kind === "image") element[propertyName(spec, "src")] = String(content);
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

export function startIntention(program, options = {}) {
  const context = {
    design: options.design || {},
    components: new Map(),
    instances: new Set(),
    shared: {},
    sharedInitial: new Map(),
    refreshPending: false,
    basePath: normalizeBasePath(options.basePath || program.basePath),
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
