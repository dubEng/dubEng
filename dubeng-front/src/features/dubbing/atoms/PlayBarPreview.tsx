interface Iprops {
    width?: string;
  }
  
  export default function PlayBarPreview({ width }: Iprops) {
    return (
      <div className="relative rounded-20 bg-dubgraymedium w-212 h-8 progress_bar">
        <div
          className="rounded-20 bg-dubblue h-8 progressed"
          css={[
            {
              width: width,
            },
          ]}
        ></div>
      </div>
    );
  }
  