interface Iprops {
  children: string;
  isClicked: boolean;
}

export default function TagButton({ children, isClicked }: Iprops) {
  if (isClicked === true) {
    return (
      <button className="rounded-20 bg-dubcoral text-white text-16">
        {children}
      </button>
    );
  } else {
    return (
      <button className="rounded-20 bg-dubgraylight border-dubgraydeep text-dubblack text-16">
        {children}
      </button>
    );
  }
}
