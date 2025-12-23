import NetworkOverview from './components/NetworkOverview';

import {
  NodeData,
  EdgeData,
  CountryData,
  CountryEdgeData,
} from './types';

const nodes: NodeData[] = [
  { id: 1, lat: 40.7128, lng: -74.0060, name: 'New York', country: 'USA', countryCode: 'us' },
  { id: 2, lat: 51.5074, lng: -0.1278, name: 'London', country: 'UK', countryCode: 'gb' },
  { id: 3, lat: 35.6895, lng: 139.6917, name: 'Tokyo', country: 'Japan', countryCode: 'jp' },
  { id: 4, lat: -33.8688, lng: 151.2093, name: 'Sydney', country: 'Australia', countryCode: 'au' },
  { id: 5, lat: 37.7749, lng: -122.4194, name: 'San Francisco', country: 'USA', countryCode: 'us' },
];

const edges: EdgeData[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
];

const countries: CountryData[] = Object.values(
  nodes.reduce((acc: Record<string, { code: string; count: number; sumLat: number; sumLng: number; country: string }>, node) => {
    const code = node.countryCode;
    if (!acc[code]) {
      acc[code] = { code, count: 0, sumLat: 0, sumLng: 0, country: node.country };
    }
    acc[code].count += 1;
    acc[code].sumLat += node.lat;
    acc[code].sumLng += node.lng;
    return acc;
  }, {})
).map(({ code, country, count, sumLat, sumLng }) => ({
  code,
  country,
  count,
  avgLat: sumLat / count,
  avgLng: sumLng / count,
}));

const countryEdges: CountryEdgeData[] = edges
  .map((edge) => {
    const fromNode = nodes.find((n) => n.id === edge.from);
    const toNode = nodes.find((n) => n.id === edge.to);
    return { fromCode: fromNode?.countryCode || '', toCode: toNode?.countryCode || '' };
  })
  .filter((edge) => edge.fromCode && edge.toCode && edge.fromCode !== edge.toCode)
  .reduce((acc: CountryEdgeData[], edge) => {
    if (!acc.some((e) =>
      (e.fromCode === edge.fromCode && e.toCode === edge.toCode) ||
      (e.fromCode === edge.toCode && e.toCode === edge.fromCode)
    )) {
      acc.push(edge);
    }
    return acc;
  }, []);

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Network Overview</h1>
      <NetworkOverview
        countryEdges={countryEdges}
        countries={countries}
        textureBackground='/textures/land_ocean_ice_cloud_2048.jpg'
      />
    </div>
  );
}

export default App;
