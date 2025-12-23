import { Text, useTexture, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

import { FlagNodeProps } from '../types';

export default function FlagNode({
  position,
  country,
  count,
  countryCode,
  badgeColor = '#fff',
  badgeBg = '#078a8a',
  onFlagClick,
}: FlagNodeProps) {
  const flagUrl = `https://flagcdn.com/w320/${countryCode}.png`;
  const flagTexture = useTexture(flagUrl);
  const offsetPosition = position.clone().normalize().multiplyScalar(5.1);

  const handleFlagClick = (event: THREE.Event) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event as any).stopPropagation();
    onFlagClick(countryCode);
  };

  return (
    <group position={offsetPosition}>
      <Billboard>
        <mesh position={[0, 0, 0]} onClick={handleFlagClick}>
          <planeGeometry args={[0.4, 0.2]} />
          <meshBasicMaterial
            map={flagTexture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        <RoundedBox
          args={[0.3, 0.12, 0.01]}
          radius={0.02}
          position={[0, 0.2, 0]}
          smoothness={1}
        >
          <meshStandardMaterial color={badgeBg} opacity={0.8} transparent />
        </RoundedBox>
        <Text
          position={[0, 0.2, 0.005]}
          fontSize={0.1}
          color={badgeColor}
          anchorX="center"
          anchorY="middle"
          fillOpacity={1}
        >
          {count}
        </Text>
        <Text position={[0, -0.16, 0]} fontSize={0.08} color="white" anchorX="center" anchorY="middle">
          {country}
        </Text>
      </Billboard>
    </group>
  );
}
