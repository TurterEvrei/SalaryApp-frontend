import {extendTheme, ThemeConfig} from "@chakra-ui/react";
import {components} from "./styles";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false
};

const colors = {
    primary: {
        600: '#d6f8f0',
        500: '#cbf7ed',
        400: '#c0f5e9',
        300: '#b5f3e5',
        200: '#a9f1e2',
        100: '#9defde',
    },
    dark: {
        600: '#90939c',
        500: '#767a84',
        400: '#5d626e',
        300: '#464b58',
        200: '#2f3543',
        100: '#19202F',
    },
    shadowed: {
        100: '#0F131C',
    },
    text: {
        600: '#fff',
        500: '#D1D3D6',
    }
}

const theme = extendTheme({
    config,
    colors,
    components
})

export default theme;