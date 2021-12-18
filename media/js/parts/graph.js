import LineHighlighter from "../modules/lineHighlighter.js";
import Timer from "../modules/timer.js";
import initExamples from "../modules/interactiveExample.js";
import VisualGraph from "../modules/visualGraph.js";

const firstGraph = new VisualGraph("first-graph");
firstGraph.addVertex("A", 215, 0);
firstGraph.addVertex("B", 50, 50);
firstGraph.addVertex("C", 50, 100);
firstGraph.addVertex("D", 215, 150);
firstGraph.addVertex("E", 380, 50);
firstGraph.addVertex("F", 380, 100);
firstGraph.addVertex("G", 280, 75);
firstGraph.addEdge("A", "B");
firstGraph.addEdge("B", "C");
firstGraph.addEdge("C", "D");
firstGraph.addEdge("D", "F");
firstGraph.addEdge("F", "E");
firstGraph.addEdge("E", "A");
firstGraph.addEdge("B", "D");
firstGraph.addEdge("D", "G");
firstGraph.addEdge("G", "F");
firstGraph.addEdge("A", "G");

const weightedGraph = new VisualGraph("weighted-graph");
weightedGraph.addVertex("A", 215, 0);
weightedGraph.addVertex("B", 145, 50);
weightedGraph.addVertex("C", 40, 110);
weightedGraph.addVertex("D", 215, 150);
weightedGraph.addVertex("E", 390, 40);
weightedGraph.addVertex("F", 300, 110);
weightedGraph.addEdge("C", "D", 20);
weightedGraph.addEdge("B", "D", 15);
weightedGraph.addEdge("B", "F", 17);
weightedGraph.addEdge("D", "F", 7);
weightedGraph.addEdge("A", "B", 8);
weightedGraph.addEdge("A", "E", 10);

const directedGraph = new VisualGraph("directed-graph");
directedGraph.addVertex("A", 215, 0);
directedGraph.addVertex("B", 50, 50);
directedGraph.addVertex("C", 135, 100);
directedGraph.addVertex("D", 215, 150);
directedGraph.addVertex("E", 310, 50);
directedGraph.addVertex("F", 380, 100);
directedGraph.addEdge("B", "A", null, true);
directedGraph.addEdge("B", "C", null, true);
directedGraph.addEdge("B", "E", null, true);
directedGraph.addEdge("D", "E", null, true);
directedGraph.addEdge("F", "D", null, true);
directedGraph.addEdge("F", "E", null, true);

const adjacencyMatrixGraph = new VisualGraph("adjacency-matrix-graph");
adjacencyMatrixGraph.addVertex("A", 190, 0);
adjacencyMatrixGraph.addVertex("B", 370, 30);
adjacencyMatrixGraph.addVertex("C", 410, 85);
adjacencyMatrixGraph.addVertex("D", 300, 125);
adjacencyMatrixGraph.addVertex("E", 110, 150);
adjacencyMatrixGraph.addVertex("F", 20, 60);
adjacencyMatrixGraph.addEdge("A", "B");
adjacencyMatrixGraph.addEdge("B", "C");
adjacencyMatrixGraph.addEdge("C", "D");
adjacencyMatrixGraph.addEdge("D", "E");
adjacencyMatrixGraph.addEdge("E", "F");
adjacencyMatrixGraph.addEdge("F", "A");

const adjacencyListArrayGraph = new VisualGraph("adjacency-list-array-graph");
adjacencyListArrayGraph.addVertex("0", 190, 0);
adjacencyListArrayGraph.addVertex("1", 370, 30);
adjacencyListArrayGraph.addVertex("2", 410, 85);
adjacencyListArrayGraph.addVertex("3", 300, 125);
adjacencyListArrayGraph.addVertex("4", 110, 150);
adjacencyListArrayGraph.addVertex("5", 20, 60);
adjacencyListArrayGraph.addEdge("0", "1");
adjacencyListArrayGraph.addEdge("1", "2");
adjacencyListArrayGraph.addEdge("2", "3");
adjacencyListArrayGraph.addEdge("3", "4");
adjacencyListArrayGraph.addEdge("4", "5");
adjacencyListArrayGraph.addEdge("5", "0");

