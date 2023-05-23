interface btnProps {
  onClick: ()=>void;
  text: string;
  status : boolean;
}

export default function SignUpButton({text, onClick, status} : btnProps){
  if(status){
    return (<button className="w-full text-dubgraylight text-xl bg-dubcoral rounded-8 h-40" onClick={onClick}>{text}</button>);
  }
  return (<button className="w-full text-dubgraylight text-xl bg-dubgray rounded-8 h-40" onClick={onClick} disabled={!status}>{text}</button>);
}