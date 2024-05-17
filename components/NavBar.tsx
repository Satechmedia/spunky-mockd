import {
  ArrowRightEndOnRectangleIcon,
  ArrowUpRightIcon,
  ChartBarIcon,
  GiftIcon,
  RocketLaunchIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import ToggleButton from './ToggleButton';

type Props = {};
const NavBar = (props: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 w-full h-[10vh] border-b-2 lg:hidden flex items-center justify-between px-5">
        <div className="flex items-center space-x-2">
          <Image
            src={'/assets/spunkyLogo.svg'}
            width={10}
            height={10}
            className="w-6 h-6"
            alt="Logo"
          />
          <p className="text-secondary font-bold dark:text-white">SpunkySDX</p>
        </div>

        <div className="flex items-center space-x-2">
          <ToggleButton />
          <div className="size-8 rounded-full flex items-center justify-center bg-primary"></div>
        </div>
      </div>

      {/* SideBar */}
      <div className="hidden lg:flex flex-col py-5 lg:fixed top-0 w-1/4 xl:w-1/5 h-screen bg-secondary text-white">
        <div className="mb-7">
          <Image
            src={'/assets/spunkyLogo.svg'}
            width={20}
            height={20}
            className="size-24 mx-auto"
            alt="Logo"
          />
          <p className="text-2xl font-bold text-center">SpunkySDX</p>
        </div>

        <div className="space-y-4">
          <button
            className={`flex items-center space-x-3 px-6 py-3 w-[90%] ${pathName === '/' && 'bg-primary'} rounded-r-xl`}
            onClick={() => {
              router.push('/');
            }}
          >
            <Squares2X2Icon className={`size-6 text-white`} />
            <p className={`text-xl ${pathName === '/' && 'font-bold'}`}>
              Dashboard
            </p>
          </button>
          <button
            className={`flex items-center space-x-3 px-6 py-3 w-[90%] ${pathName === '/referrals' && 'bg-primary'} rounded-r-xl`}
            onClick={() => {
              router.push('referrals');
            }}
          >
            <RocketLaunchIcon className={`size-6 text-white`} />
            <p
              className={`text-xl ${pathName === '/referrals' && 'font-bold'}`}
            >
              Referral Program
            </p>
          </button>
          <button
            className={`flex items-center space-x-3 px-6 py-3 w-[90%] ${pathName === '/leaderboard' && 'bg-primary'} rounded-r-xl`}
            onClick={() => {
              router.push('leaderboard');
            }}
          >
            <SparklesIcon className={`size-6 text-white`} />
            <p
              className={`text-xl ${pathName === '/leaderboard' && 'font-bold'}`}
            >
              Leaderboard
            </p>
          </button>
          <button
            className={`flex relative items-center space-x-3 px-6 py-3 w-[90%] ${pathName === '/trade' && 'bg-primary'}`}
          >
            <ChartBarIcon className={`size-6 text-white`} />
            <p className="text-lg xl:text-xl">Trade</p>

            <div className="absolute border border-white px-3 py-1 rounded-full right-0 top-0">
              <p className="text-xs">Coming soon</p>
            </div>
          </button>
        </div>

        <div className="bg-tertiary dark:bg-tertiaryDark w-[90%] mx-auto rounded-xl p-3 my-8 text-primary">
          <p className="text-center dark:text-white text-primary">BLOG</p>
          <p className="text-center dark:text-white text-primary">
            Learn how to optimize your experience
          </p>
          <div className="pt-4 flex items-center justify-between">
            <p className="font-bold dark:text-white text-primary">Learn More</p>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <ArrowUpRightIcon className="size-5 text-white" />
            </div>
          </div>
        </div>

        <button
          className={`flex items-center space-x-3 px-6 py-3 w-[90%]`}
          onClick={() => {
            signOut();
          }}
        >
          <ArrowRightEndOnRectangleIcon className={`size-6 text-white`} />
          <p className="text-lg xl:text-xl">Log out</p>
        </button>
      </div>
    </>
  );
};

export default NavBar;

