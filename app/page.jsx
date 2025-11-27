'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function fetchLinks() {
    const res = await fetch('/api/links');
    const data = await res.json();
    setLinks(data);
  }

  useEffect(() => { fetchLinks(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setMessage(null);
    if (!url) return setMessage({type:'error', text:'Please enter a URL.'});
    setLoading(true);
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ url, code: code || undefined })
      });
      if (res.status === 409) {
        setMessage({type:'error', text:'Code already exists.'});
      } else if (!res.ok) {
        const err = await res.json();
        setMessage({type:'error', text: err?.error || 'Error creating link'});
      } else {
        const created = await res.json();
        setMessage({type:'success', text:`Created: ${created.code}`});
        setUrl(''); setCode('');
        fetchLinks();
      }
    } catch (err) {
      setMessage({type:'error', text: String(err)});
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(codeToDelete) {
    if (!confirm('Delete this link?')) return;
    const res = await fetch('/api/links/' + encodeURIComponent(codeToDelete), { method: 'DELETE' });
    if (res.ok) {
      fetchLinks();
    } else {
      alert('Delete failed');
    }
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(()=> alert('Copied to clipboard'));
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <section style={{margin:'1rem 0'}}>
        <form onSubmit={handleCreate} className="form-row" style={{gap:12}}>
          <input placeholder="Target URL (https://...)" value={url} onChange={e=>setUrl(e.target.value)} />
          <input placeholder="Custom code (optional, 6-8 alnum)" value={code} onChange={e=>setCode(e.target.value)} style={{width:220}} />
          <button className="btn-primary" disabled={loading} style={{minWidth:120}}>{loading? 'Creating...' : 'Create'}</button>
        </form>
        <div style={{marginTop:8}}>
          {message && <div style={{padding:8, borderRadius:6, background: message.type==='error' ? '#ffecec' : '#e6ffed'}}>{message.text}</div>}
        </div>
      </section>

      <section style={{marginTop:20}}>
        <h3>Links</h3>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead>
              <tr>
                <th>Short code</th>
                <th>Target URL</th>
                <th>Total clicks</th>
                <th>Last clicked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.length===0 && (
                <tr><td colSpan="5" className="small">No links yet — create one above.</td></tr>
              )}
              {links.map(link => (
                <tr key={link.code}>
                  <td style={{whiteSpace:'nowrap'}}><a href={`/${link.code}`}>{link.code}</a></td>
                  <td title={link.url} style={{maxWidth: 400, overflow:'hidden', textOverflow:'ellipsis'}}>{link.url}</td>
                  <td>{link.clicks}</td>
                  <td className="small">{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : '-'}</td>
                  <td>
                    <button onClick={()=>copyToClipboard(window.location.origin + '/' + link.code)} className="copy-btn">Copy</button>
                    <button onClick={()=>window.location.href = '/code/' + link.code} style={{marginLeft:8}}>Stats</button>
                    <button onClick={()=>handleDelete(link.code)} style={{marginLeft:8}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
