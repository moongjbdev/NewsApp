import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { PUBLIC_API_KEY } from '@env'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNewsData, setBreakingNewsData] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  //call api breaking news
  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNewsData(response.data.results)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  const getNews = async (category: string) => {
    try {
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
      console.log(error)
    }
  }

  const onCatChanged = (category: string) => {
    setNews([])
    getNews(category)
  }
  // call api khi vao
  // useEffect(() => {
  //   getBreakingNews()
  //   getNews()
  // }, [])
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true)
      await Promise.all([getBreakingNews(), getNews('')])
      setIsLoading(false)
    }
    fetchAll()
  }, [])
  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
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