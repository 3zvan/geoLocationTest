import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const startWatchingGeolocation = async (location, setLocation, setLatDelta, setLongDelta) => {
    const hasPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
        Geolocation.watchPosition(
            (position) => {
                if (position.coords.latitude > location.latitude) {
                    setLatDelta(-1);
                } else if (position.coords.latitude < location.latitude) {
                    setLatDelta(1);
                }
                if (position.coords.longitude > location.longitude) {
                    setLongDelta(-1);
                } else if (position.coords.longitude < location.longitude) {
                    setLongDelta(1);
                }
                setLocation(position.coords);
                console.log(position);
            },
            (error) => {
                Alert.alert("watchPosition ERROR", `${error.code}: ${error.message}`);
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, interval: 1000, distanceFilter: 10 }
        );
    }
}

export const getLocationInfo = async () => {
    const hasPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (hasPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                Alert.alert("getCurrentPosition result", `Long: ${position.coords.longitude}, Lat: ${position.coords.latitude}`);
                console.log(position);
            },
            (error) => {
                Alert.alert("getCurrentPosition ERROR", `${error.code}: ${error.message}`);
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 10 }
        );
    }
}