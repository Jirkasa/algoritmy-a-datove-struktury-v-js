import Timer from "../modules/timer.js";
import VisualDijkstraExplanation from "../modules/visualDijkstraExplanation.js";
import initExamples from "../modules/interactiveExample.js";
import VisualGraph from "../modules/visualGraph.js";
import Console from "../modules/console.js";
import VisualObjects from "../modules/visualObjects.js";
import VisualObject from "../modules/visualObject.js";
import VisualPriorityQueue from "../modules/visualPriorityQueue.js";
import LineHighlighter from "../modules/lineHighlighter.js";


// used for interactive examples
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
        this.length = 0;
    }

    enqueue(value, priority) {
        this.values.push(new Node(value, priority));
        this.length++;
        this.bubbleUp();
    }

    bubbleUp() {
        let idx = this.values.length-1;

        while (idx > 0) {
            const parentIdx = Math.trunc((idx-1)/2);

            if (this.values[idx].priority >= this.values[parentIdx].priority) break;

            const parent = this.values[parentIdx];
            this.values[parentIdx] = this.values[idx];
            this.values[idx] = parent;

            idx = parentIdx;
        }
    }

    dequeue() {
        const max = this.values[0];
        const end = this.values.pop();
        this.length--;
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }

    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];

        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }

            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

// used for interactive examples (methods for interactive examples should be added to instance if needed)
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(v1, v2, weight) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;
        if (this.adjacencyList[v1].findIndex(v => v.node === v2) === -1) this.adjacencyList[v1].push({node: v2, weight});
        if (this.adjacencyList[v2].findIndex(v => v.node === v1) === -1) this.adjacencyList[v2].push({node: v1, weight});
    }

    removeEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;
        let index = this.adjacencyList[v1].findIndex((v) => v.node === v2);
        if (index !== -1) this.adjacencyList[v1].splice(index, 1);
        index = this.adjacencyList[v2].findIndex((v) => v.node === v1);
        if (index !== -1) this.adjacencyList[v2].splice(index, 1);
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex.node);
        }
        delete this.adjacencyList[vertex];
    }
}


