import React, { useState } from "react";
import { Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView,TextInputProps } from "react-native";
import { authentication } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormError from "../Components/FormError";
import FormSuccess from "../Components/FormSuccess";
 




const SignIn = ({navigation})=> {

// signin state
    const [isSignedIn,setIsSignedIn] = useState(false);

    // text input states

    const [email,setemail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [displayFormError,setDispalyFormError] = useState(false);

    //signIn user

    const signInUser = ()=>{
        signInWithEmailAndPassword(authentication,email,password)
        .then((re)=>{
            setIsSignedIn(true);
                        
        })
        .catch((re)=>{
            console.log(re);
        })

    }

    const validateInput=()=>{

        var form_inputs = [email,password];


            if (form_inputs.includes('') || form_inputs.includes(undefined)) {
                setErrorMessage("Please Fill all fields!")
                return setDispalyFormError(true);

                }

            }



    function navigate(){
        navigation.navigate('SignUp')
        
    }

    return(
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Image style={styles.logostyle} source={require('../Assets/Images/SanteValueAllWhite-1536x351-transp-dark-noborders.png')}/>

            </View>
            <ScrollView style={styles.BottomView}>
                <Text style={styles.HeadingStyle}>
                    Welcome{'\n'}
                    Back
                </Text>
                <View style={styles.FormView}>
                <TextInput style={styles.TextInput} placeholder={'Email address*'} placeholderTextColor={'#ffffff'} value={email} onChangeText={(val)=>setemail(val)}/>
                <TextInput style={styles.TextInput} placeholder={'Password*'}  placeholderTextColor={'#ffffff'} value={password} autoCapitalize={'none'} multiline={false} secureTextEntry = {true} onChangeText={(val)=>setPassword(val)}/>
                <TouchableOpacity style={styles.Button} onPress={validateInput} >
                    <Text style={styles.ButtonText}>
                        Sign In
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.SignUpButton} onPress={navigate}>
                    <Text style={styles.TextButton}>
                        Sign Up
                    </Text>
                </TouchableOpacity>


                </View>
            

            </ScrollView>
           
        {displayFormError == true?
            <FormError hideErrorOverlay={setDispalyFormError} err={errorMessage}/>
            :
            null
        }    
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
        height:'40%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
    },
    BottomView:{
        width:'100%',
        height:'60%',
        backgroundColor:'#3262a8',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
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
    }

})


export default SignIn