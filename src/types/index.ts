import { Vector3 } from 'three';

export interface NodeData {
  id: number;
  lat: number;
  lng: number;
  name: string;
  country: string;
  countryCode: string;
}

export interface EdgeData {
  from: number;
  to: number;
}

export interface CountryData {
  code: string;
  country: string;
  count: number;
  avgLat: number;
  avgLng: number;
}

export interface CountryEdgeData {
  fromCode: string;
  toCode: string;
}

export interface FlagNodeProps {
  position: Vector3;
  country: string;
  count: number;
  countryCode: string;
  badgeColor?: string;
  badgeBg?: string;
  onFlagClick: (countryCode: string) => void;
}

export  interface AnimatedEdgeProps {
  start: Vector3;
  end: Vector3;
  lineColor?: string;
  lineOpacity?: number;
  materialColor?: string;
}

export interface IEarthScene {
  countries: CountryData[];
  countryEdges: CountryEdgeData[];
  textureBackground: string;
  badgeColor?: string;
  badgeBg?: string;
  lineColor?: string;
  lineOpacity?: number;
  materialColor?: string;
  onFlagClick?: (countryCode: string) => void;
}

export interface INetworkOverview {
  countries: CountryData[];
  countryEdges: CountryEdgeData[];
  className?: string;
  textureBackground: string;
  badgeColor?: string;
  badgeBg?: string;
  lineColor?: string;
  lineOpacity?: number;
  materialColor?: string;
  onFlagClick?: (countryCode: string) => void;
}
