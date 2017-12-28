import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from './Avatar';
import storyWrapper from '../../storybook-addons/storyWrapper';

const stories = storiesOf('Avatar.Avatar', module);

stories.add(
    'Overview',
    storyWrapper(
        'Avatar description will go here',
        <Avatar name="David Smith" initials="DS" />,
    ),
);

stories.add(
    'Initials',
    storyWrapper(
        'The default avatar displays the users initials and no profile image',
        <Avatar name="David Smith" initials="DS" />,
        <div>
            <Avatar
                name="Jane"
                initials="J"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="Jane Doe"
                initials="JD"
                style={{ marginRight: '10px' }}
            />
        </div>,
    ),
);

stories.add(
    'Image',
    storyWrapper(
        'Provide a src to the avatar and the initials will be hidden',
        <Avatar
            name="Jane Doe"
            initials="JD"
            src="https://randomuser.me/api/portraits/women/58.jpg"
        />,
        <div>
            <Avatar
                name="Jane Doe"
                initials="JD"
                src="https://randomuser.me/api/portraits/women/58.jpg"
                size="xs"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="Jane Doe"
                initials="JD"
                src="https://randomuser.me/api/portraits/women/58.jpg"
                size="sm"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="Jane Doe"
                initials="JD"
                src="https://randomuser.me/api/portraits/women/58.jpg"
                size="md"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="Jane Doe"
                initials="JD"
                src="https://randomuser.me/api/portraits/women/58.jpg"
                size="lg"
                style={{ marginRight: '10px' }}
            />
        </div>,
    ),
);

stories.add(
    'Size',
    storyWrapper(
        `Use the size prop to create a sm, md or lg avatar.
        Remove the size prop for the default size.`,
        <Avatar
            name="Joe Bloggs"
            initials="JB"
            size="lg"
        />,
        <div>
            <Avatar
                name="small"
                initials="XS"
                size="xs"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="medium"
                initials="SM"
                size="sm"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="default"
                initials="MD"
                size="md"
                style={{ marginRight: '10px' }}
            />
            <Avatar
                name="large"
                initials="LG"
                size="lg"
            />
        </div>,
    ),
);

stories.add(
    'Status',
    storyWrapper(
        'Displays emoji status icon',
        <Avatar
            name="David Smith"
            initials="DS"
            size="lg"
            src="https://randomuser.me/api/portraits/men/84.jpg"
            status="🦄"
        />,
        <div>
            <Avatar
                name="David Smith"
                initials="DS"
                size="sm"
                src="https://randomuser.me/api/portraits/men/84.jpg"
                status="🌴"
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="David Smith"
                initials="DS"
                size="md"
                src="https://randomuser.me/api/portraits/men/84.jpg"
                status="🤚"
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="David Smith"
                initials="DS"
                src="https://randomuser.me/api/portraits/men/84.jpg"
                status="🤕"
                style={{ marginRight: '30px' }}
            />
        </div>,
    ),
);

stories.add(
    'Theme',
    storyWrapper(
        `The default avatar will work on light and dark backgrounds.

Use the theme prop to set the status and notification icon background.`,
        <Avatar
            name="David Smith"
            initials="DS"
            theme="dark"
            size="lg"
            src="https://randomuser.me/api/portraits/men/3.jpg"
            status="😡"
        />,
        <div style={{ backgroundColor: '#3a333c', display: 'inline-block', padding: '30px' }}>
            <Avatar
                name="David Smith"
                initials="DS"
                theme="dark"
                size="lg"
                src="https://randomuser.me/api/portraits/men/3.jpg"
                status="🐴"
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="David Smith"
                initials="DS"
                theme="dark"
                size="lg"
                src="https://randomuser.me/api/portraits/men/3.jpg"
                status="🚀"
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="David Smith"
                initials="DS"
                theme="dark"
                size="lg"
                src="https://randomuser.me/api/portraits/men/3.jpg"
                status="🏆"
                style={{ marginRight: '30px' }}
            />
        </div>,
    ),
);

stories.add(
    'Notification',
    storyWrapper(
        'Displays an avatar with a warning icon. *NB: The warning icon overrides any status icon.*',
        <Avatar
            name="Jane Smith"
            initials="JS"
            size="lg"
            src="https://randomuser.me/api/portraits/women/68.jpg"
            notification
        />,
        <div>
            <Avatar
                name="Jane Smith"
                initials="JS"
                size="sm"
                notification
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="Jane Smith"
                initials="JS"
                size="md"
                notification
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="Jane Smith"
                initials="JS"
                notification
                style={{ marginRight: '30px' }}
            />
            <Avatar
                name="Jane Smith"
                initials="JS"
                size="lg"
                notification
                style={{ marginRight: '30px' }}
            />
        </div>,
    ),
);

stories.add(
    'Clickable',
    storyWrapper(
        'Any avatar can be clicked',
        <Avatar
            name="Jane Smith"
            size="lg"
            src="https://randomuser.me/api/portraits/women/68.jpg"
            onClick={() => { alert('it works!') }} // eslint-disable-line
        />,
    ),
);
