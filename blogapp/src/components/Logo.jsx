import logoImg from "../assets/cat.jpg";
export default function Logo({ width = "100%", height = "100%", className }) {
  return (
    <img
      className={`rounded-sm ${className}`}
      src={logoImg}
      alt="Logo"
      width={width}
    />
  );
}
