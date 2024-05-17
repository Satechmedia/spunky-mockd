import { BallTriangle } from 'react-loader-spinner';

type Props = {
  type?: 'button' | 'reset' | 'submit' | undefined;
  onClick?: () => void;
  loading?: boolean;
  title: string;
};

const CustomButton = ({ type, onClick, loading, title }: Props) => {
  return (
    <button
      className="w-full flex items-center justify-center gap-x-2 mt-5 p-3 rounded-[10px] bg-primary text-white"
      type={type ?? 'button'}
      onClick={onClick}
    >
      <BallTriangle
        height={20}
        width={20}
        radius={5}
        color="white"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={loading}
      />
      {!loading && <p>{title}</p>}
    </button>
  );
};

export default CustomButton;

