const CONTAINER_WIDTH = 430; // in px units
const CONTAINER_HEIGHT = 150; // in px units
const VERTEX_SIZE = 30; // in px units

class Edge {
    constructor(startX, startY, endX, endY, containerEl) {
        this._element = document.createElement("div");
        this._element.classList.add("graph__edge");
        this._quadrant = null;
        this._inverted = false;

        // keep edge in container
        if (startX < VERTEX_SIZE/2) startX = VERTEX_SIZE/2;
        if (startX > CONTAINER_WIDTH-VERTEX_SIZE/2) startX = CONTAINER_WIDTH-VERTEX_SIZE/2;
        if (startY < VERTEX_SIZE/2) startY = VERTEX_SIZE/2;
        if (startY > CONTAINER_HEIGHT-VERTEX_SIZE/2) startY = CONTAINER_HEIGHT-VERTEX_SIZE/2;
        if (endX < VERTEX_SIZE/2) endX = VERTEX_SIZE/2;
        if (endX > CONTAINER_WIDTH-VERTEX_SIZE/2) endX = CONTAINER_WIDTH-VERTEX_SIZE/2;
        if (endY < VERTEX_SIZE/2) endY = VERTEX_SIZE/2;
        if (endY > CONTAINER_HEIGHT-VERTEX_SIZE/2) endY = CONTAINER_HEIGHT-VERTEX_SIZE/2;

        const width = Math.abs(startX-endX);
        const height = Math.abs(startY-endY);
        const edgeWidth = Math.sqrt(width*width + height*height);

        let angle = Math.asin(height/edgeWidth);
        // set angle based on quadrant
        if (endX >= startX && endY <= startY) {
            // first quadrant
            angle = -angle;
            this._quadrant = 1;
        } else if (endX < startX && endY <= startY) {
            // second quadrant
            angle = Math.PI + angle;
            this._quadrant = 2;
        } else if (endX < startX && endY > startY) {
            // third quadrant
            angle = Math.PI - angle;
            this._quadrant = 3;
        } else {
            // fourth quadrant
            this._quadrant = 4;
        }

        this._element.style.width = `${edgeWidth/10}rem`;
        this._element.style.left = `${startX/10}rem`;
        this._element.style.top = `${startY/10}rem`;
        this._element.style.transform = `rotate(${angle}rad)`;

        containerEl.appendChild(this._element);
    }

    setWeight(weight) {
        if (!this._weightElement) {
            this._weightElement = document.createElement("div");
            this._weightElement.classList.add("graph__edge-weight");
            if (this._quadrant === 2 || this._quadrant === 3) this._weightElement.classList.add("graph__edge-weight--inverted");
            this._element.appendChild(this._weightElement);
        }

        this._weightElement.innerText = weight;
    }

    setAsDirected() {
        this._element.classList.add("graph__edge--directed");
    }

    setAsUndirected() {
        this._element.classList.remove("graph__edge--directed");
    }

    invert() {
        if (!this._inverted) {
            this._element.classList.add("graph__edge--inverted");
            return;
        }
        this._element.classList.remove("graph__edge--inverted");
    }

    removeElement() {
        this._element.remove();
    }
}

class Vertex {
    constructor(value, xPos, yPos, containerEl) {
        this._connectedVertices = [];

        this.xPos = xPos;
        this.yPos = yPos;

        this._createElement(value, containerEl);
    }

    _createElement(value, containerEl) {
        this._element = document.createElement("div");
        this._element.classList.add("graph__vertex");
        this._element.innerHTML = '<span>' + value + '</span>';

        // keep vertex in container
        if (this.xPos < VERTEX_SIZE/2) this.xPos = VERTEX_SIZE/2;
        if (this.xPos > CONTAINER_WIDTH-VERTEX_SIZE/2) this.xPos = CONTAINER_WIDTH-VERTEX_SIZE/2;
        if (this.yPos < VERTEX_SIZE/2) this.yPos = VERTEX_SIZE/2;
        if (this.yPos > CONTAINER_HEIGHT-VERTEX_SIZE/2) this.yPos = CONTAINER_HEIGHT-VERTEX_SIZE/2;

        this._element.style.left = `${this.xPos/10}rem`;
        this._element.style.top = `${this.yPos/10}rem`;

        containerEl.appendChild(this._element);
    }

    setAsVisited() {
        this._element.classList.add("graph__vertex--visited");
    }

    setAsUnvisited() {
        this._element.classList.remove("graph__vertex--visited");
    }

    setAsActive() {
        this._element.classList.add("graph__vertex--active");
    }
    unsetAsActive() {
        this._element.classList.remove("graph__vertex--active");
    }

    hasConnectionToVertex(vertex) {
        let hasConnection = false;
        for (let connection of this._connectedVertices) {
            if (connection.node === vertex) {
                hasConnection = true;
                break;
            }
        }
        return hasConnection;
    }

