import { StyleSheet } from 'react-native'

var baseColor = '#2B84ED';

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
        backgroundColor: baseColor,
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
        flex: .1,
        justifyContent: 'center',
        backgroundColor: baseColor,
        borderBottomColor: 'black',
        borderBottomWidth: .2,
    },
    SectionStyle: {
        flexDirection: 'column',
        height: 70,
        marginTop: 18,
        marginBottom: 8,
        
    },
    buttonStyle: {
        backgroundColor: baseColor,
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 0,
        marginLeft: 40,
        marginRight: 40,
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
        fontSize: 16,
        marginLeft: 40,
        marginRight: 40,
        borderBottomColor: baseColor,
        borderBottomWidth: 1,
    },
    forgotPasswordTextStyle: {
        flex: 1,
        color: baseColor,
        textAlign: 'left',
        fontWeight: 'bold',
        marginLeft: 40,
        fontSize: 14,
    },
    registerTextStyle: {
        flex: 1,
        color: baseColor,
        textAlign: 'right',
        fontWeight: 'bold',
        marginRight: 40,
        fontSize: 14,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    inputHeader: {
        paddingLeft: 40,
        color: baseColor,
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
    inlineText: {
        flex: 1,
        flexDirection: 'row',
    },
});