

import { useNavigation, Link, router, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import ImageView from '@/components/ImageView';
import { RadioButton } from 'react-native-paper';
import React, { useState, useMemo } from 'react';
import { Pressable, Button } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import RadioGroup from 'react-native-radio-buttons-group';
import { db, auth } from '@/app/index';
import { Layout, userID } from '@/app/(modals)/createAcc';

import { doc, setDoc, updateDoc, addDoc, collection, where, serverTimestamp } from "firebase/firestore";








const expense = () => {



    const moveToBudget = () => {

        router.replace("/(tabs)/Budgeting")

    }


    // Expense Type > user ID (doc) > expenses > DocID (randomly generated) > expense data
    // change console rules after 30 days?

    const submitData = async () => { // adds new expense under foodexpense




       await  addDoc(collection(db, "expenses"), {
           
           exType: exType,
           exAmount: exAmount,
           desc: desc,
           expenseOwner: auth.currentUser?.uid,
           createdAt: serverTimestamp()

        });
        
      

    }


    const [exAmount, setexAmount] = useState('');
    const [exType, setexType] = useState('');
    const [desc, setdesc] = useState('');

    return (
        <View>
            <KeyboardAvoidingView behavior="padding">

                
                <View>

                    <View>

                        <Text style={{ paddingLeft: 10 }}>Select Expense Type: </Text>


                        <RadioButton.Group
                            onValueChange={(value) => setexType(value)}
                            value={exType}
                        >



                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="foodExpense" color="black" />
                                <Text>Food</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="transportationExpense" color="black" />
                                <Text>Transportation</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="tuitionExpense" color="black" />
                                <Text>Tuition</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="housingExpense" color="black" />
                                <Text>Housing</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="otherExpense" color="black" />
                                <Text>Other</Text>
                            </View>

                        </RadioButton.Group>


                    </View>

                    <Text style={styles.defaultText}> Enter Expense Total:  </Text>


                    <TextInput
                        style={styles.textBox}         
                        placeholder="Dollar Amount"
                        placeholderTextColor="#000"
                        value={exAmount}
                        onChangeText={text => setexAmount(text)}

                    />


                    <Text style={styles.defaultText}> Enter Expense Description:  </Text>


                    <TextInput
                        style={styles.textBox}          
                        placeholder="Quick Description"
                        placeholderTextColor="#000"
                        value={desc}
                        onChangeText={text => setdesc(text)}

                    />

                    


                </View>


            </KeyboardAvoidingView>



            <View style={styles.buttonContainer}>
                <Button color="#000"
                    title="Submit"

                    onPress={() => { submitData(); moveToBudget(); }}

                />

            </View>




        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    defaultText: {
        paddingTop: 30

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,

    },
    textBox: {
        height: 45,
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10

    },

    buttonContainer: {
        backgroundColor: '#3383CD',

        width: 320,
        height: 68,
        borderRadius: 15,
        margin: 50,
        marginHorizontal: 35,
        marginBottom: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        paddingLeft: 10,



    },
    button: {
        color: "#000"
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },

});


export default expense