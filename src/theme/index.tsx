import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Styles } from "@chakra-ui/theme-tools";

// only dark mode support for now
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles: Styles = {
  global: {
    body: {
      bgColor: "#212427",
    },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
