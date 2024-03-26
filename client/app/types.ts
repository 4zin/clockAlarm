import { Dispatch, SetStateAction } from "react";

export type ContextClockProps = {
  digitalHour: string;
  digitalMinute: string;
  digitalSeconds: string;
  ampm: string;
}

export type AlarmContextProps = {
  hour: string;
  minutes: string;
  amPmOptions: string;
  alarmTime: AlarmTime;
  // setAlarmHandler: () => void;
  setAlarmTime: Dispatch<SetStateAction<AlarmTime>>;
  // silenceAlarm: () => void;
  setAlarmConfig: (alarmConfig: boolean) => void;
  hourNumber: (string | number)[];
  minuteNumber: (string | number)[];
  hourHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  minuteHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  amPmHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  alarmConfig: boolean;
  alarmTimeString: string;
}

export type AlarmTime = {
  hour: string;
  minute: string;
  amPm: string;
}

export type SearchResultsProps = {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

export interface TrackSearchResultProps {
  track: {
    artist: string
    title: string
    uri: string
    albumUrl: string
  }
}