
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, findNodeHandle, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PUBLIC_API_KEY } from '@env'
import axios from 'axios'
import Loading from '@/components/Loading'
import { getFakeContentByCategory } from '@/constants/ContentFake'
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Props = {
    newsList: NewsDataType | null
}
const NewsList = ({ newsList }: Props) => {

    const { id } = useLocalSearchParams<{ id: string }>()
    const [newsDetail, setNewsDetail] = useState<NewsDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [bookmark, setBookmark] = useState(false)

    // const toggleBookmark = async (newsId: string) => {
    //     try {
    //         const stored = await AsyncStorage.getItem("bookmark");
    //         let savedList: string[] = [];

    //         if (stored) {
    //             savedList = JSON.parse(stored);

    //             const isBookmarked = savedList.includes(newsId);

    //             if (isBookmarked) {
    //                 // Nếu đã bookmark thì xóa
    //                 const updatedList = savedList.filter(id => id !== newsId);
    //                 await AsyncStorage.setItem("bookmark", JSON.stringify(updatedList));
    //                 setBookmark(false);
    //                 Alert.alert("Thông báo", "Đã xóa khỏi mục yêu thích.");
    //                 return;
    //             }
    //         }

    //         // Nếu chưa bookmark thì thêm
    //         savedList.push(newsId);
    //         await AsyncStorage.setItem("bookmark", JSON.stringify(savedList));
    //         setBookmark(true);
    //         Alert.alert("Thành công", "Tin đã được thêm vào mục yêu thích!");
    //     } catch (error) {
    //         console.error("Lỗi khi lưu bookmark:", error);
    //         Alert.alert("Lỗi", "Không thể xử lý mục yêu thích.");
    //     }
    // };

    //call api
    const toggleBookmark = async (news: NewsDataType) => {
        try {
            const token = await AsyncStorage.getItem("bookmark");
            let bookmarks: NewsDataType[] = token ? JSON.parse(token) : [];

            const isBookmarked = bookmarks.some(b => b.article_id === news.article_id);

            if (isBookmarked) {
                // Nếu đã bookmark thì xóa
                const updatedList = bookmarks.filter(b => b.article_id !== news.article_id);
                await AsyncStorage.setItem("bookmark", JSON.stringify(updatedList));
                setBookmark(false);
                Alert.alert("Thông báo", "Đã xóa khỏi mục yêu thích.");
            } else {
                // Nếu chưa bookmark thì thêm
                bookmarks.push(news);
                await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
                setBookmark(true);
                Alert.alert("Thành công", "Tin đã được thêm vào mục yêu thích!");
            }
        } catch (error) {
            console.error("Lỗi khi lưu bookmark:", error);
            Alert.alert("Lỗi", "Không thể xử lý mục yêu thích.");
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&id=${id}`;
                const response = await axios.get(URL);

                if (response && response.data && response.data.results?.length > 0) {
                    const article = response.data.results[0];
                    setNewsDetail(article);

                    //Kiểm tra xem đã bookmark chưa
                    const stored = await AsyncStorage.getItem("bookmark");
                    if (stored) {
                        const bookmarks: NewsDataType[] = JSON.parse(stored);
                        if (bookmarks.some(b => b.article_id === article.article_id)) {
                            setBookmark(true);
                        } else {
                            setBookmark(false);
                        }
                    } else {
                        setBookmark(false);
                    }
                } else {
                    setNewsDetail(null);
                }
            } catch (error) {
                console.log('Error fetching news detail:', error);
                setNewsDetail(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);


    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity>
                        <Ionicons name='arrow-back' size={22} onPress={() => router.back()} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => newsDetail && toggleBookmark(newsDetail)}>
                        <Ionicons name={bookmark ? 'heart' : 'heart-outline'} size={22} color={bookmark ? Colors.tint : 'black'} />
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