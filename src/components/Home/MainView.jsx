import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../ArticleList';
import agent from '../../agent';
import { CHANGE_TAB } from '../../constants/actionTypes';

const YourFeedTab = (props) => {
  const { token, tab, onTabClick } = props;

  if (token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <li className="nav-item">
        <button
          type="button"
          className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
          onClick={clickHandler}
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

YourFeedTab.propTypes = {
  token: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const GlobalFeedTab = (props) => {
  const { tab, onTabClick } = props;

  const clickHandler = (ev) => {
    ev.preventDefault();
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <li className="nav-item">
      <button
        type="button"
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  );
};

GlobalFeedTab.propTypes = {
  tab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const TagFilterTab = (props) => {
  const { tag } = props;
  if (!tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button
        type="button"
        className="nav-link active"
      >
        <i className="ion-pound" />
        {tag}
      </button>
    </li>
  );
};

TagFilterTab.propTypes = {
  tag: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) => dispatch({
    type: CHANGE_TAB, tab, pager, payload,
  }),
});

const MainView = (props) => {
  const {
    token, tab, tag, onTabClick,
    pager, articles, articlesCount, loading, currentPage,
  } = props;

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={token}
            tab={tab}
            onTabClick={onTabClick}
          />

          <GlobalFeedTab tab={tab} onTabClick={onTabClick} />

          <TagFilterTab tag={tag} />

        </ul>
      </div>

      <ArticleList
        pager={pager}
        articles={articles}
        loading={loading}
        articlesCount={articlesCount}
        currentPage={currentPage}
      />
    </div>
  );
};

MainView.propTypes = {
  token: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  pager: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  articlesCount: PropTypes.number.isRequired,
  loading: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
