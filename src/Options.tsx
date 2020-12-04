import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, LayoutItem } from '@andwoo/scss-grid';
//store
import StoreDispatch from './redux/interfaces/StoreDispatch';
import StoreModel from './redux/interfaces/StoreModel';
import { RedditModel } from './redux/interfaces/RedditModel';
//actions
import * as RedditActions from './redux/actions/RedditActions';
'./redux'

function MapStateToProps(state: StoreModel) {
  return {
    reddit: state.reddit,
  };
}

function MapDispatchToProps(dispatch): StoreDispatch {
  const actionCreators = {
    RequestSubReddit: RedditActions.RequestSubReddit,
  };
  return bindActionCreators(actionCreators, dispatch);
}

const Options = ({reddit, RequestSubReddit}: {reddit: RedditModel, RequestSubReddit: (name:string) => void}): JSX.Element => {
  useEffect(() => {
    RequestSubReddit('videos');
  }, [])

  return (
    <Layout direction="column">
      <LayoutItem size="full">{JSON.stringify(reddit.subReddits ?? {})}</LayoutItem>
      <LayoutItem size="full"><h1>WIP</h1></LayoutItem>
    </Layout>
  );
}

const ReduxPropsBinder = connect(MapStateToProps, MapDispatchToProps)(Options);
export default hot(module)(ReduxPropsBinder);
