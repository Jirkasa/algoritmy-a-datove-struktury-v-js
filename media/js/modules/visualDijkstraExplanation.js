import VisualGraph from "./visualGraph.js";


class ShortestPathTableRow {
    constructor(vertex, parentEl) {
        this._rowEl = document.createElement("tr");
        const vertexCell = document.createElement("td");
        vertexCell.innerText = vertex;
        this._valueCell = document.createElement("td");

        this._rowEl.appendChild(vertexCell);
        this._rowEl.appendChild(this._valueCell);
        parentEl.appendChild(this._rowEl);

        this._valueElements = [];

        this._checkmarkEl = document.createElement("div");
        this._checkmarkEl.classList.add("dijkstra-explanation__row-checkmark");
        this._checkmarkEl.innerHTML = `
            <svg>
                <use xlink:href="../media/img/icon-sprite.svg#icon-checkmark"></use>
            </svg>
        `;
        this._checkmarkEl.style.display = "none";
        this._rowEl.appendChild(this._checkmarkEl);
    }

    changeValue(newValue) {
        const valueEl = document.createElement("span");
        valueEl.classList.add("dijkstra-explanation__distance-value");
        valueEl.innerText = newValue;
        if (this._valueElements.length > 0) {
            const commaEl = document.createElement("span");
            commaEl.innerText = ", ";
            this._valueCell.appendChild(commaEl);

            this._valueElements[this._valueElements.length-1].classList.add("dijkstra-explanation__distance-value--crossed-out");
        }
        this._valueCell.appendChild(valueEl);
        this._valueElements.push(valueEl);
    }

    setVisitedState() {
        this._checkmarkEl.style.display = "block";
    }

    unsetVisitedState() {
        this._checkmarkEl.style.display = "none";
    }

    setAsActive() {
        this._rowEl.classList.add("dijkstra-explanation__active-table-row");
    }

    unsetAsActive() {
        this._rowEl.classList.remove("dijkstra-explanation__active-table-row");
    }

    reset() {
        this._valueCell.innerText = "";
        this._valueElements.splice(0);
    }
}

class VisitedVertices {
    constructor(elementId) {
        this._el = document.getElementById(elementId);
        this._vertices = [];
    }

    add(vertex) {
        this._vertices.push(vertex);
        this._el.innerText = "[" + this._vertices + "]";
    }

    remove(vertex) {
        const index = this._vertices.findIndex(v => v === vertex);
        if (index !== -1) {
            this._vertices.splice(index, 1);
            this._el.innerText = "[" + this._vertices + "]";
        }
    }

    contains(vertex) {
        return this._vertices.includes(vertex);
    }

    reset() {
        this._vertices.splice(0);
        this._el.innerText = "[]";
    }
}

class VisualDijkstraExplanation {
    constructor(graphId, messageElementId, shortestPathTableBodyId, previousVertices, visitedVerticesContainerId) {
        this._visualGraph = new VisualGraph(graphId);
        this._visualGraph.addVertex("A", 140, 0);
        this._visualGraph.addVertex("B", 300, 30);
        this._visualGraph.addVertex("E", 430, 100);
        this._visualGraph.addVertex("F", 260, 150);
        this._visualGraph.addVertex("D", 200, 60);
        this._visualGraph.addVertex("C", 0, 85);
        this._visualGraph.addEdge("A", "B", 4);
        this._visualGraph.addEdge("A", "C", 2);
        this._visualGraph.addEdge("B", "E", 3);
        this._visualGraph.addEdge("C", "D", 2);
        this._visualGraph.addEdge("D", "E", 3);
        this._visualGraph.addEdge("D", "F", 1);
        this._visualGraph.addEdge("C", "F", 4);
        this._visualGraph.addEdge("F", "E", 1);

        this._messageEl = document.getElementById(messageElementId);
        this._defaultMessage = this._messageEl.innerText;

        const tbody = document.getElementById(shortestPathTableBodyId);
        this._tableRows = {};
        this._tableRows["A"] = new ShortestPathTableRow("A", tbody);
        this._tableRows["B"] = new ShortestPathTableRow("B", tbody);
        this._tableRows["C"] = new ShortestPathTableRow("C", tbody);
        this._tableRows["D"] = new ShortestPathTableRow("D", tbody);
        this._tableRows["E"] = new ShortestPathTableRow("E", tbody);
        this._tableRows["F"] = new ShortestPathTableRow("F", tbody);

        this._previousVertices = {}
        for (let previousVertex of previousVertices) {
            this._previousVertices[previousVertex.vertex] = document.getElementById(previousVertex.elementId)
        }

        this._visitedVertices = new VisitedVertices(visitedVerticesContainerId);

        this._currentlyActiveVertex = null;
    }

    changeShortestPath(vertex, newValue) {
        if (this._tableRows[vertex]) {
            this._tableRows[vertex].changeValue(newValue);
        }
    }

    setMessage(message) {
        this._messageEl.innerText = message;
    }

    setPreviousVertex(vertex, previousVertex) {
        this._previousVertices[vertex].innerText = previousVertex;
    }

    setAsVisited(vertex) {
        this._visitedVertices.add(vertex);
        this._visualGraph.setVertexAsVisited(vertex);
        this._tableRows[vertex].setVisitedState();
    }

    setAsUnvisited(vertex) {
        this._visitedVertices.remove(vertex);
        this._visualGraph.setVertexAsUnvisited(vertex);
        this._tableRows[vertex].unsetVisitedState();
    }

    isVisited(vertex) {
        return this._visitedVertices.contains(vertex);
    }

    setActiveVertex(vertex) {
        this._tableRows[vertex].setAsActive();
        this._visualGraph.setVertexAsActive(vertex);

        if (this._currentlyActiveVertex) {
            this._tableRows[this._currentlyActiveVertex].unsetAsActive();
            this._visualGraph.unsetVertexAsActive(this._currentlyActiveVertex);
        }
        this._currentlyActiveVertex = vertex;
    }

    unsetActiveVertex() {
        if (this._currentlyActiveVertex) {
            this._tableRows[this._currentlyActiveVertex].unsetAsActive();
            this._visualGraph.unsetVertexAsActive(this._currentlyActiveVertex);
            this._currentlyActiveVertex = null;
        }
    }

    reset() {
        for (let vertex in this._tableRows) {
            this._tableRows[vertex].reset();
            this.setAsUnvisited(vertex);
            this._previousVertices[vertex].innerText = "null";
        }

        this._messageEl.innerText = this._defaultMessage;

        this._visitedVertices.reset();

        this.unsetActiveVertex();
    }
}

export default VisualDijkstraExplanation;