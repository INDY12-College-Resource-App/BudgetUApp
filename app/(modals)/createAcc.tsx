import React from 'react'
import { useNavigation, Link, router, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import ImageView from '@/components/ImageView';
import { useState } from 'react'
import { Pressable, Button } from "react-native";

import { db, auth } from '@/app/index';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { RadioButton } from 'react-native-paper';

const togglePass = () => {

    const [password, setPassword] = useState(true);
    const [textState, setTextState] = useState("Show Password");

    const handlePasswordVisibility = () => {

        if (textState === "Show Password") {

            setTextState("Hide Password");

            setPassword(!password);

        } else if (textState === "Hide Password") {

            setTextState("Show Password");

            setPassword(!password);

        }

    };


    return {

        password,

        textState,

        handlePasswordVisibility

    }

}

export var userID: any;

const moveToHome = () => {

    router.replace("/(tabs)/Homepage")

}


export const Layout = () => {


    const handleSignUp = async () => {
        // These lines check the inputs of the user to make sure passwords match, emails match, and the password is long enough
        if (Spasswords !== Cpasswords) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        else if (Semail !== Cemail) {
            Alert.alert('Error', 'Email does not match.');
            return;
        }
        else if (Spasswords.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters.');
            return;
        }
        auth
        createUserWithEmailAndPassword(auth, Semail, Spasswords)


            .then((userCredential) => {

                const user = userCredential.user;


                setDoc(doc(db, "user", user.uid), {

                    name: name,
                    college: college,
                    email: user.email,
                    amount: amount,
                    frequency: frequency,
                    limit: limit,
                    UserUID: user.uid

                });



                userID = user.uid



            })
            .catch(error => alert(error.message))


        auth
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                moveToHome();
            }
        })
        return unsubscribe;
       
    }
    

    const [college, setCollege] = useState('');
    const { password, textState, handlePasswordVisibility } = togglePass();
    const [Spasswords, setPasswords] = useState('');
    const [Semail, setEmail] = useState('');
    const [name, setName] = useState('');
    const [Cpasswords, setCPasswords] = useState('')
    const [Cemail, setCEmail] = useState('')
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('');
    const [limit, setLimit] = useState('');


    return (

        <SafeAreaView>
            <ScrollView>



                <TextInput
                    style={styles.textBox}
                    placeholder="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholderTextColor="#000"
                />

                <TextInput
                    style={styles.textBox}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={Semail}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.textBox}
                    placeholder="Confirm Email"
                    placeholderTextColor="#000"
                    value={Cemail}
                    onChangeText={text => setCEmail(text)}
                />
                

                <TextInput
                    style={styles.textBox}
                    placeholder="College"
                    value={college}
                    onChangeText={text => setCollege(text)}
                    placeholderTextColor="#000"
                />


                <TextInput
                    style={styles.textBox}          //Will make these private and censored

                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={password}
                    value={Spasswords}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPasswords(text)}

                />
                <View style={styles.passContainer}>
                    <Pressable onPress={handlePasswordVisibility}>

                        <Text style={styles.defaultText2}>{textState}</Text>

                    </Pressable>

                </View>

                <TextInput
                    style={styles.textBox}          //Will make these private and censored
                    placeholder="Confirm Password"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    value={Cpasswords}
                    onChangeText={text => setCPasswords(text)}

                />


                <View>
                    <Text style={styles.defaultText}> Amount Made Per Pay Period :  </Text>


                    <TextInput
                        style={styles.textBox}          //Will make these private and censored
                        placeholder="Dollar Amount"
                        placeholderTextColor="#000"
                        value={amount}
                        onChangeText={text => setAmount(text)}

                    />
                </View>


                <View>

                    <View>

                        <Text style={{ paddingLeft: 10 }}>Select Income Frequency</Text>


                        <RadioButton.Group
                            onValueChange={(value) => setFrequency(value)}
                            value={frequency}
                        >



                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="Weekly" color="black" />
                                <Text>Weekly</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="Bi-Weekly" color="black" />
                                <Text>Bi-Weekly</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="Semi-Monthly" color="black" />
                                <Text>Semi-Monthly</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="Monthly" color="black" />
                                <Text>Monthly</Text>
                            </View>


                        </RadioButton.Group>


                    </View>


                    <View>

                        <Text style={{ paddingLeft: 10 }}>Would You Like To Set Budget Limits? </Text>


                        <RadioButton.Group
                            onValueChange={(value) => setLimit(value)}
                            value={limit}
                        >



                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="yes" color="black" />
                                <Text>Yes</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                                <RadioButton value="no" color="black" />
                                <Text>No</Text>
                            </View>




                        </RadioButton.Group>


                    </View>



                </View>






                <View style={styles.buttonContainer}>
                    <Button color="#000"
                        title="Create Account"

                        onPress={() => { handleSignUp(); }}


                    />

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    imageContainer: {
        flex: 1,
        paddingTop: 40,
    },

    welcomeText: {
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Arial',
        fontSize: 26,
        fontWeight: 'bold'
    },
    defaultText: {
        textAlign: 'center',
        paddingBottom: 10,
        fontWeight: 'bold'

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
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        paddingLeft: 10,
    },
    button: {
        color: "#000"
    },
    passContainer: {

        paddingLeft: 20,

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
    defaultText2: {


        fontWeight: 'bold'
    }

});


export default Layout
