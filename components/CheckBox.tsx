import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '@/components/SearchBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import { AntDesign } from '@expo/vector-icons'
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated'

type Props = {
    label: string,
    checked: boolean,
    onPress: () => void
}

const CheckBox = ({ label, checked, onPress }: Props) => {
    const { top: safeTop } = useSafeAreaInsets()
    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(checked ? "rgba(239,142,82,0.1)" : "transpatent", { duration: 100 }),
            borderColor: withTiming(checked ? Colors.tint : Colors.black, { duration: 100 }),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16
        }
    }, [checked])
    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, { duration: 100 }),
        }
    }, [checked])
    return (
        <Animated.View style={[styles.container, rnAnimatedContainerStyle]}
            onTouchEnd={onPress}
            layout={LinearTransition.springify().mass(0.8)}
        >
            <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
            {checked &&
                <Animated.View style={styles.iconWrapper} entering={FadeIn.duration(350)} exiting={FadeOut}>
                    <AntDesign name='checkcircle' size={14} color={Colors.tint} />
                </Animated.View>
            }
        </Animated.View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.black,
        paddingVertical: 8,
        // paddingHorizontal: 16,
        borderRadius: 32
    },
    label: {
        fontSize: 14,
        color: Colors.black
    },
    iconWrapper: {
        marginLeft: 8,
        height: 14,
        width: 14
    }

})