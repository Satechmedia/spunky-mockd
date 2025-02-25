'use client';

import useUserStore from '@/store';
import { useConvertNumberLocale } from '@/utils/hooks/useConvertNumberLocale';
import { useCopyToClipboard } from '@/utils/hooks/useCopyToClipboard';
import { useGenerateLink } from '@/utils/hooks/useGenerateLink';
import { useLinkOpener } from '@/utils/hooks/useLinkOpener';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { SessionUser } from './api/auth/[...nextauth]/route';

type Props = {};

interface Task {
  description: string;
  rewardPoint: number;
  _id: string;
  link: string;
}

const Home = (props: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  const sessionUser = session?.user as SessionUser;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [claimLoading, setClaimLoading] = useState<boolean>(false);

  const storeUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const getUser = async () => {
    if (sessionUser) {
      await axios
        .post('api/getUserById', {
          userID: sessionUser._id,
        })
        .then((res) => {
          storeUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          redirect('/login');
        });
    }
  };

  const getAllTasks = async () => {
    if (sessionUser) {
      setTaskLoading(true);
      await axios
        .get('api/tasks')
        .then((res) => {
          setTaskLoading(false);
          setTasks(res.data.data);
        })
        .catch((err) => {
          setTaskLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUser();
    getAllTasks();
  }, [sessionUser]);

  const referrals = user ? user.referrals : [];
  const referralCode = user ? user.referralCode : '';
  const referralLink = useGenerateLink(referralCode);
  const totalEarnings = user
    ? Number(user.referralEarnings ?? 0) + Number(user.pointsEarned ?? 0)
    : 0;

  const userCompletedTasks = user ? user.completedTasks : [];

  const completeTask = async (taskID: string, link: string) => {
    // Do task
    await useLinkOpener(link);

    const data = {
      userID: user._id,
      taskID,
    };
    await axios
      .patch('api/updateUserTask', data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const claimPoints = async (taskID: string) => {
    setClaimLoading(true);
    const data = {
      userID: user._id,
      taskID,
    };
    await axios
      .post('api/tasks/claimPoints', data)
      .then((res) => {
        setClaimLoading(false);
        console.log(res.data);
        getUser();
      })
      .catch((err) => {
        setClaimLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="w-full px-5 pt-4">
      <div className="bg-tertiary dark:bg-secondaryDark  px-4 py-3 rounded-lg shadow-lg">
        <p className="dark:text-white text-primary">
          Welcome to SpunkySDX, everyone! Below you'll see your earnings. To view your Referral & Level, simply navigate to the Referral tab on the left.
        </p>
      </div>
      <div className="flex lg:hidden items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] border-primary rounded-lg p-4 my-7">
        <div className="space-y-4">
          <div className="bg-tertiary rounded-lg flex items-center space-x-3 p-2">
            <UserPlusIcon className="size-5 text-primary" />
            <p>Referrals: {referrals ? referrals.length : 0}</p>
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
      <div className="flex flex-col md:flex-row md:space-x-5 lg:h-[35vh] my-7">
        <div className="w-full lg:w-3/5 flex items-center justify-between shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg bg-tertiary dark:bg-secondaryDark  p-4 mb-7 md:mb-0">
          <div className="w-[45%] h-full space-y-3">
            <div className="bg-white h-3/4 lg:flex lg:flex-col lg:items-center lg:justify-center dark:bg-tertiaryDark rounded-lg flex flex-col items-center py-2">
              <p className="text-sm lg:text-lg font-medium dark:text-white text-primary">
                Total Earnings:
              </p>
              <p className="text-xl lg:text-2xl font-bold dark:text-white text-primary">
                {useConvertNumberLocale(totalEarnings)}
              </p>
            </div>
            <p className="text-[10px] lg:text-sm xl:text-lg dark:text-white text-primary">
              Uptime: 0 day, 0 hr, 0 min
            </p>
          </div>
          <div className="w-[45%] h-full space-y-3">
            <div className="bg-white h-3/4 lg:flex lg:flex-col lg:items-center lg:justify-center dark:bg-tertiaryDark rounded-lg flex flex-col items-center py-2">
              <p className="text-sm lg:text-lg font-medium dark:text-white text-primary">
                Today's Earnings:
              </p>
              <p className="text-xl lg:text-2xl font-bold dark:text-white text-primary">
                0.00
              </p>
            </div>
            <p className="text-[10px] lg:text-sm xl:text-lg dark:text-white text-primary">
              Uptime: 0 day, 0 hr, 0 min
            </p>
          </div>
        </div>
        <div className="w-full lg:w-2/5 lg:flex lg:flex-col lg:items-center lg:justify-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg bg-tertiary dark:bg-secondaryDark px-3 py-4 space-y-3">
          <div className="w-full flex items-center justify-center gap-x-3">
            <button
              type="button"
              className="size-20 lg:size-32 rounded-full flex items-center justify-center bg-white"
            >
              <div className="border-[#EC1560] shadow-lg rounded-full flex items-center justify-center border-8 size-16 lg:size-28">
                <Image
                  src={'/assets/spunkyLogo.svg'}
                  width={40}
                  height={40}
                  className="size-6 lg:size-14"
                  alt="Logo"
                />
              </div>
            </button>

            {/* <Circles
              height="80"
              width="80"
              color="#EC1560"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> */}
          </div>
          <p className="font-bold text-sm lg:text-lg text-center dark:text-white text-primary">
            Tap to start mining and earn more earnings
          </p>
          {/* <p className="font-bold text-sm text-center dark:text-white text-primary">
            Mining until 00:59:00
          </p> */}
          {/* <p className="text-sm text-slate-400 text-center dark:text-gray-300">
            You can always disconnect device in the profile tab.
          </p> */}
        </div>
      </div>

      <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg bg-tertiary dark:bg-secondaryDark  p-4">
        <p className="font-bold text-sm dark:text-white text-primary">Tasks</p>

        <div className="py-3 space-y-3">
          {taskLoading && (
            <div className="flex flex-col items-center justify-center gap-3">
              <Circles
                height="80"
                width="80"
                color="#EC1560"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              <p className="text-sm dark:text-white text-primary">
                Getting Tasks
              </p>
            </div>
          )}
          {!taskLoading &&
            tasks.length > 0 &&
            tasks.map((task) => {
              const { _id, description, rewardPoint, link } = task;

              const userTask = userCompletedTasks
                ? userCompletedTasks.find((item) => {
                    return item._id === _id;
                  })
                : null;

              return (
                <div
                  key={_id}
                  className="bg-white dark:bg-tertiaryDark flex items-center justify-between px-4 lg:px-6 py-3 rounded-lg"
                >
                  <div className="w-3/5">
                    <p className="font-medium dark:text-white text-primary">
                      {description}
                    </p>
                  </div>

                  {userTask && userTask.claimed && (
                    <button
                      type="button"
                      className="px-6 py-2 text-xs border-2 border-secondary text-white rounded-full bg-secondary"
                      disabled
                    >
                      Claimed
                    </button>
                  )}

                  {userTask && userTask.claimed === false && (
                    <button
                      type="button"
                      className="px-6 py-2 text-xs border-2 border-secondary text-white rounded-full bg-primary"
                      onClick={() => {
                        claimPoints(task._id);
                      }}
                    >
                      {claimLoading ? 'Claiming...' : 'Claim'}
                    </button>
                  )}
                  {!userTask && (
                    <button
                      type="button"
                      className="px-6 py-2 text-xs border-2 border-secondary text-white rounded-full bg-primary"
                      onClick={() => {
                        completeTask(task._id, link);
                      }}
                    >
                      {useConvertNumberLocale(rewardPoint)} points
                    </button>
                  )}
                </div>
              );
            })}

          {/* Claimed State */}
          {/* <div className="bg-white dark:bg-tertiaryDark flex items-center justify-between px-2 py-3 rounded-lg">
            <p className="font-medium dark:text-white text-primary">Task 2</p>
            <button
              type="button"
              className="px-6 py-2 text-xs border-2 border-secondary text-white rounded-full bg-secondary"
            >
              Claimed
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

