import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

// Custom font family or weight can be defined here,
// defaulting to system fonts for compatibility.
const AppPreferences = {
    colors: {
        background: "#121212",
        cardBackground: "#1E1E1E",
        limeAccent: "#CCFF00", // for streak, score, profile ring
        blueAccent: "#00E0FF", // for goal, workouts done, pencil icon
        text: "#FFFFFF",
        textSecondary: "#888888",
    },
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

            <Text style={styles.userName}>Bittu</Text>
            <Text style={styles.userContact}>alex.rivera@fitness.com | +91 (897) 123-4567</Text>
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
                    <Text style={[styles.statValue, { color: AppPreferences.colors.blueAccent }]}>80.0 kg</Text>
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
                    <Text style={[styles.smallCardValue, { color: AppPreferences.colors.limeAccent }]}>245,800</Text>
                </View>
                <View style={styles.smallCard}>
                    <Text style={styles.smallCardLabel}>WORKOUTS DONE</Text>
                    <Text style={[styles.smallCardValue, { color: AppPreferences.colors.blueAccent }]}>158</Text>
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
                                style={[
                                    styles.calendarDayBox,
                                    isActive && { backgroundColor: AppPreferences.colors.limeAccent },
                                ]}
                            >
                                <Text style={[styles.dayText, isActive && { color: AppPreferences.colors.background }]}>
                                    {dayNumber > 31 ? "" : dayNumber} {/* Simple month boundary */}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Activity Key */}
                <View style={styles.activityKeyRow}>
                    <Text style={styles.activityKeyText}>Low Active</Text>
                    <View style={[styles.keyBox, { backgroundColor: AppPreferences.colors.limeAccent + "30" }]} />
                    <View style={[styles.keyBox, { backgroundColor: AppPreferences.colors.limeAccent }]} />
                    <Text style={styles.activityKeyText}>High Active</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {renderProfileHeader()}
            {renderBioStats()}
            {renderGamificationStatus()}
            {renderActivityCalendar()}
            <View style={{ height: 40 }}></View> {/* Bottom padding */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppPreferences.colors.background,
        paddingHorizontal: AppPreferences.padding.container,
    },

    // --- Profile Header Styles ---
    headerContainer: {
        alignItems: "center",
        display: "flex",
        paddingVertical: 30,
        position: "relative",
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
        borderColor: AppPreferences.colors.limeAccent,
    },
    profilePic: {
        width: 110,
        height: 110,
        borderRadius: 55, // Inner radius to look nice with the ring
    },

    userName: {
        fontSize: 24,
        fontWeight: "800", // Heavy bold
        color: AppPreferences.colors.text,
        fontFamily: "sans-serif-condensed", // Example system condensed font
        marginBottom: 5,
    },
    userContact: {
        fontSize: 14,
        color: AppPreferences.colors.textSecondary,
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
        backgroundColor: AppPreferences.colors.cardBackground,
        flex: 1,
        borderRadius: AppPreferences.borderRadius.card,
        padding: AppPreferences.padding.card,
        alignItems: "center",
    },
    statLabel: {
        fontSize: 12,
        color: AppPreferences.colors.textSecondary,
        fontWeight: "700",
        marginBottom: 8,
    },
    statValue: {
        fontSize: 18,
        color: AppPreferences.colors.text,
        fontWeight: "800",
    },
    goalStatCard: {
        // Can add special styling for goal card if needed
    },

    // --- Gamification Status Styles ---
    gamificationCard: {
        backgroundColor: AppPreferences.colors.cardBackground,
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
        color: AppPreferences.colors.textSecondary,
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
        color: AppPreferences.colors.limeAccent,
        fontWeight: "800",
        fontFamily: "sans-serif-condensed",
    },
    scoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    smallCard: {
        width: "48%",
        backgroundColor: AppPreferences.colors.background, // Match background for separation
        borderRadius: AppPreferences.borderRadius.card,
        padding: AppPreferences.padding.card,
        alignItems: "center",
    },
    smallCardLabel: {
        fontSize: 12,
        color: AppPreferences.colors.textSecondary,
        fontWeight: "700",
        marginBottom: 8,
    },
    smallCardValue: {
        fontSize: 20,
        color: AppPreferences.colors.text,
        fontWeight: "800",
    },

    // --- Activity History (Calendar) Styles ---
    historyCard: {
        backgroundColor: AppPreferences.colors.cardBackground,
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
        color: AppPreferences.colors.textSecondary,
        fontWeight: "700",
    },
    calendarIconText: {
        fontSize: 24,
        color: AppPreferences.colors.textSecondary,
    },
    weekdayHeadersRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: AppPreferences.padding.row,
        marginBottom: 10,
    },
    weekdayText: {
        fontSize: 12,
        color: AppPreferences.colors.textSecondary,
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
        backgroundColor: AppPreferences.colors.cardBackground, // Same as card by default
        borderWidth: 1,
        borderColor: AppPreferences.colors.background, // Subtle borders for non-active days
    },
    dayText: {
        fontSize: 14,
        color: AppPreferences.colors.textSecondary,
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
        color: AppPreferences.colors.textSecondary,
        fontWeight: "600",
        marginHorizontal: 8,
    },
    keyBox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        marginHorizontal: 3,
    },
});

export default Profile;
