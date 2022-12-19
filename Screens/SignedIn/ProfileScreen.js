import React, { useState } from "react";
import { Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView } from "react-native";
import { authentication } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Dropdown } from 'react-native-material-dropdown';
import { Circle } from "react-native-svg";



const ProfileScreen = ({navigation})=> {


        function navigate(){
            navigation.navigate('SignUp')
            
        }
    
        return(
            <View style={styles.mainContainerView}>
                <View style={styles.userDataView}>
                    <Circle>
                        
                    </Circle>
                </View>

            <Text>
                Selection:
            </Text>

            </View>
            
            
        );
    }
    
    const styles = StyleSheet.create({

        mainContainerView: {

            display: 'flex',
            //flex: 1,
            //alignContent: 'center',
            flexBasis: 'auto',
            height: '100%',
            width: '100%',
            position: 'relative',
            paddingBottom: 100,

        },

        userDataContainer: {

            margin: 20,
            maxHeight:"55%",
            minHeight:"20%",
        },

        userNameContainerLabel : {

            fontSize:16,
            fontWeight:'bold',
            color: '#ffffff',
            //marginLeft: 5,
        },

        userNameContainerLabelBackGround : {

            backgroundColor: '#0A284A',
            width: '20%',
            height: 30,
            marginLeft: 5,
            padding: 5,
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 10,


        },


        //Previous Styles
        mainView:{
          marginTop:10,
          flex:1,
          flexDirection:'column',
          backgroundColor:'#d5d9e3'
        
        },
        TopView:{
            width:'100%',
            height:'40%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#3262a8',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            
        },
        BottomView:{
            marginTop: 20,
            paddingBottom: 50,
            width:'100%',
            height:'50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'flex-start',
            borderRadius: 30,
            paddingLeft: 20,
            
            //opacity:0.7
            
        },
        logostyle:{
             width:'70%',
             resizeMode:'contain'
        },
        HeadingStyle:{
            color:'#ffffff',
            fontSize:39,
            fontWeight:'bold',
            marginLeft:30,
            marginTop:60
        },
        FormView:{
            width:'100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            marginTop:40
        },
        TextInput:{
            width:'80%',
            borderWidth:1,
            borderColor:'#ffffff',
            height:52,
            borderRadius: 15,
            paddingLeft: 15,
            marginTop:20,
            color:'#ffffff'
    
        },
        Button:{
            width:'80%',
            backgroundColor:'#ffffff',
            height:52,
            borderRadius: 15,
            paddingLeft: 15,
            marginTop:20,
            color:'#000000',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
        },
        ButtonText:{
            fontSize:16,
            fontWeight:'bold',
            color: '#3262a8',
            padding: 5,
        },
        TextButton:{
            width:'80%',
            color:'gray',
           // fontStyle:'oblique'
        },
        SignUpButton:{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:15
        },
        Terms:{
    
            fontSize:11,
            color:'gray',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:10
        },
        circle: {
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: "#8d949e",
            borderColor: "#4e5763",
            borderWidth: 6,
            marginBottom:10,
          },
    
    })
    
    
    export default ProfileScreen