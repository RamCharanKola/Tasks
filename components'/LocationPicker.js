import { Alert, StyleSheet, View } from 'react-native';
import{ getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';

import OutlineButton from './OutlineButton';

function LocationPicker(){
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    async function verifyPermissions(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if(locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions!',
                'You need to grant location permissions to use this app.'
            );

            return false;
        }

        return true;
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions();

        if(!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        console.log(location,'location');
    }

    function onPickMap(){

    }
    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <OutlineButton onPress={getLocationHandler}>Locate User</OutlineButton>
                {/* <OutlineButton onPress={onPickMap}>Pick on Map</OutlineButton> */}
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a5d15b',
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});