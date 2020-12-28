import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BlockColumnProps } from './BlockColumn';
import { TwitchOptionState } from '../options/TwitchOptions';
import Box from '../styled/Box';
import * as StyleConstants from '../styled/StyleConstants';
import MediaTile from './MediaTile';

interface TwitchStreamer {
  name: string;
  viewers: string,
  game: string,
  href: string,
  thumbnail: string,
  background: string,
  backgroundColour: string,
}

const TwitchColumn = ({ block, isLoading, setLoading, isSuccess, setSuccess }: BlockColumnProps): JSX.Element => {
  const [streamers, setStreamers] = useState([]);
  const token = (JSON.parse(block.data) as TwitchOptionState).token;
  const fetchData = useCallback(async (token: string): Promise<void> => {
    setSuccess(false);
    setLoading(true);
    try {
      const response = await axios.get('https://api.twitch.tv/kraken/streams/followed?stream_type=live', {
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `OAuth ${token}`,
        },
      });
      setStreamers(response.data.streams.map(stream => {
        return {
          name: stream['channel'].display_name,
          viewers: stream.viewers,
          game: stream['channel'].game,
          href: stream['channel'].url,
          thumbnail: stream['channel'].logo,
          background: stream['channel'].profile_banner,
          backgroundColour: stream['channel'].profile_banner_background_color,
        };
      }));
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      return Promise.reject(new Error(error));
    }
    setSuccess(true);
    setLoading(false);
  }, [setLoading, setSuccess]);

  useEffect(() => {
    fetchData(token);
  }, [token]);

  if(isLoading || !isSuccess) {
    return null;
  }

  return (
    <Box padding="none" border={false} style={{height: '100%', overflow: 'auto'}}>
      <h3 style={{maxWidth: '16vw', textOverflow: 'ellipsis', overflow: 'hidden', color: StyleConstants.Colors.purpleText}}>TWITCH</h3>
      {streamers.map((streamer: TwitchStreamer, index: number) => {
        return <StreamerItem key={index} {...streamer}/>
      })}
    </Box>
  );
}

export default TwitchColumn;

const StreamerItem = ({name, viewers, game, href, thumbnail}: TwitchStreamer): JSX.Element => {
  return (
    <MediaTile
      thumbnail={thumbnail}
      thumbnailFallbackIcon="fab fa-twitch"
      thumbnailHref={href}
      href={href}
      border
      borderColor="lightPurple"
      radius="small"
      padding="small"
    >
      <strong>{name}</strong>
      <p>{game}</p>
      <Box padding="none" border={false} style={{color: StyleConstants.Colors.redText}}>
        <i className="fas fa-crown" style={{marginRight: StyleConstants.Paddings.small}}/>
        <strong>{'' + viewers}</strong>
      </Box>
    </MediaTile>
  );
}
