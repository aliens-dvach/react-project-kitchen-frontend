import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import agent from '../../agent';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from '../../constants/actionTypes';

const { Promise } = global;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) => dispatch({
    type: APPLY_TAG_FILTER, tag, pager, payload,
  }),
  onLoad: (tab, pager, payload) => dispatch({
    type: HOME_PAGE_LOADED, tab, pager, payload,
  }),
  onUnload: () => dispatch({
    type: HOME_PAGE_UNLOADED,
  }),
});

function Home(props) {
  const {
    token, appName, tags, onLoad, onUnload, onClickTag,
  } = props;

  useEffect(() => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token
      ? agent.Articles.feed
      : agent.Articles.all;

    onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));

    return onUnload();
  }, []);

  return (
    <div className="home-page">

      <Banner token={token} appName={appName} />
      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">

              <p>Popular Tags</p>

              <Tags
                tags={tags}
                onClickTag={onClickTag}
              />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLoad: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  onClickTag: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
