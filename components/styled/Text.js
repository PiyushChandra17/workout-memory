import { Text, useColorScheme } from 'react-native'

const ThemeText = (props) => {
    const colorScheme = useColorScheme()
    const color = colorScheme === "light" ? "#000" : "#fff"
    return (
        <Text 
            {...props}
            style={[props.style, {color }]}
        />
    );
}

export default ThemeText;