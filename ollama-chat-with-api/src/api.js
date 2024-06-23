import axios from 'axios';

const API_URL = 'http://192.168.1.251:11434/api/generate';

export const sendMessage = async (prompt, context, generateImage = false) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'llama2-uncensored',
        prompt: prompt,
        context: context,
        stream: false,
        generate_image: generateImage,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: generateImage ? 'blob' : 'json',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
