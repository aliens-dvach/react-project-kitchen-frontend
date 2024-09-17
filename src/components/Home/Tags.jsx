import React from 'react';
import PropTypes from 'prop-types';
import agent from '../../agent';

const Tags = (props) => {
  const { tags, onClickTag } = props;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map((tag) => {
            const handleClick = (ev) => {
              ev.preventDefault();
              onClickTag(
                tag, (page) => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag),
              );
            };

            return (
              <button
                type="button"
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </button>
            );
          })
        }
      </div>
    );
  }

  return (
    <div>Loading Tags...</div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickTag: PropTypes.func.isRequired,
};

export default Tags;
