import { NextResponse } from 'next/server';

const errorHandler = (errorMsg: string, statusCode: number) => {
  return NextResponse.json({ message: errorMsg }, { status: statusCode });
};

export default errorHandler;
