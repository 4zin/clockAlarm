import { TrackSearchResultProps } from "@/types";
import Image from "next/image";

export default function TrackSearchResult({ track }: TrackSearchResultProps) {

  return (
    <div
      className="cursor-pointer"
    >
      <Image src={track.albumUrl} alt="Almbum Cover" width={64} height={64} />
      <p>{track.title}</p>
      <p>{track.artist}</p>
    </div>
  )
}

