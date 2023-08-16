import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Pressable, Button } from 'react-native'
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug'
import Modal from '../components/styled/Modal'
import { PressableText } from '../components/styled/PressableText'
import { formatSec } from '../utils/Time'
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkoutItem from '../components/WorkoutItem'

const WorkoutDetailScreen = ({ route }) => {
    const { name, sequence } = route.params
    const workout = useWorkoutBySlug(route.params.slug)
    const [showSequence,setShowSequence] = useState([])
    const [countDown,setCountDown] = useState(-1)
    const [trackerIdx,setTrackerIdx] = useState(-1)
    const [isRunning,setIsRunning] = useState(false)

    const intervalRef = useRef()

    const startupSeq = ["3", "2", "1", "Go"].reverse()

    const start = (count) => {
        setCountDown(count ?? -1)
        setIsRunning(true)
    }

    useEffect(() => {
        if (trackerIdx == -1 ) {
            return
        }

        setIsRunning(true)

        setCountDown(workout?.sequence[trackerIdx].duration)

        intervalRef.current = window.setInterval(() => {
            setCountDown((count) => {
                return count - 1
            })
        },1000)

        return cleanup

    },[trackerIdx])

    useEffect(() => {
        if(countDown === 0 ) {
            cleanup()
        }
    },[countDown])

    useEffect(() => {
        console.log(countDown)

        if (!workout) {
            return 
        }

        if (trackerIdx === workout.sequence.length -1) {
            return
        }

        if (countDown === 0) {
            addItemToSequence(trackerIdx + 1)
        }
    },[countDown])

    const addItemToSequence = (idx) => {
        let newSequence = []

        if (idx > 0) {
            newSequence = [...showSequence, workout?.sequence[idx]]
        } else {
            newSequence = [workout?.sequence[idx]]
        }

        setShowSequence(newSequence)
        setTrackerIdx(idx)
        start(newSequence[idx].duration + startupSeq.length)
    }

    const cleanup = () => {
        if (intervalRef.current) {
            setIsRunning(false)
            window.clearInterval(intervalRef.current)
            intervalRef.current = undefined
        }  
    }

    if (!workout) {
        return null
      }

    const hasReachedEnd = showSequence.length === workout.sequence.length && countDown === 0

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{name}</Text>
            <WorkoutItem item={workout} childStyle={{ marginTop: 10 }}>
                <Modal 
                    activator={({handleOpen}) => 
                    <PressableText 
                        onPress={handleOpen}
                        text="Check Sequence"
                    />
                }
                >
                    <View>
                        {sequence.map((si,idx) => 
                            <View key={si.slug} style={styles.sequenceItem}>
                                <Text>
                                    {si.name} | {si.type} | {formatSec(si.duration)}
                                </Text>
                                { idx !== sequence.length - 1 && 
                                    <Icon 
                                        name="arrow-down"
                                        size={20}
                                    />
                                }
                            </View>
                        )}
                    </View>
                </Modal>
            </WorkoutItem>
            <View style={styles.wrapper}>
                <View style={styles.counterUI}>
                    <View style={styles.counterItem}>
                    {showSequence.length === 0 ?
                        <Icon 
                            name="play-circle-o"
                            size={100}
                            onPress={() => addItemToSequence(0)}
                        /> : 
                        isRunning ?
                        <Icon 
                            name="stop-circle-o"
                            size={100}
                            onPress={() => cleanup()}
                        /> :

                        <Icon 
                            name="play-circle-o"
                            size={100}
                            onPress={() => {
                                if (hasReachedEnd) {
                                    addItemToSequence(0)
                                } else {
                                    start(countDown)
                                }
                            }}
                        /> 
                    }
                    </View>

                    { showSequence.length > 0 && countDown >= 0 && 
                        <View style={styles.counterItem}>
                            <Text style={{ fontSize: 55 }}>
                                {
                                    countDown > showSequence[trackerIdx].duration ?
                                    startupSeq[countDown - showSequence[trackerIdx].duration - 1] :
                                    countDown
                                }
                            </Text>
                        </View>
                    }
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 60, fontWeight: "bold" }}>
                        { showSequence.length === 0 ? "Prepare" : hasReachedEnd ? "Way To Go!" : showSequence[trackerIdx].name }
                    </Text>
                </View>
                </View>
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
        fontWeight: "bold"
    },
    sequenceItem: {
        alignItems: "center"
    },
    counterUI: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
    },
    counterItem: {
        flex: 1,
        alignItems: "center"
    },
    wrapper: {
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 10
    }
})

export default WorkoutDetailScreen;