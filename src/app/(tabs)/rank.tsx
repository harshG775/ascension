import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { ThemedView } from "../../components/core/themed-view";

const Rank = () => {
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";
    const [timeframe, setTimeframe] = useState("WEEKLY"); // 'WEEKLY' or 'ALL-TIME'

    // Dynamically adjust the color palette based on the current mode
    const themeColors = useMemo(
        () => ({
            background: isDarkMode ? "#121212" : "#F5F7FA",
            cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
            podiumBackground: isDarkMode ? "#1A1A1A" : "#E8EAED",
            limeAccent: isDarkMode ? "#CCFF00" : "#9BCC00", // Slightly deeper lime for light mode text contrast
            cyanAccent: isDarkMode ? "#00E0FF" : "#0096C7",
            redAccent: isDarkMode ? "#FF4B4B" : "#D90429",
            text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
            textSecondary: isDarkMode ? "#888888" : "#6E6E6E",
            toggleBg: isDarkMode ? "#2A2A2A" : "#E0E5EC",
            footerText: isDarkMode ? "#121212" : "#FFFFFF", // High contrast text for the bright footer
        }),
        [isDarkMode],
    );

    const styles = useMemo(() => getStyles(themeColors), [themeColors]);

    // Mock Data for the Leaderboard
    const topThree = [
        {
            id: "2",
            name: "Sarah J.",
            score: "12.4k",
            rank: 2,
            color: themeColors.cyanAccent,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        },
        {
            id: "1",
            name: "Mike Ross",
            score: "15.8k",
            rank: 1,
            color: themeColors.limeAccent,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
        },
        {
            id: "3",
            name: "Leo R.",
            score: "10.1k",
            rank: 3,
            color: themeColors.redAccent,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        },
    ];

    const runnerUps = [
        {
            id: "4",
            name: "Elena Gilbert",
            streak: "12 DAY STREAK",
            score: "9,450",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
        },
        {
            id: "5",
            name: "Marcus V.",
            streak: "8 DAY STREAK",
            score: "8,200",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
        },
    ];

    return (
        <ThemedView style={styles.container}>
            {/* --- Header Section --- */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>LEADERBOARD</Text>
                    <Text style={styles.headerSubtitle}>GLOBAL RANKINGS</Text>
                </View>

                {/* Toggle Switch */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, timeframe === "WEEKLY" && styles.toggleActive]}
                        onPress={() => setTimeframe("WEEKLY")}
                    >
                        <Text style={[styles.toggleText, timeframe === "WEEKLY" && styles.toggleTextActive]}>
                            WEEKLY
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, timeframe === "ALL-TIME" && styles.toggleActive]}
                        onPress={() => setTimeframe("ALL-TIME")}
                    >
                        <Text style={[styles.toggleText, timeframe === "ALL-TIME" && styles.toggleTextActive]}>
                            ALL-TIME
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* --- Podium Section (Top 3) --- */}
                <View style={styles.podiumContainer}>
                    {topThree.map((user, index) => (
                        <View key={user.id} style={styles.podiumColumn}>
                            {/* Avatar & Rank Badge */}
                            <View style={styles.avatarWrapper}>
                                <View style={[styles.avatarRing, { borderColor: user.color }]} />
                                <Image source={{ uri: user.avatar }} style={styles.podiumAvatar} />
                                <View style={[styles.rankBadge, { backgroundColor: user.color }]}>
                                    <Text style={styles.rankBadgeText}>{user.rank}</Text>
                                </View>
                            </View>

                            {/* Podium Bar */}
                            <View
                                style={[
                                    styles.podiumBar,
                                    user.rank === 1
                                        ? styles.podiumBarFirst
                                        : user.rank === 2
                                          ? styles.podiumBarSecond
                                          : styles.podiumBarThird,
                                ]}
                            >
                                <Text style={styles.podiumName} numberOfLines={1}>
                                    {user.name}
                                </Text>
                                <Text style={[styles.podiumScore, { color: user.color }]}>{user.score}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* --- List Section (Ranks 4+) --- */}
                <View style={styles.listContainer}>
                    {runnerUps.map((user, index) => (
                        <View key={user.id} style={styles.listItem}>
                            <Text style={styles.listRank}>{user.id}</Text>
                            <Image source={{ uri: user.avatar }} style={styles.listAvatar} />
                            <View style={styles.listInfo}>
                                <Text style={styles.listName}>{user.name}</Text>
                                <Text style={styles.listStreak}>{user.streak}</Text>
                            </View>
                            <View style={styles.listScoreContainer}>
                                <Text style={styles.listScore}>{user.score}</Text>
                                <Text style={styles.listScoreLabel}>POINTS</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* --- Sticky Footer (Current User) --- */}
            <View style={styles.stickyFooter}>
                <Text style={styles.footerRank}>24</Text>
                <Image
                    source={{ uri: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=150&q=80" }}
                    style={styles.footerAvatar}
                />
                <View style={styles.footerInfo}>
                    <Text style={styles.footerName}>YOU (BITTU)</Text>
                    <Text style={styles.footerSubtitle}>TOP 15% OF ATHLETES</Text>
                </View>
                <View style={styles.footerScoreContainer}>
                    <Text style={styles.footerScore}>4,250</Text>
                    {/* Placeholder for trending icon */}
                    <Text style={styles.footerTrend}>📈</Text>
                </View>
            </View>
        </ThemedView>
    );
};

const getStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 20,
        },
        scrollContent: {
            paddingBottom: 100, // Space for the sticky footer
        },

        // --- Header Styles ---
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 30,
        },
        headerTitle: {
            fontSize: 24,
            fontWeight: "900",
            color: colors.text,
            fontStyle: "italic",
        },
        headerSubtitle: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "600",
            letterSpacing: 1,
            marginTop: 2,
        },
        toggleContainer: {
            flexDirection: "row",
            backgroundColor: colors.toggleBg,
            borderRadius: 20,
            padding: 4,
        },
        toggleButton: {
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 16,
        },
        toggleActive: {
            backgroundColor: colors.limeAccent,
        },
        toggleText: {
            fontSize: 10,
            fontWeight: "800",
            color: colors.textSecondary,
        },
        toggleTextActive: {
            color: "#121212", // Always dark on the lime background
        },

        // --- Podium Styles ---
        podiumContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            marginTop: 5,
            marginBottom: 30,
            gap: 10,
        },
        podiumColumn: {
            alignItems: "center",
            flex: 1,
        },
        avatarWrapper: {
            position: "relative",
            marginBottom: -20, // Overlap the podium bar
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        avatarRing: {
            position: "absolute",
            width: 68,
            height: 68,
            borderRadius: 34,
            borderWidth: 3,
        },
        podiumAvatar: {
            width: 60,
            height: 60,
            borderRadius: 30,
        },
        rankBadge: {
            position: "absolute",
            top: -5,
            right: -5,
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: colors.background, // Match background to cut out
        },
        rankBadgeText: {
            color: "#FFFFFF", // Assuming badges are vibrant enough for white text
            fontSize: 12,
            fontWeight: "bold",
        },
        podiumBar: {
            backgroundColor: colors.podiumBackground,
            width: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingTop: 30,
            paddingBottom: 15,
            alignItems: "center",
        },
        podiumBarFirst: {
            height: 140,
        },
        podiumBarSecond: {
            height: 110,
        },
        podiumBarThird: {
            height: 90,
        },
        podiumName: {
            fontSize: 12,
            fontWeight: "700",
            color: colors.text,
            marginBottom: 4,
        },
        podiumScore: {
            fontSize: 16,
            fontWeight: "900",
        },

        // --- List Styles ---
        listContainer: {
            paddingHorizontal: 20,
            gap: 12,
        },
        listItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.cardBackground,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 16,
        },
        listRank: {
            fontSize: 16,
            fontWeight: "700",
            color: colors.textSecondary,
            width: 24,
        },
        listAvatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 12,
        },
        listInfo: {
            flex: 1,
        },
        listName: {
            fontSize: 14,
            fontWeight: "700",
            color: colors.text,
        },
        listStreak: {
            fontSize: 10,
            color: colors.textSecondary,
            fontWeight: "600",
            marginTop: 2,
        },
        listScoreContainer: {
            alignItems: "flex-end",
        },
        listScore: {
            fontSize: 16,
            fontWeight: "800",
            color: colors.text,
        },
        listScoreLabel: {
            fontSize: 9,
            color: colors.textSecondary,
            fontWeight: "700",
        },

        // --- Sticky Footer Styles ---
        stickyFooter: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: colors.limeAccent,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 24,
            elevation: 5, // Android shadow
            shadowColor: "#000", // iOS shadow
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
        },
        footerRank: {
            fontSize: 18,
            fontWeight: "800",
            color: colors.footerText,
            width: 30,
        },
        footerAvatar: {
            width: 44,
            height: 44,
            borderRadius: 22,
            marginRight: 12,
            borderWidth: 2,
            borderColor: colors.background,
        },
        footerInfo: {
            flex: 1,
        },
        footerName: {
            fontSize: 14,
            fontWeight: "900",
            color: colors.footerText,
            fontStyle: "italic",
        },
        footerSubtitle: {
            fontSize: 10,
            fontWeight: "700",
            color: colors.footerText,
            opacity: 0.8,
            marginTop: 2,
        },
        footerScoreContainer: {
            alignItems: "flex-end",
        },
        footerScore: {
            fontSize: 18,
            fontWeight: "900",
            color: colors.footerText,
        },
        footerTrend: {
            fontSize: 14,
            marginTop: 2,
        },
    });

export default Rank;
