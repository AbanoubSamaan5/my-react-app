import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActionPage = ({ actionType }) => {
  const { recordId } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const performAction = async () => {
      try {
        const apiUrl = `https://graduation-project-mmih.vercel.app/api/Record/${actionType}/${recordId}`;
        const res = await fetch(apiUrl, { method: 'POST' });

        if (!res.ok) throw new Error('Something went wrong ❌');
        const data = await res.json();
        setStatus('success');
        setMessage(`✅ The report has been ${actionType === 'approve' ? 'approved' : 'canceled'} successfully.`);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Unexpected error ❌');
      }
    };

    if (recordId) performAction();
  }, [recordId, actionType]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {status === 'loading' && 'Processing your request... ⏳'}
        {status !== 'loading' && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #ece9e6, #ffffff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontSize: '18px',
  },
};

export default ActionPage;
