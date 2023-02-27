import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style";
import theme from "./theme/default";

function GlobalThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export default GlobalThemeProvider;
