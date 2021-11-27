import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualLinkedList from "../modules/visualLinkedList.js";

// used for interactive examples
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class Stack {
    constructor() {
        this.first = null;
        this.size = 0;
    }

    push(value) {
        const newNode = new Node(value);

        if (!this.first) {
            this.first = newNode;
        } else {
            newNode.next = this.first;
            this.first = newNode;
        }

        return ++this.size;
    }

    pop() {
        if (!this.first) return null;

        const value = this.first.value;

        this.first = this.first.next;
        this.size--;

        return value;
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value) {
        const newNode = new Node(value);

        if (!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }

        return ++this.size;
    }

    dequeue() {
        if (!this.first) return null;

        const value = this.first.value;

        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return value;
    }
}


const config = [
    {
        exampleId: 1,
        visualLinkedList: new VisualLinkedList("linked-list-1", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const stack = new Stack();

            stack.examplePush = async function(value, lineHighlighter, timer, visualLinkedList) {
                const newNode = new Node(value);

                visualLinkedList.unshift(value);
                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", 0);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.first) {
                    this.first = newNode;

                    visualLinkedList.get(0).setFirstStatus();

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                } else {
                    newNode.next = this.first;

                    visualLinkedList.get(0).displayArrow();

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.first = newNode;

                    visualLinkedList.get(1).removeFirstStatus();
                    visualLinkedList.get(0).setFirstStatus();

                    lineHighlighter.highlight(15);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");
        
                return ++this.size;
            }

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePush(25, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePush(5, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePush(true, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualLinkedList: new VisualLinkedList("linked-list-2"),
        lineHighlighter: new LineHighlighter("code-2"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const stack = new Stack();

            stack.examplePop = async function(lineHighlighter, timer, visualLinkedList) {

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.first) return null;

                const value = this.first.value;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.first = this.first.next;

                if (this.size !== 1) {
                    visualLinkedList.get(0).removeFirstStatus();
                    visualLinkedList.get(1).setFirstStatus();
                }

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.size--;

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(17);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.shift();

                return value;
            }

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            stack.push(25);

            this.visualLinkedList.unshift(25);
            this.visualLinkedList.get(0).setFirstStatus();

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            stack.push(5);
            
            this.visualLinkedList.unshift(5);
            this.visualLinkedList.get(1).removeFirstStatus();
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setFirstStatus();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            stack.push(true);
            
            this.visualLinkedList.unshift(true);
            this.visualLinkedList.get(1).removeFirstStatus();
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setFirstStatus();

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            stack.push(23);
            
            this.visualLinkedList.unshift(23);
            this.visualLinkedList.get(1).removeFirstStatus();
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(0).setFirstStatus();

            this.lineHighlighter.highlight(32);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await stack.examplePop(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        visualLinkedList: new VisualLinkedList("linked-list-3", ["newNode"]),
        lineHighlighter: new LineHighlighter("code-3"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const queue = new Queue();

            queue.exampleEnqueue = async function(value, lineHighlighter, timer, visualLinkedList) {
                const newNode = new Node(value);

                visualLinkedList.push(value);
                visualLinkedList.showPointer("newNode");
                visualLinkedList.movePointerToNode("newNode", this.size);

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.first) {
                    this.first = newNode;

                    visualLinkedList.get(0).setFirstStatus();

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.last = newNode;

                    visualLinkedList.get(0).setLastStatus();

                    lineHighlighter.highlight(11);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                } else {
                    this.last.next = newNode;

                    visualLinkedList.get(this.size-1).displayArrow();

                    lineHighlighter.highlight(14);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.last = newNode;

                    visualLinkedList.get(this.size-1).removeLastStatus();
                    visualLinkedList.get(this.size).setLastStatus();

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.hidePointer("newNode");
                
                return ++this.size;
            }

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(25, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(5, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleEnqueue(true, this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        visualLinkedList: new VisualLinkedList("linked-list-4"),
        lineHighlighter: new LineHighlighter("code-4"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const queue = new Queue();

            queue.exampleDequeue = async function(lineHighlighter, timer, visualLinkedList) {
                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.first) return null;

                const value = this.first.value;

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (this.first === this.last) {
                    this.last = null;

                    visualLinkedList.get(this.size-1).removeLastStatus();

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                this.first = this.first.next;

                visualLinkedList.get(0).removeFirstStatus();
                if (this.size > 1) visualLinkedList.get(1).setFirstStatus();

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.size--;

                lineHighlighter.highlight(18);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(20);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualLinkedList.shift();

                return value;
            }

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(25);

            this.visualLinkedList.push(25);
            this.visualLinkedList.get(0).setFirstStatus();
            this.visualLinkedList.get(0).setLastStatus();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(5);

            this.visualLinkedList.push(5);
            this.visualLinkedList.get(0).removeLastStatus();
            this.visualLinkedList.get(0).displayArrow();
            this.visualLinkedList.get(1).setLastStatus();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(true);

            this.visualLinkedList.push(true);
            this.visualLinkedList.get(1).removeLastStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).setLastStatus();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(33);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            queue.enqueue(23);

            this.visualLinkedList.push(23);
            this.visualLinkedList.get(1).removeLastStatus();
            this.visualLinkedList.get(1).displayArrow();
            this.visualLinkedList.get(2).setLastStatus();

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await queue.exampleDequeue(this.lineHighlighter, this.timer, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);