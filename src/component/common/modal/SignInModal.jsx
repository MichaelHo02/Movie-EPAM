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
import { useNavigate } from 'react-router-dom';
import CustomInput from '../form/CustomInput';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import {
  getAuthInfo,
  getResponse,
  getSignUpUsername,
} from '../../../redux/selectors';
YupPassword(Yup);

const SignInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const initRef = useRef(null);
  const dispatch = useDispatch();

  const toast = useToast();

  const response = useSelector(getResponse);
  const username = useSelector(getSignUpUsername);
  const authInfo = useSelector(getAuthInfo);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid Email'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: () => {
      dispatch(login(formik.values));
    },
  });

  useEffect(() => {
    if (!response.success && response.message !== '') {
      toast({
        title: 'Sign In Status.',
        description: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
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
  }, [response]);
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
            onClick={onClose}
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

export default SignInModal;
