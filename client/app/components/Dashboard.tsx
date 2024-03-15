import { useState, useEffect } from "react"
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from "@/hooks/useAuth"
import { SearchResultsProps } from "@/types"
import TrackSearchResult from "@/components/TrackSearchResult"
import Player from "@/components/Player"

const spotifyApi = new SpotifyWebApi({
  clientId: '7d24eed1746c4df492d0a540d4895ba9',
})

export default function Dashboard({ code }: { code: string }) {

  const accessToken = useAuth(code)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultsProps[]>([])
  const [playingTrack, setPlayingTrack] = useState<SearchResultsProps | undefined>(undefined)

  const chooseTrack = (track: {
    artist: string;
    title: string;
    uri: string;
    albumUrl: string;
  }) => {
    setPlayingTrack(track)
    setSearch('')
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false

    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return

      const tracks = res.body.tracks?.items ?? []

      setSearchResults(
        tracks.map(track => {

          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height !== undefined && smallest.height !== undefined) {
              if (image.height < smallest.height) return image
            }
            return smallest
          }, track.album.images[0])

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        })
      )
    })

    return () => {
      cancel = true
    }
  }, [search, accessToken])

  return (
    <div>
      <input
        type="search"
        placeholder="Search Songs"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="text-black"
      />
      {searchResults && searchResults.map((track) => (
        <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
      ))}

      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </div>
  )
}
