import Link from "next/link";
export default function FourOhFour() {
  return (
    <div style={{ textAlign: "center", padding: 45 }}>
      <img src="404.svg" style={{ maxWidth: 320, marginBottom: 30 }} alt="" />
      <h1 style={{ fontWeight: "bold", fontSize: 17, marginBottom: 10 }}>
        404 - Page Not Found
      </h1>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
