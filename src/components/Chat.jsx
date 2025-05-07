import { getDatabase, ref, push } from 'firebase/database';

const Chat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const db = getDatabase();
    push(ref(db, 'messages'), { text: message, timestamp: Date.now() });
    setMessage('');
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};