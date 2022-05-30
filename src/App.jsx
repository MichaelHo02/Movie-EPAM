import { Box, ChakraProvider, theme } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './component/common/footer/Footer';
import Header from './component/common/header/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box marginX={10} marginY={5}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
