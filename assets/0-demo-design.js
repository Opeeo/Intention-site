class DemoButton extends HTMLElement {
  static observedAttributes = ["inactive"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          appearance: none;
          border: 0;
          border-radius: .7rem;
          padding: .7rem 1rem;
          background: #6d5dfc;
          color: white;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 .3rem 1rem rgb(109 93 252 / 25%);
        }
        button:disabled { cursor: not-allowed; opacity: .45; box-shadow: none; }
      </style>
      <button type="button"><slot></slot></button>
    `;
    this.shadowRoot.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("activate", { bubbles: true }));
    });
  }

  get inactive() {
    return this.hasAttribute("inactive");
  }

  set inactive(value) {
    this.toggleAttribute("inactive", Boolean(value));
    this.shadowRoot.querySelector("button").disabled = Boolean(value);
  }

  attributeChangedCallback() {
    this.shadowRoot.querySelector("button").disabled = this.inactive;
  }
}

if (!customElements.get("demo-button")) {
  customElements.define("demo-button", DemoButton);
}

export default {
  button: {
    tag: "demo-button",
    properties: { disabled: "inactive" },
    events: { clicked: "activate" },
  },
};
