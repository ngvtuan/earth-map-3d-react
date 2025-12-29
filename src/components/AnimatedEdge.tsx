import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

import { AnimatedEdgeProps } from '../types';

export default function AnimatedEdge({
  start,
  end,
  lineColor = '#fff',
  lineOpacity = 0.1,
  materialColor = '#47c78a',
}: AnimatedEdgeProps) {
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).normalize().multiplyScalar(6.0);
    return new THREE.CatmullRomCurve3([start, mid, end], false);
  }, [start, end]);

  const segmentLength = 0.1;

  const numParticles = 3;
  const particleRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (curve) {
      particleRefs.current.forEach((ref, i) => {
        if (ref) {
          const offset = i * 1;
          const progress = ((state.clock.elapsedTime + offset) % 3) / 3;
          const position = curve.getPoint(progress);
          const tangent = curve.getTangent(progress).normalize();

          ref.position.copy(position);

          const quaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            tangent
          );
          ref.quaternion.copy(quaternion);
        }
      });
    }
  });

  return (
    <>
      <Line points={curve.getPoints(100)} color={lineColor} lineWidth={1} opacity={lineOpacity} transparent />
      {Array.from({ length: numParticles }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) particleRefs.current[i] = el; }}
          position={start}
        >
          <boxGeometry args={[0.01, 0.01, segmentLength]} />
          <meshStandardMaterial color={materialColor} emissive={materialColor} emissiveIntensity={1.0} />
        </mesh>
      ))}
    </>
  );
}
