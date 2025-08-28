/**
 * Given a node in the graph, get all chains from the node's dependencies to the end node
 * Note: The graph may contain cycles. When encountering a cycle, the node at the cycle is directly used as the end node
 * @param {Node} node
 * @returns {Array<Set<string>>} Return all dependency chains, each chain is a string set, each string is a node name
 */
export function getDepChains(node, globalNodeMap) {
    // store all found dependency chains
    const chains = [];
  
    // current DFS path (used to detect cycles)
    const currentPath = [];
  
    /**
     * Depth-first search function
     * @param {Node} currentNode - the current node being processed
     */
    function dfs(currentNode) {
      if (!currentNode) return;
  
      // check if a cycle is formed (the current node is already in the path)
      if (currentPath.includes(currentNode.name)) {
        chains.push([...currentPath]);
        return;
      }
  
      // add the current node to the path
      currentPath.unshift(currentNode.name);
  
      // if there are no dependency nodes, it means the end node is reached
      if (!currentNode.effects || currentNode.effects.length === 0) {
        chains.push([...currentPath]);
      } else {
        // recursively process all dependency nodes
        for (const effect of currentNode.effects) {
          dfs(globalNodeMap[effect]);
        }
      }
      // backtrack: remove the current node
      currentPath.shift();
    }
  
    // start DFS from the given node
    dfs(node);
  
    return chains;
  }
  