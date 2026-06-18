function Loader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #ddd",
          borderTop: "4px solid #0095f6",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <p>Loading...</p>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;