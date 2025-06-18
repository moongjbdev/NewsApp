import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const SearchBar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
                <TextInput
                    style={styles.searchText}
                    placeholder='Tìm kiếm bài viết'
                    placeholderTextColor={Colors.lightGrey}
                />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 20
    },
    searchBar: {
        backgroundColor: '#E4E4E4',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    searchText: {
        fontSize: 14,
        flex: 1,
        color: Colors.darkGrey
    }
})