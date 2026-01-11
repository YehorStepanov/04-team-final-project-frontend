interface DiaryEntryFormProps {
  onSubmit: (value: string) => void;
}

export default function DiaryEntryForm({ onSubmit }: DiaryEntryFormProps) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username') as string;
    onSubmit(username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" defaultValue="Get as argument" />
      <button type="submit">Save</button>
    </form>
  );
}
