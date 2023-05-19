interface Iprops {
  children: string;
  isClicked: boolean;
}

export default function TagButton({ children, isClicked }: Iprops) {
  if (isClicked === true) {
    return (
<<<<<<< HEAD
      <button className="rounded-20 bg-dubcoral text-white text-16">
        {children}
=======
      <button onClick={onClick} className="rounded-20 m-4 px-16 py-8 border-1 border-dubcoral bg-dubcoral text-white text-16">
        # {name}
>>>>>>> develop-front
      </button>
    );
  } else {
    return (
<<<<<<< HEAD
      <button className="rounded-20 bg-dubgraylight border-dubgraydeep text-dubblack text-16">
        {children}
=======
      <button onClick={onClick} className="rounded-20 m-4 px-16 py-8 border-1 bg-dubgraylight border-dubgraydeep text-dubblack text-16">
        # {name}
>>>>>>> develop-front
      </button>
    );
  }
}
