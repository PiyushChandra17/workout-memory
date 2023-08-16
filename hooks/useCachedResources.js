import React, { useState, useEffect } from 'react'
import { getWorkouts, initWorkouts } from '../storage/workout'

const useCachedResources = () => {
    const [isLoadingComplete,setIsLoadingComplete] = useState(false)

    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                await initWorkouts()                
            } catch (e) {
                console.warn(e)
            } finally {
                setIsLoadingComplete(true)
            }
        }
        loadResourcesAndDataAsync()
    },[])

    return (
        isLoadingComplete
    );
}

export default useCachedResources;