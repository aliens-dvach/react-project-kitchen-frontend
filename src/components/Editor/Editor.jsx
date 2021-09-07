/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import agent from '../../agent';
import ListErrors from '../ListErrors';

import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from '../../constants/actionTypes';

function Editor() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    title, description, body, tagList, articleSlug, errors, tagInput, inProgress,
  } = useSelector((state) => state.editor);
  const onLoad = (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload });
  const onSubmit = (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload });
  const onUnload = () => dispatch({ type: EDITOR_PAGE_UNLOADED });
  const onUpdateField = (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value });

  const updateFieldEvent = (key) => (ev) => onUpdateField(key, ev.target.value);

  const onChangeTitle = updateFieldEvent('title');
  const onChangeDescription = updateFieldEvent('description');
  const onChangeBody = updateFieldEvent('body');
  const onChangeTagInput = updateFieldEvent('tagInput');

  const watchForEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();

      dispatch({ type: ADD_TAG });
    }
  };

  const removeTagHandler = (tag) => () => dispatch({ type: REMOVE_TAG, tag });

  const submitForm = (ev) => {
    ev.preventDefault();

    const article = {
      title,
      description,
      body,
      tagList,
    };

    const localSlug = { slug: articleSlug };
    const promise = articleSlug
      ? agent.Articles.update(Object.assign(article, localSlug))
      : agent.Articles.create(article);

    onSubmit(promise);
  };

  useEffect(() => {
    if (slug) {
      onUnload();
      onLoad(agent.Articles.get(slug));
    }
    onLoad(null);

    return () => onUnload();
  }, [slug]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <ListErrors errors={errors} />

            <form>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    defaultValue={title}
                    onChange={onChangeTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    defaultValue={description}
                    onChange={onChangeDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    defaultValue={body}
                    onChange={onChangeBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    defaultValue={tagInput}
                    onChange={onChangeTagInput}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {
                        (tagList || []).map((tag) => (
                          <span className="tag-default tag-pill" key={tag}>
                            <i className="ion-close-round" onClick={removeTagHandler(tag)} />
                            {tag}
                          </span>
                        ))
                      }
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>

              </fieldset>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
