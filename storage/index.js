import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key,value) => {
    try {
        const stringValue = JSON.stringify(value)
        await AsyncStorage.setItem(key,stringValue)
    } catch (err) {
        console.error(err.message)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            const data = JSON.parse(value)
            return data
        }
    } catch (err) {
        console.error(err.message)
    }
}

export const containsKey = async (key) => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        return keys.includes(key)
    } catch (e) {
        console.error(e.message)
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.error(e.message)
    }
}