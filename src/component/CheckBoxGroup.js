import React, { useState, useEffect, useRef } from "react";
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
      nodes.forEach(n => {
        const flatNode = model.getNode(n.value);
        if (flatNode.hasChildrenNode) {
          checktreeNode(n.children);
          childrenNodes.push(n);
        }
      });
      childrenNodes.forEach(n => {
        if (n.children.some(child => !checkReference.includes(child.value))) {
          if (n.children.some(child => checkReference.includes(child.value))) {
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
                indeterminateList.filter(
                  indeterminateList => indeterminateList !== n.value
                )
              );
            }
            //return false;
          }
        } else {
          if (indeterminateList.includes(n.value)) {
            setIndeterminateList(
              indeterminateList.filter(
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
    checktreeNode(nodes);
  });
  const treeNode = nodes => {
    const mapNodes = nodes.map(node => {
      const flatNode = model.getNode(node.value);
      const key = node.value;
      const children = flatNode.hasChildrenNode
        ? treeNode(node.children)
        : null;
      const onChange = (check, currentNode) => {
        if (currentNode.children) {
          currentNode.children.forEach(child => {
            onChange(checkReference.includes(node.value), child);
          });
        } else {
          console.log(currentNode.value, check);
          check
            ? setCheckReference(prev =>
                prev.filter(
                  checkReference => checkReference !== currentNode.value
                )
              )
            : setCheckReference(prev => prev.concat(currentNode.value));
        }
      };
      return (
        <li key={key} className={className}>
          {indeterminateList.includes(node.value) && (
            <div
              style={{
                width: 5,
                height: 5,
                background: "red"
              }}
            />
          )}
          <label>{node.label}</label>
          <input
            type="checkbox"
            onChange={() => onChange(checkReference.includes(node.value), node)}
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
