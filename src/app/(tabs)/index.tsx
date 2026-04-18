import { Link } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { ThemedView } from "../../components/core/themed-view";

// --- TypeScript Interfaces ---
interface ThemeColors {
    background: string;
    cardBackground: string;
    limeAccent: string;
    cyanAccent: string;
    text: string;
    textSecondary: string;
    pillInactiveBg: string;
}

export default function Index() {
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    // Select the current active day (mocked as 15 for this example)
    const [selectedDate, setSelectedDate] = useState(15);

    // Dynamically adjust the color palette
    const themeColors = useMemo<ThemeColors>(
        () => ({
            background: isDarkMode ? "#121212" : "#F5F7FA",
            cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
            limeAccent: isDarkMode ? "#CCFF00" : "#9BCC00",
            cyanAccent: isDarkMode ? "#00E0FF" : "#0096C7",
            text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
            textSecondary: isDarkMode ? "#888888" : "#6E6E6E",
            pillInactiveBg: isDarkMode ? "#2A2A2A" : "#E8EAED",
        }),
        [isDarkMode],
    );

    const styles = useMemo(() => getStyles(themeColors), [themeColors]);

    // Mock data for the horizontal calendar (Current Week)
    const weekDates = [
        { day: "Mon", date: 12 },
        { day: "Tue", date: 13 },
        { day: "Wed", date: 14 },
        { day: "Thu", date: 15 }, // Today
        { day: "Fri", date: 16 },
        { day: "Sat", date: 17 },
        { day: "Sun", date: 18 },
    ];

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* --- Header Area --- */}
                <View style={styles.header}>
                    <Text style={styles.greeting}>READY TO SWEAT,</Text>
                    <Text style={styles.userName}>BITTU?</Text>
                </View>

                {/* --- Horizontal Calendar --- */}
                <View style={styles.calendarContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.calendarScroll}
                    >
                        {weekDates.map((item) => {
                            const isActive = item.date === selectedDate;
                            return (
                                <TouchableOpacity
                                    key={item.date}
                                    style={[styles.dateBox, isActive ? styles.dateBoxActive : styles.dateBoxInactive]}
                                    onPress={() => setSelectedDate(item.date)}
                                >
                                    <Text style={[styles.dayText, isActive ? styles.textActive : styles.textInactive]}>
                                        {item.day}
                                    </Text>
                                    <Text style={[styles.dateText, isActive ? styles.textActive : styles.textInactive]}>
                                        {item.date}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* --- Main Action Area (Start Button & Streak) --- */}
                <View style={styles.actionContainer}>
                    {/* Streak Info */}
                    <View style={styles.streakWrapper}>
                        <Text style={styles.streakIcon}>🔥</Text>
                        <Text style={styles.streakText}>DAY 4 STREAK</Text>
                    </View>
                    {/* Circular Start Button */}
                    <Link href="/workout/today" asChild>
                        <TouchableOpacity style={styles.circularButton} activeOpacity={0.8}>
                            <View style={styles.circularButtonInner}>
                                <Text style={styles.startButtonText}>START</Text>
                                <Text style={styles.startButtonSubText}>WORKOUT</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <Text style={styles.goalText}>Daily Goal: 0 / 500 kcal</Text>
                </View>

                {/* --- Value Add: Today's Plan Card --- */}
                <View style={styles.todaysPlanContainer}>
                    <View style={styles.planHeader}>
                        <Text style={styles.planTitle}>TODAY PLAN</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.planCard}>
                        <View style={styles.planIconWrapper}>
                            <Text style={styles.planIcon}>💪</Text>
                        </View>
                        <View style={styles.planInfo}>
                            <Text style={styles.planName}>Upper Body Power</Text>
                            <Text style={styles.planDetails}>45 mins • Intermediate • 6 Exercises</Text>
                        </View>
                        <View style={styles.playIconWrapper}>
                            <Text style={styles.playIcon}>▶</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 30,
        },
        scrollContent: {
            paddingBottom: 40,
        },

        // --- Header Styles ---
        header: {
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
        },
        greeting: {
            fontSize: 14,
            fontWeight: "700",
            color: colors.textSecondary,
            letterSpacing: 1,
            marginBottom: 4,
        },
        userName: {
            fontSize: 28,
            fontWeight: "900",
            color: colors.text,
            fontStyle: "italic",
            letterSpacing: 1,
        },

        // --- Calendar Styles ---
        calendarContainer: {
            marginTop: 10,
            marginBottom: 30,
        },
        calendarScroll: {
            paddingHorizontal: 16,
            gap: 12, // Space between items
        },
        dateBox: {
            width: 55,
            height: 70,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            // Fallback for older RN versions without gap support
            marginHorizontal: 6,
        },
        dateBoxActive: {
            backgroundColor: colors.limeAccent,
        },
        dateBoxInactive: {
            backgroundColor: colors.pillInactiveBg,
        },
        dayText: {
            fontSize: 12,
            fontWeight: "700",
            marginBottom: 4,
        },
        dateText: {
            fontSize: 18,
            fontWeight: "900",
        },
        textActive: {
            color: "#121212",
        },
        textInactive: {
            color: colors.textSecondary,
        },

        // --- Action Container (Start Button & Streak) ---
        actionContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
        },
        streakWrapper: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.pillInactiveBg,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginBottom: 30,
        },
        streakIcon: {
            fontSize: 16,
            marginRight: 6,
        },
        streakText: {
            fontSize: 12,
            fontWeight: "800",
            color: colors.text,
            letterSpacing: 1,
        },

        // Circular Button Styles
        circularButton: {
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: colors.limeAccent + "30", // 30% opacity for an outer glow effect
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
        },
        circularButtonInner: {
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: colors.limeAccent,
            justifyContent: "center",
            alignItems: "center",
            elevation: 10, // Drop shadow for Android
            shadowColor: colors.limeAccent, // Glow shadow for iOS
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
        },
        startButtonText: {
            fontSize: 28,
            fontWeight: "900",
            color: "#121212", // Always dark for contrast against lime
            fontStyle: "italic",
            letterSpacing: 2,
        },
        startButtonSubText: {
            fontSize: 10,
            fontWeight: "800",
            color: "#121212",
            opacity: 0.7,
            letterSpacing: 1,
            marginTop: -2,
        },
        goalText: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "600",
        },

        // --- Today's Plan Styles ---
        todaysPlanContainer: {
            paddingHorizontal: 20,
            marginTop: 10,
        },
        planHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 16,
        },
        planTitle: {
            fontSize: 16,
            fontWeight: "800",
            color: colors.text,
            letterSpacing: 1,
        },
        seeAllText: {
            fontSize: 12,
            fontWeight: "700",
            color: colors.cyanAccent,
        },
        planCard: {
            backgroundColor: colors.cardBackground,
            borderRadius: 20,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
        },
        planIconWrapper: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.pillInactiveBg,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 16,
        },
        planIcon: {
            fontSize: 24,
        },
        planInfo: {
            flex: 1,
        },
        planName: {
            fontSize: 16,
            fontWeight: "800",
            color: colors.text,
            marginBottom: 4,
        },
        planDetails: {
            fontSize: 10,
            fontWeight: "600",
            color: colors.textSecondary,
        },
        playIconWrapper: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.limeAccent,
            justifyContent: "center",
            alignItems: "center",
        },
        playIcon: {
            fontSize: 12,
            color: "#121212",
            marginLeft: 2, // Slightly offset the play triangle to look centered
        },
    });
