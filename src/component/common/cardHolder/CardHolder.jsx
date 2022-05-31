import { Grid } from '@chakra-ui/react';

const CardHolder = ({ children }) => {
  return (
    <Grid
      gridTemplateColumns={{
        xl: 'repeat(4, 1fr)',
        lg: 'repeat(3, 1fr)',
        md: 'repeat(2, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
      gridGap={5}
      marginBottom={10}
    >
      {children}
    </Grid>
  );
};

export default CardHolder;
