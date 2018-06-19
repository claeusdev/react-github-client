import React from 'react';
import { Mutation } from 'react-apollo';

import {
  starRepo,
  unstarRepo,
  watchRepo,
} from './Mutations';

import Repo_Fragment from './Fragments';

import Button from './Button';
import Link from './Link';


const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: 'SUBSCRIBED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
};

const isWatch = viewerSubscription =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  },
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: Repo_Fragment,
  });

  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: Repo_Fragment,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};

const updateAddStar = (
  client,
  {
    data: {
      addStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) =>
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: Repo_Fragment,
    data: getUpdatedStarData(client, id, viewerHasStarred),
  });

const updateRemoveStar = (
  client,
  {
    data: {
      removeStar: {
        starrable: { id, viewerHasStarred },
      },
    },
  },
) => {
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: Repo_Fragment,
    data: getUpdatedStarData(client, id, viewerHasStarred),
  });
};

const getUpdatedStarData = (client, id, viewerHasStarred) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: Repo_Fragment,
  });

  let { totalCount } = repository.stargazers;
  totalCount = viewerHasStarred ? totalCount + 1 : totalCount - 1;

  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount,
    },
  };
};

const Repository = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => (
  <div>
    <div className="card-title">
      <h2 className="repo__name">
        <Link href={url}>{name}</Link>
      </h2>

      <div>
        <Mutation
          mutation={watchRepo}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
          }}
          optimisticResponse={{
            updateSubscription: {
              __typename: 'Mutation',
              subscribable: {
                __typename: 'Repository',
                id,
                viewerSubscription: isWatch(viewerSubscription)
                  ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                  : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
              },
            },
          }}
          update={updateWatch}
        >
          {(updateSubscription, { data, loading, error }) => (
            <Button
              className="RepositoryItem-title-action"
              data-test-id="updateSubscription"
              onClick={updateSubscription}
            >
              {watchers.totalCount}{' '}
              {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
            </Button>
          )}
        </Mutation>

        {viewerHasStarred ? (
          <Mutation
            mutation={unstarRepo}
            variables={{ id }}
            optimisticResponse={{
              removeStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
            update={updateRemoveStar}
          >
            {(removeStar, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                onClick={removeStar}
              >
                {stargazers.totalCount} Unstar
              </Button>
            )}
          </Mutation>
        ) : (
          <Mutation
            mutation={starRepo}
            variables={{ id }}
            optimisticResponse={{
              addStar: {
                __typename: 'Mutation',
                starrable: {
                  __typename: 'Repository',
                  id,
                  viewerHasStarred: !viewerHasStarred,
                },
              },
            }}
            update={updateAddStar}
          >
            {(addStar, { data, loading, error }) => (
              <Button
                className="RepositoryItem-title-action"
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </Button>
            )}
          </Mutation>
        )}
      </div>
    </div>

    <div className="repo__description">
      <div
        className="repo__description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="d-flex justify-content-between">
        <div>
          {primaryLanguage && (
            <span className="text-bold">{primaryLanguage.name}</span>
          )}
        </div>
        <div>
          {owner && (
            <span>
              <a href={owner.url}>{owner.login}</a>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);


export default Repository