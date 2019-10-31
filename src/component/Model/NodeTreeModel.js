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
        label: node.label,
        value: node.value,
        children: node.children,
        hasChildrenNode
      };
      this.flattenNodes(node.children);
    });
  }
  getNode(value) {
    return this.nodeModelNodes[value];
  }

  /*checkListAdministrate(checkList) {
    Object.keys(this.nodeModelNodes).forEach(value => {
      const hasList = checkList.includes(value);
      return hasList;
    });*/
}

export default NodeTreeModel;
