import "../vendor/webawesome/components/badge/badge.js";
import "../vendor/webawesome/components/button/button.js";
import "../vendor/webawesome/components/card/card.js";
import "../vendor/webawesome/components/copy-button/copy-button.js";
import "../vendor/webawesome/components/tag/tag.js";
import { setBasePath } from "../vendor/webawesome/utilities/base-path.js";

setBasePath(new URL("../vendor/webawesome/", import.meta.url).href);

const brandLogoUrl = new URL("./intention-logo-curved.png", import.meta.url).href;
const ribbonLogoUrl = new URL("./intention-ribbon.png", import.meta.url).href;
const browserParserUrl = new URL("../intention-parser.js", import.meta.url).href;
const browserRuntimeUrl = new URL("../intention-runtime.js", import.meta.url).href;

function installBrandIcons() {
  const icons = [
    ["icon", "image/png"],
    ["apple-touch-icon", "image/png"],
  ];
  for (const [rel, type] of icons) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = rel;
      document.head.append(link);
    }
    link.type = type;
    link.href = ribbonLogoUrl;
  }
}

installBrandIcons();

document.documentElement.classList.add("wa-theme-default");
document.documentElement.style.scrollBehavior = "smooth";

const webAwesomeStyle = document.createElement("link");
webAwesomeStyle.rel = "stylesheet";
webAwesomeStyle.href = new URL("../vendor/webawesome/styles/webawesome.css", import.meta.url).href;
document.head.append(webAwesomeStyle);

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  :root {
    color-scheme: light;
    --ink: #12131a;
    --muted: #656778;
    --paper: #f7f7fb;
    --brand: #6c4cff;
    --brand-2: #15c8a0;
    --wa-color-brand-50: #f3f0ff;
    --wa-color-brand-100: #e7e0ff;
    --wa-color-brand-500: #7658ff;
    --wa-color-brand-600: #6545f5;
    --wa-color-brand-700: #5437db;
    --wa-font-family-body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --wa-border-radius-m: .85rem;
    --wa-border-radius-l: 1.25rem;
  }
  * { box-sizing: border-box; }
  body { margin: 0; min-width: 320px; background: var(--paper); color: var(--ink); }
  ::selection { background: #6c4cff33; }
`;
document.head.append(globalStyle);

const icons = {
  read: "M4 5.5A2.5 2.5 0 0 1 6.5 3H11a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H4V5.5Zm16 0A2.5 2.5 0 0 0 17.5 3H14a3 3 0 0 0-3 3v15a3 3 0 0 1 3-3h6V5.5Z",
  react: "M12 3v18M3 12h18M5.64 5.64l12.72 12.72M18.36 5.64 5.64 18.36",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  blocks: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  shield: "M12 3 5 6v5c0 4.7 2.8 8.2 7 10 4.2-1.8 7-5.3 7-10V6l-7-3Z",
  bolt: "m13 2-8 12h6l-1 8 9-13h-6V2Z",
};

function define(name, constructor) {
  if (!customElements.get(name)) customElements.define(name, constructor);
}

class SlotElement extends HTMLElement {
  constructor(css, markup = '<slot></slot>') {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>${css}</style>${markup}`;
  }
}

class SiteShell extends SlotElement {
  constructor() {
    super(`
      :host { display: block; position: relative; overflow: visible; background: #f8f8fc; color: #161720; }
      .glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(700px circle at var(--x, 75%) var(--y, 7%), #7658ff20, transparent 55%); transition: background .2s; }
      .grain { position: absolute; inset: 0; pointer-events: none; opacity: .16; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E"); }
      .content { position: relative; }
    `, '<div class="glow"></div><div class="grain"></div><div class="content"><slot></slot></div>');
    this.move = (event) => {
      this.style.setProperty("--x", `${event.clientX}px`);
      this.style.setProperty("--y", `${event.clientY + window.scrollY}px`);
    };
  }
  connectedCallback() { window.addEventListener("pointermove", this.move, { passive: true }); }
  disconnectedCallback() { window.removeEventListener("pointermove", this.move); }
}

class SiteNavbar extends SlotElement {
  constructor() {
    super(`
      :host { display: block; position: sticky; top: 0; z-index: 20; border-bottom: 1px solid #17182410; background: #f8f8fccc; backdrop-filter: blur(18px) saturate(150%); }
      nav { max-width: 1180px; margin: auto; min-height: 74px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
      ::slotted(*) { min-width: 0; }
      @media (max-width: 760px) { nav { min-height: 64px; padding: 0 16px; } ::slotted(intent-nav-links) { display: none; } }
    `, '<nav><slot></slot></nav>');
  }
}

class BrandMark extends SlotElement {
  constructor() {
    super(`
      :host { display: inline-flex; align-items: center; flex: 0 0 auto; }
      img { display: block; object-fit: contain; }
      .full { width: 132px; height: 44px; }
      .compact { display: none; width: 38px; height: 38px; }
      .label { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
      @media (max-width: 560px) {
        .full { display: none; }
        .compact { display: block; }
      }
    `, `
      <img class="full" src="${brandLogoUrl}" alt="" aria-hidden="true">
      <img class="compact" src="${ribbonLogoUrl}" alt="" aria-hidden="true">
      <span class="label"><slot></slot></span>
    `);
  }
}

