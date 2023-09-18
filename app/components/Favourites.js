import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default Favourites = () => {
    let [fav, setFav] = useState([])
    let getFavData = async () => {
        let result = await AsyncStorage.getItem('fav')
        if (result !== null) {
            result =await JSON.parse(result)
            setFav(result)
            console.log(fav[3].image +'resultsa');
        }
        
        
    }
    useEffect(()=>{
        // AsyncStorage.clear()
        getFavData()
        // setFav(fav)
    },[])
    // console.log(props +'favourites')
    return (
        <View style={styles.container}>

        </View>
    )
}

let styles = StyleSheet.create({
    container: {},
})