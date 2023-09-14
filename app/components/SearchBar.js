import { View,  StyleSheet, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
export default SearchBar  = ({value,onChangeText,onClear}) => {
return (
    <View style={styles.container}>
        <TextInput value ={value} onChangeText={onChangeText}
         placeholder='search notes' style={styles.searchBox}/>
        {
            value ? <AntDesign name={'close'} color={'red'} size={18} onPress={onClear} style={styles.clearIcon}/> :null
        }
    </View>
    )
}

let styles = StyleSheet.create({
    container:{justifyContent:'center'},
    searchBox:{
        width:'90%',
        borderColor:'black',
        borderWidth:2,
        height:40,
        marginTop:20,
        borderRadius:18,
        paddingLeft:20,

        paddingLeft:4,
        paddingTop:4,
        marginBottom:40

    },
    clearIcon:{
        position:'absolute',
        right:35,
        backgroundColor:'orange',
        borderRadius:12
    }
})