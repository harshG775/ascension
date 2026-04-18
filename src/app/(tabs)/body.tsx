import React, { useMemo, useState } from "react";
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeModeContext } from "../../components/contexts/theme-mode-provider";
import { ThemedView } from "../../components/core/themed-view";

// --- TypeScript Interfaces ---
type Side = "FRONT" | "BACK";

interface ThemeColors {
    background: string;
    cardBackground: string;
    limeAccent: string;
    text: string;
    textSecondary: string;
    toggleBg: string;
    buttonInactiveBg: string;
}

const Body = () => {
    const { mode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    // Strictly typed state
    const [activeSide, setActiveSide] = useState<Side>("FRONT");
    const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

    // Dynamically adjust the color palette
    const themeColors = useMemo<ThemeColors>(
        () => ({
            background: isDarkMode ? "#121212" : "#F5F7FA",
            cardBackground: isDarkMode ? "#1E1E1E" : "#FFFFFF",
            limeAccent: isDarkMode ? "#CCFF00" : "#9BCC00",
            text: isDarkMode ? "#FFFFFF" : "#1A1A1A",
            textSecondary: isDarkMode ? "#888888" : "#6E6E6E",
            toggleBg: isDarkMode ? "#2A2A2A" : "#E0E5EC",
            buttonInactiveBg: isDarkMode ? "#2A2A2A" : "#E8EAED",
        }),
        [isDarkMode],
    );

    const styles = useMemo(() => getStyles(themeColors), [themeColors]);

    // --- Data Models ---

    const anatomyImages: Record<Side, ImageSourcePropType> = {
        FRONT: require("../../assets/charts/front.jpeg"),
        BACK: require("../../assets/charts/back.jpeg"),
    };

    // Updated to use local image assets instead of external URIs
    const muscles = [
        { id: "chest", name: "CHEST", image: require("../../assets/charts/chest.jpeg") },
        { id: "back", name: "BACK", image: require("../../assets/charts/back-muscles.jpeg") },
        { id: "abs", name: "ABS", image: require("../../assets/charts/abs.jpeg") },
        { id: "biceps", name: "BICEPS", image: require("../../assets/charts/biceps.jpeg") },
        { id: "triceps", name: "TRICEPS", image: require("../../assets/charts/triceps.jpeg") },
        { id: "shoulders", name: "SHOULDERS", image: require("../../assets/charts/shoulder.jpeg") },
        { id: "legs", name: "LEGS", image: require("../../assets/charts/legs.jpeg") },
        { id: "forearms", name: "FOREARMS", image: require("../../assets/charts/forearms.jpeg") },
    ];

    // --- Handlers ---

    // Type is now restricted to "FRONT" or "BACK" instead of 'any'
    const handleTabSwitch = (side: Side) => {
        setActiveSide(side);
        setSelectedMuscle(null);
    };

    // Determine what image to show: The specific muscle, or the general anatomy
    const currentImage = selectedMuscle
        ? muscles.find((m) => m.id === selectedMuscle)?.image
        : anatomyImages[activeSide];

    // Determine title for the image overlay
    const currentTitle = selectedMuscle ? muscles.find((m) => m.id === selectedMuscle)?.name : `${activeSide} ANATOMY`;

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* --- Header & Toggle --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>MUSCLE GUIDE</Text>
                        <Text style={styles.headerSubtitle}>LEARN YOUR BODY</Text>
                    </View>

                    <View style={styles.toggleContainer}>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                activeSide === "FRONT" && !selectedMuscle && styles.toggleActive,
                            ]}
                            onPress={() => handleTabSwitch("FRONT")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeSide === "FRONT" && !selectedMuscle && styles.toggleTextActive,
                                ]}
                            >
                                FRONT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.toggleButton,
                                activeSide === "BACK" && !selectedMuscle && styles.toggleActive,
                            ]}
                            onPress={() => handleTabSwitch("BACK")}
                        >
                            <Text
                                style={[
                                    styles.toggleText,
                                    activeSide === "BACK" && !selectedMuscle && styles.toggleTextActive,
                                ]}
                            >
                                BACK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Main Image Viewer --- */}
                <View style={styles.imageViewerContainer}>
                    {/* BUG FIX: Passed currentImage directly to source. Removed {{ uri: ... }} wrapper */}
                    <Image source={currentImage} style={styles.mainImage} />
                    <View style={styles.imageOverlay}>
                        <Text style={styles.imageOverlayText}>{currentTitle}</Text>
                    </View>
                </View>

                {/* --- Muscle Selection Grid --- */}
                <View style={styles.musclesSection}>
                    <Text style={styles.sectionTitle}>SELECT A MUSCLE</Text>

                    <View style={styles.gridContainer}>
                        {muscles.map((muscle) => {
                            const isSelected = selectedMuscle === muscle.id;
                            return (
                                <TouchableOpacity
                                    key={muscle.id}
                                    style={[
                                        styles.muscleButton,
                                        isSelected ? styles.muscleButtonActive : styles.muscleButtonInactive,
                                    ]}
                                    onPress={() => setSelectedMuscle(muscle.id)}
                                >
                                    <Text
                                        style={[
                                            styles.muscleButtonText,
                                            isSelected ? styles.muscleTextActive : styles.muscleTextInactive,
                                        ]}
                                    >
                                        {muscle.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
};

// Strongly typed colors parameter
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
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 20,
        },
        headerTitle: {
            fontSize: 22,
            fontWeight: "900",
            color: colors.text,
            fontStyle: "italic",
        },
        headerSubtitle: {
            fontSize: 10,
            color: colors.textSecondary,
            fontWeight: "700",
            letterSpacing: 1.5,
            marginTop: 2,
        },
        toggleContainer: {
            flexDirection: "row",
            backgroundColor: colors.toggleBg,
            borderRadius: 20,
            padding: 4,
        },
        toggleButton: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 16,
        },
        toggleActive: {
            backgroundColor: colors.limeAccent,
        },
        toggleText: {
            fontSize: 10,
            fontWeight: "800",
            color: colors.textSecondary,
            letterSpacing: 0.5,
        },
        toggleTextActive: {
            color: "#121212",
        },

        // --- Image Viewer Styles ---
        imageViewerContainer: {
            marginHorizontal: 20,
            height: 370,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: colors.cardBackground,
            marginBottom: 30,
            position: "relative",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
        },
        mainImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        imageOverlay: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            paddingVertical: 12,
            paddingHorizontal: 20,
        },
        imageOverlayText: {
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "900",
            letterSpacing: 1,
            textAlign: "center",
            fontStyle: "italic",
        },

        // --- Muscle Selection Grid Styles ---
        musclesSection: {
            paddingHorizontal: 20,
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: "800",
            color: colors.textSecondary,
            marginBottom: 16,
            letterSpacing: 1,
        },
        gridContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
        },
        muscleButton: {
            width: "48%", // 👈 key line (2 columns)
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
        },
        muscleButtonActive: {
            backgroundColor: colors.limeAccent,
        },
        muscleButtonInactive: {
            backgroundColor: colors.buttonInactiveBg,
        },
        muscleButtonText: {
            fontSize: 12,
            fontWeight: "800",
            letterSpacing: 0.5,
        },
        muscleTextActive: {
            color: "#121212",
        },
        muscleTextInactive: {
            color: colors.text,
        },
    });

export default Body;
