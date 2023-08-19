import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, ActivityIndicator, TextInput, VirtualizedList, FlatList } from 'react-native';
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list'
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator'
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import moment from 'moment/moment';
dayjs.extend(advancedFormat);
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const dataImageWeather = [
  require('./assets/Sunny.png'), require('./assets/Partlycloudy.png'),
  require('./assets/Patchyrain.png'), require('./assets/Partlycloudynight.png'),
  require('./assets/Clearnight.png'), require('./assets/Overcast.png'),
  require('./assets/Lightrain.png'), require('./assets/Lightrainshow.png'),
  require('./assets/Heavyrain.png'), require('./assets/Mist.png'),
  require('./assets/Thunderyoutbreaks.png'), require('./assets/Patchysnow.png'),
  require('./assets/Sleetweather.png'), require('./assets/Blizzardweather.png'),
  require('./assets/Icepelletsweat.png'), require('./assets/Rainthunder.png'),
  require('./assets/Snowthunder.png'), require('./assets/Freezingfog.png'),
]

const countries = [
  { key: 1, value: 'Abidjan' }, { key: 2, value: 'Abu Dhabi' }, { key: 3, value: 'Abuja' }, { key: 4, value: 'Accra' }, { key: 5, value: 'Addis Ababa' }, { key: 6, value: 'Ahmedabad' }, { key: 7, value: 'Aleppo' }, { key: 8, value: 'Alexandria' }, { key: 9, value: 'Algiers' }, { key: 10, value: 'Almaty' }, { key: 11, value: 'Amman' }, { key: 12, value: 'Amsterdam' }, { key: 13, value: 'Anchorage' }, { key: 14, value: 'Andorra la Vella' }, { key: 15, value: 'Ankara' }, { key: 16, value: 'Antananarivo' }, { key: 17, value: 'Apia' }, { key: 18, value: 'Arnold' }, { key: 19, value: 'Ashgabat' }, { key: 20, value: 'Asmara' }, { key: 21, value: 'Asuncion' }, { key: 22, value: 'Athens' }, { key: 23, value: 'Auckland' }, { key: 24, value: 'Avarua' }, { key: 25, value: 'Baghdad' }, { key: 26, value: 'Baku' }, { key: 27, value: 'Bamako' }, { key: 28, value: 'Banda Aceh' }, { key: 29, value: 'Bandar Seri Begawan' }, { key: 30, value: 'Bandung' }, { key: 31, value: 'Bangkok' }, { key: 32, value: 'Bangui' }, { key: 33, value: 'Banjul' }, { key: 34, value: 'Barcelona' }, { key: 35, value: 'Barranquilla' }, { key: 36, value: 'Basrah' }, { key: 37, value: 'Basse-Terre' }, { key: 38, value: 'Basseterre' }, { key: 39, value: 'Beijing' }, { key: 40, value: 'Beirut' }, { key: 41, value: 'Bekasi' }, { key: 42, value: 'Belem' }, { key: 43, value: 'Belgrade' }, { key: 44, value: 'Belmopan' }, { key: 45, value: 'Belo Horizonte' }, { key: 46, value: 'Bengaluru' }, { key: 47, value: 'Berlin' }, { key: 48, value: 'Bern' }, { key: 49, value: 'Bishkek' }, { key: 50, value: 'Bissau' },
  { key: 51, value: "Bogota" }, { key: 52, value: "Brasilia" }, { key: 53, value: "Bratislava" }, { key: 54, value: "Brazzaville" }, { key: 55, value: "Bridgetown" }, { key: 56, value: "Brisbane" }, { key: 57, value: "Brussels" }, { key: 58, value: "Bucharest" }, { key: 59, value: "Budapest" }, { key: 60, value: "Buenos Aires" }, { key: 61, value: "Bujumbura" }, { key: 62, value: "Bursa" }, { key: 63, value: "Busan" }, { key: 64, value: "Cairo" }, { key: 65, value: "Cali" }, { key: 66, value: "Caloocan" }, { key: 67, value: "Camayenne" }, { key: 68, value: "Canberra" }, { key: 69, value: "Cape Town" }, { key: 70, value: "Caracas" }, { key: 71, value: "Casablanca" }, { key: 72, value: "Castries" }, { key: 73, value: "Cayenne" }, { key: 74, value: "Charlotte Amalie" }, { key: 75, value: "Chengdu" }, { key: 76, value: "Chennai" }, { key: 77, value: "Chicago" }, { key: 78, value: "Chisinau" }, { key: 79, value: "Chittagong" }, { key: 80, value: "Chongqing" }, { key: 81, value: "Colombo" }, { key: 82, value: "Conakry" }, { key: 83, value: "Copenhagen" }, { key: 84, value: "Cordoba" }, { key: 85, value: "Curitiba" }, { key: 86, value: "Daegu" }, { key: 87, value: "Daejeon" }, { key: 88, value: "Dakar" }, { key: 89, value: "Dallas" }, { key: 90, value: "Damascus" }, { key: 91, value: "Dar es Salaam" }, { key: 92, value: "Delhi" }, { key: 93, value: "Denver" }, { key: 94, value: "Dhaka" }, { key: 95, value: "Dili" }, { key: 96, value: "Djibouti" }, { key: 97, value: "Dodoma" }, { key: 98, value: "Doha" }, { key: 99, value: "Dongguan" }, { key: 100, value: "Douala" },
  { key: 101, value: "Douglas" }, { key: 102, value: "Dubai" }, { key: 103, value: "Dublin" }, { key: 104, value: "Durban" }, { key: 105, value: "Dushanbe" }, { key: 106, value: "Faisalabad" }, { key: 107, value: "Fort-de-France" }, { key: 108, value: "Fortaleza" }, { key: 109, value: "Freetown" }, { key: 110, value: "Fukuoka" }, { key: 111, value: "Funafuti" }, { key: 112, value: "Gaborone" }, { key: 113, value: "George Town" }, { key: 114, value: "Georgetown" }, { key: 115, value: "Gibraltar" }, { key: 116, value: "Gitega" }, { key: 117, value: "Giza" }, { key: 118, value: "Guadalajara" }, { key: 119, value: "Guangzhou" }, { key: 120, value: "Guatemala City" }, { key: 121, value: "Guayaquil" }, { key: 122, value: "Gujranwala" }, { key: 123, value: "Gustavia" }, { key: 124, value: "Gwangju" }, { key: 125, value: "Hamburg" }, { key: 126, value: "Hanoi" }, { key: 127, value: "Harare" }, { key: 128, value: "Havana" }, { key: 129, value: "Helsinki" }, { key: 130, value: "Ho Chi Minh City" }, { key: 131, value: "Hong Kong" }, { key: 132, value: "Honiara" }, { key: 133, value: "Honolulu" }, { key: 134, value: "Houston" }, { key: 135, value: "Hyderabad" }, { key: 136, value: "Hyderabad" }, { key: 137, value: "Ibadan" }, { key: 138, value: "Incheon" }, { key: 139, value: "Isfahan" }, { key: 140, value: "Islamabad" }, { key: 141, value: "Istanbul" }, { key: 142, value: "Izmir" }, { key: 143, value: "Jaipur" }, { key: 144, value: "Jakarta" }, { key: 145, value: "Jeddah" }, { key: 146, value: "Jerusalem" }, { key: 147, value: "Johannesburg" }, { key: 148, value: "Juarez" }, { key: 149, value: "Juba" }, { key: 150, value: "Kabul" },
  { key: 151, value: "Kaduna" }, { key: 152, value: "Kampala" }, { key: 153, value: "Kano" }, { key: 154, value: "Kanpur" }, { key: 155, value: "Kaohsiung" }, { key: 156, value: "Karachi" }, { key: 157, value: "Karaj" }, { key: 158, value: "Kathmandu" }, { key: 159, value: "Kawasaki" }, { key: 160, value: "Kharkiv" }, { key: 161, value: "Khartoum" }, { key: 162, value: "Khulna" }, { key: 163, value: "Kigali" }, { key: 164, value: "Kingsburg" }, { key: 165, value: "Kingston" }, { key: 166, value: "Kingstown" }, { key: 167, value: "Kinshasa" }, { key: 168, value: "Kobe" }, { key: 169, value: "Kolkata" }, { key: 170, value: "Kota Bharu" }, { key: 171, value: "Kowloon" }, { key: 172, value: "Kuala Lumpur" }, { key: 173, value: "Kumasi" }, { key: 174, value: "Kuwait" }, { key: 175, value: "Kyiv" }, { key: 176, value: "Kyoto" }, { key: 177, value: "La Paz" }, { key: 178, value: "Lagos" }, { key: 179, value: "Lahore" }, { key: 180, value: "Libreville" }, { key: 181, value: "Lilongwe" }, { key: 182, value: "Lima" }, { key: 183, value: "Lisbon" }, { key: 184, value: "Ljubljana" }, { key: 185, value: "Lome" }, { key: 186, value: "London" }, { key: 187, value: "Los Angeles" }, { key: 188, value: "Luanda" }, { key: 189, value: "Lubumbashi" }, { key: 190, value: "Lusaka" }, { key: 191, value: "Luxembourg" }, { key: 192, value: "Macau" }, { key: 193, value: "Madrid" }, { key: 194, value: "Majuro" }, { key: 195, value: "Makassar" }, { key: 196, value: "Malabo" }, { key: 197, value: "Male" }, { key: 198, value: "Mamoudzou" }, { key: 199, value: "Managua" }, { key: 200, value: "Manama" },
  { key: 201, value: "Manaus" }, { key: 202, value: "Manila" }, { key: 203, value: "Maputo" }, { key: 204, value: "Maracaibo" }, { key: 205, value: "Maracay" }, { key: 206, value: "Mariehamn" }, { key: 207, value: "Marigot" }, { key: 208, value: "Maseru" }, { key: 209, value: "Mashhad" }, { key: 210, value: "Mbabane" }, { key: 211, value: "Mecca" }, { key: 212, value: "Medan" }, { key: 213, value: "Medellin" }, { key: 214, value: "Medina" }, { key: 215, value: "Melbourne" }, { key: 216, value: "Mexico City" }, { key: 217, value: "Miami" }, { key: 218, value: "Minsk" }, { key: 219, value: "Mogadishu" }, { key: 220, value: "Monaco" }, { key: 221, value: "Monrovia" }, { key: 222, value: "Montevideo" }, { key: 223, value: "Montreal" }, { key: 224, value: "Moroni" }, { key: 225, value: "Moscow" }, { key: 226, value: "Mosul" }, { key: 227, value: "Multan" }, { key: 228, value: "Mumbai" }, { key: 229, value: "Muscat" }, { key: 230, value: "N'Djamena" }, { key: 231, value: "Nagoya" }, { key: 232, value: "Nairobi" }, { key: 233, value: "Nanchong" }, { key: 234, value: "Nanjing" }, { key: 235, value: "Nassau" }, { key: 236, value: "Nay Pyi Taw" }, { key: 237, value: "New York" }, { key: 238, value: "Niamey" }, { key: 239, value: "Nicosia" }, { key: 240, value: "Nouakchott" }, { key: 241, value: "Noumea" }, { key: 242, value: "Novosibirsk" }, { key: 243, value: "Nuku'alofa" }, { key: 244, value: "Nur-Sultan" }, { key: 245, value: "Nuuk" }, { key: 246, value: "Oranjestad" }, { key: 247, value: "Osaka" }, { key: 248, value: "Oslo" }, { key: 249, value: "Ottawa" }, { key: 250, value: "Ouagadougou" },
  { key: 251, value: "Pago Pago" }, { key: 252, value: "Palembang" }, { key: 253, value: "Palo Alto" }, { key: 254, value: "Panama" }, { key: 255, value: "Papeete" }, { key: 256, value: "Paramaribo" }, { key: 257, value: "Paris" }, { key: 258, value: "Perth" }, { key: 259, value: "Philadelphia" }, { key: 260, value: "Phnom Penh" }, { key: 261, value: "Phoenix" }, { key: 262, value: "Podgorica" }, { key: 263, value: "Port Louis" }, { key: 264, value: "Port Moresby" }, { key: 265, value: "Port of Spain" }, { key: 266, value: "Port-Vila" }, { key: 267, value: "Port-au-Prince" }, { key: 268, value: "Porto Alegre" }, { key: 269, value: "Porto-Novo" }, { key: 270, value: "Prague" }, { key: 271, value: "Praia" }, { key: 272, value: "Pretoria" }, { key: 273, value: "Pristina" }, { key: 274, value: "Puebla" }, { key: 275, value: "Pune" }, { key: 276, value: "Pyongyang" }, { key: 277, value: "Quezon City" }, { key: 278, value: "Quito" }, { key: 279, value: "Rabat" }, { key: 280, value: "Rawalpindi" }, { key: 281, value: "Recife" }, { key: 282, value: "Reykjavik" }, { key: 283, value: "Riga" }, { key: 284, value: "Rio de Janeiro" }, { key: 285, value: "Riyadh" }, { key: 286, value: "Road Town" }, { key: 287, value: "Rome" }, { key: 288, value: "Roseau" }, { key: 289, value: "Saint George's" }, { key: 290, value: "Saint Helier" }, { key: 291, value: "Saint John's" }, { key: 292, value: "Saint Peter Port" }, { key: 293, value: "Saint Petersburg" }, { key: 294, value: "Saint-Denis" }, { key: 295, value: "Saint-Pierre" }, { key: 296, value: "Saipan" }, { key: 297, value: "Salvador" }, { key: 298, value: "San Antonio" }, { key: 299, value: "San Diego" }, { key: 300, value: "San Francisco" },
  { key: 301, value: "San Jose" }, { key: 302, value: "San Juan" }, { key: 303, value: "San Marino" }, { key: 304, value: "San Salvador" }, { key: 305, value: "Sanaa" }, { key: 306, value: "Santa Cruz de la Sierra" }, { key: 307, value: "Santiago" }, { key: 308, value: "Santo Domingo" }, { key: 309, value: "Sao Paulo" }, { key: 310, value: "Sao Tome" }, { key: 311, value: "Sapporo" }, { key: 312, value: "Sarajevo" }, { key: 313, value: "Seattle" }, { key: 314, value: "Semarang" }, { key: 315, value: "Seoul" }, { key: 316, value: "Shanghai" }, { key: 317, value: "Sharjah" }, { key: 318, value: "Shenzhen" }, { key: 319, value: "Singapore" }, { key: 320, value: "Skopje" }, { key: 321, value: "Sofia" }, { key: 322, value: "South Tangerang" }, { key: 323, value: "Soweto" }, { key: 324, value: "Stockholm" }, { key: 325, value: "Sucre" }, { key: 326, value: "Surabaya" }, { key: 327, value: "Surat" }, { key: 328, value: "Suva" }, { key: 329, value: "Sydney" }, { key: 330, value: "Tabriz" }, { key: 331, value: "Taipei" }, { key: 332, value: "Tallinn" }, { key: 333, value: "Tangerang" }, { key: 334, value: "Tarawa" }, { key: 335, value: "Tashkent" }, { key: 336, value: "Tbilisi" }, { key: 337, value: "Tegucigalpa" }, { key: 338, value: "Tehran" }, { key: 339, value: "Tel Aviv" }, { key: 340, value: "Thimphu" }, { key: 341, value: "Tianjin" }, { key: 342, value: "Tijuana" }, { key: 343, value: "Tirana" }, { key: 344, value: "Tokyo" }, { key: 345, value: "Toronto" }, { key: 346, value: "Torshavn" }, { key: 347, value: "Tripoli" }, { key: 348, value: "Tunis" }, { key: 349, value: "Ulan Bator" }, { key: 350, value: "Vaduz" },
  { key: 351, value: "Valencia" }, { key: 352, value: "Valletta" }, { key: 353, value: "Vancouver" }, { key: 354, value: "Victoria" }, { key: 355, value: "Vienna" }, { key: 356, value: "Vientiane" }, { key: 357, value: "Vilnius" }, { key: 358, value: "Warsaw" }, { key: 359, value: "Washington" }, { key: 360, value: "Wellington" }, { key: 361, value: "Willemstad" }, { key: 362, value: "Windhoek" }, { key: 363, value: "Wuhan" }, { key: 364, value: "Xi'an" }, { key: 365, value: "Yamoussoukro" }, { key: 366, value: "Yangon" }, { key: 367, value: "Yaounde" }, { key: 368, value: "Yekaterinburg" }, { key: 369, value: "Yerevan" }, { key: 370, value: "Yokohama" }, { key: 371, value: "Zagreb" }
]

