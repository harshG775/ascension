import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeModeProvider, useThemeModeContext } from "../components/contexts/theme-mode-provider";
import { ThemeProvider } from "../components/contexts/theme-provider";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <ThemeModeProvider>
                <ThemeProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="settings" options={{ animation: "simple_push", animationDuration: 10 }} />
                        <Stack.Screen name="workout/today" options={{ headerShown: false }} />
                    </Stack>

                    <StatusBar_ />
                </ThemeProvider>
            </ThemeModeProvider>
        </SafeAreaProvider>
    );
}
function StatusBar_() {
    const { mode } = useThemeModeContext();

    return <StatusBar style={mode === "dark" ? "light" : "dark"} />;
}
