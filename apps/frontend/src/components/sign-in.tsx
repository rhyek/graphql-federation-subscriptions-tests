import { FormEvent, memo, useCallback, useState } from 'react';

const usernames = ['carlos', 'lina'];

export const SignIn = memo<{ setUsername: (username: string) => void }>(
  ({ setUsername }) => {
    const [value, setValue] = useState<string>('');

    const handleSubmit = useCallback(
      (event: FormEvent) => {
        event.preventDefault();
        if (!usernames.some((u) => u === value)) {
          alert('chose a valid username');
        } else {
          setUsername(value);
        }
      },
      [value, setUsername]
    );

    return (
      <form onSubmit={handleSubmit}>
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <option value='' disabled>
            choose
          </option>
          {usernames.map((username) => (
            <option key={username} value={username}>
              {username}
            </option>
          ))}
        </select>
        <button type='submit'>Set username</button>
      </form>
    );
  }
);
