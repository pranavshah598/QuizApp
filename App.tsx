import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoryScreen } from './src/Screen/CategoryScreen/CategoryScreen';
import { QuizScreen } from './src/Screen/QuizScreen/QuizScreen';

const Stack = createStackNavigator();
const App: React.FC = () => {
  return (<NavigationContainer>
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#00dee9' }, headerTitleStyle: { color: 'white' } }}>
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
};

export default App;
