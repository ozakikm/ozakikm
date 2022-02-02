import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import headerImg from '../assets/header.png'
import { useHistory } from 'react-router-dom';

export default function HeaderWithAppBar(props) {

  const history = useHistory();

  const menuContainerStyle = {backgroundColor:'#2d1f78', color: '#FFFFFF', height:'50px', flexDirection: 'row', fontSize: '14px', fontWeight: '700', textAlign: 'center'};
  const menuStyle1 = {backgroundColor:'#0f0065', width: '20px', marginRight: '1px'};
  const menuStyle2 = {backgroundColor:'#0f0065', width: '162px', marginRight: '1px', paddingTop: '16px', cursor: 'pointer'};

  function gotoUrl(url) {
    history.push({
      pathname: url
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div><img style={{width:'100%'}} src={headerImg} alt="" /></div>
      <AppBar position="static" style={menuContainerStyle}>
          <div style={menuStyle1}></div>
          <div style={menuStyle2}>HOME</div>
          <div style={menuStyle2} onClick={() => {gotoUrl('/report');}}>プーリングレポート出力</div>
          <div style={menuStyle2} onClick={() => {gotoUrl('/schemeList');}}>スキームマスタ編集</div>
          <div style={menuStyle2} onClick={() => {gotoUrl('/dataCorrection');}}>データ補正</div>
          <div style={menuStyle2}>ベースレートマスタ編集</div>
          <div style={menuStyle2}>為替変更レートマスタ編集</div>
          <div style={menuStyle2}>各種マスタ編集</div>
      </AppBar>
    </Box>
  );

}