import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import SignUpModal from '../../common/modal/SignUpModal';
import { updateEmail } from './signUpSlice';

const SignUpForm = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email').required('Email is required'),
    }),
    onSubmit: () => {
      dispatch(updateEmail(formik.values.email));
      onOpen();
      formik.resetForm();
    },
  });
  return (
    <>
      <FormControl isInvalid={formik.errors?.email} isRequired>
        <Flex gap={2} width={'100%'} flexWrap={'wrap'}>
          <Input
            size={'lg'}
            width={{ base: '100%', sm: '68%', xl: '78%' }}
            variant={'filled'}
            focusBorderColor={'teal.500'}
            placeholder={'Enter your email address'}
            _placeholder={{ opacity: 0.8, color: 'inherit' }}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            type={'email'}
            isRequired
          />
          <Button
            size={'lg'}
            fontSize={'lg'}
            colorScheme={'teal'}
            width={{ base: '100%', sm: 'auto' }}
            onClick={formik.handleSubmit}
          >
            Sign Up
          </Button>
        </Flex>

        {!formik.errors?.email ? (
          <FormHelperText>We'll never share your email.</FormHelperText>
        ) : (
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        )}
      </FormControl>
      {isOpen && <SignUpModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SignUpForm;
