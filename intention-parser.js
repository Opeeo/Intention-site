const TOP_LEVEL = /^(application|start|library|shared|routes|theme|look|component)\b/;

export class IntentionSyntaxError extends Error {
  constructor(message, line) {
    super(`Ligne ${line}: ${message}`);
    this.name = "IntentionSyntaxError";
    this.line = line;
  }
}

function unquote(value, line) {
  const text = value.trim();
  if (!text.startsWith('"')) return text;
  try {
    return JSON.parse(text);
  } catch {
    throw new IntentionSyntaxError("texte entre guillemets invalide", line);
  }
}

function value(source, line) {
  const text = source.trim();
  if (text === "empty") return { type: "literal", value: "" };
  if (text === "[]" || text === "a list" || text === "an empty list") {
    return { type: "literal", value: [] };
  }
  if (text === "true" || text === "false") {
    return { type: "literal", value: text === "true" };
  }
  if (/^-?\d+(?:\.\d+)?$/.test(text)) {
    return { type: "literal", value: Number(text) };
  }
  if (text.startsWith("[") || text.startsWith("{")) {
    try {
      return { type: "literal", value: JSON.parse(text) };
    } catch {
      throw new IntentionSyntaxError("liste ou objet invalide", line);
    }
  }
  if (text.startsWith('"')) {
    return { type: "literal", value: unquote(text, line) };
  }
  return { type: "expression", value: text };
}

function splitArguments(source, line) {
  const argumentsList = [];
  let current = "";
  let quote = null;
  let depth = 0;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      current += character;
      if (character === quote && source[index - 1] !== "\\") quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      current += character;
      continue;
    }
    if ("([{".includes(character)) depth += 1;
    if (")]}".includes(character)) depth -= 1;
    if (character === "," && depth === 0) {
      argumentsList.push(current.trim());
      current = "";
      continue;
    }
    current += character;
  }

  if (quote || depth !== 0) {
    throw new IntentionSyntaxError("paramètres non terminés", line);
  }
  if (current.trim()) argumentsList.push(current.trim());
  return argumentsList;
}

