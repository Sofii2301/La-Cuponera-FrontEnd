import React from 'react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

const SocialShareButtons = ({shareUrl, title}) => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', maxWidth: '400px', margin: '0 auto' }}>
            <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl} title={title} separator=": ">
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
        </div>
    );
};

const XIcon = ({ size, round }) => {
    const radius = round ? size / 2 : 0;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r={radius} fill="#1DA1F2" />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="12" fill="white">X</text>
        </svg>
    );
};

export default SocialShareButtons;
