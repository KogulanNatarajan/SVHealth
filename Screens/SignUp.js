import React, {useState} from "react";
import { View, Text, StatusBar,StyleSheet, Image,TouchableOpacity, TextInput,ScrollView  } from "react-native";
import BackIcon from 'react-native-vector-icons/Feather';
import { authentication } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FormError from "../Components/FormError";
import FormSuccess from "../Components/FormSuccess";



const SignUp = ({navigation})=>{

    //UseStates:
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setemail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');
    const [errorMessage,setErrorMessage] = useState('');
    const [successMessage,setSuccessMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [displayFormError,setDispalyFormError] = useState(false);

    
    

    function firstNameChange(value){
        setFirstName(value);
    }


    function navigate(){
        navigation.navigate('SignIn');        
    }
    
    function createUser(){

        setIsLoading(true);
        createUserWithEmailAndPassword(authentication,email,password)
        .then((re)=>{
            setIsLoading(false);
            setSuccessMessage("Account Created Successfully")

        })
        .catch((error)=>{
            setIsLoading(false);
            switch(error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage("email already in use");
                    setDispalyFormError(true);
                      break;
             }
            
        })

    
    }


    const validForm =()=>{

        var form_inputs = [firstName, lastName,email,password,confirmPassword];
        var password_match = password == confirmPassword;

        if (form_inputs.includes('') || form_inputs.includes(undefined)) {
            setErrorMessage("Please Fill all fields!")
            return setDispalyFormError(true);

        }

        if(!password_match) {
            setErrorMessage("Password doesn't match")
            return setDispalyFormError(true);
        }

        if(password_match) createUser();

    }
    return(

        <View style={styles.mainView}>
        <View style={styles.TopView}>
            <Image style={styles.logostyle} source={require('../Assets/Images/SanteValueAllWhite-1536x351-transp-dark-noborders.png')}/>

        </View>
        <View style={styles.BottomView}>
            <BackIcon style={styles.BackIcon} name="chevron-left" size={30} color={"#fff"} onPress={navigate}/>
            <Text style={styles.HeadingStyle}>
                Welcome{'\n'}
                Back
            </Text>
            <View style={styles.FormView}>
            
            <TextInput onChangeText={firstNameChange} value={firstName} style={styles.TextInput} placeholder={'First Name*'} placeholderTextColor={'#ffffff'}/>
            <TextInput onChangeText={(val)=>setLastName(val)} style={styles.TextInput} placeholder={'Last Name*'} placeholderTextColor={'#ffffff'}/>
            <TextInput onChangeText={(val)=>setemail(val)} style={styles.TextInput} placeholder={'Email address*'} placeholderTextColor={'#ffffff'}/>
            <TextInput onChangeText={(val)=>setPassword(val)} style={styles.TextInput} placeholder={'Password*'}  placeholderTextColor={'#ffffff'} multiline={false} secureTextEntry = {true}/>
            <TextInput onChangeText={(val)=>setconfirmPassword(val)}style={styles.TextInput} placeholder={'Confirm Password*'} placeholderTextColor={'#ffffff'} multiline={false} secureTextEntry = {true}/>
            <TouchableOpacity onPress={validForm} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
            <Text style={styles.Terms}>
                By signingIn you are agree with our privacy {'\n'}
                and confidentiality terms and conditions
            </Text>
            </View>
        

        </View>
       {displayFormError == true?
       <FormError hideErrorOverlay={setDispalyFormError} err={errorMessage}/>
       :
       null
        }

        {isLoading == true?
        <FormSuccess/>
        :
        successMessage== "Account Created Successfully"?
            <FormSuccess successMessage={successMessage} close={setSuccessMessage}/>
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
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
    },
    BottomView:{
        width:'100%',
        height:'80%',
        backgroundColor:'#3262a8',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
        
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
        marginTop:10
    },
    FormView:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    TextInput:{
        width:'80%',
        borderWidth:1,
        borderColor:'#ffffff',
        height:52,
        borderRadius: 15,
        paddingLeft: 15,
        marginTop:10,
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
       marginTop:20
    },
    SignUpButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:35
    },
    Terms:{

        fontSize:11,
        color:'gray',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        textDecorationLine: 'underline',
    },
    BackIcon:{
        marginLeft: 20,
        marginTop: 10,
        font: {
            fontFamily: 'Feather',
        }
    }

    
})

export default SignUp