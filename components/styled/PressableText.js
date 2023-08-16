import { Text,Pressable,StyleSheet } from "react-native"

export function PressableText({ text,onPress }) {
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.pressableTextStyle}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressableTextStyle: {
        justifyContent: "center",
        height: 25,
        width: 120,
        backgroundColor: "#1DB954",
        color: "#fff",
        borderRadius: 4,
        border: "none",
        alignItems: "center",
        alignSelf: "center",
        alignContent: "center",
        textAlign: "center",
        flexDirection: "row",
        marginTop: 15
    }
})