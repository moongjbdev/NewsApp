import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { PUBLIC_API_KEY } from '@/constants/Config'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'
import ErrorView from '@/components/ErrorView'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const { colors } = useTheme()
  const [breakingNewsData, setBreakingNewsData] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)

  //call api breaking news
  const getBreakingNews = async () => {
    try {
      setError(null)
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNewsData(response.data.results)
      }
    } catch (error: any) {
      console.log('Breaking news error:', error)
      setError('Không thể tải tin tức nổi bật')
    }
  }
  
  const getNews = async (category: string) => {
    try {
      setError(null)
      let categoryString = ''
      if (category.length !== 0) {
        categoryString = `&category=${category}`
      }
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=10${categoryString}`
      const response = await axios.get(URL)

      if (response && response.data) {
        setNews(response.data.results)
      }
    } catch (error: any) {
      console.log('News error:', error)
      setError('Không thể tải danh sách tin tức')
    }
  }

  const onCatChanged = (category: string) => {
    setNews([])
    getNews(category)
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setError(null)
    try {
      await Promise.all([getBreakingNews(), getNews('')])
    } catch (error) {
      console.log('Error refreshing:', error)
      setError('Không thể làm mới dữ liệu')
    } finally {
      setRefreshing(false)
    }
  }, [])

  const retryLoading = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await Promise.all([getBreakingNews(), getNews('')])
    } catch (error) {
      console.log('Error retrying:', error)
      setError('Không thể tải dữ liệu')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    retryLoading()
  }, [])

  if (error && !isLoading) {
    return (
      <View style={[styles.container, { paddingTop: safeTop, backgroundColor: colors.background }]}>
        <Header />
        <ErrorView message={error} onRetry={retryLoading} />
      </View>
    )
  }

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: safeTop, backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.tint}
          colors={[colors.tint]}
        />
      }
    >
      <Header />
      <SearchBar withHorizontalPadding={true} setSearchQuery={setSearchQuery} />
      {
        isLoading ? (
          <Loading size='large' />
        ) : (
          <BreakingNews newList={breakingNewsData} />
        )
      }
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})