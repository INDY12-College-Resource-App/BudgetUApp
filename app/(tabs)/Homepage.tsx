
import { Link, router } from "expo-router";
import { Pressable, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import ImageView from '@/components/ImageView';
import Button from '@/components/Buttons';


const introImage = require('@/assets/intro.png');
import { useLayoutEffect, useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, limit, orderBy } from "firebase/firestore";
import React from 'react'
import { db, auth, } from '@/app/index';
import { Layout, userID } from '@/app/(modals)/createAcc';
import { collection, query, where, Firestore } from "firebase/firestore";
import { PieChart } from "react-native-gifted-charts"
import { doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";





//recent expenses will hold a date field 
//query based on date field, limit to 5 expenses when querying
//display on flashlist

const Home = () => {

    

    const [Username, setUsername] = useState("");

    const profilecol = collection(db, "user");
    const profileq = query(profilecol, where("UserUID", "==", auth.currentUser?.uid ))

    onSnapshot(profileq, (snapshot) => {
        var n = "";
        snapshot.docs.forEach((doc) => {
            n = doc.data().name
        })
        setUsername(n)
      
    })


    const [recents, setrecents] = useState<any[""]>([]);
    const [refresh, setrefresh] = useState(false)
    const recentCol = collection(db, "expenses");

    const recentq = query(recentCol, where("expenseOwner", "==", auth.currentUser?.uid ),
        orderBy('createdAt') )

    useLayoutEffect(() => {
        onSnapshot(recentq, (snapshot) => {
            let recent: { id: string; }[] = []

            snapshot.docs.forEach((doc) => {

                recent.push({ ...doc.data(), id: doc.id })
            })

            recent.reverse();

            setrecents(recent);

            

        })

    }, [])

    const [foodTotals, setfoodTotals] = useState<number>();
    const [transTotals, settransTotals] = useState<number>();
    const [tuitionTotals, settuitionTotals] = useState<number>();
    const [housingTotals, sethousingTotals] = useState<number>();
    const [otherTotals, setotherTotals] = useState<number>();
    const [budget, setbudget] = useState<number>();
    const [avaliableCash, setavaliableCash] = useState<number>();  
    const [frequency, setfrequency] = useState("");
    const [budgetpercent, setbudgetpercent] = useState<number>();

  


    const foodCol = collection(db, "expenses");
    const foodq = query(foodCol, where("expenseOwner", "==", auth.currentUser?.uid),
        where("exType", "==", "foodExpense"));

    const transCol = collection(db, "expenses");
    const transq = query(transCol, where("expenseOwner", "==", auth.currentUser?.uid),
        where("exType", "==", "transportationExpense"));

    const tuitionCol = collection(db, "expenses");
    const tuitionq = query(tuitionCol, where("expenseOwner", "==", auth.currentUser?.uid),
        where("exType", "==", "tuitionExpense"));

    const housingCol = collection(db, "expenses");
    const housingq = query(housingCol, where("expenseOwner", "==", auth.currentUser?.uid),
        where("exType", "==", "housingExpense"));

    const otherCol = collection(db, "expenses");
    const otherq = query(otherCol, where("expenseOwner", "==", auth.currentUser?.uid),
        where("exType", "==", "otherExpense"));




    const budgetCol = collection(db, "user");
    const budgetq = query(budgetCol, where("UserUID", "==", auth.currentUser?.uid))



    onSnapshot(budgetq, (snapshot) => { 
        var convert = 0;
        var freq = "";
        snapshot.docs.forEach((doc) => {


            freq = doc.data().frequency

            var rounded = parseFloat(doc.data().amount).toFixed(2);
            convert = parseFloat(rounded);

        })
        setfrequency(freq);
        setbudget(convert);
        var convertTotal = (convert - Number(foodTotals) - Number(transTotals) - Number(tuitionTotals) - Number(housingTotals) - Number(otherTotals));
        convertTotal = Number(convertTotal.toFixed(2))
        setavaliableCash(convertTotal);


        var percentTotal = (convertTotal / convert) * 100
        percentTotal = Number(percentTotal.toFixed(2))

        setbudgetpercent(percentTotal);

    })




    useLayoutEffect(() => {

        onSnapshot(foodq, (snapshot) => {  //food expenses

            var snap = 0;
            snapshot.docs.forEach((doc) => {



                var rounding = parseFloat(doc.data().exAmount);

                rounding = Math.round(rounding * 1e2) / 1e2;

                snap += rounding

            })
            snap = Math.round(snap * 1e2) / 1e2;


            setfoodTotals(snap);


        })

        onSnapshot(transq, (snapshot) => {

            var snap = 0;
            snapshot.docs.forEach((doc) => {



                var rounding = parseFloat(doc.data().exAmount);

                rounding = Math.round(rounding * 1e2) / 1e2;

                snap += rounding

            })
            snap = Math.round(snap * 1e2) / 1e2;

            settransTotals(snap);

      

        })

        onSnapshot(tuitionq, (snapshot) => {

            var snap = 0;
            snapshot.docs.forEach((doc) => {



                var rounding = parseFloat(doc.data().exAmount);

                rounding = Math.round(rounding * 1e2) / 1e2;

                snap += rounding

            })
            snap = Math.round(snap * 1e2) / 1e2;


            settuitionTotals(snap);


        })


        onSnapshot(housingq, (snapshot) => {

            var snap = 0;
            snapshot.docs.forEach((doc) => {



                var rounding = parseFloat(doc.data().exAmount);

                rounding = Math.round(rounding * 1e2) / 1e2;

                snap += rounding

            })
            snap = Math.round(snap * 1e2) / 1e2;


            sethousingTotals(snap);

          

        })



        onSnapshot(otherq, (snapshot) => {

            var snap = 0;
            snapshot.docs.forEach((doc) => {



                var rounding = parseFloat(doc.data().exAmount);

                rounding = Math.round(rounding * 1e2) / 1e2;

                snap += rounding

            })
            snap = Math.round(snap * 1e2) / 1e2;


            setotherTotals(snap);

          
        })



    }, [])



    const pieData = [

        { value: (100 - Number(budgetpercent)), color: 'red' },
        { value: Number(budgetpercent), color: 'green' }


    ];


   

    return (



        <SafeAreaView>
            
            <ScrollView>



        <View>
                    <Text style={styles.welcomeText}> Welcome, {Username} </Text>
                    <Text > {frequency}, ${budget} budget </Text>
        </View> 
                

               
                    
            <View style={styles.imageContainer}>

                    <PieChart

                        donut

                        innerRadius={88}

                        data={pieData}

                        centerLabelComponent={() => {
                            return (
                                <View style={{ alignItems: 'center' }}> 
                                    <Text style={{ fontSize: 30 }}>${avaliableCash}</Text>
                                    <Text style={{ fontSize: 15, color: 'gray' }}>Remaining out of ${budget }</Text>
                                </View>
                            );

                        }}

                    />

                </View>


            <View>
                <Text style={styles.welcomeText}> Recent Expenses </Text>


               

                    <FlatList
                    
                    data={recents.slice(0,7)}
                    extraData={recents}

                    
                        renderItem={({ item }) => <View style={styles.container}>

                            <Text style={styles.welcomeText}>
                                {item.exType === 'foodExpense' ? 'Food' : item.exType ||
                                item.exType === 'tuitionExpense' ? 'Tuition' : item.exType ||
                                item.exType === 'transportationExpense' ? 'Transportation' : item.exType ||
                                item.exType === 'housingExpense' ? 'Housing' : item.exType ||
                                item.exType === 'otherExpense' ? 'Other' : item.exType
                                }
                               
                            </Text>
                            <Text style={styles.welcomeText}> {item.desc}</Text>
                            <Text style={styles.welcomeText}> ${item.exAmount}</Text>

                        </View>} />


            

            </View>


                </ScrollView>
            

                </SafeAreaView>
                    




      
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderWidth: .6,
        borderColor: "grey",
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
        textAlign: "left",
    },

    imageContainer: {
       
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 15,
    },

    welcomeText: {

        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    itemText: {

        fontSize: 20,

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
    itemText2: {


        fontSize: 20,
        textAlign: "right"

    },

});
export default Home