import { Link, router } from "expo-router";
import { Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageView from '@/components/ImageView';
const introImage = require('@/assets/intro.png');
import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";



export const firebaseConfig = {

    apiKey: "AIzaSyDi1m5K3iJY3GcNBE4_6qn_34TP7BcuWbs",

    authDomain: "budgetu-d5c91.firebaseapp.com",

    projectId: "budgetu-d5c91",

    storageBucket: "budgetu-d5c91.appspot.com",

    messagingSenderId: "868850913789",

    appId: "1:868850913789:web:208e1c85a337ee88e58994",

    measurementId: "G-P0N3BDB0RF"

};


const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);




const startupPage = () => {

  

    
    useEffect(() => {
       auth
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user ) {
                router.replace("/(tabs)/Homepage")
            }
        })
        return unsubscribe;
    }, [])



    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <ImageView introImageSource={introImage} />
            </View>


            <View style={styles.container}>
                <Text style={styles.welcomeText}>
                    <Text>Budgeting for students, simplified.</Text>

                </Text>


                <Text style={styles.container}>
                    <Text>One app for all your finance and budget needs... </Text>

                </Text>
            </View>

            <Link push href="/(modals)/budgetIntro" asChild>
                <Pressable>
                    <View style={styles.buttonContainer} >

                        <Text>Create An Account</Text>

                    </View>
                </Pressable>
            </Link>


            <View style={styles.defaultText}>


                <Link push href={'/(modals)/login'}> Already Have An Account? </Link>

            </View>



            <StatusBar style="auto" />
        </View>
    );
};

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
      
        fontSize: 26,
        fontWeight: 'bold'
    },
    defaultText: {
        textAlign: 'center',
        paddingBottom: 50

    },
    pressable: {
        alignItems: 'center',
        padding: 7,
        borderRadius: 8
    },
    buttonContainer: {
        backgroundColor: '#3383CD',
        width: 320,
        height: 68,
        borderRadius: 15,
        margin: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },


});

export default startupPage