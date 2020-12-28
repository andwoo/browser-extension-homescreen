import React, { useCallback, useState } from 'react';
import { Block } from '../../redux/interfaces/StoreModel';
import BlockTypes from '../../constants/BlockTypes';
import Loading from './Loading'
import WarningDialog from './WarningDialog';
import RedditColumn from './RedditColumn';
import TwitchColumn from './TwitchColumn';
import LauncherColumn from './LauncherColumn'

export interface BlockColumnProps {
  block: Block;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  isSuccess: boolean;
  setSuccess: (value: boolean) => void;
}

const BlockColumn = ({block}: {block: Block}): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(true);
  const setL: (value: boolean) => void = useCallback((value) => {
    setLoading(value);
  }, [setLoading]);
  const setS: (value: boolean) => void = useCallback((value) => {
    setSuccess(value)
  }, [setSuccess]);

  const blockColumn = ((): JSX.Element => {
    switch(block.type) {
      case BlockTypes.REDDIT:
        return <RedditColumn
          block={block}
          isLoading={isLoading}
          setLoading={setL}
          isSuccess={isSuccess}
          setSuccess={setS}
        />
      case BlockTypes.TWITCH:
        return <TwitchColumn
          block={block}
          isLoading={isLoading}
          setLoading={setL}
          isSuccess={isSuccess}
          setSuccess={setS}
        />
      case BlockTypes.LAUNCHER:
        return <LauncherColumn
          block={block}
          isLoading={isLoading}
          setLoading={setL}
          isSuccess={isSuccess}
          setSuccess={setS}
        />
      default:
        return <WarningDialog
          title="Warning"
          message={`No renderer found for type "${block.type}".`}
        />;
    }
  })();

  return (
  <>
    {isLoading && <div style={{flex: 1, textAlign: 'center'}}>
      <Loading loading={isLoading} success={false}/>
    </div>}
    {!isLoading && !isSuccess &&
      <WarningDialog
      title="Warning"
      message={`Failed to load data for type "${block.type}".`}
      />
    }
    {blockColumn}
  </>
  );
}

export default BlockColumn;
