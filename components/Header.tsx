import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

// type Props = {}
const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image source={{ uri: "https://lh3.googleusercontent.com/a/ACg8ocKQE4a7G887iun8pb0Z-yeaqv92pLSHX1WE_OETLZQFiteV6PI=s288-c-no" }} style={styles.userImage} />
                <View style={{ gap: 2 }}>
                    <Text style={styles.welcomeText}>
                        Xin chào!
                    </Text>
                    <Text style={styles.usernameText}>
                        Khánh Minh Bùi
                    </Text>
                </View>
            </View>


            <TouchableOpacity onPress={() => { }}>

            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={Colors.black} />
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    welcomeText: {
        fontSize: 12,
        color: Colors.darkGrey
    },
    usernameText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.black
    }
})