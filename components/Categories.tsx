import newsCategoryList from '@/constants/Categories'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import React, { useRef, useState, useEffect } from 'react'
import { findNodeHandle, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { SharedValue } from 'react-native-reanimated'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {
    onCategoryChanged: (category: string) => void
    currentCategory?: string
}

const Categories = ({ onCategoryChanged, currentCategory }: Props) => {
    const { colors } = useTheme();
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Sync activeIndex with currentCategory
    useEffect(() => {
        if (currentCategory) {
            const index = newsCategoryList.findIndex(cat => cat.slug === currentCategory);
            if (index !== -1) {
                setActiveIndex(index);
            }
        } else {
            setActiveIndex(0);
        }
    }, [currentCategory]);

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
            <Text style={[styles.title, { color: colors.black }]}>Bài Viết Thịnh Hành</Text>
            <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity 
                        ref={(el) => (itemRef.current[index] = el)} 
                        key={item.id}
                        style={[
                            styles.item, 
                            { 
                                borderColor: colors.borderColor,
                                backgroundColor: colors.cardBackground 
                            },
                            activeIndex === index && { 
                                backgroundColor: colors.tint,
                                borderColor: colors.tint 
                            }
                        ]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text style={[
                            styles.itemText, 
                            { color: colors.darkGrey },
                            activeIndex === index && { 
                                color: colors.white,
                                fontWeight: '600'
                            }
                        ]}>
                            {item.title}
                        </Text>
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
        marginBottom: 10,
        marginLeft: 20
    },
    item: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemText: {
        fontSize: 14,
        letterSpacing: 0.5
    },
})