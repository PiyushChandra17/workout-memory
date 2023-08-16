import React, { useState,useEffect } from 'react'
import { getWorkouts } from '../storage/workout'
import { useIsFocused } from '@react-navigation/native'

export const useWorkouts = () => {
    const [workouts,setWorkouts] = useState([])
    const isFocused = useIsFocused()
    
    useEffect(() => {
        async function getData() {
            console.log("Getting data")
            const _workouts = await getWorkouts()
            setWorkouts(_workouts)
        }

        if (isFocused) {
            getData()
        }

    },[isFocused])

    return workouts
}