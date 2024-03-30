import { useState, useContext, useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"

import { SearchResultsProps } from "@/types"
import { AlarmContext } from "@/components/context/AlarmContext"
import TrackSearchResult from "@/components/TrackSearchResult"

import '../../styles/search.css'

export default function Search({ accessToken }: { accessToken: string }) {

  const alarmContext = useContext(AlarmContext)

  if (alarmContext === undefined) {
    throw new Error('alarmContext must be used within AlarmProvider')
  }

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    accessToken: accessToken
  })

  const [alarmActive, setAlarmActive] = useState<boolean>(false)
  const [uri, setUri] = useState([''])
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchResultsProps[]>([])
  const [selectedSong, setSelectedSong] = useState<SearchResultsProps>()

  useEffect(() => {
    setAlarmActive(alarmContext.alarmConfig === true)
  }, [alarmContext.alarmConfig])

  useEffect(() => {

    if (!search || !accessToken) {
      setSearchResults([])
      return
    }

    const searchTracks = async () => {
      try {
        await spotifyApi.searchTracks(search).then(res => {
          const tracks = res.body.tracks?.items ?? []

          setSearchResults(
            tracks.map(track => ({
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0]?.url || ''
            }))
          )
        })
      } catch (error) {
        console.error('Error searching tracks:', error)
      }
    }

    searchTracks()

    return

  }, [search, accessToken])

  useEffect(() => {

    if (alarmActive === true) {
      try {
        spotifyApi.play({
          uris: uri
        })
      } catch (error) {
        console.error('Error al reproducir la cancion:', error);
      }
    }

  }, [alarmActive, uri])

  const toPlay = (song: SearchResultsProps) => {
    setUri([song.uri])
    setSelectedSong(song);
    setSearch('')
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <input
        type="search"
        placeholder="Search for song"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4 w-60 bg-accents-400 py-1 px-2 rounded-md shadow-black shadow-inner text-lg text-accents-100 font-medium'
      />

      <div className={`${search ? 'w-auto h-52 overflow-y-auto overflow-x-hidden' : 'w-auto h-12 overflow-y-hidden'} shadow-black p-[10px] mb-[20px] scrollbar`}>
        {selectedSong
          ? <div className='flex justify-center items-center'>
            <p className='text-accents-100 font-semibold'>Selected song: </p>
            &nbsp;
            <p className='text-[#2e002b] font-semibold'>{selectedSong.title} - {selectedSong.artist}</p>
          </div>
          : null
        }

        {searchResults && searchResults.map((track) => (
          <div
            key={track.uri}
            onClick={() => toPlay(track)}
          >
            <TrackSearchResult track={track} />
          </div>
        ))}
      </div>
    </div>
  )
}
