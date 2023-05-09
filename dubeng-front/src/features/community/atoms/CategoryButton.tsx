interface Iprops {
  id: number;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryButton({
  id,
  name,
  isSelected,
  onClick,
}: Iprops) {
  if (isSelected) {
    return (
      <span
        className="px-16 py-4 rounded-8 text-14 text-white bg-dubgray border-1 border-dubgray"
        onClick={onClick}
      >
        {name}
      </span>
    );
  } else {
    return (
      <span
        className="px-16 py-4 rounded-8 text-14 text-dubblack bg-dubgraylight border-1 border-dubgraymedium"
        onClick={onClick}
      >
        {name}
      </span>
    );
  }
}
