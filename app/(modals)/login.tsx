import React, { useEffect } from 'react'
import { useNavigation, Link, router, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import ImageView from '@/components/ImageView';
import { useState } from 'react'
import { Pressable, Button } from "react-native";

import { Entypo } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '@/app/index';


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



const loginPage = () => {




    const { password, textState, handlePasswordVisibility } = togglePass();
    const [passwords, setPasswords] = useState('');
    const [email, setEmail] = useState('');


    const handleLogin = () => {
        auth
        signInWithEmailAndPassword(auth, email, passwords)
            .then((userCredential) => {

                const user = userCredential.user;

                if (user) {                 // waits for user authentication to firebase to finish before navgiating

                    router.replace("/(tabs)/Homepage")
                }

            })
            .catch(error => alert(error.message))


    }


    return (

        <SafeAreaView>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    style={styles.textBox}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={email}
                    onChangeText={text => setEmail(text)}

                />


                <TextInput
                    style={styles.textBox}          //Will make these private and censored
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry={password}
                    value={passwords}
                    enablesReturnKeyAutomatically
                    onChangeText={text => setPasswords(text)}

                />
                <View style={styles.passContainer}>
                    <Pressable onPress={handlePasswordVisibility}>

                        <Text>{textState}</Text>

                    </Pressable>

                </View>

            </KeyboardAvoidingView>


            <View style={styles.buttonContainer}>
                <Button color="#000"
                    title="Log In"
                    onPress={() => { handleLogin() }}
                />

            </View>


            <View style={styles.defaultText}>


                <Link push href={'/(modals)/createAcc'}> Don't have an account? </Link>

            </View>



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#F5EEDC',

        alignItems: 'center',

        justifyContent: 'center',

        paddingHorizontal: 12
    },

    imageContainer: {
        flex: 1,
        paddingTop: 40,
    },

    welcomeText: {
        textAlign: 'center',
        flex: 1,
        
        fontSize: 26,
        fontWeight: 'bold'
    },
    defaultText: {
        textAlign: 'center',
        paddingBottom: 50

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

    }

});


export default loginPage