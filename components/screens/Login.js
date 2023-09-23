import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGetOTP = () => {
        const indianMobileNumberPattern = /^((\+91|91|0)[\- ]{0,1})?[6789]\d{9}$/;

        if (indianMobileNumberPattern.test(mobileNumber)) {
            setErrorMessage('');
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setMobileNumber('');
                navigation.navigate('otp', { mobileNumber });
            }, 800);
        } else {
            setErrorMessage('Please enter a valid phone number');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.loginTitle}>Login</Text>
                <Image source={require('../../assets/images/Illustration1.jpg')} style={styles.image} />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.prefix}>+91</Text>
                <TextInput
                    placeholder="Phone Number"
                    value={mobileNumber}
                    onChangeText={(text) => {
                        if (text.length <= 10) {
                            setMobileNumber(text);
                        }
                    }}
                    keyboardType="phone-pad"
                    style={styles.input}
                    placeholderTextColor={'gray'}
                    maxLength={10}
                />
            </View>
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            {loading ? (
                <ActivityIndicator size="large" color="#CB9CE0" />
            ) : (
                <TouchableOpacity onPress={handleGetOTP} style={styles.button}>
                    <Text style={styles.buttonText}>Get OTP</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.termsText}>
                By signing up, you agree with our Terms{"\n"}
                <Text style={styles.termsText}>and Conditions</Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerContainer: {
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#8424BC'
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        marginBottom: 25,
        width: '85%',
        borderWidth: 1,
        borderColor: '#8224BA',
        borderRadius: 20,
        backgroundColor: '#E6E6FA',
    },
    prefix: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 25,
        color: 'gray'
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
        color: 'gray'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#CB9CE0',
        borderRadius: 20,
        width: '85%',
        marginBottom: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 13
    },
    termsText: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '700',
        color: 'gray',
        textAlign: 'center'
    },
});

export default LoginScreen;
