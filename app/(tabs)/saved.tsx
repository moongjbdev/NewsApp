import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Link, router, Stack } from 'expo-router'
import Loading from '@/components/Loading'
import NewsItem from '@/components/NewsItem'
import { NewsDataType } from '@/types'
import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

const Page = (props: Props) => {
  const { colors } = useTheme();
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      const fetchBookmark = async () => {
        setIsLoading(true);
        try {
          const token = await AsyncStorage.getItem('bookmark');
          if (token) {
            const res = JSON.parse(token);
            setBookmarkNews(Array.isArray(res) ? res : []);
          } else {
            setBookmarkNews([]);
          }
        } catch (error) {
          setBookmarkNews([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBookmark();
    }, [])
  );

  const renderNewsItem = ({ item }: { item: NewsDataType }) => (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity style={styles.newsItemContainer}>
        <NewsItem item={item} />
      </TouchableOpacity>
    </Link>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bookmark-outline" size={64} color={colors.lightGrey} />
      <Text style={[styles.emptyTitle, { color: colors.black }]}>
        Chưa có tin tức yêu thích
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.darkGrey }]}>
        Bạn có thể bookmark tin tức để đọc sau
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => null,
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTintColor: colors.black,
      }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {
          isLoading ? (
            <Loading size={'large'} />
          ) : (
            <FlatList 
              data={bookmarkNews.filter(Boolean)}
              keyExtractor={(item) => item.article_id}
              showsVerticalScrollIndicator={false}
              renderItem={renderNewsItem}
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={styles.listContainer}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              windowSize={10}
              initialNumToRender={5}
            />
          )
        }
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20
  },
  newsItemContainer: {
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  }
})