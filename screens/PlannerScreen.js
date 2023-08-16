import React, { useState,useEffect } from 'react'
import { View,Text,StyleSheet,FlatList,KeyboardAvoidingView } from 'react-native'
import WorkoutForm from '../components/WorkoutForm';
import slugify from 'slugify'
import ExerciseItem from '../components/ExerciseItem';
import { PressableText } from '../components/styled/PressableText';
import Modal from '../components/styled/Modal';
import ExerciseForm from '../components/ExerciseForm';
import { storeWorkout } from '../storage/workout';

const PlannerScreen = ({ navigation }) => {
    const [seqItems,setSeqItems] = useState([])

    const handleWorkoutSubmit = (slug,name,duration, reps,type) => {
        const sequenceItem = {
            slug: slugify(name + " " + Date.now(), {lower: true}),
            name: name,
            type: type,
            duration: Number(duration)
        }

        if(reps) {
            sequenceItem.reps = Number(reps)
        }

        setSeqItems([...seqItems, sequenceItem])
    }

    const computeDiff = (exercisesCount,workoutDuration) => {
        const intensity = workoutDuration / exercisesCount

        if(intensity <= 60) {
            return "hard"
        } else if (intensity <= 100) {
            return "normal"
        } else {
            return "easy"
        }
    }

    const handleExerciseSubmit = async (name, difficulty,sequence,duration) => {
        if (seqItems.length > 0) {

            const duration = seqItems.reduce((acc,item) => {
                return acc + item.duration
            },0)

            const workout = {
                name: name,
                slug: slugify(name + " " + Date.now(), {lower: true}),
                difficulty: computeDiff(seqItems.length,duration),
                sequence: [...seqItems],
                duration
            }
    
            await storeWorkout(workout)
        }
    }

    return (
        
        <View style={styles.container}>
            <FlatList 
                data={seqItems}
                renderItem={({ item,index }) => 
                    <ExerciseItem item={item}>
                        <PressableText 
                            text="Remove"
                            onPress={() => {
                                const items = [...seqItems]
                                items.splice(index,1)
                                setSeqItems(items)
                            }}
                        />
                    </ExerciseItem>
                }
                keyExtractor={item => item.slug}

            />
            <WorkoutForm 
                onSubmit={handleWorkoutSubmit}
            />

            <View>
                <Modal activator={({ handleOpen }) => 
                    <PressableText 
                        style={{marginTop: 25}}
                        text="Create Workout"
                        onPress={handleOpen}
                    />
                }
                >
                    <View>
                        <ExerciseForm 
                            onSubmit={async (data) => {
                                await handleExerciseSubmit(data)
                                navigation.navigate("Home")
                            }}
                        />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})

export default PlannerScreen;