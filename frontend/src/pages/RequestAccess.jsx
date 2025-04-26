import { useEffect } from 'react';

const RequestAccess = () => {
  useEffect(() => {
    const phoneNumber = '7018340312';
    const message = encodeURIComponent(
      "Hi, I'm interested in accessing your website. Please open it for at least 15 minutes."
    );
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.location.href = url;
  }, []);

  return <p>Redirecting to WhatsApp...</p>;
};

export default RequestAccess;
