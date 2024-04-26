
import { Link, router } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from '@/app/index';
import { Layout, userID } from '@/app/(modals)/createAcc';
import { collection, query, where, Firestore } from "firebase/firestore";
import { doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useEffect, useState, useLayoutEffect } from 'react'




// add reset budget functionality + profile editing + settings?
const Profile = () => {


    const [college, setcollege] = useState("");
    const [frequency, setfrequency] = useState("");
    const [haslimit, sethaslimit] = useState("");
    const [name, setname] = useState("");

    const profilecol = collection(db, "user");
    const profileq = query(profilecol, where("UserUID", "==", auth.currentUser?.uid))


    onSnapshot(profileq, (snapshot) => { 
        var col = "";
        var freq = "";
        var limit = "";
        var n = "";
        snapshot.docs.forEach((doc) => {

            col = doc.data().college
            freq = doc.data().frequency
            limit = doc.data().limit
            n = doc.data().name
        })
        setname(n)
        setcollege(col)
        setfrequency(freq)
        sethaslimit(limit)
        

    })

    const settings = () => {

        router.push("/(tabs)/Homepage") // placeholder : will have proper settings function

    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                router.replace('/(modals)/login');
            })
            .catch(error => alert(error.message))
    }
    return (
       
        
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Profile Information</Text>

            

            <View style={styles.container2}> 
                <Text>  Name: {name}</Text>
                <Text>  College:{college} </Text>
                <Text>  Email: {auth.currentUser?.email } </Text>
                <Text>  Income Schedule: {frequency} </Text>
                <Text>  Limits: {haslimit} </Text>
                <Text>  UID: {auth.currentUser?.uid} </Text>
            </View>



            <View style={styles.container3}>

             

                <TouchableOpacity onPress={handleSignOut} style={styles.buttonContainer}>
                    <Text style={styles.defaultText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

          

          

            </View>
           
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
        
    },
    container2: {
       
        backgroundColor: '#fff',
        padding: 10,
        textalign: '',

    },
    container3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    } ,
    imageContainer: {
        flex: 1,
        paddingTop: 40,
    },

    welcomeText: {
        textAlign: 'center',
        
        fontSize: 22,
        fontWeight: 'bold'
    },
    defaultText: {
        
        textAlign: 'center',

    },
    pressable: {
        alignItems: 'center',
        padding: 7,
        borderRadius: 8
    },
    buttonContainer: {
        backgroundColor: '#3383CD',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },


});
export default Profile