import React, {useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PDFViewer, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import ReportTemplate from '../template/ReportTemplate';
import lodash from 'lodash';

const styles = StyleSheet.create({
  pdfViewer: {
    height: '900px',
    width: '1500px'
  }
});

// スキーム定義
const schemes = [
  {
    name: "スキーム(USD)",
    value: "USD"
  },
  {
    name: "スキーム(GBP)",
    value: "GBP"
  },
  {
    name: "スキーム(EUR)",
    value: "EUR"
  },
  {
    name: "スキーム(JPY)",
    value: "JPY"
  },
  {
    name: "スキーム(CNY)",
    value: "CNY"
  },
  {
    name: "スキーム(HKD)",
    value: "HKD"
  }
];

export default function Report () {

  const [data, setData] = useState({});
  const [scheme, setScheme] = useState(schemes[0].value);
  const [targetYM, setTargetYM] = React.useState('202110');

  // 検索
  function search() {
    // スキーム・対象年月両方とも空でない場合
    if(scheme !== "" && targetYM !== "") {
      let reportData = require('../data/report/'+ scheme + '/' + targetYM + '.json');
      setData(reportData);
    }
  }

  useEffect(()=>{
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container sx={{ textAlign: 'center' }} spacing={2}>
        <Grid container xs={12} style={{marginLeft: 70, marginTop: 30}}>
            <Grid item xs={2} />
            <Grid item xs={1} style={{marginTop: 5}}>
              <Typography color="text.secondary">スキーム名</Typography>
            </Grid>
            <Grid item xs={2}>
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
            <Grid item xs={1} style={{marginTop: 5}}>
              <Typography color="text.secondary">対象年月</Typography>
            </Grid>
            <Grid item xs={2}>
              <Input value={targetYM} onChange={event => setTargetYM(event.target.value)} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={() => search()}>検索</Button>
            </Grid>
            <Grid item xs={1} />
        </Grid>
        
        <Grid container sx={{ textAlign: 'center' }} spacing={2}>
          <Grid item xs={7} />
          <Grid item xs={5} style={{marginBottom: -10, marginLeft: -5}}>
            {!lodash.isEmpty(data) ?
            <PDFDownloadLink document={<ReportTemplate data={data}/>} fileName="report.pdf" >
              {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download')}
            </PDFDownloadLink>
            :null}
          </Grid>  
        </Grid>
        
        <Grid item xs={12} >
          <PDFViewer showToolbar={false} style={styles.pdfViewer}>
            <ReportTemplate data={data}/>
          </PDFViewer>
        </Grid>
      </Grid>
    </Box> 
    );
  }
  
  