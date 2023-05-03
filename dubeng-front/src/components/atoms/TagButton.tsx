interface Iprops {
  id: number;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TagButton({ id, name, isSelected, onClick }: Iprops) {
  if (isSelected === true) {
    return (
      <button
        className="rounded-20 px-16 py-8 border-1 border-dubcoral bg-dubcoral text-white text-16"
        onClick={onClick}
      >
        {name}
      </button>
    );
  } else {
    return (
      <button
        className="rounded-20 px-16 py-8 border-1 bg-dubgraylight border-dubgraydeep text-dubblack text-16"
        onClick={onClick}
      >
        {name}
      </button>
    );
  }
}
