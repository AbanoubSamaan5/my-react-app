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
      <div style={styles.loadingCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
        <h3 style={{ marginBottom: '10px', color: '#374151' }}>Loading Report...</h3>
        <p style={{ color: '#6b7280' }}>Please wait while we fetch your medical report</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⚠️</div>
        <h3 style={{ marginBottom: '10px', color: '#ef4444' }}>Error Loading Report</h3>
        <p style={{ color: '#6b7280' }}>{error}</p>
      </div>
    );
  }

  if (recordData.status !== 'Completed') {
    return (
      <div style={styles.notReadyCard}>
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>📄</div>
        <h3 style={{ marginBottom: '10px', color: '#374151' }}>Report Not Ready</h3>
        <p style={{ color: '#6b7280' }}>The report is not ready now, please come back later.</p>
      </div>
    );
  }

  return (
    <ReportDetails record={recordData} report={reportData} center={centerData} />
  );
};

const styles = {
  loadingCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    margin: '40px auto',
  },
  errorCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#dc2626',
    margin: '40px auto',
  },
  notReadyCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'white',
    padding: '48px 40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    color: '#64748b',
    margin: '40px auto',
  },
};

export default RecordPage;
