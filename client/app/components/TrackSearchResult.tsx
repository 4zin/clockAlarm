import { TrackSearchResultProps } from "@/types";
import Image from "next/image";

export default function TrackSearchResult({ track, chooseTrack }: TrackSearchResultProps) {

  const handlePlay = () => {
    chooseTrack(track)
  }

  return (
    <div
      className="cursor-pointer"
      onClick={handlePlay}
    >
      <Image src={track.albumUrl} alt="Almbum Cover" width={64} height={64} />
      <p>{track.title}</p>
      <p>{track.artist}</p>
    </div>
  )
}

