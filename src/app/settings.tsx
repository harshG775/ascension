import React from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useThemeModeContext } from "../components/contexts/theme-mode-provider";
import { ThemedView } from "../components/core/themed-view";
import Button from "../components/ui/button";

export default function Settings() {
    const { mode, setMode } = useThemeModeContext();
    const isDarkMode = mode === "dark";

    const toggleTheme = () => {
        setMode(isDarkMode ? "light" : "dark");
    };

    // Text color dynamically adjusting based on theme mode
    const textColor = isDarkMode ? "#FFFFFF" : "#000000";

    return (
        <ThemedView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* --- App Preferences --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>App Preferences</Text>

                    {/* Theme Toggle Row */}
                    <View style={styles.toggleRow}>
                        <Text style={[styles.rowText, { color: textColor }]}>Dark Mode</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#4CAF50" }}
                            thumbColor={isDarkMode ? "#ffffff" : "#f4f3f4"}
                            onValueChange={toggleTheme}
                            value={isDarkMode}
                        />
                    </View>

                    {/* Notifications Toggle Example */}
                    <View style={styles.toggleRow}>
                        <Text style={[styles.rowText, { color: textColor }]}>Push Notifications</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#4CAF50" }}
                            thumbColor={"#ffffff"}
                            onValueChange={() => console.log("Toggle Notifications")}
                            value={true}
                        />
                    </View>
                </View>

                {/* --- Fitness Settings --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Workout Settings</Text>

                    <Button
                        title="Edit Profile & Goals"
                        icon="person"
                        variant="ghost"
                        style={styles.button}
                        onPress={() => console.log("Nav to Profile")}
                    />
                    <Button
                        title="Measurement Units (kg/lbs)"
                        icon="straighten"
                        variant="ghost"
                        style={styles.button}
                        onPress={() => console.log("Nav to Units")}
                    />
                    <Button
                        title="Connected Apps & Devices"
                        icon="watch"
                        variant="ghost"
                        style={styles.button}
                        onPress={() => console.log("Nav to Connected Apps")}
                    />
                    <Button
                        title="Workout History"
                        icon="history"
                        variant="ghost"
                        style={styles.button}
                        onPress={() => console.log("Nav to History")}
                    />
                </View>

                {/* --- Account --- */}
                <View style={[styles.section, styles.lastSection]}>
                    <Text style={styles.sectionTitle}>Account</Text>

                    <Button
                        variant="ghost"
                        style={styles.button}
                        title="Help & Support"
                        icon="help-outline"
                        onPress={() => console.log("Nav to Support")}
                    />

                    {/* Logout Button */}
                    <Button
                        title="Log Out"
                        icon="logout"
                        variant="destructive"
                        onPress={() => console.log("Handle Logout")}
                    />
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 32,
    },
    lastSection: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#888888",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 16,
    },
    toggleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(150, 150, 150, 0.2)",
        marginBottom: 8,
    },
    rowText: {
        fontSize: 16,
        fontWeight: "500",
    },
    button: {
        justifyContent: "flex-start",
        marginBottom: 12,
        paddingVertical: 12,
        textAlign: "left",
    },
});
