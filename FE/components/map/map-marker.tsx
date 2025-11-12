/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Marker, MarkerProps } from "react-leaflet";
import ReactDOM from "react-dom/client";
import L from "leaflet";

interface Props extends MarkerProps {
  /**
   * Options to pass to the react-lefalet L.divIcon that is used as the marker's custom icon
   */
  iconOptions?: L.DivIconOptions;
}

/**
 * React-leaflet marker that allows for fully interactive JSX in its icon
 */
// eslint-disable-next-line react/display-name
export const CustomMapMarker = React.forwardRef<L.Marker, Props>(
  ({ children, iconOptions, ...rest }, refInParent) => {
    const [ref, setRef] = useState<L.Marker>();

    const node = React.useMemo(
      () => (ref ? ReactDOM.createRoot(ref.getElement()!) : null),
      [ref]
    );

    return (
      <>
        {React.useMemo(
          () => (
            <Marker
              {...rest}
              ref={(r) => {
                setRef(r as L.Marker);
                if (refInParent) {
                  // @ts-expect-error fowardref ts defs are tricky
                  refInParent.current = r;
                }
              }}
              icon={L.divIcon(iconOptions)}
            />
          ),
          []
        )}
        {ref && node?.render(children)}
      </>
    );
  }
);
