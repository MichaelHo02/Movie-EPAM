import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getSignUpEmail } from '../../../redux/selectors';
import {
  updateEmail,
  updateUsername,
  updatePassword,
} from '../../landing/hero/signUpSlice';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../form/CustomInput';
import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

const SignUpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initRef = useRef(null);

  let email = useSelector(getSignUpEmail);

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
      dispatch(updateEmail(formik.values.email));
      dispatch(updateUsername(formik.values.username));
      dispatch(updatePassword(formik.values.password));
      formik.resetForm();
      onClose();
      navigate('home');
    },
  });
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
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
