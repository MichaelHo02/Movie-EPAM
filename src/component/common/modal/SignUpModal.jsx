import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import {
  getAuthInfo,
  getResponse,
  getSignUpEmail,
  getSignUpUsername,
} from '../../../redux/selectors';
import { clearUser, register } from '../../../redux/slices/authSlice';
import CustomInput from '../form/CustomInput';

YupPassword(Yup);

const SignUpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initRef = useRef(null);

  const toast = useToast();
  const username = useSelector(getSignUpUsername);
  const response = useSelector(getResponse);
  const authInfo = useSelector(getAuthInfo);
  const email = useSelector(getSignUpEmail);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: email,
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid Email'),
      username: Yup.string()
        .required('User name is required')
        .min(2, 'At least 2 letters required')
        .max(100, 'Maximum letter is 100'),
      password: Yup.string()
        .required('Password is required')
        .password()
        .max(10, 'Maximum password is 10 characters'),
    }),
    onSubmit: () => {
      dispatch(register(formik.values));
    },
  });

  useEffect(() => {
    if (!response.success && response.message !== '') {
      toast({
        title: 'Sign Up Status.',
        description: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      dispatch(clearUser());
    } else if (response.success) {
      toast({
        title: `Welcome back! ${username}`,
        description: response.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      formik.resetForm();
      onClose();
      navigate('home');
    }
  }, [formik, navigate, onClose, response, toast, username]);
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      scrollBehavior={'inside'}
      initialFocusRef={initRef}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent borderRadius={'1rem'} padding={'1rem'}>
        <ModalHeader>Welcome back my friend!</ModalHeader>
        <ModalBody>
          <VStack gap={5}>
            <CustomInput
              label={'Email'}
              name={'email'}
              placeholder={'Enter your email address'}
              type={'email'}
              defaultHelpText={"We'll never share your email."}
              isInValid={formik.errors?.email && formik.touched.email}
              error={formik.errors.email}
              setFieldTouched={formik.setFieldTouched}
              formikProps={{ ...formik.getFieldProps('email') }}
            />
            <CustomInput
              label={'User Name'}
              name={'username'}
              placeholder={'Enter your user name'}
              type={'text'}
              defaultHelpText={'User name can be seen by other users.'}
              isInValid={formik.errors?.username && formik.touched.username}
              error={formik.errors.username}
              setFieldTouched={formik.setFieldTouched}
              formikProps={{ ...formik.getFieldProps('username') }}
            />

            <CustomInput
              label={'Password'}
              name={'password'}
              placeholder={'Enter your password'}
              defaultHelpText={'Do not let others know your password.'}
              isInValid={formik.errors?.password && formik.touched.password}
              error={formik.errors.password}
              setFieldTouched={formik.setFieldTouched}
              formikProps={{ ...formik.getFieldProps('password') }}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={'gray'}
            variant={'outline'}
            mr={4}
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
            ref={initRef}
          >
            Close
          </Button>
          <Button colorScheme={'teal'} onClick={formik.handleSubmit}>
            {authInfo.status === 'pending' ? <Spinner /> : `Submit`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
