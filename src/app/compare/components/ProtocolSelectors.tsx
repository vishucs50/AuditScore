import { Protocol } from "@/lib/models/protocols";
type ProtocolSelectorsProps = {
  protocols: Protocol[];
  protocolA: Protocol | null;
  protocolB: Protocol | null;
  setProtocolA: (p: Protocol) => void;
  setProtocolB: (p: Protocol) => void;
};
export default function ProtocolSelectors({
  protocols,
  protocolA,
  protocolB,
  setProtocolA,
  setProtocolB,
}: ProtocolSelectorsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-6">
      {/* Protocol A */}
      <div>
        <label className="block text-xs font-bold uppercase mb-2">
          Protocol A
        </label>
        <select
          className="w-full p-3 rounded-xl bg-white dark:bg-surface-dark border"
          value={protocolA?.slug ?? ""}
          onChange={(e) =>
            setProtocolA(protocols.find((p) => p.slug === e.target.value)!)
          }
        >
          {protocols.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Protocol B */}
      <div>
        <label className="block text-xs font-bold uppercase mb-2">
          Protocol B
        </label>
        <select
          className="w-full p-3 rounded-xl bg-white dark:bg-surface-dark border"
          value={protocolB?.slug ?? ""}
          onChange={(e) =>
            setProtocolB(protocols.find((p) => p.slug === e.target.value)!)
          }
        >
          {protocols.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
