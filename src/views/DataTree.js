import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import Tree from "react-d3-tree";
import lodash from 'lodash';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {DataNodeDatabase, DataNodeRect, NodeTooltip} from './GraphNode';
import { useCenteredTree } from "../util/helper";
import { useLocation } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const styles = {
  fontFamily: "'Meiryo UI Bold', 'Meiryo UI Regular', 'Meiryo UI'",
  textAlign: "center"
};

// Treeコンテナスタイルシート
const containerStyles = {
  width: "100%",
  height: "75vh"
};

// スキーム定義
const schemes = [
  {
    name: "スキーム(USD)",
    value: "scheme_USD"
  },
  {
    name: "スキーム(GBP)",
    value: "scheme_GBP"
  },
  {
    name: "スキーム(EUR)",
    value: "scheme_EUR"
  },
  {
    name: "スキーム(JPY)",
    value: "scheme_JPY"
  },
  {
    name: "スキーム(CNY)",
    value: "scheme_CNY"
  },
  {
    name: "スキーム(HKD)",
    value: "scheme_HKD"
  }
];

// スキーム定義
const nodeRenderModes = [
  {
    name: "データベース",
    value: 1
  },
  {
    name: "Rect",
    value: 2
  }
];

export default function DataTree () {

  const location = useLocation();
  const scheme = location.state.scheme;

  const [treeData, setTreeData] = useState({});

  const [translate, containerRef] = useCenteredTree();

  const [nodeRenderMode, setNodeRenderMode] = useState(nodeRenderModes[0].value);
  

  // Nodeマウスオーバー時、企業詳細情報をツールチップで表示
  function showNodeDetails(event, nodeDatum) {
    // 前回ツールチップを削除
    let tooltip = document.getElementById("node-tooltip");
    if(tooltip !== null && tooltip !== undefined) tooltip.remove();
  
    // ツールチップを表示
    var div = document.createElement('div');
    div.id = "node-tooltip";
    ReactDOM.render(NodeTooltip({event: event, nodeDatum: nodeDatum}), div );
    document.getElementById("tree-paper").appendChild(div);
  }
  
  // Nodeマウスアウト時、ツールチップを非表示
  function hideNodeDetails() {
    let tooltip = document.getElementById("node-tooltip");
    if(tooltip !== null && tooltip !== undefined) tooltip.remove();
  }

  useEffect(()=>{
    // ローカルステージからスキームの情報を取得
    let treeDataStr = localStorage.getItem(scheme);

    // スキームの情報が取得できた場合
    if(!lodash.isEmpty(treeDataStr)) {
      // Tree情報を画面に反映
      setTreeData(JSON.parse(treeDataStr));
    } else {
      // Tree情報を空で画面に反映
      setTreeData({});
    }
  },[scheme]);

  return (
    <Paper variant="outlined" id="tree-paper">
      <Grid container>
        <Grid item xs={2} >
          <Typography sx={{ fontSize: 14 }} color="text.secondary">{lodash.find(schemes, function(o) { return o.value === scheme; }).name}</Typography>
        </Grid>
        <Grid container>
          <Grid item xs={1} >
            <Typography sx={{ fontSize: 14, marginTop: '10px' }} color="text.secondary">見た目</Typography>
          </Grid>
          <Grid item xs={4} >
            <FormControl variant="standard" sx={{ m: 0, minWidth: 195 }}>
              <Select
                value={nodeRenderMode}
                onChange={event => setNodeRenderMode(event.target.value)}>
                      {nodeRenderModes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                          )
                        )
                      }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <div style={styles}>
        <div style={containerStyles} ref={containerRef}>
          {/* Tree情報が空以外の場合、Treeを表示 */}
          {
            !lodash.isEmpty(treeData) && nodeRenderMode === 1 ?
              <Tree
                data={treeData}
                translate={translate}
                renderCustomNodeElement={(rd3tNodeProps) =>
                  DataNodeDatabase({
                    ...rd3tNodeProps, showNodeDetails, hideNodeDetails
                  })}
                  orientation="vertical"
                  pathFunc="step"
                  collapsible={false}
                  separation={{ siblings: 2, nonSiblings: 2 }}
                  depthFactor={200}
              />
              :null
          }
          {
            !lodash.isEmpty(treeData) && nodeRenderMode === 2 ?
              <Tree
                data={treeData}
                translate={translate}
                renderCustomNodeElement={(rd3tNodeProps) =>
                  DataNodeRect({
                    ...rd3tNodeProps, showNodeDetails, hideNodeDetails
                  })}
                  orientation="vertical"
                  pathFunc="step"
                  collapsible={false}
                  separation={{ siblings: 2, nonSiblings: 2 }}
                  depthFactor={200}
              />
              :null
          }
        </div>
      </div>
      </Paper>
    );
  }
  
  