import React, { useState } from 'react'
import { View,Text,Modal as ReactNativeModal,Pressable,StyleSheet} from 'react-native'
import { PressableText } from './PressableText'

const Modal = ({ activator: Activator, children }) => {
    const [isModalVisible,setModalVisible] = useState(false)

    const handleOpen = () => {
        setModalVisible(true)
    }

    const handleClose = () => {
        setModalVisible(false)
    }
    
    return (
        <>
            <ReactNativeModal
                visible={isModalVisible}
                transparent={false}
                animationType='slide'
            >
            <View style={styles.centerView}>
                <View style={styles.contentView}>
                    {children}
                </View>
                <PressableText 
                    onPress={handleClose}
                    text="Close"
                />
            </View>
            </ReactNativeModal>
            {Activator ? <Activator handleOpen={handleOpen}/> : <PressableText onPress={handleOpen} text="Open" />}
        </>
    );
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentView: 20
})

export default Modal;