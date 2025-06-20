import { NewsDataType } from '@/types'
import axios from 'axios'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PUBLIC_API_KEY } from '@env'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'
const search = () => {
    const { query, category, country } = useLocalSearchParams<{ query: string, category: string, country: string }>()
    const [news, setNews] = useState<NewsDataType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const getNews = async () => {
        try {
            let url = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&image=1&removeduplicate=1&size=10`
            if (category) {
                url += `&category=${category}`
            }

            if (country) {
                url += `&country=${country}`
            }

            if (query) {
                url += `&q=${query}`
            }
            const response = await axios.get(url)

            if (response && response.data) {
                setNews(response.data.results)
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNews();
        setIsLoading(false)
    }, [])
    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity>
                        <Ionicons name='arrow-back' size={22} onPress={() => router.back()} />
                    </TouchableOpacity>
                ),
                title: 'Tìm Kiếm',
                headerTitleAlign: 'center',
            }} />
            <View style={styles.container}>
                {isLoading ? (
                    <Loading size={'large'} />
                ) : (
                    <>
                        <FlatList data={news}
                            keyExtractor={(_, index) => `list_item${index}`}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                return (
                                    <Link href={`/news/${item.article_id}` as any} asChild key={item.article_id}>
                                        <TouchableOpacity>
                                            <NewsItem item={item} />
                                        </TouchableOpacity>
                                    </Link>
                                )
                            }}
                        >

                        </FlatList>
                    </>
                )}
            </View>
        </>

    )
}

export default search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20
    }
})