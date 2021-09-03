import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Avatar, Card, Text } from 'react-native-elements'
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import CaptureScreen from './CaptureScreen';
import { Image } from 'react-native-elements';

const RecipeScreen = ({route,navigation}) =>{
    const {recipe} = route.params;

    const Ingredients = JSON.parse(JSON.stringify(JSON.parse(recipe.Ingredients.replace(/'/g, '"'))));

    const Instructions = recipe.Instructions.split("\n");

    const [loaded, setLoaded] = useState(false);
    const [Nutritions, setNutritions] = useState(null);

    const ImageLink = 'https://3b63-35-229-186-218.ngrok.io/api/resource/'+recipe.Image_Name+'.jpg';

    const fetchMyAPI = async () =>{
        let formData = new FormData();
        formData.append('cooking', recipe.Title);
        try {
            const response = await fetch(
            'https://3b63-35-229-186-218.ngrok.io/api/nutrient',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept:'application/json'
                },
                body:formData,
            }
            );
            if (response.ok) {
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const json = await response.json();
                    setNutritions(json);
                    console.log(json);
                } else {
                    console.log('empty response')
                }
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    
    useEffect(() => {
        fetchMyAPI();
        setLoaded(true);
    },[]);
    
    return(
        <ScrollView>
            <Card>
                <Text h4>{recipe.Title}</Text>
                <Image
                    source={{ uri: ImageLink }}
                    style={{ width: 320, height: 320 }}
                />
            </Card>
            
            <Card>
                <Card.Title>Ingredients</Card.Title>
                <Card.Divider/>
                {
                    Ingredients.map((item,i)=>{
                        return(
                        <View key={i} style={{flexDirection:'row'}}>
                            <Icon style={{flex:1}}
                                name='check'
                                type='evilicon'
                                color='#517fa4'
                            />
                            <Text style={{flex:1}}>{item}</Text>
                        </View>);
                    })
                }
            </Card>
            <Card style={{}}>
                <Card.Title>Instructions</Card.Title>
                <Card.Divider/>
                {
                    Instructions.map((item,i)=>{
                            return(
                            <View key={i} style={{flexDirection:'row'}}>
                                <Icon style={{flex:1}}
                                    name='check'
                                    type='evilicon'
                                    color='#517fa4'
                                />
                                <Text style={{flex:1}}>{item}</Text>
                            </View>);
                    })
                }
            </Card>
            {loaded && Nutritions && <Card style={{}}>
                <Card.Title>Nutrients</Card.Title>
                <Card.Divider/>
                {
                    Nutritions.map((item,i)=>{                    
                        return(
                            <View style={{flexDirection:'row',borderColor:'lightgray',borderBottomWidth:0.3}}>
                                <Text style={{flex:3, textAlignVertical:'center'}}>
                                    {item.nutrientName}
                                </Text>
                                <Text style={{flex:1, textAlignVertical:'center', marginLeft:10}}>
                                    {item.nutrientNumber}
                                </Text>
                            </View>
                        );
                    
                })
                }
                
            </Card>
            }

        </ScrollView>
    );
}

export default RecipeScreen;