class NavLinks extends SlotElement {
  constructor() { super(':host { display: flex; align-items: center; gap: 4px; margin-left: auto; }'); }
}

class HeroSection extends SlotElement {
  constructor() {
    super(`
      :host { display: grid; grid-template-columns: minmax(0, 1.03fr) minmax(420px, .97fr); align-items: center; gap: clamp(38px, 7vw, 90px); max-width: 1180px; min-height: 720px; margin: auto; padding: 88px 24px 100px; }
      @media (max-width: 920px) { :host { grid-template-columns: 1fr; min-height: auto; padding-top: 64px; } }
      @media (max-width: 560px) { :host { padding: 48px 16px 72px; } }
    `);
  }
}

class HeroCopy extends SlotElement {
  constructor() { super(':host { display: flex; flex-direction: column; align-items: flex-start; gap: 22px; }'); }
}

class DisplayTitle extends SlotElement {
  constructor() {
    super(`
      :host { display: block; max-width: 760px; font-size: clamp(3.35rem, 7.2vw, 6.6rem); line-height: .93; letter-spacing: -.075em; font-weight: 900; background: linear-gradient(125deg, #11121a 20%, #6545f5 72%, #17a985); -webkit-background-clip: text; background-clip: text; color: transparent; text-wrap: balance; }
    `);
  }
}

class LeadText extends SlotElement {
  constructor() { super(':host { display: block; max-width: 670px; color: #666979; font-size: clamp(1.05rem, 1.8vw, 1.28rem); line-height: 1.65; text-wrap: pretty; }'); }
}

class ActionRow extends SlotElement {
  constructor() { super(':host { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }'); }
}

class TrustLine extends SlotElement {
  constructor() { super(':host { display: block; color: #898b98; font-size: .86rem; font-weight: 650; letter-spacing: .02em; }'); }
}

class HeroVisual extends SlotElement {
  constructor() { super(':host { display: block; min-width: 0; animation: float-in .9s .2s cubic-bezier(.2,.75,.2,1) both; } @keyframes float-in { from { opacity: 0; transform: translateY(30px) rotate(1.5deg); } }'); }
}

class ShowcaseStack extends SlotElement {
  constructor() {
    super(`
      :host { display: grid; position: relative; gap: 16px; }
      :host::before { content: ""; position: absolute; inset: 12% -12% 8%; z-index: -1; border-radius: 50%; background: linear-gradient(135deg, #7658ff44, #15c8a044); filter: blur(55px); }
      ::slotted(intent-counter-demo) { width: 82%; margin: -48px 0 0 auto; position: relative; z-index: 2; }
      @media (max-width: 560px) { ::slotted(intent-counter-demo) { width: 94%; margin-top: -26px; } }
    `);
  }
}

