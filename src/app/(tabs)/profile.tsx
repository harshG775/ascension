import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { useThemeContext } from "../../components/contexts/theme-provider";
import { ThemedView } from "../../components/core/themed-view";

const AppPreferences = {
    padding: {
        container: 16,
        card: 16,
        row: 10,
    },
    borderRadius: {
        card: 20,
        profilePicture: 60,
    },
};

const Profile = () => {
    const { colors } = useThemeContext();
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    // Dynamically adjust the color palette based on the current mode
    const themeColors = useMemo(
        () => ({
            background: isDarkMode ? "#121212" : "#F5F7FA",
            cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
            limeAccent: isDarkMode ? "#CCFF00" : "#8CC63F", // Slightly darker lime for light mode contrast
            blueAccent: isDarkMode ? "#00E0FF" : "#0096C7", // Deeper blue for light mode contrast
            text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
            textSecondary: isDarkMode ? "#888888" : "#6E6E6E",
        }),
        [isDarkMode],
    );

    // Generate styles based on the active theme colors
    const styles = useMemo(() => getStyles(themeColors), [themeColors]);

    // --- Profile Header ---
    const renderProfileHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.profilePicWrapper}>
                <View style={styles.profileRing} />
                <Image
                    // REPLACE WITH YOUR OWN PROFILE PICTURE PATH
                    source={{
                        uri: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
                    }}
                    style={styles.profilePic}
                />
            </View>
            <View style={styles.profileDetail}>
                <Text style={styles.userName}>Bittu</Text>
                <Text style={styles.userContact}>alex.rivera@fitness.com</Text>
                <Text style={styles.userContact}>+91 (897) 123-4567</Text>
            </View>
        </View>
    );

    // --- User Bio Stats ---
    const renderBioStats = () => (
        <View style={styles.bioStatsCol}>
            <View style={styles.bioStatsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>AGE</Text>
                    <Text style={styles.statValue}>28</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>HEIGHT</Text>
                    <Text style={styles.statValue}>182 cm</Text>
                </View>
            </View>
            <View style={styles.bioStatsRow}>
                <View style={styles.statCard}>
                    <Text style={styles.statLabel}>WEIGHT</Text>
                    <Text style={styles.statValue}>84.5 kg</Text>
                </View>
                <View style={[styles.statCard, styles.goalStatCard]}>
                    <Text style={styles.statLabel}>GOAL</Text>
                    <Text style={[styles.statValue, { color: themeColors.blueAccent }]}>80.0 kg</Text>
                </View>
            </View>
        </View>
    );

    // --- Gamification Status ---
    const renderGamificationStatus = () => (
        <View style={styles.gamificationCard}>
            <View style={styles.gamificationHeader}>
                <Text style={styles.gamificationTitle}>GAMIFICATION STATUS</Text>
                <View style={styles.streakWrapper}>
                    <Text style={styles.streakIconText}>🔥</Text>
                    <Text style={styles.streakText}>12 DAY STREAK</Text>
                </View>
            </View>
            <View style={styles.scoreRow}>
                <View style={styles.smallCard}>
                    <Text style={styles.smallCardLabel}>LIFETIME SCORE</Text>
                    <Text style={[styles.smallCardValue, { color: themeColors.limeAccent }]}>245,800</Text>
                </View>
                <View style={styles.smallCard}>
                    <Text style={styles.smallCardLabel}>WORKOUTS DONE</Text>
                    <Text style={[styles.smallCardValue, { color: themeColors.blueAccent }]}>158</Text>
                </View>
            </View>
        </View>
    );

    // --- Activity History (Calendar) ---
    const renderActivityCalendar = () => {
        // Hardcoded active days pattern for representation
        const activeDays = [3, 4, 10, 11, 12, 17, 18, 24, 25, 26, 31];
        const calendarDays = 35; // Generic 5-week month grid

        return (
            <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                    <Text style={styles.historyTitle}>ACTIVITY HISTORY</Text>
                    <Text style={styles.calendarIconText}>🗓️</Text>
                </View>

                {/* Weekday Headers */}
                <View style={styles.weekdayHeadersRow}>
                    {["M", "T", "W", "Th", "F", "Sa", "Su"].map((day, idx) => (
                        <Text key={idx} style={styles.weekdayText}>
                            {day}
                        </Text>
                    ))}
                </View>

                {/* Calendar Grid */}
                <View style={styles.calendarGrid}>
                    {Array.from({ length: calendarDays }).map((_, index) => {
                        const dayNumber = index + 1;
                        const isActive = activeDays.includes(dayNumber);
                        return (
                            <View
                                key={index}
                                style={[styles.calendarDayBox, isActive && { backgroundColor: themeColors.limeAccent }]}
                            >
                                <Text
                                    style={[styles.dayText, isActive && { color: isDarkMode ? "#121212" : "#FFFFFF" }]}
                                >
                                    {dayNumber > 31 ? "" : dayNumber} {/* Simple month boundary */}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.activityKeyRow}>
                    <Text style={styles.activityKeyText}>Low Active</Text>
                    {/* Adding "30" to a hex code applies 30% opacity */}
                    <View style={[styles.keyBox, { backgroundColor: themeColors.limeAccent + "30" }]} />
                    <View style={[styles.keyBox, { backgroundColor: themeColors.limeAccent }]} />
                    <Text style={styles.activityKeyText}>High Active</Text>
                </View>
            </View>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Link href={"/settings"} style={styles.settingLink}>
                    <MaterialIcons name="settings" size={24} color={colors.mutedForeground} />
                </Link>
                {renderProfileHeader()}
                {renderBioStats()}
                {renderGamificationStatus()}
                {renderActivityCalendar()}
                <View style={{ height: 40 }}></View>
            </ScrollView>
        </ThemedView>
    );
};

// Helper function to dynamically generate styles based on the theme colors
const getStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            position: "relative",
        },
        scrollContent: {
            paddingHorizontal: AppPreferences.padding.container,
            paddingTop: 42,
        },

        // --- Profile Header Styles ---
        headerContainer: {
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 20,
            position: "relative",
            gap: 20,
        },
        profilePicWrapper: {
            width: 120,
            height: 120,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            position: "relative",
        },
        profileRing: {
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: AppPreferences.borderRadius.profilePicture,
            borderWidth: 4,
            borderColor: colors.limeAccent,
        },
        profilePic: {
            width: 110,
            height: 110,
            borderRadius: 55, // Inner radius to look nice with the ring
        },
        profileDetail: {
            display: "flex",
            flexDirection: "column",
        },

        userName: {
            fontSize: 24,
            fontWeight: "800", // Heavy bold
            color: colors.text,
            fontFamily: "sans-serif-condensed", // Example system condensed font
            marginBottom: 5,
        },
        userContact: {
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 5,
        },

        // --- Bio Stats Styles ---
        bioStatsCol: {
            display: "flex",
            flexDirection: "column",
            marginBottom: 24,
        },
        bioStatsRow: {
            display: "flex",
            flexDirection: "row",
            marginBottom: 5,
            gap: 5,
        },
        statCard: {
            backgroundColor: colors.cardBackground,
            flex: 1,
            borderRadius: AppPreferences.borderRadius.card,
            padding: AppPreferences.padding.card,
            alignItems: "center",
        },
        statLabel: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "700",
            marginBottom: 8,
        },
        statValue: {
            fontSize: 18,
            color: colors.text,
            fontWeight: "800",
        },
        goalStatCard: {
            // Can add special styling for goal card if needed
        },

        // --- Gamification Status Styles ---
        gamificationCard: {
            backgroundColor: colors.cardBackground,
            borderRadius: AppPreferences.borderRadius.card,
            padding: AppPreferences.padding.card,
            marginBottom: 24,
        },
        gamificationHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        gamificationTitle: {
            fontSize: 14,
            color: colors.textSecondary,
            fontWeight: "700",
        },
        streakWrapper: {
            flexDirection: "row",
            alignItems: "center",
        },
        streakIconText: {
            fontSize: 20,
            marginRight: 8,
        },
        streakText: {
            fontSize: 16,
            color: colors.limeAccent,
            fontWeight: "800",
            fontFamily: "sans-serif-condensed",
        },
        scoreRow: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        smallCard: {
            width: "48%",
            backgroundColor: colors.background, // Match background for separation
            borderRadius: AppPreferences.borderRadius.card,
            padding: AppPreferences.padding.card,
            alignItems: "center",
        },
        smallCardLabel: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "700",
            marginBottom: 8,
        },
        smallCardValue: {
            fontSize: 20,
            color: colors.text,
            fontWeight: "800",
        },

        // --- Activity History (Calendar) Styles ---
        historyCard: {
            backgroundColor: colors.cardBackground,
            borderRadius: AppPreferences.borderRadius.card,
            padding: AppPreferences.padding.card,
        },
        historyHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        historyTitle: {
            fontSize: 14,
            color: colors.textSecondary,
            fontWeight: "700",
        },
        calendarIconText: {
            fontSize: 24,
            color: colors.textSecondary,
        },
        weekdayHeadersRow: {
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: AppPreferences.padding.row,
            marginBottom: 10,
        },
        weekdayText: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "600",
            width: 20,
            textAlign: "center",
        },
        calendarGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingHorizontal: 5,
        },
        calendarDayBox: {
            width: 32,
            height: 32,
            borderRadius: 8,
            marginVertical: 4,
            marginHorizontal: 3,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.cardBackground, // Same as card by default
            borderWidth: 1,
            borderColor: colors.background, // Subtle borders for non-active days
        },
        dayText: {
            fontSize: 14,
            color: colors.textSecondary,
            fontWeight: "600",
        },
        activityKeyRow: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            paddingHorizontal: 10,
        },
        activityKeyText: {
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "600",
            marginHorizontal: 8,
        },
        keyBox: {
            width: 16,
            height: 16,
            borderRadius: 4,
            marginHorizontal: 3,
        },
        settingLink: {
            position: "absolute",
            right: 20,
            top: 42,
        },
    });

export default Profile;
