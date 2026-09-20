const ROADS_H = [
  { top: 54, thick: true },
  { top: 109, thick: false },
  { top: 164, thick: true },
];
const ROADS_V = [
  { left: 69,  thick: false },
  { left: 139, thick: true },
  { left: 199, thick: false },
];
const BLOCKS = [
  [7,7,56,42],[75,7,58,42],[147,59,46,45],[75,59,58,45],
  [7,59,56,45],[205,114,66,45],[147,114,46,45],[7,169,56,44],[75,169,58,44],
] as [number, number, number, number][];

export function MapVisualization() {
  return (
    <div
      className="border border-[#eae9e3] rounded-[12px] shrink-0 relative overflow-hidden"
      style={{ width: "100%", maxWidth: 280, height: 220, background: "linear-gradient(90deg,#f2eee5,#ede7dc)" }}
    >
      {ROADS_H.map(({ top, thick }) => (
        <div key={top} className="absolute bg-[rgba(255,255,255,0.7)] left-0 right-0" style={{ height: thick ? 3 : 2, top }} />
      ))}
      {ROADS_V.map(({ left, thick }) => (
        <div key={left} className="absolute bg-[rgba(255,255,255,0.7)] top-0 bottom-0" style={{ width: thick ? 3 : 2, left }} />
      ))}
      {BLOCKS.map(([l, t, w, h], i) => (
        <div key={i} className="absolute bg-[rgba(231,224,213,0.5)] rounded-[3px]" style={{ left: l, top: t, width: w, height: h }} />
      ))}
      <img alt="" className="absolute size-[32px]" src="/e037c.svg" style={{ left: 107, top: 83 }} />
      <img alt="" className="absolute size-[14px]" src="/d25c4.svg" style={{ left: 116, top: 92 }} />
      <p className="absolute font-geist font-medium text-[#63738c] text-[10px] whitespace-nowrap" style={{ left: 139, top: 93 }}>
        Westlands
      </p>
    </div>
  );
}
