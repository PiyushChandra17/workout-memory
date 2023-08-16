import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput} from 'react-native'
import { PressableText } from './styled/PressableText'
import { useForm, Controller } from "react-hook-form"

const selectionItems = ["exercise", "break", "stretch"]

const WorkoutForm = ({ onSubmit }) => {
    const { control, handleSubmit } = useForm()
    const [isSelectionOn,setSelectionOn] = useState(false)

    return (
        <View style={styles.container}>
            
            <View>
                <View style={styles.rowContainer}>
                    <Controller 
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="name"
                        render={({ field: {onChange, value}}) => 
                            <TextInput 
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder='Workout name'
                            />
                        }
                    />
                    <Controller 
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="duration"
                        render={({ field: {onChange, value}}) => 
                            <TextInput 
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder='Workout duration'
                            />
                        }
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Controller 
                        control={control}
                        rules={{
                            required: false
                        }}
                        name="reps"
                        render={({ field: {onChange, value}}) => 
                            <TextInput 
                                onChangeText={onChange}
                                value={value}
                                style={styles.input}
                                placeholder='Repetitions'
                            />
                        }
                    />
                    <Controller 
                        control={control}
                        rules={{
                            required: true
                        }}
                        name="type"
                        render={({ field: {onChange, value}}) => 
                            <View style={{ flex: 1 }}>
                               { isSelectionOn ? 
                                <View>
                                    {selectionItems.map(selection => 
                                        <PressableText 
                                            key={selection}
                                            value={value}
                                            style={styles.selection}
                                            text={selection}
                                            onPress={() => {
                                                onChange(selection)
                                                setSelectionOn(false)
                                            }}
                                        />
                                    )}
                                </View>
                                :
                                <TextInput 
                                    onPressIn={() => setSelectionOn(true)}
                                    value={value}
                                    style={styles.input}
                                    placeholder='Type'
                                />
                               } 
                            </View> 
                        }
                    />
                </View>
                <PressableText 
                    style={{ marginTop: 15 }}
                    text="Add Exercise"
                    onPress={handleSubmit((data) => {
                        onSubmit(data.slug,data.name,data.duration,data.reps,data.type)
                    })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10
    },
    input: {
        flex: 1,
        margin: 2,
        borderWidth: 1,
        height: 30,
        padding: 5,
        borderRadius: 5,
        borderColor: "rgba(0,0,0,0.4)"
      },
      rowContainer: {
        flexDirection: "row"
      },
      selection: {
        margin: 2,
        padding: 3,
        alignSelf: "center"
      } 
})

export default WorkoutForm;