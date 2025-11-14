class TeamMember extends HTMLElement {
  static get observedAttributes() {
    return ["avatar", "name", "department", "year"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    const isPrimary = this.classList.contains('primary-author');
    const imgSize = isPrimary ? '130px' : '100px';
    const maxWidth = isPrimary ? '180px' : '120px';
    const fontSize = isPrimary ? '1.15em' : '1em';
    
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${this.avatar}" alt="${this.name}">
    <p><strong>${this.name}</strong></p>
    <p>${this.department}</p>
    <p>${this.year}</p>
    <style>
      :host {
        display: block;
        max-width: ${maxWidth};
        text-align: center;
        font-size: ${fontSize};
      }

      img {
        width: ${imgSize};
        height: ${imgSize};
        border-radius: 50%;
        display: block;
        margin: auto;
      }

      p {
        text-align: center;
        margin: 8px 0;
      }

      @media (max-width: 599px) {
        img {
          display: none;
        }
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("team-member", TeamMember);
