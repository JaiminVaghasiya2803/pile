import React from 'react';

/**
 * Creates a custom hook for generating styles with memoization.
 *
 * @param getStyles A function that takes a context and returns a style object.
 * @returns A hook that takes a context and returns memoized styles.
 */
export const createUseStyles = <TContext extends object, TStyles>(
  getStyles: (context: TContext) => TStyles
): ((context: TContext) => TStyles) => {
  return (context: TContext) => {
    // relies on getStyles function you pass it to select the styles
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useMemo(() => getStyles(context), Object.values(context));
  };
};
