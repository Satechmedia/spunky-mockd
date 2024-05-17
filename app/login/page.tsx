'use client';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError('');
    setResponse('');

    const options = {
      ...data,
      redirect: false,
    };

    try {
      const response = await signIn('credentials', options);
      if (response?.error) {
        setLoading(false);
        setError('Error logging in.');
        return;
      } else {
        router.replace('/');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError('Error logging in.');
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordMask = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="px-7 py-10 md:w-3/5 lg:w-1/2 md:shadow-lg md:rounded-lg">
      <Image
        alt="Logo"
        src={'/assets/spunkyLogo.svg'}
        className="w-20 h-20 mx-auto"
        width={20}
        height={20}
      />
      <p className="text-center text-2xl font-bold text-secondary dark:text-white my-3">
        SpunkySDX
      </p>
      <p className="text-center text-2xl font-bold text-secondary dark:text-white my-3">
        Login
      </p>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput<Inputs>
          name={'email'}
          inputName="Email"
          errors={errors}
          placeholder={'johndoe@gmail.com'}
          register={register}
        />

        <CustomInput<Inputs>
          name={'password'}
          inputName="Password"
          inputType={showPassword ? 'text' : 'password'}
          passwordToggle={togglePasswordMask}
          errors={errors}
          placeholder={'********'}
          register={register}
          secured
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 my-2">
            <input
              type="checkbox"
              className="accent-primary w-4 h-4"
              name="rememberMe"
            />
            <p className="text-sm font-normal dark:text-white">Remember Me</p>
          </div>

          <button
            type="button"
            onClick={() => {
              router.push('forgot-password');
            }}
          >
            <p className="text-sm font-normal text-[#515151] dark:text-white ">
              Forgot password?
            </p>
          </button>
        </div>

        {error && (
          <p className="text-red-500 font-medium text-sm my-5">{error}</p>
        )}

        {response && (
          <p className="text-green-500 font-medium text-sm my-5">{response}</p>
        )}

        <CustomButton title="Login" type="submit" loading={loading} />

        <button
          type="button"
          className="text-sm font-light text-secondary w-full text-center my-3 dark:text-white"
          onClick={() => {
            router.push('register');
          }}
        >
          <p>
            Don't have an account?{' '}
            <span className="font-semibold">Sign Up</span>
          </p>
        </button>
      </form>
    </div>
  );
};

export default Login;

