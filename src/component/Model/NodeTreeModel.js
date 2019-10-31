class NodeTreeModel {
  constructor(nodes = {}) {
    this.nodeModelNodes = nodes;
  }
  hasChildren(node) {
    if (Array.isArray(node.children) && node.children.length > 0) {
      return true;
    }
    return;
  }
  flattenNodes(nodes) {
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return;
    }
    nodes.forEach(node => {
      const hasChildrenNode = this.hasChildren(node);
      this.nodeModelNodes[node.value] = {
        hasChildrenNode
      };
      this.flattenNodes(node.children);
    });
  }
  getNode(value) {
    return this.nodeModelNodes[value];
  }
}
export default NodeTreeModel;
