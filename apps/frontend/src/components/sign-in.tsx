import { FormEvent, memo, useCallback, useState } from 'react';

export const SignIn = memo<{ setUsername: (username: string) => void }>(({ setUsername }) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    setUsername(value)
  }, [value, setUsername]);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />
      <button type="submit">Set username</button>
    </form>
  )
})