class Console {
    constructor(elementId) {
        this._consoleEl = document.getElementById(elementId);
    }

    log(output) {
        this._consoleEl.innerHTML = this._consoleEl.innerHTML + output + "<br>&gt;";
    }

    clear() {
        this._consoleEl.innerHTML = "&gt; ";
    }
}

export default Console;