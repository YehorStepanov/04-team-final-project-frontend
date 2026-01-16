import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { logErrorResponse } from '../../_utils/utils';

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const cookieStore = await cookies();
    const res = await api.patch('/api/users/avatar', formData, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'multipart/form-data',
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
