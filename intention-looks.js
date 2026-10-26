function kebab(value) {
  return String(value).replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}

function themeReference(program, group, value) {
  return program.theme?.[group]?.[value] == null
    ? value
    : `var(--intent-${kebab(group)}-${kebab(value)})`;
}

function expandLook(program, name, trail = []) {
  if (trail.includes(name)) throw new Error(`Héritage circulaire de look : ${[...trail, name].join(" → ")}`);
  const look = (program.looks || []).find((candidate) => candidate.name === name);
  if (!look) throw new Error(`Look inconnu « ${name} »`);
  const expanded = { declarations: [], responsive: new Map() };
  const parents = look.declarations.filter((item) => item.name === "use").flatMap((item) => item.values);
  for (const parent of parents) {
    const inherited = expandLook(program, parent, [...trail, name]);
    expanded.declarations.push(...inherited.declarations);
    for (const [breakpoint, declarations] of inherited.responsive) {
      expanded.responsive.set(breakpoint, [...(expanded.responsive.get(breakpoint) || []), ...declarations]);
    }
  }
  expanded.declarations.push(...look.declarations.filter((item) => item.name !== "use"));
  for (const adaptation of look.responsive || []) {
    expanded.responsive.set(adaptation.breakpoint, [
      ...(expanded.responsive.get(adaptation.breakpoint) || []),
      ...adaptation.declarations,
    ]);
  }
  return expanded;
}

function declarationCss(program, declaration) {
  const value = declaration.values.join(" ");
  const first = declaration.values[0];
  const spacing = () => declaration.values.map((item) => themeReference(program, "spacing", item)).join(" ");
  switch (declaration.name) {
    case "surface":
    case "fill": return { base: `background:${themeReference(program, "colors", first)}` };
    case "text": return { base: `color:${themeReference(program, "colors", first)}` };
    case "spacing": return { base: `padding:${spacing()}` };
    case "gap": return { base: `gap:${themeReference(program, "spacing", first)}` };
    case "corners": return { base: `border-radius:${themeReference(program, "corners", first)}` };
    case "shadow": return { base: `box-shadow:${themeReference(program, "shadows", first)}` };
    case "border": return { base: `border:${themeReference(program, "borders", first)}` };
    case "size": return { base: `font-size:${themeReference(program, "sizes", first)}` };
    case "weight": return { base: `font-weight:${({ regular: 400, medium: 600, strong: 800 })[first] || first}` };
    case "width": return { base: `width:${first === "full" ? "100%" : first === "content" ? "fit-content" : value}` };
    case "height": return { base: `height:${first === "full" ? "100%" : first === "content" ? "fit-content" : value}` };
    case "max-width": return { base: `max-width:${value}` };
    case "leading": return { base: `line-height:${first === "tight" ? "1" : first === "comfortable" ? "1.65" : value}` };
    case "tracking": return { base: `letter-spacing:${first === "tight" ? "-.045em" : first === "wide" ? ".08em" : value}` };
    case "opacity": return { base: `opacity:${value}` };
    case "align": {
      const alignment = first === "start" ? "flex-start" : first === "end" ? "flex-end" : first;
      return { base: `text-align:${first};align-items:${alignment}` };
    }
    case "justify": {
      const alignment = first === "between" ? "space-between" : first === "around" ? "space-around" : first;
      return { base: `justify-content:${alignment}` };
    }
    case "layout": {
      if (first === "stack") return { base: "display:flex;flex-direction:column" };
      if (first === "row") return { base: "display:flex;flex-direction:row;align-items:center;flex-wrap:wrap" };
      if (first === "grid") return { base: "display:grid" };
      break;
    }
    case "columns": return { base: `grid-template-columns:repeat(${Number(first) || 1},minmax(0,1fr))` };
    case "transition": return { base: `transition:${first === "smooth" ? "transform .2s ease, filter .2s ease, box-shadow .2s ease" : value}` };
    case "hover": {
      if (first === "lift") return { hover: "transform:translateY(-4px)" };
      if (first === "brighten") return { hover: "filter:brightness(1.08)" };
      if (first === "glow") return { hover: "filter:drop-shadow(0 10px 20px color-mix(in srgb, currentColor 25%, transparent))" };
      break;
    }
    case "press": {
      if (first === "shrink") return { active: "transform:scale(.97)" };
      break;
    }
  }
  throw new Error(`Ligne ${declaration.line}: intention visuelle inconnue « ${declaration.name} ${value} »`);
}

function rulesFor(program, selector, declarations) {
  const states = { base: [], hover: [], active: [] };
  for (const declaration of declarations) {
    const converted = declarationCss(program, declaration);
    for (const [state, css] of Object.entries(converted)) states[state].push(css);
  }
  return [
    states.base.length ? `${selector}{${states.base.join(";")}}` : "",
    states.hover.length ? `${selector}:hover{${states.hover.join(";")}}` : "",
    states.active.length ? `${selector}:active{${states.active.join(";")}}` : "",
  ].filter(Boolean).join("\n");
}

export function lookNames(value) {
  return String(value || "").split("+").map((item) => item.trim()).filter(Boolean);
}

export function lookClassNames(value, program) {
  return lookNames(value).map((name) => {
    if (!(program.looks || []).some((look) => look.name === name)) throw new Error(`Look inconnu « ${name} »`);
    return `intent-look-${kebab(name)}`;
  });
}

export function compileLookCss(program, options = {}) {
  const rootSelector = options.rootSelector || ":host";
  const selectorPrefix = options.selectorPrefix || "";
  const variables = Object.entries(program.theme || {}).flatMap(([group, tokens]) =>
    Object.entries(tokens).map(([name, value]) => `--intent-${kebab(group)}-${kebab(name)}:${value}`));
  const rules = [];
  for (const look of program.looks || []) {
    const selector = `${selectorPrefix}.intent-look-${kebab(look.name)}`;
    const expanded = expandLook(program, look.name);
    rules.push(rulesFor(program, selector, expanded.declarations));
    for (const [breakpoint, declarations] of expanded.responsive) {
      const boundary = program.theme?.breakpoints?.[breakpoint];
      if (boundary == null) throw new Error(`Breakpoint inconnu « ${breakpoint} » dans le look « ${look.name} »`);
      rules.push(`@media(max-width:${Number(boundary)}px){${rulesFor(program, selector, declarations)}}`);
    }
  }
  return `${rootSelector}{${variables.join(";")}}\n${rules.filter(Boolean).join("\n")}`;
}
