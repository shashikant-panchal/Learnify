import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image, SafeAreaView } from 'react-native';

const OTPVerifyScreen = ({ route, navigation }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [notificationAnimation] = useState(new Animated.Value(0));
  const refs = useRef(Array(4).fill(null).map(() => React.createRef()));

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');

    if (enteredOTP.length !== 4 || !/^\d+$/.test(enteredOTP)) {
      setErrorMessage('Invalid OTP. Please enter a valid 4-digit OTP.');
      return;
    }

    Animated.timing(notificationAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setErrorMessage('');
      setOTP(['', '', '', '']);
      Animated.timing(notificationAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
      navigation.goBack();
    }, 2000);
  };

  const handleTextChange = (text, index) => {
    if (text === '') {
      if (index > 0) {
        const newOTP = [...otp];
        newOTP[index] = '';
        setOTP(newOTP);
        refs.current[index - 1].current.focus();
      } else {
        const newOTP = [...otp];
        newOTP[index] = '';
        setOTP(newOTP);
      }
    } else if (/^\d+$/.test(text) && text.length === 1) {
      setErrorMessage('');
      const newOTP = [...otp];
      newOTP[index] = text;
      setOTP(newOTP);
      if (index < 3) {
        refs.current[index + 1].current.focus();
      }
    } else {
      setErrorMessage('Please enter a valid digit.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.loginTitle}>OTP Verification</Text>
        <Image source={require('../../assets/images/Illustration1.jpg')} style={styles.image} />
      </View>
      <Text style={styles.text}>
        OTP Sent to{"\n"}
        <Text style={styles.text2}>+91{route.params.mobileNumber}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleTextChange(text, index)}
            keyboardType="numeric"
            style={styles.otpInput}
            ref={refs.current[index]}
            maxLength={1}
            placeholderTextColor={'gray'}
          />
        ))}
      </View>
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <TouchableOpacity onPress={handleVerifyOTP} style={styles.button}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.notification,
          {
            transform: [{
              translateY: notificationAnimation.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] })
            }]
          },
        ]}
      >
        <Text style={styles.notificationText}>Your details has been submitted</Text>
      </Animated.View>
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
    color: '#8424BC',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#8224BA',
    marginRight: 10,
    textAlign: 'center',
    fontSize: 18,
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
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  notification: {
    position: 'absolute',
    top: 50,
  },
  notificationText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 15
  },
  termsText: {
    fontSize: 15,
    marginTop: 20,
    fontWeight: '700',
    color: 'gray',
    textAlign: 'center'
  },
  text: {
    fontWeight: '700',
    color: 'gray',
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center'
  },
  text2: {
    fontWeight: '700',
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center'
  }
});

export default OTPVerifyScreen;
