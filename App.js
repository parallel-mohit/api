import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import SearchBar from './app/components/SearchBar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import DeletedNews from './app/components/DeletedNews'
import Favourites from './app/components/Favourites'
import DetailedNews from './app/components/DetailedNews'

let Tab = createMaterialTopTabNavigator();
let Stack = createNativeStackNavigator();
export default App = () => {
  let [greet, setGreet] = useState('Evening')
  function greetEvent() {
    let hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet('Morning')
    else if (hrs === 1 || hrs < 17) return setGreet('Afternoon')
  }
  let handleLike = () => { }

  // let RenderScreen = (props)=>{
  //   return <Home {...props} 
  // }

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
            <Tab.Screen name='news' component={News} />
            <Tab.Screen name='deleted news' component={DeletedNews} />
            <Tab.Screen name='favourites' component={Favourites} />
          </Tab.Navigator>
        </NavigationContainer>
        {/* <NavigationContainer>
       
      </NavigationContainer> */}




      </View>
    </>
  )
}
let News = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='DetailedNews' component={DetailedNews} />
    </Stack.Navigator>
  )
}
let Home = (props) => {
 
  // let user=[{like,Comments,share,fav}]
  let [likeCount, setLikeCount] = useState(0)
  // let [IconColor, setIconColor] = useState(false)
  let [likeDisplay, setLikeDisplay] = useState(true)
  let [favDisplay, setFavDisplay] = useState(true)

  let iconColor = null
  let handleLike = (url) => {
    
    if (likeDisplay === true) {
      likeCount = likeCount + 1
      setLikeCount(likeCount)
      // coms
    } else {
      setLikeCount(--likeCount)
    }
    setLikeDisplay(!likeDisplay)
  }

  let handleFav = () => {
    setFavDisplay(!favDisplay)
  }

  let handleDelete = () => { }
  let modal = () => {

    Alert.alert('Do you want to Delete', 'this news', [
      {
        text: 'Delete',
        onPress: handleDelete
      }, {
        text: 'Favourite'
      }
    ])
  }
  let handleUrl = (item) => {
    props.navigation.navigate('DetailedNews', { item })
  }

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
    <>

      <View style={styles.container}>
        {data ?

          <FlatList data={data}
            renderItem={({ item }) =>
              <View style={styles.list}>

                <View style={{ flexDirection: 'row' }}>
                  <Image source={require('./assets/fake.png')} style={{ height: 20, width: 20, }} />
                  <Text style={{ fontSize: 24, marginBottom: 10, marginLeft: 10, fontWeight: 'bold' }}>{item.source.name}</Text>
                </View>
                <Text style={{ fontStyle: 'italic' }}>{item.title}</Text>
                <TouchableOpacity onPress={() => handleUrl(item)} onLongPress={modal}>
                  <Image source={{ uri: item.urlToImage }} style={{ height: 240, width: '98%', borderRadius: 8, marginTop: 4 }} />

                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 15, paddingRight: 14, paddingLeft: 5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      {likeDisplay ?
                        <TouchableOpacity onPress={() => handleLike(item.url)}>
                          <Image source={require('./assets/heart2.png')} style={styles.img} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => handleLike()}>
                          <Image source={require('./assets/heart3.png')} style={styles.img} />
                        </TouchableOpacity>
                      }
                      {console.log(item)}
                      <TouchableOpacity >
                        <Text style={styles.textStyle}>{`${likeCount} likes`}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity >
                        <Image source={require('./assets/chat.png')} style={[styles.img,]} />
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <Text style={styles.textStyle}>1 comments</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity >
                        <Image source={require('./assets/send.png')} style={[styles.img,]} />
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <Text style={styles.textStyle}>4 shares</Text>
                      </TouchableOpacity>
                    </View>
                  </View >
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    {favDisplay ?
                      <TouchableOpacity onPress={handleFav}>
                        <Image source={require('./assets/star.png')} style={styles.img} />
                      </TouchableOpacity> :
                      <TouchableOpacity onPress={handleFav}>
                        <Image source={require('./assets/star1.png')} style={styles.img} />
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>
            } /> : null}
      </View>
    </>
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
