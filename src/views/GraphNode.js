import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// ノード情報
export const NODE_PROPS = {
    WIDTH: 175,             // 横幅
    HEIGHT: 60,             // 縦幅
    STROKE: 'black',        // 枠線の色
    STROKE_WIDTH: 1         // 枠線の太さ
};

// ノードへの表示文字情報
export const TEXT_PROPS = {
    X_OFFSET: -5,           // x軸偏移
    Y_OFFSET: 30,           // y軸偏移
    FILL: 'white',          // 文字の色
    FONTWEIGHT: 'bold',     // 文字の太さ
    FONTSIZE: 14            // 文字のサイズ
};

// Node定義-データベース
export const DataNodeDatabase = ({ nodeDatum, showNodeDetails, hideNodeDetails}) => (
        <g onMouseOver={(event) => {showNodeDetails(event, nodeDatum);}}
           onMouseOut={hideNodeDetails}>
          <rect
            x={- (NODE_PROPS.WIDTH / 2)}
            rx={NODE_PROPS.WIDTH * 2}
            ry="5"
            style={{
              width: NODE_PROPS.WIDTH,
              height: NODE_PROPS.HEIGHT,
              fill: NodeColors[nodeDatum.me.nodeColorId].body,
              stroke: NODE_PROPS.STROKE,
              strokeWidth: NODE_PROPS.STROKE_WIDTH
            }}
          />
          <ellipse
            cy="5"
            rx={NODE_PROPS.WIDTH / 2}
            ry="5"
            style={{
                fill: NodeColors[nodeDatum.me.nodeColorId].head,
                stroke: NODE_PROPS.STROKE,
                strokeWidth: NODE_PROPS.STROKE_WIDTH
              }}
           />
          <text
            x={- (NODE_PROPS.WIDTH / 2 + TEXT_PROPS.X_OFFSET)}
            y={TEXT_PROPS.Y_OFFSET}
            style={{
              fill: TEXT_PROPS.FILL,
              strokeWidth: '0',
              fontWeight: TEXT_PROPS.FONTWEIGHT,
              fontSize: TEXT_PROPS.FONTSIZE,
              maxWidth: NODE_PROPS.WIDTH
            }}
          >
            企業コード：{nodeDatum.me.kigyoCd.length > 10 ? nodeDatum.me.kigyoCd.substr( 0, 8 ) + "..." : nodeDatum.me.kigyoCd}
          </text>
          <text
            x={- (NODE_PROPS.WIDTH / 2 + TEXT_PROPS.X_OFFSET)}
            y={TEXT_PROPS.Y_OFFSET * 2 - 10}
            style={{
              fill: TEXT_PROPS.FILL,
              strokeWidth: '0',
              fontWeight: TEXT_PROPS.FONTWEIGHT,
              fontSize: TEXT_PROPS.FONTSIZE,
              maxWidth: NODE_PROPS.WIDTH
            }}
          >
            口座名称：{nodeDatum.me.kozaName.length > 8 ? nodeDatum.me.kozaName.substr( 0, 7 ) + "..." : nodeDatum.me.kozaName}
          </text>
        </g>
    );

// Node定義-Rect
export const DataNodeRect = ({ nodeDatum, showNodeDetails, hideNodeDetails }) => (
    <g onMouseOver={(event) => {showNodeDetails(event, nodeDatum);}}
       onMouseOut={hideNodeDetails}
       >
        <foreignObject style={{ height: NODE_PROPS.HEIGHT,
                                width: NODE_PROPS.WIDTH,
                                fontSize: TEXT_PROPS.FONTSIZE,
                                fontWeight: TEXT_PROPS.FONTWEIGHT,
                                x: -NODE_PROPS.WIDTH/2,
                                textAlign: 'left',
                                color: TEXT_PROPS.FILL }}>
            <div style={{ border: "2px solid black"}}>
                <div style={{backgroundColor: NodeColors[nodeDatum.me.nodeColorId].head}}>
                    企業コード：{nodeDatum.me.kigyoCd.length > 10 ? nodeDatum.me.kigyoCd.substr( 0, 8 ) + "..." : nodeDatum.me.kigyoCd}
                </div>
                <div style={{backgroundColor: NodeColors[nodeDatum.me.nodeColorId].body}}>
                    口座名称：{nodeDatum.me.kozaName.length > 8 ? nodeDatum.me.kozaName.substr( 0, 7 ) + "..." : nodeDatum.me.kozaName}
                </div>
            </div>
        </foreignObject>
    </g>
);

// Nodeプロトタイプ定義
export const NodePrototype = {
        me: {
            kigyoCd: '',
            kozaNo: '',
            kozaName: '',
            kyoten: '',
            tsuka: '',
            rounding: '',
            keisanHoho: '',
            nodeColorId: 1,
            parent:{
                kigyoCd: '',
                kozaNo: '',
                kozaName: '',
                kyoten: '',
                tsuka: '',
                rounding: '',
                keisanHoho: '',
                nodeColorId: -1
            }
        },
        children: []
    };

// Node背景色定義
export const NodeColors = {
        1: {
            head: "#6779a0",
            body: "#002060"
        },
        2: {
            head: "#9dc3e6",
            body: "#5b9bd5"
        },
        3: {
            head: "#f4b183",
            body: "#ed7d31"
        },
        4: {
            head: "#ffd966",
            body: "#ffc000"
        },
        5: {
            head: "#a9ce91",
            body: "#70ad47"
        },
        6: {
            head: "#d7e7f5",
            body: "#bdd7ee"
        },
        7: {
            head: "#f8d0b5",
            body: "#f4b183"
        },
        8: {
            head: "#fbe0ce",
            body: "#f8cbad"
        },
        9: {
            head: "#cbe3bb",
            body: "#a9d18e"
        },
        10: {
            head: "#d0c49a",
            body: "#c2a33e"
        },
        11: {
            head: "#908aac",
            body: "#4c36ad"
        },
        12: {
            head: "#618274",
            body: "#128957"
        },
        13: {
            head: "#a99c7d",
            body: "#aa7a0a"
        },
        14: {
            head: "#5c4936",
            body: "#634122"
        },
        15: {
            head: "#a57eac",
            body: "#970eb1"
        },
        16: {
            head: "#d291bc",
            body: "#d22998"
        }    
    };

// Nodeマウスオーバー時のツールチップ定義
export const NodeTooltip = (props) => {

    // ツールチップ表示位置
    let pos = props.event.target.getBoundingClientRect();
    // 企業階層
    let depth = props.nodeDatum.__rd3t.depth + 1;
    // 企業情報
    let nodeInfo = props.nodeDatum.me;

    return (
        <Card sx={{ minWidth: 300 }} style={{position: 'absolute',top: pos.top, left: pos.left + NODE_PROPS.WIDTH}}>
            <CardContent style={{padding: 0}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body" component="div">企業情報（企業階層：{depth}）</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">企業名</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.kigyoCd}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">口座番号</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.kozaNo}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">リネーム口座名称</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.kozaName}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">拠点</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.kyoten}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">通貨</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.tsuka}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">Rounding</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.rounding}</Typography>
                    </Grid>
                </Grid>
                <Grid container style={{marginLeft: 15}}>
                    <Grid item xs={5}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">計算方法</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }} color="secondary">{nodeInfo.keisanHoho}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};
