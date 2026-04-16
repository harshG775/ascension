import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Link, Tabs } from "expo-router";
import React from "react";
import { useThemeContext } from "../../components/contexts/theme-provider";
export default function Layout() {
    const { colors } = useThemeContext();
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon(props) {
                        return <Entypo name="home" size={props.size} color={props.color} />;
                    },
                    title: "Home",
                }}
            />
            <Tabs.Screen
                name="body"
                options={{
                    tabBarIcon(props) {
                        return <Octicons name="pulse" size={props.size} color={props.color} />;
                    },
                    title: "Body",
                }}
            />
            <Tabs.Screen
                name="discover"
                options={{
                    tabBarIcon(props) {
                        return <FontAwesome5 name="search" size={props.size} color={props.color} />;
                    },
                    title: "Search",
                }}
            />
            <Tabs.Screen
                name="rank"
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <FontAwesome6 name="ranking-star" size={props.size} color={props.color} />;
                    },
                    title: "Rank",
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon(props) {
                        return <Feather name="user" size={props.size} color={props.color} />;
                    },
                    title: "Profile",
                    headerRight() {
                        return (
                            <Link href={"/settings"} style={{ paddingRight: 10 }}>
                                <MaterialIcons name="settings" size={24} color={colors.mutedForeground} />
                            </Link>
                        );
                    },
                }}
            />
        </Tabs>
    );
}
