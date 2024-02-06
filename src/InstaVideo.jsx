const InstaVideo = ({ data }) => {
  return (
    <div>
      <video controls width={"300px"}>
        <source src={data} type="video/mp4" />
        sorry
      </video>
    </div>
  );
};

export default InstaVideo;
