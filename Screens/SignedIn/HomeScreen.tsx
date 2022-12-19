import React, { useEffect, useState } from "react";
import { Platform, Text,View,StyleSheet,Image,TextInput, TouchableOpacity,ScrollView, Modal,FlatList, Button } from "react-native";
import { authentication } from "../../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TabActions } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { Path } from "react-native-svg";
//import HealthKit from 'react-native-healthkit';
import AppleHealthKit, { HealthValue, HealthKitPermissions,HealthClinicalRecord,ClinicalRecordType,HeartbeatSeriesSampleValue,HealthInputOptions } from 'react-native-health';





const HomeScreen = ({navigation})=> {

    // signin state
    const [Heartrate,setHeartRate] = useState(0);
    const [StepCount,setStepCount] = useState(0);
    const [Height,setHeight] = useState("0");
    const [Weight,setWeight] = useState("0");
    const [AllergyRecord, setAllergyRecord] = useState([]);
    const [ImmunizationRecord, setImmunizationRecord] = useState([]);
    const [MedicationRecord, setMedicationRecord] = useState([]);
    const [ProcedureRecord, setProcedureRecord] = useState([]);
    const [VitalSignRecord, setVitalSignRecord] = useState([]);
    const [ConditionRecord, setConditionRecord] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [clincialDataModalVisible, setclincialDataModalVisible] = useState(false);
    const [clinicalDataModalHeader,setclinicalDataModalHeader] = useState('');
    const [clinicalDataFlatlistData,setclinicalDataFlatlistData] = useState([]);

   
    let clinicalDataTypes = ["AllergyRecord","ImmunizationRecord","MedicationRecord","ProcedureRecord","VitalSignRecord","ConditionRecord"]
    
    let clinicalRecordsJson = [{"Header": "Allergy Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/allergy.imageset/icon_allergies.png'),
                                },
                                {"Header": "Immunization Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/immunizations.imageset/icon_immunizations.png'),
                                },
                                {"Header": "Medication Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/medications.imageset/icon_medications.png'),
                                },
                                {"Header": "Procedure Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/procedures.imageset/icon_procedures.png'),
                                },
                                {"Header": "VitalSign Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/vitals.imageset/icon_vitals.png'),
                                },
                                {"Header": "Condition Record",
                                "Path": require('../../Assets/Images/ClinicalDataImages/conditions.imageset/icon_conditions.png'),
                                },
  ]
    

    if (Platform.OS === 'ios'){

        /* Permission options */
        const permissions = {
            permissions: {
              read: [
                AppleHealthKit.Constants.Permissions.HeartRate,
                AppleHealthKit.Constants.Permissions.BiologicalSex,
                AppleHealthKit.Constants.Permissions.StepCount,
                AppleHealthKit.Constants.Permissions.Steps,
                AppleHealthKit.Constants.Permissions.ActivitySummary,
                AppleHealthKit.Constants.Permissions.DistanceSwimming,
                AppleHealthKit.Constants.Permissions.Weight,
                AppleHealthKit.Constants.Permissions.Height,
                AppleHealthKit.Constants.Permissions.HeartRateVariability,
                AppleHealthKit.Constants.Permissions.HeartbeatSeries,
                AppleHealthKit.Constants.Permissions.BodyTemperature,

                // Clincial Types
                AppleHealthKit.Constants.Permissions.AllergyRecord,
                AppleHealthKit.Constants.Permissions.ImmunizationRecord,
                AppleHealthKit.Constants.Permissions.MedicationRecord,
                AppleHealthKit.Constants.Permissions.ProcedureRecord,
                AppleHealthKit.Constants.Permissions.VitalSignRecord,
                AppleHealthKit.Constants.Permissions.ConditionRecord,
                

                
              ],
              write: [
                AppleHealthKit.Constants.Permissions.Steps,
              ],
            }
          } as HealthKitPermissions
          useEffect(() => {

            let options = {
              permissions: {
                read: ['Height', 'Weight', 'StepCount', 'DateOfBirth', 'BodyMassIndex'],
                write: ['Weight', 'StepCount', 'BodyMassIndex'],
              },
            }
          
            collectClinicalData()
          },[])

          

          function collectClinicalData(){

            for (const clinicaltype in clinicalDataTypes) {

              let options = {
                startDate: new Date(2021, 0, 0).toISOString(),
                endDate: new Date().toISOString(), // optional; default now
                ascending: false, // optional; default false
                limit: 10, // optional; default no limit
                type: clinicalDataTypes[clinicaltype], // one of: ['AllergyRecord', 'ConditionRecord', 'CoverageRecord', 'ImmunizationRecord', 'LabResultRecord', 'MedicationRecord', 'ProcedureRecord']
              }
  
              AppleHealthKit.getClinicalRecords(options, (err: Object, results: HealthClinicalRecord[]) => {
                if (err) {
                  return
                }

              if (clinicalDataTypes[clinicaltype]==="AllergyRecord"){
                setAllergyRecord(results);
                // console.log(AllergyRecord)
              }
              else if (clinicalDataTypes[clinicaltype]==="ImmunizationRecord"){
                setImmunizationRecord(results);
                // console.log(ImmunizationRecord)
              }

              else if (clinicalDataTypes[clinicaltype]==="MedicationRecord"){

                setMedicationRecord(results);
                // console.log(MedicationRecord)

              }

              else if (clinicalDataTypes[clinicaltype]==="ProcedureRecord"){
                setProcedureRecord(results);
                // console.log(ProcedureRecord)
              }

              else if (clinicalDataTypes[clinicaltype]==="VitalSignRecord"){
                setVitalSignRecord(results);
                console.log(VitalSignRecord)
              }
              else if (clinicalDataTypes[clinicaltype]==="ConditionRecord"){
                setConditionRecord(results);
                // console.log(ConditionRecord)
              }

 
              });
              
              

            }
            
          }
          
          
         
        
          const HeartRateoptions = {
            startDate: new Date(2020, 1, 1).toISOString(),
          }

        AppleHealthKit.getHeartRateSamples(HeartRateoptions,
                    (callbackError: string, results: HealthValue[]) => {
                      /* Samples are now collected from HealthKit */
                      setHeartRate(results[0].value)
                      //console.log(Heartrate)
                
                    })

        let stepCountOptions = {
                        date: new Date().toISOString(), // optional; default now
                        includeManuallyAdded: true // optional: default true
                    };

        AppleHealthKit.getStepCount(
                        (stepCountOptions),
                        (err: Object, results: HealthValue) => {
                          if (err) {
                            return
                          }
                         // console.log(results.value)
                          setStepCount(results.value)
                        },
                      )

        
        let weightOptions = {
                        //unit: 'kg', // optional; default 'pound'
                        startDate: new Date(2021, 0, 0).toISOString(), // required
                        endDate: new Date().toISOString(), // optional; default now
                        ascending: false, // optional; default false
                        limit: 10, // optional; default no limit
                      }
        
        AppleHealthKit.getWeightSamples(weightOptions,
                        (err: Object, results: Array<HealthValue>) => {
                          if (err) {
                            return
                          }
                         // console.log(results[0].value)
                          let recentWeight = results[0].value.toPrecision(4)
                          setWeight(recentWeight)
                        },
                      )
              

        AppleHealthKit.getLatestHeight(null, (err: string, results: HealthValue) => {
                        if (err) {
                          console.log('error getting latest height: ', err)
                          return
                        }
                        let recentHeight = results.value.toPrecision(4)
                        //console.log
                        if (Heartrate === 68){

                          AppleHealthKit.initHealthKit(permissions, (error: string) => {
                          })
                        }
                        setHeight(recentHeight)
                       // console.log(results.value)
                      })

        

        let Heartbeatseriesoptions = {
                        startDate: new Date(2021, 0, 0).toISOString(), // required
                        endDate: new Date().toISOString(), // optional; default now
                        ascending: false, // optional; default false
                        limit: 10, // optional; default no limit
                      }

        AppleHealthKit.getHeartbeatSeriesSamples(
          Heartbeatseriesoptions,
                        (err: Object, results: HeartbeatSeriesSampleValue[]) => {
                          if (err) {
                            return
                          }
                         // console.log("HeartBeat:");
                         // console.log(results)
                        },
                      )

        let stepCountSampleOptions = {
                        startDate: (new Date(2016,1,1)).toISOString() // required
                        //endDate:   (new Date()).toISOString() // optional; default now
                    }
        AppleHealthKit.getDailyStepCountSamples((stepCountSampleOptions),(err: Object, results: Array<Object>) => {
                        if (err) {
                          return
                        }
                       // console.log(results)
                      },
                    )

    }
    

   


     
        
    
        function navigate(){
            navigation.navigate('SignUp')
            
        }
    
        function clinicalDataModal(header: string){
          let dataType = header.split(' ').join('')
          setclinicalDataModalHeader(dataType)

          if (dataType==="AllergyRecord"){
            setclinicalDataFlatlistData(AllergyRecord)
            
          }
          else if (dataType==="ImmunizationRecord"){
            setclinicalDataFlatlistData(ImmunizationRecord)
          }
          else if (dataType==="MedicationRecord"){
            setclinicalDataFlatlistData(MedicationRecord)
          }
          else if (dataType==="ProcedureRecord") {

            setclinicalDataFlatlistData(ProcedureRecord)
          }

          else if (dataType==="VitalSignRecord"){
            setclinicalDataFlatlistData(VitalSignRecord)
          }

          else if (dataType==="ConditionRecord"){
            setclinicalDataFlatlistData(ConditionRecord)
          }
          
          
          setclincialDataModalVisible(true)
   
         }
         

        return(
            <View style={styles.mainContainer}>
              <Text style={{fontSize:16,
                  fontWeight:'bold',
                  color: '#0A284A',
                  textAlign: 'center',padding: 10}}>
                  Hey, Weclome Back!
                </Text>
                <Text style={styles.instructionText} onPress={() => setModalVisible(!modalVisible)}>
                  For better experience please follow the instructions here...
                </Text>
              <View style={styles.heartRateCointainer}>
                
               
                <Text style={styles.heartRateText}>
                  {Heartrate}
                </Text>
                <View style={styles.bpmLabel}>
                <Text style={styles.BPMText}>
                  BPM
                </Text>

                </View>
               
                <Image style={styles.heartRateImage} 
         
                 source={require('../../Assets/Images/health_sign_icon.png')}/>   
            
                </View>
              <View style={styles.healthDataAndClinicalDataContainer}>
                

              <View style={styles.healthDataCointainer}>

              {/* FaltList for health data here */}
                <View style={styles.healthDataItems}>
                <Text style={styles.BPMText}>
                  {Height}
                </Text>
              </View>
              <View style={styles.healthDataItems}>

              <Text style={styles.BPMText}>
                  {Weight}
                </Text>
                  
              </View>
              <View style={styles.healthDataItems}>

              <Text style={styles.BPMText}>
                  {Height}
                </Text>
                  
              </View>
              <View style={styles.healthDataItems}>
                

              <Text style={styles.BPMText}>
                  {Height}
                </Text>
                  
              </View>
        
            </View>

            <View style={styles.clinicalRecordsContainer}>
            {/* FaltList for Clincial Data Here */}
                {/* <ScrollView> */}

            <FlatList horizontal data={clinicalRecordsJson} renderItem={({item,index}) => {
                              
                              //console.log("Joined Header", {header})
                                return (

                                <View style={styles.clinicalRecordItems}> 
                                
                                <Text style={
                                  {fontSize:14,
                                    fontWeight:'bold',
                                    color: '#0A284A',
                                    textAlign: 'center',padding: 10}
                                } onPress={() => clinicalDataModal(item.Header)}> 
                                      {item.Header}
                                </Text>

                                <Image  style={{width:'35%',
                                                height: '35%',
                                                resizeMode:'contain'} }
         
                                          source={item.Path}/>  

                                {/* Clinical Data Modal */}

            <View style={styles.centeredView}>
              <Modal
              animationType="slide"
              transparent={true}
              onRequestClose={() => setclincialDataModalVisible(false)}
              visible={clincialDataModalVisible}
                >
                  
                 
                  <View style={styles.modalView}>

                  <Text>
                    {clinicalDataModalHeader}
                  </Text>
                  
                    
                  <FlatList data={clinicalDataFlatlistData} renderItem={({item,index}) => {
                                    
                                    let startDate = item.startDate.split("T");
                                    startDate = startDate[0];
                                    let endDate = item.endDate.split("T");
                                    endDate = endDate[0];
                                    let value = item.valueQuantity
                                    console.log({value})
                                return (
                                  <View>
                                    <Text style={{fontSize:14,
                                    fontWeight:'bold',
                                    color: '#0A284A',
                                    textAlign: 'center'}}>
                                      {item.displayName}
                                    </Text>
                                    <Text>
                                      {startDate}
                                    </Text>
                                    <Text>
                                      {endDate}
                                    </Text>
                                    <Text>
                                      {item.valueQuantity}
                                    </Text>

                                    </View>

                                );
                  }}/>
                  
                                  

                   

                <Ionicons name='close-circle' style={styles.button} onPress={() => setclincialDataModalVisible(!clincialDataModalVisible)}/> 
  
          {/* <Button onPress={() => setclincialDataModalVisible(false)} title="Close" /> */}
        </View>
              
              </Modal>
              </View>  
            {/* clinical Data Modal */}

                                </View>

                                );
                            }}/>
          </View>
              </View>
              <View style={styles.centeredView}>
              <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
                >
             
              
             
            
              <View style={styles.modalView}>
                  <Image  style={styles.instructionImage}
         
         source={require('../../Assets/Images/allowAccessInstructions/allow_access_instruction_1.png')}/>  

                <Ionicons name='close-circle' style={styles.button} onPress={() => setModalVisible(!modalVisible)}/> 
                </View>
              </Modal>
              </View>  
              </View>
            
            


                
        
            
        );
    }
    


    const styles = StyleSheet.create({
      mainContainer: {
        display: 'flex',
        backgroundColor: '#f7cac9',
        //flex: 1,
        //alignContent: 'center',
        flexBasis: 'auto',
        height: '100%',
        width: '100%',
        position: 'relative',
        //paddingBottom: 100,
        
    },
    welcomeTextView:{

      fontSize:16,
      fontWeight:'bold',
      color: '#ffffff',


    },
    
  welcomeTextLabelBackGround : {

      backgroundColor: '#0A284A',
      width: '20%',
      height: 30,
      marginLeft: 5,
      padding: 5,
      borderRadius: 5,
      textAlign: 'center',
      marginBottom: 10,


  },

  instructionText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#000000',
    textDecorationLine: 'underline',
  

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
  

  heartRateCointainer: {

    display: 'flex',
    flexDirection: 'row',
    //alignContent: 'space-between',
    height: '35%',
    backgroundColor: '#f7cac9',
    padding: 40,
    paddingEnd: 100,
    paddingRight: 30,

   
    //justifyContent: 'center',
    


  },

  heartRateImage: {
    width:'50%',
    height: '50%',
    resizeMode:'contain', 
  },

  instructionImage: {
    width:'90%',
    height: '90%',
    resizeMode:'contain', 
  },

  heartRateText: {

    fontSize: 120,
    fontWeight: 'bold',
    //margin: 40,
    color: '#0A284A'


  },

  BPMText:{

    fontSize:16,
    fontWeight:'bold',
    color: '#ffffff',
    textAlign: 'center',
    


  },

  bpmLabel:{

    backgroundColor: '#9F2B68',
    width: 70,
    height: 40,
    borderRadius: 5,
    //marginBottom: 10,
    padding: 10,
    marginTop: 100,

  },


  healthDataAndClinicalDataContainer:{

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '65%',
    shadowColor: '#00000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    backgroundColor:'#FFFFFF',
    //opacity: 0.6,
  },
  healthDataCointainer: {

    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    flexWrap: 'wrap',
    margin: 7,

  },

  healthDataItems: {
    //backgroundColor: '#92a8d1',
    backgroundColor: '#0A284A',
    borderRadius: 10,
    margin: 7,
    //marginLeft: 10,
    height: 100,
    width: 170,

  },

  clinicalRecordsContainer: {
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000000',
    backgroundColor: '#ffffff',
    
  },
  clinicalRecordItems: {

    shadowColor: '#000000',
    backgroundColor: '#f7cac9',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
    height: 100,
    width: 120,

  },
  button: {
    borderRadius: 20,
    //padding: 10,
    elevation: 2,
    fontSize: 30,
  },
  pagerView: {
    flex: 1,
  },

        
    })
    
    
    export default HomeScreen