export default function App() {
  const [text, onChangeText] = useState('Hanoi');

  const [first, setfirst] = useState({})
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [windspeed, setWindspeed] = useState(0)
  const [invisibleView, setInvisibleView] = useState(0)
  const [temp_c, setTemp_c] = useState(0)
  const [feelsLike, setfeelsLike] = useState(0)
  const [precip, setPrecip] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [pressure, setPressure] = useState(0)
  const [uv, setUv] = useState(0)
  const [imgWeatherBg, setImgWeatherBg] = useState(require('./assets/bgbasic.png'))
  const [Tsunrise, setTsunrise] = useState('')
  const [Tsunset, setTsunset] = useState('')
  const [Future, setFuture] = useState('')
  const [Past, setPast] = useState('')
  const [checkIsDay, setCheckIsDay] = useState(false)
  const [dataForecast, setDataForecast] = useState([])
  const [dataForecast10Days, setDataForecast10Days] = useState([])
  const aniLoading = () => {
    return <ActivityIndicator style={styles.boxAll} size={'large'} />
  }
  const getImage = (codeWeather, statusWeather, is_Day) => {
    if (codeWeather == 1000) {
      if (statusWeather == 'Sunny') {
        setImgWeatherBg(dataImageWeather[0])
      } else if (statusWeather == 'Clear') {
        setImgWeatherBg(dataImageWeather[4])
      }
    } else if (codeWeather == 1003 || codeWeather == 1006) {
      if (is_Day) {
        setImgWeatherBg(dataImageWeather[1])
        return
      }
      setImgWeatherBg(dataImageWeather[3])
    } else if (codeWeather == 1186 || codeWeather == 1189 || codeWeather == 1063) {
      setImgWeatherBg(dataImageWeather[2])
    } else if (codeWeather == 1009) {
      setImgWeatherBg(dataImageWeather[5])
    } else if (codeWeather == 1183 || codeWeather == 1072 || codeWeather == 1153 || codeWeather == 1180) {
      setImgWeatherBg(dataImageWeather[6])
    } else if (codeWeather == 1240 || codeWeather == 1150 || codeWeather == 1168 || codeWeather == 1171 || codeWeather == 1198 || codeWeather == 1249 || codeWeather == 1252) {
      setImgWeatherBg(dataImageWeather[7])
    } else if (codeWeather == 1243 || codeWeather == 1192 || codeWeather == 1201 || codeWeather == 1243 || codeWeather == 1246) {
      setImgWeatherBg(dataImageWeather[8])
    } else if (codeWeather == 1030 || codeWeather == 1135) {
      setImgWeatherBg(dataImageWeather[9])
    } else if (codeWeather == 1087) {
      setImgWeatherBg(dataImageWeather[10])
    } else if (codeWeather == 1066 || codeWeather == 1114 || codeWeather == 1210 || codeWeather == 1213 || codeWeather == 1216 || codeWeather == 1219 || codeWeather == 1222 || codeWeather == 1225 || codeWeather == 1255 || codeWeather == 1258) {
      setImgWeatherBg(dataImageWeather[11])
    } else if (codeWeather == 1069 || codeWeather == 1207 || codeWeather == 1204) {
      setImgWeatherBg(dataImageWeather[12])
    } else if (codeWeather == 1117) {
      setImgWeatherBg(dataImageWeather[13])
    } else if (codeWeather == 1237 || codeWeather == 1261 || codeWeather == 1264) {
      setImgWeatherBg(dataImageWeather[14])
    } else if (codeWeather == 1273 || codeWeather == 1276) {
      setImgWeatherBg(dataImageWeather[15])
    } else if (codeWeather == 1279 || codeWeather == 1282) {
      setImgWeatherBg(dataImageWeather[16])
    } else if (codeWeather == 1147) {
      setImgWeatherBg(dataImageWeather[17])
    }
  }
  useEffect(() => {
    fetch('http://api.weatherapi.com/v1/current.json?key=013b2e0604444d0ba27135632230905&q=' + text).then(response => response.json())
      .then(data => {
        setfirst(data)
        var dateNew = new Date(data.location.localtime).toDateString()
        setDate(dateNew)
        setWindspeed(Math.round(data.current.wind_kph))
        setInvisibleView(Math.round(data.current.vis_km))
        setTemp_c(Math.round(data.current.temp_c))
        setfeelsLike(Math.round(data.current.feelslike_c))
        setPrecip(data.current.precip_mm)
        setHumidity(data.current.humidity)
        setPressure(data.current.pressure_mb)
        setUv(data.current.uv)
        getImage(data.current.condition.code, data.current.condition.text, data.current.is_day)
        setCheckIsDay(data.current.is_day)
        getForecast()
        foreCastIn10Days()
      }).catch((error) => console.log(error))
  }, [loading, text, Tsunrise, Tsunset])
  const getForecast = () => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=013b2e0604444d0ba27135632230905&q=' + text + '&days=2').then(response => response.json())
      .then(data => {
        setTsunrise(data.forecast.forecastday[0].astro.sunrise)
        setTsunset(data.forecast.forecastday[0].astro.sunset)
        console.log('data ' + data.forecast.forecastday[0].astro.sunrise);
        console.log('data ' + data.forecast.forecastday[0].astro.sunset);
        console.log(Tsunrise);
        console.log(Tsunset);
        let arr = []
        let arrSunSetorSunrise = []
        let timeLocal = dayjs(data.location.localtime).format('HH')
        let sunriseHour = moment(Tsunrise, 'h:mm A').format('HH:mm')
        let sunsetHour = moment(Tsunset, 'h:mm A').format('HH:mm')
        let sunriseHourND = moment(data.forecast.forecastday[1].astro.sunrise, 'h:mm A').format('HH:mm')
        let sunsetHourND = moment(data.forecast.forecastday[1].astro.sunset, 'h:mm A').format('HH:mm')
        for (const x of data.forecast.forecastday[0].hour) {
          x.time = dayjs(x.time).format('HH')
          x.temp_c = Math.round(x.temp_c)
          if (x.time >= timeLocal) {
            arr.push(x)
            if (x.time == sunriseHour.substring(0, 2)) {
              let objSunrise = { time: sunriseHour, uri: require('./assets/sunrise.png'), temp_c: 'Sunrise', checkSun: true }
              arr.push(objSunrise)
              arrSunSetorSunrise.length < 2 ? arrSunSetorSunrise.push(sunriseHour) : null

            }
            if (x.time == sunsetHour.substring(0, 2)) {
              let objSunset = { time: sunsetHour, uri: require('./assets/sunset.png'), temp_c: 'Sunset', checkSun: true }
              arr.push(objSunset)
              arrSunSetorSunrise.length < 2 ? arrSunSetorSunrise.push(sunsetHour) : null

            }
          }
        }
        for (const x of data.forecast.forecastday[1].hour) {

          if (arr.length < 27) {
            x.time = dayjs(x.time).format('HH')
            x.temp_c = Math.round(x.temp_c)
            arr.push(x)
            if (arr.length < 27) {
              if (x.time == sunriseHourND.substring(0, 2)) {
                let objSunriseND = { time: sunriseHourND, uri: require('./assets/sunrise.png'), temp_c: 'Sunrise', checkSun: true }
                arr.push(objSunriseND)
                arrSunSetorSunrise.length < 2 ? arrSunSetorSunrise.push(sunriseHourND) : null
              }
              if (x.time == sunsetHourND.substring(0, 2)) {
                let objSunsetND = { time: sunsetHourND, uri: require('./assets/sunset.png'), temp_c: 'Sunset', checkSun: true }
                arr.push(objSunsetND)
                arrSunSetorSunrise.length < 2 ? arrSunSetorSunrise.push(sunsetHourND) : null
              }
            }

          } else { break }
        }
        setFuture(arrSunSetorSunrise[0])
        setPast(arrSunSetorSunrise[1])
        arr[0].time = 'Now'
        console.log(sunriseHour);
        console.log(sunsetHour);
        console.log('----------------------');
        setDataForecast(arr)
        sunriseHour != 'Invalid date' && sunsetHour != 'Invalid date' ? setLoading(false) : null
      }).catch((error) => console.log(error))
  }

  const foreCastIn10Days = () => {
    fetch('https://api.weatherapi.com/v1/forecast.json?key=013b2e0604444d0ba27135632230905&q=' + text + '&days=7').then(response => response.json())
      .then(data => {
        let arrForeCast = data.forecast.forecastday.map(({ date_epoch, day }) => ({ date_epoch, day }))
        for (const x of arrForeCast) {
          let dateNew = new Date(x.date_epoch * 1000)
          x.date_epoch = dateNew.toDateString().slice(0, 3)
          x.day.maxtemp_c = Math.round(x.day.maxtemp_c)
          x.day.mintemp_c = Math.round(x.day.mintemp_c)
        }
        setDataForecast10Days(arrForeCast)
      }).catch((error) => console.log(error))
  }
  const getItem = (dataForecast, index) => {
    return dataForecast[index];
  };
  const getItemCount = (dataForecast) => {
    return dataForecast.length;
  };
  return (
    <ImageBackground source={imgWeatherBg} resizeMode='cover' style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <SelectList
          dropdownStyles={{
            backgroundColor: '#fff',
          }}
          boxStyles={{ backgroundColor: '#fff', marginTop: 19, marginHorizontal: 10 }}
          setSelected={(val) => onChangeText(val)}
          data={countries}
          save="value"
          placeholder='Find your country'

        />
        <ScrollView scrollEnabled={true} style={{marginTop: 8}}>

          <View style={styles.box}>
            {loading ? aniLoading() :
              <>
                <View style={styles.boxDate}>
                  <Text style={styles.textDate}>{date}</Text>
                </View>
                <View style={styles.boxTemp}>
                  <Image source={{ uri: 'https:' + first.current.condition.icon }} style={styles.imgWeather} />
                  <Text style={styles.textTemp}>{first.location.name}</Text>
                  <Text style={styles.txtWeather}>{first.current.condition.text}</Text>
                  <Text style={styles.textTemp}>{temp_c}°C</Text>
                </View>
              </>
            }
          </View>
          <View style={styles.boxInfo2}>
            <BlurView intensity={250} style={styles.boxForecast} blurRadius={90}>
              <View style={{ flex: 1 }}>
                {loading ? <Text>Loading...</Text> :
                  <View>
                    <Text style={{ fontSize: 16, marginLeft: 15 }}>Weather forecast for the next 24 hours.</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#90A4AE', marginVertical: 15, marginHorizontal: 15 }}></View>
                    <VirtualizedList
                      initialNumToRender={4}
                      horizontal
                      data={dataForecast}
                      getItemCount={getItemCount}
                      getItem={getItem}
                      renderItem={({ item }) =>
                        <>
                          <View style={{ marginHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
                            {item.time == 'Now' ? <Text style={{ marginBottom: 3, fontWeight: 'bold', fontSize: 17 }}>Now</Text> : <Text style={{ marginBottom: 3, fontWeight: 'bold', fontSize: 17 }}>{item.time}</Text>}
                            {item.checkSun ? <Image source={item.uri} style={{ width: 55, height: 50, marginBottom: 3 }} /> : <Image source={{ uri: 'https:' + item.condition.icon }} style={{ width: 55, height: 50, marginBottom: 3 }} />}
                            {item.time == 'Now' ? <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{temp_c}°C</Text> : item.checkSun ? <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.temp_c}</Text> : <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{item.temp_c}°C</Text>}
                          </View>
                        </>
                      }
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                }
              </View>
            </BlurView>
          </View>

          <View style={styles.boxInfo3}>
            <BlurView intensity={250} style={styles.boxForecast2} blurRadius={90}>
              <View style={{ flex: 1 }}>
                {loading ? <Text>Loading...</Text> :
                  <View>
                    <Text style={{ fontSize: 16 }}>7-day weather forecast.</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#90A4AE', marginVertical: 15 }}></View>
                    <FlatList
                      scrollEnabled={false}
                      data={dataForecast10Days}
                      renderItem={({ item, index }) =>
                        <>
                          <View style={{ flexDirection: 'row', borderBottomWidth: index == 6 ? 0 : 1, borderBottomColor: '#90A4AE', paddingVertical: 8 }}>
                            <Text style={{ flex: 1, fontSize: 17, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{item.date_epoch}</Text>
                            <View style={{ flex: 1 }}>
                              <Image source={{ uri: 'https:' + item.day.condition.icon }} style={{ width: 32, height: 28 }} />
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                              <View style={{ flex: 0.9, alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.day.mintemp_c}°C</Text>
                              </View>
                              {item.day.maxtemp_c > 25 ? <LinearGradient
                                colors={['#FFD180', '#FFAB40', '#FF9100', '#FF6D00']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 8, height: 5, width: '100%', flex: 2.2 }}>
                              </LinearGradient> :
                                <LinearGradient
                                  colors={['#B2EBF2', '#B2DFDB', '#C6FF00', '#E6EE9C', '#FFD54F']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 1 }}
                                  style={{ borderRadius: 8, height: 5, width: '100%', flex: 2.2 }}>
                                </LinearGradient>
                              }
                              <View style={{ flex: 0.9, alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.day.maxtemp_c}°C</Text>
                              </View>
                            </View>
                          </View>
                        </>
                      }
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                }
              </View>
            </BlurView>
          </View>

          <View style={styles.boxInfo}>
            <BlurView intensity={250} style={styles.boxWind} blurRadius={90}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/sun.png')} />
                <Text style={styles.txtTitle}>UV index</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 45, fontWeight: 'bold' }}>{uv}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>{uv < 2.9 ? 'Low' : uv < 5.9 ? 'Average' : uv < 7.9 ? 'High' : uv < 10.9 ? 'Very high' : 'Freaking High!'}</Text>
                <LinearGradient
                  colors={['#00C853', '#FFFF00', '#E65100', '#7B1FA2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ borderRadius: 8 }}>
                  <Slider
                    minimumValue={0}
                    maximumValue={15}
                    minimumTrackTintColor='transparent'
                    maximumTrackTintColor='transparent'
                    thumbTintColor='#F5F5F5'
                    value={uv}
                    disabled
                  />
                </LinearGradient>
              </View>
              <View style={{ flex: 2 }}></View>
            </BlurView>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}>
                {checkIsDay ? <Text style={styles.txtTitle}>Sunset</Text> : <Text style={styles.txtTitle}>Sunrise</Text>}
              </View>
              {loading ? <View></View> :
                <>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold' }}>{Future}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 2 }}>
                    {checkIsDay ? <Image source={require('./assets/sunset.png')} style={{ width: 50, height: 50 }} /> : <Image source={require('./assets/sunrise.png')} style={{ width: 50, height: 50 }} />}

                  </View>
                  <View style={{ flex: 1 }}>
                    {checkIsDay ? <Text>Sunrise: {Past}</Text> : <Text>Sunset: {Past}</Text>}
                  </View>
                </>
              }
            </BlurView>
          </View>

          <View style={styles.boxInfo}>
            <BlurView intensity={250} style={styles.boxWind} blurRadius={90}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/wind.png')} />
                <Text style={styles.txtTitle}>Wind</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.boxCK}>
                  <Text style={{ fontSize: 20 }}>{windspeed}km/h</Text>
                </View>
              </View>
            </BlurView>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/view.png')} />
                <Text style={styles.txtTitle}>Invisible view</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.boxCK}>
                  <Text style={{ fontSize: 20 }}>{invisibleView}km</Text>
                </View>
              </View>
            </BlurView>
          </View>

          <View style={styles.boxInfo}>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/thermometer.png')} />
                <Text style={styles.txtTitle}>Feels like</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.boxCK}>
                  <Text style={{ fontSize: 20 }}>{feelsLike}°C</Text>
                </View>
              </View>
            </BlurView>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/drop.png')} />
                <Text style={styles.txtTitle}>Precipitation</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.boxCK}>
                  <Text style={{ fontSize: 20 }}>{precip} mm</Text>
                </View>
              </View>
            </BlurView>
          </View>

          <View style={styles.boxInfo}>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/humidity.png')} />
                <Text style={styles.txtTitle}>Humidity</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress
                  radius={55}
                  value={humidity}
                  fontSize={20}
                  valuePrefix='%'
                  inActiveStrokeColor='#00B0FF'
                  inActiveStrokeOpacity={0.2}
                  inActiveStrokeWidth={6}
                  duration={3000}
                />
              </View>
            </BlurView>
            <BlurView intensity={250} style={styles.boxWind}>
              <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                <Image style={{ width: 20, height: 20, marginRight: 5 }} source={require('./assets/barometer.png')} />
                <Text style={styles.txtTitle}>Pressure</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.boxCK}>
                  <Text style={{ fontSize: 20 }}>{pressure} hPa</Text>
                </View>
              </View>
            </BlurView>
          </View>

        </ScrollView>

      </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 20
  },
  box: {
    marginVertical: 8
  },
  boxTemp: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgWeather: {
    width: '40%',
    height: 150,
  },
  textTemp: {
    fontSize: 50,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxDate: {
    marginHorizontal: 15
  },
  textDate: {
    fontSize: 22,
    color: '#fff'
  },
  txtWeather: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  boxWind: {
    width: '48%',
    height: 170,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    overflow: 'hidden'
  },
  boxInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '8%',
    marginBottom: 15
  },
  boxInfo2: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '8%',
    marginBottom: 15,
  },
  boxInfo3: {
    flex: 1,
    marginHorizontal: '8%',
    marginBottom: 15,
  },
  boxForecast: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    overflow: 'hidden'
  },
  boxForecast2: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    overflow: 'hidden'
  },
  boxCK: {
    width: 110,
    height: 110,
    borderWidth: 8,
    borderColor: '#1565C0',
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: 300,
    height: 200,
    justifyContent: 'center',
  },
  slider: {
    transform: [{ rotate: '-90deg' }],
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  txtTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});
