import { Canvas } from '@react-three/fiber';

import { INetworkOverview, } from '../types';

import EarthScene from './EarthScene';

export function NetworkOverview({
  countries,
  countryEdges,
  className = '',
  badgeColor = '#fff',
  badgeBg = '#078a8a',
  lineColor = '#fff',
  lineOpacity = 0.3,
  materialColor = '#47c78a',
  fov = 60,
  position = [0, 0, 10],
  countFont = 'bold 100px Arial',
  countryFont = 'bold 60px Arial',
  minDistance = 8,
  maxDistance = 15,
  enablePan = false,
  enableZoom = true,
  enableRotate = true,
  onFlagClick,
}: INetworkOverview) {
  return (
    <div className={className}>
      <Canvas camera={{ position, fov }}>
        <EarthScene
          countries={countries}
          countryEdges={countryEdges}
          badgeColor={badgeColor}
          badgeBg={badgeBg}
          lineColor={lineColor}
          lineOpacity={lineOpacity}
          materialColor={materialColor}
          countFont={countFont}
          countryFont={countryFont}
          minDistance={minDistance}
          maxDistance={maxDistance}
          enablePan={enablePan}
          enableZoom={enableZoom}
          enableRotate={enableRotate}
          onFlagClick={onFlagClick}
        />
      </Canvas>
    </div>
  );
}
