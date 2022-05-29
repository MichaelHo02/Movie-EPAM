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
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../form/CustomInput';
import { useRef } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const SignInModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const initRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Invalid Email'),
      password: Yup.string().required('Password is required').password(),
    }),
    onSubmit: () => {
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
          <Button
            colorScheme={'teal'}
            onClick={() => {
              onClose();
              navigate('home');
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
