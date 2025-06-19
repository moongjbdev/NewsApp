
import React, { useRef, useState } from 'react'
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'

type Props = ActivityIndicatorProps

const Loading = (props: ActivityIndicatorProps) => {

    return (
        <View style={styles.container}>
            <ActivityIndicator {...props} />
        </View>
    )
}

export default Loading
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})