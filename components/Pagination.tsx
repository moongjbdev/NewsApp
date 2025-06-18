import { NewsDataType } from '@/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'
type Props = {
    items: NewsDataType[],
    paginationIndex: number,
    scrollX: SharedValue<number>
}
const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
    return (
        <View>
            <Text>
                Pagination
            </Text>
        </View>
    )
}

export default Pagination
const styles = StyleSheet.create({

})