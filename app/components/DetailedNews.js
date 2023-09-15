import { View, Text, StyleSheet ,Image,TouchableOpacity} from 'react-native'
import { useState } from 'react'

export default DetailedNews = (props) => {
    
    let {item} =props.route.params
    console.log(item)
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('/Users/MohitYadav/Desktop/api/assets/fake.png')} style={{ height: 20, width: 20, }} />
                    <Text style={{ fontSize: 24, marginBottom: 10, marginLeft: 10, fontWeight: 'bold' }}>{item.source.name}</Text>
                </View>
                <TouchableOpacity >
                    <Image source={{ uri: item.urlToImage }} style={{ height: 240, width: '98%', borderRadius: 8, marginTop: 4 }} />

                </TouchableOpacity>
                <View style={{  marginTop: 15, paddingRight: 14, paddingLeft: 5 }}>
                    <Text>{item.content}</Text>
                   
                </View>
            
            </View>
        

        </View>
        
    )
}

let styles = StyleSheet.create({
    container: {flex:1},
 list: {
  paddingTop: 10,
  marginBottom: 40,
  flex: 1,
  paddingHorizontal: 20


}, img: {
  height: 22,
  width: 22,

}, textStyle: {
  fontSize: 16,
  marginLeft: 3, marginRight: 5
}
})