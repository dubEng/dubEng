interface Iprops {
  width?: number;
  height?: number;
  percent?: number;
}

export default function PlayBar({ width, height, percent }: Iprops) {
  return (
    <div
      className="relative rounded-20 bg-dubgraymedium w-300 h-8"
    //   css={[
    //     {
    //       width: width,
    //       height: height,
    //     },
    //   ]}
    >
      <div
        className="rounded-20 bg-dubblue w-160 h-8"
        // css={[
        //   {
        //     width: (width * percent) / 100,
        //     height: height,
        //     // maxWidth: (width * 100) / 100,
        //   },
        // ]}
      ></div>
    </div>
  );
}
