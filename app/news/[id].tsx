import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, findNodeHandle, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PUBLIC_API_KEY } from '@/constants/Config'
import axios from 'axios'
import Loading from '@/components/Loading'
import { getFakeContentByCategory } from '@/constants/ContentFake'
import Moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '@/contexts/ThemeContext'
import BookmarkButton from '@/components/BookmarkButton'

type Props = {
    newsList: NewsDataType | null
}

const NewsList = ({ newsList }: Props) => {
    const { colors } = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>()
    const [newsDetail, setNewsDetail] = useState<NewsDataType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                console.log('Fetching news detail for id:', id);
                const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&id=${id}`;
                console.log('API URL:', URL);
                const response = await axios.get(URL);

                console.log('API Response:', response.data);
                if (response && response.data && response.data.results?.length > 0) {
                    const article = response.data.results[0];
                    console.log('Found article:', article.title);
                    setNewsDetail(article);
                } else {
                    console.log('No results found for id:', id);
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

    const handleOpenLink = () => {
        if (newsDetail?.link) {
            Linking.openURL(newsDetail.link);
        }
    };

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} color={colors.black} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    newsDetail && <BookmarkButton newsItem={newsDetail} size={22} />
                ),
                title: '',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: colors.cardBackground,
                },
                headerTintColor: colors.black,
            }} />
            {
                isLoading ? (
                    <Loading size={'large'} />
                ) : newsDetail ? (
                    <ScrollView 
                        style={[styles.container, { backgroundColor: colors.background }]} 
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={[styles.title, { color: colors.black }]}>
                            {newsDetail.title}
                        </Text>
                        <View style={styles.newInfoWrapper}>
                            <Text style={[styles.newInfo, { color: colors.darkGrey }]}>
                                {Moment(newsDetail.pubDate).format('MMMM DD, hh:mm')}
                            </Text>
                            <Text style={[styles.newInfo, { color: colors.darkGrey }]}>
                                {newsDetail.source_name}
                            </Text>
                        </View>
                        <Image 
                            source={{ uri: newsDetail.image_url }} 
                            style={styles.newImage}
                            resizeMode="cover"
                        />
                        <Text style={[styles.newContent, { color: colors.black }]}>
                            {(getFakeContentByCategory(newsDetail.category[0] || "")) || newsDetail.description}
                        </Text>
                        
                        {newsDetail.link && (
                            <TouchableOpacity 
                                style={[styles.readMoreButton, { backgroundColor: colors.tint }]}
                                onPress={handleOpenLink}
                            >
                                <Text style={[styles.readMoreText, { color: colors.white }]}>
                                    Đọc bài viết gốc
                                </Text>
                                <Ionicons name="open-outline" size={16} color={colors.white} />
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                ) : (
                    <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
                        <Ionicons name="alert-circle-outline" size={64} color={colors.lightGrey} />
                        <Text style={[styles.errorText, { color: colors.black }]}>
                            Không thể tải chi tiết tin tức
                        </Text>
                    </View>
                )
            }
        </>
    )
}

export default NewsList

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        marginHorizontal: 20,
        paddingBottom: 30
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10,
        letterSpacing: 0.6,
        lineHeight: 26,
    },
    newImage: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
    },
    newInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    newInfo: {
        fontSize: 12,
    },
    newContent: {
        fontSize: 16,
        letterSpacing: 0.8,
        lineHeight: 26,
        marginBottom: 20,
    },
    readMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        gap: 8,
        marginTop: 10,
    },
    readMoreText: {
        fontSize: 14,
        fontWeight: '600',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 24,
    }
})