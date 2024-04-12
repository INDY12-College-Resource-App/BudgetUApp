// FinancialAdvice.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, FinancialResource } from '../(tabs)/types'; // Adjust the import path as necessary

 //Get a stack navigator as the root stack and export type for Financial advice const
type FinancialAdviceNavigationProp = StackNavigationProp<RootStackParamList, 'FinancialAdvice'>;

const FinancialAdvice = () => {
  //Set navigatior and set the data from the stack.
  const navigation = useNavigation<FinancialAdviceNavigationProp>();
  const [data, setData] = useState<FinancialResource[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL to populate the SitePicture field
        const url = 'http://192.168.254.113:1337/api/financial-resources?populate=SitePicture';//If debugging change IP to your network, do this by going in CMD and typing ipconfig
        const response = await fetch(url);
        const result = await response.json();
      
        if (response.ok) {
          // Filter the results to only include the desired category.
          const filteredData = result.data.filter((resource: FinancialResource) => 
            resource.attributes.Category === 'Financial Advice'
          );
          setData(filteredData);
        } else {
          console.log('HTTP Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchData();
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => {
      console.error("Failed opening page because: ", err);
      alert('Failed to open page');
    });
  };

  const renderItem = ({ item }: { item: FinancialResource }) => {
   // Base URL for your server
  const baseUrl = 'http://192.168.254.113:1337'; //If debugging change IP to your network, do this by going in CMD and typing ipconfig

  // Construct the full URL for the image
  const imageUrl = item.attributes.SitePicture?.data?.attributes?.formats?.thumbnail?.url;
const fullImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : undefined;



    return (
      <TouchableOpacity style={styles.card} onPress={() => openLink(item.attributes.Link)}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.attributes.Title}</Text>
          <Text style={styles.description}>{item.attributes.Description}</Text>
        </View>
        {imageUrl ? (
         <Image style={styles.image} source={{ uri: fullImageUrl || 'https://via.placeholder.com/100' }} />
        ) : (
          <View style={styles.imageNotFound}>
            <Text>Img not found</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  
  


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList 
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  list: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
    marginLeft: 'auto', 
  },
  

  imageNotFound: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc', // Light gray background for the placeholder
    justifyContent: 'center', // Centers content vertically inside the view
    alignItems: 'center', // Centers content horizontally inside the view
    color: '#333', // Text color
  },
  

});


export default FinancialAdvice;
