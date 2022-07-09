import React, { memo } from 'react';
import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import { CaretForward } from '../../Icons/Icon';
import Image from '../../Images/Image';
import { Button } from '../../Button';

const cx = classNames.bind(styles);
const Menu = ({
    title,
    nameArtist,
    leftIcon,
    rightIcon,
    optionIcon,
    src,
    time,
    itemRight,
    debounce,
    className,
    image,
    ...props
}) => {
    let classes;
    props.navLink && !props.to
        ? console.log('Bạn thiếu attribute to')
        : props.navLink && props.to
        ? (classes = (nav) =>
              cx(
                  'item',
                  { active: nav.isActive },
                  {
                      [className]: className,
                  },
              ))
        : (classes = cx('item', {
              [className]: className,
          }));
    return (
        <Button className={classes} {...props}>
            {leftIcon && <span className={cx('leftIcon')}>{leftIcon}</span>}
            <span className={cx('title')}>
                {image && (
                    <div className={cx('wrapper-image')}>
                        <div className={cx('overlay')}></div>
                        <Image src={src} alt="" className={cx('img')} debounce={debounce} />
                        <CaretForward className={cx('icon-img')} />
                    </div>
                )}
                <div className={cx('info')}>
                    <span className={cx('name-music')}>{title}</span>
                    {nameArtist && <span className={cx('name-artist')}>{nameArtist}</span>}
                </div>
            </span>
            {itemRight && optionIcon ? (
                <div className={itemRight}>
                    <span className={cx('optionIcon')}>{optionIcon}</span>
                    <span className={cx('time')}>{time}</span>
                </div>
            ) : (
                <span>{time}</span>
            )}
            {rightIcon && <span className={cx('rightIcon')}>{rightIcon}</span>}
        </Button>
    );
};

export default memo(Menu);