const adjacencyListHashMapGraph = new VisualGraph("adjacency-list-hash-map-graph");
adjacencyListHashMapGraph.addVertex("A", 190, 0);
adjacencyListHashMapGraph.addVertex("B", 370, 30);
adjacencyListHashMapGraph.addVertex("C", 410, 85);
adjacencyListHashMapGraph.addVertex("D", 300, 125);
adjacencyListHashMapGraph.addVertex("E", 110, 150);
adjacencyListHashMapGraph.addVertex("F", 20, 60);
adjacencyListHashMapGraph.addEdge("A", "B");
adjacencyListHashMapGraph.addEdge("B", "C");
adjacencyListHashMapGraph.addEdge("C", "D");
adjacencyListHashMapGraph.addEdge("D", "E");
adjacencyListHashMapGraph.addEdge("E", "F");
adjacencyListHashMapGraph.addEdge("F", "A");


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
        visualGraph: new VisualGraph("graph-1"),
        timer: new Timer(),
        code: async function() {
            let proceed;

            this.lineHighlighter.highlight(14);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("A", 215, 0);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(14);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(15);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("B", 50, 50);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(15);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(16);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("C", 50, 100);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(16);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(17);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("D", 215, 150);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(17);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(18);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("E", 380, 50);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(18);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(19);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("F", 380, 100);

            this.lineHighlighter.highlight(6);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(19);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 2,
        lineHighlighter: new LineHighlighter("code-2"),
        visualGraph: new VisualGraph("graph-2", ["v1", "v2"]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleAddEdge = async function(v1, v2, lineHighlighter, timer, visualGraph) {

                visualGraph.setPointerToVertex("v1", v1);
                if (v1 === "B" || v1 === "D" || v1 === "E") visualGraph.setPointerUp("v1");
                visualGraph.setPointerToVertex("v2", v2);
                if (v2 === "B" || v2 === "D" || v2 === "E") visualGraph.setPointerUp("v2");

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

                if (!this.adjacencyList[v1].includes(v2)) this.adjacencyList[v1].push(v2);
                if (!this.adjacencyList[v2].includes(v1)) this.adjacencyList[v2].push(v1);

                visualGraph.addEdge(v1, v2, null, true);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.setEdgeAsUndirected(v1, v2);

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("v1");
                visualGraph.setPointerDown("v1");
                visualGraph.hidePointer("v2");
                visualGraph.setPointerDown("v2");
            }

            this.lineHighlighter.highlight(15);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C");

            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 50); this.visualGraph.addVertex("C", 50, 100);

            this.lineHighlighter.highlight(18);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("D"); graph.addVertex("E"); graph.addVertex("F");

            this.visualGraph.addVertex("D", 215, 150); this.visualGraph.addVertex("E", 380, 50); this.visualGraph.addVertex("F", 380, 100);

            this.lineHighlighter.highlight(19);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("A", "B", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("B", "C", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("C", "D", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("D", "F", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("D", "E", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("F", "E", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(27);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("E", "A", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleAddEdge("B", "D", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 3,
        lineHighlighter: new LineHighlighter("code-3"),
        visualGraph: new VisualGraph("graph-3", ["v1", "v2"]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleRemoveEdge = async function(v1, v2, lineHighlighter, timer, visualGraph) {

                visualGraph.setPointerToVertex("v1", v1);
                if (v1 === "B" || v1 === "D") visualGraph.setPointerUp("v1");
                visualGraph.setPointerToVertex("v2", v2);
                if (v2 === "B" || v2 === "D") visualGraph.setPointerUp("v2");

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

                let index = this.adjacencyList[v1].findIndex((val) => val === v2);

                lineHighlighter.highlight(9);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.adjacencyList[v1].splice(index, 1);

                visualGraph.setEdgeAsDirected(v1, v2);
                visualGraph.invertEdge(v1, v2);

                lineHighlighter.highlight(11);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                index = this.adjacencyList[v2].findIndex((val) => val === v1);

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                this.adjacencyList[v2].splice(index, 1);

                visualGraph.removeEdge(v1, v2);

                lineHighlighter.highlight(16);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("v1");
                visualGraph.setPointerDown("v1");
                visualGraph.hidePointer("v2");
                visualGraph.setPointerDown("v2");
            }

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C");

            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 50); this.visualGraph.addVertex("C", 50, 100);

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("D"); graph.addVertex("E"); graph.addVertex("F");

            this.visualGraph.addVertex("D", 215, 150); this.visualGraph.addVertex("E", 380, 50); this.visualGraph.addVertex("F", 380, 100);

            this.lineHighlighter.highlight(23);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addEdge("A", "B"); graph.addEdge("B", "C"); graph.addEdge("C", "D"); graph.addEdge("D", "F");
            this.visualGraph.addEdge("A", "B"); this.visualGraph.addEdge("B", "C"); this.visualGraph.addEdge("C", "D"); this.visualGraph.addEdge("D", "F");

            this.lineHighlighter.highlight(24);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addEdge("D", "E"); graph.addEdge("F", "E"); graph.addEdge("E", "A"); graph.addEdge("B", "D");
            this.visualGraph.addEdge("D", "E"); this.visualGraph.addEdge("F", "E"); this.visualGraph.addEdge("E", "A"); this.visualGraph.addEdge("B", "D");

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleRemoveEdge("A", "B", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(28);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleRemoveEdge("B", "D", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(29);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleRemoveEdge("D", "F", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(30);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    },
    {
        exampleId: 4,
        lineHighlighter: new LineHighlighter("code-4"),
        visualGraph: new VisualGraph("graph-4", ["adjacentVertex", "vertex"]),
        timer: new Timer(),
        code: async function() {
            let proceed;

            const graph = new Graph();

            graph.exampleRemoveVertex = async function(vertex, lineHighlighter, timer, visualGraph) {

                visualGraph.setPointerToVertex("vertex", vertex);
                if (vertex === "B") visualGraph.setPointerUp("vertex");

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while(this.adjacencyList[vertex].length){
                    const adjacentVertex = this.adjacencyList[vertex].pop();

                    visualGraph.setPointerToVertex("adjacentVertex", adjacentVertex);
                    if (adjacentVertex === "A" || adjacentVertex === "C") visualGraph.setPointerDown("adjacentVertex");
                    else visualGraph.setPointerUp("adjacentVertex");

                    lineHighlighter.highlight(8);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    this.removeEdge(vertex, adjacentVertex);
                    visualGraph.removeEdge(vertex, adjacentVertex);

                    lineHighlighter.highlight(10);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualGraph.hidePointer("adjacentVertex");

                    lineHighlighter.highlight(6);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }
                delete this.adjacencyList[vertex];
                visualGraph.removeVertex(vertex);

                lineHighlighter.highlight(13);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("vertex");
            }

            this.lineHighlighter.highlight(18);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("A"); graph.addVertex("B"); graph.addVertex("C");
            this.visualGraph.addVertex("A", 215, 0); this.visualGraph.addVertex("B", 50, 50); this.visualGraph.addVertex("C", 50, 100);

            this.lineHighlighter.highlight(19);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addVertex("D"); graph.addVertex("E"); graph.addVertex("F");
            this.visualGraph.addVertex("D", 215, 150); this.visualGraph.addVertex("E", 380, 50); this.visualGraph.addVertex("F", 380, 100);

            this.lineHighlighter.highlight(20);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addEdge("A", "B"); graph.addEdge("B", "C"); graph.addEdge("C", "D"); graph.addEdge("D", "F");
            this.visualGraph.addEdge("A", "B"); this.visualGraph.addEdge("B", "C"); this.visualGraph.addEdge("C", "D"); this.visualGraph.addEdge("D", "F");

            this.lineHighlighter.highlight(21);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            graph.addEdge("D", "E"); graph.addEdge("F", "E"); graph.addEdge("E", "A"); graph.addEdge("B", "D");
            this.visualGraph.addEdge("D", "E"); this.visualGraph.addEdge("F", "E"); this.visualGraph.addEdge("E", "A"); this.visualGraph.addEdge("B", "D");

            this.lineHighlighter.highlight(22);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleRemoveVertex("F", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(25);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            await graph.exampleRemoveVertex("B", this.lineHighlighter, this.timer, this.visualGraph);

            if (!proceed) return;

            this.lineHighlighter.highlight(26);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);