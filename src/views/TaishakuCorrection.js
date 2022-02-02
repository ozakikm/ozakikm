import React, {useState, useEffect, forwardRef} from "react";
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import lodash from 'lodash';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MaterialTable from 'material-table';

import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

// テーブルで利用するIcon
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function TaishakuCorrection(props) {

    const location = useLocation();
    const kigyoData = location.state;
    const [data, setData] = useState([]);
    const localStorageKey = "TaishakuCorrection_" + kigyoData.scheme.value + kigyoData.kozaInfo + kigyoData.date;

    // テーブルヘッダ
    const [columns] = useState([
        { title: '日付', field: 'date' , cellStyle: {width:'100px'} },
        { title: 'Debit', field: 'debit' , cellStyle: {width:'100px'} },
        { title: 'Credit', field: 'credit', cellStyle: {width:'100px'} },
        { 
          title: 'Remarks',
          field: 'remarks',
          lookup: { 1: 'remarks1', 2: 'remarks2', 3: 'remarks3', 4: 'remarks4', 5: 'remarks5' },
          cellStyle: {width:'100px'}
        },
        { title: '貸借判定', field: 'taishakuHantei', cellStyle: {width:'100px'} },
        { title: 'データ属性', field: 'dataZokusei', cellStyle: {width:'100px'} }
    ]);
    
    // 初期化用明細情報
    const initData = [
        { date: '2021/10/01', debit: '1200', credit: '', remarks: 1, taishakuHantei: '-', dataZokusei: 'MT930' },
        { date: '2021/10/02', debit: '', credit: '800', remarks: 2, taishakuHantei: 'プーリング', dataZokusei: 'MT940' },
    ];

    // 確定ボタン押下処理
    function kakutei() {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
      alert("保存しました。");
    }

    useEffect(()=>{
      // ローカルステージからス明細情報を取得
      let taishakuDetails = localStorage.getItem(localStorageKey);
  
      // 明細情報が取得できた場合
      if(!lodash.isEmpty(taishakuDetails)) {
        // 明細情報を画面に反映
        setData(JSON.parse(taishakuDetails));
      } else {
        // 明細情報を初期化
        setData(initData);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8} style={{marginLeft: 30, marginTop: 10}}>
                    <Grid container>
                        {/** 企業 */}
                        <Grid item xs={2}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">企業G</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ fontSize: 14 }} color="black">{kigyoData.kigyo}</Typography>
                        </Grid>

                        {/** スキーム */}
                        <Grid item xs={2}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">スキーム</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ fontSize: 14 }} color="black">{kigyoData.scheme.name}</Typography>
                        </Grid>

                        {/** 日付 */}
                        <Grid item xs={2}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">日付</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ fontSize: 14 }} color="black">{kigyoData.date}</Typography>
                        </Grid>

                        {/** 親口座 */}
                        <Grid item xs={2}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">親口座</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ fontSize: 14 }} color="black">{kigyoData.kozaInfo}</Typography>
                        </Grid>
                    </Grid>

                    {/** 貸借明細 */}
                    <Grid container style={{marginTop: 15, fontSize: 14}}>
                        <MaterialTable
                            title="貸借明細"
                            columns={columns}
                            data={data}
                            icons={tableIcons}
                            options={{
                              search: true,
                              sorting: true,
                              paging: false,
                              rowStyle: {
                                whiteSpace: 'nowrap'
                              },
                              headerStyle: {
                                whiteSpace: 'nowrap'
                              }
                            }}
                            editable={{
                                onRowAdd: newData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      setData([...data, newData]);

                                      resolve();
                                    }, 1000)
                                }),
                                onRowUpdate: (newData, oldData) =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      const dataUpdate = [...data];
                                      const index = oldData.tableData.id;
                                      dataUpdate[index] = newData;
                                      setData([...dataUpdate]);

                                      resolve();
                                    }, 1000)
                                }),
                                onRowDelete: oldData =>
                                  new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                      const dataDelete = [...data];
                                      const index = oldData.tableData.id;
                                      dataDelete.splice(index, 1);
                                      setData([...dataDelete]);

                                      resolve()
                                    }, 1000)
                                }),
                            }}
                        />
                    </Grid>

                    {/** 確定ボタン */}
                    <Grid item xs={11} style={{textAlign: 'right', marginRight: 80}}>
                        <Button variant="contained"
                          onClick={() => {kakutei()}}
                          style={{borderRadius: '4px', padding: '6px 16px', backgroundColor: '#1976d2', color: 'white', marginTop: 10}}>
                            確定
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box> 
    );
}
  
  