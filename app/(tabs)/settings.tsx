import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {}

const Page = (props: Props) => {
  const { colors, theme, toggleTheme } = useTheme();

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
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.black }]}>Về Chúng Tôi</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.black }]}>Gửi Phản Hồi</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.black }]}>Chính Sách Bảo Mật</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.black }]}>Điều Khoản Sử Dụng</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]} onPress={toggleTheme}>
          <Text style={[styles.itemBtnTxt, { color: colors.black }]}>Chế Độ Tối</Text>
          <View style={styles.switchWrapper}>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#767577', true: '#3e3e3e' }}
              thumbColor={theme === 'dark' ? colors.tint : colors.lightGrey}
              ios_backgroundColor={colors.lightGrey}
              onValueChange={toggleTheme}
              value={theme === 'dark'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemBtn, { backgroundColor: colors.cardBackground, borderBottomColor: colors.borderColor }]}>
          <Text style={[styles.itemBtnTxt, { color: colors.tint }]}>Đăng Xuất</Text>
          <MaterialIcons name='logout' size={16} color={colors.tint} />
        </TouchableOpacity>
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
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
  },
  switch: {
    transform: [{ scaleY: 0.8 }, { scaleX: 0.8 }],
    marginRight: -8
  },
  switchWrapper: {
    height: 14,
    justifyContent: 'center',
  }
})