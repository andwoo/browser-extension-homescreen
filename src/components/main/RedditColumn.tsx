import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { BlockColumnProps } from './BlockColumn';
import { RedditOptionState } from '../options/RedditOptions';
import { decodeString } from '../../utils/StringUtils';
import Box from '../styled/Box';
import * as StyleConstants from '../styled/StyleConstants';
import MediaTile from './MediaTile';

interface RedditPost {
  title: string;
  thumbnail: string;
  postHref: string;
  commentsHref: string;
  upVotes: number;
}

const RedditColumn = ({ block, isLoading, setLoading, isSuccess, setSuccess }: BlockColumnProps): JSX.Element => {
  const [posts, setPosts] = useState([]);
  const subReddit = (JSON.parse(block.data) as RedditOptionState).subreddit;
  const fetchData = useCallback(async (subreddit: string): Promise<void> => {
    setSuccess(false);
    setLoading(true);
    try {
      const response = await axios.get(`https://reddit.com/r/${subreddit}.json`);
      setPosts(response.data.data.children.map((post) => {
        let thumbnail: string = post.data.thumbnail;
        if (!thumbnail || thumbnail === 'self' || thumbnail === 'spoiler') {
          thumbnail = null;
        }
        return {
          title: decodeString(post.data.title),
          thumbnail: thumbnail,
          postHref: post.data.url,
          commentsHref: `https://reddit.com${post.data.permalink}`,
          upVotes: post.data.score,
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
    fetchData(subReddit);
  }, [subReddit]);

  if(isLoading || !isSuccess) {
    return null;
  }

  return (
    <SimpleBar autoHide={true} style={{height: '100%'}}>
      <h3 style={{maxWidth: '16vw', textOverflow: 'ellipsis', overflow: 'hidden', color: StyleConstants.Colors.greyText}}>r/{subReddit?.toUpperCase()}</h3>
      {posts.map((post: RedditPost, index: number) => {
        return <PostItem key={index} {...post}/>
      })}
    </SimpleBar>
  );
}

export default RedditColumn;

const PostItem = ({title, thumbnail, postHref, commentsHref, upVotes}: RedditPost): JSX.Element => {
  return (
    <MediaTile
      thumbnail={thumbnail}
      thumbnailFallbackIcon="fab fa-reddit-alien"
      thumbnailHref={postHref}
      href={commentsHref}
      border
      borderColor="lightPink"
      radius="small"
      padding="small"
      style={{color: StyleConstants.Colors.pinkText}}
    >
      <p>{title}</p>
      <Box padding="none" border={false} style={{color: StyleConstants.Colors.greenText}}>
        <i className="fas fa-angle-up" style={{marginRight: StyleConstants.Paddings.small}}/>
        <strong>{'' + upVotes}</strong>
      </Box>
    </MediaTile>
  );
}
