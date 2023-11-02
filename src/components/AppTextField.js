import { View, Text, TextInput, StatusBar } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper'
export default function AppTextField({ CityName, onSearchHandler, setCityName }) {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 40,
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white"
        }}>
            <TextInput
                placeholder='Enter City Name'
                value={CityName}
                onChangeText={(val) => setCityName(val)}
                style={{ paddingLeft: 10, flex: 1, fontSize: 15, color: "rgb(102, 90, 111)", fontWeight: "500" }}
            />
            <IconButton style={{ flex: 0 }} onPress={onSearchHandler} icon={'magnify'} size={25} mode='contained' />
        </View>
    )
}