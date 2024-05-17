'use client';
import CustomInput from '@/components/CustomInput';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import CustomButton from '@/components/CustomButton';
import { Circles } from 'react-loader-spinner';

type Inputs = {
  username: string;
  email: string;
  password: string;
  referralCode: string | null;
};

type Props = {};

const SignUp = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('referralCode');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: { referralCode } });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      await axios
        .post('api/register', data)
        .then((res) => {
          setLoading(false);
          setResponse(res.data.message);
          router.push('login');
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setError(err.response.data.message || 'Error registering user.');
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError('Error registering user.');
    }
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordMask = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Suspense
      fallback={
        <Circles
          height="80"
          width="80"
          color="#EC1560"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      }
    >
      <div className="px-7 py-10 md:w-3/5 lg:w-1/2 md:shadow-lg md:rounded-lg dark:text-white">
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
          Sign Up
        </p>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput<Inputs>
            name={'username'}
            inputName="Username"
            errors={errors}
            placeholder={'John Doe'}
            register={register}
          />

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

          <CustomInput<Inputs>
            name={'referralCode'}
            inputName="Referral Code"
            errors={errors}
            placeholder={'123456'}
            register={register}
            required={false}
          />

          <div className="flex items-center space-x-3 my-2">
            <input
              type="checkbox"
              className="accent-primary w-4 h-4"
              name="rememberMe"
            />
            <p className="text-sm font-normal">Remember Me</p>
          </div>

          {error && (
            <p className="text-red-500 font-medium text-sm my-5">{error}</p>
          )}

          {response && (
            <p className="text-green-500 font-medium text-sm my-5">
              {response}
            </p>
          )}

          <CustomButton type="submit" title="Sign Up" loading={loading} />

          <button
            type="button"
            className="text-sm font-light text-secondary w-full text-center my-3 dark:text-white"
            onClick={() => {
              router.push('login');
            }}
          >
            <p>
              Already have an account?{' '}
              <span className="font-semibold">Sign In</span>
            </p>
          </button>
        </form>
      </div>
    </Suspense>
  );
};

export default SignUp;

