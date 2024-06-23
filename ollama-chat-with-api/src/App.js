import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from './api';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [context, setContext] = useState(null);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await sendMessage(input, context);
      const botMessage = { sender: 'bot', text: response.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setContext(response.context); // Update context
    } catch (error) {
      console.error('Error:', error);
    }

    setInput('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='App'>
      <div className='chat-container'>
        <div className='chat-box' ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='input-form'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your message...'
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