const config = [
    {
        exampleId: 1,
        timer: new Timer(),
        visualDijkstraExplanation: new VisualDijkstraExplanation("dijkstra-explanation-graph", "dijkstra-explanation-message", "dijkstra-explanation-shortest-path-table-body", [
            {vertex: "A", elementId: "previous-vertex-1"},
            {vertex: "B", elementId: "previous-vertex-2"},
            {vertex: "C", elementId: "previous-vertex-3"},
            {vertex: "D", elementId: "previous-vertex-4"},
            {vertex: "E", elementId: "previous-vertex-5"},
            {vertex: "F", elementId: "previous-vertex-6"}
        ], "dijkstra-explanation-visited-vertices"),
        code: async function() {
            let proceed;

            proceed = await this.timer.wait(500); if (!proceed) return;

            const graph = new WeightedGraph();
            graph.addVertex("A");
            graph.addVertex("B");
            graph.addVertex("E");
            graph.addVertex("F");
            graph.addVertex("D");
            graph.addVertex("C");
            graph.addEdge("A", "B", 4);
            graph.addEdge("A", "C", 2);
            graph.addEdge("B", "E", 3);
            graph.addEdge("C", "D", 2);
            graph.addEdge("D", "E", 3);
            graph.addEdge("D", "F", 1);
            graph.addEdge("C", "F", 4);
            graph.addEdge("F", "E", 1);
            
            graph.exampleShortestPath = async function(start, finish, timer, visualDijkstraExplanation) {
                const nodes = new PriorityQueue();
                const distances = {};
                const previous = {};
                let path = []; // to return at end
                let smallest;

                // build up initial state
                for (let vertex in this.adjacencyList) {
                    if (vertex === start) {
                        distances[vertex] = 0;
                        nodes.enqueue(vertex, 0);

                        visualDijkstraExplanation.setMessage("Začneme u vertexu A. Víme že nejkratší vzdálenost z vertexu A do A, je 0, takže jsme si to zapsali do tabulky s nejkratšími vzdálenostmi.");
                        visualDijkstraExplanation.changeShortestPath(vertex, 0);

                        proceed = await timer.wait(500); if (!proceed) return;

                    } else {
                        distances[vertex] = Infinity;
                        nodes.enqueue(vertex, Infinity);
                    }
                    previous[vertex] = null;
                }

                let vertexFForSecondTime = false;

                // as long as there is something to visit
                while (nodes.length > 0) {
                    smallest = nodes.dequeue().value;

                    if (smallest === "F") {
                        if (!vertexFForSecondTime) {
                            vertexFForSecondTime = true;
                        } else {
                            continue;
                        }
                    }

                    if (smallest === "A") {
                        visualDijkstraExplanation.setMessage("Podíváme se na tabulku s nejkratšími vzdálenostmi. Vybereme si vertex s nejkratší vzdáleností od vertexu A.");
                    } else {
                        visualDijkstraExplanation.setMessage("Podíváme se na tabulku s nejkratšími vzdálenostmi. Vybereme si vertex s nejkratší vzdáleností od vertexu A, který jsme ještě nenavštívili (nebo jsme jej navštívili, ale mezitím se u něj změnila hodnota).");
                    }
                    proceed = await timer.wait(500); if (!proceed) return;

                    visualDijkstraExplanation.setActiveVertex(smallest);

                    if (smallest === "A") {
                        visualDijkstraExplanation.setMessage("V tabulce zatím máme nejkratší vzdálenost jen pro vertex A, takže jsme si jej vybrali.");
                    } else if (smallest !== "B") {
                        visualDijkstraExplanation.setMessage(`Nejkratší vzdálenost od vertexu A má vertex ${smallest}, takže jsme si jej vybrali.`);
                    } else {
                        visualDijkstraExplanation.setMessage(`Nejkratší vzdálenost od vertexu A má vertex B nebo D. Vybrali jsme si třeba B.`);
                    }

                    proceed = await timer.wait(500); if (!proceed) return;

                    if (smallest === finish) {
                        // WE ARE DONE
                        // BUILD UP PATH TO RETURN AT END
                        while (previous[smallest]) {
                            path.push(smallest);
                            smallest = previous[smallest];
                        }

                        visualDijkstraExplanation.setMessage("Protože jsme si vybrali vertex, ke kterému jsme chtěli získat nejkratší cestu, tak máme hotovo.");
                        proceed = await timer.wait(500); if (!proceed) return;

                        visualDijkstraExplanation.setMessage("Zjistili jsme, že nejkratší cesta z vertexu A k vertexu E vede přes vertexy C, D a F. Předchozí vertex vertexu E je F, přechozí vertex vertexu F je D, předchozí vertex vertexu D je C a přechozí vertex vertexu C je A.");
                        proceed = await timer.wait(500); if (!proceed) return;

                        visualDijkstraExplanation.setMessage("Doufám, že vám tato vizuální ukázka pomohla Dijkstrův algoritmus pochopit. :)");

                        break;
                    }

                    visualDijkstraExplanation.setMessage(`Projdeme všechny vertexy, se kterými je vertex ${smallest} propojený.`);
                    proceed = await timer.wait(500); if (!proceed) return;

                    let firstNeighbor = true;
                    let neighborIndex = 0;

                    for (let neighbor of this.adjacencyList[smallest]) {
                        let candidate = distances[smallest] + neighbor.weight;

                        if (firstNeighbor) {
                            visualDijkstraExplanation.setMessage(`Začneme třeba u vertexu ${neighbor.node}. `);
                        } else {
                            if (this.adjacencyList[smallest].length === 2) {
                                visualDijkstraExplanation.setMessage(`Dále se podíváme ještě na druhý vertex, se kterým je vertex ${smallest} propojen. Takže na vertex ${neighbor.node}.`);
                            }
                            else if (neighborIndex === this.adjacencyList[smallest].length-1) {
                                visualDijkstraExplanation.setMessage(`A ještě se podíváme na poslední vertex, se kterým je vertex ${smallest} propojen. Takže na vertex ${neighbor.node}.`);
                            } else {
                                visualDijkstraExplanation.setMessage(`Podíváme se na další vertex, se kterým je vertex ${smallest} propojen. Třeba na vertex ${neighbor.node}.`);
                            }
                        }
                        proceed = await timer.wait(500); if (!proceed) return;

                        firstNeighbor = false;
                        neighborIndex++;

                        if (candidate < distances[neighbor.node]) {
                            const oldDistance = distances[neighbor.node];
                            distances[neighbor.node] = candidate;
                            previous[neighbor.node] = smallest;
                            nodes.enqueue(neighbor.node, candidate);

                            visualDijkstraExplanation.changeShortestPath(neighbor.node, candidate);
                            visualDijkstraExplanation.setPreviousVertex(neighbor.node, smallest);
                            if (visualDijkstraExplanation.isVisited(neighbor.node)) {
                                visualDijkstraExplanation.setAsUnvisited(neighbor.node);
                            }

                            if (oldDistance === Infinity) {
                                if (smallest === "A") {
                                    visualDijkstraExplanation.setMessage(`Pro vertex ${neighbor.node} v tabulce ještě nemáme žádnou hodnotu. Vzdálenost k vertexu ${neighbor.node} od vertexu A je ${candidate}, takže jsme si to zapsali. Také jsme si zapamatovali, že předcházejícím vertexem vertexu ${neighbor.node} je přímo vertex A.`);
                                } else {
                                    visualDijkstraExplanation.setMessage(`Pro vertex ${neighbor.node} v tabulce ještě nemáme žádnou hodnotu. Přes vertex ${smallest} je vzdálenost k tomuto vertexu ${candidate}, takže jsme si to zapsali. Také jsme si zapamatovali, že jsme se k tomuto vertexu dostali přes vertex ${smallest}.`);
                                }
                            } else {
                                visualDijkstraExplanation.setMessage(`Na vertex ${neighbor.node} je cesta přes vertex ${smallest} kratší, než cesta, kterou jsme měli zaznamenanou. Takže jsme vzdálenost k tomuto vertexu přepsali z ${oldDistance} na ${candidate}. Také jsme si zapamatovali, že nejkratší cesta k vertexu ${neighbor.node} vede přes vertex ${smallest} (Předcházející vertex vertexu ${neighbor.node} je ${smallest}).`);
                            }
                            proceed = await timer.wait(500); if (!proceed) return;
                        } else {
                            if (neighbor.node === "A") {
                                visualDijkstraExplanation.setMessage(`Na vertex A není cesta přes vertex ${smallest} kratší. Od vertexu A cesta začíná, vzdálenost na vertex A je tedy 0, což je nejkratší vzdálenost.`);
                            } else {
                                visualDijkstraExplanation.setMessage(`Na vertex ${neighbor.node} není cesta přes vertex ${smallest} kratší. V tabulce jsme tedy hodnotu pro vertex ${neighbor.node} nezměnili.`);
                            }
                            proceed = await timer.wait(500); if (!proceed) return;
                        }
                    }

                    visualDijkstraExplanation.setAsVisited(smallest);

                    visualDijkstraExplanation.setMessage(`Označili jsme si, že vertex ${smallest} jsme již navštívili.`);
                    proceed = await timer.wait(500); if (!proceed) return;

                    visualDijkstraExplanation.unsetActiveVertex();
                }
                return path.concat(smallest).reverse();
            }

            await graph.exampleShortestPath("A", "E", this.timer, this.visualDijkstraExplanation);

            this.finish();
        }
    },
    {
        exampleId: 2,
        visualGraph: new VisualGraph("weighted-graph-1", ["start", "finish", "vertex", "smallest", "neighbor"]),
        timer: new Timer(),
        console: new Console("console-1"),
        visualObjects: new VisualObjects(new VisualObject("code-distances-object", ["code-distance-A", "code-distance-B", "code-distance-C", "code-distance-D", "code-distance-E", "code-distance-F"]), new VisualObject("code-previous-object", ["code-previous-vertex-A", "code-previous-vertex-B", "code-previous-vertex-C", "code-previous-vertex-D", "code-previous-vertex-E", "code-previous-vertex-F"])),
        visualTree: new VisualPriorityQueue("priority-queue-1"),
        lineHighlighter: new LineHighlighter("code-1"),
        code: async function() {
            let proceed;

            const graph = new WeightedGraph();
            graph.addVertex("A");
            graph.addVertex("B");
            graph.addVertex("E");
            graph.addVertex("F");
            graph.addVertex("D");
            graph.addVertex("C");
            graph.addEdge("A", "B", 4);
            graph.addEdge("A", "C", 2);
            graph.addEdge("B", "E", 3);
            graph.addEdge("C", "D", 2);
            graph.addEdge("D", "E", 3);
            graph.addEdge("D", "F", 1);
            graph.addEdge("C", "F", 4);
            graph.addEdge("F", "E", 1);
            
            graph.exampleShortestPath = async function(start, finish, lineHighlighter, timer, visualGraph, visualObjects, visualTree) {
                
                visualGraph.setPointerToVertex("start", start);
                visualGraph.setPointerUp("start");
                visualGraph.setPointerToVertex("finish", finish);
                visualGraph.setPointerUp("finish");
                
                const nodes = new PriorityQueue();

                lineHighlighter.highlight(6);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const distances = {};

                visualObjects.get(0).show();

                lineHighlighter.highlight(8);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                const previous = {};

                visualObjects.get(1).show();

                lineHighlighter.highlight(10);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let path = [];

                lineHighlighter.highlight(12);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                let smallest;

                lineHighlighter.highlight(14);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                for (let vertex in this.adjacencyList) {

                    visualGraph.setPointerToVertex("vertex", vertex);
                    if (vertex === "F") visualGraph.setPointerUp("vertex");
                    
                    lineHighlighter.highlight(17);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(18);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (vertex === start) {
                        distances[vertex] = 0;

                        visualObjects.get(0).setValue("code-distance-" + vertex, 0);

                        lineHighlighter.highlight(20);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        nodes.enqueue(vertex, 0);

                        visualTree.enqueue(vertex, 0, false, true);

                        lineHighlighter.highlight(22);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    } else {
                        distances[vertex] = Infinity;

                        visualObjects.get(0).setValue("code-distance-" + vertex, Infinity);

                        lineHighlighter.highlight(25);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        nodes.enqueue(vertex, Infinity);

                        visualTree.enqueue(vertex, Infinity, false, true);

                        lineHighlighter.highlight(27);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();
                    }
                    previous[vertex] = null;

                    visualObjects.get(1).setValue("code-previous-vertex-" + vertex, "null");

                    lineHighlighter.highlight(30);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                    
                    visualGraph.hidePointer("vertex");
                    visualGraph.setPointerDown("vertex");
                }

                lineHighlighter.highlight(17);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                lineHighlighter.highlight(34);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                while (nodes.length > 0) {
                    smallest = nodes.dequeue().value;

                    visualTree.dequeue(true);

                    visualGraph.setPointerToVertex("smallest", smallest);
                    if (smallest === "F") visualGraph.setPointerUp("smallest");

                    lineHighlighter.highlight(36);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    lineHighlighter.highlight(39);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    if (smallest === finish) {

                        lineHighlighter.highlight(41);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        while (previous[smallest]) {
                            path.push(smallest);

                            lineHighlighter.highlight(42);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                            
                            smallest = previous[smallest];

                            visualGraph.setPointerToVertex("smallest", smallest);
                            if (smallest === "F") visualGraph.setPointerUp("smallest");
                            else visualGraph.setPointerDown("smallest");

                            lineHighlighter.highlight(43);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            lineHighlighter.highlight(41);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        lineHighlighter.highlight(46);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        visualGraph.hidePointer("smallest");

                        break;
                    }

                    for (let neighbor of this.adjacencyList[smallest]) {

                        visualGraph.setPointerToVertex("neighbor", neighbor.node);
                        if (neighbor.node === "F") visualGraph.setPointerUp("neighbor");

                        lineHighlighter.highlight(50);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        let candidate = distances[smallest] + neighbor.weight;

                        lineHighlighter.highlight(52);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        lineHighlighter.highlight(55);
                        proceed = await timer.wait(500); if (!proceed) return;
                        lineHighlighter.clear();

                        if (candidate < distances[neighbor.node]) {
                            distances[neighbor.node] = candidate;

                            visualObjects.get(0).setValue("code-distance-" + neighbor.node, candidate);

                            lineHighlighter.highlight(57);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                            
                            previous[neighbor.node] = smallest;

                            visualObjects.get(1).setValue("code-previous-vertex-" + neighbor.node, smallest);

                            lineHighlighter.highlight(59);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();

                            nodes.enqueue(neighbor.node, candidate);

                            visualTree.enqueue(neighbor.node, candidate, false, true);

                            lineHighlighter.highlight(61);
                            proceed = await timer.wait(500); if (!proceed) return;
                            lineHighlighter.clear();
                        }

                        visualGraph.hidePointer("neighbor");
                        visualGraph.setPointerDown("neighbor");
                    }

                    lineHighlighter.highlight(50);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();

                    visualGraph.hidePointer("smallest");
                    visualGraph.setPointerDown("smallest");

                    lineHighlighter.highlight(34);
                    proceed = await timer.wait(500); if (!proceed) return;
                    lineHighlighter.clear();
                }

                lineHighlighter.highlight(66);
                proceed = await timer.wait(500); if (!proceed) return;
                lineHighlighter.clear();

                visualGraph.hidePointer("start");
                visualGraph.hidePointer("finish");

                return path.concat(smallest).reverse();
            }

            this.lineHighlighter.highlight(71);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("A", 140, 0); this.visualGraph.addVertex("B", 300, 30); this.visualGraph.addVertex("E", 430, 100);

            this.lineHighlighter.highlight(72);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addVertex("F", 260, 150); this.visualGraph.addVertex("D", 200, 60); this.visualGraph.addVertex("C", 0, 85);

            this.lineHighlighter.highlight(73);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("A", "B", 4); this.visualGraph.addEdge("A", "C", 2); this.visualGraph.addEdge("B", "E", 3);

            this.lineHighlighter.highlight(74);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("C", "D", 2); this.visualGraph.addEdge("D", "E", 3); this.visualGraph.addEdge("D", "F", 1);

            this.lineHighlighter.highlight(75);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.visualGraph.addEdge("C", "F", 4); this.visualGraph.addEdge("F", "E", 1);

            this.lineHighlighter.highlight(76);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.lineHighlighter.highlight(79);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            const cesta = await graph.exampleShortestPath("A", "E", this.lineHighlighter, this.timer, this.visualGraph, this.visualObjects, this.visualTree);

            if (!proceed) return;

            this.lineHighlighter.highlight(79);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("Nejkratší cesta z vertexu A k vertexu E je:");

            this.lineHighlighter.highlight(80);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.console.log("[" + cesta + "]");

            this.lineHighlighter.highlight(81);
            proceed = await this.timer.wait(500); if (!proceed) return;
            this.lineHighlighter.clear();

            this.finish();
        }
    }
];

initExamples(config);