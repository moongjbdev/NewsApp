import newsCategoryList from '@/constants/Categories'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import React, { useRef, useState } from 'react'
import { findNodeHandle, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { SharedValue } from 'react-native-reanimated'
type Props = {
    onCategoryChanged: (category: string) => void
}
const Categories = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        const scrollViewNode = findNodeHandle(scrollRef.current);

        if (selected && scrollViewNode) {
            selected.measureLayout(
                scrollViewNode,
                (x, y, width, height) => {
                    scrollRef.current?.scrollTo({
                        x: x - 20,
                        y: 0,
                        animated: true
                    });
                },
            );
            setActiveIndex(index);
        }
        onCategoryChanged(newsCategoryList[index].slug)
    };
    return (
        <View >
            <Text style={styles.title}>Bài Viết Thịnh Hành</Text>
            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity ref={(el) => (itemRef.current[index] = el)} key={item.id}
                        style={[styles.item, activeIndex === index && styles.itemActive]}
                        onPress={() => handleSelectCategory(index)}>
                        <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Categories
const styles = StyleSheet.create({
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },

    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5
    },
    itemTextActive: {
        color: Colors.white,
        fontWeight: '600'

    }

})