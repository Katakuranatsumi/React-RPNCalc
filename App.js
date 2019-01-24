import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* 結果を表示するView */}
        <View style={styles.results}>
        <View style={styles.resultLine}></View>
        <View style={styles.resultLine}></View>
        <View style={styles.resultLine}></View>
        </View>
        {/* ボタンを配置するView */}
        <View style={styles.buttons}>
          <View style={styles.buttonsLine}></View>
          <View style={styles.buttonsLine}></View>
          <View style={styles.buttonsLine}></View>
          <View style={styles.lastButtonLinesContainer}>
            <View style={styles.twoButtonsLines}>
              <View style={styles.buttonsLine}></View>
              <View style={styles.buttonsLine}></View>
            </View>
            <View style={styles.enterButtonContainer}></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   paddingTop: STATUSBAR_HEIGHT,
  },
// 結果を表示する領域と、1つずつの行のスタイル
  results: {
   flex: 3,
   backgroundColor: '#fff',
  },
  resultLine: {
   flex: 1,
   borderBottomWidth: 1,
   justifyContent: 'center',
   alignItems: 'flex-end',
  },
// ボタンを表示する領域と、ボタンの行のスタイル
　buttons: {
   flex: 5,
  },
  buttonsLine: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'space-between',
   backgroundColor: '#fff',
   alignItems: 'center',
   borderWidth: 1,
  },
//  最後の2行は組み方が違うので違うスタイルを設定する
  lastButtonLinesContainer: {
   flex: 2,
   flexDirection: 'row',
  },
  twoButtonsLines: {
   flex: 3,
  },
  enterButtonContainer: {
   flex: 1,
   alignItems: 'center',
   borderWidth: 1,
  },
});
