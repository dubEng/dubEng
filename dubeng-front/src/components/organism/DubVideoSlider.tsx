import Sheet from 'react-modal-sheet';

interface Iprops{
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function DubVideoSlider({isOpen, setOpen}: Iprops) {
  return (
    <>
      <button onClick={() => setOpen(true)}>Open sheet</button>
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