    connectToVertex(vertex, weight, edgeEl) {
        this._connectedVertices.push({node: vertex, weight, edgeElement: edgeEl});
    }

    removeConnectionToVertex(vertex) {
        const index = this._connectedVertices.findIndex((conn) => conn.node === vertex);
        if (index !== -1) this._connectedVertices.splice(index, 1);
    }

    popConnection() {
        let connection = this._connectedVertices.pop();
        if (connection) return connection.node;
        return undefined;
    }

    getEdgeTo(vertex) {
        const connection = this._connectedVertices.find((conn) => conn.node === vertex);
        return connection.edgeElement;
    }

    getIndexOfConnection(vertex) {
        return this._connectedVertices.findIndex((conn) => conn.node === vertex);
    }

    attachPointer(pointerEl) {
        this._element.appendChild(pointerEl);
    }

    removeElement() {
        this._element.remove();
    }
}

class VisualGraph {
    constructor(elementId, pointerNames = []) {
        this._element = document.getElementById(elementId);

        this.adjacencyList = {};

        this._pointers = {};
        for (let pointerName of pointerNames) {
            let pointerEl = document.createElement("div");
            pointerEl.classList.add("graph__vertex-pointer");
            pointerEl.innerHTML = `<div class="graph__vertex-pointer-label">${pointerName}</div>`;

            this._pointers[pointerName] = pointerEl;
        }
    }

    addVertex(vertex, xPos, yPos) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = new Vertex(vertex, xPos, yPos, this._element);
    }

    addEdge(v1, v2, weight = undefined, directed = false) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        const edge = new Edge(this.adjacencyList[v1].xPos, this.adjacencyList[v1].yPos, this.adjacencyList[v2].xPos, this.adjacencyList[v2].yPos, this._element);
        if (weight !== undefined && weight !== null) edge.setWeight(weight);
        if (directed) edge.setAsDirected();

        if (!this.adjacencyList[v1].hasConnectionToVertex(v2)) this.adjacencyList[v1].connectToVertex(v2, weight, edge);
        if (!this.adjacencyList[v2].hasConnectionToVertex(v1)) this.adjacencyList[v2].connectToVertex(v1, weight, edge);
    }

    removeEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        let edge = this.adjacencyList[v1].getEdgeTo(v2);
        if (edge) edge.removeElement();

        this.adjacencyList[v1].removeConnectionToVertex(v2);
        this.adjacencyList[v2].removeConnectionToVertex(v1);
    }

    removeVertex(vertex) {
        const adjacentVertex = this.adjacencyList[vertex].popConnection();
        while (adjacentVertex) {
            this.removeEdge(vertex, adjacentVertex);
            adjacentVertex = this.adjacencyList[vertex].popConnection();
        }
        this.adjacencyList[vertex].removeElement();
        delete this.adjacencyList[vertex];
    }

    setVertexAsVisited(vertex) {
        if (!this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex].setAsVisited();
    }

    setVertexAsUnvisited(vertex) {
        if (!this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex].setAsUnvisited();
    }

    setVertexAsActive(vertex) {
        if (!this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex].setAsActive();
    }

    unsetVertexAsActive(vertex) {
        if (!this.adjacencyList[vertex]) return;
        this.adjacencyList[vertex].unsetAsActive();
    }

    setEdgeAsDirected(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        const edge = this.adjacencyList[v1].getEdgeTo(v2);
        if (edge) edge.setAsDirected();
    }

    setEdgeAsUndirected(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        const edge = this.adjacencyList[v1].getEdgeTo(v2);
        if (edge) edge.setAsUndirected();
    }

    invertEdge(v1, v2) {
        if (!this.adjacencyList[v1] || !this.adjacencyList[v2]) return;

        const edge = this.adjacencyList[v1].getEdgeTo(v2);
        if (edge) edge.invert();
    }

    showPointer(pointerName) {
        if (this._pointers[pointerName]) {
            this._pointers[pointerName].style.display = "block";
        }
    }
    hidePointer(pointerName) {
        if (this._pointers[pointerName]) {
            this._pointers[pointerName].style.display = "none";
        }
    }
    setPointerUp(pointerName) {
        if (!this._pointers[pointerName]) return;

        this._pointers[pointerName].classList.add("graph__vertex-pointer--up");
    }
    setPointerDown(pointerName) {
        if (!this._pointers[pointerName]) return;

        this._pointers[pointerName].classList.remove("graph__vertex-pointer--up");
    }

    setPointerToVertex(pointerName, vertex) {
        if (!this.adjacencyList[vertex]) return;
        this.showPointer(pointerName);
        this.adjacencyList[vertex].attachPointer(this._pointers[pointerName]);
    }

    reset() {
        for (let vertex in this.adjacencyList) {
            this.adjacencyList[vertex].removeElement();
            delete this.adjacencyList[vertex];
        }

        for (let pointerName in this._pointers) {
            this.setPointerDown(pointerName);
        }

        // for now
        this._element.innerHTML = "";
    }
}

export default VisualGraph;