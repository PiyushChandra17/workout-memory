import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import WorkoutItem from '../components/WorkoutItem'
import { useWorkouts } from '../hooks/useWorkouts'
import ThemeText from '../components/styled/Text'
const HomeScreen = ({ navigation }) => {
    const workouts = useWorkouts()
    return (
        <View style={styles.container}>
            <Text style={styles.header}>New Workouts</Text>
            <FlatList 
                data={workouts}
                renderItem={({ item }) => {
                    return (
                        <Pressable 
                            onPress={() => navigation.navigate("WorkoutDetail", {slug: item.slug, name: item.name, sequence: item.sequence })}
                        >
                            <WorkoutItem item={item}/>
                        </Pressable>
                    )
                }} 
                keyExtractor={item => item.slug}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#fff"
    }
})

export default HomeScreen;