import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightAddon,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const CustomInput = ({
  label,
  name,
  placeholder,
  type,
  defaultHelpText,
  isInValid,
  error,
  setFieldTouched,
  formikProps,
}) => {
  const [show, setShow] = useState(false);
  const handleShowPassword = () => setShow(!show);
  const capitalizeFirstLetter = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <FormControl isInvalid={isInValid} isRequired>
      <FormLabel htmlFor={name} fontSize={'lg'}>
        {label}
      </FormLabel>
      <InputGroup size={'lg'}>
        <Input
          id={name}
          size={'lg'}
          variant={'filled'}
          focusBorderColor={'teal.500'}
          placeholder={placeholder}
          _placeholder={{ opacity: 0.8, color: 'inherit' }}
          name={name}
          type={type ? type : show ? 'text' : 'password'}
          isRequired
          onFocus={() => setFieldTouched(name, true)}
          {...formikProps}
        />
        {name === 'password' && (
          <InputRightAddon as={Button} onClick={handleShowPassword}>
            {show ? 'Hide' : 'Show'}
          </InputRightAddon>
        )}
      </InputGroup>
      {isInValid ? (
        <FormErrorMessage>{capitalizeFirstLetter(error)}</FormErrorMessage>
      ) : (
        <FormHelperText>{defaultHelpText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
