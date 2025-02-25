import React from 'react';
import {LogBox} from 'react-native';
import RootStackNavigator from './src/Navigators/RootStackNavigator';

const ignoreWarns = [
  'EventEmitter.removeListener',
  '[fuego-swr-keys-from-collection-path]',
  'Setting a timer for a long period of time',
  'ViewPropTypes will be removed from React Native',
  'AsyncStorage has been extracted from react-native',
  "exported from 'deprecated-react-native-prop-types'.",
  'Non-serializable values were found in the navigation state.',
  'VirtualizedLists should never be nested inside plain ScrollViews',
  'Animated: `useNativeDriver` was not specified.',
  'VirtualizedLists should never be nested inside plain ScrollViews',
];

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(ignoreWarns);

const App = () => {
  return <RootStackNavigator />;
};

export default App;
