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
    const imgSize = isPrimary ? '180px' : '140px';
    const maxWidth = isPrimary ? '280px' : '240px';
    const fontSize = isPrimary ? '1.2em' : '1.1em';
    
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
        min-width: ${imgSize};
        min-height: ${imgSize};
        border-radius: 50%;
        display: block;
        margin: auto;
        object-fit: cover;
        object-position: center center;
        aspect-ratio: 1 / 1;
        image-rendering: auto;
      }

      p {
        text-align: center;
        margin: 8px 0;
      }
      
      p:nth-of-type(2) {
        font-size: 0.85em;
        color: #666;
      }
      
      p:last-of-type:empty {
        display: none;
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
