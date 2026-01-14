export interface OnboardingFormValues {
  avatar: File | null;
  dueDate: string;
  gender: 'boy' | 'girl' | 'unknown';
}

export interface OnboardingResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    gender: string;
    theme: string;
    dueDate: string;
  };
}