import React, { useState } from "react";
import { Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView } from "react-native";
import { authentication } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";



const Notification = ({navigation})=> {


        function navigate(){
            navigation.navigate('SignUp')
            
        }
    
        return(
            <View style={styles.mainView}>
                
                    <Text>
                        Notification Screen
                    </Text>
                    <Text style={styles.item}>
                        Keep your care Team Informed!
                    </Text>
                    <Text style={styles.item}>
                        Tab here to submit the survey...
                    </Text>
                    <Text style={styles.item}>
                        How are you Felling?
                    </Text>
                    <Text style={styles.item}>
                        Day 10: What new today? {'\n'}
                        Tab here to submit the survey...
                    </Text>
                    <Text style={styles.item}>
                        Notification 5
                    </Text>
                    <Text style={styles.item}>
                        Notification 6
                    </Text>
                    <Text style={styles.item}>
                        Notification 7
                    </Text>
                    <Text style={styles.item}>
                        Notification 8
                    </Text>
                
                 
            </View>
            
        );
    }
    
    const styles = StyleSheet.create({
        mainView:{
          marginTop:40,
          flex:1,
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#d5d9e3'
        
        },
        TopView:{
            width:'100%',
            height:'100%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            
        },
        BottomView:{
            width:'100%',
            height:'60%',
            backgroundColor:'#3262a8',
            borderRadius:30,
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
            fontWeight:'bold'
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
        item: {
            padding: 20,
            width: '90%',
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            backgroundColor: '#8ab4eb',
           
            },
    
    })
    
    
    export default Notification