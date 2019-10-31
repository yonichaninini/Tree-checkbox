import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NodeTreeModel from "./Model/NodeTreeModel";

import "./CheckBoxGroup.scss";

const CheckBoxGroup = ({ nodes, className, checkList }) => {
  const [checkReference, setCheckReference] = useState(checkList);
  const [indeterminateList, setIndeterminateList] = useState([]);

  const model = new NodeTreeModel();
  model.flattenNodes(nodes);
  useEffect(() => {
    const childrenNodes = [];
    const checktreeNode = nodes => {
      nodes.map(n => {
        const flatNode = model.getNode(n.value);
        if (flatNode.hasChildrenNode) {
          checktreeNode(n.children);
          childrenNodes.push(n);
        }
      });
      childrenNodes.map(n => {
        if (n.children.some(child => !checkList.includes(child))) {
          if (n.children.some(child => checkList.includes(child))) {
            if (checkReference.includes(n.value)) {
              setCheckReference(
                checkReference.filter(
                  checkReference => checkReference !== n.value
                )
              );
            }
            if (!indeterminateList.includes(n.value)) {
              setIndeterminateList(indeterminateList.concat(n.value));
            }

            //return "indeterminate";
          } else {
            if (checkReference.includes(n.value)) {
              setCheckReference(
                checkReference.filter(
                  checkReference => checkReference !== n.value
                )
              );
            }
            if (indeterminateList.includes(n.value)) {
              setIndeterminateList(
                setIndeterminateList.filter(
                  indeterminateList => indeterminateList !== n.value
                )
              );
            }
            //return false;
          }
        } else {
          if (indeterminateList.includes(n.value)) {
            setIndeterminateList(
              setIndeterminateList.filter(
                indeterminateList => indeterminateList !== n.value
              )
            );
          }

          if (!checkReference.includes(n.value)) {
            setCheckReference(checkReference.concat(n.value));
          }

          //return true;
        }
      });
    };
    console.log(childrenNodes);
    checktreeNode(nodes);
  });
  const treeNode = nodes => {
    const mapNodes = nodes.map(node => {
      const flatNode = model.getNode(node.value);
      const key = node.value;
      const children = flatNode.hasChildrenNode
        ? treeNode(node.children)
        : null;
      const onChange = () => {
        checkReference.includes(node.value)
          ? setCheckReference(
              checkReference.filter(
                checkReference => checkReference !== node.value
              )
            )
          : setCheckReference(checkReference.concat(node.value));

        console.log(checkReference);
      };
      return (
        <li key={key} className={className}>
          <label>{node.label}</label>
          <input
            type="checkbox"
            onChange={onChange}
            checked={checkReference.includes(node.value)}
          />
          {children}
        </li>
      );
    });
    return <ul>{mapNodes}</ul>;
  };
  return <div>{treeNode(nodes)}</div>;
};

const nodePropTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  chekedList: PropTypes.array
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
  node: [{}],
  chekedList: []
};
export default CheckBoxGroup;
