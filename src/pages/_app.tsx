import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import { NextComponentType } from "next";
import { StoreProvider } from "easy-peasy";
import PlayerLayout from "../components/PlayerLayout";
import { store } from "../components/store";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean };
};

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  component: {
    Button: {
      variants: {
        link: {
          focus: {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const App = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default App;
