import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { SharedValue } from 'react-native-reanimated'
type Props = {
    items: NewsDataType[],
    paginationIndex: number,
    scrollX: SharedValue<number>
}
const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
    return (
        <View style={styles.container}>
            {
                items.map((item, index) => {
                    return (
                        <Animated.View style={[styles.dot, { backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey }]} key={item.article_id} />
                    )
                })
            }

        </View>
    )
}

export default Pagination
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#333',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8
    }
})