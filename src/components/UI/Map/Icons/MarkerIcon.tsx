export default function MarkerIcon() {
  const icon = ` <lord-icon
        src="https://cdn.lordicon.com/iikoxwld.json"
        trigger="loop"
        delay="2000"
        style="width:3rem;height:3rem">
      </lord-icon>`;

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: icon,
      }}
    ></div>
  );
}
