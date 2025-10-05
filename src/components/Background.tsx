import StarryBackground from './StarryBackground';

export default function Background() {
  return (
    <>
      {/* Solid background */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -10,
          backgroundColor: 'var(--color-background)',
        }}
      />
      {/* Starry animation */}
      <StarryBackground />
    </>
  );
}
