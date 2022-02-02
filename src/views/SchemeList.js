import React, {useState} from "react";
import lodash from 'lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NodePrototype} from './GraphNode';
import { findTreeNode, getNodeColorId } from "../util/helper";
import { useHistory } from 'react-router-dom';

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


export default function ZandakaCorrection(props) {
  const history = useHistory();

  const [treeData, setTreeData] = useState({});
  const [scheme, setScheme] = useState(schemes[0].value);
  const [oyaKaishaKigyoCd, setOyaKaishaKigyoCd] = useState("");
  const [joiKozaNo, setJoiKozaNo] = useState("");
  const [joiKozaNoRename, setJoiKozaNoRename] = useState("");
  const [kyotenOyakoza, setKyotenOyakoza] = useState("");
  const [tsukaOyakoza, setTsukaOyakoza] = useState("");
  const [rounding, setRounding] = useState("");
  const [keisanHoho, setKeisanHoho] = useState("");
  const [koKaishaKigyoCd, setKoKaishaKigyoCd] = useState("");
  const [koKozaNo, setKoKozaNo] = useState("");
  const [koKozaNoRename, setKoKozaNoRename] = useState("");
  const [kyotenKokoza, setKyotenKokoza] = useState("");
  const [tsukaKokoza, setTsukaKokoza] = useState("");
  
  function setParentNodeInfo(node) {
    node.me.kigyoCd = oyaKaishaKigyoCd;
    node.me.kozaNo = joiKozaNo;
    node.me.kozaName = joiKozaNoRename;
    node.me.kyoten = kyotenOyakoza;
    node.me.tsuka = tsukaOyakoza;
    node.me.rounding = rounding;
    node.me.keisanHoho = keisanHoho;
  }

  function setChildrenNodeInfo(node) {
    node.me.kigyoCd = koKaishaKigyoCd;
    node.me.kozaNo = koKozaNo;
    node.me.kozaName = koKozaNoRename;
    node.me.kyoten = kyotenKokoza;
    node.me.tsuka = tsukaKokoza;
    
    node.me.parent.kigyoCd = oyaKaishaKigyoCd;
    node.me.parent.kozaNo = joiKozaNo;
    node.me.parent.kozaName = joiKozaNoRename;
    node.me.parent.kyoten = kyotenOyakoza;
    node.me.parent.tsuka = tsukaOyakoza;
    node.me.parent.rounding = rounding;
    node.me.parent.keisanHoho = keisanHoho;
  }

  // Tree情報初期化
  function treeDataInit() {
    // 親Node作成
    let parent = lodash.cloneDeep(NodePrototype);
    // 親Node情報設定
    setParentNodeInfo(parent);
    parent.me.nodeColorId = 1;

    // 子Node作成
    let child = lodash.cloneDeep(NodePrototype);
    // 子Node情報設定
    setChildrenNodeInfo(child);
    child.me.nodeColorId = 2;

    // 子Nodeを親Nodeに設定
    parent.children = [child]

    return parent;
  }

  // 入力情報を保存し、データ関連図に反映
  function saveNode() {
     // Tree情報をコピー
    let thisTimeTreeData = lodash.cloneDeep(treeData);

    // Tree情報が空の場合
    // Tree情報を初期化し、入力情報をTree情報に反映
    if(lodash.isEmpty(thisTimeTreeData)) {
      thisTimeTreeData = treeDataInit();
      alert("保存しました。");
    } else {
      // Tree情報から入力された親情報を検索
      let parent = findTreeNode(thisTimeTreeData, {kigyoCd: oyaKaishaKigyoCd, kozaNo: joiKozaNo});
      // 入力された親情報がTree情報に存在する場合
      if(parent !== undefined) {
        // 親情報更新
        setParentNodeInfo(parent);

        // Tree情報から入力された子情報を検索
        let child = findTreeNode(thisTimeTreeData, {kigyoCd: koKaishaKigyoCd, kozaNo: koKozaNo});
        // 入力された子情報がTree情報に存在する場合
        if(child !== undefined) {
          // 子情報更新
          setChildrenNodeInfo(child);
        } else {
          // 子Nodeを作成
          let child = lodash.cloneDeep(NodePrototype);
          // 子Node情報設定
          setChildrenNodeInfo(child);
          child.me.nodeColorId = getNodeColorId(thisTimeTreeData, koKaishaKigyoCd);
          // 子Nodeを親Nodeに設定
          parent.children = lodash.concat(parent.children, child);
        }
        alert("保存しました。");
      } else {
        // 入力された親情報がTree情報に存在しない場合
        // 入力された子情報がルートNodeであるかを判定
        // である場合
        if(thisTimeTreeData.me.kigyoCd === koKaishaKigyoCd && thisTimeTreeData.me.kozaNo === koKozaNo) {
          // 親Node作成
          // 親Node作成
          let parent = lodash.cloneDeep(NodePrototype);
          // 親Node情報設定
          setParentNodeInfo(parent);
          parent.me.nodeColorId = getNodeColorId(thisTimeTreeData, oyaKaishaKigyoCd);

          // 現在のルートNodeを子Nodeにする
          setChildrenNodeInfo(thisTimeTreeData);
          parent.children = [thisTimeTreeData];
          thisTimeTreeData = parent;
          alert("保存しました。");
        } else {
          // エラー
          // 入力された情報が既存情報との関連性がない
          alert("入力された情報が既存情報との関連性がありません。");
        }
      }
    }

    // 解析のため、データをコンソールに出力(削除予定)
    console.log(thisTimeTreeData);

    // Tree情報をローカルステージに保持（次回画面表示時Restore用）
    localStorage.setItem(scheme, JSON.stringify(thisTimeTreeData));
    // Tree情報を画面に反映
    setTreeData(thisTimeTreeData);
  }
  
  function gotoDataTree() {
    history.push({
      pathname: '/dataTree',
      state: { scheme: scheme}
    });
  }

    return (
        <div>
          <div style={{height: '45px', fontWeight: 700, fontSize: '20px', lineHeight: 'normal', paddingTop:'18px', paddingLeft: '16px', backgroundColor: '#ffffff'}}>スキームマスタ編集  ・・・作成中・・・</div>
          <br/>
          <div>
            <div style={{height: '35px', fontWeight: 400, fontSize: '16px', lineHeight: 'normal', paddingTop:'18px', paddingLeft: '15px', marginLeft: '15px', backgroundColor: '#ffffff', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(234, 234, 234, 1)'}}>スキーム一覧</div>
            <div style={{ marginLeft: '15px', paddingTop: '20px', backgroundColor: '#ffffff', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(234, 234, 234, 1)'}}>
              <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '15px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '240px', height: '38px', backgroundColor:'#0f0065', color: '#FFFFFF', paddingTop: '18px', fontSize: '14px',paddingLeft: '15px'}}>
                  <div>USDGroup</div>
                  <div style={{marginLeft: '100px', cursor: 'pointer'}} onClick={() => {gotoDataTree();}}>
                    <img src='https://d1icd6shlvmxi6.cloudfront.net/gsc/UFFFWF/aa/8e/2e/aa8e2ea5613944bca496b9ff7e4b46dc/images/スキームマスタ/u526.png?token=8757f90411bfe0a03f4fff7d157664e689af599249cf645a48fcc7a0829ba08d' alt=""></img>
                  </div>
                </div>
                <div style={{backgroundColor: '#dddddd', width: '100%', paddingTop: '18px', paddingLeft: '15px'}}>
                  テスト
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ flexGrow: 1 }} style={{marginLeft: '15px'}}>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <Paper variant="outlined">
              <Grid container style={{marginLeft: 5}}>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">スキーム名</Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" sx={{ m: 0, minWidth: 195 }}>
                    <Select
                      value={scheme}
                      onChange={event => setScheme(event.target.value)}>
                        {schemes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">親会社(企業コードor企業名)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={oyaKaishaKigyoCd} onChange={event => setOyaKaishaKigyoCd(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">上位口座番号</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={joiKozaNo} onChange={event => setJoiKozaNo(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">上位口座番号(リネーム名称)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={joiKozaNoRename} onChange={event => setJoiKozaNoRename(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">拠点(親口座)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={kyotenOyakoza} onChange={event => setKyotenOyakoza(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">通貨(親口座)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={tsukaOyakoza} onChange={event => setTsukaOyakoza(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">Rounding</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={rounding} onChange={event => setRounding(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">計算方法</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={keisanHoho} onChange={event => setKeisanHoho(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">子会社(企業コードor企業名)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={koKaishaKigyoCd} onChange={event => setKoKaishaKigyoCd(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">子口座番号</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={koKozaNo} onChange={event => setKoKozaNo(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">子口座番号(リネーム名称)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={koKozaNoRename} onChange={event => setKoKozaNoRename(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">拠点(子口座)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={kyotenKokoza} onChange={event => setKyotenKokoza(event.target.value)} />
                </Grid>
                <Grid item xs={6} style={{marginTop: 10}}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">通貨(子口座)</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Input value={tsukaKokoza} onChange={event => setTsukaKokoza(event.target.value)} style={{marginBottom:10}} />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} style={{textAlign:"right"}}>
                  <Button variant="contained" onClick={() => saveNode()} style={{marginRight:20, marginBottom:10}}>保存</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box> 
        </div> 
    );
}