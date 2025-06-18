import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ⬅️ استيراد useParams
import ReportDetails from '../components/ReportDetails';

const RecordPage = () => {
  const { recordId } = useParams(); // ⬅️ الحصول على recordId من الرابط
  const [recordData, setRecordData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://graduation-project-mmih.vercel.app/api/Record/getOneRecordById/${recordId}`);
        if (!res.ok) throw new Error('faild loding Record');
        const record = await res.json();
        setRecordData(record);

        if (record.status === 'Completed') {
          const reportRes = await fetch(`https://graduation-project-mmih.vercel.app/api/AIReports/getOneAIReport/${record.reportId}`);
          if (!reportRes.ok) throw new Error('faild loding Report');
          const report = await reportRes.json();
          setReportData(report);
          const centerRes = await fetch(`https://graduation-project-mmih.vercel.app/api/centers/getCenterById/${record.centerId}`);
          if (!centerRes.ok) throw new Error('faild loding Center');
          const center = await centerRes.json();
          setCenterData(center);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (recordId) {
      fetchData();
    }
  }, [recordId]);

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>loading Data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.wrapper}>
        <div style={{ ...styles.card, color: 'red' }}>{error}</div>
      </div>
    );
  }

  if (recordData.status !== 'Completed') {
    return (
      <div style={styles.wrapper}>
        <div style={styles.card}>
          📄 The report is not ready now, please come back later.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <ReportDetails record={recordData} report={reportData} center={centerData} />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
  },
  card: {
    width: '100%',
    maxWidth: '900px',
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default RecordPage;
