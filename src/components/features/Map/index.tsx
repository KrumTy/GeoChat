import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, Platform, UIManager} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {
  ShoutCarousel,
  ShoutMarker,
  ShoutPoints,
  ShoutComments,
  ShoutButton,
} from '../Shout';

import {getRandomElement} from '../../../utils';
import shoutFrames from '../../../static/shoutFrames';
import shoutMessages from '../../../static/shoutMessages';
import {useAppSelector, useAppDispatch} from '../../../state';
import {
  addShout,
  selectShouts,
  loadShoutPoints,
  loadShouts,
} from '../../../state/reducers/shoutsSlice';
import CONFIG from '../../../config';

import MenuButton from '../../core/MenuButton';

import {selectUser, setCoordinates} from '../../../state/reducers/userSlice';

enum Overlay {
  ShoutIdle,
  ShoutCarousel,
  ShoutComments,
}

export default function () {
  const [overlay, setOverlay] = useState(Overlay.ShoutIdle);
  const user = useAppSelector(selectUser);
  const mapElement = useRef<MapboxGL.MapView>(null);
  const [selectedShoutId, setSelectedShoutId] = useState<number>();
  const [zoomLevel, setZoomLevel] = useState(CONFIG.DEFAULT_ZOOM_LEVEL);
  const disableShoutMarkers = zoomLevel < CONFIG.MARKER_MIN_ZOOM_LEVEL;
  const shouts = useAppSelector(selectShouts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    MapboxGL.setAccessToken(CONFIG.MAPBOXGL_API_KEY);
    MapboxGL.locationManager.start();
    dispatch(loadShouts([42.0, 69]));

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    return (): void => {
      MapboxGL.locationManager.stop();
    };
  }, []);
  useEffect(() => {
    dispatch(loadShoutPoints(user.id));
  }, [user.id]);

  return (
    <View style={styles.page}>
      <MapboxGL.MapView
        onRegionDidChange={async () => {
          const newZoomLevel = await mapElement.current?.getZoom();
          if (newZoomLevel) {
            setZoomLevel(newZoomLevel);
          }
        }}
        ref={mapElement}
        style={styles.map}
        onLongPress={e => {
          if (disableShoutMarkers) {
            return;
          }

          dispatch(
            addShout({
              id: Date.now(),
              frameId: getRandomElement(shoutFrames).id,
              authorId: user.id,
              text: getRandomElement(shoutMessages),
              coordinates: (e.geometry as GeoJSON.Point).coordinates,
            }),
          );
        }}
        logoEnabled={false}
        compassEnabled={false}>
        <MapboxGL.Camera
          // followZoomLevel={CONFIG.DEFAULT_ZOOM_LEVEL}
          followUserLocation
          // centerCoordinate={CONFIG.MAP_CENTER_COORDINATES}
          zoomLevel={CONFIG.DEFAULT_ZOOM_LEVEL}
        />
        {!disableShoutMarkers &&
          shouts.map((s, i) => (
            <MapboxGL.MarkerView
              key={i}
              id={i.toString()}
              coordinate={s.coordinates}>
              <ShoutMarker
                frameId={s.frameId}
                text={s.text}
                zoomLevel={zoomLevel}
                onPress={() => {
                  setSelectedShoutId(s.id);
                  setOverlay(Overlay.ShoutComments);
                }}
              />
            </MapboxGL.MarkerView>
          ))}
        <MapboxGL.UserLocation
          visible={true}
          onUpdate={location => {
            const coords = [
              location.coords.longitude,
              location.coords.latitude,
            ];
            dispatch(setCoordinates(coords));
          }}
        />
      </MapboxGL.MapView>
      <MenuButton />
      <ShoutPoints />
      {overlay === Overlay.ShoutIdle && (
        <ShoutButton onPress={() => setOverlay(Overlay.ShoutCarousel)} />
      )}
      {overlay === Overlay.ShoutCarousel && (
        <ShoutCarousel onClose={() => setOverlay(Overlay.ShoutIdle)} />
      )}
      {overlay === Overlay.ShoutComments && selectedShoutId && (
        <ShoutComments
          shoutId={selectedShoutId!}
          onClose={() => setOverlay(Overlay.ShoutIdle)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 65,
    left: 30,
  },
  markerText: {
    backgroundColor: 'red',
    borderWidth: 5,
    borderColor: 'skyblue',
    overflow: 'hidden',
    padding: 5,
    color: 'white',
    borderRadius: 20,
  },
});
