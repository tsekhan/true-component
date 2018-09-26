import nodeStore from '../nodeStore/nodeStore';

const instantiateNodes = function (root, dataMap, dataAttributesSet) {
  root.childNodes.forEach(child => {
    let resultingChild = child;
    if (nodeStore.has(child)) {
      const Class = nodeStore.get(child);
      const params = {};

      for (let i = 0; i < child.attributes.length; i++) {
        const attribute = child.attributes[i];

        let attributeValue = attribute.value;

        if (dataAttributesSet.has(attributeValue)) {
          attributeValue = dataMap.get(attributeValue);
        }

        params[attribute.name] = attributeValue;
      }

      resultingChild = new Class(params);

      // TODO Copy children
      root.replaceChild(resultingChild, child);
    }
    instantiateNodes(resultingChild, dataMap, dataAttributesSet);
  });

  return root.childNodes;
};

export default instantiateNodes;
