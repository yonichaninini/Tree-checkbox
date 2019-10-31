import React from "react";
import PropTypes from "prop-types";
import NodeTreeModel from "./Model/NodeTreeModel";

import "./CheckBoxGroup.scss";

const CheckBoxGroup = ({ nodes, className }) => {
  const model = new NodeTreeModel();
  model.flattenNodes(nodes);
  const treeNode = nodes => {
    const mapNodes = nodes.map(node => {
      const flatNode = model.getNode(node.value);
      const key = node.value;
      const children = flatNode.hasChildrenNode
        ? treeNode(node.children)
        : null;
      return (
        <li key={key} className={className}>
          <label>{node.label}</label>
          <input type="checkbox" />
          {children}
        </li>
      );
    });
    return <ul>{mapNodes}</ul>;
  };
  const treeNodes = treeNode(nodes);
  return <div>{treeNodes}</div>;
};

const nodePropTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
const nodePropTypesChildren = PropTypes.oneOfType([
  PropTypes.shape(nodePropTypes),
  PropTypes.shape({
    ...nodePropTypes,
    children: PropTypes.arrayOf(nodePropTypes).isRequired
  })
]);
CheckBoxGroup.propTypes = {
  nodes: PropTypes.arrayOf(nodePropTypesChildren).isRequired,
  className: PropTypes.string,
  checked: PropTypes.array,
  onChecked: PropTypes.func
};
CheckBoxGroup.defaultProps = {
  node: [{}]
};
export default CheckBoxGroup;
