import React from 'react';

type Props = {
  category: 'skill' | 'theme' | 'social';
  symbolId: string;
} & React.ComponentPropsWithoutRef<'svg'>;

const SvgSprite = ({ category, symbolId, children, ...rest }: Props) => {
  return (
    <svg {...rest}>
      <use href={`/svg-sprites/${category}/sprite.svg#${category}-${symbolId}`}></use>
      {children}
    </svg>
  );
};

export default SvgSprite;
