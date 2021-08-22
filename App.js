import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CaptureScreen from './CaptureScreen';
import SearchRecipeScreen from './SearchRecipeScreen';
import RecipeScreen from './RecipeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
    
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName="Capture"
        
        //screens
      >
        <Stack.Screen name="Capture" options={{headerStyle:{backgroundColor:'black'},title:''}} component={CaptureScreen}/>
        <Stack.Screen name="Search Recipe" options={{title:'Recipes'}} component={SearchRecipeScreen}/>
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer> 
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
