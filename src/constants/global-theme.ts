/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// constants/global-theme.ts
import { Platform } from "react-native";

const BASE_RADIUS = 16;
//
export const SPACING = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
} as const;

export const RADIUS = {
    sm: BASE_RADIUS - 4,
    md: BASE_RADIUS - 2,
    lg: BASE_RADIUS,
    xl: BASE_RADIUS + 4,
} as const;

export const COLORS = {
    light: {
        // Light mode version using the same brand lime but on white
        primary: "hsl(75 100% 45%)",
        primaryForeground: "hsl(0 0% 0%)",

        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 10%)",

        card: "hsl(0 0% 96%)",
        cardForeground: "hsl(0 0% 0%)",

        secondary: "hsl(180 100% 40%)", // Cyan
        secondaryForeground: "hsl(0 0% 100%)",

        muted: "hsl(0 0% 92%)",
        mutedForeground: "hsl(0 0% 45%)",

        destructive: "hsl(0 84% 60%)",
        destructiveForeground: "hsl(0 0% 98%)",

        warning: "hsl(48 96% 53%)",
        warningForeground: "hsl(222 47% 11%)",

        success: "hsl(142 71% 45%)",
        successForeground: "hsl(0 0% 100%)",

        border: "hsl(0 0% 90%)",
    },

    dark: {
        // Matches the screenshot exactly
        primary: "hsl(75 100% 50%)", // Neon Lime (Start Workout Button)
        primaryForeground: "hsl(0 0% 0%)",

        background: "hsl(0 0% 0%)", // Pure Black background
        foreground: "hsl(0 0% 100%)",

        card: "hsl(0 0% 10%)", // Dark Charcoal cards (Streak/Target cards)
        cardForeground: "hsl(0 0% 100%)",

        secondary: "hsl(185 100% 50%)", // Cyan (Target/Progress accents)
        secondaryForeground: "hsl(0 0% 0%)",

        muted: "hsl(0 0% 15%)", // For unselected calendar days
        mutedForeground: "hsl(0 0% 65%)", // For labels like "KCAL TO BURN"

        destructive: "hsl(0 70% 50%)",
        destructiveForeground: "hsl(0 0% 100%)",

        warning: "hsl(48 96% 53%)",
        warningForeground: "hsl(0 0% 0%)",

        success: "hsl(142 71% 45%)",
        successForeground: "hsl(0 0% 100%)",

        border: "hsl(0 0% 18%)",
    },
} as const;

export const FONTS = Platform.select({
    ios: {
        /** iOS `UIFontDescriptorSystemDesignDefault` */
        sans: "system-ui",
        /** iOS `UIFontDescriptorSystemDesignSerif` */
        serif: "ui-serif",
        /** iOS `UIFontDescriptorSystemDesignRounded` */
        rounded: "ui-rounded",
        /** iOS `UIFontDescriptorSystemDesignMonospaced` */
        mono: "ui-monospace",
    },
    default: {
        sans: "normal",
        serif: "serif",
        rounded: "normal",
        mono: "monospace",
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
} as const);
