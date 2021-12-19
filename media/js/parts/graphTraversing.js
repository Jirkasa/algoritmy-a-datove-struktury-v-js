import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualGraph from "../modules/visualGraph.js";
import VisualArray from "../modules/visualArray.js";
import VisualLinkedList from "../modules/visualLinkedList.js";
import Console from "../modules/console.js";
import CallStack from "../modules/callStack.js";

import Stack from "../modules/stack.js";


// used for interactive examples
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
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

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        if (!this.adjacencyList[v1].includes(v2)) this.adjacencyList[v1].push(v2);
        if (!this.adjacencyList[v2].includes(v1)) this.adjacencyList[v2].push(v1);
    }

    removeEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        let index = this.adjacencyList[v1].findIndex((val) => val === v2);
        if (index !== -1) this.adjacencyList[v1].splice(index, 1);

        index = this.adjacencyList[v2].findIndex((val) => val === v1);
        if (index !== -1) this.adjacencyList[v2].splice(index, 1);
    }
}


const config = [
    {
        exampleId: 1,
        lineHighlighter: new LineHighlighter("code-1"),
        visualGraph: new VisualGraph("graph-1", ["startVertex", "vertex", "adjacentVertex"]),
        visualArray: new VisualArray("visual-array-1", 9),
        timer: new Timer(),
        console: new Console("console-1"),
        callStack: new CallStack("call-stack-1"),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleDFRecursive = async function(startVertex, lineHighlighter, timer, visualGraph, visualArray, callStack) {
                callStack.push("DFRecursive");
                visualGraph.setPointerToVertex("startVertex", startVertex);
                visualGraph.setPointerUp("startVertex");

                const result = [];

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const visited = {};

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const df = async (vertex) => {
                    callStack.push("df");
                    visualGraph.setPointerToVertex("vertex", vertex);
                    if (vertex === "G" || vertex === "F" || vertex === "E" || vertex === "B") visualGraph.setPointerUp("vertex");
                    else visualGraph.setPointerDown("vertex");
                    visualGraph.hidePointer("adjacentVertex");

                    lineHighlighter.highlight(13);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (!this.adjacencyList[vertex]) return;

                    visited[vertex] = true;

                    visualGraph.setVertexAsVisited(vertex);

                    lineHighlighter.highlight(16);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    result.push(vertex);

                    visualArray.pushItem(vertex);

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (this.adjacencyList[vertex][0]) {
                        visualGraph.setPointerToVertex("adjacentVertex", this.adjacencyList[vertex][0]);
                        if (this.adjacencyList[vertex][0] === "G" || this.adjacencyList[vertex][0] === "F" || this.adjacencyList[vertex][0] === "E" || this.adjacencyList[vertex][0] === "B") visualGraph.setPointerUp("adjacentVertex");
                        else visualGraph.setPointerDown("adjacentVertex");
                    }

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let firstIteration = true;

                    for (let adjacentVertex of this.adjacencyList[vertex]) {
                        if (firstIteration) {
                            firstIteration = false;
                        } else {
                            visualGraph.setPointerToVertex("adjacentVertex", adjacentVertex);
                            if (adjacentVertex === "G" || adjacentVertex === "F" || adjacentVertex === "E" || adjacentVertex === "B") visualGraph.setPointerUp("adjacentVertex");
                            else visualGraph.setPointerDown("adjacentVertex");

                            lineHighlighter.highlight(21);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        lineHighlighter.highlight(23);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (!visited[adjacentVertex]) {
                            await df(adjacentVertex);

                            visualGraph.setPointerToVertex("vertex", vertex);
                            if (vertex === "G" || vertex === "F" || vertex === "E" || vertex === "B") visualGraph.setPointerUp("vertex");
                            else visualGraph.setPointerDown("vertex");
                            visualGraph.setPointerToVertex("adjacentVertex", adjacentVertex);
                            if (adjacentVertex === "G" || adjacentVertex === "F" || adjacentVertex === "E" || adjacentVertex === "B") visualGraph.setPointerUp("adjacentVertex");
                            else visualGraph.setPointerDown("adjacentVertex");

                            lineHighlighter.highlight(23);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        if (!proceed) return;

                        visualGraph.hidePointer("adjacentVertex");
                    }

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualGraph.hidePointer("vertex");
                    callStack.pop();
                }

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                await df(startVertex);

                if (!proceed) return;

                lineHighlighter.highlight(27);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(30);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("startVertex");
                callStack.pop();

                return result;
            }

            this.lineHighlighter.highlight(35);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C"); graph.addVertex("D");
            graph.addVertex("E"); graph.addVertex("F"); graph.addVertex("G"); graph.addVertex("H");
            graph.addVertex("I");
            graph.addEdge("A", "D"); graph.addEdge("D", "B"); graph.addEdge("D", "E"); graph.addEdge("B", "C");
            graph.addEdge("D", "C"); graph.addEdge("E", "F"); graph.addEdge("F", "G"); graph.addEdge("G", "A");
            graph.addEdge("G", "H"); graph.addEdge("E", "I"); graph.addEdge("I", "F");

            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 40); this.visualGraph.addVertex("C", 50, 110); this.visualGraph.addVertex("D", 120, 75);

            this.lineHighlighter.highlight(36);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("E", 215, 150); this.visualGraph.addVertex("F", 310, 75); this.visualGraph.addVertex("G", 380, 40); this.visualGraph.addVertex("H", 380, 110);

            this.lineHighlighter.highlight(37);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("I", 330, 115);

            this.lineHighlighter.highlight(38);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("A", "D"); this.visualGraph.addEdge("D", "B"); this.visualGraph.addEdge("D", "E"); this.visualGraph.addEdge("B", "C");

            this.lineHighlighter.highlight(39);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("D", "C"); this.visualGraph.addEdge("E", "F"); this.visualGraph.addEdge("F", "G"); this.visualGraph.addEdge("G", "A");

            this.lineHighlighter.highlight(40);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("G", "H"); this.visualGraph.addEdge("E", "I"); this.visualGraph.addEdge("I", "F");

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await graph.exampleDFRecursive("D", this.lineHighlighter, this.timer, this.visualGraph, this.visualArray, this.callStack);

            if (!proceed) return;

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Graph se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(45);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(46);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        lineHighlighter: new LineHighlighter("code-2"),
        visualGraph: new VisualGraph("graph-2", ["startVertex", "currentVertex", "neighbor"]),
        visualArray: new VisualArray("visual-array-2", 9),
        visualLinkedList: new VisualLinkedList("stack-1"),
        timer: new Timer(),
        console: new Console("console-2"),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleDFIterative = async function(startVertex, lineHighlighter, timer, visualGraph, visualArray, visualLinkedList) {
                visualGraph.setPointerToVertex("startVertex", startVertex);
                visualGraph.setPointerUp("startVertex");
                
                const stack = new Stack();

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const result = [];

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const visited = {};

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let currentVertex;

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
                
                stack.push(startVertex);

                visualLinkedList.unshift(startVertex);
                visualLinkedList.get(0).setFirstStatus();

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visited[startVertex] = true;

                visualGraph.setVertexAsVisited(startVertex);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (stack.size !== 0) {
                    currentVertex = stack.pop();

                    visualLinkedList.shift();
                    if (visualLinkedList.length !== 0) visualLinkedList.get(0).setFirstStatus();

                    visualGraph.setPointerToVertex("currentVertex", currentVertex);
                    if (currentVertex === "G" || currentVertex === "F" || currentVertex === "E" || currentVertex === "B") visualGraph.setPointerUp("currentVertex");
                    else visualGraph.setPointerDown("currentVertex");

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    result.push(currentVertex);

                    visualArray.pushItem(currentVertex);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let firstIteration = true;
                    if (this.adjacencyList[currentVertex][0]) {
                        visualGraph.setPointerToVertex("neighbor", this.adjacencyList[currentVertex][0]);
                        if (this.adjacencyList[currentVertex][0] === "G" || this.adjacencyList[currentVertex][0] === "F" || this.adjacencyList[currentVertex][0] === "E" || this.adjacencyList[currentVertex][0] === "B") visualGraph.setPointerUp("neighbor");
                    }

                    lineHighlighter.highlight(26);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    for (let neighbor of this.adjacencyList[currentVertex]) {
                        if (firstIteration) {
                            firstIteration = false;
                        } else {
                            visualGraph.setPointerToVertex("neighbor", neighbor);
                            if (neighbor === "G" || neighbor === "F" || neighbor === "E" || neighbor === "B") visualGraph.setPointerUp("neighbor");

                            lineHighlighter.highlight(26);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        lineHighlighter.highlight(28);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (!visited[neighbor]) {
                            stack.push(neighbor);

                            visualLinkedList.unshift(neighbor);
                            visualLinkedList.get(0).setFirstStatus();
                            if (visualLinkedList.length > 1) {
                                visualLinkedList.get(1).removeFirstStatus();
                                visualLinkedList.get(0).displayArrow();
                            }

                            lineHighlighter.highlight(29);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            visited[neighbor] = true;

                            visualGraph.setVertexAsVisited(neighbor);

                            lineHighlighter.highlight(30);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        visualGraph.hidePointer("neighbor");
                        visualGraph.setPointerDown("neighbor");
                    }

                    lineHighlighter.highlight(26);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(19);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(36);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("startVertex");
                visualGraph.hidePointer("currentVertex");

                return result;
            }

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C"); graph.addVertex("D");
            graph.addVertex("E"); graph.addVertex("F"); graph.addVertex("G"); graph.addVertex("H");
            graph.addVertex("I");
            graph.addEdge("A", "D"); graph.addEdge("D", "B"); graph.addEdge("D", "E"); graph.addEdge("B", "C");
            graph.addEdge("D", "C"); graph.addEdge("E", "F"); graph.addEdge("F", "G"); graph.addEdge("G", "A");
            graph.addEdge("G", "H"); graph.addEdge("E", "I"); graph.addEdge("I", "F");

            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 40); this.visualGraph.addVertex("C", 50, 110); this.visualGraph.addVertex("D", 120, 75);

            this.lineHighlighter.highlight(42);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("E", 215, 150); this.visualGraph.addVertex("F", 310, 75); this.visualGraph.addVertex("G", 380, 40); this.visualGraph.addVertex("H", 380, 110);

            this.lineHighlighter.highlight(43);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("I", 330, 115);

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("A", "D"); this.visualGraph.addEdge("D", "B"); this.visualGraph.addEdge("D", "E"); this.visualGraph.addEdge("B", "C");

            this.lineHighlighter.highlight(45);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("D", "C"); this.visualGraph.addEdge("E", "F"); this.visualGraph.addEdge("F", "G"); this.visualGraph.addEdge("G", "A");

            this.lineHighlighter.highlight(46);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("G", "H"); this.visualGraph.addEdge("E", "I"); this.visualGraph.addEdge("I", "F");

            this.lineHighlighter.highlight(47);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await graph.exampleDFIterative("D", this.lineHighlighter, this.timer, this.visualGraph, this.visualArray, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Graph se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(51);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(52);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        lineHighlighter: new LineHighlighter("code-3"),
        visualGraph: new VisualGraph("graph-3", ["startVertex", "currentVertex", "neighbor"]),
        visualArray: new VisualArray("visual-array-3", 9),
        visualLinkedList: new VisualLinkedList("queue-1"),
        timer: new Timer(),
        console: new Console("console-3"),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleBF = async function(startVertex, lineHighlighter, timer, visualGraph, visualArray, visualLinkedList) {
                visualGraph.setPointerToVertex("startVertex", startVertex);
                visualGraph.setPointerUp("startVertex");
                
                const queue = new Queue();

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const result = [];

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const visited = {};

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let currentVertex;

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();
                
                queue.enqueue(startVertex);

                visualLinkedList.push(startVertex);
                visualLinkedList.get(0).setFirstStatus();
                visualLinkedList.get(0).setLastStatus();

                lineHighlighter.highlight(15);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visited[startVertex] = true;

                visualGraph.setVertexAsVisited(startVertex);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(19);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (queue.size !== 0) {
                    currentVertex = queue.dequeue();

                    visualLinkedList.shift();
                    if (visualLinkedList.length !== 0) visualLinkedList.get(0).setFirstStatus();

                    visualGraph.setPointerToVertex("currentVertex", currentVertex);
                    if (currentVertex === "G" || currentVertex === "F" || currentVertex === "E" || currentVertex === "B") visualGraph.setPointerUp("currentVertex");
                    else visualGraph.setPointerDown("currentVertex");

                    lineHighlighter.highlight(21);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    result.push(currentVertex);

                    visualArray.pushItem(currentVertex);

                    lineHighlighter.highlight(23);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    let firstIteration = true;
                    if (this.adjacencyList[currentVertex][0]) {
                        visualGraph.setPointerToVertex("neighbor", this.adjacencyList[currentVertex][0]);
                        if (this.adjacencyList[currentVertex][0] === "G" || this.adjacencyList[currentVertex][0] === "F" || this.adjacencyList[currentVertex][0] === "E" || this.adjacencyList[currentVertex][0] === "B") visualGraph.setPointerUp("neighbor");
                    }

                    lineHighlighter.highlight(26);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    for (let neighbor of this.adjacencyList[currentVertex]) {
                        if (firstIteration) {
                            firstIteration = false;
                        } else {
                            visualGraph.setPointerToVertex("neighbor", neighbor);
                            if (neighbor === "G" || neighbor === "F" || neighbor === "E" || neighbor === "B") visualGraph.setPointerUp("neighbor");

                            lineHighlighter.highlight(26);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        lineHighlighter.highlight(28);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (!visited[neighbor]) {
                            queue.enqueue(neighbor);

                            visualLinkedList.push(neighbor);
                            visualLinkedList.get(visualLinkedList.length-1).setLastStatus();
                            if (visualLinkedList.length > 1) {
                                visualLinkedList.get(visualLinkedList.length-2).removeLastStatus();
                                visualLinkedList.get(visualLinkedList.length-2).displayArrow();
                            } else {
                                visualLinkedList.get(0).setFirstStatus();
                            }

                            lineHighlighter.highlight(29);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            visited[neighbor] = true;

                            visualGraph.setVertexAsVisited(neighbor);

                            lineHighlighter.highlight(30);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        visualGraph.hidePointer("neighbor");
                        visualGraph.setPointerDown("neighbor");
                    }

                    lineHighlighter.highlight(26);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(19);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(36);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("startVertex");
                visualGraph.hidePointer("currentVertex");

                return result;
            }

            this.lineHighlighter.highlight(41);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C"); graph.addVertex("D");
            graph.addVertex("E"); graph.addVertex("F"); graph.addVertex("G"); graph.addVertex("H");
            graph.addVertex("I");
            graph.addEdge("A", "D"); graph.addEdge("D", "B"); graph.addEdge("D", "E"); graph.addEdge("B", "C");
            graph.addEdge("D", "C"); graph.addEdge("E", "F"); graph.addEdge("F", "G"); graph.addEdge("G", "A");
            graph.addEdge("G", "H"); graph.addEdge("E", "I"); graph.addEdge("I", "F");

            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 40); this.visualGraph.addVertex("C", 50, 110); this.visualGraph.addVertex("D", 120, 75);

            this.lineHighlighter.highlight(42);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("E", 215, 150); this.visualGraph.addVertex("F", 310, 75); this.visualGraph.addVertex("G", 380, 40); this.visualGraph.addVertex("H", 380, 110);

            this.lineHighlighter.highlight(43);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("I", 330, 115);

            this.lineHighlighter.highlight(44);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("A", "D"); this.visualGraph.addEdge("D", "B"); this.visualGraph.addEdge("D", "E"); this.visualGraph.addEdge("B", "C");

            this.lineHighlighter.highlight(45);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("D", "C"); this.visualGraph.addEdge("E", "F"); this.visualGraph.addEdge("F", "G"); this.visualGraph.addEdge("G", "A");

            this.lineHighlighter.highlight(46);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("G", "H"); this.visualGraph.addEdge("E", "I"); this.visualGraph.addEdge("I", "F");

            this.lineHighlighter.highlight(47);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const vysledek = await graph.exampleBF("D", this.lineHighlighter, this.timer, this.visualGraph, this.visualArray, this.visualLinkedList);

            if (!proceed) return;

            this.lineHighlighter.highlight(50);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Graph se procházel v tomto pořadí:");

            this.lineHighlighter.highlight(51);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + vysledek + "]");

            this.lineHighlighter.highlight(52);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);