import { UserPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type Props = {};

const Referrals = (props: Props) => {
  return (
    <div className="w-full px-5 pt-4">
      <div className="bg-tertiary dark:bg-secondaryDark px-4 py-3 rounded-lg shadow-lg">
        <p className="dark:text-white text-primary">
          Welcome to Epoch 4, everyone! Below you'll see your earnings for this
          epoch. To view your total number of points, simply navigate to the
          Rewards tab on the left.
        </p>
      </div>

      <div className="flex flex-col md:flex-row mt-7 md:mb-7 md:space-x-5">
        <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg bg-tertiary dark:bg-secondaryDark p-4 mb-7 md:mb-0">
          <div className="w-full flex items-center justify-between">
            <div className="w-[45%] space-y-3">
              <div className="bg-white dark:bg-tertiaryDark rounded-lg flex flex-col items-center py-2">
                <p className="text-sm font-medium dark:text-white text-primary">
                  Epoch Earnings:
                </p>
                <p className="text-xl font-bold dark:text-white text-primary">
                  0.00
                </p>
              </div>
            </div>
            <div className="w-[45%] space-y-3">
              <div className="bg-white dark:bg-tertiaryDark rounded-lg flex flex-col items-center py-2">
                <p className="text-sm font-medium dark:text-white text-primary">
                  Today's Earnings:
                </p>
                <p className="text-xl font-bold dark:text-white text-primary">
                  0.00
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-5">
            <button
              type="button"
              className="w-full py-3 text-white rounded-full bg-primary"
            >
              Copy referral link
            </button>
            <button
              type="button"
              className="w-full py-3 text-white rounded-full bg-secondary"
            >
              Tweet referral link
            </button>
          </div>
        </div>

        <div className="w-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg bg-tertiary dark:bg-secondaryDark p-4 mb-7 md:mb-0">
          <div className="w-full flex justify-between space-x-3">
            <div className="space-y-2 w-1/2">
              <p className="font-bold text-black dark:text-white text-xl">
                Tier 1: Iron
              </p>
              <p className="text-sm text-black dark:text-white">
                Referrals left to Tier II: Bronze - 6
              </p>
              <p className="text-sm text-black dark:text-white">
                Points left to Tier II: Bronze - 373.00
              </p>
            </div>

            <div className="space-y-2 w-2/5">
              <button
                type="button"
                className="w-full py-2 text-white rounded-full bg-primary"
              >
                Claim
              </button>
              <p className="text-sm text-black dark:text-white">
                No rewards to claim yet.
              </p>
            </div>
          </div>

          <div className="w-full h-20 flex items-center relative my-3">
            <div className="bg-white w-full h-5 border border-black rounded-full"></div>
            <div className="absolute right-0 h-full w-9 border-l-2 border-y-2 border-r-8 border-r-primary rounded-full border-black dark:border-white bg-tertiary dark:bg-secondary"></div>
          </div>

          <div className="w-full px-5 py-3 bg-white dark:bg-secondaryDark shadow-lg rounded-full flex items-center justify-between">
            <p className="text-xs font-bold text-black dark:text-white">
              Upcoming Bonus Tier II: bronze
            </p>
            <div className="bg-tertiary dark:bg-secondary px-3 py-2 rounded-full">
              <p className="text-sm font-bold text-black dark:text-white">
                20 points
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full shadow-lg p-4 rounded-lg">
        <p className="font-bold mb-3 text-black dark:text-white">
          Invite friends and grow your earnings.
        </p>

        <div className="flex flex-col md:flex-row md:justify-between gap-y-2">
          <div className="rounded-lg p-2 flex flex-col lg:flex-row justify-between space-y-2">
            <div className="bg-tertiary rounded-lg size-12 lg:size-16 flex items-center justify-center">
              <UserPlusIcon className="size-5 text-black" />
            </div>
            <div className="lg:w-3/4 xl:w-4/5">
              <p className="font-bold text-black dark:text-white">
                Refer your friends
              </p>
              <p className="text-sm text-black dark:text-white">
                Share the link with your friends over twitter or any other
                social platform.
              </p>
            </div>
          </div>
          <div className="rounded-lg p-2 flex flex-col lg:flex-row justify-between space-y-2">
            <div className="bg-tertiary rounded-lg size-12 lg:size-16 flex items-center justify-center">
              <Image
                src={'/assets/giftedHand.svg'}
                width={20}
                height={20}
                alt="giftedHand"
              />
            </div>
            <div className="lg:w-3/4 xl:w-4/5">
              <p className="font-bold text-black dark:text-white">
                Get points when users sign up
              </p>
              <p className="text-sm text-black dark:text-white">
                When your friend signs up on the app, you will receive points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;

