import React, {useState,useEffect} from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import HomeScreen from './Screens/SignedIn/HomeScreen';
import ProfileScreen from './Screens/SignedIn/ProfileScreen';
import Notification from './Screens/SignedIn/Notification';
import StudyScreen from './Screens/SignedIn/StudyScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from './Firebase/firebase';

// => Node = ()
const App = ()  => {

  const  [isSignedIn,setIsSignedIn] = useState(true);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  
  // useEffect(()=>{
  //   authentication.onAuthStateChanged(user=>{
  //     if(user){
  //       setIsSignedIn(false);
  //     }
  //     else{
  //       setIsSignedIn(false)
  //     }
  //   })
  // },[])
  

  if(isSignedIn == true){
    return(
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Studies') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            }

            else if (route.name === 'Notification') {
              iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
            }

            else if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },} )}>
          
          <Tab.Screen name='Home' component={HomeScreen}/>
          <Tab.Screen name='Studies' component={StudyScreen}/>
          <Tab.Screen name='Notification' component={Notification}/>
          <Tab.Screen name='Profile' component={ProfileScreen}/>
        </Tab.Navigator>
      </NavigationContainer>

    );

  } else{
    return(
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
       < Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>
       < Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
    );

  }
  
      
  
};

const styles = StyleSheet.create({
  mainView:{
    marginTop:40,
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center'
  },


})

export default App;
