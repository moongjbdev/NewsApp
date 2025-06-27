import React, { useRef, useState } from 'react'
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'

type Props = ActivityIndicatorProps

const Loading = (props: ActivityIndicatorProps) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator {...props} color={colors.tint} />
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