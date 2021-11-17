class Timer {
    constructor() {
        this._currentResolveFunc = null;
        this._currentTimeoutId = null;
        this._multiplier = 1;
        this._paused = false;
    }

    wait(time) {
        const promise = new Promise((resolve) => {
            this._currentResolveFunc = resolve;
            if (!this._paused) {
                this._currentTimeoutId = setTimeout(() => {
                    resolve(true);
                }, time * this._multiplier);
            }
        });
        return promise;
    }

    reset() {
        clearTimeout(this._currentTimeoutId);
        this._paused = false;
        if (this._currentResolveFunc) this._currentResolveFunc(false);
    }

    setSpeed(speed) {
        switch (speed) {
            case "0.25":
                this._multiplier = 1.75;
                break;
            case "0.5":
                this._multiplier = 1.5;
                break;
            case "0.75":
                this._multiplier = 1.25;
                break;
            case "1":
                this._multiplier = 1;
                break;
            case "1.25":
                this._multiplier = 0.75;
                break;
            case "1.5":
                this._multiplier = 0.5;
                break;
            case "1.75":
                this._multiplier = 0.25;
                break;
        }
    }

    pause() {
        this._paused = true;
        clearTimeout(this._currentTimeoutId);
    }

    play() {
        this._paused = false;
        if (this._currentResolveFunc) this._currentResolveFunc(true);
    }

    next() {
        if (this._currentResolveFunc) this._currentResolveFunc(true);
    }
}

export default Timer;