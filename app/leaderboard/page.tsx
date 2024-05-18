type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full px-5 pt-4">
      <div className="bg-tertiary dark:bg-secondaryDark px-4 py-3 rounded-lg shadow-lg">
        <p className="dark:text-white text-primary">
          Welcome to SpunkySDX, everyone! Below you'll see your earnings. To view your Referral & Level, simply navigate to the Referral tab on the left.
        </p>
      </div>

      <div className="lg:min-h-[35vh] bg-tertiary dark:bg-secondaryDark px-4 py-3 lg:px-8 lg:py-6 rounded-lg shadow-lg my-7">
        <div className="flex items-center justify-between mb-7">
          <p className="dark:text-white text-primary text-xl font-bold">
            Epoch / Phase
          </p>
          <p className="dark:text-white text-primary text-xl font-bold">
            View All
          </p>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full table-fixed lg:table-auto text-sm text-left rtl:text-right rounded-xl border dark:border-white border-black border-separate border-tools-table-outline">
            <thead className="rounded-lg text-sm text-center dark:text-white text-primary font-normal">
              <tr className="px-3">
                <th scope="col" className="px-4 py-4 w-32">
                  Epoch / Phase
                </th>
                <th scope="col" className="px-4 py-4 w-40">
                  Start / End date
                </th>
                <th scope="col" className="px-4 py-4 w-32">
                  Total Uptime
                </th>
                <th scope="col" className="px-4 py-4 w-40">
                  Referral Earnings
                </th>
                <th scope="col" className="px-4 py-4 w-32">
                  Point Earned
                </th>
              </tr>
            </thead>
            <tbody className="border text-center dark:border-white border-black dark:text-white text-primary">
              <tr>
                <td className="px-4 py-4">4</td>
                <td>2024-01-01</td>
                <td className="px-4 py-4">15:10:10</td>
                <td className="px-4 py-4">155</td>
                <td className="px-4 py-4">180</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;

