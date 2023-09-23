import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import OTPVerifyScreen from '../screens/OtpVerify';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="otp" component={OTPVerifyScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack;