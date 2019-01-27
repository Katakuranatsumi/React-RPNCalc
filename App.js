import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

// ボタンのFunctional Component
const CalcButton = (props) => {
  const flex = props.flex ? props.flex : 1
  return (
  <TouchableOpacity
   style={[styles.calcButton, {flex: flex}]}
   onPress={() => {props.btnEvent()}}>
  <Text style={styles.calcButtonText}>{props.label}</Text>
  </TouchableOpacity>
  )
}

// ボタンのFragmentを返すFunctional Component
const CalcButtons = (props) => {
  return (
  <React.Fragment>
   { props.buttons.map(button => {
     return (
      <CalcButton 
         key={button.label}
         flex={button.flex}
         label={button.label}
         btnEvent={button.btnEvent}
      />
     )
   })}
  </React.Fragment>
  )
}

export default class App extends React.Component {
// ボタンの定義
buttons = [
 [
  {
   label: 'AC',
   flex: 2,
   btnEvent: () => {this.acButton()},
  },
  {
   label: 'c',
   btnEvent: () => {this.cButton()},
  },
  {
   label: '+',
   btnEvent: () => {this.calcButton('+')},
  }
 ],
 [
  {
    label: '7',
    btnEvent: () => {this.valueButton('7')},
  },
  {
    label: '8',
    btnEvent: () => {this.valueButton('8')},
  },
  {
    label: '9',
    btnEvent: () => {this.valueButton('9')},
  },
  {
    label: '-',
    btnEvent: () => {this.calcButton('-')},
  }
 ],
 [
  {
   label: '4',
   btnEvent: () => {this.valueButton('4')},
  },
  {
   label: '5',
   btnEvent: () => {this.valueButton('5')},
  },
  {
   label: '6',
   btnEvent: () => {this.valueButton('6')},
  },
  {
   label: '*',
   btnEvent: () => {this.calcButton('*')},
  }
 ],
 [
  {
   label: '1',
   btnEvent: () => {this.valueButton('1')},
  },
  {
   label: '2',
   btnEvent: () => {this.valueButton('2')},
  },
  {
   label: '3',
   btnEvent: () => {this.valueButton('3')},
  },
 ],
 [
  {
   label: '0',
   btnEvent: () => {this.valueButton('0')},
  },
  {
   label: '.',
   btnEvent: () => {this.valueButton('.')},
  },
  {
   label: '/',
   btnEvent: () => {this.valueButton('/')},
  },
 ],
 [
  {
    label: 'Enter',
    btnEvent: () => {this.enterButton()},
  },
 ]
]

constructor(props) {
  super(props)
  this.state = {
    results: [],
    current: "0",
    dotInputed: false,
    afterValueButton: false,
  }
}

// ボタンの役割ごとに関数を作成
valueButton = (value) => {
  let currentString = this.state.current
  const dotInputed = this.state.dotInputed
  let newDotInputed = dotInputed
  if (value == ".") {
    // .は2回入力されたら無視する
    if(!dotInputed){
      currentString = currentString + value
      newDotInputed = true
    }
  } else if (currentString == "0") {
    currentString = value
  } else {
    currentString = currentString + value
  }
  this.setState({current: currentString, dotInputed: newDotInputed, afterValueButton: true})
}

enterButton = () => {
  let newValue = NaN
  if (this.state.dotInputed) {
    newValue = parseFloat(this.state.current)
  } else {
    newValue = parseInt(this.state.current)
  }
// parseに失敗したらスタックに積まない
  if (isNaN(newValue)) {
    return
  }
// スタックに新しい値を積む
  let results = this.state.results
  results.push(newValue)
  this.setState({current: "0", dotInputed: false, results: results, afterValueButton: false})
}

calcButton = (value) => {
// スタックが2つ以上ない場合は計算しない
  if (this.state.results.length < 2) {
    return
  }
// 数値を入力中は受け付けない(スタックにあるものだけを処理する)
  if (this.state.afterValueButton == true) {
    return
  }
  let newResults = this.state.results
  const target2 = newResults.pop()
  const target1 = newResults.pop()
  newValue = null
// スタックから取得したものを計算する
  switch (value) {
     case '+':
        newValue = target1 + target2
        break
     case '-':
        newValue = target1 - target2
        break
     case '*':
        newValue = target1 * target2
        break
     case '/':
        newValue = target1 / target2
        // 12:0で割った時に何もしないよう有限性をチェック
        if (!isFinite(newValue)) {
          newValue = null
        }
        break
      default:
        break
      }
      if (newValue == null) {
        return
      }
      // 計算結果をスタックに積む
      newResults.push(newValue)
      this.setState({current: "0", dotInputed: false, results: newResults, afterValueButton: false})
  }

acButton = () => {
  // ACボタンはスタックを含めて初期化する
  this.setState({current: "0", dotInputed: false, results: [], afterValueButton: false})
}

cButton = () => {
 // Cボタンはスタック以外を初期化する
 this.setState({current: "0", dotInputed: false, afterValueButton: false}) 
}

showValue = (index) => {
  // 文字が入力中だった場合に表示対象を1つずらす
  if (this.state.afterValueButton || this.state.results.length == 0) {
    index = index - 1
  }
  // indexが-1になったら入力中なので currentを表示する
  if (index == 1) {
    return this.state.current
  }
  // スタックで表示できるものを優先して表示する
  if (this.state.results.length > index) {
    return this.state.results[this.state.results.length - 1 - index]
  }
  return ""
}

  render() {
    return (
      <View style={styles.container}>
        {/* 結果を表示するView */}
        <View style={styles.results}>
        <View style={styles.resultLine}>
         <Text>{this.showValue(2)}</Text>
        </View>
        <View style={styles.resultLine}>
         <Text>{this.showValue(1)}</Text>
        </View>
        <View style={styles.resultLine}>
         <Text>{this.showValue(0)}</Text>
        </View>
        </View>
        {/* ボタンを配置するView */}
        <View style={styles.buttons}>
          <View style={styles.buttonsLine}>
          {/* ボタンを配置 */}
          <CalcButtons buttons={this.buttons[0]} />
          </View>
          <View style={styles.buttonsLine}>
          <CalcButtons buttons={this.buttons[1]} />
          </View>
          <View style={styles.buttonsLine}>
          <CalcButtons buttons={this.buttons[2]} />
          </View>
          <View style={styles.lastButtonLinesContainer}>
            <View style={styles.twoButtonsLines}>
              <View style={styles.buttonsLine}>
              <CalcButtons buttons={this.buttons[3]} />
              </View>
              <View style={styles.buttonsLine}>
              <CalcButtons buttons={this.buttons[4]} />
              </View>
            </View>
            <View style={styles.enterButtonContainer}>
            <CalcButtons buttons={this.buttons[5]} />
            </View>
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
   paddingRight: 20,
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
  calcButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: "#b0c4de",
  },
  calcButtonText: {
    fontSize: 20,
  },
  resultLine: {
    flex: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
});
