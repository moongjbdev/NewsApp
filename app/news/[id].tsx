
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { findNodeHandle, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PUBLIC_API_KEY } from '@env'
import axios from 'axios'
import Loading from '@/components/Loading'
import { getFakeContentByCategory } from '@/constants/ContentFake'
import Moment from 'moment'
type Props = {
    newsList: NewsDataType | null
}
const NewsList = ({ newsList }: Props) => {

    const { id } = useLocalSearchParams<{ id: string }>()
    const [newsDetail, setNewsDetail] = useState<NewsDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&id=${id}`
                const response = await axios.get(URL)

                if (response && response.data && response.data.results?.length > 0) {
                    setNewsDetail(response.data.results[0])

                } else {
                    setNewsDetail(null)
                }
            } catch (error: any) {
                console.log('Error fetching news detail:', error)
                setNewsDetail(null) // fallback nếu lỗi
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id])

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity>
                        <Ionicons name='arrow-back' size={22} onPress={() => router.back()} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <Ionicons name='heart-outline' size={22} onPress={() => { }} />
                    </TouchableOpacity>
                ),
                title: '',
                headerTitleAlign: 'center',
            }} />
            {
                isLoading ? (<Loading size={'large'} />) : (
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <Text style={styles.title}>
                            {newsDetail?.title}
                        </Text>
                        <View style={styles.newInfoWrapper}>
                            <Text style={styles.newInfo}>{Moment(newsDetail?.pubDate).format('MMMM DD, hh:mm')}</Text>
                            <Text style={styles.newInfo}>{newsDetail?.source_name}</Text>
                        </View>
                        <Image source={{ uri: newsDetail?.image_url }} style={styles.newImage} />
                        <Text style={styles.newContent}>
                            {(getFakeContentByCategory(newsDetail?.category[0] || "")) || newsDetail?.description}
                        </Text>
                    </ScrollView>
                )
            }

        </>

    )
}

export default NewsList
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,

    },
    contentContainer: {
        marginHorizontal: 20,
        paddingBottom: 30
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
        letterSpacing: 0.6
    },
    newImage: {
        width: '100%',
        height: 300,
        borderRadius: 20
    },
    newInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    newInfo: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    newContent: {
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22
    }
})