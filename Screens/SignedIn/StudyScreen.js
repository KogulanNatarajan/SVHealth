import React, { useState,useEffect } from "react";
import { Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView, ActivityIndicator,FlatList,Alert, Modal,Pressable,RefreshControl } from "react-native";
import { authentication } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView,useSafeAreaInsets,SafeAreaProvider } from "react-native-safe-area-context";
import * as Progress from 'react-native-progress';
import { FlatGrid,SimpleGrid } from 'react-native-super-grid';
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
    const [refreshing, setRefreshing] = useState(false);
    const insets = useSafeAreaInsets();
    
    //Variables for study Details:

    let [studyTitle,setStudyTitle] = useState('N/A');


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
        
        fetch("http://dataseekerportal.dynns.com:5000/explodedDataComplex?object_id=630c9a2f41330abc79bdccaf&params_to_explode=study_ref|study_id|study_details", {
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
            setRefreshing(false);
            
        }
        if(error) {
            return <Text> {error}</Text>
        }
        //console.log("Study Details")
        //console.log({studyResponse})
        
        
    }
    
        return(
            
            <View> 
                
                {/* Load Study List for the User */}
                <Text >
                       {loadUserStudyDetails()}
                       {loadStudyList()}
                    </Text>
                { /* Generating View for Studies*/}
                {/* Main View */}
                <View style={styles.mainContainer}>
                    {/* New Studies Container */}
                    <View style={styles.newStudiesContainer}>
                       
                       {/* New Studies Container Title */}
                        <View style={styles.newStudyContainerLabelBackGround}>
                            <Text style={styles.newStudyContainerLabel}>
                                New
                            </Text>
                        </View>

                        {/* New Studies Container */}

                            {/* FlatList */}

                            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadStudyList()}/>} data={studyResponse} renderItem={({item,index}) => {
                            
                            let studyTitle = item.study_details.title.split("- ")
                            let studyTitleText = studyTitle[1].trimStart()
                            let gender = item.study_details.gender;
                            let startDate = item.study_details.start_date.split("T");
                            startDate = startDate[0];
                            let endDate = item.study_details.end_date.split("T");
                            endDate = endDate[0];

                            if(item.study_state==='POTENTIAL'){

                                return (

                                
                            <View style={styles.newStudiesItem}>      
                                <Text style={styles.newStudyNCTID}> 
                                        {item.study_details.nct_id}
                                </Text>
                                <Text style={styles.newStudyDescription}>
                                    {studyTitleText}
                                </Text>
                                <Pressable style={styles.alignReadmoreandOptin}>

                                <Text style={styles.readMoreButtonNewStudyItem} onPress={() => readMoreModal()} >
                                    Read More
                                </Text>
                                <Ionicons name='person-add' style={styles.OptInButtonNewStudyItem }/>

                                </Pressable>

                                {/* Modal for Read More -- begin */}


                                
                                {/* </View> */}
                            {/* Model View */}
            <View style={styles.centeredView}>
            
            <Modal
            //nativeID="readMoreModal"
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


                                    
                
                                  <Text style={styles.readMoreHeading}> Summary </Text>
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.brief_summary}{'\n'} </Text> 
                                  <Text style={styles.readMoreHeading}> Measures </Text>
                                  <Text  style={styles.proposedStudyReadMoreText}> {item.study_details.measure} </Text>
                                  
                                  
      
                                  <Text  style={styles.proposedStudyReadMoreText}>{'Gender:'} {item.study_details.gender}</Text>
      
                                  <Text  style={styles.proposedStudyReadMoreTextAge}> {'Age:'}{item.study_details.minimum_age} {'-'}{item.study_details.maximum_age}</Text>

                                  <Text style={styles.readMoreHeading} ><Ionicons name='person-remove' style={styles.button} onPress={()=>{handleDelete(index)}}/> {'\t'}{'\t'}{'\t'}
                                  <Ionicons name='person-add' style={styles.button} onPress={()=>{handleInclude(index)}}/> </Text>
                                  
                        <Ionicons name='close-circle' style={styles.button} onPress={() => setModalVisible(!modalVisible)}/> 

                                            
   
                </View>
                </ScrollView>
              </View>
      
            
              
            </Modal>
          </View>


                                {/* modal readmore .... */}
                                
                                
                               
                                </View>
    
                                );


                            }

                            
                            
                            }}/>


                            {/* End of New Study Flat List */}


                        
                    </View>

                    {/* OnGoing Studies Container */}
                    <View style={styles.onGoingStudiesContainer}>
                        <View style={styles.onGoingStudyContainerLabelBackGround}>
                            <Text style={styles.onGoingStudiesContainerLabel}>
                                Ongoing
                            </Text>
                        </View>

                        {/* Ongoing Studies Container */}
                       
                            {/* FlatList */}

                            <FlatList horizontal data={studyResponse} renderItem={({item}) => {
                            
                            let studyTitle = item.study_details.title.split("- ")
                            let studyTitleText = studyTitle[1].trimStart()

                            if(item.study_state==='INCLUDED'){

                                return (
                                    
                               
                                    <View style={styles.onGoingStudiesItem}> 
                                <Text style={styles.alignNCTandProgressBarInOngoingStuides}>
                                <Text style={styles.onGoingStudyNCTID}> 
                                        {item.study_details.nct_id}
                                </Text>

                                <Progress.Pie
                                size={20}
                                showsText
                                progress={45 / 100}
                                unfilledColor="#f7cac9"
                                // borderColor="#0A284A"
                                color= "#0A284A"
                                fill="#0A284A"
                                //width={100}
                                // strokeCap="round"

                                style={styles.progressButtonOnGoingStudyItem}
                                
                                />


                                </Text>
                                
                                <Text style={styles.newStudyDescription}>
                                    {studyTitleText}
                                    
                                </Text>
                                <Pressable style={styles.onGoingStudyParticipateButton}>
                                <Text style={styles.surveyButtonOnGoingStudyItem}>
                                    Participate
                                </Text>
                                </Pressable>

                                </View>
                              
                            
                                );


                            }

                            
                            
                            }}/>
                           


                            {/* End of Ongoing Study Flat List */}


                    </View>
    
                </View>
            </View>
            
        );
    }
    
    const styles = StyleSheet.create({

        mainContainer: {
            display: 'flex',
            //flex: 1,
            //alignContent: 'center',
            flexBasis: 'auto',
            height: '100%',
            width: '100%',
            position: 'relative',
            paddingBottom: 100,
            
        },

        newStudiesContainer: {

            margin: 20,
            maxHeight:"55%",
            minHeight:"10%",
        },
        newStudyContainerLabel : {

            fontSize:16,
            fontWeight:'bold',
            color: '#ffffff',
            //marginLeft: 5,


        },

        newStudyContainerLabelBackGround : {

            backgroundColor: '#0A284A',
            width: '20%',
            height: 30,
            marginLeft: 5,
            padding: 5,
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 10,


        },

        newStudiesItem: {

            backgroundColor: '#92a8d1',
            borderRadius: 12,
            margin: 5,
            padding: 7,


        },

        newStudyTitle: {
            textTransform: 'capitalize',
            marginBottom: 3,
            textAlign: 'justify',

        },

        newStudyNCTID: {

            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',

        },
        

        newStudyDescription: {

            textTransform: 'capitalize',
            padding: 5,


        },


        readMoreButtonNewStudyItem: {

            textDecorationLine: 'underline',
            textAlign: 'center',
            marginLeft: 50,

            

        },

        OptInButtonNewStudyItem: {
            
            fontSize:32,
            fontWeight:'bold',
            color: '#f7cac9',
            textAlign: 'right',

        },

        alignReadmoreandOptin: {
            
            display: 'flex',
            flexDirection: 'row',
            flexBasis: 'auto',
            justifyContent: 'space-between',
            marginLeft: 70,
            alignContent: 'flex-end',
            alignItems: 'baseline',
       
            

        },

        onGoingStudiesContainer: {

            margin: 7,
            flexDirection: 'column',
            minHeight: '45%',
            padding: 10,
            //justifyContent: '',
            
            
        },

        onGoingStudiesContainerLabel : {

            fontSize:16,
            fontWeight:'bold',
            color: '#ffffff',
            //marginLeft: 10,

        },

        onGoingStudyContainerLabelBackGround : {

            backgroundColor: '#0A284A',
            width: '30%',
            height: 30,
            marginLeft: 5,
            padding: 5,
            borderRadius: 5,
            textAlign: 'center',
            marginBottom: 10,


        },

        onGoingStudiesItem: {

            width: 180,
            textAlign: 'justify',
            backgroundColor: '#f7cac9',
            borderRadius: 12,
            margin: 5,
            padding: 10,
            paddingRight: 10,
            marginRight: 10,
            display: 'flex',
            flexDirection: 'column',
            flexBasis: 'auto',
            justifyContent: 'space-between',
            //alignContent: 'center',
            alignItems: 'center',
            maxHeight: 200,
            minHeight: 150,

        },

        onGoingStudyTitle: {

            textTransform: 'capitalize',
            marginBottom: 10,

        },
        onGoingStudyNCTID: {

            textTransform: 'uppercase',
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',

        },

        onGOingStudyDescription: {

        },


        progressButtonOnGoingStudyItem: {
            textAlign: 'right',
            shadowColor: 'grey',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 1,
            paddingLeft: 10,

        },
        alignNCTandProgressBarInOngoingStuides: {

            display: 'flex',
            flexDirection: 'row',
            flexBasis: 'auto',
            justifyContent: 'space-between',
            //marginLeft: 70,
            alignContent: 'flex-end',
            alignItems: 'baseline',

        },

        onGoingStudyParticipateButton: {
            backgroundColor: '#0A284A',
            borderRadius: 7,
            width: '60%',
            marginBottom: 5,



        },

        surveyButtonOnGoingStudyItem: {
            //textDecorationColor: 'white',
            color: '#ffffff',
            padding: 6,
            textAlign: 'center',
            


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
        

        




        
    
    })
    
    
    export default StudyScreen