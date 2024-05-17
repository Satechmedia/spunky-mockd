'use client';
import CustomInput from '@/components/CustomInput';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

type Props = {};

const ForgotPassword = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordMask = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  return (
    <div className="px-7 py-10 md:w-3/5 lg:w-1/2 md:shadow-lg">
      <Image
        alt="Logo"
        src={'/assets/spunkyLogo.svg'}
        className="w-20 h-20 mx-auto"
        width={20}
        height={20}
      />
      <p className="text-center text-2xl font-bold text-secondary my-3">
        SpunkySDX
      </p>
      <p className="text-center text-2xl font-bold text-secondary my-3">
        Forgot Password
      </p>

      <form className="w-full pt-10" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput<Inputs>
          name={'email'}
          inputName="Email"
          errors={errors}
          placeholder={'johndoe@gmail.com'}
          register={register}
        />
        <p className="text-center text-sm text-[#3E3F66]">
          We will send a recovery link to this Email
        </p>

        <button
          className="w-full mt-5 px-3 py-2 rounded-[10px] bg-primary text-white"
          type="submit"
        >
          <p>Send Recovery Link</p>
        </button>
        <button
          type="button"
          className="text-sm font-light text-secondary w-full text-center my-3"
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

export default ForgotPassword;

