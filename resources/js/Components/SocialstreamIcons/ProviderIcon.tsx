import React from 'react';
import BitbucketIcon from './BitbucketIcon';
import FacebookIcon from './FacebookIcon';
import GithubIcon from './GithubIcon';
import GitLabIcon from './GitLabIcon';
import GoogleIcon from './GoogleIcon';
import LinkedInIcon from './LinkedInIcon';
import SlackIcon from './SlackIcon';
import TwitterIcon from './TwitterIcon';

interface Props {
    provider: any;
    classes: string;
}

const SocialIcon = ({provider}: Props) => {
    let iconComponent = null;

    switch (provider.id) {
        case 'bitbucket':
            iconComponent = <BitbucketIcon/>;
            break;
        case 'facebook':
            iconComponent = <FacebookIcon/>;
            break;
        case 'github':
            iconComponent = <GithubIcon/>;
            break;
        case 'gitlab':
            iconComponent = <GitLabIcon/>;
            break;
        case 'google':
            iconComponent = <GoogleIcon/>;
            break;
        case 'linkedin':
        case 'linkedin-openid':
            iconComponent = <LinkedInIcon/>;
            break;
        case 'slack':
            iconComponent = <SlackIcon/>;
            break;
        case 'twitter':
        case 'twitter-oauth-2':
            iconComponent = <TwitterIcon/>;
            break;
        default:
            iconComponent = null;
    }

    return <div className="text-gray-900">{iconComponent}</div>;
};

export default SocialIcon;
