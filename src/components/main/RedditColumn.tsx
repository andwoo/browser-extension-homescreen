import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { BlockColumnProps } from './BlockColumn';
import { RedditOptionState } from '../options/RedditOptions';
import { decodeString } from '../../utils/StringUtils';
import * as Boxes from '../styled/Box';
import * as StyleConstants from '../styled/StyleConstants';

interface RedditPost {
  title: string;
  thumbnail: string;
  postHref: string;
  commentsHref: string;
  upVotes: number;
}

const RedditColumn = ({ block, isLoading, setLoading, isSuccess, setSuccess }: BlockColumnProps): JSX.Element => {
  const [posts, setPosts] = useState([]);
  const fetchData = useCallback(async (subreddit: string): Promise<void> => {
    setSuccess(false);
    setLoading(true);
    try {
      const response = await axios.get(`https://reddit.com/r/${subreddit}.json`);
      console.dir(response);
      setPosts(response.data.data.children.map((post) => {
        let thumbnail: string = post.data.thumbnail;
        if (!thumbnail || thumbnail === 'self') {
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
    fetchData((JSON.parse(block.data) as RedditOptionState).subreddit);
  }, []);

  if(isLoading || !isSuccess) {
    return null;
  }

  return (
    <Boxes.TransparentBox style={{height: '100%', overflow: 'auto'}}>
      {posts.map((post: RedditPost, index: number) => {
        return (<Boxes.PinkBox key={index} color="darkBlack" style={{marginBottom: StyleConstants.Paddings.small}}>
          <p>{post.title}</p>
        </Boxes.PinkBox>);
      })}
    </Boxes.TransparentBox>
  );
}

export default RedditColumn;
