export default class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(name) {
    if(!this.adjacencyList.has(name)) {
      this.adjacencyList.set(name, new Set());
    }
  }

  hasNode(name) {
    if (this.adjacencyList.get(name)) {
      return true;
    }
    return false;
  }

  createEdge(node1, node2) {
    let set1 = this.adjacencyList.get(node1);
    let set2 = this.adjacencyList.get(node2);
    set1.add(node2);
    set2.add(node1);
  }

  hasEdge(node1, node2) {
    if (this.adjacencyList.get(node1).has(node2)) {
      return true
    }
    return false;
  }

  removeEdge(node1, node2) {
    this.adjacencyList.get(node1).delete(node2);
    this.adjacencyList.get(node2).delete(node1);
  }

  removeNode(name) {
    if (this.adjacencyList.has(name)) {
      this.adjacencyList.get(name).forEach((edge) => {
        this.adjacencyList.get(edge).delete(name);
      });
      this.adjacencyList.delete(name);
    }
  }

  depthFirstReachable(startingNode, targetNode) {
    if ((!this.adjacencyList.has(startingNode)) || (!this.adjacencyList.has(targetNode))) {
      return false;
    }
    let stack = [startingNode];
    let traversedNodes = new Set();
    while (stack.length) {
      const currentNode = stack.shift();
      if (currentNode === targetNode) {
        return true;
      } else {
        traversedNodes.add(currentNode);
        const adjacencyList = this.adjacencyList.get(currentNode);
        adjacencyList.forEach(function(node) {
          if (!traversedNodes.has(node)) {
            stack.unshift(node);
          }
        });
      }
    }
    return false;
  }

  breadthFirstReachable(startingNode, targetNode) {
    if ((!this.adjacencyList.has(startingNode)) || (!this.adjacencyList.has(targetNode))) {
      return false;
    }
    let queue = [startingNode];
    let traversedNodes = new Set();
    while (queue.length) {
      const currentNode = queue.shift();
      if (currentNode === targetNode) {
        return true;
      } else {
        traversedNodes.add(currentNode);
        const adjacencyList = this.adjacencyList.get(currentNode);
        adjacencyList.forEach(function(node) {
          if (!traversedNodes.has(node)) {
            queue.push(node);
          }
        });
      }
    }
    return false;
  }
}

class GraphObject {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeVertex(vertex) {
    while(this.adjacencyList[vertex].length) {
      let adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
  }

  deapthFirstTraversalRecursive(vertex) {
    let listResult = [];
    let visited = {};
    let adjacencyList = this.adjacencyList;
    function helper(vertexNode) {
      if(!vertexNode) {
        return null;
      }
      listResult.push(vertexNode);
      visited[vertexNode] = true;
      adjacencyList[vertexNode].forEach(element => {
        if(!visited[element]) {
          return helper(element);
        }
      }) 
    }
    helper(vertex);
    return listResult;
  }

  deapthFirstTraversalIterative(vertex) {
    let listResult = [];
    let visited = {};
    let stack = [];
    stack.push(vertex);
    visited[vertex] = true;
    while(stack.length) {
      let current = stack.pop();
      listResult.push(current);
      this.adjacencyList[current].forEach(element => {
        if(!visited[element]) {
          visited[element] = true;
          stack.push(element);
        }
      });
    }
    return listResult;
  }

  breadthFirstTraversalIterative(vertex) {
    let listResult = [];
    let visited = {};
    let queue = [];
    queue.push(vertex);
    visited[vertex] = true;
    while(queue.length) {
      let current = queue.shift();
      listResult.push(current);
      this.adjacencyList[current].forEach(element => {
        if(!visited[element]) {
          visited[element] = true;
          queue.push(element);
        }
      });
    }
    return listResult;
  }
}