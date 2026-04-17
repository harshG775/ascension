import React, { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { ThemedView } from "../../components/core/themed-view";

const Discover = () => {
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("STRENGTH");

    // Dynamically adjust the color palette based on the current mode
    const themeColors = useMemo(
        () => ({
            background: isDarkMode ? "#121212" : "#F5F7FA",
            cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
            searchBackground: isDarkMode ? "#1A1A1A" : "#E8EAED",
            limeAccent: isDarkMode ? "#CCFF00" : "#9BCC00",
            cyanAccent: isDarkMode ? "#00E0FF" : "#0096C7",
            redAccent: isDarkMode ? "#FF4B4B" : "#D90429",
            text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
            textSecondary: isDarkMode ? "#888888" : "#6E6E6E",
            pillInactiveBg: isDarkMode ? "#2A2A2A" : "#E0E5EC",
        }),
        [isDarkMode],
    );

    const styles = useMemo(() => getStyles(themeColors, isDarkMode), [themeColors, isDarkMode]);

    const categories = ["STRENGTH", "CARDIO", "STRETCHING", "YOGA", "PILATES"];

    const exercises = [
        {
            id: "1",
            title: "Diamond Pushups",
            level: "BEGINNER",
            target: "CHEST",
            color: themeColors.limeAccent,
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
        },
        {
            id: "2",
            title: "Barbell Squats",
            level: "ADVANCED",
            target: "QUADS",
            color: themeColors.cyanAccent,
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
        },
        {
            id: "3",
            title: "Sumo Deadlift",
            level: "INTERMEDIATE",
            target: "BACK",
            color: themeColors.redAccent,
            image: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "4",
            title: "Weighted Plank",
            level: "BEGINNER",
            target: "ABS",
            color: themeColors.limeAccent,
            image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&q=80",
        },
    ];

    return (
        <ThemedView style={styles.container}>
            {/* --- Search Bar --- */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search exercises..."
                    placeholderTextColor={themeColors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* --- Category Pills --- */}
            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryPill,
                                    isActive ? styles.categoryPillActive : styles.categoryPillInactive,
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        isActive ? styles.categoryTextActive : styles.categoryTextInactive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* --- Exercise Grid --- */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContent}>
                <View style={styles.gridContainer}>
                    {exercises.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.card}>
                            {/* Card Image area */}
                            <View style={styles.cardImageContainer}>
                                <Image source={{ uri: item.image }} style={styles.cardImage} />
                                {/* Dark overlay for better text readability */}
                                <View style={styles.cardImageOverlay} />

                                {/* Target Muscle Badge */}
                                <View style={styles.badgeContainer}>
                                    <View style={[styles.badgeBg, { backgroundColor: item.color }]} />
                                    <Text style={[styles.badgeText, { color: item.color }]}>{item.target}</Text>
                                </View>
                            </View>

                            {/* Card Info area */}
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={styles.cardLevel}>{item.level}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ThemedView>
    );
};

const getStyles = (colors: any, isDarkMode: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 30,
        },

        // --- Search Bar Styles ---
        searchContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.searchBackground,
            marginHorizontal: 16,
            marginTop: 16,
            marginBottom: 20,
            paddingHorizontal: 16,
            height: 50,
            borderRadius: 12,
        },
        searchIcon: {
            fontSize: 18,
            marginRight: 10,
            opacity: 0.7,
        },
        searchInput: {
            flex: 1,
            color: colors.text,
            fontSize: 16,
            fontWeight: "500",
        },

        // --- Category Pills Styles ---
        categoriesWrapper: {
            marginBottom: 20,
        },
        categoriesContainer: {
            paddingHorizontal: 16,
            gap: 12,
        },
        categoryPill: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        categoryPillActive: {
            backgroundColor: colors.limeAccent,
        },
        categoryPillInactive: {
            backgroundColor: colors.pillInactiveBg,
        },
        categoryText: {
            fontSize: 12,
            fontWeight: "800",
            letterSpacing: 0.5,
        },
        categoryTextActive: {
            color: "#121212", // Always dark on lime background
        },
        categoryTextInactive: {
            color: colors.textSecondary,
        },

        // --- Exercise Grid Styles ---
        gridContent: {
            paddingHorizontal: 16,
            paddingBottom: 40,
        },
        gridContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
        },
        card: {
            width: "48%", // Two columns with slight gap
            backgroundColor: colors.cardBackground,
            borderRadius: 16,
            marginBottom: 16,
            overflow: "hidden",
        },
        cardImageContainer: {
            width: "100%",
            height: 140,
            position: "relative",
        },
        cardImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        cardImageOverlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.2)", // Subtle darkening of the image
        },
        badgeContainer: {
            position: "absolute",
            bottom: 12,
            left: 12,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
            overflow: "hidden",
        },
        badgeBg: {
            ...StyleSheet.absoluteFillObject,
            opacity: 0.2, // Gives the badge a tinted background
        },
        badgeText: {
            fontSize: 10,
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: 0.5,
        },
        cardInfo: {
            padding: 12,
        },
        cardTitle: {
            fontSize: 14,
            fontWeight: "800",
            color: colors.text,
            marginBottom: 4,
        },
        cardLevel: {
            fontSize: 10,
            fontWeight: "600",
            color: colors.textSecondary,
            textTransform: "uppercase",
        },
    });

export default Discover;
