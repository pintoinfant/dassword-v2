import { extendTheme } from "@chakra-ui/react";

import { config } from "./config";
import { colors } from "./colors";

export const theme = extendTheme({
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
  },
  components: {
    // Button: {
    // }
  },
  config,
  colors,
});
