
import axios from 'axios';

const sendReminder = async (phone, message) => {
  const response = await axios.post('/twilio/send', { phone, message });
  return response.data;
};

export default sendReminder;