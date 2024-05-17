'use client';

type Props = {};
import {
  ChartBarIcon,
  GiftIcon,
  RocketLaunchIcon,
  SparklesIcon,
  Squares2X2Icon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { redirect, usePathname, useRouter } from 'next/navigation';
import ToggleButton from './ToggleButton';
import { useSession } from 'next-auth/react';
import { SessionUser } from '@/app/api/auth/[...nextauth]/route';
import { useGenerateLink } from '@/utils/hooks/useGenerateLink';
import { useCopyToClipboard } from '@/utils/hooks/useCopyToClipboard';

const BottomBar = (props: Props) => {
  const pathName = usePathname();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const sessionUser = session?.user as SessionUser;
  const username = sessionUser ? sessionUser.username : 'Spunky User';
  const referrals = sessionUser ? sessionUser.referrals : [];
  const referralCode = sessionUser ? sessionUser.referralCode : '';
  const referralLink = useGenerateLink(referralCode);

  const router = useRouter();

  return (
    <>
      {/* Bottom Bar */}
      <div className="w-[90%] h-[60px] bottom-7 left-[5%] lg:hidden absolute backdrop-blur-md rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex items-center justify-evenly">
        <button
          className={`${pathName === '/referrals' && 'bg-primary'} w-10 h-10 rounded-xl flex items-center justify-center`}
          onClick={() => {
            router.push('/referrals');
          }}
        >
          <RocketLaunchIcon
            className={`size-6 ${pathName === '/referrals' ? 'text-white' : 'text-secondary dark:text-white'}`}
          />
        </button>
        <button
          className={`${pathName === '/leaderboard' && 'bg-primary'} w-10 h-10 rounded-lg flex items-center justify-center`}
          onClick={() => {
            router.push('/leaderboard');
          }}
        >
          <SparklesIcon
            className={`size-6 ${pathName === '/leaderboard' ? 'text-white' : 'text-secondary dark:text-white'}`}
          />
        </button>
        <button
          className={`${pathName === '/' && 'bg-primary'} w-10 h-10 rounded-lg flex items-center justify-center`}
          onClick={() => {
            router.push('/');
          }}
        >
          <Squares2X2Icon
            className={`size-6 ${pathName === '/' ? 'text-white' : 'text-secondary dark:text-white'}`}
          />
        </button>
        <button
          className={`${pathName === '/chart' && 'bg-primary'} w-10 h-10 rounded-lg flex items-center justify-center`}
        >
          <ChartBarIcon
            className={`size-6 ${pathName === '/chart' ? 'text-white' : 'text-secondary dark:text-white'}`}
          />
        </button>
        <button
          className={`${pathName === '/profile' && 'bg-primary'} w-10 h-10 rounded-lg flex items-center justify-center`}
        >
          <UserIcon
            className={`size-6 ${pathName === '/profile' ? 'text-white' : 'text-secondary dark:text-white'}`}
          />
        </button>
      </div>

      {/* Navbar */}
      <div className="hidden fixed top-0 w-3/4 xl:w-4/5 right-0 lg:flex items-center justify-between h-[14vh] p-3">
        <div className="bg-tertiary dark:bg-secondaryDark px-3 py-2 rounded-lg flex items-center justify-center font-bold">
          <p className="dark:text-white text-primary">Dashboard</p>
        </div>
        <div className="flex items-center justify-between rounded-lg w-2/5 pl-5">
          <div className="pt-4">
            <div className="bg-tertiary dark:bg-secondaryDark rounded-lg flex items-center space-x-3 p-2 mb-2">
              <UserPlusIcon className="size-5 dark:text-white text-primary" />
              <p className="dark:text-white text-primary">
                Referrals: {referrals.length}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-6 py-2 text-white rounded-full bg-primary"
            onClick={() => {
              useCopyToClipboard(referralLink, 'Invite link copied!');
            }}
          >
            Invite Link
          </button>
        </div>

        <ToggleButton />

        <div className="flex items-center space-x-3">
          <p className="dark:text-white text-primary">Hello, {username}</p>
          <div className="size-10 rounded-full bg-primary"></div>
        </div>
      </div>
    </>
  );
};

export default BottomBar;

