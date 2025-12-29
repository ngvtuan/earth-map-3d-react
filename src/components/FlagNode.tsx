import { useTexture, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useEffect } from 'react';

import { FlagNodeProps } from '../types';

export default function FlagNode({
  position,
  country,
  count,
  countryCode,
  badgeColor = '#fff',
  badgeBg = '#47C78A',
  countFont = 'bold 100px Arial',
  countryFont = 'bold 60px Arial',
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

  const countTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;

    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      ctx.font = countFont;
      ctx.fillStyle = badgeColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(count.toString(), size / 2, size / 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
  }, [count, badgeColor, countFont]);

  const countryTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;

    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, size, canvas.height);
      ctx.font = countryFont;
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const maxWidth = size * 0.8;
      const truncatedText = ctx.measureText(country).width > maxWidth
        ? country.substring(0, 10) + '...'
        : country;
      ctx.fillText(truncatedText, size / 2, canvas.height / 2, maxWidth);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    return texture;
  }, [country, countryFont]);

  useEffect(() => {
    return () => {
      if (countTexture) {
        countTexture.dispose();
      }
      if (countryTexture) {
        countryTexture.dispose();
      }
    };
  }, [countTexture, countryTexture]);

  if (!countTexture || !countryTexture) {
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
            args={[0.36, 0.12, 0.01]}
            radius={0.02}
            position={[0, 0.2, 0]}
            smoothness={1}
          >
            <meshBasicMaterial
              color={badgeBg}
              opacity={1.0}
              transparent={false}
            />
          </RoundedBox>
        </Billboard>
      </group>
    );
  }

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
          args={[0.36, 0.12, 0.01]}
          radius={0.02}
          position={[0, 0.2, 0]}
          smoothness={1}
        >
          <meshBasicMaterial
            color={badgeBg}
            opacity={1.0}
            transparent={false}
          />
        </RoundedBox>

        <mesh position={[0, 0.2, 0.01]}>
          <planeGeometry args={[0.4, 0.12]} />
          <meshBasicMaterial
            map={countTexture}
            transparent
            side={THREE.DoubleSide}
            alphaTest={0.1}
          />
        </mesh>

        <mesh position={[0, -0.16, 0.01]}>
          <planeGeometry args={[0.35, 0.08]} />
          <meshBasicMaterial
            map={countryTexture}
            transparent
            side={THREE.DoubleSide}
            alphaTest={0.1}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
