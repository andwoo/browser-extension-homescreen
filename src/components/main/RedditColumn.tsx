import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
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
  const subReddit = (JSON.parse(block.data) as RedditOptionState).subreddit;
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
    fetchData(subReddit);
  }, [subReddit]);

  if(isLoading || !isSuccess) {
    return null;
  }

  return (
    <Boxes.TransparentBox padding="none" border={false} style={{height: '100%', overflow: 'auto'}}>
      <h3 style={{maxWidth: '16vw', textOverflow: 'ellipsis', overflow: 'hidden'}}>r/{subReddit?.toUpperCase()}</h3>
      {posts.map((post: RedditPost, index: number) => {
        return <PostItem key={index} {...post}/>
      })}
    </Boxes.TransparentBox>
  );
}

export default RedditColumn;

const PostItem = ({title, thumbnail, postHref, commentsHref, upVotes}: RedditPost): JSX.Element => {
  const Image = styled.div`
    background: url(${thumbnail});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    width: 3rem;
    height: 3rem;
  `;

  const Href = styled.a`
    text-decoration: none;
    color: inherit;
  `;

  return (
    <Boxes.TransparentBox style={{marginBottom: StyleConstants.Paddings.small}}>
      <Layout>
        <LayoutItem>
          <Href href={postHref}>
            <Boxes.TransparentBox padding="none" color="darkBlack" style={{display: 'flex', width: '3rem', height: '3rem', justifyContent: 'center', alignItems: 'center'}}>
              {thumbnail && <Image/>}
              {!thumbnail && <i className="fas fa-moon-stars" style={{fontSize: '2rem'}}/>}
            </Boxes.TransparentBox>
          </Href>
        </LayoutItem>
        <LayoutItem size="full">
          <Href href={commentsHref}>
            <div style={{marginLeft: StyleConstants.Paddings.small}}>
              <p>{title}</p>
              <Boxes.SuccessBox color="darkBlack" padding="none" border={false}>
                <i className="fas fa-angle-up" style={{marginRight: StyleConstants.Paddings.small}}/>
                <span>{'' + upVotes}</span>
              </Boxes.SuccessBox>
            </div>
          </Href>
        </LayoutItem>
      </Layout>
    </Boxes.TransparentBox>
  )
}
