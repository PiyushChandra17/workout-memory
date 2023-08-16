import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput} from 'react-native'
import { PressableText } from './styled/PressableText'
import { useForm, Controller } from "react-hook-form"

const ExerciseForm = ({ onSubmit }) => {
    const { control, handleSubmit } = useForm()

    return (
        <>
            <View style={styles.container}>
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
                            placeholderTextColor={"rgba(0,0,0,0.4)"}
                            placeholder='Workout Name'
                        />
                    }
                />
            </View>
            <PressableText 
                style={{ marginTop: 25 }}
                text="Confirm"
                onPress={handleSubmit((data) => {
                    onSubmit(data.name,data.difficulty,data.sequence,data.duration)
                })}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10
    },
    input: {
        width: 200,
        margin: 2,
        borderWidth: 1,
        height: 30,
        padding: 5,
        borderRadius: 5,
        borderColor: "rgba(0,0,0,0.4)"
      }
})

export default ExerciseForm;