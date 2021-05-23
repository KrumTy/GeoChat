import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View, Button, LayoutAnimation, Platform, UIManager } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

import { ShoutCarousel, ShoutMarker, ShoutPoints, ShoutComments, ShoutButton } from "../Shout"
import ImageButton from "../../core/ImageButton";

import { useAppSelector, useAppDispatch } from "../../../state";
import { addShout, selectShoutPoints, selectShouts, resetShoutPoints, Shout } from "../../../state/reducers/shoutsSlice";
import { loadShoutComments, selectSelectedShoutId } from "../../../state/reducers/commentsReducer";

import { Buttons } from "../../../images";

import { Overlay } from "./types";

MapboxGL.setAccessToken("pk.eyJ1Ijoia3J1bXR5IiwiYSI6ImNrb3Z3ZmxiZjAwZnQycG1wempxZHJjcDkifQ.p2tzOLc-JPsWdYwC2kA2RA");

const SOFIA_CENTER_COORDINATES = [23.321793482813433, 42.6976192959911];
const DEFAULT_ZOOM_LEVEL = 14;
const MARKER_MIN_ZOOM_LEVEL = 14;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function () {
  const [overlay, setOverlay] = useState(Overlay.ShoutIdle);
  const shoutPoints = useAppSelector(selectShoutPoints);
  // const selectedShoutId = useAppSelector(selectSelectedShoutId);
  const mapElement = useRef<MapboxGL.MapView>(null);
  // const [selectedShout, setSelectedShout] = useState<Shout>();
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);
  useEffect(() => {
    MapboxGL.locationManager.start();

    return (): void => {
      MapboxGL.locationManager.stop();
    };
  }, []);

  // Alert.alert(selectedShoutId?.toString() || "null");
  const shouts = useAppSelector(selectShouts);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.page}>
        <MapboxGL.MapView 
          onRegionDidChange={async (f) => {
            const newZoomLevel = await mapElement.current?.getZoom();
            if (newZoomLevel) {
              setZoomLevel(newZoomLevel);
            }
          }}
          ref={mapElement}
          style={styles.map} 
          // onPress={async (e) => {
          //   const center: number[] | undefined = await mapElement.current?.getCenter();
          //   Alert.alert(JSON.stringify(center))
          // }}
          onLongPress={e => {
            if (zoomLevel < MARKER_MIN_ZOOM_LEVEL || shoutPoints < 3) return;

            const point = (e.geometry as GeoJSON.Point);
            // setMarkerCoords([...markerCoords, point]);
            // Alert.alert(JSON.stringify(point.coordinates))
            dispatch(addShout({
              id: Date.now(),
              frameId: 0,
              authorId: 0,
              text: "Yoooo",
              coordinates: point.coordinates,
              // comments: []
            }));
          }}
          logoEnabled={false} 
          compassEnabled={false}
        >
          <MapboxGL.Camera 
            // followZoomLevel={DEFAULT_ZOOM_LEVEL} 
            // followUserLocation
            centerCoordinate={SOFIA_CENTER_COORDINATES}
            zoomLevel={DEFAULT_ZOOM_LEVEL}
            // bounds={{ne: [], sw: []}} 
          />
          {zoomLevel >= MARKER_MIN_ZOOM_LEVEL && shouts.map((s, i) => (
            <MapboxGL.MarkerView key={i} id={i.toString()} coordinate={s.coordinates} 
              onSelected={() => {
                dispatch(loadShoutComments(s.id));
                // setSelectedShout(s);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOverlay(Overlay.ShoutComments);
              }} // open chat
            >
              <ShoutMarker frameId={s.frameId} text={s.text} zoomLevel={zoomLevel} />
              {/* <Text style={styles.markerText}>Marker</Text> */}
            </MapboxGL.MarkerView>
          ))}
          <MapboxGL.UserLocation />
        </MapboxGL.MapView>
        <ImageButton 
          style={styles.hamburgerButton}
          source={Buttons.ButtonHamburgerMenu} 
          aspectRatio={0.4}
          onPress={() => dispatch(resetShoutPoints())} 
        />
        <ShoutPoints />
        {overlay === Overlay.ShoutIdle && (
          <ShoutButton onPress={() => setOverlay(Overlay.ShoutCarousel)} />
        )}
        {overlay === Overlay.ShoutCarousel && (
          <ShoutCarousel mapElementRef={mapElement} onClose={() => setOverlay(Overlay.ShoutIdle)} />
        )}
        {overlay === Overlay.ShoutComments && (
          <ShoutComments onClose={() => setOverlay(Overlay.ShoutIdle)} />
        )}
        {/* {selectedShout ? (
          <ShoutComments />
        ): (
          <ShoutCarousel mapElementRef={mapElement} />
        )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  map: {
    flex: 1,
    width: "100%",
  },
  hamburgerButton: {
    position: 'absolute',
    top: 65,
    left: 30,
    // alignItems:"flex-start",
  },
  markerText: {
    backgroundColor: "red",
    borderWidth: 5,
    borderColor: "skyblue",
    overflow: "hidden",
    padding: 5,
    color: "white",
    borderRadius: 20
  }
});