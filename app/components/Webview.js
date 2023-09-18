import { View,StyleSheet } from 'react-native'
import WebView from 'react-native-webview'

export default Webview = (props) => {
return(
  <View style={styles.container}>
    <WebView source={{uri:props.route.params.item.url}}/>
  </View>
)
}
let styles= StyleSheet.create({
    container:{flex:1},
})