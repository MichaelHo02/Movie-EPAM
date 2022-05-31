import { Box, ChakraProvider, Flex, theme } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './component/common/footer/Footer';
import Header from './component/common/header/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex marginX={10} marginY={5} flexDirection={'column'}>
        <Header />
        <Box flex={1}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
