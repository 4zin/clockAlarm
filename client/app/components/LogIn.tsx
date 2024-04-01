'use client'
import { useEffect, useState } from 'react';
import { SPOTIFY_CLIENT_ID } from '@/constants';
import { SetAlarm } from './SetAlarm';
import Button from './Button';

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

    const clientId = SPOTIFY_CLIENT_ID;
    const redirectUri = 'https://pomodorify.up.railway.app/';
    // const redirectUri = `http://localhost:3000/`;
    const scopes = [
      'ugc-image-upload',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'streaming',
      'app-remote-control',
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-read-private',
      'playlist-modify-private',
      'user-library-modify',
      'user-library-read',
      'user-top-read',
      'user-read-playback-position',
      'user-read-recently-played',
      'user-follow-read',
      'user-follow-modify'
    ]

    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}`
    if (typeof window !== 'undefined') {
      window.location.href = authorizationUrl;
    }
  }

  return (
    <div className='flex flex-col items-center mt-2'>
      {code ?
        <div>
          <SetAlarm code={code} />
        </div>
        : <Button text='Log In' onClick={logInHandler} />}
    </div>
  )
}
