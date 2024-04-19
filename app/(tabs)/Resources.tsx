// Resources.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FinancialAdvice from '../(screens)/FinancialAdvice';
import BudgetingAdvice from '../(screens)/BudgetingAdvice';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

type ResourcesScreenNavigationProp = NavigationProp<RootStackParamList, 'ResourcesHome'>;

//Resource Screen
const ResourcesScreen = () => {
  const navigation = useNavigation<ResourcesScreenNavigationProp>();
   //Adding content to the container
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.description}>Get customized financial advice based on your needs.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinancialAdvice')}>
          <Text style={styles.buttonText}>Financial Advice</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.description}>Learn how to manage your budget more effectively.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BudgetingAdvice')}>
          <Text style={styles.buttonText}>Budgeting Advice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
  //Created the stack with the names that were set above.
const ResourcesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ResourcesHome" component={ResourcesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FinancialAdvice" component={FinancialAdvice} />
      <Stack.Screen name="BudgetingAdvice" component={BudgetingAdvice} />
    </Stack.Navigator>
  );
};

export default ResourcesStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  }
});
