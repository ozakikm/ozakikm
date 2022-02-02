import React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/Button';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import DateRangeIcon from '@mui/icons-material/DateRange';
import Radio from '@mui/material/Radio';
import lodash from 'lodash';

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

export default function DataTree () {
    const history = useHistory();

    const [scheme, setScheme] = useState(schemes[0].value);
    const [date, setDate] = useState("");
    const [correctionMode, setCorrectionMode] = useState("1");

    const kigyo = "企業ABC";

    const gotoCorrectionPage = () => {
        let url = "";

        // 口座情報取得
        let kozaInfo = document.getElementById(scheme).value;

        // 貸借明細補正の場合
        if(correctionMode === "1") {
            url = "/taishakuCorrection";
        } else if(correctionMode === "2") {
            // 残高補正の場合
            url = "/zandakaCorrection";
        }

        // スキーム情報取得
        let selectedScheme = lodash.find(schemes, function(o) { 
            return o.value === scheme;
        });

        // 画面遷移
        history.push({
            pathname: url,
            state: { kigyo: kigyo, scheme: selectedScheme, date: date, kozaInfo: kozaInfo }
        });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={8} style={{marginLeft: 20, marginTop: 10}}>
                    <Grid container>
                        {/** 企業 */}
                        <Grid item xs={2}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">企業G</Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography style={{ fontSize: 14 }} color="black">{kigyo}</Typography>
                        </Grid>

                        {/** 日付 */}
                        <Grid item xs={2} style={{marginTop: 10}}>
                            <Typography style={{ fontSize: 14 }} color="text.secondary">日付</Typography>
                        </Grid>
                        <Grid container xs={10}>
                            <Grid item xs={2}>
                                <Input value={date} />
                            </Grid>
                            <Grid item xs={2} style={{marginLeft: -45}}>
                                <DatePicker
                                  onChange={(selectedDate) => {setDate(selectedDate.toLocaleDateString());}}
                                  customInput={
                                    <IconButton>
                                      <DateRangeIcon />
                                    </IconButton >
                                  }/>
                            </Grid>
                        </Grid>

                        {/** スキーム */}
                        <Grid item xs={2} style={{marginTop: 5}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">スキーム</Typography>
                        </Grid>
                        <Grid container xs={10}>
                            <Grid container xs={12} style={{marginLeft: -10}}>
                                {schemes.map((thisScheme) => (
                                    <Grid container xs={12}>
                                        <Grid container xs={3}>
                                            <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 14,},} }
                                                checked={scheme === thisScheme.value}
                                                onChange={(event) => {setScheme(event.target.value)}}
                                                value={thisScheme.value}/>
                                            <Typography style={{ fontSize: 14, marginTop: 5 }} color="black">{thisScheme.name}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Input id={thisScheme.value} placeholder="親口座情報" variant="standard" />
                                        </Grid>
                                    </Grid>
                                    
                                ))}
                            </Grid>
                        </Grid>

                        {/** 補正モード */}
                        <Grid item xs={2} style={{marginTop: 10}}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">補正モード</Typography>
                        </Grid>
                        <Grid container xs={10} style={{marginLeft: -10}}>
                            <Grid container xs={2} style={{marginTop: 5}}>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 14,},} }
                                    checked={correctionMode === "1"}
                                    onChange={(event) => {setCorrectionMode(event.target.value)}}
                                    value="1"/>
                                <Typography sx={{ fontSize: 14, marginTop: 0.5 }} color="black">貸借明細</Typography>
                            </Grid>
                            <Grid container xs={2} style={{marginTop: 5}}>
                                <Radio sx={{'& .MuiSvgIcon-root': {fontSize: 14,},} }
                                    checked={correctionMode === "2"}
                                    onChange={(event) => {setCorrectionMode(event.target.value)}}
                                    value="2"/>
                                <Typography sx={{ fontSize: 14, marginTop: 0.5 }} color="black">残高</Typography>
                            </Grid>
                            <Grid item xs={12} />

                            {/** 補正画面へ */}
                            <Grid item xs={3} />
                            <Grid item xs={1}>
                                <Button variant="contained"
                                  onClick={gotoCorrectionPage}
                                  style={{borderRadius: '4px', padding: '6px 16px', backgroundColor: '#1976d2', color: 'white', width: 110, marginTop: 10}}>
                                    補正画面へ
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} />
            </Grid>
        </Box> 
    );
}
  
  