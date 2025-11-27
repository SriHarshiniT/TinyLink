'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function CodeStats() {
  const params = useParams();
  const code = params.code;
  const [data, setData] = useState(null);

  useEffect(()=> {
    fetch('/api/links/' + encodeURIComponent(code)).then(r=>r.json()).then(setData);
  }, [code]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Stats for {data.code}</h2>
      <dl>
        <div><strong>Target URL:</strong> <a href={data.url} target="_blank" rel="noreferrer">{data.url}</a></div>
        <div><strong>Total clicks:</strong> {data.clicks}</div>
        <div><strong>Last clicked:</strong> {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : '-'}</div>
        <div><strong>Created at:</strong> {new Date(data.createdAt).toLocaleString()}</div>
      </dl>
      <div style={{marginTop:12}}>
        <a href="/">← Back to dashboard</a>
      </div>
    </div>
  );
}
