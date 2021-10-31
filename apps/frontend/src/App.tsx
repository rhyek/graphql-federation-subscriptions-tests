import { useCallback, useState } from 'react';
import { ApolloClientProvider } from './components/apollo-client-provider';
import { Chat } from './components/chat';
import { SignIn } from './components/sign-in';


function App() {
  const [username, _setUsername] = useState<string | null>(() => window.sessionStorage.getItem('username'));

  const setUsername = useCallback((newUsername: string) => {
    window.sessionStorage.setItem('username', newUsername);
    _setUsername(newUsername);
  }, []);

  return (
    <ApolloClientProvider>
      {username ? (
        <Chat username={username} />
      ) : (
        <SignIn setUsername={setUsername} />
      )}
    </ApolloClientProvider>
  );
}

export default App;
