import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Avatar, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native';

const BenefitsScreen = ({route,navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const [benefits, setBenefits] = useState(null);

    const {query} = route.params;

    const fetchMyAPI2 = async () =>{
        try {
            const resbenefits = await Promise.all(
                query.map(async (q) => {
                    let formData = new FormData();
                    formData.append('fruit', q.toString());
                    const response = await fetch(
                        'https://413d-35-229-186-218.ngrok.io/api/benefits',
                        {
                            method:'POST',
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Accept:'application/json'
                            },
                            body:formData,
                        }
                    );
                  return await response.json();
                })
            );
            
            setBenefits(resbenefits);
            setLoaded(true);
            console.log(resbenefits);
            
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchMyAPI2();
    },[]);



    const toPascalCase = (string) => {
        return `${string}`
          .replace(new RegExp(/[-_]+/, 'g'), ' ')
          .replace(new RegExp(/[^\w\s]/, 'g'), '')
          .replace(
            new RegExp(/\s+(.)(\w+)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
          )
          .replace(new RegExp(/\s/, 'g'), '')
          .replace(new RegExp(/\w/), s => s.toUpperCase());
      }



    
    return(
        <View style={{flex:1}}>
            <View style={{flex:14}}>
                <ScrollView style={{}}>
                    {loaded?
                    benefits.map((item,i)=>{
                        return(<Card style={{marginBottom:10}}>
                                <Card.Title>{toPascalCase(query[i])}</Card.Title>
                                <Card.Divider/>
                                    {
                                        item.map((benefit,i)=>{
                                            return(
                                                <Text>{benefit}</Text>
                                            );
                                            
                                        })
                                    }
                        </Card>);
                    })
                    :
                    <ActivityIndicator />
                    }
                </ScrollView>
            </View>
            
            <View style={{flex:1}}>
                    <Button
                        style={{marginTop:5}}
                        title='See Recipes'
                        onPress={()=>{
                            navigation.navigate('Search Recipe',{query:query})
                        }}
                    />
            </View>
        </View>
    );
}

export default BenefitsScreen;