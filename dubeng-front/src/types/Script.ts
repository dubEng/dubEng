import { YouTubePlayer } from "react-youtube";

export interface Script{
    id: number;
    startTime: number;
    duration: number;
    content: string;
    translateContent: string;
    pitchList: number[];
    scriptIndex: number;
    scriptLength: number;
    youtubePlayer: YouTubePlayer;
}