function statement(text, line) {
  let match;

  if ((match = text.match(/^stylesheet\s*=\s*(.+)$/))) {
    return { type: "stylesheet", source: unquote(match[1], line), line };
  }

  if ((match = text.match(/^memory ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
    return { type: "memory", name: match[1], initial: value(match[2], line), line };
  }
  if ((match = text.match(/^load ([A-Za-z][\w]*) from (.+)$/))) {
    return { type: "resource", name: match[1], source: value(match[2], line), line };
  }
  if ((match = text.match(/^action ([A-Za-z][\w]*)(?:\(([A-Za-z][\w]*)\))?$/))) {
    return { type: "routine", name: match[1], parameter: match[2] || null, children: [], line };
  }
  if (text === "slot") {
    return { type: "slot", line };
  }
  if ((match = text.match(/^persist ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
    return { type: "state", name: match[1], initial: value(match[2], line), persistent: true, line };
  }
  if ((match = text.match(/^var ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
    return { type: "state", name: match[1], initial: value(match[2], line), line };
  }
  if ((match = text.match(/^input ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
    return { type: "input", name: match[1], initial: value(match[2], line), line };
  }
  if ((match = text.match(/^computed ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
    return { type: "derived", name: match[1], expression: match[2].trim(), line };
  }
  if ((match = text.match(/^if (.+)$/))) {
    return { type: "when", test: match[1].trim(), children: [], line };
  }
  if (text === "else") {
    return { type: "otherwise", children: [], line };
  }
  if ((match = text.match(/^on change of (.+)$/))) {
    return { type: "effect", trigger: "change", expression: match[1].trim(), children: [], line };
  }
  if ((match = text.match(/^on (mount|unmount)$/))) {
    return { type: "effect", trigger: match[1], children: [], line };
  }
  if ((match = text.match(/^on ([A-Za-z][\w-]*)$/))) {
    const events = { click: "clicked", change: "changed", submit: "submitted" };
    return { type: "when", test: events[match[1]] || match[1], event: true, children: [], line };
  }
  if ((match = text.match(/^each ([A-Za-z][\w]*) in (.+?)(?: where (.+?))?(?: key (.+))?$/))) {
    return {
      type: "each",
      item: match[1],
      collection: match[2].trim(),
      filter: match[3]?.trim() || null,
      key: match[4]?.trim() || null,
      children: [],
      line,
    };
  }
  if ((match = text.match(/^bind ([A-Za-z][\w.]*)$/))) {
    return { type: "bind", target: match[1], line };
  }
  if ((match = text.match(/^(disabled|hidden|checked) if (.+)$/))) {
    return { type: "property", name: match[1], test: match[2].trim(), line };
  }
  if (/^(var|persist|input|computed)\s*=/.test(text)) {
    throw new IntentionSyntaxError(`déclaration incomplète « ${text} »`, line);
  }
  if ((match = text.match(/^emit ([A-Za-z][\w-]*)(?: with (.+))?$/))) {
    return {
      type: "action",
      action: "emit",
      event: match[1],
      value: match[2] ? value(match[2], line) : null,
      line,
    };
  }
  if ((match = text.match(/^do ([A-Za-z][\w]*)(?: with (.+))?$/))) {
    return { type: "action", action: "routine", routine: match[1], value: match[2] ? value(match[2], line) : null, line };
  }
  if ((match = text.match(/^(focus|play|pause) ([A-Za-z][\w-]*)$/))) {
    return { type: "action", action: match[1], reference: match[2], line };
  }
  if ((match = text.match(/^scroll to ([A-Za-z][\w-]*)$/))) {
    return { type: "action", action: "scroll", reference: match[1], line };
  }
  if ((match = text.match(/^(notify|log) (.+)$/))) {
    return { type: "action", action: match[1], value: value(match[2], line), line };
  }
  if ((match = text.match(/^reset ([A-Za-z][\w.]*)$/))) {
    return { type: "action", action: "reset", target: match[1], line };
  }
  if ((match = text.match(/^([A-Za-z][\w.]*)\s*\+=\s*(.+)$/))) {
    return { type: "action", action: "plus", target: match[1], value: value(match[2], line), line };
  }
  if ((match = text.match(/^([A-Za-z][\w.]*)\s*-=\s*(.+)$/))) {
    return { type: "action", action: "minus", target: match[1], value: value(match[2], line), line };
  }
  if ((match = text.match(/^([A-Za-z][\w.]*)\s*=\s*(.+)$/))) {
    return { type: "action", action: "set", target: match[1], value: value(match[2], line), line };
  }

  if ((match = text.match(/^remember ([A-Za-z][\w]*) starting at (.+)$/))) {
    return { type: "state", name: match[1], initial: value(match[2], line), line };
  }
  if ((match = text.match(/^receive ([A-Za-z][\w]*)(?: starting at (.+))?$/))) {
    return {
      type: "input",
      name: match[1],
      initial: match[2] ? value(match[2], line) : { type: "literal", value: null },
      line,
    };
  }
  if ((match = text.match(/^show ([A-Za-z][\w.-]*)(?:\s+(.+))?$/))) {
    return {
      type: "show",
      kind: match[1],
      content: match[2] ? value(match[2], line) : null,
      children: [],
      line,
    };
  }
  if ((match = text.match(/^when (.+)$/))) {
    return { type: "when", test: match[1].trim(), children: [], line };
  }
  if ((match = text.match(/^for each ([A-Za-z][\w]*) in (.+)$/))) {
    return {
      type: "each",
      item: match[1],
      collection: match[2].trim(),
      children: [],
      line,
    };
  }
  if ((match = text.match(/^bind to ([A-Za-z][\w.]*)$/))) {
    return { type: "bind", target: match[1], line };
  }
  if ((match = text.match(/^(disabled|hidden|checked) when (.+)$/))) {
    return { type: "property", name: match[1], test: match[2].trim(), line };
  }
  if ((match = text.match(/^give ([A-Za-z][\w]*) as (.+)$/))) {
    return { type: "give", name: match[1], value: value(match[2], line), line };
  }
  if ((match = text.match(/^increase ([A-Za-z][\w.]*)(?: by (.+))?$/))) {
    return { type: "action", action: "increase", target: match[1], amount: value(match[2] || "1", line), line };
  }
  if ((match = text.match(/^decrease ([A-Za-z][\w.]*)(?: by (.+))?$/))) {
    return { type: "action", action: "decrease", target: match[1], amount: value(match[2] || "1", line), line };
  }
  if ((match = text.match(/^set ([A-Za-z][\w.]*) to (.+)$/))) {
    return { type: "action", action: "set", target: match[1], value: value(match[2], line), line };
  }
  if ((match = text.match(/^toggle ([A-Za-z][\w.]*)$/))) {
    return { type: "action", action: "toggle", target: match[1], line };
  }
  if ((match = text.match(/^empty ([A-Za-z][\w.]*)$/))) {
    return { type: "action", action: "empty", target: match[1], line };
  }
  if ((match = text.match(/^add (.+) to ([A-Za-z][\w.]*)$/))) {
    return { type: "action", action: "add", target: match[2], value: value(match[1], line), line };
  }
  if ((match = text.match(/^remove (.+) from ([A-Za-z][\w.]*)$/))) {
    return { type: "action", action: "remove", target: match[2], value: value(match[1], line), line };
  }

  if (/^(var|persist|memory|load|action|input|computed|if|else|on|each|bind|emit|do|focus|play|pause|scroll|notify|log|reset)\b/.test(text)) {
    throw new IntentionSyntaxError(`instruction incomplète « ${text} »`, line);
  }

  if ((match = text.match(/^([A-Za-z][\w.-]*)(?:\((.*)\))?(?:\s+(.+))?$/))) {
    const children = [];
    if (match[2]?.trim()) {
      for (const argument of splitArguments(match[2], line)) {
        const argumentMatch = argument.match(/^([A-Za-z][\w]*)\s*(?::|=)\s*(.+)$/);
        if (!argumentMatch) {
          throw new IntentionSyntaxError(`paramètre invalide « ${argument} »`, line);
        }
        children.push({
          type: "give",
          name: argumentMatch[1],
          value: ["look", "enter"].includes(argumentMatch[1])
            ? { type: "literal", value: unquote(argumentMatch[2], line) }
            : value(argumentMatch[2], line),
          line,
        });
      }
    }
    return {
      type: "show",
      kind: match[1],
      content: match[3] ? value(match[3], line) : null,
      children,
      line,
    };
  }

  throw new IntentionSyntaxError(`instruction inconnue « ${text} »`, line);
}

export function parseIntention(source, filename = "app.intent") {
  const program = {
    version: "0.8",
    filename,
    application: "Intention application",
    start: null,
    libraries: [],
    routes: [],
    shared: [],
    theme: {},
    looks: [],
    components: [],
  };
  const stack = [];

  for (const [index, raw] of source.replace(/\r\n?/g, "\n").split("\n").entries()) {
    const line = index + 1;
    if (!raw.trim() || raw.trimStart().startsWith("#")) continue;
    if (raw.includes("\t")) {
      throw new IntentionSyntaxError("utilisez des espaces plutôt que des tabulations", line);
    }

    const indent = raw.length - raw.trimStart().length;
    const text = raw.trim().replace(/:\s*$/, "");
    if (indent % 2 !== 0) {
      throw new IntentionSyntaxError("l'indentation doit avancer par groupes de deux espaces", line);
    }

    if (indent === 0) {
      stack.length = 0;
      let match;
      if ((match = text.match(/^application(?:\s*=)?\s+(.+)$/))) {
        program.application = unquote(match[1], line);
      } else if ((match = text.match(/^start\s*=\s*([A-Za-z][\w]*)$/))) {
        program.start = match[1];
      } else if ((match = text.match(/^start with\s+([A-Za-z][\w]*)$/))) {
        program.start = match[1];
      } else if ((match = text.match(/^library\s*=\s*(.+)$/))) {
        program.libraries.push(unquote(match[1], line));
      } else if ((match = text.match(/^shared ([A-Za-z][\w]*)\s*=\s*(.+)$/))) {
        program.shared.push({ name: match[1], initial: value(match[2], line), line });
      } else if (text === "routes") {
        stack.push({ indent: 0, kind: "routes" });
      } else if (text === "theme") {
        stack.push({ indent: 0, kind: "theme" });
      } else if ((match = text.match(/^look\s+([A-Z][A-Za-z0-9_]*)$/))) {
        const look = { name: match[1], declarations: [], responsive: [], line };
        program.looks.push(look);
        stack.push({ indent: 0, kind: "look", look });
      } else if ((match = text.match(/^component\s+([A-Za-z][\w]*)$/))) {
        const component = { name: match[1], body: [], line };
        program.components.push(component);
        stack.push({ indent: 0, children: component.body });
      } else {
        const hint = TOP_LEVEL.test(text) ? "instruction principale incomplète" : "instruction principale inconnue";
        throw new IntentionSyntaxError(`${hint} « ${text} »`, line);
      }
      continue;
    }

    if (!stack.length) {
      throw new IntentionSyntaxError("cette instruction doit être placée dans un bloc", line);
    }
    while (stack.length && stack.at(-1).indent >= indent) stack.pop();
    if (!stack.length) {
      throw new IntentionSyntaxError("indentation inattendue", line);
    }
    if (stack.at(-1).indent !== indent - 2) {
      throw new IntentionSyntaxError("l'indentation a sauté un niveau", line);
    }

    if (stack.at(-1).kind === "routes") {
      const route = text.match(/^([A-Za-z][\w]*)\s*:\s*(.+)$/);
      if (!route) {
        throw new IntentionSyntaxError("route invalide, utilisez Nom: \"/chemin\"", line);
      }
      const routePath = unquote(route[2], line);
      const routeSegments = routePath === "*" ? [] : routePath.split("/");
      if (routePath !== "*" && (!routePath.startsWith("/") || routePath.includes("?") || routePath.includes("#")
        || routePath.includes("\\") || routeSegments.some((segment) => segment === "." || segment === ".."))) {
        throw new IntentionSyntaxError("le chemin d'une route doit commencer par /, ou valoir * pour la page introuvable", line);
      }
      const parameters = routeSegments.filter((segment) => segment.startsWith(":"));
      if (parameters.some((parameter) => !/^:[A-Za-z][\w]*$/.test(parameter))
        || new Set(parameters).size !== parameters.length) {
        throw new IntentionSyntaxError("paramètre de route invalide ou répété", line);
      }
      const normalizedPath = routePath === "/" || routePath === "*" ? routePath : routePath.replace(/\/+$/, "");
      program.routes.push({ name: route[1], path: normalizedPath, component: route[1], line });
      continue;
    }

    if (stack.at(-1).kind === "theme") {
      const group = text.match(/^([A-Za-z][\w-]*)$/);
      if (!group) throw new IntentionSyntaxError("groupe de thème attendu", line);
      if (program.theme[group[1]]) throw new IntentionSyntaxError(`groupe de thème « ${group[1]} » déjà défini`, line);
      program.theme[group[1]] = {};
      stack.push({ indent, kind: "theme-group", group: group[1] });
      continue;
    }

    if (stack.at(-1).kind === "theme-group") {
      const token = text.match(/^([A-Za-z][\w-]*)\s*=\s*(.+)$/);
      if (!token) throw new IntentionSyntaxError("token attendu sous la forme nom = valeur", line);
      const tokens = program.theme[stack.at(-1).group];
      if (tokens[token[1]] != null) throw new IntentionSyntaxError(`token « ${token[1]} » déjà défini`, line);
      tokens[token[1]] = unquote(token[2], line);
      continue;
    }

    if (stack.at(-1).kind === "look" || stack.at(-1).kind === "look-responsive") {
      const parent = stack.at(-1);
      const responsive = parent.kind === "look-responsive" ? parent.responsive : null;
      const responsiveMatch = text.match(/^on\s+([A-Za-z][\w-]*)$/);
      if (responsiveMatch && parent.kind === "look") {
        const adaptation = { breakpoint: responsiveMatch[1], declarations: [], line };
        parent.look.responsive.push(adaptation);
        stack.push({ indent, kind: "look-responsive", responsive: adaptation });
        continue;
      }
      const declaration = text.match(/^([A-Za-z][\w-]*)(?:\s+(.+))$/);
      if (!declaration) throw new IntentionSyntaxError("propriété de look attendue", line);
      (responsive ? responsive.declarations : parent.look.declarations).push({
        name: declaration[1],
        values: declaration[2].trim().split(/\s+/),
        line,
      });
      continue;
    }

    if (stack.at(-1).kind === "style-rule") {
      const declaration = text.match(/^([A-Za-z-][\w-]*)\s*:\s*(.+)$/);
      if (!declaration) {
        throw new IntentionSyntaxError("propriété de style invalide, utilisez propriété: valeur", line);
      }
      stack.at(-1).declarations.push({
        property: declaration[1],
        value: declaration[2].trim(),
        line,
      });
      continue;
    }

    if (stack.at(-1).kind === "style") {
      const selector = unquote(text, line).trim();
      if (!selector) throw new IntentionSyntaxError("sélecteur de style manquant", line);
      const rule = { selector, declarations: [], line };
      stack.at(-1).rules.push(rule);
      stack.push({ indent, kind: "style-rule", declarations: rule.declarations });
      continue;
    }

    if (text === "style") {
      const node = { type: "style", rules: [], line };
      stack.at(-1).children.push(node);
      stack.push({ indent, kind: "style", rules: node.rules });
      continue;
    }

    const node = statement(text, line);
    const siblings = stack.at(-1).children;
    if (node.type === "otherwise") {
      const previous = siblings.at(-1);
      if (previous?.type !== "when" || previous.event) {
        throw new IntentionSyntaxError("« else » doit suivre directement un bloc « if »", line);
      }
    }
    siblings.push(node);
    if (node.children) stack.push({ indent, children: node.children });
  }

  if (!program.components.length) {
    throw new IntentionSyntaxError("au moins un composant est nécessaire", 1);
  }
  const componentNames = new Set(program.components.map((component) => component.name));
  const lookNames = new Set();
  for (const look of program.looks) {
    if (lookNames.has(look.name)) throw new IntentionSyntaxError(`look « ${look.name} » déjà défini`, look.line);
    lookNames.add(look.name);
  }
  const sharedNames = new Set();
  for (const item of program.shared) {
    if (sharedNames.has(item.name)) {
      throw new IntentionSyntaxError(`l'état partagé « ${item.name} » est déclaré plusieurs fois`, item.line);
    }
    sharedNames.add(item.name);
  }
  const routeNames = new Set();
  const routePaths = new Set();
  for (const route of program.routes) {
    if (routeNames.has(route.name)) {
      throw new IntentionSyntaxError(`la route « ${route.name} » est déclarée plusieurs fois`, route.line);
    }
    if (routePaths.has(route.path)) {
      throw new IntentionSyntaxError(`le chemin « ${route.path} » est utilisé plusieurs fois`, route.line);
    }
    if (!componentNames.has(route.component)) {
      throw new IntentionSyntaxError(`la route « ${route.name} » attend un composant du même nom`, route.line);
    }
    routeNames.add(route.name);
    routePaths.add(route.path);
  }
  program.start ||= program.routes[0]?.component || program.components[0].name;
  if (!componentNames.has(program.start)) {
    throw new IntentionSyntaxError(`le composant de départ « ${program.start} » n'existe pas`, 1);
  }
  return program;
}
