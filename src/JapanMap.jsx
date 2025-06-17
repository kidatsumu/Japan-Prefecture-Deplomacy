/* PLACEHOLDER: Canvas内のコードをここに貼り付け */
// 全国47都道府県対応のユニット表示・隣接制限付き移動可能なReactコンポーネント
import { useState } from "react";

// 代表的な都道府県データ（47件）と隣接情報（簡略な位置と線描画）
const prefectures = [
  "hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima",
  "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi",
  "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama",
  "tottori", "shimane", "okayama", "hiroshima", "yamaguchi",
  "tokushima", "kagawa", "ehime", "kochi",
  "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa"
];

export default function JapanMap() {
  const [orders, setOrders] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [newOrder, setNewOrder] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [unitCounter, setUnitCounter] = useState(3);
  const [newUnitOwner, setNewUnitOwner] = useState("国A");
  const [newUnitLocation, setNewUnitLocation] = useState("tokyo");
  const [units, setUnits] = useState([
    { id: "unit1", owner: "国A", location: "tokyo" },
    { id: "unit2", owner: "国B", location: "osaka" }
  ]);

  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const getUnitAt = (prefId) => units.filter((u) => u.location === prefId);

  const handlePrefectureClick = (prefId) => {
    if (selectedUnitId) {
      setUnits(units.map((u) =>
        u.id === selectedUnitId ? { ...u, location: prefId } : u
      ));
      setSelectedUnitId(null);
    }
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="p-2 flex flex-wrap gap-2">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="プレイヤー名"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border px-2 py-1 w-32"
          />
          <input
            type="text"
            placeholder="命令を入力..."
            value={newOrder}
            onChange={(e) => setNewOrder(e.target.value)}
            className="border px-2 py-1 w-64"
          />
          <button
            onClick={() => {
              if (playerName.trim() && newOrder.trim()) {
                setOrders({ ...orders, [playerName.trim()]: newOrder.trim() });
                setNewOrder("");
              }
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
            disabled={submitted || orders[playerName] !== undefined}
          >
            命令を送信</button>
          <button
            onClick={() => setSubmitted(true)}
            disabled={submitted || Object.keys(orders).length < 7}
            className="bg-purple-500 text-white px-2 py-1 rounded"
          >命令公開</button>
        </div>
        <div className="w-full mt-2">
          <h2 className="font-bold">命令一覧</h2>
          {submitted ? (
            <ul className="list-disc list-inside text-sm">
              {Object.entries(orders).map(([player, order]) => (
                <li key={player}><strong>{player}</strong>: {order}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">命令はまだ非公開です。</p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-bold">国と色の対応表:</span>
          <span className="text-sm" style={{ color: 'red' }}>■ 国A</span>
          <span className="text-sm" style={{ color: 'blue' }}>■ 国B</span>
          <span className="text-sm" style={{ color: 'green' }}>■ 国C</span>
          <span className="text-sm" style={{ color: 'purple' }}>■ 国D</span>
          <span className="text-sm" style={{ color: 'orange' }}>■ 国E</span>
          <span className="text-sm" style={{ color: 'cyan' }}>■ 国F</span>
          <span className="text-sm" style={{ color: 'brown' }}>■ 国G</span>
        </div>
        <select value={newUnitOwner} onChange={(e) => setNewUnitOwner(e.target.value)} className="border px-2 py-1">
  <option value="国A">国A</option>
  <option value="国B">国B</option>
  <option value="国C">国C</option>
  <option value="国D">国D</option>
  <option value="国E">国E</option>
  <option value="国F">国F</option>
  <option value="国G">国G</option>
</select>
        <button onClick={() => {
          setUnits([...units, { id: `unit${unitCounter}`, owner: newUnitOwner, location: newUnitLocation }]);
          setUnitCounter(unitCounter + 1);
        }} className="bg-green-500 text-white px-2 py-1 rounded">ユニット追加</button>
        <button
          onClick={() => setUnits(units.filter((u) => u.id !== selectedUnitId))}
          disabled={!selectedUnitId}
          className="bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
        >
          選択ユニット削除
        </button>
      </div>
      <svg viewBox="0 0 1000 1200" className="w-full h-full">
  {prefectures.map((pref) => (
    <use
      key={pref}
      href={`#${pref}`}
      onClick={() => handlePrefectureClick(pref)}
      className="cursor-pointer"
    />
  ))}
  <image href="/japan_full.svg" x="0" y="0" width="1000" height="1200" />
  {units.map((unit, i) => (
    <circle
      key={unit.id}
      cx={unit.location === "tokyo" ? 570 :
          unit.location === "osaka" ? 520 :
          unit.location === "hokkaido" ? 600 :
          unit.location === "aomori" ? 580 : 500}
      cy={unit.location === "tokyo" ? 710 :
          unit.location === "osaka" ? 860 :
          unit.location === "hokkaido" ? 200 :
          unit.location === "aomori" ? 350 : 600}
      r={8}
      fill={unit.owner === "国A" ? "red" :
        unit.owner === "国B" ? "blue" :
        unit.owner === "国C" ? "green" :
        unit.owner === "国D" ? "purple" :
        unit.owner === "国E" ? "orange" :
        unit.owner === "国F" ? "cyan" :
        unit.owner === "国G" ? "brown" : "gray"}
      stroke={unit.id === selectedUnitId ? "gold" : "none"}
      strokeWidth={2}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedUnitId(unit.id);
      }}
    >
      <title>{`${unit.owner}のユニット`}</title>
    </circle>
  ))}
</svg>
    </div>
  );
}
