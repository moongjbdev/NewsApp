import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"

type Props = {}
const Header = (props: Props) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://lh3.googleusercontent.com/a/ACg8ocKQE4a7G887iun8pb0Z-yeaqv92pLSHX1WE_OETLZQFiteV6PI=s288-c-no" }} style={styles.userImage} />

            <TouchableOpacity onPress={() => { }}>

            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={Colors.black} />
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,

    }
})