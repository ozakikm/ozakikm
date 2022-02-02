import { useCallback, useState } from "react";
import lodash from 'lodash';

// Treeを中央寄せにする
export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: 10 });
    }
  }, []);
  return [translate, containerRef];
};

// 企業コード・口座番号よりNodeを検索
export const findTreeNode = (nodeData, input) => {
  // 当該企業を検索
  let rst = lodash.find({nodeData}, function(o) { 
    return o.me.kigyoCd === input.kigyoCd && o.me.kozaNo === input.kozaNo;
  });

  // 検索結果がなかった場合、当該企業の子企業を検索
  if(rst === undefined && !lodash.isEmpty(nodeData.children)) {
    for(var i=0; i<nodeData.children.length; i++){
      let target = nodeData.children[i];
      rst = findTreeNode(target, input);

      // 検索結果があった場合、検索を終了
      if(rst !== undefined) {
        break;
      }
    }
  }

  return rst;
};

// 企業コードよりNodeを検索
export const findTreeNodeByKigyoCd = (nodeData, kigyoCd) => {
  // 当該企業を検索
  let rst = lodash.find({nodeData}, function(o) { 
    return o.me.kigyoCd === kigyoCd;
  });

  // 検索結果がなかった場合、当該企業の子企業を検索
  if(rst === undefined && !lodash.isEmpty(nodeData.children)) {
    for(var i=0; i<nodeData.children.length; i++){
      let target = nodeData.children[i];
      rst = findTreeNodeByKigyoCd(target, kigyoCd);

      // 検索結果があった場合、検索を終了
      if(rst !== undefined) {
        break;
      }
    }
  }

  return rst;
}

// 利用されているNode背景色
let usedColorIds = [];
// 利用されているNode背景色を設定
const setUsedColorIds = (nodeData) => {
  // 当該企業が利用されている背景色を設定
  usedColorIds = lodash.concat(usedColorIds,nodeData.me.nodeColorId);

  // 当該企業の子企業が利用されている背景色を設定
  if(!lodash.isEmpty(nodeData.children)) {
    for(var i=0; i<nodeData.children.length; i++){
      let target = nodeData.children[i];
      setUsedColorIds(target);
    }
  }
}

// Node新規時、Nodeの背景色を取得
export const getNodeColorId = (nodeData, kigyoCd) => {
  // 該当企業が利用されている背景色を取得
  let rst = findTreeNodeByKigyoCd(nodeData, kigyoCd);

  // 該当企業が利用されている背景色が取得できた場合
  if(rst !== undefined) {
    // 該当企業が利用されている背景色を返却
    return rst.me.nodeColorId;
  } else {
    // 利用する背景色を背景色定義から取得し返却する
    usedColorIds = [];
    setUsedColorIds(nodeData);
    return lodash.uniq(usedColorIds).length + 1;
  }
}; 