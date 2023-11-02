import { View, StatusBar, Image, StyleSheet, Alert, ScrollView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppTextField from '../components/AppTextField'
import axios from 'axios'
import { ActivityIndicator, Button, Card, IconButton, Surface, Text } from 'react-native-paper'

const WeatherPage = () => {
    const [weatherBg, setweatherBg] = useState('')
    const [CityName, setCityName] = useState('Noida')
    const [weatherInfo, setweatherInfo] = useState([])
    const [loading, setloading] = useState(false)
    const StatusBarHeight = StatusBar.currentHeight
    const ApiKey = '10633e721b0c4734a9071940230211'
    const baseUrl = 'http://api.weatherapi.com/v1'
    const WeatherCondition = {
        Default: require('../assets/default.jpg'),
        Sunny: require('../assets/sunny.jpg'),
        Cloudy: require('../assets/cloudy.jpg'),
        Overcast: require('../assets/overcast.jpg'),
        ThunderStrom: "",
        PartlySunny: "",
        Fod: "",
        Showers: "",
        HeavyRain: "",
        RainWithSun: "",
        Snowy: "",
        PartlyCloudlyNight: "",
        PartlyCloudly: require('../assets/partlyCloud.jpg'),
        Clear: require('../assets/clear.jpg'),
        ClearNight: ""
    }
    function onSearchHandler() {
        if (CityName.length == 0) {
            Alert.alert('Please Enter City Name')
        } else {
            getWeatherInfo()
        }

    }

    function getWeatherInfo() {
        setloading(true)
        axios.get(`${baseUrl}/current.json?key=${ApiKey}&q=${CityName}`).
            then((res) => {
                Keyboard.isVisible(false)
                console.log('icon', res.data.current.condition.text)
                setweatherInfo(res?.data)
                setloading(false)
            }).catch((error) => {
                Keyboard.isVisible(false)
                // console.log('errrorrrrrr', error)
                Alert.alert('Something Went Wrong', 'Please Provide Valid City Name')
                setloading(false)
            })
    }
    useEffect(() => {
        getWeatherInfo()
    }, [])
    const styles = StyleSheet.create({
        MainContainer: {
            flex: 1,
            paddingTop: StatusBarHeight,
            paddingBottom: StatusBarHeight / 2,
            paddingHorizontal: StatusBarHeight / 2,
            gap: 20
        },
        HeadText: {
            textAlign: 'center',
            fontWeight: "bold"
        },
        BottomChildrend: {
            flex: 1
        }

    })

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} barStyle={'default'} />

            <Image blurRadius={3}
                style={StyleSheet.absoluteFillObject}
                source={
                    weatherInfo?.current?.condition?.text == "Overcast" ? WeatherCondition.Overcast : WeatherCondition.Default ||
                        weatherInfo?.current?.condition?.text == "Cloudy" ? WeatherCondition.Cloudy : WeatherCondition.Default ||
                            weatherInfo?.current?.condition?.text == "Sunny" ? WeatherCondition.Sunny : WeatherCondition.Default ||
                                weatherInfo?.current?.condition?.text == "Clear" ? WeatherCondition.Clear : WeatherCondition.Default ||
                                    weatherInfo?.current?.condition?.text == "Partly cloudy" ? WeatherCondition.PartlyCloudly : WeatherCondition.Default
                }
            />
            <View style={styles.MainContainer}>
                <AppTextField
                    CityName={CityName}
                    onSearchHandler={onSearchHandler}
                    setCityName={setCityName}
                />
                <ScrollView contentContainerStyle={{ flex: 1, padding: 2, rowGap: 20 }}>

                    {
                        loading ? <Button loading>WeatherInfo Is Loading......</Button> :
                            <>
                                <Card style={{ flex: 1 }}>
                                    <Card.Content style={{ rowGap: 10 }}>
                                        <Card.Cover style={StyleSheet.absoluteFillObject} source={{ uri: 'https:' + weatherInfo?.current?.condition?.icon }} />
                                        <IconButton onPress={onSearchHandler} mode='contained' style={{ alignSelf: "flex-end" }} icon={'refresh'} />
                                        <Text variant='headlineMedium' style={styles.HeadText}>{weatherInfo?.location?.name}</Text>
                                        <Text variant='displayLarge' style={[styles.HeadText, {}]}>{weatherInfo?.current?.feelslike_c}</Text>
                                        <Text variant='headlineSmall' style={styles.HeadText}>{weatherInfo?.current?.condition?.text}</Text>
                                        <Text variant='titleMedium' style={styles.HeadText}>Last Updated : {weatherInfo?.current?.last_updated}</Text>
                                    </Card.Content>
                                </Card>
                                <Card>
                                    <Card.Content style={{ flexGrow: 1, flexDirection: "row", columnGap: 20, justifyContent: "space-between" }}>
                                        <Card mode='contained' style={[styles.BottomChildrend, { backgroundColor: "transparent" }]}>
                                            <Card.Content style={{ rowGap: 20, }}>
                                                <Text variant='titleMedium'>Felt Temp</Text>
                                                <Text variant='titleMedium'>Felt Fer</Text>
                                                <Text variant='titleMedium'>Humidity</Text>
                                                <Text variant='titleMedium'>Wind_Kph</Text>
                                                <Text variant='titleMedium'>Visibility_Km</Text>
                                                <Text variant='titleMedium'>Pressure_In</Text>
                                                <Text variant='titleMedium'>Min Temp</Text>
                                            </Card.Content>
                                        </Card>
                                        <Card mode='contained' style={styles.BottomChildrend}>
                                            <Card.Content style={{ rowGap: 20 }}>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.feelslike_c}</Text>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.feelslike_f}</Text>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.humidity}</Text>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.wind_kph}</Text>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.vis_km}</Text>
                                                <Text variant='titleMedium'>{weatherInfo?.current?.pressure_in}</Text>
                                                <Text variant='titleMedium'>Min Temp</Text>
                                            </Card.Content>
                                        </Card>
                                    </Card.Content>
                                </Card>
                            </>
                    }


                </ScrollView>
            </View>




        </>

    )
}

export default WeatherPage

