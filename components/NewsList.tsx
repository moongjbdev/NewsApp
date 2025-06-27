import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import React from 'react'
import { findNodeHandle, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Loading from './Loading'
import BookmarkButton from './BookmarkButton'
import { Link } from 'expo-router'

type Props = {
    newsList: NewsDataType[]
}

const NewsList = ({ newsList }: Props) => {
    return (
        <View style={styles.container}>
            {newsList.length == 0 ? (
                <Loading size='large' />
            ) : (
                newsList.map((item, index) => (
                    <Link href={`/news/${item.article_id}` as any} asChild key={item.article_id}>
                        <TouchableOpacity>
                            <NewsItem item={item} />
                        </TouchableOpacity>
                    </Link>
                ))
            )}
        </View>
    )
}

export default NewsList

export const NewsItem = ({ item }: { item: NewsDataType }) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <BookmarkButton newsItem={item} size={20} />
                </View>
                <Text style={styles.itemTitle} numberOfLines={3}>{item.title}</Text>
                <View style={styles.itemSrcInfo}>
                    <Image source={{ uri: item.source_icon }} style={styles.itemSrcImage} />
                    <Text style={styles.itemSrcName}>{item.source_name}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 50
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
        flex: 1,
        gap: 12,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 8
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemCategory: {
        fontSize: 12,
        color: Colors.darkGrey,
        textTransform: 'capitalize',
        backgroundColor: Colors.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
        lineHeight: 20,
    },
    itemSrcImage: {
        width: 16,
        height: 16,
        borderRadius: 8
    },
    itemSrcName: {
        fontSize: 11,
        fontWeight: '400',
        color: Colors.darkGrey
    },
    itemSrcInfo: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'
    }
})