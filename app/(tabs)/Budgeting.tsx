
import { Link, router } from "expo-router";
import { Pressable, SafeAreaView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
const introImage = require('@/assets/intro.png');
import { useEffect, useState, useLayoutEffect } from 'react'
import { db, auth, } from '@/app/index';
import { Layout, userID } from '@/app/(modals)/createAcc';
import { doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { collection, query, where, Firestore } from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { PieChart } from "react-native-gifted-charts"



const Budget = () => {




    const [foodTotals, setfoodTotals] = useState<number>();
    const [transTotals, settransTotals] = useState<number>();
    const [tuitionTotals, settuitionTotals] = useState<number>();
    const [housingTotals, sethousingTotals] = useState<number>();
    const [otherTotals, setotherTotals] = useState<number>();
    const [budget, setbudget] = useState<number>();
    const [avaliableCash, setavaliableCash] = useState<number>(); // might change to string so that rounds correctly? (with tofixed())
    const [frequency, setfrequency] = useState("");



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



 



    onSnapshot(budgetq, (snapshot) => { //if budget goes below 0 , do (something)
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
        convertTotal = Math.round(convertTotal * 1e2) / 1e2;
        setavaliableCash(convertTotal);




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


    function percentConvert(value: any, budget: any) {
        var conversion = 0;
        conversion = ((value / budget) * 100);
        var display = "";


       display = conversion.toFixed(2);

        return display;


    }

    const pieData = [
        

        {
            value: ((Number(avaliableCash) / Number(budget) ) * 100),
            color: '#009FFF',
            gradientCenterColor: '#006DFF',

        },

        { value: ((Number(foodTotals) / Number(budget)) * 100), color: '#93FCF8', gradientCenterColor: '#3BE9DE' },

        { value: ((Number(transTotals) / Number(budget)) * 100), color: '#BDB2FA', gradientCenterColor: '#8F80F3' },

        { value: ((Number(tuitionTotals) / Number(budget)) * 100), color: '#FFA5BA', gradientCenterColor: '#FF7F97' },

        { value: ((Number(housingTotals) / Number(budget)) * 100), color: '#5bff33', gradientCenterColor: '#FF7F97' },

        { value: ((Number(otherTotals) / Number(budget)) * 100), color: '#ff9933', gradientCenterColor: '#FF7F97' },

    ];


    const renderDot = (color: any) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const legendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{

                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 180,
                            marginRight: 40,
                        }}>

                        {renderDot('#009FFF')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Free to Spend: {percentConvert(avaliableCash,budget)}% </Text>
                    </View>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#93FCF8')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Food: {percentConvert(foodTotals, budget)}% </Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, }}>

                    <View

                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 180,
                            marginRight: 40,
                        }}>

                        {renderDot('#BDB2FA')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Transportation: {percentConvert(transTotals, budget)}%</Text>

                    </View>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FFA5BA')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Tuition: {percentConvert(tuitionTotals, budget)}%</Text>
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10, }}>

                    <View

                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 180,
                            marginRight: 40,
                        }}>

                        {renderDot('#5bff33')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Housing: {percentConvert(housingTotals, budget)}%</Text>

                    </View>

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#ff9933')}
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Other: {percentConvert(otherTotals, budget)}%</Text>
                    </View>

                </View>
            </>
        );
    };





    return (

        <SafeAreaView>
            <ScrollView>

                <View
                    style={{
                        margin: 20,
                        padding: 16,
                        borderRadius: 20,
                        backgroundColor: '#255489',
                    }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        Budget ({frequency}) :
                    </Text>

                    <View style={styles.imageContainer}>
                        <PieChart
                            data={pieData}
                            donut
                            showGradient
                            sectionAutoFocus
                            radius={90}
                            innerRadius={60}
                            innerCircleColor={'#232B5D'}
                            centerLabelComponent={() => {
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text
                                            style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                            ${budget}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: 'white' }}>Budget</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    {legendComponent()}

                </View>




                <View>
                    <Text style={styles.welcomeText} > Expenses </Text>
                </View>




                <View style={styles.container} >

                    <Text style={styles.itemText} > Budget Remaining:  </Text>


                    <Text style={styles.itemText2} > ${avaliableCash} </Text>




                </View>



                <Link push href="/(expensetype)/foodTab" asChild>
                    <Pressable>
                        <View style={styles.container} >

                            <Text style={styles.itemText} > Food </Text>


                            <Text style={styles.itemText2} > ${foodTotals} </Text>




                        </View>


                    </Pressable>
                </Link>


                <Link push href="/(expensetype)/transportationTab" asChild>
                    <Pressable>
                        <View style={styles.container} >

                            <Text style={styles.itemText} > Transportation </Text>


                            <Text style={styles.itemText2} > ${transTotals} </Text>




                        </View>
                    </Pressable>
                </Link>


                <Link push href="/(expensetype)/tuitionTab" asChild>
                    <Pressable>
                        <View style={styles.container} >

                            <Text style={styles.itemText} > Tuition </Text>


                            <Text style={styles.itemText2} > ${tuitionTotals} </Text>




                        </View>
                    </Pressable>
                </Link>


                <Link push href="/(expensetype)/housingTab" asChild>
                    <Pressable>
                        <View style={styles.container} >

                            <Text style={styles.itemText} > Housing </Text>


                            <Text style={styles.itemText2} > ${housingTotals} </Text>




                        </View>
                    </Pressable>
                </Link>



                <Link push href="/(expensetype)/otherTab" asChild>
                    <Pressable>
                        <View style={styles.container} >

                            <Text style={styles.itemText} > Other </Text>


                            <Text style={styles.itemText2} > ${otherTotals} </Text>




                        </View>
                    </Pressable>
                </Link>

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
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 15,
    },

    welcomeText: {


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
export default Budget