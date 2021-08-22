import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem, Avatar, Text, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import { Chip } from 'react-native-elements/dist/buttons/Chip';


const SearchRecipeScreen = ({route,navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const [recipes, setRecipes] = useState(null);

    const {query} = route.params;

    const fetchMyAPI = async () =>{
        let formData = new FormData();
        formData.append('query', query.toString());
        try {
            const response = await fetch(
            'https://413d-35-229-186-218.ngrok.io/api/search',
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
                    setRecipes(json);
                    setLoaded(true);
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
    },[]);

    
    return(
        <View style={{flex:1}}>
            <Card style={{flex:1}}>
                <Text>
                    Image Result : {
                        query.map((item,i)=>{
                            if(i==query.length-1){
                                return item;
                            }
                            return item+', '
                        })
                    }
                </Text>     
            </Card>
            <View style={{flex:1, marginBottom:25, marginHorizontal:15, marginTop:15, borderColor:'grey'}}>
                {loaded && 
                <FlatList
                    keyExtractor={(item)=>{item['Unnamed: 0'].toString()}}
                    data={recipes}
                    renderItem={({ item }) => (
                        <ListItem bottomDivider 
                        button
                        onPress={()=>navigation.navigate('Recipe',{recipe:item})
                        }>
                          <ListItem.Content>
                            <ListItem.Title>{item.Title}</ListItem.Title>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      )}
                />
                }

            </View>
        </View>
    );
}

export default SearchRecipeScreen;