class CodeWindow extends HTMLElement {
  static observedAttributes = ["label"];
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._code = "";
  }
  set code(value) { this._code = String(value ?? ""); this.render(); }
  get code() { return this._code; }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    const code = this._code || this.textContent || "";
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; min-width: 0; }
        .window { overflow: hidden; border: 1px solid #ffffff18; border-radius: 20px; background: #171821; box-shadow: 0 28px 70px #26213d2e; color: #ececf4; }
        .bar { min-height: 48px; display: flex; align-items: center; gap: 8px; padding: 0 16px; border-bottom: 1px solid #ffffff12; background: #1d1e28; color: #989aaa; font: 650 .76rem ui-monospace, SFMono-Regular, Menlo, monospace; }
        .dots { display: flex; gap: 6px; margin-right: 6px; }
        .dots i { width: 9px; height: 9px; border-radius: 50%; background: #ff6b6b; }
        .dots i:nth-child(2) { background: #ffd166; } .dots i:nth-child(3) { background: #46d99a; }
        .bar wa-copy-button { margin-left: auto; }
        pre { margin: 0; padding: 24px; overflow: auto; font: 500 clamp(.76rem, 1.45vw, .92rem)/1.75 ui-monospace, SFMono-Regular, Menlo, monospace; tab-size: 2; }
        code { white-space: pre; }
        .keyword { color: #c9a7ff; } .string { color: #82e7bd; } .number { color: #ffc777; } .event { color: #73c9ff; }
      </style>
      <div class="window">
        <div class="bar"><span class="dots"><i></i><i></i><i></i></span><span>${escapeHtml(this.getAttribute("label") || "app.intent")}</span><wa-copy-button></wa-copy-button></div>
        <pre><code></code></pre>
      </div>`;
    const codeNode = this.shadowRoot.querySelector("code");
    codeNode.innerHTML = highlight(code);
    const copy = this.shadowRoot.querySelector("wa-copy-button");
    copy.value = code;
    copy.copyLabel = "Copier le code";
    copy.successLabel = "Code copié";
  }
}

class DemoCard extends SlotElement {
  constructor() {
    super(`
      :host { display: block; }
      wa-card { width: 100%; --spacing: 20px; }
      wa-card::part(base) { border: 1px solid #ffffff; background: #ffffffee; box-shadow: 0 22px 60px #241b5430; backdrop-filter: blur(16px); }
      .body { display: grid; gap: 13px; }
      ::slotted(h1) { margin: 4px 0 0; font-size: 1.08rem; letter-spacing: -.025em; }
      ::slotted(p) { margin: 0; color: #717382; line-height: 1.5; font-size: .9rem; }
      ::slotted(div) { margin-top: 5px; }
    `, '<wa-card><div class="body"><slot></slot></div></wa-card>');
  }
}

class DemoNumber extends SlotElement {
  constructor() { super(':host { display: inline-grid; min-width: 72px; place-items: center; font-size: 2rem; font-weight: 900; letter-spacing: -.06em; color: #5e42df; }'); }
}

class MetricsRow extends SlotElement {
  constructor() {
    super(`
      :host { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1180px; margin: 0 auto 70px; padding: 24px; border: 1px solid #17182410; border-radius: 22px; background: #ffffffa8; box-shadow: 0 18px 50px #2520380b; }
      @media (max-width: 720px) { :host { grid-template-columns: repeat(2, 1fr); margin-inline: 16px; padding: 12px; } }
    `);
  }
}

class MetricItem extends HTMLElement {
  static observedAttributes = ["value", "label"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = `<style>:host{display:grid;gap:4px;text-align:center;padding:22px 12px;border-right:1px solid #1718240d}:host(:last-child){border:0}.value{font-size:clamp(1.7rem,3vw,2.6rem);font-weight:900;letter-spacing:-.06em;color:#6545f5}.label{font-size:.78rem;color:#777988;font-weight:650}</style><span class="value">${escapeHtml(this.getAttribute("value") || "")}</span><span class="label">${escapeHtml(this.getAttribute("label") || "")}</span>`;
  }
}

class RevealSection extends SlotElement {
  constructor() {
    super(`
      :host { display: block; opacity: 0; transform: translateY(42px) scale(.985); transition: opacity .8s cubic-bezier(.2,.75,.2,1), transform .8s cubic-bezier(.2,.75,.2,1); transition-delay: var(--delay, 0ms); }
      :host([visible]) { opacity: 1; transform: none; }
      @media (prefers-reduced-motion: reduce) { :host { opacity: 1; transform: none; transition: none; } }
    `);
  }
  connectedCallback() {
    this.style.setProperty("--delay", `${Number(this.getAttribute("delay") || 0)}ms`);
    if (!window.IntersectionObserver) { this.setAttribute("visible", ""); return; }
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { this.setAttribute("visible", ""); this.observer.disconnect(); }
    }, { threshold: .12, rootMargin: "0px 0px -50px" });
    this.observer.observe(this);
  }
  disconnectedCallback() { this.observer?.disconnect(); }
}

class MarketingSection extends SlotElement {
  static observedAttributes = ["tone"];
  constructor() {
    super(`
      :host { display: block; padding: clamp(82px, 11vw, 140px) 24px; scroll-margin-top: 82px; }
      .inside { max-width: 1180px; margin: auto; }
      :host([tone="soft"]) { background: #efeff8; }
      :host([tone="dark"]) { color: #f5f4ff; background: #171821; }
      :host([tone="dark"]) ::slotted(*) { --section-muted: #adafbd; }
      @media (max-width: 560px) { :host { padding-inline: 16px; } }
    `, '<section class="inside"><slot></slot></section>');
  }
}

class EyebrowLabel extends SlotElement {
  constructor() { super(':host { display: block; margin-bottom: 16px; color: #6545f5; font-size: .78rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }'); }
}

class SectionTitle extends SlotElement {
  constructor() { super(':host { display: block; max-width: 900px; margin-bottom: 18px; font-size: clamp(2.25rem, 5vw, 4.7rem); line-height: 1; letter-spacing: -.065em; font-weight: 900; text-wrap: balance; }'); }
}

class SectionLead extends SlotElement {
  constructor() { super(':host { display: block; max-width: 760px; margin-bottom: 48px; color: var(--section-muted, #696b7a); font-size: clamp(1rem, 1.7vw, 1.2rem); line-height: 1.7; text-wrap: pretty; }'); }
}

class FeatureCard extends SlotElement {
  static observedAttributes = ["symbol"];
  constructor() {
    super(`
      :host { display: block; height: 100%; }
      wa-card { height: 100%; }
      wa-card::part(base) { height: 100%; border: 1px solid #1718240e; border-radius: 20px; background: #fff; box-shadow: 0 10px 35px #2520380a; transition: transform .28s ease, box-shadow .28s ease, border-color .28s ease; }
      wa-card::part(base):hover { transform: translateY(-7px); border-color: #6849f53d; box-shadow: 0 24px 55px #35266c18; }
      .body { display: grid; gap: 12px; padding: 6px; }
      .icon { width: 48px; height: 48px; display: grid; place-items: center; margin-bottom: 7px; border-radius: 14px; color: #6545f5; background: linear-gradient(145deg,#f0ecff,#e8fff8); }
      svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      ::slotted(h1) { margin: 0; font-size: 1.12rem; letter-spacing: -.03em; }
      ::slotted(p) { margin: 0; color: #727483; line-height: 1.65; font-size: .92rem; }
    `, '<wa-card><div class="body"><span class="icon"><svg viewBox="0 0 24 24"><path></path></svg></span><slot></slot></div></wa-card>');
  }
  connectedCallback() { this.updateIcon(); }
  attributeChangedCallback() { this.updateIcon(); }
  updateIcon() { this.shadowRoot.querySelector("path")?.setAttribute("d", icons[this.getAttribute("symbol")] || icons.bolt); }
}

class StepsRow extends SlotElement {
  constructor() { super(':host { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 48px; } @media(max-width:760px){:host{grid-template-columns:1fr}}'); }
}

class StepItem extends HTMLElement {
  static observedAttributes = ["number", "title", "description"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:28px;border-top:1px solid #1a1b251d;background:linear-gradient(180deg,#fff0,#fff8);border-radius:0 0 18px 18px}.n{display:block;margin-bottom:35px;color:#6545f5;font:800 .78rem ui-monospace,monospace}.t{display:block;margin-bottom:10px;font-size:1.16rem;font-weight:850;letter-spacing:-.03em}.d{color:#727483;font-size:.93rem;line-height:1.65}</style><span class="n">${escapeHtml(this.getAttribute("number") || "")}</span><strong class="t">${escapeHtml(this.getAttribute("title") || "")}</strong><span class="d">${escapeHtml(this.getAttribute("description") || "")}</span>`;
  }
}

class PrinciplesList extends SlotElement {
  constructor() { super(':host { display: grid; gap: 8px; }'); }
}

class PrincipleItem extends HTMLElement {
  static observedAttributes = ["symbol", "title", "description"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = `<style>:host{display:grid;grid-template-columns:42px 1fr;gap:14px;padding:14px 0}.symbol{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:#6849f514;color:#6545f5;font:800 .72rem ui-monospace,monospace}.title{display:block;margin-bottom:3px;font-weight:820;letter-spacing:-.02em}.description{display:block;color:#747684;font-size:.9rem;line-height:1.55}</style><span class="symbol">${escapeHtml(this.getAttribute("symbol") || "")}</span><span><strong class="title">${escapeHtml(this.getAttribute("title") || "")}</strong><span class="description">${escapeHtml(this.getAttribute("description") || "")}</span></span>`;
  }
}

class TechStrip extends SlotElement {
  constructor() { super(':host { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 8px; }'); }
}

class DocsGrid extends SlotElement {
  constructor() {
    super(`
      :host { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 42px; }
      @media(max-width:900px){:host{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:600px){:host{grid-template-columns:1fr}}
    `);
  }
}

class DocItem extends HTMLElement {
  static observedAttributes = ["keyword", "title", "description", "syntax"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    const keyword = escapeHtml(this.getAttribute("keyword") || "concept");
    const title = escapeHtml(this.getAttribute("title") || "Documentation");
    const description = escapeHtml(this.getAttribute("description") || "");
    const syntax = escapeHtml(this.getAttribute("syntax") || "");
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;height:100%}wa-card{height:100%}wa-card::part(base){height:100%;border:1px solid #1718240e;border-radius:18px;background:#fff;box-shadow:0 12px 35px #2520380a}.body{display:grid;gap:12px;padding:4px}.keyword{width:max-content;padding:5px 9px;border-radius:8px;color:#6545f5;background:#6849f512;font:750 .72rem ui-monospace,SFMono-Regular,Menlo,monospace}.title{font-size:1.06rem;font-weight:850;letter-spacing:-.025em}.description{min-height:44px;color:#717382;font-size:.88rem;line-height:1.55}.syntax{display:block;overflow:auto;padding:11px 12px;border-radius:10px;color:#dbd9e9;background:#1b1c25;font:500 .76rem/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap}
      </style>
      <wa-card><div class="body"><span class="keyword">${keyword}</span><strong class="title">${title}</strong><span class="description">${description}</span><code class="syntax">${syntax}</code></div></wa-card>`;
  }
}

class FaqList extends SlotElement {
  constructor() { super(':host{display:grid;gap:10px;max-width:900px;margin-top:38px}'); }
}

class FaqItem extends HTMLElement {
  static observedAttributes = ["question", "answer"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block}details{border:1px solid #17182410;border-radius:15px;background:#fff;box-shadow:0 8px 25px #25203808}summary{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 22px;cursor:pointer;font-weight:820;letter-spacing:-.02em;list-style:none}summary::-webkit-details-marker{display:none}summary::after{content:"+";width:28px;height:28px;display:grid;place-items:center;border-radius:9px;color:#6545f5;background:#6849f510;font-size:1.2rem;transition:transform .2s}details[open] summary::after{transform:rotate(45deg)}p{margin:0;padding:0 22px 22px;color:#707281;line-height:1.65;font-size:.93rem}
      </style>
      <details><summary>${escapeHtml(this.getAttribute("question") || "Question")}</summary><p>${escapeHtml(this.getAttribute("answer") || "")}</p></details>`;
  }
}

class DocsTabs extends HTMLElement {
  constructor() {
    super();
    this.activeIndex = 0;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;margin-top:42px}.tabs{display:flex;gap:7px;overflow:auto;padding:6px;border:1px solid #17182412;border-radius:16px;background:#fff;box-shadow:0 12px 35px #2520380a;scrollbar-width:thin}.tab{flex:0 0 auto;padding:11px 15px;border:0;border-radius:11px;color:#6d6f7e;background:transparent;font:780 .86rem/1 ui-sans-serif,system-ui;cursor:pointer;transition:color .2s,background .2s,box-shadow .2s}.tab:hover{color:#4f35c9;background:#6849f50b}.tab[aria-selected="true"]{color:#fff;background:#6545f5;box-shadow:0 8px 20px #6545f533}.panels{margin-top:18px}@media(max-width:600px){.tabs{border-radius:12px}.tab{padding:10px 12px;font-size:.8rem}}
      </style>
      <div class="tabs" role="tablist" aria-label="Documentation Intention"></div>
      <div class="panels"><slot></slot></div>`;
    this.slotElement = this.shadowRoot.querySelector("slot");
    this.slotElement.addEventListener("slotchange", () => this.renderTabs());
  }
  connectedCallback() { queueMicrotask(() => this.renderTabs()); }
  renderTabs() {
    const panels = this.slotElement.assignedElements().filter((element) => element.localName === "intention-doc-tab");
    if (!panels.length) return;
    this.activeIndex = Math.min(this.activeIndex, panels.length - 1);
    const tabs = this.shadowRoot.querySelector(".tabs");
    tabs.replaceChildren(...panels.map((panel, index) => {
      const button = document.createElement("button");
      button.className = "tab";
      button.type = "button";
      button.role = "tab";
      button.textContent = panel.getAttribute("label") || `Partie ${index + 1}`;
      button.setAttribute("aria-selected", String(index === this.activeIndex));
      button.addEventListener("click", () => { this.activeIndex = index; this.renderTabs(); });
      panel.toggleAttribute("active", index === this.activeIndex);
      return button;
    }));
  }
}

class DocTab extends SlotElement {
  constructor() {
    super(`
      :host{display:none;padding:clamp(24px,4vw,46px);border:1px solid #17182410;border-radius:22px;background:#fff;box-shadow:0 18px 55px #2520380b}
      :host([active]){display:block}
      ::slotted(intent-section-title){font-size:clamp(1.8rem,4vw,3.2rem);margin-bottom:14px}
      ::slotted(intent-section-lead){margin-bottom:28px}
      ::slotted(intent-code-window){margin-top:16px}
      ::slotted(intent-docs-grid){margin-top:24px}
    `);
  }
}

class DocumentationLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host{--sticky-gap:18px;display:block;max-width:1460px;margin:auto;padding:34px 24px 100px}
        .mobile{display:none;width:100%;margin-bottom:18px;padding:12px 14px;border:1px solid #17182416;border-radius:12px;background:#fff;color:#252631;font:780 .9rem system-ui;text-align:left;cursor:pointer}
        .layout{display:grid;grid-template-columns:230px minmax(0,790px) 190px;align-items:start;justify-content:center;gap:clamp(30px,4vw,64px)}
        aside{position:sticky;top:var(--sticky-gap);align-self:start;max-height:calc(100vh - var(--sticky-gap) - 24px);overflow:auto;scrollbar-width:thin;scrollbar-gutter:stable}
        .sidebar{padding-right:18px;border-right:1px solid #17182410}.toc{padding-left:2px}
        .title{display:block;margin:0 0 18px;color:#22232d;font-size:.76rem;font-weight:850;letter-spacing:.09em;text-transform:uppercase}
        .group{display:block;margin:22px 0 7px;color:#9697a3;font-size:.68rem;font-weight:850;letter-spacing:.1em;text-transform:uppercase}
        nav{display:grid;gap:2px}a{display:block;padding:7px 10px;border-radius:8px;color:#666876;font-size:.82rem;line-height:1.3;text-decoration:none;transition:color .18s,background .18s}
        a:hover{color:#5437db;background:#6849f50a}a.active{color:#5437db;background:#6849f512;font-weight:780}
        main{min-width:0}.toc nav{gap:5px}.toc a{padding:4px 0;border-radius:0;font-size:.76rem}.toc a.active{padding-left:9px;border-left:2px solid #6545f5;background:transparent}
        @media(max-width:1120px){.layout{grid-template-columns:220px minmax(0,790px)}.toc{display:none}}
        @media(max-width:780px){:host{padding:18px 16px 70px}.mobile{display:block}.layout{display:block}.sidebar{display:none;position:static;max-height:none;margin-bottom:24px;padding:18px;border:1px solid #17182412;border-radius:16px;background:#fff}.sidebar.open{display:block}main{width:100%}}
      </style>
      <button class="mobile" type="button" aria-expanded="false">Parcourir la documentation</button>
      <div class="layout">
        <aside class="sidebar"><strong class="title">Guide Intention</strong><nav aria-label="Chapitres"></nav></aside>
        <main><slot></slot></main>
        <aside class="toc"><strong class="title">Sur cette page</strong><nav aria-label="Sommaire de la page"></nav></aside>
      </div>`;
    this.slotElement = this.shadowRoot.querySelector("slot");
    this.slotElement.addEventListener("slotchange", () => this.buildNavigation());
    this.shadowRoot.querySelector(".mobile").addEventListener("click", () => {
      const sidebar = this.shadowRoot.querySelector(".sidebar");
      const open = sidebar.classList.toggle("open");
      this.shadowRoot.querySelector(".mobile").setAttribute("aria-expanded", String(open));
    });
  }
  connectedCallback() { queueMicrotask(() => this.buildNavigation()); }
  disconnectedCallback() { this.observer?.disconnect(); }
  buildNavigation() {
    const sections = this.slotElement.assignedElements().filter((element) => element.localName === "intention-doc-section" && element.id);
    if (!sections.length) return;
    this.observer?.disconnect();
    const sidebar = this.shadowRoot.querySelector(".sidebar nav");
    const toc = this.shadowRoot.querySelector(".toc nav");
    sidebar.replaceChildren();
    toc.replaceChildren();
    let currentGroup = "";
    for (const section of sections) {
      const group = section.getAttribute("group") || "Guide";
      const title = section.getAttribute("title") || section.id;
      if (group !== currentGroup) {
        const label = document.createElement("span");
        label.className = "group";
        label.textContent = group;
        sidebar.append(label);
        currentGroup = group;
      }
      sidebar.append(this.navigationLink(section.id, title));
      toc.append(this.navigationLink(section.id, title));
    }
    const initial = location.hash.slice(1) || sections[0].id;
    this.setActive(initial);
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];
      if (visible) this.setActive(visible.target.id);
    }, { rootMargin: "-12% 0px -72%", threshold: [0, .15, .5] });
    sections.forEach((section) => this.observer.observe(section));
  }
  navigationLink(id, title) {
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.dataset.section = id;
    link.textContent = title;
    link.addEventListener("click", () => {
      this.setActive(id);
      this.shadowRoot.querySelector(".sidebar").classList.remove("open");
      this.shadowRoot.querySelector(".mobile").setAttribute("aria-expanded", "false");
    });
    return link;
  }
  setActive(id) {
    this.shadowRoot.querySelectorAll("a[data-section]").forEach((link) => link.classList.toggle("active", link.dataset.section === id));
  }
}

class DocumentationSection extends SlotElement {
  constructor() {
    super(`
      :host{display:block;padding:34px 0 70px;scroll-margin-top:88px;border-bottom:1px solid #17182410}
      :host(:first-of-type){padding-top:20px}
      :host(:last-of-type){border-bottom:0}
      ::slotted(intent-eyebrow){margin-bottom:12px}
      ::slotted(intent-section-title){max-width:760px;margin-bottom:16px;font-size:clamp(2rem,5vw,4rem)}
      ::slotted(intent-section-lead){max-width:720px;margin-bottom:28px;font-size:1.05rem}
      ::slotted(intent-code-window),::slotted(intention-playground),::slotted(intent-docs-grid),::slotted(intent-principles){margin-top:22px}
      @media(max-width:600px){:host{padding-bottom:52px}}
    `);
  }
}

class DocumentationText extends SlotElement {
  constructor() { super(':host{display:block;margin:16px 0;color:#555866;font-size:.98rem;line-height:1.82;text-wrap:pretty}'); }
}

class DocumentationNote extends HTMLElement {
  static observedAttributes = ["title", "description", "tone"];
  constructor() { super(); this.attachShadow({ mode: "open" }); }
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const tone = this.getAttribute("tone") || "info";
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;margin:22px 0}.note{padding:18px 20px;border:1px solid #6849f529;border-left:4px solid #6545f5;border-radius:12px;background:#6849f50b}.note.tip{border-color:#16a88335;border-left-color:#16a883;background:#16a8830b}.title{display:block;margin-bottom:5px;color:#343540;font-size:.9rem;font-weight:850}.description{color:#626573;font-size:.9rem;line-height:1.65}
      </style>
      <aside class="note ${escapeHtml(tone)}"><strong class="title">${escapeHtml(this.getAttribute("title") || "À retenir")}</strong><span class="description">${escapeHtml(this.getAttribute("description") || "")}</span></aside>`;
  }
}

let playgroundSequence = 0;

class IntentionPlayground extends HTMLElement {
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
  disconnectedCallback() { window.removeEventListener("message", this.onMessage); clearTimeout(this.timer); }
  attributeChangedCallback(name, oldValue, value) {
    if (name === "code" && this.isConnected && oldValue !== value && this.editor) {
      this.initialCode = value || "";
      this.editor.value = this.initialCode;
      this.run(this.initialCode);
    }
  }
  renderShell() {
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;margin:26px 0;border:1px solid #17182416;border-radius:20px;background:#fff;box-shadow:0 20px 55px #30275d10;overflow:hidden}
        .head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 18px;border-bottom:1px solid #17182410;background:#fbfbfd}.heading{min-width:0}.label{display:block;color:#292a34;font-size:.88rem;font-weight:850}.description{display:block;margin-top:3px;color:#777987;font-size:.75rem}.reset{flex:0 0 auto;padding:8px 11px;border:1px solid #dcdce5;border-radius:9px;color:#595b68;background:#fff;font:750 .75rem system-ui;cursor:pointer}.workspace{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);min-height:360px}.pane{min-width:0;display:flex;flex-direction:column}.pane:first-child{border-right:1px solid #17182412;background:#1b1c25}.bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;color:#a9a9b7;background:#22232d;font:700 .7rem ui-monospace,monospace;letter-spacing:.04em}.status{color:#70dcb4}.status.error{color:#ff9a9a}textarea{flex:1;width:100%;min-height:330px;padding:18px;border:0;outline:0;resize:vertical;color:#e9e7f2;background:#1b1c25;font:500 .82rem/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;tab-size:2}.preview-label{padding:10px 14px;border-bottom:1px solid #1718240d;color:#777987;background:#fafafe;font:750 .7rem system-ui;letter-spacing:.04em;text-transform:uppercase}iframe{display:block;width:100%;height:100%;min-height:330px;border:0;background:#f8f8fc}@media(max-width:800px){.workspace{grid-template-columns:1fr}.pane:first-child{border-right:0;border-bottom:1px solid #17182412}textarea{min-height:280px}iframe{min-height:300px}}
      </style>
      <div class="head"><span class="heading"><strong class="label"></strong><span class="description"></span></span><button class="reset" type="button">Réinitialiser</button></div>
      <div class="workspace">
        <div class="pane"><div class="bar"><span>app.intent</span><span class="status">Compilation…</span></div><textarea spellcheck="false" aria-label="Code Intention modifiable"></textarea></div>
        <div class="pane"><div class="preview-label">Rendu</div><iframe title="Aperçu du code Intention" sandbox="allow-scripts allow-same-origin"></iframe></div>
      </div>`;
    this.editor = this.shadowRoot.querySelector("textarea");
    this.frame = this.shadowRoot.querySelector("iframe");
    this.status = this.shadowRoot.querySelector(".status");
    this.shadowRoot.querySelector(".label").textContent = this.getAttribute("label") || "Exemple interactif";
    this.shadowRoot.querySelector(".description").textContent = this.getAttribute("description") || "Modifiez le code : le rendu se met à jour automatiquement.";
    this.editor.value = this.initialCode;
    this.editor.addEventListener("input", () => {
      this.status.textContent = "Compilation…";
      this.status.classList.remove("error");
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.run(this.editor.value), 280);
    });
    this.editor.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      const start = this.editor.selectionStart;
      this.editor.setRangeText("  ", start, this.editor.selectionEnd, "end");
      this.editor.dispatchEvent(new Event("input"));
    });
    this.shadowRoot.querySelector(".reset").addEventListener("click", () => {
      this.editor.value = this.initialCode;
      this.run(this.initialCode);
      this.editor.focus();
    });
  }
  run(source) {
    const sourceLiteral = JSON.stringify(String(source)).replaceAll("<", "\\u003c");
    const playgroundLiteral = JSON.stringify(this.playgroundId);
    this.frame.srcdoc = `<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html{color-scheme:light}*{box-sizing:border-box}body{margin:0;padding:24px;background:#f8f8fc;color:#171821;font-family:Inter,ui-sans-serif,system-ui,sans-serif}intention-root{display:block}#error{margin:0;padding:16px;border:1px solid #ff6b6b55;border-radius:12px;color:#9b2525;background:#fff1f1;font:600 .8rem/1.6 ui-monospace,monospace;white-space:pre-wrap}</style></head><body><intention-root></intention-root><pre id="error" hidden></pre><script type="module">import { parseIntention } from ${JSON.stringify(browserParserUrl)};import { startIntention } from ${JSON.stringify(browserRuntimeUrl)};const source=${sourceLiteral};const id=${playgroundLiteral};try{const program=parseIntention(source,"playground.intent");program.basePath="";startIntention(program);parent.postMessage({playground:id,ok:true},"*")}catch(error){const output=document.querySelector("#error");output.hidden=false;output.textContent=error.message;parent.postMessage({playground:id,ok:false,message:error.message},"*")}<\/script></body></html>`;
  }
}

