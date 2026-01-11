import { lato } from '../../fonts';
export default function Home() {
  const handleOrder = (data: string) => {
    console.log('Order received from:', data);
    // to update Note use POST/PATCH (noteID and res(formData)) to save at db  };

    return (
      <main>
        <div>Choose item at left 👈</div>;
        <div>
          <h1 className={lato.className}>Diary. Welcome to My Next.js App!</h1>
          <button type="submit" onClick={handleNewNoteCreate}>
            New Note
          </button>
          <button type="submit">Edit Note</button>
          <button type="submit">Delete Note</button>
        </div>
      </main>
    );
  };
}
