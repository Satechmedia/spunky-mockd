'use client';
import { useSearchParams } from 'next/navigation';

type Props = {
  children: any;
};

const SearchParamsWrapper = ({ children }: Props) => {
  const searchParams = useSearchParams();
  return children(searchParams);
};

export default SearchParamsWrapper;

