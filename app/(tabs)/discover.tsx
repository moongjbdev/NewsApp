import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import useNewsCategories from '@/hooks/useNewsCategories'
import useNewsCountries from '@/hooks/useNewsCountries'
import { Link } from 'expo-router'


type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets()

  const { newsCategories, toggleNewsCategory } = useNewsCategories()
  const { newsCountries, toggleNewsCountry } = useNewsCountries()
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState<string[]>([])
  const [country, setCountry] = useState<string[]>([])



  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />
      <Text style={styles.title}>Thể Loại</Text>
      <View style={styles.listContainer}>
        {
          newsCategories.map((item, index) => (
            <CheckBox key={item.id}
              label={item.title}
              checked={item.selected}
              onPress={() => {
                toggleNewsCategory(item.id);
                setCategory(prev => {
                  if (item.selected) {
                    return prev.filter(slug => slug !== item.slug); // nếu đang selected → bỏ ra
                  } else {
                    return [...prev, item.slug]; // nếu đang bỏ → thêm vào
                  }
                });
              }}
            />
          ))
        }
      </View>
      <Text style={styles.title}>Quốc Gia</Text>
      <View style={styles.listContainer}>
        {
          newsCountries.map((item, index) => (
            <CheckBox key={index}
              label={item.name}
              checked={item.selected}
              onPress={() => {
                toggleNewsCountry(index);
                setCountry(prev => {
                  if (item.selected) {
                    return prev.filter(code => code !== item.code);
                  } else {
                    return [...prev, item.code];
                  }
                });

              }}
            />
          ))
        }
      </View>
      <Link style={styles.searchBtn} href={{
        pathname: `/news/search`,
        params: { query: searchQuery, category: category.join(','), country: country.join(',') }
      }} asChild>
        <TouchableOpacity >
          <Text style={styles.searchBtnTxt}>Tìm Kiếm</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 13,
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    // justifyContent: 'center'
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  }
})