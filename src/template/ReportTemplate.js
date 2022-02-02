import React from "react";
import { Document, Page, Text, View, Image, Font, StyleSheet } from '@react-pdf/renderer';
import fontRegular from '../fonts/Nasu-Regular.ttf'
import fontBold from '../fonts/Nasu-Bold.ttf'
import {ReportLabel} from '../const/ReportConst';
// import descArrow from '../assets/pdf_desc_arrow.jpg'
import reportLogo from '../assets/rst_logo.png'

Font.register({
    family: 'Nasu-Regular',
    src: fontRegular
  });

Font.register({
  family: 'Nasu-Bold',
  src: fontBold
});
  
// スタイルシート
const styles = StyleSheet.create({
    page: {
      fontFamily: 'Nasu-Regular'
    },
    flexDirectionRow: {
      flexDirection: 'row'
    },
    fontWeightBold: {
      flexDirection: 'row',
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold'
    },
    fontWeightBoldWithBgColor: {
      flexDirection: 'row',
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold',
      backgroundColor: '#ddebf7'
    },
    fontSize8: {
      fontSize: 8
    },
    reportHeaderContainer: {
      fontSize: 18,
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 10
    },
    reportTitle: {
      width: '85%',
      borderBottom: 3,
      borderBottomColor: '#4f7496'
    },
    reportSecretLevel: {
      color: '#ff3705',
      borderLeft: 3,
      borderBottom: 3,
      borderLeftColor: '#ff3705',
      borderBottomColor: '#ff3705',
      backgroundColor: '#fff2cc',
      paddingLeft: '20px'
    },
    space1: {
      height: '25px'
    },
    space2: {
      height: '40px'
    },
    space3: {
      width: '10px',
      backgroundColor: 'white'
    },
    space4: {
      width: '690px'
    },
    space5: {
      width: '345px'
    },
    space6: {
      width: '80px'
    },
    space7: {
      width: '430px'
    },
    space8: {
      width: '162px'
    },
    reportDescContainer: {
      fontSize: 14,
      flexDirection: 'row'
    },
    descArrow: {
      height: '15px',
      width:'20px',
      marginTop: '2px',
      marginRight: '5px'
    },
    incident1: {
      width:'3%'
    },
    incident2: {
      width:'3%'
    },
    incident3: {
      width:'25%'
    },
    incident4: {
      width:'6%'
    },
    incident5: {
      width:'7%'
    },
    reportContentHeader: {
      fontSize: 8,
      flexDirection: 'row'
    },
    reportLogo: {
      height: '28px',
      width:'290px',
      marginTop: '2px',
      marginLeft: '40px'
    },
    reportContentScheme: {
      flexDirection: 'row',
      height: '25px'
    },
    cellSchemeLabel: {
      color: '#074a8a',
      width: '100px',
      textAlign: 'center',
      borderTop: 1,
      borderLeft: 1,
      borderBottom: 1,
      justifyContent: 'center'
    },
    cellSchemeValue: {
      width: '180px',
      textAlign: 'center',
      border: 1,
      justifyContent: 'center'
    },
    cellConditonLabel: {
      color: '#074a8a',
      width: '40px',
      textAlign: 'center',
      borderBottom: 1,
      paddingTop: '6px'
    },
    cellConditonValue: {
      width: '60px',
      textAlign: 'center',
      borderBottom: 1,
      paddingTop: '6px',
      marginLeft: '-1px'
    },
    reportContentReference: {
      flexDirection: 'row',
      fontSize: 8,
      color: '#074a8a'
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#d9d9d9'
    },
    tableHeaderCell1: {
      height: '50px',
      textAlign: 'center',
      borderTop: 1,
      borderLeft: 1,
      borderBottom: 1
    },
    tableHeaderDateCell: {
      height: '50px',
      textAlign: 'center',
      borderTop: 1,
      borderLeft: 1,
      borderBottom: 1,
      width: '45px',
      justifyContent: 'center'
    },
    tableHeaderCell2: {
      height: '25px',
      textAlign: 'center',
      borderTop: 1,
      borderLeft: 1,
      borderBottom: 1,
      width: '170px',
      justifyContent: 'center'
    },
    tableHeaderCell3: {
      height: '25px',
      textAlign: 'center',
      borderLeft: 1,
      borderBottom: 1,
      width: '85px',
      justifyContent: 'center'
    },
    tableHeaderCell4: {
      height: '50px',
      width: '80px',
      textAlign: 'center',
      borderTop: 1,
      borderLeft: 1,
      borderBottom: 1,
      justifyContent: 'center'
    },
    tableHeaderCell5: {
      height: '50px',
      width: '80px',
      textAlign: 'center',
      border: 1,
      justifyContent: 'center'
    },
    tableHeaderCell6: {
      height: '50px',
      width: '80px',
      textAlign: 'center',
      borderTop: 3,
      borderLeft: 3,
      borderRight: 3,
      borderBottom: 1,
      borderColor: 'grey',
      justifyContent: 'center'
    },
    tableCellWithBgcolor1: {
      borderLeft: 1,
      borderBottom: 1,
      backgroundColor: '#ddebf7'
    },
    tableCellWithoutBgcolor1: {
      borderLeft: 1,
      borderBottom: 1
    },
    tableCellDate: {
      width: '45px',
      borderLeft: 1,
      borderBottom: 1,
      textAlign: 'center',
      marginTop: '-1px'
    },
    tableCellDateFinal: {
      width: '45px',
      borderTop: 2,
      borderLeft: 2,
      borderBottom: 2,
      textAlign: 'center',
      marginTop: '-1px'
    },
    tableCell2: {
      width: '85px',
      borderLeft: 1,
      borderBottom: 1,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell2Final: {
      width: '85px',
      borderTop: 2,
      borderLeft: 2,
      borderBottom: 2,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell3: {
      width: '80px',
      borderLeft: 1,
      borderBottom: 1,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell3Final: {
      width: '80px',
      borderTop: 2,
      borderLeft: 2,
      borderBottom: 2,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell4: {
      width: '80px',
      borderLeft: 1,
      borderBottom: 1,
      borderRight: 1,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell4Final: {
      width: '80px',
      border: 2,
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell5: {
      width: '80px',
      borderLeft: 3,
      borderBottom: 1,
      borderRight: 3,
      borderColor: 'grey',
      textAlign: 'right',
      marginTop: '-1px'
    },
    tableCell5Final: {
      width: '80px',
      border: 3,
      textAlign: 'right',
      marginTop: '-1px'
    },
    rowBgroundColor: {
      flexDirection: 'row',
      backgroundColor: '#ddebf7'
    },
    summaryLabel1: {
      width: '85px',
      textAlign: 'right'
    },
    summaryLabel2: {
      width: '80px',
      textAlign: 'right'
    },
    summaryLabel3: {
      width: '85px',
      borderTop: 2,
      borderLeft: 2,
      borderBottom: 2,
      textAlign: 'center',
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold',
      fontSize: 4,
      justifyContent: 'center'
    },
    summaryLabel4: {
      width: '78px',
      border: 2,
      textAlign: 'center',
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold',
      justifyContent: 'center'
    },
    summaryCell1: {
      width: '87px',
      textAlign: 'right',
      border: 2,
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold'
    },
    summaryCell2: {
      width: '80px',
      textAlign: 'right',
      border: 3,
      borderColor: 'grey',
      fontFamily: 'Nasu-Bold',
      fontWeight: 'bold'
    }
  });

export default function ReportTemplate (props) {
    // レポートデータ
    const data = props.data;

    return (
      <Document>
        <Page size="A3" style={styles.page}>
          {/* レポートヘッダ */}
          {/* <View style={styles.reportHeaderContainer}>
            <View style={styles.reportTitle}>
              <Text>{ReportLabel.TITLE}</Text>
            </View>
            <View style={styles.reportSecretLevel}>
              <Text>{ReportLabel.SECRET_CONFIDENTIAL}</Text>
            </View>
          </View> */}
    
          {/* 余白 */}
          <View style={styles.space1} />
    
          {/* レポート説明文 */}
          {/* <View style={styles.reportDescContainer}>
            <View style={styles.incident1} />
            <View>
              <Image style={styles.descArrow} src={descArrow} />
            </View>
            <View>
              <Text>{ReportLabel.DESCRIPTION}</Text>
            </View>
            <View style={styles.incident1} />
          </View> */}
    
          {/* 余白 */}
          <View style={styles.space2} />

          {/* Contentヘッダ-logo&スキーム */}
          <View style={styles.reportContentHeader}>
            <View style={styles.incident2} /> 
            <View>
              <Image style={styles.reportLogo} src={reportLogo} />
            </View>
            <View style={styles.reportContentScheme}>
              <View style={styles.incident3} />
              <View style={styles.cellSchemeLabel}>
                <Text>{ReportLabel.SCHEME_NAME}</Text>
              </View>
              <View style={styles.cellSchemeValue}>
                <Text>{data.scheme}</Text>
              </View>
            </View>
          </View>

          {/* Contentヘッダ-条件 */}
          <View style={styles.reportContentHeader}>
            <View style={styles.incident4} />
            {/* From */}
            <View style={styles.flexDirectionRow}>
              <View style={styles.cellConditonLabel}>
                <Text>{ReportLabel.FROM}</Text>
              </View>
              <View style={styles.cellConditonValue}>
                <Text>{data.from}</Text>
              </View>
            </View>
            <View style={styles.space3} />
            {/* To */}
            <View style={styles.flexDirectionRow}>
              <View style={styles.cellConditonLabel}>
                <Text>{ReportLabel.TO}</Text>
              </View>
              <View style={styles.cellConditonValue}>
                <Text>{data.to}</Text>
              </View>
            </View>
            <View style={styles.space3} />
            {/* As of */}
            <View style={styles.flexDirectionRow}>
              <View style={styles.cellConditonLabel}>
                <Text>{ReportLabel.ASOF}</Text>
              </View>
              <View style={styles.cellConditonValue}>
                <Text>{data.asOf}</Text>
              </View>
            </View>
          </View>

          {/* Content-Reference */}
          <View style={styles.reportContentReference}>
            <View style={styles.space4} />
            <View><Text>{ReportLabel.REFERENCE}</Text></View>
          </View>

          {/* Content-詳細 */}
          <View style={styles.fontSize8}>
            {/* Content-テーブルヘッダ */}
            <View style={styles.flexDirectionRow}>
              <View style={styles.incident4} />
              <View style={styles.tableHeader}>
              {/* Content-テーブルCol1 */}
              <View style={styles.tableHeaderDateCell}><Text>{ReportLabel.DATE}</Text></View>

              {/* Content-テーブルCol2 */}
              <View>
                <View style={styles.tableHeaderCell2}><Text>{ReportLabel.CSA}</Text></View>
                <View style={styles.flexDirectionRow}>
                  <View style={styles.tableHeaderCell3}><Text>{ReportLabel.DEBIT}</Text></View>
                  <View style={styles.tableHeaderCell3}><Text>{ReportLabel.CREDIT}</Text></View>
                </View>
              </View>

              {/* Content-テーブルCol3 */}
              <View style={styles.tableHeaderCell4}>
                <Text>{ReportLabel.ENDOFDAY}</Text>
                <Text>{ReportLabel.BALANCE}</Text>
              </View>

              {/* Content-テーブルCol4 */}
              <View>
                <View style={styles.tableHeaderCell2}><Text>{ReportLabel.CICLB}</Text></View>
                <View style={styles.flexDirectionRow}>
                  <View style={styles.tableHeaderCell3}>
                    <View>
                      <View><Text>{ReportLabel.LENDING_BALANCE}</Text></View>
                      <View><Text>{ReportLabel.FROM_HEADER}</Text></View>
                    </View>
                  </View>
                  <View style={styles.tableHeaderCell3}>
                  <View>
                      <View><Text>{ReportLabel.BORROWING_BALANCE}</Text></View>
                      <View><Text>{ReportLabel.FROM_PARTICIPANT}</Text></View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Content-テーブルCol5 */}
              <View style={styles.tableHeaderCell4}>
                <Text>{ReportLabel.INTEREST}</Text>
                <Text>{ReportLabel.LENDING}</Text>
              </View>

              {/* Content-テーブルCol6 */}
              <View style={styles.tableHeaderCell5}>
                <Text>{ReportLabel.INTEREST}</Text>
                <Text>{ReportLabel.BORROWING}</Text>
              </View>

              {/* Content-テーブルCol7 */}
              <View style={styles.space3} />
              <View style={styles.tableHeaderCell6}>
                <Text>{ReportLabel.WHT_INTEREST}</Text>
                <Text>{ReportLabel.LENDING}</Text>
              </View>
            </View>
            </View>

            {/* Content-明細 */}
            <View>
              <View style={styles.incident4} />
                {data.details !== undefined ? data.details.map((row, index) => (
                  <View style={styles.flexDirectionRow}>
                    <View style={styles.incident4} />
                    {
                      index%2 === 0 ?
                        index !== (data.details.length - 1) ? 
                          <View style={styles.flexDirectionRow}>
                            <View style={styles.tableCellDate}><Text>{row.date}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.debit}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.credit}</Text></View>
                            <View style={styles.tableCell3}><Text>{row.endOfDayBalance}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.lendingBalance}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.borrowingBalance}</Text></View>
                            <View style={styles.tableCell3}><Text>{row.lendingInterest}</Text></View>
                            <View style={styles.tableCell4}><Text>{row.borrowingInterest}</Text></View>
                            <View style={styles.space3} />
                            <View style={styles.tableCell5}><Text>{row.whtLendingInterest}</Text></View>
                          </View>
                          :
                          <View style={styles.fontWeightBold}>
                            <View style={styles.tableCellDateFinal}><Text>{row.date}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.debit}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.credit}</Text></View>
                            <View style={styles.tableCell3Final}><Text>{row.endOfDayBalance}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.lendingBalance}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.borrowingBalance}</Text></View>
                            <View style={styles.tableCell3Final}><Text>{row.lendingInterest}</Text></View>
                            <View style={styles.tableCell4Final}><Text>{row.borrowingInterest}</Text></View>
                            <View style={styles.space3} />
                            <View style={styles.tableCell5Final}><Text>{row.whtLendingInterest}</Text></View>
                          </View>
                        :index !== (data.details.length - 1) ? 
                          <View style={styles.rowBgroundColor}>
                            <View style={styles.tableCellDate}><Text>{row.date}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.debit}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.credit}</Text></View>
                            <View style={styles.tableCell3}><Text>{row.endOfDayBalance}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.lendingBalance}</Text></View>
                            <View style={styles.tableCell2}><Text>{row.borrowingBalance}</Text></View>
                            <View style={styles.tableCell3}><Text>{row.lendingInterest}</Text></View>
                            <View style={styles.tableCell4}><Text>{row.borrowingInterest}</Text></View>
                            <View style={styles.space3} />
                            <View style={styles.tableCell5}><Text>{row.whtLendingInterest}</Text></View>
                          </View>
                          :
                          <View style={styles.fontWeightBoldWithBgColor}>
                            <View style={styles.tableCellDateFinal}><Text>{row.date}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.debit}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.credit}</Text></View>
                            <View style={styles.tableCell3Final}><Text>{row.endOfDayBalance}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.lendingBalance}</Text></View>
                            <View style={styles.tableCell2Final}><Text>{row.borrowingBalance}</Text></View>
                            <View style={styles.tableCell3Final}><Text>{row.lendingInterest}</Text></View>
                            <View style={styles.tableCell4Final}><Text>{row.borrowingInterest}</Text></View>
                            <View style={styles.space3} />
                            <View style={styles.tableCell5Final}><Text>{row.whtLendingInterest}</Text></View>
                          </View>
                    }
                  </View>
                )) : null}

                {/* Content-サマリー */}
                <View>
                  {/* サマリー-ラベルA,B,C,D */}
                  <View style={styles.flexDirectionRow}>
                    <View style={styles.space5}></View>
                    <View style={styles.flexDirectionRow}>
                      <View style={styles.summaryLabel1}><Text>{ReportLabel.A}</Text></View>
                      <View style={styles.summaryLabel1}><Text>{ReportLabel.B}</Text></View>
                      <View style={styles.summaryLabel2}><Text>{ReportLabel.C}</Text></View>
                      <View style={styles.summaryLabel2}><Text>{ReportLabel.D}</Text></View>
                    </View>
                  </View>
                  {/* サマリー-明細 */}
                  <View style={styles.flexDirectionRow}>
                    <View style={styles.space5}></View>
                    <View style={styles.summaryLabel3}>
                      <View><Text>{ReportLabel.CI}</Text></View>
                      <View><Text>{ReportLabel.CLB}</Text></View>
                    </View>
                    <View style={styles.summaryCell1}>
                      <View><Text>{data.summaryCICLB}</Text></View>
                    </View>
                    <View style={styles.space6} />
                    <View style={styles.summaryLabel4}>
                      <View><Text>{ReportLabel.TOTAL_INTEREST}</Text></View>
                    </View>
                    <View style={styles.space3} />
                    <View style={styles.summaryCell2}>
                      <View><Text>{data.summaryTotalInterest}</Text></View>
                    </View>
                  </View>
                  {/* サマリー-ラベルA-B,C-D */}
                  <View style={styles.flexDirectionRow}>
                    <View style={styles.space7}></View>
                    <View style={styles.flexDirectionRow}>
                      <View style={styles.summaryLabel1}><Text>{ReportLabel.A_MINUS_B}</Text></View>
                      <View style={styles.space8}></View>
                      <View style={styles.summaryLabel1}><Text>{ReportLabel.C_MINUS_D}</Text></View>
                    </View>
                  </View>
                </View>
            </View>
          </View>
        </Page>
      </Document>
    );
};