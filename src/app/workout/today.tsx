import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { ThemedView } from "../../components/core/themed-view";

export default function TodayWorkout() {
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    const colors = {
        background: isDarkMode ? "#121212" : "#F5F7FA",
        text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
        limeAccent: isDarkMode ? "#CCFF00" : "#9BCC00",
        cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    };

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ color: colors.text, fontSize: 24 }}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text }]}>TODAY WORKOUT</Text>
                {/* <View style={{ width: 24 }}></View> */}
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>Warm Up</Text>
                    <Text style={{ color: colors.text, opacity: 0.7, marginTop: 4 }}>5 Minutes • Light Stretching</Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>Bench Press</Text>
                    <Text style={{ color: colors.text, opacity: 0.7, marginTop: 4 }}>3 Sets • 10-12 Reps</Text>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60, // Adjust based on your safe area
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "900",
        fontStyle: "italic",
    },
    content: {
        padding: 20,
        gap: 16,
    },
    card: {
        padding: 20,
        borderRadius: 16,
    },
});
