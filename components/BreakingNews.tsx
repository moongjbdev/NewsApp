import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import SliderItem from './SliderItem'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import Pagination from './Pagination'

type Props = {
    newList: Array<NewsDataType>
}
const { width } = Dimensions.get('screen')
const ITEM_WIDTH = width * 0.85;
const BreakingNews = ({ newList }: Props) => {
    const [data, setData] = useState<Array<NewsDataType>>([]);

    useEffect(() => {
        setData(newList);
    }, [newList]);

    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>()

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x
        },
    })

    const handleLoadMore = () => {
        const moreData = [...newList];

        setData((prev) => [...prev, ...moreData]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tin tức mới nhất</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({ item, index }) => (<SliderItem sliderItem={item} index={index} scrollX={scrollX} />)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    snapToInterval={ITEM_WIDTH}
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingHorizontal: (width - ITEM_WIDTH) / 2 }}
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                />
                <Pagination />
            </View>
        </View>
    )
}

export default BreakingNews
const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20
    },
    slideWrapper: {
        // width: "100%",
        // flex: 1,
        justifyContent: 'center'
    }
})