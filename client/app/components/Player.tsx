import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }: { accessToken: string, trackUri?: string }) {
  if (!accessToken) return null
  return <SpotifyPlayer
    token={accessToken}
    uris={trackUri ? [trackUri] : []}
  />
}
