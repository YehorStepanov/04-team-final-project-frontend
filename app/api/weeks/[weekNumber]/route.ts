import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ weekNumber: string }> },
) {
  try {
    const { weekNumber } = await context.params;

    const cookieStore = await cookies();

    const res = await api.get('/api/weeks', {
      params: { week: Number(weekNumber) },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        {
          message: error.message,
          backend: error.response?.data,
        },
        { status: error.response?.status ?? 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
