export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>아이템 상세</h1>
      <p style={{ color: "#555" }}>현재 아이템 ID: {params.id}</p>
    </main>
  );
}
