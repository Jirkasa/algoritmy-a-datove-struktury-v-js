const ARRAY_ITEM_WIDTH = 2.4; // in rem units

class VisualArray {
    constructor(arrayElementId, arrayLength, hideRangeAtBeginning = false, toMiddle = false, pointers = [], hideAtBeginning = false) {
        // array element
        this._element = document.getElementById(arrayElementId);
        // range element
        this._rangeEl = this._element.querySelector(".array__range-pointer");

        // determines whether array should be hidden at start
        this._hideArrayAtBeginning = hideAtBeginning;
        if (hideAtBeginning) this.hide();

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

        // get item container if there is one
        this._itemContainer = this._element.querySelector(".array__item-container");
        // get elements from item container if there is one
        this._itemElements = Array.from(this._element.querySelectorAll(".array__item-container div"));
        this._defaultItemValues = [];
        for (let itemEl of this._itemElements) {
            this._defaultItemValues.push(itemEl.innerText);
        }
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

    pushItem(value) {
        const itemEl = document.createElement("div");
        itemEl.classList.add("array__item");
        itemEl.innerText = value;

        this._itemContainer.appendChild(itemEl);
        this._itemElements.push(itemEl);
    }

    addItem(index, value) {
        const itemEl = document.createElement("div");
        itemEl.classList.add("array__item");
        itemEl.innerText = value;
        
        if (this._itemElements[index]) {
            this._itemElements[index].insertAdjacentElement("beforebegin", itemEl);
        } else {
            this._itemContainer.appendChild(itemEl);
        }
        this._itemElements.splice(index, 0, itemEl);
    }

    removeItem(index) {
        const removedItemEl = this._itemElements.splice(index, 1)[0];
        removedItemEl.remove();
    }

    show() {
        this._element.style.display = "inline-block";
    }

    hide() {
        this._element.style.display = "none";
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

        // set visibility of array
        if (this._hideArrayAtBeginning) this.hide();
        else this.show();

        // reset items
        if (this._itemContainer) {
            for (let i = 0; i < this._defaultItemValues.length; i++) {
                if (this._itemElements[i]) this._itemElements[i].innerText = this._defaultItemValues[i];
                else {
                    const itemEl = document.createElement("div");
                    itemEl.classList.add("array__item");
                    itemEl.innerText = this._defaultItemValues[i];
                    this._itemContainer.appendChild(itemEl);
                    this._itemElements.push(itemEl);
                }
            }

            while (this._itemElements.length !== this._defaultItemValues.length) {
                const removedEl = this._itemElements.pop();
                removedEl.remove();
            }
        }
    }

    setItems(values) {
        for (let i = 0; i < values.length; i++) {
            if (this._itemElements[i]) this._itemElements[i].innerText = values[i];
            else {
                const itemEl = document.createElement("div");
                itemEl.classList.add("array__item");
                itemEl.innerText = values[i];
                this._itemContainer.appendChild(itemEl);
                this._itemElements.push(itemEl);
            }
        }

        while (this._itemElements.length !== values.length) {
            const removedEl = this._itemElements.pop();
            removedEl.remove();
        }
    }

    setValueOfItem(index, value) {
        if (this._itemElements[index]) this._itemElements[index].innerText = value;
    }
}

export default VisualArray;