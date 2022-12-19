import React, { useState,useEffect } from "react";
import { Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView, ActivityIndicator,FlatList,Alert, Modal,Pressable } from "react-native";
import { authentication } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
// import axios from "axios";





const StudyScreen = ({navigation})=> {

    // const axios = require('axios').default;

    let [isLoading,setIsLoading] = useState();
    let [error,setError] = useState();
    let [response, setResponse] = useState([]);
    let [studyResponse, setStudyResponse] = useState([]);
    let [proposedStudyCounter, setProposedStudyCounter] = useState(true);
    let [enrolledStudyCounter, setEnrolledStudyCounter] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    let password = "mongoSecret";
    const username  = "admin";
    const base64 = require("base-64");

    
    useEffect(() => {
        
        fetch("http://dataseekerportal.dynns.com:8085/data/630c9a2f41330abc79bdccaf", {
            method: 'GET',
            headers:{
                //Authorization: "Basic " + base64.encode(username + ":" + password), 
                Authorization: "Basic " + "YWRtaW46c3VwZXJTZWNyZXQ",
                Accept: 'application/json',
                'Content-type':'application/json'   
            },
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(false);
                setResponse(result.study_ref);
                
            },
            
        )
        .catch((error) => {
            console.error(error)
            setError(error[0])
        });
    }, []);

    useEffect(() => {
        
        fetch("http://dataseekerportal.dynns.com:5000/explodedDataComplex?object_id=63610bef2d8d6d995b9cb056&params_to_explode=study_ref|study_id|study_details", {
            method: 'GET',
            headers:{
                Authorization: "Basic " + base64.encode(username + ":" + password), 
                //Authorization: "Basic " + "YWRtaW46c3VwZXJTZWNyZXQ",
                Accept: 'application/json',
                'Content-type':'application/json'   
            },
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(false);
                //console.log(base64.encode(username + ":" + password))
                setStudyResponse(result.study_ref);
                
            },
            
        )
        .catch((error) => {
            console.error(error)
            setError(error[0])
        });
    }, []);


    const loadUserStudyDetails = () => {
        if(isLoading) {
            return <ActivityIndicator size={'large'}/>
            
        }
        if(error) {
            return <Text> {error}</Text>
        }
        //console.log({response})

    }
    const handleInclude = (index) => {
        //studyResponse
        
        studyResponse[index].study_state = "INCLUDED";
        //console.log("index",studyResponse[index])
        //studyResponse.splice(index,1);
        //console.log(proposedStudyCounter)
        setModalVisible(!modalVisible)
        setStudyResponse([...studyResponse]);

    }

    const readMoreModal = () => {
        setModalVisible(true)

        return (

            <Text>

  
    
            </Text>


        );
        
        


    };

    const handleDelete = (index) => {
        //studyResponse
        
        studyResponse[index].study_state = "DECLINED";
        //console.log("index",studyResponse[index])
        //studyResponse.splice(index,1);
        setModalVisible(!modalVisible)
        setStudyResponse([...studyResponse]);

    }

    const loadStudyList = () => {

        if(isLoading) {
            return <ActivityIndicator size={'large'}/>
            
        }
        if(error) {
            return <Text> {error}</Text>
        }
        //console.log("Study Details")
        //console.log({studyResponse})
        
        
    }
    
        return(
            <View style={styles.mainView}>
                <View>
                <Text >
                       {loadUserStudyDetails()}
                       {loadStudyList()}
                    </Text>
                    </View> 
                    <View style={styles.container}>
                        <View style={styles.studyCatogery}>
                        <Text style={styles.studyCatogerytext}>
                            New
                        </Text>
                        </View>
                        
                        <View>

                        <FlatList data={studyResponse} renderItem={({item,index}) => {
                            
                            let studyTitle = item.study_details.title.split("- ")
                            let Studycode = studyTitle[0]
                            let studyTitleText = studyTitle[1].trimStart();
                            let gender = item.study_details.gender;
                            let startDate = item.study_details.start_date.split("T");
                            startDate = startDate[0];
                            let endDate = item.study_details.end_date.split("T");
                            endDate = endDate[0];
                            let genderList = []
                            for (var key in item.study_details) {
                                console.log(key);
                                console.log(item.study_details[key]);
                
                                }

                            if (gender==="ALL"){
                                genderList = ['ALL']
                            }
                            else if (gender==="Male"){
                                genderList = ['Male']

                            }
        
                        if(item.study_state==='POTENTIAL'){
                            
                                return  <View style={styles.item}>
                                
                            <Text style={styles.ButtonText}> {Studycode}{'\n'} </Text> 
                            <Text numberOfLines={2} style={styles.titleText}> {studyTitleText}{'\n'} </Text>
                            {/* <Text style={styles.studyStateText}> {item.study_state}</Text> */}
                            
                            <Text style={styles.Terms} onPress={() => readMoreModal()}> Read More </Text>
                           
                            
                            {/* <View style={styles.optIn}> */}
                            {/* <View style={styles.circle}></View> */}
                            <Ionicons name='person-add' style={styles.addIcon} onPress={()=>{handleInclude(index)}}/> 

                            {/* </View> */}
                            {/* Model View */}
            <View style={styles.centeredView}>
            
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }} > 
             
      
              <View style={styles.centeredView}>
              <ScrollView>
                <View style={styles.modalView}>
                                            
                                  <Text style={styles.readMoreHeading}> {Studycode}{'\n'} </Text> 
                                  <Text style={styles.readMoreHeading}> Summary </Text>
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.brief_summary}{'\n'} </Text> 
                                  <Text style={styles.readMoreHeading}> Measures </Text>
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.measure} </Text>
                                   
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.study_type}</Text>
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.criteria} </Text>
      
                                  <Text style={styles.readMoreHeading}> Duration </Text>
                                  <Text style={styles.readMoreHeading}>
                                  <Text  style={styles.proposedStudyReadMoreText}> {startDate} {' -'} </Text> 
                                  <Text  style={styles.proposedStudyReadMoreText}> {endDate}</Text> </Text>
                                  
      
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.gender}</Text>
      
                                  <Text  style={styles.proposedStudyReadMoreTextAge}> {'Age:'}{item.study_details.minimum_age} {'-'}{item.study_details.maximum_age}</Text>
                                 
                                  <Text style={styles.readMoreHeading} ><Ionicons name='person-remove' style={styles.button} onPress={()=>{handleDelete(index)}}/> {'\t'}{'\t'}{'\t'}
                                  <Ionicons name='person-add' style={styles.button} onPress={()=>{handleInclude(index)}}/> </Text>
                                  
                    <Ionicons name='close-circle' style={styles.button} onPress={() => setModalVisible(!modalVisible)}/> 
                    </View>
                </ScrollView>
              </View> 
            </Modal>
          </View>
                                 
                            </View> 
                                
                        }

                            }
                            
                        }
                         />


                        </View>
                        
                            
                    </View>   
                    

                    <View style={styles.includedContainer}>
                        <View style={styles.studyCatogery}>
                        <Text style={styles.studyCatogerytext}>
                            Ongoing
                        </Text>
                        </View>
                        <FlatList horizontal data={studyResponse} renderItem={({item}) => {
                        if(item.study_state==='INCLUDED'){
                            console.log(item.study_details)
                            let studyTitle = item.study_details.title.split("- ")
                            let Studycode = studyTitle[0]
                            let studyTitleText = studyTitle[1].trimStart()
                            return <View style={styles.item_included}>
                            <Text style={styles.titleCodeIcludedStudyText}> {Studycode}{'\n'} </Text> 
                            <Text numberOfLines={5} style={styles.titleText}> {studyTitleText}{'\n'} </Text> 
                            {/* <View style={styles.progressBarView}> */}
                                <View style={styles.progressBarBase}>
                            <View style={styles.progressBar}></View>
                            </View>

                            {/* </View> */}
                            
                            {/* <Text style={styles.studyStateIncludedText}> {item.study_state} {'\n'} </Text> */}
                            
                           </View>       
                        }
                        }
                         }
                         />
                    </View>        
            </View>
            
        );
    }
    
    const styles = StyleSheet.create({
        mainView:{
          //marginTop:10,
          backgroundColor:'#ffffff',
          flex: 1,
          alignItems: 'center',        
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
            paddingTop: 35,
        },
        TextButton:{
            width:'80%',
            color:'gray',
           // fontStyle:'oblique'
        },
        Terms:{
            fontSize:9,
            color:'#0A284A',
            fontStyle:'oblique',
            textDecorationLine: 'underline',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:10
        },
        container: {
            marginTop: 15,
            padding: 1,
            width: '90%',
            height: '60%',
            //borderWidth: 1,
            borderRadius: 20,
            borderTopWidth:0,
            backgroundColor:'#ffffff',
            },
        includedContainer: {
            marginTop: 10,
            width: '90%',
            height: '25%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            //borderWidth: 1,
            borderRadius: 20,
            borderTopWidth:0,
            backgroundColor: "#ffffff",
            marginBottom: 10,
            
        },
        item: {
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 8,
            borderRadius: 20,
            height: 100,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            textAlign: 'justify',
            backgroundColor: '#92a8d1',
           
            },
        item_included: {
            padding: 10,
            marginVertical: 8,
            marginHorizontal: 8,
            borderRadius: 20,
            display:'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            textAlign: 'justify',
            width: 180,
            backgroundColor: '#f7cac9',
                },
        addIcon: {
            fontSize:26,
            marginLeft: 270,
            marginTop: 4,
            paddingTop: 10,
            paddingBottom: 30,
            fontWeight:'bold',
            color: '#f7cac9',
            
        },
        optIn: {
            marginLeft: 270,
            marginTop: 4,
            paddingTop: 10,
            paddingBottom: 30,
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            borderWidth: 2,
            backgroundColor: '#92a8d1',
            borderWidth: 10,

        },
        titleText: {
            fontSize:10,
            paddingTop: 20,
            paddingBottom:30,  
        },
        titleCodeIcludedStudyText: {
            fontSize:16,
            fontWeight:'bold',
            paddingTop: 10,
            marginTop: 3,  
        },
        studyStateText: {
            fontSize:15,
            //fontWeight:'bold',
            paddingTop: 10,
            color: '#0A284A',

        },
        studyStateIncludedText: {
            fontSize:15,
            //fontWeight:'bold',
            paddingTop: 20,
            color: '#0A284A',

        },
        linearGradient: {
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 20,
          },
        progressBarView: {
            margin: 5,
          },
        progressBarBase: {
            height: 8,
            flexDirection: "row",
            width: '100%',
            backgroundColor: 'white',
            //borderWidth: 1,
            borderRadius: 5,
          },
        progressBar: {
            height: 8,
            //flexDirection: "row",
            width: '100%',
            //color: '#92a8d1',
            padding: 1,
            backgroundColor: '#92a8d1',
            borderRadius: 5,
          },
        studyCatogery: {
            fontSize:20,
            fontWeight:'bold',
            padding: 3,
            color: '#1762B7',
            marginLeft: 5,
            marginBottom: 5,
            backgroundColor: '#0A284A',
            width: 100,
            height: 30,
            borderRadius: 10,
            display:'flex',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'baseline'
          },
        studyCatogerytext: {
            fontSize:14,
            fontWeight:'bold',
            color: '#ffffff',

          },
        circle: {
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            backgroundColor: "#8d949e",
            borderColor: "#4e5763",
            borderWidth: 0,
            //marginBottom:10,
          },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
        modalView: {
            margin: 20,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
          },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            fontSize: 30,
          },
        buttonOpen: {
            backgroundColor: "#F194FF",
          },
        buttonClose: {
            backgroundColor: "#2196F3",
          },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          },
        modalText: {
            marginBottom: 15,
            textAlign: "center"
          },
        readMoreHeading:{
            fontSize:15,
            fontWeight:'bold',
            paddingTop: 10,
            color: '#0A284A',

        },
        proposedStudyReadMoreText: {
            fontSize:10,
            paddingTop: 10,
            paddingBottom:5,
            textAlign: 'justify',
          },
        proposedStudyReadMoreTextAge: {
            fontSize:10,
            //backgroundColor: 'gray',
            padding: 10,
            borderWidth: 1,
            borderRadius:10,
          },
         //#a1c4fd 0%, #c2e9fb 100%
    
    })
    
    
    export default StudyScreen