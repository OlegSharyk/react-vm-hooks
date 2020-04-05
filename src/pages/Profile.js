import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { GithubContext } from '../context/github/githubContext';
import { Repos } from '../components/Repos';

export const Profile = ({ match }) => {
    const { getUser, getRepos, loading, user, repos } = useContext(
        GithubContext,
    );
    const urlName = match.params.name;

    useEffect(() => {
        getUser(urlName);
        getRepos(urlName);
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <p className="text-center">Loadig ... </p>;
    }

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        public_repos,
        public_gists,
        following,
    } = user;

    return (
        <Fragment>
            <Link to="/" className="btn btn-link">
                Back
            </Link>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img
                                src={avatar_url}
                                alt={name}
                                style={{ width: '150px', height: 'auto' }}
                            />
                            <h3>{name}</h3>
                            {location && <p>Location: {location}</p>}
                        </div>
                        <div className="col">
                            {bio && (
                                <Fragment>
                                    <h3>BIO</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            )}
                            <a
                                href={html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-dark"
                            >
                                Open profile
                            </a>
                            <ul>
                                {login && (
                                    <li>
                                        <strong>Username: </strong> {login}
                                    </li>
                                )}
                                {company && (
                                    <li>
                                        <strong>Company: </strong> {company}
                                    </li>
                                )}
                                {blog && (
                                    <li>
                                        <strong>Website: </strong> {blog}
                                    </li>
                                )}
                            </ul>
                            <div className="badge badge-primary">
                                <strong>Followers:</strong> {followers}
                            </div>
                            <div className="badge badge-secondary">
                                <strong>Following:</strong> {following}
                            </div>
                            <div className="badge badge-info">
                                <strong>Repositories:</strong> {public_repos}
                            </div>
                            <div className="badge badge-dark">
                                <strong>Gists:</strong> {public_gists}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    );
};
