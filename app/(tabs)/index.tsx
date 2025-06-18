import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { PUBLIC_API_KEY } from '@env'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'

type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNewsData, setBreakingNewsData] = useState<NewsDataType[]>([])
  //call api breaking news
  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/latest?apikey=${PUBLIC_API_KEY}&language=vi&country=vi&image=1&removeduplicate=1&size=5`
      // const URL = `https://newsdata.io/api/1/latest?apikey=pub_04287d7f849f46f49c6930e83efb780b&language=vi&country=vi&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)

      if (response && response.data) {
        setBreakingNewsData(response.data.results)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  // call api khi vao
  useEffect(() => {
    getBreakingNews()
  }, [])
  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      <BreakingNews newList={breakingNewsData} />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})