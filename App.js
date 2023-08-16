import React from 'react';
import Navigation from './navigation';
import useCachedResources from './hooks/useCachedResources';
import { useColorScheme } from 'react-native';


const App = () => {
  const isLoaded = useCachedResources()
  const theme = useColorScheme()

  return (
    <>
      <Navigation colorTheme={theme}/>
    </>
  );
};

export default App;