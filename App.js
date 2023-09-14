import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import SearchBar from './app/components/SearchBar'
import { NavigationContainer } from '@react-navigation/native'
// import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DeletedNews from './app/components/DeletedNews'
import Favourites from './app/components/Favourites'

let Tab = createMaterialTopTabNavigator();
export default App = () => {
  let [greet, setGreet] = useState('Evening')
  function greetEvent() {
    let hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning')
    else if (hrs === 1 || hrs < 17) return setGreet('Afternoon')
  }

  // let RenderScreen = (props)=>{
  //   return <Home {...props} 
  // }
  let handleUrl = (uril) => {
    console.log(uril)
    return <WebView source={{ uri: uril }} />
  }

  return (
    <>
      <StatusBar backgroundColor='#9494e0' />
      <View style={styles.container}>

        <View style={styles.view}>
          <Text style={styles.textIntro}>{`Good ${greet},`}</Text>
          <Text style={styles.textIntroName}>Mohit </Text>
          <SearchBar />
        </View>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name='news' component={Home} />
            <Tab.Screen name='deleted news' component={DeletedNews} />
            <Tab.Screen name='favourites' component={Favourites} />
          </Tab.Navigator>
        </NavigationContainer>



      </View>
    </>
  )
}
let Home = () => {
  let [data, setData] = useState(undefined)
  let url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=71e9dc356ab74ef48fd3f357b0f1c04f"
  let getApi = async () => {
    let result = await fetch(url)
    result = await result.json()

    setData(result.articles)

  }
  useEffect(() => {
    getApi()
  }, [])
  return (
    <View style={styles.container}>
      {data ?

        <FlatList data={data}
          renderItem={({ item }) =>
            <View style={styles.list}>
              {/* <Text style={{marginRight:10}}>{item.id}</Text> */}
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('./assets/fake.png')} style={{ height: 20, width: 20, }} />
                <Text style={{ fontSize: 24, marginBottom: 10, marginLeft: 10, fontWeight: 'bold' }}>{item.source.name}</Text>
              </View>
              <Text style={{ fontStyle: 'italic' }}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleUrl(item.url)} >
                <Image source={{ uri: item.urlToImage }} style={{ height: 200, width: '98%', borderRadius: 8, marginTop: 4 }} />

              </TouchableOpacity>

            </View>} /> : null}
    </View>
  )
}


let styles = StyleSheet.create({
  container: {
    backgroundColor: '',
    flex: 1,
    marginTop: 20,

  }, textIntro: {
    fontSize: 23,
    fontStyle: 'italic',
    opacity: 0.9, paddingTop: 30,

  },
  textIntroName: {
    fontSize: 25, fontStyle: 'normal',
    marginTop: 5,


  }, view: {
    backgroundColor: '#9494e0',
    paddingLeft: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 10


  }, list: {
    paddingTop: 20,
    marginBottom: 34,
    flex: 1,
    paddingHorizontal: 20


}
})
