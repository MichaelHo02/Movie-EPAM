import { Tooltip, useColorModeValue } from '@chakra-ui/react';

const CustomizeTooltip = ({ children, message }) => {
  const tooltipColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
  return (
    <Tooltip
      label={message}
      placement={'left'}
      backgroundColor={tooltipColor}
      paddingY={1}
      paddingX={3}
      borderRadius={'base'}
      fontSize={'lg'}
    >
      {children}
    </Tooltip>
  );
};

export default CustomizeTooltip;
