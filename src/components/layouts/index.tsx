interface FlexProps {
  right?: boolean;
  center?: boolean;
  width?: number | string;
  height?: number | string;
  fullWidth?: boolean;
  halfWidth?: boolean;
  quarterWidth?: boolean;
  threeQuarterWidth?: boolean;
  thirdWidth?: boolean;
  twoThirdsWidth?: boolean;
  fifthWidth?: boolean;
  padding?: number;
  padTop?: number;
  padBottom?: number;
  padLeft?: number;
  padRight?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  wrap?: boolean;
  centerBox?: boolean;
  baseline?: boolean;
  spaceAround?: boolean;
  spaceBetween?: boolean;
  alignCenter?: boolean;
  alignLeftCenter?: boolean;
  alignRight?: boolean;
  bottom?: number;
  style?: any;
  children?: any;
}

export const FlexRow = (props: FlexProps) => {
  const baseStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    width: 'auto',
  };

  const newStyle = { ...baseStyle, ...props.style };
  return addProps(props, newStyle);
};

export const FlexColumn = (props: FlexProps) => {
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexShrink: 0,
  };

  const newStyle = { ...baseStyle, ...props.style };
  return addProps(props, newStyle);
};

function addProps(props: FlexProps, newStyle: any) {
  const {
    right,
    center,
    height,
    width,
    fullWidth,
    halfWidth,
    quarterWidth,
    threeQuarterWidth,
    thirdWidth,
    twoThirdsWidth,
    fifthWidth,
    padding,
    padTop,
    padBottom,
    padLeft,
    padRight,
    margin,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    wrap,
    bottom,
    centerBox,
    baseline,
    spaceAround,
    spaceBetween,
    alignCenter,
    alignLeftCenter,
    alignRight,
    ...other
  } = props;
  if (center) {
    newStyle.justifyContent = 'center';
  } else if (right) {
    newStyle.justifyContent = 'flex-end';
  }
  if (height) {
    newStyle.height = height;
  }
  if (fullWidth) {
    newStyle.width = '100%';
  }
  if (width) {
    newStyle.width = width;
  }
  if (halfWidth) {
    newStyle.width = '50%';
  }
  if (quarterWidth) {
    newStyle.width = '25%';
  }
  if (threeQuarterWidth) {
    newStyle.width = '75%';
  }
  if (thirdWidth) {
    newStyle.width = '33%';
  }
  if (twoThirdsWidth) {
    newStyle.width = '66%';
  }
  if (fifthWidth) {
    newStyle.width = '20%';
  }
  if (padding) {
    newStyle.padding = padding;
  }
  if (padTop) {
    newStyle.paddingTop = padTop;
  }
  if (padBottom) {
    newStyle.paddingBottom = padBottom;
  }
  if (padLeft) {
    newStyle.paddingLeft = padLeft;
  }
  if (padRight) {
    newStyle.paddingRight = padRight;
  }
  if (margin) {
    newStyle.margin = margin;
  }
  if (marginTop) {
    newStyle.marginTop = marginTop;
  }
  if (marginBottom) {
    newStyle.marginBottom = marginBottom;
  }
  if (marginLeft) {
    newStyle.marginLeft = marginLeft;
  }
  if (marginRight) {
    newStyle.marginRight = marginRight;
  }
  if (wrap) {
    newStyle.flexWrap = 'wrap';
  }
  if (bottom) {
    newStyle.justifyContent = 'flex-end';
  }
  if (centerBox) {
    newStyle.justifyContent = 'center';
    newStyle.alignItems = 'center';
    newStyle.height = '100%';
    newStyle.width = '100%';
  }
  if (baseline) {
    newStyle.alignItems = 'baseline';
  }
  if (spaceAround) {
    newStyle.justifyContent = 'space-around';
  }
  if (spaceBetween) {
    newStyle.justifyContent = 'space-between';
  }
  if (alignCenter) {
    newStyle.justifyContent = 'center';
    newStyle.alignItems = 'center';
  }
  if (alignLeftCenter) {
    newStyle.alignItems = 'center';
  }
  if (alignRight) {
    newStyle.alignItems = 'flex-end';
  }

  return (
    <div {...other} style={newStyle}>
      {props.children}
    </div>
  );
}

export const FlexCenter = (props: FlexProps) => {
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const newStyle = { ...baseStyle, ...props.style };
  return addProps(props, newStyle);
};
