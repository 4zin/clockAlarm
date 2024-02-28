export type ContextAlarmProps = {
    digitalHour: string;
    digitalMinute: string;
    digitalSeconds: string;
    ampm: string;
    hour: string;
    minutes: string;
    amPmOptions: string;
    alarmTime: AlarmTime;
    setAlarmHandler: () => void
    hourNumber: (string | number)[];
    minuteNumber: (string | number)[];
    hourHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
    minuteHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
    amPmHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
    alarmConfig: boolean
}

export type AlarmTime = {
    hour: string;
    minute: string;
    amPm: string;
}