class CtaPanel extends SlotElement {
  constructor() {
    super(`
      :host { display: flex; flex-direction: column; align-items: center; gap: 18px; max-width: 1120px; margin: 100px auto; padding: clamp(55px, 8vw, 95px) 28px; scroll-margin-top: 82px; text-align: center; border-radius: 32px; color: #f7f5ff; background: radial-gradient(circle at 20% 0%,#8a6cff 0,transparent 38%), linear-gradient(135deg,#24202f,#171821); box-shadow: 0 35px 90px #35266c30; overflow: hidden; }
      ::slotted(intent-section-title) { max-width: 850px; margin-bottom: 0; }
      ::slotted(intent-lead) { max-width: 680px; margin-bottom: 4px; color: #b8b8c6; }
      @media(max-width:1160px){:host{margin-inline:16px}}
    `);
  }
}

class SiteFooter extends SlotElement {
  constructor() {
    super(`
      :host { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 28px; max-width: 1180px; margin: auto; padding: 42px 24px 56px; border-top: 1px solid #17182412; color: #777988; }
      ::slotted(p) { margin: 0; text-align: center; font-size: .86rem; }
      ::slotted(span) { font-size: .8rem; }
      @media(max-width:720px){:host{grid-template-columns:1fr;text-align:center}::slotted(intent-logo){margin:auto}}
    `);
  }
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function highlight(source) {
  return escapeHtml(source)
    .replace(/(&quot;.*?&quot;)/g, '<span class="string">$1</span>')
    .replace(/\b(application|start|library|design|shared|component|routes|var|persist|memory|input|computed|load|action|do|slot|grid|if|else|each|in|where|key|emit|bind|reset|notify|log|ref)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(on [A-Za-z][\w-]*)\b/g, '<span class="event">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
}

define("intention-site-shell", SiteShell);
define("intention-navbar", SiteNavbar);
define("intention-brand", BrandMark);
define("intention-nav-links", NavLinks);
define("intention-hero", HeroSection);
define("intention-hero-copy", HeroCopy);
define("intention-display", DisplayTitle);
define("intention-lead", LeadText);
define("intention-actions", ActionRow);
define("intention-trust-line", TrustLine);
define("intention-hero-visual", HeroVisual);
define("intention-showcase", ShowcaseStack);
define("intention-code-window", CodeWindow);
define("intention-demo-card", DemoCard);
define("intention-number", DemoNumber);
define("intention-metrics", MetricsRow);
define("intention-metric", MetricItem);
define("intention-reveal", RevealSection);
define("intention-marketing-section", MarketingSection);
define("intention-eyebrow", EyebrowLabel);
define("intention-section-title", SectionTitle);
define("intention-section-lead", SectionLead);
define("intention-feature", FeatureCard);
define("intention-steps", StepsRow);
define("intention-step", StepItem);
define("intention-principles", PrinciplesList);
define("intention-principle", PrincipleItem);
define("intention-tech-strip", TechStrip);
define("intention-docs-grid", DocsGrid);
define("intention-doc-item", DocItem);
define("intention-faq-list", FaqList);
define("intention-faq-item", FaqItem);
define("intention-doc-tabs", DocsTabs);
define("intention-doc-tab", DocTab);
define("intention-doc-layout", DocumentationLayout);
define("intention-doc-section", DocumentationSection);
define("intention-doc-text", DocumentationText);
define("intention-doc-note", DocumentationNote);
define("intention-playground", IntentionPlayground);
define("intention-cta", CtaPanel);
define("intention-footer", SiteFooter);

export default {
  site: "intention-site-shell",
  navbar: "intention-navbar",
  brand: "intention-brand",
  navLinks: "intention-nav-links",
  hero: "intention-hero",
  heroCopy: "intention-hero-copy",
  display: "intention-display",
  lead: "intention-lead",
  actions: "intention-actions",
  trustLine: "intention-trust-line",
  heroVisual: "intention-hero-visual",
  showcase: "intention-showcase",
  codeWindow: "intention-code-window",
  demoCard: "intention-demo-card",
  number: "intention-number",
  metrics: "intention-metrics",
  metric: "intention-metric",
  reveal: "intention-reveal",
  sectionBlock: { tag: "intention-marketing-section", properties: { anchor: "id" } },
  eyebrow: "intention-eyebrow",
  sectionTitle: "intention-section-title",
  sectionLead: "intention-section-lead",
  feature: "intention-feature",
  steps: "intention-steps",
  step: "intention-step",
  principles: "intention-principles",
  principle: "intention-principle",
  techStrip: "intention-tech-strip",
  docsGrid: "intention-docs-grid",
  docItem: "intention-doc-item",
  faqList: "intention-faq-list",
  faq: "intention-faq-item",
  docsTabs: "intention-doc-tabs",
  docsTab: "intention-doc-tab",
  docsLayout: "intention-doc-layout",
  docSection: { tag: "intention-doc-section", properties: { anchor: "id" } },
  docText: "intention-doc-text",
  docNote: "intention-doc-note",
  playground: "intention-playground",
  cta: { tag: "intention-cta", properties: { anchor: "id" } },
  footer: "intention-footer",
  button: { tag: "wa-button", properties: { disabled: "disabled" } },
  card: "wa-card",
  tag: "wa-tag",
  badge: "wa-badge",
  copyButton: {
    tag: "wa-copy-button",
    properties: { copyLabel: "copyLabel", successLabel: "successLabel" },
  },
};
