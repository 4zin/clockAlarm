'use client'
import Dashboard from '@/components/Dashboard';
import { useEffect, useState } from 'react';

export function LogIn() {

  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const getCodeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const codeFromUrl = urlParams.get('code');
      if (codeFromUrl) {
        setCode(codeFromUrl);
      }
    }
    getCodeFromUrl()
  }, [])

  const logInHandler = () => {
    const clientId = '7d24eed1746c4df492d0a540d4895ba9';
    const redirectUri = 'http://localhost:3000/';
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
    if (typeof window !== 'undefined') {
      window.location.href = authorizationUrl;
    }
  }

  return (
    <div>
      {code ?
        <Dashboard code={code} />
        : <button onClick={logInHandler}>Log In</button>}
    </div>
  )
}
