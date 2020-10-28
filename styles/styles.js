import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    center: {
        flex: 1,
        margin: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 36,
        marginBottom: 16
    },
    androidButtonText: {
        color: 'blue',
        fontSize: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#69b1ff',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFF',
    },
    duoBody: {
        flex: .25,
        justifyContent: 'center',
        backgroundColor: '#69b1ff',
        borderBottomColor: 'black',
        borderBottomWidth: .2,
    },
    SectionStyle: {
        flexDirection: 'column',
        height: 70,
        marginTop: 18,
        marginBottom: 8,
        borderBottomColor: "#69b1ff",
        borderBottomWidth: 1,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 40,
        paddingRight: 10,
        borderWidth: 0,
        borderRadius: 0,
        borderColor: 'white',
    },
    registerTextStyle: {
        color: '#69b1ff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    inputHeader: {
        paddingLeft: 40,
        color: '#69b1ff',
        fontSize: 16,
    },
    loginTitle: { 
        justifyContent: "center", 
        alignItems: "center", 
        alignContent: "center", 
        alignSelf: "center",
        fontSize: 28,
        fontWeight: "bold",
        textShadowColor: 'black',
        textShadowOffset: {width: .5, height: .5},
        textShadowRadius: .001,
    },
});