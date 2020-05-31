import * as React from 'react';
import { Box as ReakitBox } from 'reakit';

import { ColumnsThemeConfig } from '../types';
import { useClassName, createComponent, createElement, createHook } from '../utils';
import { Box, BoxProps } from '../Box';

import { ColumnsContext } from './ColumnsContext';
import * as styles from './styles';

export type LocalColumnsProps = {
  isGapless?: boolean;
  isOneLine?: boolean;
  minBreakpoint?: 'tablet' | 'mobile';
};
export type ColumnsProps = BoxProps & LocalColumnsProps;

const useProps = createHook<ColumnsProps>(
  (props, { themeKey, themeKeyOverride }) => {
    const boxProps = Box.useProps(props);

    const className = useClassName({
      style: styles.Columns,
      styleProps: props,
      themeKey,
      themeKeyOverride,
      prevClassName: boxProps.className,
    });

    const contextValue = React.useMemo(
      () => ({
        isGapless: props.isGapless,
        minBreakpoint: props.minBreakpoint,
      }),
      [props.isGapless, props.minBreakpoint]
    );

    return {
      ...boxProps,
      className,
      children: <ColumnsContext.Provider value={contextValue}>{props.children}</ColumnsContext.Provider>,
    };
  },
  {
    defaultProps: {
      isGapless: false,
      isOneLine: false,
      minBreakpoint: undefined,
    },
    themeKey: 'Columns',
  }
);

export const Columns = createComponent<ColumnsProps>(
  (props) => {
    const columnsProps = useProps(props);
    return createElement({ children: props.children, component: ReakitBox, use: props.use, htmlProps: columnsProps });
  },
  {
    attach: {
      useProps,
    },
    themeKey: 'Columns',
  }
);
