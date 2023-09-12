interface Iprops {
  width?: string;
}

export default function PlayBarSound({ width }: Iprops) {
  return (
    <div className="relative rounded-20 bg-dubgraymedium w-full h-8 progress_bar">
      <div
        className="rounded-20 bg-[#B7B8A3] h-8 progressed"
        css={[
          {
            width: width,
          },
        ]}
      ></div>
    </div>
  );
}
