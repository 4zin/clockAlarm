'use client'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=7d24eed1746c4df492d0a540d4895ba9&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';
export function LogIn() {

  const logInHandler = async () => {
    try {
      const clientId = '7d24eed1746c4df492d0a540d4895ba9';
      const redirectUri = 'http://localhost:3000/';
      const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
      window.location.href = authorizationUrl;
    } catch (error) {
      console.error('Error al inciar sesion', error);
    }
  }

  return (
    <div>
      <button onClick={logInHandler}>Log In</button>
    </div>
  )
}
