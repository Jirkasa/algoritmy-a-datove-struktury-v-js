import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualArray from "../modules/visualArray.js";
import VisualVariables from "../modules/visualVariables.js";
import VisualMaxBinaryHeap from "../modules/visualMaxBinaryHeap.js";
import VisualPriorityQueue from "../modules/visualPriorityQueue.js";



// used for interactive examples (methods for interactive examples should be added to instance if needed)
class MaxBinaryHeap {
    constructor() {
        this.values = [];
    }

    insert(element, visualArray) {
        this.values.push(element);
        if (visualArray) visualArray.pushItem(element);
        this.bubbleUp(visualArray);
    }

    bubbleUp(visualArray) {
        let idx = this.values.length-1;

        while (idx > 0) {
            const parentIndex = Math.trunc((idx-1)/2);

            if (this.values[idx] <= this.values[parentIndex]) break;

            const parent = this.values[parentIndex];
            this.values[parentIndex] = this.values[idx];
            if (visualArray) visualArray.setValueOfItem(parentIndex, this.values[idx]);
            this.values[idx] = parent;
            if (visualArray) visualArray.setValueOfItem(idx, parent);

            idx = parentIndex;
        }
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class Node {
    constructor(value, priority) {
        this.value = value;
        this.priority = priority;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(value, priority, visualArray) {
        this.values.push(new Node(value, priority));
        if (visualArray) visualArray.pushItem(value);
        this.bubbleUp(visualArray);
    }

    bubbleUp(visualArray) {
        let idx = this.values.length-1;

        while (idx > 0) {
            const parentIdx = Math.trunc((idx-1)/2);

            if (this.values[idx].priority <= this.values[parentIdx].priority) break;

            const parent = this.values[parentIdx];
            this.values[parentIdx] = this.values[idx];
            if (visualArray) visualArray.setValueOfItem(parentIdx, this.values[idx].value);
            this.values[idx] = parent;
            if (visualArray) visualArray.setValueOfItem(idx, parent.value);

            idx = parentIdx;
        }
    }
}


const config = [
    {
        exampleId: 1,
        visualTree: new VisualMaxBinaryHeap("binary-heap-1", ["idx", "parentIdx"]),
        lineHighlighter: new LineHighlighter("code-1"),
        visualArray: new VisualArray("visual-array-insert", 7, true, true, [{id: "insert-idx", index: 0, hide: true}, {id: "insert-parentIdx", index: 0, hide: true}]),
        visualVariables: new VisualVariables([{id: "variable-insert-parent", value: 0, hide: true}]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const heap = new MaxBinaryHeap();


            heap.exampleInsert = async function(element, lineHighlighter, timer, visualArray, visualVariables, visualTree) {
                this.values.push(element);

                visualArray.pushItem(element);
                visualTree.insertWithoutBubbleUp(element, true);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                await this.exampleBubbleUp(lineHighlighter, timer, visualArray, visualVariables, visualTree);

                if (!proceed) return;

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
            }

            heap.exampleBubbleUp = async function(lineHighlighter, timer, visualArray, visualVariables, visualTree) {
                let idx = this.values.length-1;

                visualArray.showPointer("insert-idx");
                visualArray.setPointerPos("insert-idx", idx);

                visualTree.setPointerToNode("idx", idx);

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(17);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (idx > 0) {
                    const parentIndex = Math.trunc((idx-1)/2);

                    visualArray.showPointer("insert-parentIdx");
                    visualArray.setPointerPos("insert-parentIdx", parentIndex);

                    visualTree.setPointerToNode("parentIdx", parentIndex);

                    lineHighlighter.highlight(19);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (this.values[idx] <= this.values[parentIndex]) {
                        lineHighlighter.highlight(22);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        visualArray.hidePointer("insert-parentIdx");
                        visualTree.hidePointer("parentIdx");

                        break;
                    } else {
                        lineHighlighter.highlight(22);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    const parent = this.values[parentIndex];

                    visualVariables.show("variable-insert-parent");
                    visualVariables.setValue("variable-insert-parent", parent);

                    lineHighlighter.highlight(25);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[parentIndex] = this.values[idx];

                    visualArray.setValueOfItem(parentIndex, this.values[idx]);
                    visualTree.setValueOfNode(parentIndex, this.values[idx]);

                    lineHighlighter.highlight(26);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[idx] = parent;

                    visualArray.setValueOfItem(idx, parent);
                    visualTree.setValueOfNode(idx, parent);

                    lineHighlighter.highlight(27);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    idx = parentIndex;

                    visualArray.setPointerPos("insert-idx", parentIndex);
                    visualTree.setPointerToNode("idx", idx);

                    lineHighlighter.highlight(30);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualArray.hidePointer("insert-parentIdx");
                    visualTree.hidePointer("parentIdx");
                    visualVariables.hide("variable-insert-parent");

                    lineHighlighter.highlight(17);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                visualArray.hidePointer("insert-idx");
                visualTree.hidePointer("idx");
            }

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(39, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(41, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(33, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(42);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(52, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(42);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(43);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(15, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(43);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(43, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(45);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleInsert(55, this.lineHighlighter, this.timer, this.visualArray, this.visualVariables, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(45);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualTree: new VisualMaxBinaryHeap("binary-heap-2", ["idx", "leftChildIdx", "rightChildIdx"]),
        lineHighlighter: new LineHighlighter("code-2"),
        visualArray: new VisualArray("visual-array-extractMax", 7, true, true, [{id: "extractMax-idx", index: 0, hide: true}, {id: "extractMax-leftChildIdx", index: 0, hide: true}, {id: "extractMax-rightChildIdx", index: 0, hide: true}]),
        visualVariables: new VisualVariables([{id: "variable-extractMax-max", value: 0, hide: true}, {id: "variable-extractMax-end", value: 0, hide: true}, {id: "variable-extractMax-element", value: 0, hide: true}, {id: "variable-extractMax-leftChild", value: "undefined", hide: true}, {id: "variable-extractMax-rightChild", value: "undefined", hide: true}, {id: "variable-extractMax-swap", value: "null", hide: true}]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const heap = new MaxBinaryHeap();


            heap.exampleExtractMax = async function(lineHighlighter, timer, visualArray, visualTree, visualVariables) {
                const max = this.values[0];

                visualVariables.show("variable-extractMax-max");
                visualVariables.setValue("variable-extractMax-max", max);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const end = this.values.pop();

                visualArray.popItem();
                visualVariables.show("variable-extractMax-end");
                visualVariables.setValue("variable-extractMax-end", end);
                visualTree.pop();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.values.length > 0) {
                    this.values[0] = end;

                    visualArray.setValueOfItem(0, end);
                    visualTree.setValueOfNode(0, end);

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    await this.exampleSinkDown(lineHighlighter, timer, visualArray, visualTree, visualVariables);

                    if (!proceed) return;

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualVariables.hide("variable-extractMax-max");
                visualVariables.hide("variable-extractMax-end");

                return max;
            }
        
            heap.exampleSinkDown = async function(lineHighlighter, timer, visualArray, visualTree, visualVariables) {
                let idx = 0;

                visualArray.showPointer("extractMax-idx");
                visualArray.setPointerPos("extractMax-idx", idx);
                visualTree.setPointerToNode("idx", idx);

                lineHighlighter.highlight(22);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const length = this.values.length;

                lineHighlighter.highlight(24);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const element = this.values[0];

                visualVariables.show("variable-extractMax-element");
                visualVariables.setValue("variable-extractMax-element", element);

                lineHighlighter.highlight(26);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(29);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                while (true) {
                    let leftChildIdx = 2 * idx + 1;

                    visualArray.showPointer("extractMax-leftChildIdx");
                    visualArray.setPointerPos("extractMax-leftChildIdx", leftChildIdx);
                    visualTree.setPointerToNode("leftChildIdx", leftChildIdx);

                    lineHighlighter.highlight(31);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let rightChildIdx = 2 * idx + 2;

                    visualArray.showPointer("extractMax-rightChildIdx");
                    visualArray.setPointerPos("extractMax-rightChildIdx", rightChildIdx);
                    visualTree.setPointerToNode("rightChildIdx", rightChildIdx);

                    lineHighlighter.highlight(32);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let leftChild, rightChild;

                    visualVariables.show("variable-extractMax-leftChild");
                    visualVariables.setValue("variable-extractMax-leftChild", "undefined");
                    visualVariables.show("variable-extractMax-rightChild");
                    visualVariables.setValue("variable-extractMax-rightChild", "undefined");

                    lineHighlighter.highlight(34);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let swap = null;

                    visualVariables.show("variable-extractMax-swap");
                    visualVariables.setValue("variable-extractMax-swap", "null");

                    lineHighlighter.highlight(36);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(39);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
        
                    if (leftChildIdx < length) {
                        leftChild = this.values[leftChildIdx];

                        visualVariables.setValue("variable-extractMax-leftChild", leftChild);

                        lineHighlighter.highlight(41);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(43);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                        
                        if (leftChild > element) {
                            swap = leftChildIdx;

                            visualVariables.setValue("variable-extractMax-swap", leftChildIdx);

                            lineHighlighter.highlight(44);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }
                    }

                    lineHighlighter.highlight(48);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (rightChildIdx < length) {
                        rightChild = this.values[rightChildIdx];

                        visualVariables.setValue("variable-extractMax-rightChild", rightChild);

                        lineHighlighter.highlight(50);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(52);
                        lineHighlighter.highlight(53);
                        lineHighlighter.highlight(54);
                        lineHighlighter.highlight(55);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                        
                        if (
                            (swap === null && rightChild > element) ||
                            (swap !== null && rightChild > leftChild)
                        ) {
                            swap = rightChildIdx;

                            visualVariables.setValue("variable-extractMax-swap", swap);

                            lineHighlighter.highlight(56);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }
                    }

                    lineHighlighter.highlight(61);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
        
                    if (swap === null) {
                        visualArray.hidePointer("extractMax-leftChildIdx");
                        visualTree.hidePointer("leftChildIdx");
                        visualArray.hidePointer("extractMax-rightChildIdx");
                        visualTree.hidePointer("rightChildIdx");
                        visualVariables.hide("variable-extractMax-leftChild");
                        visualVariables.hide("variable-extractMax-rightChild");
                        visualVariables.hide("variable-extractMax-swap");

                        break;
                    }
                    this.values[idx] = this.values[swap];

                    visualArray.setValueOfItem(idx, this.values[swap]);
                    visualTree.setValueOfNode(idx, this.values[swap]);

                    lineHighlighter.highlight(63);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[swap] = element;

                    visualArray.setValueOfItem(swap, element);
                    visualTree.setValueOfNode(swap, element);

                    lineHighlighter.highlight(64);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    idx = swap;

                    visualArray.setPointerPos("extractMax-idx", idx);
                    visualTree.setPointerToNode("idx", idx);

                    lineHighlighter.highlight(66);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualArray.hidePointer("extractMax-leftChildIdx");
                    visualTree.hidePointer("leftChildIdx");
                    visualArray.hidePointer("extractMax-rightChildIdx");
                    visualTree.hidePointer("rightChildIdx");
                    visualVariables.hide("variable-extractMax-leftChild");
                    visualVariables.hide("variable-extractMax-rightChild");
                    visualVariables.hide("variable-extractMax-swap");

                    lineHighlighter.highlight(29);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                visualArray.hidePointer("extractMax-idx");
                visualTree.hidePointer("idx");
                visualVariables.hide("variable-extractMax-element");
            }

            this.lineHighlighter.highlight(72);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(39, this.visualArray);
            this.visualTree.insert(39, true);

            this.lineHighlighter.highlight(75);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(41, this.visualArray);
            this.visualTree.insert(41, true);

            this.lineHighlighter.highlight(76);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(33, this.visualArray);
            this.visualTree.insert(33, true);

            this.lineHighlighter.highlight(77);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(52, this.visualArray);
            this.visualTree.insert(52, true);

            this.lineHighlighter.highlight(78);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(15, this.visualArray);
            this.visualTree.insert(15, true);

            this.lineHighlighter.highlight(79);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(43, this.visualArray);
            this.visualTree.insert(43, true);

            this.lineHighlighter.highlight(80);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            heap.insert(55, this.visualArray);
            this.visualTree.insert(55, true);

            this.lineHighlighter.highlight(81);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(84);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleExtractMax(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(84);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(85);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleExtractMax(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(85);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(86);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await heap.exampleExtractMax(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(86);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        visualTree: new VisualPriorityQueue("priority-queue-1", ["idx", "parentIdx"]),
        lineHighlighter: new LineHighlighter("code-3"),
        visualArray: new VisualArray("visual-array-enqueue", 7, true, true, [{id: "enqueue-idx", index: 0, hide: true}, {id: "enqueue-parentIdx", index: 0, hide: true}]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const queue = new PriorityQueue();

            queue.exampleEnqueue = async function(value, priority, lineHighlighter, timer, visualArray, visualTree, visualVariables) {
                this.values.push(new Node(value, priority));

                visualArray.pushItem(value);
                visualTree.enqueueWithoutBubbleUp(value, priority, true);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                await this.exampleBubbleUp(lineHighlighter, timer, visualArray, visualTree);

                if (!proceed) return;

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
            }

            queue.exampleBubbleUp = async function(lineHighlighter, timer, visualArray, visualTree) {
                let idx = this.values.length-1;

                visualArray.showPointer("enqueue-idx");
                visualArray.setPointerPos("enqueue-idx", idx);

                visualTree.setPointerToNode("idx", idx);

                lineHighlighter.highlight(13);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (idx > 0) {
                    const parentIdx = Math.trunc((idx-1)/2);

                    visualArray.showPointer("enqueue-parentIdx");
                    visualArray.setPointerPos("enqueue-parentIdx", parentIdx);

                    visualTree.setPointerToNode("parentIdx", parentIdx);

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (this.values[idx].priority <= this.values[parentIdx].priority) {
                        lineHighlighter.highlight(19);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        visualArray.hidePointer("enqueue-parentIdx");
                        visualTree.hidePointer("parentIdx");

                        break;
                    } else {
                        lineHighlighter.highlight(19);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }

                    const parent = this.values[parentIdx];

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[parentIdx] = this.values[idx];

                    visualArray.setValueOfItem(parentIdx, this.values[idx].value);
                    visualTree.setValueOfNode(parentIdx, this.values[idx].value, this.values[idx].priority);

                    lineHighlighter.highlight(22);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[idx] = parent;

                    visualArray.setValueOfItem(idx, parent.value);
                    visualTree.setValueOfNode(idx, parent.value, parent.priority);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    idx = parentIdx;

                    visualArray.setPointerPos("enqueue-idx", parentIdx);
                    visualTree.setPointerToNode("idx", idx);

                    lineHighlighter.highlight(25);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualArray.hidePointer("enqueue-parentIdx");
                    visualTree.hidePointer("parentIdx");

                    lineHighlighter.highlight(15);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                visualArray.hidePointer("enqueue-idx");
                visualTree.hidePointer("idx");
            }

            this.lineHighlighter.highlight(31);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(45, 3, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(34);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(23, 4, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(33, 2, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(46, 6, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(18, 2, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(14, 7, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(22, 1, this.lineHighlighter, this.timer, this.visualArray, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        visualTree: new VisualPriorityQueue("priority-queue-2", ["idx", "leftChildIdx", "rightChildIdx"]),
        lineHighlighter: new LineHighlighter("code-4"),
        visualArray: new VisualArray("visual-array-dequeue", 7, true, true, [{id: "dequeue-idx", index: 0, hide: true}, {id: "dequeue-leftChildIdx", index: 0, hide: true}, {id: "dequeue-rightChildIdx", index: 0, hide: true}]),
        visualVariables: new VisualVariables([{id: "variable-dequeue-max", value: 0, hide: true}, {id: "variable-dequeue-end", value: 0, hide: true}, {id: "variable-dequeue-element", value: 0, hide: true}, {id: "variable-dequeue-leftChild", value: "undefined", hide: true}, {id: "variable-dequeue-rightChild", value: "undefined", hide: true}, {id: "variable-dequeue-swap", value: "null", hide: true}]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const queue = new PriorityQueue();


            queue.exampleDequeue = async function(lineHighlighter, timer, visualArray, visualTree, visualVariables) {
                const max = this.values[0];

                visualVariables.show("variable-dequeue-max");
                visualVariables.setValue("variable-dequeue-max", max.value);

                lineHighlighter.highlight(5);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const end = this.values.pop();

                visualArray.popItem();
                visualVariables.show("variable-dequeue-end");
                visualVariables.setValue("variable-dequeue-end", end.value);
                visualTree.pop();

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(7);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.values.length > 0) {
                    this.values[0] = end;

                    visualArray.setValueOfItem(0, end.value);
                    visualTree.setValueOfNode(0, end.value, end.priority);

                    lineHighlighter.highlight(8);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(9);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    await this.exampleSinkDown(lineHighlighter, timer, visualArray, visualTree, visualVariables);

                    if (!proceed) return;

                    lineHighlighter.highlight(9);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualVariables.hide("variable-dequeue-max");
                visualVariables.hide("variable-dequeue-end");
                
                return max;
            }

            queue.exampleSinkDown = async function(lineHighlighter, timer, visualArray, visualTree, visualVariables) {
                let idx = 0;

                visualArray.showPointer("dequeue-idx");
                visualArray.setPointerPos("dequeue-idx", idx);
                visualTree.setPointerToNode("idx", idx);

                lineHighlighter.highlight(17);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const length = this.values.length;

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const element = this.values[0];

                visualVariables.show("variable-dequeue-element");
                visualVariables.setValue("variable-dequeue-element", element.value);

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(21);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
        
                while (true) {
                    let leftChildIdx = 2 * idx + 1;

                    visualArray.showPointer("dequeue-leftChildIdx");
                    visualArray.setPointerPos("dequeue-leftChildIdx", leftChildIdx);
                    visualTree.setPointerToNode("leftChildIdx", leftChildIdx);

                    lineHighlighter.highlight(22);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let rightChildIdx = 2 * idx + 2;

                    visualArray.showPointer("dequeue-rightChildIdx");
                    visualArray.setPointerPos("dequeue-rightChildIdx", rightChildIdx);
                    visualTree.setPointerToNode("rightChildIdx", rightChildIdx);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let leftChild, rightChild;

                    visualVariables.show("variable-dequeue-leftChild");
                    visualVariables.setValue("variable-dequeue-leftChild", "undefined");
                    visualVariables.show("variable-dequeue-rightChild");
                    visualVariables.setValue("variable-dequeue-rightChild", "undefined");

                    lineHighlighter.highlight(24);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let swap = null;

                    visualVariables.show("variable-dequeue-swap");
                    visualVariables.setValue("variable-dequeue-swap", "null");

                    lineHighlighter.highlight(25);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(27);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
        
                    if (leftChildIdx < length) {
                        leftChild = this.values[leftChildIdx];

                        visualVariables.setValue("variable-dequeue-leftChild", leftChild.value);

                        lineHighlighter.highlight(28);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(30);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (leftChild.priority > element.priority) {
                            swap = leftChildIdx;

                            visualVariables.setValue("variable-dequeue-swap", leftChildIdx);

                            lineHighlighter.highlight(31);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }
                    }

                    lineHighlighter.highlight(34);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                    
                    if (rightChildIdx < length) {
                        rightChild = this.values[rightChildIdx];

                        visualVariables.setValue("variable-dequeue-rightChild", rightChild.value);

                        lineHighlighter.highlight(35);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(37);
                        lineHighlighter.highlight(38);
                        lineHighlighter.highlight(39);
                        lineHighlighter.highlight(40);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (
                            (swap === null && rightChild.priority > element.priority) ||
                            (swap !== null && rightChild.priority > leftChild.priority)
                        ) {
                            swap = rightChildIdx;

                            visualVariables.setValue("variable-dequeue-swap", swap);

                            lineHighlighter.highlight(41);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }
                    }

                    lineHighlighter.highlight(45);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
        
                    if (swap === null) {
                        visualArray.hidePointer("dequeue-leftChildIdx");
                        visualTree.hidePointer("leftChildIdx");
                        visualArray.hidePointer("dequeue-rightChildIdx");
                        visualTree.hidePointer("rightChildIdx");
                        visualVariables.hide("variable-dequeue-leftChild");
                        visualVariables.hide("variable-dequeue-rightChild");
                        visualVariables.hide("variable-dequeue-swap");

                        break;
                    }
                    this.values[idx] = this.values[swap];

                    visualArray.setValueOfItem(idx, this.values[swap].value);
                    visualTree.setValueOfNode(idx, this.values[swap].value, this.values[swap].priority);

                    lineHighlighter.highlight(46);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.values[swap] = element;

                    visualArray.setValueOfItem(swap, element.value);
                    visualTree.setValueOfNode(swap, element.value, element.priority);

                    lineHighlighter.highlight(47);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    idx = swap;

                    visualArray.setPointerPos("dequeue-idx", idx);
                    visualTree.setPointerToNode("idx", idx);

                    lineHighlighter.highlight(48);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualArray.hidePointer("dequeue-leftChildIdx");
                    visualTree.hidePointer("leftChildIdx");
                    visualArray.hidePointer("dequeue-rightChildIdx");
                    visualTree.hidePointer("rightChildIdx");
                    visualVariables.hide("variable-dequeue-leftChild");
                    visualVariables.hide("variable-dequeue-rightChild");
                    visualVariables.hide("variable-dequeue-swap");

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                visualArray.hidePointer("dequeue-idx");
                visualTree.hidePointer("idx");
                visualVariables.hide("variable-dequeue-element");
            }


            this.lineHighlighter.highlight(54);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(45, 3, this.visualArray);
            this.visualTree.enqueue(45, 3, true);

            this.lineHighlighter.highlight(57);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(23, 4, this.visualArray);
            this.visualTree.enqueue(23, 4, true);
            
            this.lineHighlighter.highlight(58);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(33, 2, this.visualArray);
            this.visualTree.enqueue(33, 2, true);
            
            this.lineHighlighter.highlight(59);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(46, 6, this.visualArray);
            this.visualTree.enqueue(46, 6, true);
            
            this.lineHighlighter.highlight(60);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(18, 2, this.visualArray);
            this.visualTree.enqueue(18, 2, true);
            
            this.lineHighlighter.highlight(61);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(14, 7, this.visualArray);
            this.visualTree.enqueue(14, 7, true);
            
            this.lineHighlighter.highlight(62);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(22, 1, this.visualArray);
            this.visualTree.enqueue(22, 1, true);
            
            this.lineHighlighter.highlight(63);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(66);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(66);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(67);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(67);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(68);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualArray, this.visualTree, this.visualVariables);

            if (!proceed) return;

            this.lineHighlighter.highlight(68);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);