export function autoBreak(text) {
  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {text.replace(/[，。,]/g, (match) => "\n")}
    </span>
  );
}
