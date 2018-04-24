import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import StyleObjectPropType from '../../prop-types/style';
import './Icon.scss';

let lastInstanceId = 0;

const propTypes = {
    className: PropTypes.string,
    style: StyleObjectPropType,
};

const defaultProps = {
    className: null,
    style: null,
};

const IconArrowLongRight = ({
    className,
    style,
}) => {
    lastInstanceId += 1;
    const iconTitleId = `icon-arrow-long-right-title-${lastInstanceId}`;

    return (
        <svg
            className={cx('uir-icon uir-icon-arrow-long-right', className)}
            style={style}
            viewBox="0 0 24 24"
            aria-labelledby={iconTitleId}
        >
            <title id={iconTitleId}>Right Arrow Icon</title>
            <g fill="none" fillRule="evenodd">
                <path className="uir-icon-fill-charcoal" d="M3 12h18v1H3z" />
                <path className="uir-icon-stroke-charcoal" d="M14.071 5.5l7.071 7.071-7.07 7.071" />
            </g>
        </svg>
    );
};

IconArrowLongRight.propTypes = propTypes;
IconArrowLongRight.defaultProps = defaultProps;

export default IconArrowLongRight;
