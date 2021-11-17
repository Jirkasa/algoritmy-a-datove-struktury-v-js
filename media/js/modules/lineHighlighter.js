const TOP_PADDING = 1; // rem units
const LINE_HEIGHT = 1.84; // rem units

class LineHighlighter {
    constructor(codeElementId) {
        this._element = document.getElementById(codeElementId);
        this._highlightElements = [];
    }

    highlight(line) {
        let highlightElement = this._highlightElements.find(el => !el.active);
        if (!highlightElement) {
            highlightElement = new HighlightElement(this._element);
            this._highlightElements.push(highlightElement);
        }

        highlightElement.show(line);
    }

    clear() {
        for (let el of this._highlightElements) {
            el.hide();
        }
    }
}

class HighlightElement {
    constructor(parentEl) {
        this.active = false;
        this._el = document.createElement("div");
        this._el.classList.add("line-highlight");
        parentEl.appendChild(this._el);
    }

    show(line) {
        this._el.style.display = "block";
        this._el.style.transform = `translateY(${TOP_PADDING + LINE_HEIGHT * line}rem)`;
        this.active = true;
    }

    hide() {
        this._el.style.display = "none";
        this.active = false;
    }
}

export default LineHighlighter;