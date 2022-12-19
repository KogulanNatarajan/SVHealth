import React from "react";
import { Text,View,StyleSheet,Image,TouchableOpacity } from "react-native";
import {Overlay} from 'react-native-elements';


const FormError = (props)=>{

    return(
        
        
            <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideErrorOverlay(false)}>
                 
                 <Image 
                    style={styles.logostyle}
                    source={require('../Assets/Images/error.png')}/>

                <Text style={styles.errorMessage}>
                    {props.err}
                </Text>

                <TouchableOpacity onPress={()=>props.hideErrorOverlay(false)} style={styles.Button}>
                <Text style={styles.ButtonText}>
                    Okay
                </Text>
                </TouchableOpacity>
            </Overlay>
       
    )

}

const styles = StyleSheet.create({
    Overlay:{
        width:'50%',
        height:'30%',
        borderRadius: 30,
        //opacity:0.9,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    logostyle:{

        width:72,
        height:72
    },
    errorMessage:{
        marginTop: 10


    },
    Button:{
        width:'80%',
        backgroundColor:'#000000',
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
        color:'#ffffff'
    }


})

export default FormError

