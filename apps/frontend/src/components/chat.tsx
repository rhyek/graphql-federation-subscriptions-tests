import { useMutation, useQuery, gql } from '@apollo/client';
import {
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Message = {
  id: string;
  user: {
    fullName: string;
  };
  message: string;
};

const messageFields = `
  id
  user {
    username
    fullName
  }
  message
`;

const MESSAGES_QUERY = gql`
  query GetMessages {
    messages {
      ${messageFields}
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      ${messageFields}
    }
  }
`;

const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE($from: String!, $message: String!) {
    addMessage(from: $from, message: $message)
  }
`;

export const Chat = memo<{ username: string }>(({ username }) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  const { loading, error, data, subscribeToMore } = useQuery<{
    messages: Message[];
  }>(MESSAGES_QUERY);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      ulRef.current!.scrollTop = ulRef.current!.scrollHeight;
    }, 50);
  }, []);

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading, scrollToBottom]);

  useEffect(() => {
    // https://www.apollographql.com/docs/react/data/subscriptions/#subscribing-to-updates-for-a-query
    const unsubscribe = subscribeToMore<{ messageAdded: Message }>({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { messageAdded } = subscriptionData.data;
        scrollToBottom();
        return {
          messages: [...prev.messages, messageAdded],
        };
      },
    });
    return unsubscribe;
  }, [subscribeToMore, scrollToBottom]);

  const [addMessage] = useMutation(ADD_MESSAGE_MUTATION);

  const [text, setText] = useState<string>('');

  const handleSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      await addMessage({
        variables: {
          from: username,
          message: text,
        },
      });
      setText('');
    },
    [text, addMessage, username]
  );

  if (error) {
    throw error;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 200,
          height: '80%',
        }}
      >
        <div>
          <strong>username: </strong>
          <span>{username}</span>
        </div>
        <ul
          ref={ulRef}
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            border: '1px solid silver',
            borderBottom: 'none',
            listStyle: 'none',
            overflowY: 'auto',
          }}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            (data?.messages || []).map(
              ({ id, user: { fullName }, message }) => (
                <li key={id}>
                  <div>
                    <strong>{fullName}:</strong>
                  </div>
                  <div
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    <span>{message}</span>
                  </div>
                </li>
              )
            )
          )}
        </ul>
        <form
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          onSubmit={handleSubmit}
        >
          <input
            ref={textRef}
            style={{
              flex: 1,
            }}
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
});
