import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { Link, router, Stack } from 'expo-router'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'
import { NewsDataType } from '@/types'
type Props = {}

const Page = (props: Props) => {
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

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => null,
      }} />
      <View style={styles.container}>
        {
          isLoading ? (
            <Loading size={'large'} />
          ) : (
            <FlatList data={bookmarkNews.filter(Boolean)}
              keyExtractor={(_, index) => `list_item${index}`}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <Link href={`/news/${item.article_id}`} asChild key={index}>
                    <TouchableOpacity>
                      <View>
                        <NewsItem item={item} />
                      </View>
                    </TouchableOpacity>
                  </Link>
                )
              }}
            >
            </FlatList>
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
    margin: 20
  },
})