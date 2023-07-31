interface Iprops {
  content: string;
  contentTranslate: string;
}

export default function ShortsSubtitle({ content, contentTranslate }: Iprops) {
  return (
    <div className="text-center text-14">
      <p className="text-white">{content}</p>
      <p className="text-dubgray">{contentTranslate}</p>
    </div>
  );
}
