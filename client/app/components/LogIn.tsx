'use client'
import Dashboard from '@/components/Dashboard';
import { useEffect, useState } from 'react';
import { SPOTIFY_CLIENT_ID } from '@/constants';
import { SetAlarm } from './SetAlarm';
import axios from 'axios';

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

  // const logInHandler: () => void = () => {
  //   const clientId = SPOTIFY_CLIENT_ID;
  //   const redirectUri = 'http://localhost:3000/';
  //   const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  //   if (typeof window !== 'undefined') {
  //     window.location.href = authorizationUrl;
  //   }
  // }

  const logInHandler = () => {
    const clientId = SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/';
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

  const logout = () => {
    setCode("")
    window.localStorage.removeItem("code")
  }

  return (
    <div>
      {code ?
        <div>
          {/* <Dashboard code={code} /> */}
          <SetAlarm code={code} />

        </div>
        : <button onClick={logInHandler}>Log In</button>}
      {/* <button onClick={logInHandler}>Log In</button> */}
    </div>
  )
}
