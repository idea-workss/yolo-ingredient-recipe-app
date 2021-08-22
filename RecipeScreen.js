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

    const ImageLink = 'https://413d-35-229-186-218.ngrok.io/api/resource/'+recipe.Image_Name+'.jpg';

    
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

        </ScrollView>
    );
}

export default RecipeScreen;