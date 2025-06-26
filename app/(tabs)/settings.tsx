import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled((preState) => !preState)
  return (
    <>
      <Stack.Screen options={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => null,
      }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Về Chúng Tôi</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Gửi Phản Hồi</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Chính Sác Bảo Mật</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnTxt}>Điều Khoản Sử Dụng</Text>
          <MaterialIcons name='arrow-forward-ios' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch}>
          <Text style={styles.itemBtnTxt}>Chế Độ Tối</Text>
          <View style={styles.switchWrapper}>
            <Switch
              style={styles.switch}
              trackColor={{ false: '#767577', true: '#3e3e3e' }}
              thumbColor={isEnabled ? Colors.tint : Colors.lightGrey}
              ios_backgroundColor={Colors.lightGrey}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnTxt, { color: Colors.tint }]}>Đăng Xuất</Text>
          <MaterialIcons name='logout' size={16} color={Colors.tint} />
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
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1
  },
  itemBtnTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black
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