import { Canvas } from '@react-three/fiber';

import { INetworkOverview, } from '../types';

import EarthScene from './EarthScene';

export default function NetworkOverview({
  countries,
  countryEdges,
  className = 'w-full h-[600px]',
  badgeColor = '#fff',
  badgeBg = '#078a8a',
  lineColor = '#fff',
  lineOpacity = 0.3,
  materialColor = '#47c78a',
  onFlagClick,
}: INetworkOverview) {
  return (
    <div className={className} style={{ width: '100%', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <EarthScene
          countries={countries}
          countryEdges={countryEdges}
          badgeColor={badgeColor}
          badgeBg={badgeBg}
          lineColor={lineColor}
          lineOpacity={lineOpacity}
          materialColor={materialColor}
          onFlagClick={onFlagClick}
        />
      </Canvas>
    </div>
  );
}
