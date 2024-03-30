import { TrackSearchResultProps } from "@/types";
import Image from "next/image";

export default function TrackSearchResult({ track }: TrackSearchResultProps) {

  return (
    <div
      className="cursor-pointer flex items-center w-96 ml-2 bg-accents-400 rounded-[1px]"
    >
      <Image src={track.albumUrl} alt="Almbum Cover" width={64} height={64} className="my-2 ml-2" />
      <div className="flex flex-col ml-2">
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>
    </div>
  )
}

