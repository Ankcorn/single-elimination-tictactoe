import axios from 'axios';

class AIApi {
  static async postAI({ name, code }) {
    try {
      await axios.post('/.netlify/functions/ai', { name, code });
    } catch (e) {
      throw new Error('Failed to save an AI');
    }
  }
}

export default AIApi;
