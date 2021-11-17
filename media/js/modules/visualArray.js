const ARRAY_ITEM_WIDTH = 2.4; // in rem units

class VisualArray {
    constructor(arrayElementId, arrayLength, hideRangeAtBeginning = false, toMiddle = false, pointers = []) {
        // array element
        this._element = document.getElementById(arrayElementId);
        // range element
        this._rangeEl = this._element.querySelector(".array__range-pointer");

        // determines whether to display pointers to the middle of item
        this._toMiddle = toMiddle;

        // here are stored data about pointers
        this._pointers = {}; // pointer elements
        this._defaultPointerIndices = {}; // starting pointer indices
        this._defaultPointerVisibility = {}; // starting visibility of pointers

        // get pointers and store data about them
        for (let pointer of pointers) {
            // store pointer data
            this._pointers[pointer.id] = document.getElementById(pointer.id);
            this._defaultPointerIndices[pointer.id] = pointer.index;
            this._defaultPointerVisibility[pointer.id] = pointer.hide;
            // set starting state of pointer
            this.setPointerPos(pointer.id, pointer.index);
            if (pointer.hide) this.hidePointer(pointer.id);
        }

        // store data for range element
        this._arrayLength = arrayLength;
        this._leftIndex = 0;
        this._rightIndex = arrayLength-1;
        this._hideRangeAtBeginning = hideRangeAtBeginning;
        // init range
        if (hideRangeAtBeginning) this.hideRange();
        this._updateRange();
    }

    /**
     * sets position of left side of range
     * @param {number} index index to set left range to
     */
    setRangeLeftPos(index) {
        this._leftIndex = index;
        this._updateRange();
    }
    /**
     * sets position of right side of range
     * @param {number} index index to set right range to
     */
    setRangeRightPos(index) {
        this._rightIndex = index;
        this._updateRange();
    }

    _updateRange() {
        if (!this._rangeEl) return;
        // updates position of range
        if (this._toMiddle) {
            this._rangeEl.style.transform = `translateX(${(ARRAY_ITEM_WIDTH * this._leftIndex) + ARRAY_ITEM_WIDTH/2}rem)`;
            this._rangeEl.style.width = `${(this._rightIndex-this._leftIndex) * ARRAY_ITEM_WIDTH}rem`;
        } else {
            this._rangeEl.style.transform = `translateX(${ARRAY_ITEM_WIDTH * this._leftIndex}rem)`;
            this._rangeEl.style.width = `${(this._rightIndex-this._leftIndex) * ARRAY_ITEM_WIDTH}rem`;
        }
    }

    /**
     * sets position of pointer to specified index
     * @param {string} pointerId pointer ID
     * @param {number} index index to set pointer to
     */
    setPointerPos(pointerId, index) {
        const pointer = this._pointers[pointerId];
        if (!pointer) return;

        if (this._toMiddle) {
            pointer.style.transform = `translateX(${(ARRAY_ITEM_WIDTH * index) + ARRAY_ITEM_WIDTH/2}rem)`;
        } else {
            pointer.style.transform = `translateX(${ARRAY_ITEM_WIDTH * index}rem)`;
        }
    }

    /**
     * shows pointer
     * @param {string} pointerId pointer ID
     */
    showPointer(pointerId) {
        const pointer = this._pointers[pointerId];
        if (!pointer) return;

        pointer.style.display = "block";
    }
    /**
     * hides pointer
     * @param {string} pointerId pointer ID
     */
    hidePointer(pointerId) {
        const pointer = this._pointers[pointerId];
        if (!pointer) return;

        pointer.style.display = "none";
    }

    /**
     * shows range element
     */
    showRange() {
        if (!this._rangeEl) return;
        this._rangeEl.style.display = "block";
    }
    /**
     * hides range element
     */
    hideRange() {
        if (!this._rangeEl) return;
        this._rangeEl.style.display = "none";
    }

    /**
     * resets visual array to starting state
     */
    reset() {
        // reset range element
        this._leftIndex = 0;
        this._rightIndex = this._arrayLength-1;
        this._updateRange();

        // reset pointers
        for (let pointer of Object.keys(this._pointers)) {
            // reset position
            this.setPointerPos(pointer, this._defaultPointerIndices[pointer]);
            // reset visibility
            if (this._defaultPointerVisibility[pointer]) this.hidePointer(pointer);
            else this.showPointer(pointer);
        }

        // set visibility of range element to starting state
        if (this._hideRangeAtBeginning) {
            this.hideRange();
        } else {
            this.showRange();
        }
    }
}

export default VisualArray;