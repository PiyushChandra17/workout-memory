import { Text } from 'react-native'
import { ColorSchemeName } from 'react-native';

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlannerScreen from '../screens/PlannerScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';



const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
        <NavigationContainer theme={DarkTheme}>
            <RootNavigator />
        </NavigationContainer>
    )
}

const RootNavigator = () => {
    
    return (
        
            <Stack.Navigator>
                <Stack.Screen 
                    name="Root" 
                    component={TabNavigator} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="WorkoutDetail" 
                    component={WorkoutDetailScreen} 
                    options={{ title: "Workout Info"}}
                    
                />
            </Stack.Navigator>
        
    )
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {

    return (
        <Tab.Navigator initialRouteName='Home'>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color,size }) => 
                        <Icon 
                            name="home" 
                            size={size} 
                            color={color}
                        />
                }}
            />
            <Tab.Screen 
                name="Planner" 
                component={PlannerScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ color,size }) => 
                        <Icon name="list-ol" size={size} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default Navigation;