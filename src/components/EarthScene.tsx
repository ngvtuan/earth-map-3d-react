import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import FlagNode from './FlagNode';
import AnimatedEdge from './AnimatedEdge';
import { latLngToVector3 } from '../utils/geo';
import { IEarthScene } from '../types';
import landOceanIceCloud from '../assets/images/land_ocean_ice_cloud_2048.jpg';

export default function EarthScene({
  countries,
  countryEdges,
  badgeColor = '#fff',
  badgeBg = '#078a8a',
  lineColor = '#fff',
  lineOpacity = 0.3,
  materialColor = '#47c78a',
  onFlagClick,
}: IEarthScene) {
  const earthRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(true);
  const earthTexture = useTexture(landOceanIceCloud);
  const countryPositions: THREE.Vector3[] = countries.map((country) =>
    latLngToVector3(country.avgLat, country.avgLng)
  );

  useFrame(() => {
    if (earthRef.current && isRotating) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  const handleClick = () => {
    setIsRotating(!isRotating);
  };

  const handleFlagClick = (countryCode: string) => {
    if (onFlagClick) {
      onFlagClick(countryCode);
    }
  };

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[5, 3, 5]} intensity={1} />

      <group
        ref={earthRef}
        onPointerDown={handleClick}
      >
        <Sphere args={[5, 64, 64]}>
          <meshStandardMaterial map={earthTexture} />
        </Sphere>

        {countries.map((country, index) => (
          <FlagNode
            key={country.code}
            position={countryPositions[index]}
            country={country.country}
            count={country.count}
            countryCode={country.code}
            badgeColor={badgeColor}
            badgeBg={badgeBg}
            onFlagClick={handleFlagClick}
          />
        ))}

        {countryEdges.map((edge, index) => {
          const fromIndex = countries.findIndex((c) => c.code === edge.fromCode);
          const toIndex = countries.findIndex((c) => c.code === edge.toCode);
          if (fromIndex !== -1 && toIndex !== -1) {
            const start = countryPositions[fromIndex];
            const end = countryPositions[toIndex];
            return (
              <AnimatedEdge
                key={index}
                start={start}
                end={end}
                lineColor={lineColor}
                lineOpacity={lineOpacity}
                materialColor={materialColor}
              />
            );
          }
          return null;
        })}
      </group>

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
}
