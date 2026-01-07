class CustomCursor {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'cb-cursor';
    this.text = document.createElement('div');
    this.text.className = 'cb-cursor-text';
    this.el.appendChild(this.text);
    document.body.appendChild(this.el);

    this.pos = { x: 0, y: 0 };
    this.cursorPos = { x: 0, y: 0 };
    this.visible = false;

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      if (!this.visible) {
        this.visible = true;
        this.el.classList.add('-visible');
      }
    });

    window.addEventListener('mouseenter', () => {
      this.el.classList.add('-visible');
      this.visible = true;
    });

    window.addEventListener('mouseleave', () => {
      this.el.classList.remove('-visible');
      this.visible = false;
    });

    window.addEventListener('mousedown', () => {
      this.el.classList.add('-active');
    });

    window.addEventListener('mouseup', () => {
      this.el.classList.remove('-active');
    });

    // Handle hover states
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor], [data-cursor-text]');
      if (!target) {
        this.el.classList.remove('-pointer', '-text', '-opaque');
        this.text.innerHTML = '';
        return;
      }

      if (target.hasAttribute('data-cursor-text')) {
        this.el.classList.add('-text');
        this.text.innerHTML = target.getAttribute('data-cursor-text');
      } else if (target.hasAttribute('data-cursor')) {
        this.el.classList.add(target.getAttribute('data-cursor'));
      } else {
        this.el.classList.add('-pointer');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor], [data-cursor-text]');
      if (target) {
        this.el.classList.remove('-pointer', '-text', '-opaque');
        this.text.innerHTML = '';
      }
    });

    this.render();
  }

  render() {
    // Smooth follow effect
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    this.cursorPos.x = lerp(this.cursorPos.x, this.pos.x, 0.15);
    this.cursorPos.y = lerp(this.cursorPos.y, this.pos.y, 0.15);

    this.el.style.transform = `translate3d(${this.cursorPos.x}px, ${this.cursorPos.y}px, 0)`;

    requestAnimationFrame(() => this.render());
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new CustomCursor());
} else {
  new CustomCursor();
}

